import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext'; // Make sure this path is correct
import ApplyJobModal from '@/components/ApplyJobModal';
import Loader from '@/components/Loader';

const JobDetails = () => {
  const [job, setJob] = useState(null);
  const [candidateId, setCandidateId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id: jobId } = router.query;
  const { token, authUser } = useAuth();

  useEffect(() => {
    const fetchJobAndCandidate = async () => {
      if (!jobId || !authUser) return;

      try {
        // Fetch job details
        const jobResponse = await fetch(`${process.env.API_URL}api/jobs/${jobId}`);
        if (!jobResponse.ok) throw new Error('Failed to fetch job details');
        const jobData = await jobResponse.json();
        setJob(jobData);

        // Fetch candidate ID using the authenticated user's ID
        const candidateResponse = await fetch(`${process.env.API_URL}api/candidates/user/${authUser._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!candidateResponse.ok) throw new Error('Failed to fetch candidate details');
        const candidateData = await candidateResponse.json();
        setCandidateId(candidateData.candidateId);

      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error (e.g., show error message to user)
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobAndCandidate();
  }, [jobId, authUser, token]);

  const handleApply = () => {
    if (!candidateId) {
      // Handle case where candidate ID is not available
      console.error('Candidate ID not available');
      // You might want to show an error message to the user or redirect to profile completion
      return;
    }
    setIsModalOpen(true);
  };

  if (isLoading) return <Loader />;
  if (!job) return <div>Job not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-8 mt-24 bg-white shadow-md rounded-lg w-full">
      <h1 className="text-gray-900 text-3xl font-bold mb-4">{job.title}</h1>
      <p className="text-gray-700 mb-4">{job.description}</p>
      <p className="text-gray-900 font-bold"><strong>Expected Salary Range:</strong>{` ₹${job.expectedSalaryRange.min.toLocaleString()} - ₹${job.expectedSalaryRange.max.toLocaleString()}`}</p>
      <p className="text-gray-900 font-bold"><strong>Experience Required:</strong> {job.experienceRequired} years</p>
      <p className="text-gray-900 font-bold"><strong>Location:</strong> {job.location}</p>
      <p className="text-gray-700"><strong>Skills Required:</strong> {job.skillsRequired.join(', ')}</p>
      <p className="text-gray-600 text-sm mt-2">Company: {job.employerId.companyName}</p>

      <button 
        onClick={handleApply}
        className="bg-blue-500 text-white mt-4 px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Apply for Job
      </button>

      {isModalOpen && (
        <ApplyJobModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          candidateId={candidateId}
          jobId={jobId}
        />
      )}
    </div>
  );
};

export default JobDetails;