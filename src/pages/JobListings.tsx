
import React from 'react';

const JobListings = () => {
  // Sample job data (this would normally come from an API)
  const jobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA (Remote)',
      matchScore: 92,
      description: 'We are looking for an experienced React developer to join our team to build high-performance web applications.',
      salary: '$120,000 - $150,000',
      posted: '2 days ago',
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'Digital Solutions',
      location: 'New York, NY',
      matchScore: 87,
      description: 'Join our team to work on cutting-edge web applications using React, Node.js, and AWS.',
      salary: '$110,000 - $135,000',
      posted: '5 days ago',
    },
    {
      id: 3,
      title: 'UX/UI Designer with React Experience',
      company: 'Creative Agency',
      location: 'Remote',
      matchScore: 78,
      description: 'Looking for a talented designer who understands React and can create beautiful, user-friendly interfaces.',
      salary: '$90,000 - $120,000',
      posted: '1 week ago',
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
      
      <div className="bg-white p-4 rounded-md shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input 
              type="text" 
              placeholder="Search job titles, skills, or companies" 
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-full md:w-1/4">
            <select className="w-full p-2 border border-gray-300 rounded">
              <option>All Locations</option>
              <option>Remote Only</option>
              <option>San Francisco, CA</option>
              <option>New York, NY</option>
              <option>Austin, TX</option>
            </select>
          </div>
          <div>
            <button className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {jobs.length > 0 ? (
          jobs.map(job => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h2 className="text-xl font-bold">{job.title}</h2>
                  <p className="text-gray-600">{job.company} • {job.location}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {job.matchScore}% Match
                  </span>
                </div>
              </div>
              
              <p className="mt-4 text-gray-700">{job.description}</p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-800">React</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-800">JavaScript</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-800">TypeScript</span>
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <p className="text-gray-700">{job.salary}</p>
                  <p className="text-sm text-gray-500">Posted {job.posted}</p>
                </div>
                <div className="mt-4 sm:mt-0 flex gap-3">
                  <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition-colors">
                    Save
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-600">No job listings found. Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListings;
