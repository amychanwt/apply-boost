import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { getCurrentUser, hasResume, saveResume } from '@/utils/userStorage';
import { uploadResume } from '@/services/api';

interface ResumeUploadProps {
  onUploadSuccess?: () => void;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (hasResume()) {
      const user = getCurrentUser();
      if (user?.resume) {
        // Create a File object from the stored resume data
        const byteCharacters = atob(user.resume.fileData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const storedFile = new File([byteArray], user.resume.fileName, { type: 'application/pdf' });
        setFile(storedFile);
      }
    }
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Check if file is PDF
    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setFile(file);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      // Read file as base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Data = reader.result as string;
        const fileData = base64Data.split(',')[1]; // Remove data URL prefix

        // Upload resume and get analysis
        const result = await uploadResume(file);
        
        // Save resume with file content as parsed text
        await saveResume(
          file.name,
          fileData,
          fileData,  // Use the file content as parsed text
          result.keywords || []  // Use keywords from the upload response
        );

        clearInterval(progressInterval);
        setUploadProgress(100);
        
        toast({
          title: "Success",
          description: "Resume uploaded and analyzed successfully",
        });

        // Call the success callback if provided
        onUploadSuccess?.();
      };
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload resume",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  }, [onUploadSuccess]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'
        }`}
      >
        <input {...getInputProps()} />
        <Button variant="outline" className="w-full" disabled={isUploading}>
          <Upload className="mr-2 h-4 w-4" />
          {isUploading ? 'Uploading...' : file ? 'Replace Resume' : 'Upload Resume'}
        </Button>
        <p className="mt-2 text-sm text-gray-500">
          {isDragActive
            ? "Drop your resume here"
            : "Drag and drop your resume here, or click to select"}
        </p>
        {file && !isUploading && (
          <p className="mt-2 text-sm text-green-600">
            Current file: {file.name}
          </p>
        )}
        {isUploading && (
          <div className="mt-2">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-primary rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">{uploadProgress}%</p>
          </div>
        )}
      </div>
    </div>
  );
};
