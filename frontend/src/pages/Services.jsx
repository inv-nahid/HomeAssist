import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '../components/ui/SectionHeader';
import ServiceCard from '../components/ServiceCard';
import MaidServices from './Services/MaidServices';
import ElectricianServices from './Services/ElectricianServices';

const Services = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchServiceType, setSearchServiceType] = useState('');
  const navigate = useNavigate();

  // Mock data for service providers
  const allServices = [
    {
      id: 1,
      name: "Jane's Cleaning Co",
      description: "Thorough cleaning including appliances",
      location: "New York, NY",
      serviceType: "Cleaning",
      price: 120,
      duration: "session",
    },
    {
      id: 2,
      name: "Mike's Electrical Fix",
      description: "Electrical diagnostics and repairs",
      location: "Los Angeles, CA",
      serviceType: "Electrical",
      price: 85,
      duration: "hour",
    },
    {
      id: 3,
      name: "Tom's Plumbing Pros",
      description: "Fix leaks and install fixtures",
      location: "Chicago, IL",
      serviceType: "Plumbing",
      price: 75,
      duration: "hour",
    },
    {
      id: 4,
      name: "Sarah's Cleaning Crew",
      description: "Deep cleaning services",
      location: "Houston, TX",
      serviceType: "Cleaning",
      price: 110,
      duration: "session",
    }
  ].filter(service => {
    const matchesLocation = service.location.toLowerCase().includes(searchLocation.toLowerCase());
    const matchesServiceType = service.serviceType.toLowerCase().includes(searchServiceType.toLowerCase());
    return matchesLocation && matchesServiceType;
  });

  const filtered = allServices.filter(s =>
    s.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
    s.serviceType.toLowerCase().includes(searchServiceType.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col">
      <header className="w-full bg-white shadow p-4 mb-6">
        <h1 className="text-2xl font-bold text-pink-600 text-center">Services</h1>
      </header>
      <main className="flex flex-1 flex-col items-center px-2">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-pink-600 text-center">Find a Service</h2>
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <input
              type="text"
              placeholder="Search by location..."
              value={searchLocation}
              onChange={e => setSearchLocation(e.target.value)}
              className="flex-1 border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Search by service type..."
              value={searchServiceType}
              onChange={e => setSearchServiceType(e.target.value)}
              className="flex-1 border p-2 rounded"
            />
          </div>
          <div className="grid gap-4">
            {filtered.length === 0 ? (
              <div className="text-gray-600 text-center">No services found.</div>
            ) : (
              filtered.map(s => (
                <div key={s.id} className="bg-pink-50 rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-medium text-gray-800">{s.name}</div>
                    <div className="text-sm text-gray-500">{s.serviceType} | {s.location}</div>
                    <div className="text-sm text-gray-500">${s.price} / {s.duration}</div>
                  </div>
                  <button className="mt-2 md:mt-0 bg-pink-500 hover:bg-pink-600 text-white px-4 py-1 rounded transition text-sm" onClick={() => navigate('/booking')}>Book Now</button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Services;