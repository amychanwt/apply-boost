import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, CheckCircle, Users, FileText, Briefcase, PieChart, Search, Zap, Database, Bot, LineChart, MessageSquare, Bell, Sparkles } from 'lucide-react';

const Index = () => {
  // Smooth scroll to element when clicking navigation links
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id || '');
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 100,
            behavior: 'smooth',
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <div className="overflow-hidden">
      <Hero />
      
      {/* Core Functionalities Section */}
      <section className="py-24 bg-white dark:bg-gray-900" id="core-functionalities">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Powerful AI-Driven Features</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Our platform uses advanced AI technology to streamline every step of your job search process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* AI-Powered Job Matching */}
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="w-14 h-14 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-6">
                <Search size={28} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">AI-Powered Job Matching</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Zap size={18} className="text-indigo-500 shrink-0 mt-1 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Finds relevant job listings from top platforms</span>
                </li>
                <li className="flex items-start">
                  <Zap size={18} className="text-indigo-500 shrink-0 mt-1 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Extracts key qualifications and skills from descriptions</span>
                </li>
                <li className="flex items-start">
                  <Zap size={18} className="text-indigo-500 shrink-0 mt-1 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Identifies employer's preferred candidate profile</span>
                </li>
                <li className="flex items-start">
                  <Zap size={18} className="text-indigo-500 shrink-0 mt-1 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Matches your skills to job requirements</span>
                </li>
              </ul>
            </div>
            
            {/* Resume & Cover Letter Optimization */}
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="w-14 h-14 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
                <FileText size={28} className="text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Resume & Cover Letter Optimization</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Zap size={18} className="text-green-500 shrink-0 mt-1 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Tailors documents to align with job descriptions</span>
                </li>
                <li className="flex items-start">
                  <Zap size={18} className="text-green-500 shrink-0 mt-1 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Uses compelling language to highlight your fit</span>
                </li>
                <li className="flex items-start">
                  <Zap size={18} className="text-green-500 shrink-0 mt-1 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Adds quantifiable achievements to showcase impact</span>
                </li>
                <li className="flex items-start">
                  <Zap size={18} className="text-green-500 shrink-0 mt-1 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Ensures ATS compatibility while maintaining quality</span>
                </li>
              </ul>
            </div>
            
            {/* Application Tracking & Insights */}
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="w-14 h-14 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6">
                <LineChart size={28} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Application Tracking & Insights</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Zap size={18} className="text-blue-500 shrink-0 mt-1 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Notifies of new job matches and tracks applications</span>
                </li>
                <li className="flex items-start">
                  <Zap size={18} className="text-blue-500 shrink-0 mt-1 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Generates summaries of document modifications</span>
                </li>
                <li className="flex items-start">
                  <Zap size={18} className="text-blue-500 shrink-0 mt-1 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Provides real-time status updates on applications</span>
                </li>
                <li className="flex items-start">
                  <Zap size={18} className="text-blue-500 shrink-0 mt-1 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Offers AI-driven personalized insights and tips</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlights */}
      <section className="py-24 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Personalized Experience for Every User</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                  Whether you're browsing as a guest or signed in to your account, Apply Boost provides tools tailored to your needs.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-4 shrink-0">
                      <Search className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Browse Jobs</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Search and explore job listings even without an account. After signing in, get AI-recommended jobs based on your profile.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4 shrink-0">
                      <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">AI Job Finder & Auto-Apply</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Let our AI find relevant jobs for you and automatically submit custom-tailored applications that stand out.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-4 shrink-0">
                      <Database className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Document Management</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Upload and manage your resume and cover letter templates. Our AI will use these to create optimized versions for each application.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Features</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Briefcase className="w-4 h-4 mr-2 text-blue-500" />
                      <span>Before Login</span>
                    </h4>
                    <ul className="space-y-2 pl-6">
                      <li className="flex items-center">
                        <CheckCircle size={16} className="text-gray-400 mr-2" />
                        <span className="text-gray-600 dark:text-gray-300 text-sm">Browse job listings</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle size={16} className="text-gray-400 mr-2" />
                        <span className="text-gray-600 dark:text-gray-300 text-sm">Learn how the platform works</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle size={16} className="text-gray-400 mr-2" />
                        <span className="text-gray-600 dark:text-gray-300 text-sm">Visit external job sites</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle size={16} className="text-gray-400 mr-2" />
                        <span className="text-gray-600 dark:text-gray-300 text-sm">Create an account / Sign in</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
                      <span>After Login</span>
                    </h4>
                    <ul className="space-y-2 pl-6">
                      <li className="flex items-center">
                        <CheckCircle size={16} className="text-blue-500 mr-2" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">All public features, plus:</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle size={16} className="text-blue-500 mr-2" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">Personalized dashboard & application tracking</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle size={16} className="text-blue-500 mr-2" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">Upload resume & cover letter for AI processing</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle size={16} className="text-blue-500 mr-2" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">AI job finder & auto-apply functionality</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle size={16} className="text-blue-500 mr-2" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">AI-powered job recommendations</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle size={16} className="text-blue-500 mr-2" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">Real-time status updates & notifications</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">93%</div>
              <p className="opacity-90">Improved Interview Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">75K+</div>
              <p className="opacity-90">Active Users</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15K+</div>
              <p className="opacity-90">Successful Hires</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.2M</div>
              <p className="opacity-90">Applications Optimized</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Job Seekers Say</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Join thousands of professionals who have found success with Apply Boost.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                "After months of job hunting with no luck, Apply Boost helped me land interviews at three top tech companies within two weeks!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-medium">JS</span>
                </div>
                <div>
                  <h4 className="font-medium">Jessica S.</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">UX Designer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                "The resume optimization feature is incredible. I could see exactly how my resume was being improved for each application I submitted."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-medium">MT</span>
                </div>
                <div>
                  <h4 className="font-medium">Michael T.</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Software Engineer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                "The application tracking system made my job search so much more organized. I finally felt in control of my career journey."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-medium">AL</span>
                </div>
                <div>
                  <h4 className="font-medium">Amelia L.</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Marketing Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
         
      {/* CTA Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl overflow-hidden shadow-xl">
            <div className="px-6 py-12 sm:p-16 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Supercharge Your Job Search?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who found their dream jobs faster with Apply Boost.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Sign Up for Free
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
