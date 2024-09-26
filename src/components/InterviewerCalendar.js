import { useState, useEffect } from 'react';
import { format, addDays, subDays, isSameDay, startOfWeek, isWithinInterval } from 'date-fns';
import { Button } from './ui/button';
import { toast, Toaster } from 'sonner';
import { CheckCircle, CircleArrowLeft, CircleArrowRight } from 'lucide-react';
import { Modal } from './Modal'; // Import Modal

const timeslots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

const InterviewerCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]); // Track selected multiple slots
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state
  const jobId = "66e57bb64c7d84b7366ac8e4"; // Assuming this is dynamic or passed as props

  useEffect(() => {
    // Load available slots (could be fetched from an API)
    fetchAvailableSlots(); // Fetch only available slots from backend
  }, []);

  const fetchAvailableSlots = async () => {
    try {
      const response = await fetch(`https://talent-backend-wfqd.onrender.com/api/interview-slots/${jobId}`);
      if (response.ok) {
        const result = await response.json();
        const { availableSlots } = result; // The backend now sends only available (unbooked) slots
        setAvailableSlots(availableSlots);
        console.log(availableSlots )
      } else {
        console.error('Failed to fetch available slots:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  const startWeek = startOfWeek(currentWeek, { weekStartsOn: 1 });

  const isSlotBooked = (date, time) => {
    // Convert the selected slot's date and time to check if it falls within the booked slot time range
    const slot = availableSlots.find(slot => {
      const start = new Date(slot.start);
      const end = new Date(slot.end);
      const slotDateTime = new Date(date);
      const [hours, minutes] = time.split(':');
      slotDateTime.setHours(hours % 12 + (time.includes('PM') ? 12 : 0), minutes === '00' ? 0 : 0);
      return isWithinInterval(slotDateTime, { start, end });
    });
  
    // Return true if the slot exists and is booked, otherwise false
    return slot ? slot.isBooked : false;
  };
  

  const handleSlotSelect = (date, time) => {
    const selected = { date, time };
    // Check if the slot is already selected
    const isAlreadySelected = selectedSlots.some(slot => isSameDay(slot.date, date) && slot.time === time);
    
    if (isAlreadySelected) {
      // Deselect the slot (remove from selectedSlots)
      setSelectedSlots(selectedSlots.filter(slot => !(isSameDay(slot.date, date) && slot.time === time)));
    } else {
      // Add the slot to the selectedSlots
      setSelectedSlots([...selectedSlots, selected]);
    }
  };
  

  const handleSlotBooking = async () => {
    if (selectedSlots.length > 0) {
      const slotsToBook = selectedSlots.map(slot => {
        const startTime = new Date(slot.date);
        const endTime = new Date(slot.date);
        const [hours, minutes] = slot.time.split(':');
        startTime.setHours(hours % 12 + (slot.time.includes('PM') ? 12 : 0), minutes === '00' ? 0 : 0);
        endTime.setHours(hours % 12 + (slot.time.includes('PM') ? 12 : 0), minutes === '00' ? 0 : 0);
        endTime.setMinutes(endTime.getMinutes() + 60); // Assuming each slot is 1 hour

        return {
          start: format(startTime, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX'),
          end: format(endTime, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX'),
          title: 'Available Slot',
          isBooked: false
        };
      });

      try {
        const meetingLink = 'demo'; // Adjust this as needed
        const response = await fetch(`https://talent-backend-wfqd.onrender.com/api/interview-slots/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ jobId, meetingLink, availableSlots: slotsToBook }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Slots booked successfully:', result);

          // Clear selected slots after booking
          setSelectedSlots([]);
          setIsModalOpen(false);
          toast.custom(() => (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg w-96">
              <div className="flex">
                <div className="py-1"><CheckCircle className="h-6 w-6 text-green-800 mr-4" /></div>
                <div>
                  <p className="font-bold">Success</p>
                  <p className="text-sm">Slots saved successfully</p>
                </div>
              </div>
            </div>
          ));
        } else {
          console.error('Failed to book the slots:', response.statusText);
          alert('Failed to book the slots. Please try again.');
        }
      } catch (error) {
        console.error('Error booking slots:', error);
        alert('An error occurred. Please try again.');
      }
    }
  };

  const renderDayColumn = (day) => (
    <div key={day} className="border p-2 w-40">
      <h3 className="text-center font-semibold">{format(day, 'EEE dd')}</h3>
      {timeslots.map((time) => {
        const slot = availableSlots.find(slot => {
          const start = new Date(slot.start);
          const end = new Date(slot.end);
          const slotDateTime = new Date(day);
          const [hours, minutes] = time.split(':');
          slotDateTime.setHours(hours % 12 + (time.includes('PM') ? 12 : 0), minutes === '00' ? 0 : 0);
          return isWithinInterval(slotDateTime, { start, end });
        });
  
        return (
          <div
            key={time}
            className={`border mt-2 p-2 text-center ${
              slot?.isBooked ? 'bg-gray-300 ' : 'bg-white cursor-pointer'
            } ${selectedSlots.some(s => isSameDay(s.date, day) && s.time === time) ? 'bg-blue-400 text-white font-semibold' : ''}`}
            onClick={() => !slot?.isBooked && handleSlotSelect(day, time)}
          >
            {slot?.isBooked ? `Booked: ${time}` : `Available Slot: ${time}`}
          </div>
        );
      })}
    </div>
  );
  

  return (
    <div className="p-4">
      <div className="flex justify-center mb-4">
        <Button className="bg-transparent text-black hover:bg-white border-none" onClick={() => setCurrentWeek(subDays(currentWeek, 7))}><CircleArrowLeft /></Button>
        <h2 className="text-lg font-bold mx-10">Week of {format(currentWeek, 'PP')}</h2>
        <Button className="bg-transparent text-black hover:bg-white border-none" onClick={() => setCurrentWeek(addDays(currentWeek, 7))}><CircleArrowRight /></Button>
      </div>
      <div className="flex justify-evenly">
        {[...Array(7)].map((_, index) => renderDayColumn(addDays(startWeek, index)))}
      </div>

      {/* Save Button */}
      {selectedSlots.length > 0 && (
        <div className="mt-4 ml-10">
          <Button
            onClick={() => setIsModalOpen(true)} // Open confirmation modal on save button click
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Save Slots
          </Button>
        </div>
      )}

      {/* Modal for Slot Confirmation */}
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
      <Toaster position='top-right'/>
    </div>
  );
};

export default InterviewerCalendar;
