import CandidateCalendar from '@/components/CandidateCalendar';
import InterviewerCalendar from '@/components/InterviewerCalendar';
import Head from 'next/head';

export default function InterviewsPage() {
  return (
    <div>
      <Head>
        <title>Candidate Calendar</title>
      </Head>
      <main className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Interview Schedule</h1>
        <CandidateCalendar />
      </main>
    </div>
  );
}