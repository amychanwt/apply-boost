
import React from 'react';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Job Search Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Job Matches</h2>
          <p className="text-gray-600 mb-4">You have 0 new job matches</p>
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-sm text-blue-700">Upload your resume to get personalized job matches</p>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Active Applications</h2>
          <p className="text-gray-600 mb-4">You have 0 applications in progress</p>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Submitted: 0</span>
            <span>Interviews: 0</span>
            <span>Offers: 0</span>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Resume Status</h2>
          <p className="text-gray-600">No resume uploaded</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            Upload Resume
          </button>
        </div>
      </div>
      
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-600 text-center py-8">No recent activity to display</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
