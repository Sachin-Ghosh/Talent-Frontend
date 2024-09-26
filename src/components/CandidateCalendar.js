import { useState, useEffect } from 'react';
import { format, addDays, subDays, isSameDay, startOfWeek } from 'date-fns';
import { Button } from './ui/button';
import { toast, Toaster } from 'sonner';
import { Modal } from './Modal';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';

const timeslots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

const CandidateCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Assuming this is dynamic or passed as props
  const jobId = "66e57bb64c7d84b7366ac8e4"; 
  const applicationId = "66e9f78bacf97c15dd50d3da"; // Example application ID for booking

  const startWeek = startOfWeek(currentWeek, { weekStartsOn: 1 }); // Initialize startWeek correctly here

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  const fetchAvailableSlots = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}api/interview-slots/${jobId}`);
      if (response.ok) {
        const result = await response.json();
        setAvailableSlots(result.availableSlots);
      } else {
        console.error('Failed to fetch available slots');
      }
    } catch (error) {
      console.error('Error fetching slots:', error);
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
      const response = await fetch(`${process.env.API_URL}api/interview-slots/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId,
          slotId: selectedSlot._id, // Assuming slot._id is the unique identifier
          applicationId,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('Slot booked successfully!');
        setSelectedSlot(null);
        setIsModalOpen(false);

        // Refresh the available slots
        fetchAvailableSlots();
      } else {
        toast.error('Failed to book the slot');
      }
    } catch (error) {
      toast.error('An error occurred while booking the slot');
    }
  };

  const renderDayColumn = (day) => (
    <div key={day} className="border p-2 w-40">
      <h3 className="text-center font-semibold">{format(day, 'EEE dd')}</h3>
      {timeslots.map((time) => (
        <div
          key={time}
          className={`border mt-2 p-2 text-center ${
            isSlotBooked(day, time) ? 'bg-gray-300' : 'bg-green-200 cursor-pointer'
          }`}
          onClick={() => !isSlotBooked(day, time) && handleSlotSelect(day, time)}
        >
          {isSlotBooked(day, time) ? 'Slot Full' : time}
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <Button onClick={() => setCurrentWeek(subDays(currentWeek, 7))}><CircleArrowLeft /></Button>
        <h2 className="text-lg font-bold">Week of {format(currentWeek, 'PPP')}</h2>
        <Button onClick={() => setCurrentWeek(addDays(currentWeek, 7))}><CircleArrowRight /></Button>
      </div>
      <div className="flex justify-center space-x-4">
        {[...Array(7)].map((_, index) => renderDayColumn(addDays(startWeek, index)))}
      </div>

      {/* Modal for Slot Confirmation */}
      {selectedSlot && (
        <Modal
          trigger={<></>}
          title="Confirm Slot Booking"
          content={
            <>
              <p>Are you sure you want to book this slot?</p>
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
    </div>
  );
};

export default CandidateCalendar;
