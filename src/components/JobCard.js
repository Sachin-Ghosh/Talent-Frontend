

import React from 'react';
import { useRouter } from 'next/router'; 
import { FaMapMarkerAlt, FaMoneyBillWave, FaArrowRight } from 'react-icons/fa'; // Import icons

const JobCard = ({ job }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/jobs/${job._id}`); 
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg p-6 mb-4 cursor-pointer hover:shadow-lg transition duration-200"
      onClick={handleCardClick} 
    >
      <h3 className="text-gray-900 text-xl font-semibold mb-2">{job.title}</h3>
      <div className="flex items-center mb-2">
        <FaMoneyBillWave className="text-green-500 mr-2" />
        <p className="text-gray-900 font-bold">{job.salaryRange}</p>
      </div>
      <div className="flex items-center">
        <FaMapMarkerAlt className="text-red-500 mr-2" />
        <p className="text-gray-900">{job.location}</p>

        <div
        className="flex items-center text-blue-500 font-semibold cursor-pointer hover:underline mt-4"
        onClick={handleCardClick} 
      >
       <span className="mr-1">View Details</span>
        <FaArrowRight />
      </div>
      </div>
    </div>
  );
};

export default JobCard;