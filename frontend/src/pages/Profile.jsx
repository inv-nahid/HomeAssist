// src/pages/Profile.js
import { useState } from 'react';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    address: '',
    serviceNeeds: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile created:', profileData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create Your Profile</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={profileData.email}
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Address</label>
          <textarea
            className="w-full p-2 border rounded"
            value={profileData.address}
            onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Service Needs</label>
          <textarea
            className="w-full p-2 border rounded"
            value={profileData.serviceNeeds}
            onChange={(e) => setProfileData({ ...profileData, serviceNeeds: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;