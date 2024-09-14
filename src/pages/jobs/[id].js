// import React , { useState }from 'react';
// import ApplyJobModal from '@/components/ApplyJobModal';

// const JobDetails = ({ job }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const handleApplyClick = () => {
//       setIsModalOpen(true);
//     };
  
//     const handleCloseModal = () => {
//       setIsModalOpen(false);
//     };
  
//     const handleSubmitApplication = (formData) => {
//       console.log('Application submitted with data:', formData);
//       // backend
//       setIsModalOpen(false);
//     };

//   if (!job) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-8 mt-24 bg-white shadow-md rounded-lg w-full">
//       <h1 className="text-gray-900 text-3xl font-bold mb-4">{job.title}</h1>
//       <p className="text-gray-700 mb-4">{job.description}</p>
//       <p className="text-gray-900 font-bold"><strong>Salary:</strong> {job.salaryRange}</p>
//       <p className="text-gray-900 font-bold"><strong>Experience Required:</strong> {job.experienceRequired} years</p>
//       <p className="text-gray-900 font-bold"><strong>Location:</strong> {job.location}</p>
//       <p className="text-gray-700"><strong>Skills Required:</strong> {job.skillsRequired.join(', ')}</p>
//       <p className="text-gray-600 text-sm mt-2">Company: {job.employerId.companyName}</p>

//       <button
//         className="bg-blue-500 text-white mt-4 px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
//         onClick={handleApplyClick}
//       >
//         Apply for Job
//       </button>

//       <ApplyJobModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         onSubmit={handleSubmitApplication}
//       />
//     </div>
//   );
// };

// export const getServerSideProps = async (context) => {
//   const { id } = context.params;
//   try {
//     const res = await fetch(`https://talent-backend-wfqd.onrender.com/api/jobs/${id}`);
//     if (!res.ok) {
//       throw new Error('Failed to fetch job details');
//     }

//     const job = await res.json();

//     return {
//       props: {
//         job,
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching job details:', error);

//     return {
//       props: {
//         job: null,
//       },
//     };
//   }
// };

// export default JobDetails;

import React, { useState, useEffect } from 'react';
import ApplyJobModal from '@/components/ApplyJobModal';
import Loader from '@/components/Loader'; // Import the Loader component

const JobDetails = ({ job }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (job) {
      setLoading(false);
    }
  }, [job]);

  const handleApplyClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitApplication = (formData) => {
    console.log('Application submitted with data:', formData);
    // backend
    setIsModalOpen(false);
  };

  if (loading) {
    return <Loader />;
  }

  if (!job) {
    return <p>Job not found.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8 mt-24 bg-white shadow-md rounded-lg w-full">
      <h1 className="text-gray-900 text-3xl font-bold mb-4">{job.title}</h1>
      <p className="text-gray-700 mb-4">{job.description}</p>
      <p className="text-gray-900 font-bold"><strong>Salary:</strong> {job.salaryRange}</p>
      <p className="text-gray-900 font-bold"><strong>Experience Required:</strong> {job.experienceRequired} years</p>
      <p className="text-gray-900 font-bold"><strong>Location:</strong> {job.location}</p>
      <p className="text-gray-700"><strong>Skills Required:</strong> {job.skillsRequired.join(', ')}</p>
      <p className="text-gray-600 text-sm mt-2">Company: {job.employerId.companyName}</p>

      <button
        className="bg-blue-500 text-white mt-4 px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        onClick={handleApplyClick}
      >
        Apply for Job
      </button>

      <ApplyJobModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitApplication}
      />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  try {
    const res = await fetch(`https://talent-backend-wfqd.onrender.com/api/jobs/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch job details');
    }

    const job = await res.json();

    return {
      props: {
        job,
      },
    };
  } catch (error) {
    console.error('Error fetching job details:', error);

    return {
      props: {
        job: null,
      },
    };
  }
};

export default JobDetails;
