import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    provider: '',
    serviceType: '',
    date: '',
    time: '',
    address: '',
    notes: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to book a service');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const data = await response.json();
      if (onSubmit) {
        onSubmit(data);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-slide-up max-w-2xl mx-auto p-6 md:p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
        Book a Service
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Fill out the form to schedule your appointment
      </p>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Service Selection */}
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Provider
          </label>
          <select
            className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            value={formData.provider}
            onChange={(e) => setFormData({...formData, provider: e.target.value})}
            required
          >
            <option value="">Select a provider</option>
            <option value="Jane's Cleaning Co">Jane's Cleaning Co</option>
            <option value="Mike's Electrical Fix">Mike's Electrical Fix</option>
            <option value="Tom's Plumbing Pros">Tom's Plumbing Pros</option>
          </select>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Type
          </label>
          <select
            className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            value={formData.serviceType}
            onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
            required
          >
            <option value="">Select a service</option>
            <option value="Cleaning">Home Cleaning</option>
            <option value="Electrical">Electrical Repair</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Painting">Painting</option>
          </select>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="time"
              className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              required
            />
          </div>
        </div>

        {/* Address */}
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            rows="3"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            required
          />
        </div>

        {/* Notes */}
        <div className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Special Instructions (Optional)
          </label>
          <textarea
            className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            rows="2"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
          />
        </div>

        {/* Submit Button */}
        <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-6 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Booking...' : 'Confirm Booking'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;