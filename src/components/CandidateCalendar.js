import { useState, useEffect } from 'react';
import { format, addDays, subDays, isSameDay, startOfWeek } from 'date-fns';
import { Button } from './ui/button';
import { toast, Toaster } from 'sonner';
import { Modal } from './Modal';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
const timeslots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

const CandidateCalendar = ({jobId}) => {
  const router=useRouter()
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const [applicationId, setApplicationId]=useState('')
  // Assuming this is dynamic or passed as props
  // const jobId = "66e57bb64c7d84b7366ac8e4"; 
  // const applicationId = "66e9f78bacf97c15dd50d3da"; // Example application ID for booking

  const startWeek = startOfWeek(currentWeek, { weekStartsOn: 1 }); // Initialize startWeek correctly here
  const { token, authUser } = useAuth();
  useEffect(() => {
    fetchAvailableSlots();
    fetchApplicationId();
  }, []);


  const fetchApplicationId=async()=>{
      if (!authUser) return;
      try {
        // Fetch candidate ID
        const candidateResponse = await fetch(`${process.env.API_URL}/api/candidates/user/${authUser._id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        // console.log(candidateResponse.json());
        if (!candidateResponse.ok) throw new Error('Failed to fetch candidate details');
        const { candidateId } = await candidateResponse.json();
        console.log('candidateId:',candidateId)
        // Fetch applications
        const applicationsResponse = await fetch(`${process.env.API_URL}/api/applications?jobId=${jobId}&candidateId=${candidateId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(applicationsResponse)
        if (!applicationsResponse.ok) throw new Error('Failed to fetch applications');
        const applicationsData = await applicationsResponse.json();
        console.log(`application data: ${JSON.stringify(applicationsData)}`)
        console.log('app Id',applicationsData[0]._id)
        setApplicationId(applicationsData[0]._id) // Changed to JSON.stringify to display as object
    } catch (error) {
      console.log(`error fetching application id ${error}`)
    }
  }
  const fetchAvailableSlots = async () => {
    setIsLoading(true); // Set loading state to true
    try {
      console.log(`jobId is ${jobId}`)
      const response = await fetch(`${process.env.API_URL}/api/interview-slots/${jobId}`);
      console.log(`available slots: ${response}`)
      if (response.ok) {
        const result = await response.json();
        setAvailableSlots(result.availableSlots);
        console.log(availableSlots)
      } else {
        console.error('Failed to fetch available slots');
      }
    } catch (error) {
      console.error('Error fetching slots:', error);
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  const isSlotBooked = (date, time) => {
    return availableSlots.some(
      (slot) => isSameDay(new Date(slot.start), date) && format(new Date(slot.start), 'hh:mm a') === time && slot.isBooked
    );
  };

  const handleSlotSelect = (date, time) => {
    const slot = availableSlots.find(
      (slot) => isSameDay(new Date(slot.start), date) && format(new Date(slot.start), 'hh:mm a') === time
    );
    if (slot && !slot.isBooked) {
      setSelectedSlot(slot);
      setIsModalOpen(true);
    }
  };

  const handleSlotBooking = async () => {
    if (!selectedSlot) return;

    try {
      const response = await fetch(`${process.env.API_URL}/api/interview-slots/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId,
          slotId: selectedSlot._id, // Assuming slot._id is the unique identifier
          applicationId:applicationId,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result)
        toast('Slot booked successfully!');
        setSelectedSlot(null);
        setIsModalOpen(false);
        router.push('/dashboard')
        // Refresh the available slots
        fetchAvailableSlots();
      } else {
        toast.error('Failed to book the slot');
      }
    } catch (error) {
      toast.error('An error occurred while booking the slot');
      console.log(error.message)
    }
  };

  const renderDayColumn = (day) => (
    <div key={day} className="border p-2 w-40">
      <h3 className="text-center font-semibold">{format(day, 'EEE dd')}</h3>
      {timeslots.map((time) => (
        <div
          key={time}
          className={`border mt-2 p-2 text-center ${
            isSlotBooked(day, time) ? 
            'bg-green-200 cursor-pointer' : 'bg-gray-300'
          }`}
          onClick={() => isSlotBooked(day, time) && handleSlotSelect(day, time)}
        >
          {isSlotBooked(day, time) ? time : 'Not Available'}
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="text-center">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-4">
            <Button 
              onClick={() => setCurrentWeek(subDays(currentWeek, 7))} 
              disabled={isSameDay(currentWeek, new Date())}
            ><CircleArrowLeft /></Button>
            <h2 className="text-lg font-bold">Week of {format(currentWeek, 'PPP')}</h2>
            <Button onClick={() => setCurrentWeek(addDays(currentWeek, 7))}><CircleArrowRight /></Button>
          </div>
          <div className="flex justify-center space-x-4">
            {[...Array(7)].map((_, index) => renderDayColumn(addDays(startWeek, index)))}
          </div>

          {/* Modal for Slot Confirmation */}
          {selectedSlot && (
            <Modal
              trigger={<></>} // Modal is triggered internally on save button click
              title="Confirm Slot Booking"
              content={
                <>
                  <p>Are you sure you want to book these slots?</p>
                  <Button
                    onClick={handleSlotBooking}
                    className="bg-green-500 text-white px-4 py-2 mt-4 rounded-md"
                  >
                    Confirm
                  </Button>
                </>
              }
              openModal={isModalOpen}
              setOpenModal={setIsModalOpen}
            />
          )}

          <Toaster position="top-right" />
        </>
      )}
    </div>
  );
};

export default CandidateCalendar;
