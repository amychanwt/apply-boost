import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Sparkles, LogIn, Search } from 'lucide-react';
import JobSearch from '@/components/JobSearch';
import { getRecommendedJobs } from '@/services/api';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { getStoredKeywords } from '@/utils/keywordExtractor';

const JobListings = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showRecommended, setShowRecommended] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [hasKeywords, setHasKeywords] = useState(false);
  const [keywords, setKeywords] = useState(null);

  // Check if user has keywords file and load keywords
  useEffect(() => {
    const checkKeywords = async () => {
      if (isAuthenticated) {
        const userKeywords = await getStoredKeywords();
        setHasKeywords(!!userKeywords);
        setKeywords(userKeywords);
      } else {
        setHasKeywords(false);
        setKeywords(null);
      }
    };
    checkKeywords();
  }, [isAuthenticated]);

  // Debug logging
  useEffect(() => {
    console.log('JobListings state:', {
      isAuthenticated,
      hasKeywords,
      keywords,
      recommendedJobsCount: recommendedJobs?.length || 0,
      showRecommended
    });
  }, [isAuthenticated, hasKeywords, keywords, recommendedJobs, showRecommended]);

  // Fetch recommended jobs when component mounts if keywords exist
  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      if (hasKeywords && isAuthenticated && (!recommendedJobs || recommendedJobs.length === 0)) {
        console.log('Fetching recommended jobs...');
        try {
          setIsLoading(true);
          const jobs = await getRecommendedJobs();
          console.log('Fetched jobs:', jobs);
          setRecommendedJobs(jobs);
        } catch (error) {
          console.error('Failed to fetch recommended jobs:', error);
          toast({
            title: "Error",
            description: "Failed to fetch job recommendations. Please try again later.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchRecommendedJobs();
  }, [hasKeywords, isAuthenticated, recommendedJobs]);

  const handleRecommendationToggle = async (checked: boolean) => {
    console.log('Toggle recommendations:', {
      checked,
      isAuthenticated,
      hasKeywords,
      currentRecommendedJobs: recommendedJobs?.length || 0
    });

    if (checked && !isAuthenticated) {
      toast({
        title: "Authentication required",
        description: (
          <div className="space-y-2">
            <p>Please log in to see personalized job recommendations.</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/login')}
              className="w-full"
            >
              Go to Login
            </Button>
          </div>
        ),
      });
      setShowRecommended(false);
      return;
    }

    if (checked && !hasKeywords) {
      toast({
        title: "Keywords setup required",
        description: (
          <div className="space-y-2">
            <p>To get personalized job recommendations, you need to set up your job search keywords in the Dashboard.</p>
            <p className="text-sm text-muted-foreground">Keywords help us match you with the most relevant jobs based on your skills and interests.</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/dashboard')}
              className="w-full"
            >
              Go to Dashboard
            </Button>
          </div>
        ),
      });
      setShowRecommended(false);
      return;
    }
    
    setShowRecommended(checked);
    
    if (checked && (!recommendedJobs || recommendedJobs.length === 0)) {
      try {
        setIsLoading(true);
        const jobs = await getRecommendedJobs();
        console.log('Fetched jobs on toggle:', jobs);
        setRecommendedJobs(jobs);
        
        // Show success message with keyword info
        if (jobs.length > 0 && keywords) {
          toast({
            title: "Recommendations ready!",
            description: (
              <div className="space-y-2">
                <p>Found {jobs.length} jobs matching your keywords:</p>
                <div className="text-sm">
                  {keywords.technical.length > 0 && (
                    <p>🔧 Technical: {keywords.technical.slice(0, 3).join(', ')}{keywords.technical.length > 3 ? '...' : ''}</p>
                  )}
                  {keywords.industry.length > 0 && (
                    <p>🏢 Industry: {keywords.industry.slice(0, 3).join(', ')}{keywords.industry.length > 3 ? '...' : ''}</p>
                  )}
                </div>
              </div>
            ),
          });
        }
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
        toast({
          title: "Failed to fetch recommendations",
          description: (
            <div className="space-y-2">
              <p>{error instanceof Error ? error.message : "Could not load recommended jobs"}</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleRecommendationToggle(true)}
                className="w-full"
              >
                Try Again
              </Button>
            </div>
          ),
          variant: "destructive",
        });
        setShowRecommended(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Job Listings</h1>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="recommendations"
                checked={showRecommended}
                onCheckedChange={handleRecommendationToggle}
                disabled={isLoading}
              />
              <div className="flex items-center space-x-2">
                <Label 
                  htmlFor="recommendations" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Show recommended jobs
                </Label>
                {hasKeywords && <Sparkles className="h-4 w-4 text-yellow-500" />}
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <p className="text-sm text-muted-foreground">
                <Search className="h-4 w-4 inline mr-1" />
                Search all jobs or
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/login')}
                className="flex items-center space-x-2"
              >
                <LogIn className="h-4 w-4" />
                <span>Log in for recommendations</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {isAuthenticated && hasKeywords && (
        <div className="mb-4 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-start space-x-4">
            <Sparkles className="h-5 w-5 text-yellow-500 mt-1" />
            <div>
              <h3 className="font-medium">Your Job Search Keywords</h3>
              <div className="mt-2 text-sm space-y-1">
                {keywords?.technical.length > 0 && (
                  <p>🔧 Technical Skills: {keywords.technical.slice(0, 5).join(', ')}{keywords.technical.length > 5 ? '...' : ''}</p>
                )}
                {keywords?.industry.length > 0 && (
                  <p>🏢 Industries: {keywords.industry.slice(0, 5).join(', ')}{keywords.industry.length > 5 ? '...' : ''}</p>
                )}
                {keywords?.soft.length > 0 && (
                  <p>👥 Soft Skills: {keywords.soft.slice(0, 5).join(', ')}{keywords.soft.length > 5 ? '...' : ''}</p>
                )}
              </div>
              <Button
                variant="link"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="mt-2 h-auto p-0"
              >
                Update Keywords →
              </Button>
            </div>
          </div>
        </div>
      )}

      <JobSearch 
        showRecommended={showRecommended}
        isLoading={isLoading}
        recommendedJobs={recommendedJobs}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
};

export default JobListings;
