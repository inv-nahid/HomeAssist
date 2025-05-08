// src/pages/Profile.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    serviceNeeds: ''
  });

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add logic to save the profile data
    // For now, we'll just show an alert
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col">
      <header className="w-full bg-white shadow p-4 mb-6">
        <h1 className="text-2xl font-bold text-pink-600 text-center">Profile</h1>
      </header>
      <main className="flex flex-1 flex-col items-center px-2">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-pink-600 text-center">My Profile</h2>
          <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded mb-3" required />
          <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} rows={2} className="w-full border p-2 rounded mb-3" required />
          <input name="phoneNumber" type="tel" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} className="w-full border p-2 rounded mb-3" required />
          <textarea name="serviceNeeds" placeholder="Describe Your Home Service Needs" value={formData.serviceNeeds} onChange={handleChange} rows={3} className="w-full border p-2 rounded mb-4" required />
          <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded transition">Save Profile</button>
        </form>
      </main>
    </div>
  );
};

export default Profile;