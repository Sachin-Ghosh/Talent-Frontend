// import React, { useState } from 'react';

// const ApplyJobModal = ({ isOpen, onClose, onSubmit }) => {
//   if (!isOpen) return null;

//   const [formData, setFormData] = useState({
//     education: '',
//     experience: '',
//     skills: '',
//     resume: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: files ? files[0] : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4">Apply for Job</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-bold mb-2">Education</label>
//             <input
//               type="text"
//               name="education"
//               value={formData.education}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-bold mb-2">Experience</label>
//             <input
//               type="text"
//               name="experience"
//               value={formData.experience}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-bold mb-2">Skills</label>
//             <input
//               type="text"
//               name="skills"
//               value={formData.skills}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-bold mb-2">Resume</label>
//             <input
//               type="file"
//               name="resume"
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           <div className="flex justify-end">
//             <button
//               type="button"
//               className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded-md"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ApplyJobModal;

import React, { useState, useEffect } from 'react';

const ApplyJobModal = ({ isOpen, candidateId, onClose }) => {
  const [formData, setFormData] = useState({
    education: { degree: '', institution: '', yearOfCompletion: '' },
    experience: [{ companyName: '', role: '', yearsWorked: '' }],
    skills: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch user data from the API when the modal is open
  useEffect(() => {
    if (isOpen && candidateId) {
      setIsLoading(true);
      fetch(`https://talent-backend-wfqd.onrender.com/api/candidates/${candidateId}`)
        .then((response) => response.json())
        .then((data) => {
          setFormData({
            education: data.education || { degree: '', institution: '', yearOfCompletion: '' },
            experience: data.experience || [{ companyName: '', role: '', yearsWorked: '' }],
            skills: (data.skills || []).join(', '), // Convert skills array to a comma-separated string
          });
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching candidate:', error);
          setIsLoading(false);
        });
    }
  }, [isOpen, candidateId]);

  // Handle form submission (placeholder function)
  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    onClose(); // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg overflow-y-auto"
        style={{ maxHeight: '90vh' }}
      >
        <h2 className="text-2xl font-bold mb-4">Candidate Information</h2>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* Education Section */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Degree</label>
              <input
                type="text"
                value={formData.education.degree}
                className="w-full p-2 border border-gray-300 rounded-md"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Institution</label>
              <input
                type="text"
                value={formData.education.institution}
                className="w-full p-2 border border-gray-300 rounded-md"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Year of Completion</label>
              <input
                type="text"
                value={formData.education.yearOfCompletion}
                className="w-full p-2 border border-gray-300 rounded-md"
                readOnly
              />
            </div>

            {/* Experience Section */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Company Name</label>
              <input
                type="text"
                value={formData.experience[0]?.companyName || ''}
                className="w-full p-2 border border-gray-300 rounded-md"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Role</label>
              <input
                type="text"
                value={formData.experience[0]?.role || ''}
                className="w-full p-2 border border-gray-300 rounded-md"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Years Worked</label>
              <input
                type="text"
                value={formData.experience[0]?.yearsWorked || ''}
                className="w-full p-2 border border-gray-300 rounded-md"
                readOnly
              />
            </div>

            {/* Skills Section */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Skills</label>
              <input
                type="text"
                value={formData.skills}
                className="w-full p-2 border border-gray-300 rounded-md"
                readOnly
              />
            </div>

            {/* Buttons Section */}
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={onClose}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplyJobModal;
