import React, { createContext, useContext, useState, ReactNode } from 'react';
import { JobMatch } from '@/utils/userStorage';

interface ResumeContextType {
  hasUploadedResume: boolean;
  setHasUploadedResume: (value: boolean) => void;
  recommendedJobs: JobMatch[];
  setRecommendedJobs: (jobs: JobMatch[]) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
};

interface ResumeProviderProps {
  children: ReactNode;
}

export const ResumeProvider: React.FC<ResumeProviderProps> = ({ children }) => {
  const [hasUploadedResume, setHasUploadedResume] = useState(false);
  const [recommendedJobs, setRecommendedJobs] = useState<JobMatch[]>([]);

  return (
    <ResumeContext.Provider
      value={{
        hasUploadedResume,
        setHasUploadedResume,
        recommendedJobs,
        setRecommendedJobs,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}; 