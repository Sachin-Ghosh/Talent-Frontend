// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';

// const AppliedJobs = () => {
//   const [appliedJobs, setAppliedJobs] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchAppliedJobs = async () => {
//       try {
//         const response = await fetch(`${process.env.API_URL}api/candidates/66e5534793866c92906ec930`, {
//         //   credentials: 'include',
//         });
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         console.log('Fetched data:', data); // Log the fetched data
//         if (Array.isArray(data)) {
//           setAppliedJobs(data);
//         } else {
//           console.error('Fetched data is not an array:', data);
//           setError('Unexpected data format received from server');
//         }
//       } catch (error) {
//         console.error('Error fetching applied jobs:', error);
//         setError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAppliedJobs();
//   }, []);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Applied Jobs</h1>
//       {appliedJobs.length === 0 ? (
//         <p>You haven't applied to any jobs yet.</p>
//       ) : (
//         <ul className="space-y-4">
//           {appliedJobs.map((job) => (
//             <li key={job._id} className="border p-4 rounded-lg">
//               <h2 className="text-xl font-semibold">{job.title}</h2>
//               <p className="text-gray-600">{job.company}</p>
//               <Link href={`/job-screening/${job.applicationId}`}>
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


import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const AppliedJobs = () => {
  const [candidateData, setCandidateData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await fetch(`${process.env.API_URL}api/candidates/66e5534793866c92906ec930`, {
        //   credentials: 'include',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        setCandidateData(data);
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!candidateData) return <div>No data available</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Applied Jobs</h1>
      {candidateData.appliedJobs.length === 0 ? (
        <p>You haven't applied to any jobs yet.</p>
      ) : (
        <ul className="space-y-4">
          {candidateData.appliedJobs.map((jobId, index) => (
            <li key={index} className="border p-4 rounded-lg">
              <h2 className="text-xl font-semibold">Job Application {index + 1}</h2>
              <p className="text-gray-600">Application ID: {jobId}</p>
              <Link href={`/job-screening/${jobId}`}>
                <span className="text-blue-500 hover:underline cursor-pointer">View Screening Status</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppliedJobs;