
import React from 'react';
import { Button } from "@/components/ui/button";
import { LineChart, PieChart, Upload, Clock, CheckCircle, AlertCircle, Book, Briefcase, Award, UserCheck, FileText } from 'lucide-react';

const Dashboard = () => {
  // Mock data for job applications
  const applications = [
    { id: 1, company: 'Tech Solutions Inc.', position: 'Senior Frontend Developer', status: 'Interview Scheduled', date: '2023-06-15', match: '92%' },
    { id: 2, company: 'DataDrive Analytics', position: 'Data Scientist', status: 'Under Review', date: '2023-06-10', match: '88%' },
    { id: 3, company: 'Innovate AI', position: 'Machine Learning Engineer', status: 'Submitted', date: '2023-06-05', match: '85%' },
    { id: 4, company: 'Global Systems', position: 'Full Stack Developer', status: 'Rejected', date: '2023-05-28', match: '76%' },
  ];

  // Mock data for insights
  const insights = [
    { id: 1, title: 'Your resume has been optimized for 12 job applications', icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
    { id: 2, title: 'Add more quantifiable achievements to stand out', icon: <Award className="w-5 h-5 text-amber-500" /> },
    { id: 3, title: '3 new job matches found based on your profile', icon: <Briefcase className="w-5 h-5 text-blue-500" /> },
    { id: 4, title: 'Complete your profile to improve match accuracy', icon: <UserCheck className="w-5 h-5 text-purple-500" /> },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Submitted': return 'bg-blue-100 text-blue-700';
      case 'Under Review': return 'bg-amber-100 text-amber-700';
      case 'Interview Scheduled': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Job Search Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Job Matches</h2>
          <p className="text-gray-600 mb-4">You have 3 new job matches</p>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-blue-600">85%</div>
            <div className="text-sm text-gray-500">Average Match Score</div>
          </div>
          <div className="mt-6">
            <Button className="w-full">
              <Briefcase className="mr-2 h-4 w-4" />
              View Matches
            </Button>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Active Applications</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-xl font-semibold text-blue-600">12</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-xl font-semibold text-green-600">3</div>
              <div className="text-sm text-gray-600">Interviews</div>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-lg">
              <div className="text-xl font-semibold text-amber-600">4</div>
              <div className="text-sm text-gray-600">Under Review</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-xl font-semibold text-purple-600">5</div>
              <div className="text-sm text-gray-600">Submitted</div>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            <Clock className="mr-2 h-4 w-4" />
            Track Applications
          </Button>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Resume Status</h2>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Resume.pdf</h3>
              <p className="text-sm text-gray-500">Last optimized: 2 days ago</p>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-md mb-4">
            <p className="text-sm text-blue-700">Your resume is optimized for Software Engineer positions</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1">
              <Upload className="mr-2 h-4 w-4" />
              Update
            </Button>
            <Button className="flex-1">
              Optimize
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Recent Applications</h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match</th>
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
          {insights.map((insight) => (
            <div key={insight.id} className="bg-white shadow rounded-lg p-4 flex items-center">
              <div className="mr-4">{insight.icon}</div>
              <div className="flex-1">
                <p className="text-gray-800">{insight.title}</p>
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
