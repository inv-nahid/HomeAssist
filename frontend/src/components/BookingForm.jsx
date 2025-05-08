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

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center px-2 py-8">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-3">
        <h2 className="text-xl font-bold mb-2 text-pink-600 text-center">Book a Service</h2>
        {error && <div className="mb-2 p-2 bg-red-100 text-red-700 rounded text-sm">{error}</div>}
        <select name="provider" value={formData.provider} onChange={handleChange} className="w-full border p-2 rounded" required>
          <option value="">Select a provider</option>
          <option value="Jane's Cleaning Co">Jane's Cleaning Co</option>
          <option value="Mike's Electrical Fix">Mike's Electrical Fix</option>
          <option value="Tom's Plumbing Pros">Tom's Plumbing Pros</option>
        </select>
        <select name="serviceType" value={formData.serviceType} onChange={handleChange} className="w-full border p-2 rounded" required>
          <option value="">Select a service</option>
          <option value="Cleaning">Home Cleaning</option>
          <option value="Electrical">Electrical Repair</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Painting">Painting</option>
        </select>
        <input name="date" type="date" value={formData.date} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="time" type="time" value={formData.time} onChange={handleChange} className="w-full border p-2 rounded" required />
        <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} rows={2} className="w-full border p-2 rounded" required />
        <textarea name="notes" placeholder="Special Instructions (Optional)" value={formData.notes} onChange={handleChange} rows={2} className="w-full border p-2 rounded" />
        <button type="submit" disabled={isLoading} className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded transition">{isLoading ? 'Creating Booking...' : 'Confirm Booking'}</button>
      </form>
    </div>
  );
};

export default BookingForm;