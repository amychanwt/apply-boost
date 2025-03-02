import React from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, Bot, BriefcaseBusiness, ExternalLink, ArrowRight, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How JobMatcher Works</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our AI-powered platform streamlines your job search process from start to finish, helping you find and land your dream job faster.
            </p>
          </div>
          
          {/* Process Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Find Jobs</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI scans thousands of job listings to match your skills and experience with the perfect opportunities.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Optimize Applications</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We customize your resume and cover letter for each job application to maximize your chances of success.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <BriefcaseBusiness className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Track Progress</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor all your applications in one place and receive real-time updates on their status.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Detailed Process Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Choose Your Job Search Path</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Manual Option */}
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4">
                  <Search className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold">Browse Jobs Manually</h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Take control of your job search by browsing through our extensive database of job listings.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5 mr-2 shrink-0" />
                  <span>Search and filter job listings based on your preferences</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5 mr-2 shrink-0" />
                  <span>View detailed job descriptions and requirements</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5 mr-2 shrink-0" />
                  <span>Apply directly on external job websites</span>
                </li>
              </ul>
              
              <div className="space-y-4">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/jobs" className="flex items-center justify-center">
                    <Search className="w-4 h-4 mr-2" />
                    Browse Available Jobs
                  </Link>
                </Button>
                
                <Button asChild variant="ghost" className="w-full">
                  <a href="#external-sites" className="flex items-center justify-center">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit External Job Sites
                  </a>
                </Button>
              </div>
            </div>
            
            {/* AI Option */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4">
                  <Bot className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold">Use AI to Find & Apply</h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Let our AI do the heavy lifting! Sign in to unlock our AI-powered job matching and application automation.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5 mr-2 shrink-0" />
                  <span>AI scans thousands of jobs to find your perfect matches</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5 mr-2 shrink-0" />
                  <span>Optimizes your resume and cover letter for each application</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5 mr-2 shrink-0" />
                  <span>Automatically applies to jobs that match your criteria</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5 mr-2 shrink-0" />
                  <span>Tracks application statuses and provides insights</span>
                </li>
              </ul>
              
              <Button asChild className="w-full">
                <Link to="/login" className="flex items-center justify-center">
                  <UserCheck className="w-4 h-4 mr-2" />
                  Sign In for Personalized Experience
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* External Job Sites Section */}
      <section className="py-16 px-4" id="external-sites">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-10">Popular Job Websites</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            If you prefer to search manually, here are some popular job websites where you can find opportunities. For a more streamlined experience with AI assistance, sign in to your JobMatcher account.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['LinkedIn', 'Indeed', 'Glassdoor', 'ZipRecruiter', 'Monster', 'AngelList', 'Dice', 'CareerBuilder'].map(site => (
              <a 
                key={site} 
                href="#" 
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center hover:shadow-md transition-shadow"
              >
                <span className="font-medium">{site}</span>
                <ExternalLink className="w-4 h-4 ml-2 inline-block" />
              </a>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-xl font-bold mb-4">Want a More Personalized Experience?</h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Sign in to JobMatcher to unlock AI-powered job matching, resume optimization, and application tracking.
            </p>
            <Button asChild>
              <Link to="/login" className="px-8">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">How does JobMatcher's AI find relevant jobs?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI scans thousands of job listings across multiple platforms and analyzes them based on your skills, experience, and preferences. It identifies key requirements from job descriptions and matches them to your profile to find the most relevant opportunities.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">How does resume optimization work?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI tailors your resume for each application by highlighting relevant skills and experiences that match the job requirements. It also ensures your resume is ATS-friendly (Applicant Tracking System compatible) to increase your chances of getting past automated screening processes.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Is my data secure?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Absolutely. We use industry-standard encryption to protect your personal information and job application data. We never share your information with third parties without your explicit consent.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HowItWorks;