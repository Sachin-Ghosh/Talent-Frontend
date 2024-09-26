import InterviewerCalendar from '@/components/InterviewerCalendar';
import Head from 'next/head';

export default function InterviewsPage() {
  return (
    <div>
      <Head>
        <title>Interviewer Calendar</title>
      </Head>
      <main className="container mx-auto p-8">
        <h1 className="text-2xl font-bold text-center">Schedule Your Available Slot</h1>
        <InterviewerCalendar />
      </main>
    </div>
  );
}