import { useState } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import ServiceCard from '../components/ServiceCard';
import MaidServices from './Services/MaidServices';
import ElectricianServices from './Services/ElectricianServices';

const Services = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchServiceType, setSearchServiceType] = useState('');

  const allServices = [
    {
      id: 1,
      name: "Jane's Cleaning Co",
      description: "Thorough cleaning including appliances",
      location: "New York, NY",
      serviceType: "Cleaning",
      price: 120,
      duration: "session",
      image: "https://picsum.photos/600/400?random=1",
      icon: "🧹",
      popular: true,
      rating: 4.9
    },
    {
      id: 2,
      name: "Mike's Electrical Fix",
      description: "Electrical diagnostics and repairs",
      location: "Los Angeles, CA",
      serviceType: "Electrical",
      price: 85,
      duration: "hour",
      image: "https://picsum.photos/600/400?random=2",
      icon: "⚡",
      popular: false,
      rating: 4.8
    },
    {
      id: 3,
      name: "Tom's Plumbing Pros",
      description: "Fix leaks and install fixtures",
      location: "Chicago, IL",
      serviceType: "Plumbing",
      price: 75,
      duration: "hour",
      image: "https://picsum.photos/600/400?random=3",
      icon: "🚿",
      popular: true,
      rating: 4.7
    },
    {
      id: 4,
      name: "Sarah's Cleaning Crew",
      description: "Deep cleaning services",
      location: "Houston, TX",
      serviceType: "Cleaning",
      price: 110,
      duration: "session",
      image: "https://picsum.photos/600/400?random=4",
      icon: "🧹",
      popular: true,
      rating: 4.6
    }
  ].filter(service => {
    const matchesLocation = service.location.toLowerCase().includes(searchLocation.toLowerCase());
    const matchesServiceType = service.serviceType.toLowerCase().includes(searchServiceType.toLowerCase());
    return matchesLocation && matchesServiceType;
  });

  return (
    <div className="py-16 bg-gradient-to-b from-[var(--light)] to-white">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Our Services" 
          subtitle="Find and book professional services tailored to your needs"
        />
        
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by location (e.g., New York, CA)..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full md:w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Search by service type (e.g., Cleaning, Electrical)..."
              value={searchServiceType}
              onChange={(e) => setSearchServiceType(e.target.value)}
              className="w-full md:w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {['all', 'maid', 'electrician'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full capitalize transition-all ${
                activeTab === tab
                  ? 'bg-[var(--primary)] text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab === 'all' ? 'All Services' : tab + ' Services'}
            </button>
          ))}
        </div>

        {activeTab === 'all' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        {activeTab === 'maid' && <MaidServices />}
        {activeTab === 'electrician' && <ElectricianServices />}
      </div>
    </div>
  );
};

export default Services;