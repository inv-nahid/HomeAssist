import { useParams } from 'react-router-dom';
import { useState } from 'react';
import BookingForm from '../components/BookingForm';

const Booking = () => {
  const { serviceId } = useParams();
  const [bookings, setBookings] = useState([]);

  const handleBookingSubmit = (formData) => {
    const newBooking = { id: Date.now(), serviceId, ...formData };
    setBookings([...bookings, newBooking]);
    console.log('Booking saved:', newBooking);
  };

  return (
    <div className="container mx-auto px-4 py-16 bg-gray-50 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Book Service</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Schedule your appointment with ease</p>
      </div>
      <BookingForm onSubmit={handleBookingSubmit} />
      <div className="mt-12 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Bookings</h2>
        {bookings.length > 0 ? (
          <ul className="space-y-6">
            {bookings.map((booking) => (
              <li key={booking.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <p className="font-medium text-gray-800">Service ID: {booking.serviceId}</p>
                <p className="text-gray-600">Date: {booking.date} at {booking.time}</p>
                <p className="text-gray-600">Address: {booking.address}</p>
                {booking.notes && <p className="text-gray-600">Notes: {booking.notes}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">No bookings yet</p>
        )}
      </div>
    </div>
  );
};

export default Booking;