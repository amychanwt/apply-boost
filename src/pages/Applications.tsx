
import React from 'react';

const Applications = () => {
  // Sample applications data (this would normally come from an API)
  const applications = [
    {
      id: 1,
      jobTitle: 'Senior React Developer',
      company: 'TechCorp Inc.',
      appliedDate: '2023-04-15',
      status: 'Interview',
      nextStep: 'Technical Interview on April 22',
      resumeOptimized: true,
      coverLetterOptimized: true,
    },
    {
      id: 2,
      jobTitle: 'Frontend Developer',
      company: 'InnovateTech',
      appliedDate: '2023-04-10',
      status: 'Applied',
      nextStep: 'Waiting for response',
      resumeOptimized: true,
      coverLetterOptimized: false,
    },
    {
      id: 3,
      jobTitle: 'UI/UX Designer',
      company: 'DesignHub',
      appliedDate: '2023-04-05',
      status: 'Rejected',
      nextStep: 'Application not selected',
      resumeOptimized: false,
      coverLetterOptimized: false,
    }
  ];
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'Interview':
        return 'bg-green-100 text-green-800';
      case 'Applied':
        return 'bg-blue-100 text-blue-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Applications</h1>
      
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 border-r border-gray-200">
            <p className="text-3xl font-bold text-blue-600">{applications.length}</p>
            <p className="text-gray-600">Total Applications</p>
          </div>
          <div className="p-4 border-r border-gray-200">
            <p className="text-3xl font-bold text-green-600">
              {applications.filter(app => app.status === 'Interview').length}
            </p>
            <p className="text-gray-600">Interviews</p>
          </div>
          <div className="p-4">
            <p className="text-3xl font-bold text-purple-600">
              {applications.filter(app => app.resumeOptimized).length}
            </p>
            <p className="text-gray-600">Optimized Applications</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {applications.length > 0 ? (
          applications.map(app => (
            <div key={app.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h2 className="text-xl font-bold">{app.jobTitle}</h2>
                    <p className="text-gray-600">{app.company}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Applied On</p>
                    <p>{new Date(app.appliedDate).toLocaleDateString()}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Next Step</p>
                    <p>{app.nextStep}</p>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {app.resumeOptimized && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs">
                      Resume Optimized
                    </span>
                  )}
                  {app.coverLetterOptimized && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs">
                      Cover Letter Optimized
                    </span>
                  )}
                </div>
              </div>
              
              <div className="border-t border-gray-200 bg-gray-50 p-4 flex justify-end gap-3">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition-colors">
                  View Details
                </button>
                {app.status !== 'Rejected' && (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    Update Status
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-600 mb-4">You haven't applied to any jobs yet.</p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Browse Job Listings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
