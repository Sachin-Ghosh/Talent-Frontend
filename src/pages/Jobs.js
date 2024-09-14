


import React from 'react';
import JobCard from '@/components/JobCard';

const JobsPage = ({ jobs }) => {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8 mt-14">
        <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
        <p>No jobs available at the moment. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 mt-14">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const res = await fetch('https://talent-backend-wfqd.onrender.com/api/jobs');
    if (!res.ok) {
      throw new Error('Failed to fetch jobs');
    }

    const jobs = await res.json();

    return {
      props: {
        jobs,
      },
    };
  } catch (error) {
    console.error('Error fetching jobs:', error);

    return {
      props: {
        jobs: [],
      },
    };
  }
};

export default JobsPage;