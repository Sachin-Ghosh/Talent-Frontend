import CandidateCalendar from '@/components/CandidateCalendar';
import InterviewerCalendar from '@/components/InterviewerCalendar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function InterviewsPage() {

  const [jobId, setJobId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      setJobId(id);
    }
  }, [router.query]);

  return (
    <div>
      <Head>
        <title>Candidate Calendar</title>
      </Head>
      <main className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Interview Schedule</h1>
        {jobId && <CandidateCalendar jobId={jobId}/>}
      </main>
    </div>
  );
}