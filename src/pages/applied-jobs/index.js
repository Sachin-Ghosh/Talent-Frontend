import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Loader from '@/components/Loader';

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
//   const [candidateId, setCandidateId] = useState('');
  const { token, authUser } = useAuth();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      if (!authUser) return;
      try {
        console.log(authUser._id)
        // Fetch candidate ID
        const candidateResponse = await fetch(`${process.env.API_URL}/api/candidates/user/${authUser._id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        // console.log(candidateResponse.json());
        if (!candidateResponse.ok) throw new Error('Failed to fetch candidate details');
        const { candidateId } = await candidateResponse.json();

        // Fetch applications
        const applicationsResponse = await fetch(`${process.env.API_URL}/api/applications/candidate/${candidateId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!applicationsResponse.ok) throw new Error('Failed to fetch applications');
        const applicationsData = await applicationsResponse.json();
        setApplications(applicationsData);
        // console.log(applicationsData[1].jobId._id)
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [authUser, token]);

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Applied Jobs</h1>
      {applications.length === 0 ? (
        <p>You haven't applied to any jobs yet.</p>
      ) : (
        <ul className="space-y-4">
          {applications.map((application) => (
            <li key={application._id} className="border p-4 rounded-lg">
              <h2 className="text-xl font-semibold">{application.jobId.title}</h2>
              <p className="text-gray-600">Company: {application.jobId.employerId.companyName}</p>
              <p className="text-gray-600">Application Status: {application.status}</p>
              <p className="text-gray-600">Applied on: {new Date(application.createdAt).toLocaleDateString()}</p>
              {application.screeningId && (
                <p className="text-gray-600">Screening Stage: {application.screeningId.currentStage}</p>
              )}
              <div className="flex justify-between">
              <Link href={`/job-screening/${application._id}`}>
                <span className="text-blue-500 hover:underline cursor-pointer">View Screening Status</span>
              </Link>
              <Link href={`/candidate-slots/${application.jobId._id}`}>
                <span className="text-blue-500 hover:underline cursor-pointer no-underline">Schedule Your Slot</span>
              </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppliedJobs;



// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useAuth } from '@/context/AuthContext';
// import Loader from '@/components/Loader';

// const AppliedJobs = () => {
//   const [appliedJobs, setAppliedJobs] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { token, authUser } = useAuth();

//   useEffect(() => {
//     const fetchAppliedJobs = async () => {
//       if (!authUser) return;

//       try {
//         // First, fetch the candidate ID
//         const candidateResponse = await fetch(`${process.env.API_URL}api/candidates/user/${authUser._id}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         if (!candidateResponse.ok) throw new Error('Failed to fetch candidate details');
//         const candidateData = await candidateResponse.json();
//         const candidateId = candidateData.candidateId;

//         // Then, fetch the applied jobs using the candidate ID
//         const jobsResponse = await fetch(`${process.env.API_URL}api/candidates/${candidateId}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         if (!jobsResponse.ok) throw new Error('Failed to fetch applied jobs');
//         const jobsData = await jobsResponse.json();
//         setAppliedJobs(jobsData);
//       } catch (error) {
//         console.error('Error fetching applied jobs:', error);
//         setError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAppliedJobs();
//   }, [authUser, token]);

//   if (isLoading) return <Loader />;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Applied Jobs</h1>
//       {appliedJobs.length === 0 ? (
//         <p>You haven't applied to any jobs yet.</p>
//       ) : (
//         <ul className="space-y-4">
//           {appliedJobs.map((application) => (
//             <li key={application._id} className="border p-4 rounded-lg">
//               <h2 className="text-xl font-semibold">{application.jobId.title}</h2>
//               <p className="text-gray-600">Company: {application.jobId.employerId.companyName}</p>
//               <p className="text-gray-600">Application Status: {application.status}</p>
//               <p className="text-gray-600">Applied on: {new Date(application.createdAt).toLocaleDateString()}</p>
//               <Link href={`/job-screening/${application._id}`}>
//                 <span className="text-blue-500 hover:underline cursor-pointer">View Screening Status</span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default AppliedJobs;