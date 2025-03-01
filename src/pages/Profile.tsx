
import React from 'react';

const Profile = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <div className="bg-gray-100 rounded-full h-40 w-40 mx-auto flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-center mt-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  Upload Photo
                </button>
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">First Name</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Enter your last name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Phone</label>
                  <input 
                    type="tel" 
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="(555) 555-5555"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
          <textarea 
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32" 
            placeholder="Briefly describe your professional background, skills, and career goals..."
          ></textarea>
        </div>
        
        <div className="border-t border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Documents</h2>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-md">
              <h3 className="font-medium">Resume</h3>
              <p className="text-sm text-gray-500 mt-1">No resume uploaded</p>
              <button className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                Upload Resume
              </button>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md">
              <h3 className="font-medium">Cover Letter Template</h3>
              <p className="text-sm text-gray-500 mt-1">No cover letter uploaded</p>
              <button className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                Upload Cover Letter
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex justify-end">
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
