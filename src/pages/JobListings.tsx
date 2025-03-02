import React from 'react';
import JobSearch from '@/components/JobSearch';

const JobListings = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Job Listings</h1>
      <JobSearch />
    </div>
  );
};

export default JobListings;
