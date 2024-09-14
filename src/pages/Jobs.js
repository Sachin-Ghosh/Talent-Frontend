import React, { useState, useEffect } from 'react';
import JobCard from '@/components/JobCard';
import JobFilter from '@/components/JobFilter';
import Loader from '@/components/Loader';

const JobsPage = ({ jobs }) => {
  const [filteredJobs, setFilteredJobs] = useState(jobs); 
  const [jobTitles, setJobTitles] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const delay = setTimeout(() => {
      if (jobs && jobs.length > 0) {
        const uniqueTitles = [...new Set(jobs.map((job) => job.title))];
        const uniqueLocations = [...new Set(jobs.map((job) => job.location))];
        
        setJobTitles(uniqueTitles);
        setLocations(uniqueLocations);
      }
      setLoading(false); 
    }, 2000); 

    return () => clearTimeout(delay); 
  }, [jobs]);

  const handleFilter = (filters) => {
    const { keyword, location } = filters;

    const filtered = jobs.filter((job) => {
      const matchesKeyword = keyword
        ? job.title.toLowerCase().includes(keyword.toLowerCase())
        : true;  
      const matchesLocation = location
        ? job.location.toLowerCase().includes(location.toLowerCase())
        : true;  

      return matchesKeyword && matchesLocation;  
    });

    setFilteredJobs(filtered);
  };

  if (loading) {
    return <Loader />;  
  }

  return (
    <div className="max-w-4xl mx-auto p-8 mt-14">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>

      {/* Job Filter Component */}
      <JobFilter onFilter={handleFilter} jobTitles={jobTitles} locations={locations} />

      {filteredJobs.length === 0 ? (
        <p>No jobs available matching your criteria. Please try different filters.</p>
      ) : (
        filteredJobs.map((job) => <JobCard key={job._id} job={job} />)
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}api/jobs`);
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
