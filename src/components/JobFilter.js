// import React, { useState } from 'react';

// const JobFilter = ({ onFilter, jobTitles, locations }) => {
//   const [keyword, setKeyword] = useState('');
//   const [location, setLocation] = useState('');

//   const handleFilterChange = () => {
//     onFilter({ keyword, location });
//   };

//   return (
//     <div className="mb-6 flex gap-4">
//       <div>
//         <label htmlFor="jobTitle" className="block mb-1 font-bold">Job Title</label>
//         <select
//           id="jobTitle"
//           className="border p-2"
//           value={keyword}
//           onChange={(e) => {
//             setKeyword(e.target.value);
//             handleFilterChange();
//           }}
//         >
//           <option value="">All Titles</option>
//           {jobTitles.map((title) => (
//             <option key={title} value={title}>{title}</option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <label htmlFor="location" className="block mb-1 font-bold">Location</label>
//         <select
//           id="location"
//           className="border p-2"
//           value={location}
//           onChange={(e) => {
//             setLocation(e.target.value);
//             handleFilterChange();
//           }}
//         >
//           <option value="">All Locations</option>
//           {locations.map((loc) => (
//             <option key={loc} value={loc}>{loc}</option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// };

// export default JobFilter;

import React, { useState } from 'react';

const JobFilter = ({ onFilter, jobTitles, locations }) => {
  const [keyword, setKeyword] = useState('');   // Job title filter
  const [location, setLocation] = useState(''); // Location filter

  const handleFilterApply = () => {
    // Send both filters (keyword and location) back to the parent when button is clicked
    onFilter({ keyword, location });
  };

  return (
    <div className="mb-6 flex gap-4">
      <div>
        <label htmlFor="jobTitle" className="block mb-1 font-bold">Job Title</label>
        <select
          id="jobTitle"
          className="border p-2"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}  // Just update the state, no filtering yet
        >
          <option value="">All Titles</option>
          {jobTitles.map((title) => (
            <option key={title} value={title}>{title}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="location" className="block mb-1 font-bold">Location</label>
        <select
          id="location"
          className="border p-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}  // Just update the state, no filtering yet
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Apply Filter Button */}
      <div className="flex items-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleFilterApply}  // Trigger the filtering only on button click
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default JobFilter;
