import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronRight, Briefcase, FileText, PieChart } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      
      const moveX = x * 10 - 5;
      const moveY = y * 10 - 5;
      
      const elements = heroRef.current.querySelectorAll('.floating-element') as NodeListOf<HTMLElement>;
      elements.forEach((el) => {
        const depth = parseFloat(el.getAttribute('data-depth') || '1');
        const translateX = moveX * depth;
        const translateY = moveY * depth;
        el.style.transform = `translate(${translateX}px, ${translateY}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden pt-20 pb-32"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-element absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" data-depth="0.5"></div>
        <div className="floating-element absolute top-1/3 right-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '1s'}} data-depth="0.8"></div>
        <div className="floating-element absolute bottom-1/4 right-1/3 w-60 h-60 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}} data-depth="0.6"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          <div className="w-full lg:w-1/2 text-center lg:text-left lg:pr-10 mb-12 lg:mb-0">
            <div className="inline-block mb-4 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium animate-fade-in">
              AI-Powered Job Applications
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-up" style={{animationDelay: '200ms'}}>
              Find your perfect job <span className="gradient-text">match</span> easily
            </h1>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 animate-slide-up" style={{animationDelay: '400ms'}}>
              Let AI find relevant job listings and optimize your applications. 
              Stand out with tailored resumes and cover letters that showcase your 
              skills to potential employers.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-up" style={{animationDelay: '600ms'}}>
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
                <ChevronRight size={16} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                <Link to="/how-it-works">
                  See How It Works
                </Link>
              </Button>
            </div>
            
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-slide-up" style={{animationDelay: '800ms'}}>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Briefcase size={20} className="text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Job Matching</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <FileText size={20} className="text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Resume Optimization</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <PieChart size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Application Tracking</span>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative">
            <div className="relative max-w-lg mx-auto lg:ml-auto lg:mr-0 animate-scale-in" style={{animationDelay: '600ms'}}>
              <div className="glass-card rounded-2xl overflow-hidden shadow-xl">
                <div className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Your Job Match</h3>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900/30 dark:text-green-300">93% Match</span>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 mb-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 mr-4">
                        <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Senior Product Designer</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Acme Inc. • San Francisco, CA</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded dark:bg-blue-900/20 dark:text-blue-300">UX Design</span>
                          <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded dark:bg-blue-900/20 dark:text-blue-300">Product Design</span>
                          <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded dark:bg-blue-900/20 dark:text-blue-300">Figma</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Skills Match</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between mb-1 text-xs">
                          <span>UX Research</span>
                          <span>95%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                          <div className="bg-blue-600 h-1.5 rounded-full" style={{width: "95%"}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-xs">
                          <span>Visual Design</span>
                          <span>88%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                          <div className="bg-blue-600 h-1.5 rounded-full" style={{width: "88%"}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-xs">
                          <span>Prototyping</span>
                          <span>92%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                          <div className="bg-blue-600 h-1.5 rounded-full" style={{width: "92%"}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full">Optimize Resume & Apply</Button>
                </div>
              </div>
              
              <div className="floating-element absolute -bottom-4 -right-4 glass-card p-4 rounded-lg shadow-lg animate-float max-w-xs" data-depth="1.2" style={{animationDelay: '1s'}}>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-800 dark:text-gray-200 font-medium">AI Resume Optimization</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Improve ATS compatibility by 80%</p>
                  </div>
                </div>
              </div>
              
              <div className="floating-element absolute -top-4 -left-4 glass-card p-4 rounded-lg shadow-lg animate-float max-w-xs" data-depth="1.5" style={{animationDelay: '1.5s'}}>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-800 dark:text-gray-200 font-medium">Real-time Job Matching</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Find jobs that fit your skills</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
