import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LineChart, PieChart, Upload, Clock, CheckCircle, AlertCircle, Book, Briefcase, Award, UserCheck, FileText, Sparkles, Bot, User } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { uploadResume, deleteResume, getRecommendedJobs } from '@/services/api';
import { extractKeywords, saveKeywordsToFile } from '@/utils/keywordExtractor';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useResumeContext } from '@/contexts/ResumeContext';

interface ResumeAnalysis {
  primaryField: {
    category: string;
    strengths: string[];
    opportunities: string[];
    marketTrends: string[];
  } | null;
  secondaryField: {
    category: string;
    strengths: string[];
    opportunities: string[];
    marketTrends: string[];
  } | null;
  crossFieldOpportunities: string[];
}

const Dashboard = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [currentFileId, setCurrentFileId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const { setHasUploadedResume, setRecommendedJobs } = useResumeContext();

  // Updated mock data for job applications
  const applications = [
    { 
      id: 1, 
      company: 'Tech Solutions Inc.', 
      position: 'Senior Frontend Developer', 
      status: 'Interview Scheduled', 
      date: '2023-06-15', 
      match: '92%',
      appliedBy: 'ai' // new field
    },
    { 
      id: 2, 
      company: 'DataDrive Analytics', 
      position: 'Data Scientist', 
      status: 'Under Review', 
      date: '2023-06-10', 
      match: '88%',
      appliedBy: 'manual'
    },
    { 
      id: 3, 
      company: 'Innovate AI', 
      position: 'Machine Learning Engineer', 
      status: 'Submitted', 
      date: '2023-06-05', 
      match: '85%',
      appliedBy: 'ai'
    },
    { 
      id: 4, 
      company: 'Global Systems', 
      position: 'Full Stack Developer', 
      status: 'Rejected', 
      date: '2023-05-28', 
      match: '76%',
      appliedBy: 'manual'
    },
  ];

  // Mock data for insights
  const getInsights = () => {
    const baseInsights = [
      { id: 1, title: 'Your resume has been optimized for 12 job applications', icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
      { id: 2, title: '3 new job matches found based on your profile', icon: <Briefcase className="w-5 h-5 text-blue-500" /> },
    ];

    // If we have analysis results, add them as insights
    if (analysis) {
      const analysisInsights = [];

      // Add primary field insights (2 strengths, 2 opportunities)
      if (analysis.primaryField) {
        // Add top 2 strengths
        analysisInsights.push(
          ...analysis.primaryField.strengths.slice(0, 2).map((strength, index) => ({
            id: `strength-${index}`,
            title: strength,
            icon: <Award className="w-5 h-5 text-green-500" />
          }))
        );

        // Add top 2 opportunities
        analysisInsights.push(
          ...analysis.primaryField.opportunities.slice(0, 2).map((opportunity, index) => ({
            id: `opportunity-${index}`,
            title: opportunity,
            icon: <Sparkles className="w-5 h-5 text-yellow-500" />
          }))
        );
      }

      // Add one secondary field opportunity if available
      if (analysis.secondaryField) {
        analysisInsights.push({
          id: 'secondary-opportunity',
          title: analysis.secondaryField.opportunities[0],
          icon: <Sparkles className="w-5 h-5 text-blue-500" />
        });
      }

      // Add one cross-field opportunity if available
      if (analysis.crossFieldOpportunities.length > 0) {
        analysisInsights.push({
          id: 'cross-field',
          title: analysis.crossFieldOpportunities[0],
          icon: <Sparkles className="w-5 h-5 text-purple-500" />
        });
      }

      // Return combined insights, limited to 8 total
      return [...baseInsights, ...analysisInsights].slice(0, 8);
    }

    // If no analysis, return base insights
    return baseInsights;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Submitted': return 'bg-blue-100 text-blue-700';
      case 'Under Review': return 'bg-amber-100 text-amber-700';
      case 'Interview Scheduled': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
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

    try {
      setIsUploading(true);
      setIsAnalyzing(true);
      setHasUploadedResume(false); // Reset state before upload
      
      // If there's a previous file, delete it first
      if (currentFileId) {
        try {
          await deleteResume(currentFileId);
          console.log('Previous resume deleted successfully');
        } catch (error) {
          console.error('Error deleting previous resume:', error);
          // Continue with upload even if delete fails
        }
      }

      const result = await uploadResume(file);
      setUploadedFile(file);
      setCurrentFileId(result.fileId);
      
      // Handle the combined upload and analysis response
      if (result.insights) {
        setAnalysis(result.insights);
        setHasUploadedResume(true); // Set to true only after successful upload and analysis

        // Extract and save keywords from the resume text
        if (result.parsedText) {
          const keywords = extractKeywords(result.parsedText);
          await saveKeywordsToFile(keywords);
          console.log('Keywords extracted and saved:', keywords);
        }

        // Get recommended jobs based on the resume
        try {
          const recommendedJobs = await getRecommendedJobs();
          setRecommendedJobs(recommendedJobs);
          console.log('Recommended jobs fetched:', recommendedJobs);
        } catch (error) {
          console.error('Error fetching recommended jobs:', error);
          toast({
            title: "Warning",
            description: "Resume uploaded but couldn't fetch job recommendations. Please try again later.",
            variant: "destructive",
          });
        }
        
        toast({
          title: "Success",
          description: "Resume uploaded and analyzed successfully. Keywords have been extracted.",
        });
      } else if (result.analysisError) {
        setHasUploadedResume(false);
        toast({
          title: "Upload successful, but analysis failed",
          description: result.analysisError,
          variant: "destructive",
        });
      }
    } catch (error) {
      setHasUploadedResume(false);
      toast({
        title: "Operation failed",
        description: error instanceof Error ? error.message : "Failed to process resume",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setIsAnalyzing(false);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Job Search Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Resume Status</h2>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">{uploadedFile ? uploadedFile.name : 'Resume.pdf'}</h3>
              <p className="text-sm text-gray-500">
                {isAnalyzing ? 'Analyzing...' : analysis ? 'Analysis complete' : 'Upload to analyze'}
              </p>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-md mb-4">
            <p className="text-sm text-blue-700">
              {analysis?.primaryField 
                ? `Your resume is optimized for ${analysis.primaryField.category}${analysis.secondaryField ? ` and ${analysis.secondaryField.category}` : ''} positions`
                : 'Upload your resume to see optimization suggestions'}
            </p>
          </div>
          <div className="flex space-x-2">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf"
              onChange={handleFileUpload}
            />
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={triggerFileUpload}
              disabled={isUploading || isAnalyzing}
            >
              <Upload className="mr-2 h-4 w-4" />
              {isUploading ? 'Uploading...' : isAnalyzing ? 'Analyzing...' : 'Upload Resume'}
            </Button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">Active Applications</h2>
          <div className="grid grid-cols-1 gap-2">
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-xl font-semibold text-purple-600">5</div>
              <div className="text-sm text-gray-600">Submitted</div>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-xl font-semibold text-blue-600">8</div>
              <div className="text-sm text-gray-600">Matches Not Applied</div>
            </div>
          </div>
        </div>
        
      </div>
      
      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Recent Applications</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/applications')}
          >
            View All
          </Button>
        </div>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{app.company}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-green-600">{app.match}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {app.appliedBy === 'ai' ? (
                          <div className="flex items-center text-purple-600">
                            <Bot size={16} className="mr-1" />
                            <span className="text-sm">AI Applied</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-blue-600">
                            <User size={16} className="mr-1" />
                            <span className="text-sm">Manual</span>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {applications.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No applications to display</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Personalized Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getInsights().map((insight) => (
            <div 
              key={insight.id} 
              className="bg-white shadow rounded-lg p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors"
            >
              <div className="mt-1">{insight.icon}</div>
              <div className="flex-1">
                <p className="text-gray-800 text-sm">{insight.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-10 bg-blue-50 rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-blue-700">Ready to apply automatically?</h2>
            <p className="text-blue-600 mt-2">Let our AI find and apply to jobs that match your profile</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Enable Auto-Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
