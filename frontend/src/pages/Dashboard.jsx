import { useState, useEffect } from 'react';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import Modal from '../components/Modal';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to view your dashboard');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/bookings/my-bookings', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }

        const data = await response.json();
        setBookings(data);
        
        // Extract reviews from bookings
        const userReviews = data
          .filter(booking => booking.review)
          .map(booking => ({
            id: booking.id,
            review: JSON.parse(booking.review),
            date: booking.date
          }));
        
        setReviews(userReviews);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleReviewSubmit = async (newReview) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to submit a review');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/bookings/${selectedBookingId}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          review: JSON.stringify(newReview)
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const updatedBooking = await response.json();
      
      // Update the bookings list
      const updatedBookings = bookings.map(booking =>
        booking.id === selectedBookingId ? updatedBooking : booking
      );
      setBookings(updatedBookings);

      // Update the reviews list
      const newReviewWithDate = {
        id: selectedBookingId,
        ...newReview,
        date: new Date().toISOString().split('T')[0]
      };

      // Remove old review if it exists
      const filteredReviews = reviews.filter(review => review.id !== selectedBookingId);
      setReviews([...filteredReviews, newReviewWithDate]);
      
      setSelectedBookingId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col">
      <header className="w-full bg-white shadow p-4 mb-6">
        <h1 className="text-2xl font-bold text-pink-600 text-center">Dashboard</h1>
      </header>
      <main className="flex flex-1 flex-col items-center px-2">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-pink-600">Your Bookings</h2>
          {loading ? <div className="text-center py-8">Loading...</div> : error ? <div className="text-center text-red-600 py-8">{error}</div> : (
            bookings.length === 0 ? <p className="text-gray-600">No bookings found.</p> :
            <div className="space-y-4">
              {bookings.map(booking => (
                <div key={booking.id} className="bg-pink-50 rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-medium text-gray-800">{booking.provider}</div>
                    <div className="text-sm text-gray-500">{booking.serviceType} | {booking.date} | {booking.status}</div>
                  </div>
                  {!booking.review ? (
                    <button onClick={() => setSelectedBookingId(booking.id)} className="mt-2 md:mt-0 px-4 py-1 bg-pink-500 hover:bg-pink-600 text-white rounded transition text-sm">Rate & Review</button>
                  ) : (
                    <span className="mt-2 md:mt-0 text-green-600 text-sm">Reviewed</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <Modal isOpen={selectedBookingId !== null} onClose={() => setSelectedBookingId(null)}>
          <h2 className="text-lg font-bold text-pink-600 mb-2">{bookings.find(b => b.id === selectedBookingId)?.review ? 'Edit Review' : 'Rate & Review'} {bookings.find(b => b.id === selectedBookingId)?.provider}</h2>
          <ReviewForm onSubmit={handleReviewSubmit} initialReview={bookings.find(b => b.id === selectedBookingId)?.review ? JSON.parse(bookings.find(b => b.id === selectedBookingId).review) : undefined} />
        </Modal>
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6 mt-4">
          <h2 className="text-xl font-bold mb-4 text-pink-600">Your Reviews</h2>
          <ReviewList reviews={reviews} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;