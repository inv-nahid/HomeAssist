import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';

const ServiceDetails = () => {
  const { id } = useParams();
  
  const services = {
    1: {
      id: 1,
      name: "Jane's Cleaning Co",
      description: "Thorough cleaning including appliances",
      location: "New York, NY",
      serviceType: "Cleaning",
      price: 120,
      duration: "session",
    },
    2: {
      id: 2,
      name: "Mike's Electrical Fix",
      description: "Electrical diagnostics and repairs",
      location: "Los Angeles, CA",
      serviceType: "Electrical",
      price: 85,
      duration: "hour",
    },
    3: {
      id: 3,
      name: "Tom's Plumbing Pros",
      description: "Fix leaks and install fixtures",
      location: "Chicago, IL",
      serviceType: "Plumbing",
      price: 75,
      duration: "hour",
    }
  };

  const service = services[id] || { name: "Service Not Found", description: "", price: 0 };
  const handleReviewSubmit = (newReview) => {
    setReviews([...reviews, { ...newReview, date: new Date().toISOString().split('T')[0] }]);
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col">
      <header className="w-full bg-white shadow p-4 mb-6">
        <h1 className="text-2xl font-bold text-pink-600 text-center">Service Details</h1>
      </header>
      <main className="flex flex-1 flex-col items-center px-2">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-2 text-pink-600">{service.name}</h2>
          <div className="text-gray-700 mb-2">{service.description}</div>
          <div className="text-gray-500 mb-4">${service.price} / {service.duration}</div>
        </div>
        <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-6 mb-8">
          <h3 className="text-lg font-bold mb-2 text-pink-600">Leave a Review</h3>
          <ReviewForm onSubmit={handleReviewSubmit} />
        </div>
        <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold mb-2 text-pink-600">Reviews</h3>
          <ReviewList reviews={reviews} />
        </div>
      </main>
    </div>
  );
};

export default ServiceDetails;