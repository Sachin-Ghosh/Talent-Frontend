import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import toast from 'react-hot-toast';

const JobScreening = () => {
  const [screening, setScreening] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const  applicationId  = "66e68058cb87f02c051fa8b6";

  useEffect(() => {
    const fetchScreening = async () => {
      if (!applicationId) return;
      try {
        const response = await fetch(`${process.env.API_URL}api/applications/${applicationId}`, {
        //   credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to fetch screening data');
        const data = await response.json();
        console.log(data);
        setScreening(data);
      } catch (error) {
        console.error('Error fetching screening data:', error);
        // toast.error('Failed to load screening data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchScreening();
  }, [applicationId]);

  const startScreening = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}api/screening/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId }),
        // credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to start screening');
      const data = await response.json();
      setScreening(data.screening);
      console.log(data);
    //   toast.success('Screening started successfully');
    } catch (error) {
      console.error('Error starting screening:', error);
    //   toast.error('Failed to start screening');
    }
  };

  const processStage2 = async () => {
    try {
      const atsScore = Math.floor(Math.random() * 31) + 70;
      const expectedSalary = "100000";
       // Random score between 70 and 100
      const response = await fetch(`${process.env.API_URL}api/screening/stage2`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ screeningId: screening._id, atsScore , expectedSalary}),
        // credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to process Stage 2');
      const data = await response.json();
      setScreening(data.screening);
    //   toast.success('Stage 2 processed successfully');
    } catch (error) {
      console.error('Error processing Stage 2:', error);
    //   toast.error('Failed to process Stage 2');
    }
  };

  const startTest = () => {
    router.push(`/test/${applicationId}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (!screening) return <div>No screening data available</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Screening Status</h1>
      <div className="space-y-4">
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Stage 1: Skills Matching</h2>
          {screening.stage1 ? (
            <>
              <p>Status: {screening.stage1.passed ? 'Passed' : 'Failed'}</p>
              <p>Skills Matched: {screening.stage1.skillsMatched.join(', ')}</p>
              <p>Skills Missing: {screening.stage1.skillsMissing.join(', ')}</p>
            </>
          ) : (
            <button onClick={startScreening} className="bg-blue-500 text-white px-4 py-2 rounded">
              Start Screening
            </button>
          )}
        </div>

        {screening.currentStage >= 2 && (
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Stage 2: ATS Score and Salary Expectation</h2>
            {screening.stage2 ? (
              <>
                <p>Status: {screening.stage2.passed ? 'Passed' : 'Failed'}</p>
                <p>ATS Score: {screening.stage2.atsScore}</p>
                <p>Expected Salary: ${screening.stage2.expectedSalary}</p>
              </>
            ) : (
              <button onClick={processStage2} className="bg-blue-500 text-white px-4 py-2 rounded">
                Process Stage 2
              </button>
            )}
          </div>
        )}

        {screening.currentStage >= 3 && (
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Stage 3: Online Test</h2>
            {screening.stage3 ? (
              <>
                <p>Status: {screening.stage3.passed ? 'Passed' : 'Failed'}</p>
                <p>Test Score: {screening.stage3.testScore}</p>
              </>
            ) : (
              <button onClick={startTest} className="bg-blue-500 text-white px-4 py-2 rounded">
                Start Test
              </button>
            )}
          </div>
        )}

        {screening.currentStage === 4 && (
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Final Status</h2>
            <p>Status: {screening.finalStatus}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobScreening;