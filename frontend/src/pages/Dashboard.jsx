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
            rating: booking.review.rating || 4,
            comment: booking.review.comment || booking.review,
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

  const handleReviewSubmit = (newReview) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === selectedBookingId ? { ...booking, review: { ...newReview, date: new Date().toISOString().split('T')[0] } } : booking
    );
    setBookings(updatedBookings);
    setReviews([...reviews, { id: selectedBookingId, ...newReview, date: new Date().toISOString().split('T')[0] }]);
    setSelectedBookingId(null);
  };

  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-16 text-red-600">{error}</div>;
  }

  return (
    <div className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Your Bookings</h2>
          {bookings.length === 0 ? (
            <p className="text-gray-600">No bookings found.</p>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-600">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{booking.provider}</h3>
                    <p className="text-gray-600">Service: {booking.serviceType}</p>
                    <p className="text-gray-600">Date: {booking.date}</p>
                    <p className="text-gray-600">Status: {booking.status}</p>
                  </div>
                  {booking.status === "completed" && !booking.review && (
                    <button
                      onClick={() => setSelectedBookingId(booking.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Rate & Review
                    </button>
                  )}
                  {booking.review && (
                    <span className="text-green-600">Reviewed</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <Modal isOpen={selectedBookingId !== null} onClose={() => setSelectedBookingId(null)}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Rate & Review {bookings.find(b => b.id === selectedBookingId)?.provider}</h2>
          <ReviewForm onSubmit={handleReviewSubmit} />
        </Modal>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Your Reviews</h2>
          <ReviewList reviews={reviews} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;