
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, CheckCircle, Users } from 'lucide-react';

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
      
      <Features />
      
      {/* How It Works Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800" id="how-it-works">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How JobMatcher Works</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              A simple three-step process to supercharge your job search and increase your chances of landing interviews.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="relative">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 h-full border border-gray-100 dark:border-gray-700 shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Upload Your Profile</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Create your profile and upload your existing resume and cover letter templates. Our AI analyzes your skills and experience.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-700">
                <ArrowRight size={40} />
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 h-full border border-gray-100 dark:border-gray-700 shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Browse Job Matches</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Review personalized job recommendations sorted by match percentage. Filter results based on location, salary, and other preferences.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-700">
                <ArrowRight size={40} />
              </div>
            </div>
            
            <div>
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 h-full border border-gray-100 dark:border-gray-700 shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Apply with Confidence</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Let our AI optimize your resume and cover letter for each job. Apply directly through our platform and track your application status.
                </p>
              </div>
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
              Join thousands of professionals who have found success with JobMatcher.
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
                "After months of job hunting with no luck, JobMatcher helped me land interviews at three top tech companies within two weeks!"
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
      
      {/* Pricing Section */}
      <section className="py-24 bg-white dark:bg-gray-900" id="pricing">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Choose the plan that's right for your job search needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Free Trial</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Perfect for getting started</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-gray-600 dark:text-gray-400">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">5 Job Applications</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">Basic Resume Optimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">Job Matching</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Start Free</Button>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border-2 border-blue-600 shadow-lg transform md:-translate-y-4 transition-all duration-300 hover:shadow-xl relative">
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                Most Popular
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-2">Premium</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Best for active job seekers</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$19</span>
                  <span className="text-gray-600 dark:text-gray-400">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">Unlimited Job Applications</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">Advanced Resume & Cover Letter Optimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">Application Tracking System</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">Priority Job Matching</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">Email Notifications</span>
                  </li>
                </ul>
                <Button className="w-full">Get Started</Button>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Professional</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">For career advancement</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$39</span>
                  <span className="text-gray-600 dark:text-gray-400">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">Everything in Premium</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">Career Coaching (2 sessions/month)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">LinkedIn Profile Optimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">Interview Preparation</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Choose Plan</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800" id="faq">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Have questions? We've got answers.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-2">How does JobMatcher optimize my resume?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our AI analyzes the job description and your resume to identify key skills and experience the employer is looking for. It then suggests modifications to highlight relevant qualifications, incorporate industry-specific keywords, and ensure your resume passes through Applicant Tracking Systems (ATS).
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-2">Can I use JobMatcher for multiple industries?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Absolutely! JobMatcher works across all industries and job types. Our AI is trained on millions of job postings across sectors and can identify industry-specific requirements and terminology to optimize your applications accordingly.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-2">How accurate is the job matching algorithm?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our job matching algorithm has a proven accuracy rate of over 90% in identifying suitable roles for candidates. It considers over 50 different factors including skills, experience, education, location preferences, and career trajectory to provide highly relevant matches.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-2">Can I cancel my subscription anytime?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Yes, you can cancel your subscription at any time with no questions asked. There are no long-term contracts or cancellation fees. Your subscription will remain active until the end of your current billing period.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-2">Is my data secure?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We take data security very seriously. All data is encrypted both in transit and at rest, and we never share your personal information with third parties without your explicit consent. Our systems comply with industry-standard security protocols to keep your information safe.
              </p>
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
                Join thousands of professionals who found their dream jobs faster with JobMatcher.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Get Started for Free
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Users size={18} className="mr-2" />
                  See Success Stories
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
