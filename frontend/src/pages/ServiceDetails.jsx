import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';

const ServiceDetails = () => {
  const { id } = useParams();

  // Mock service provider data
  const services = {
    1: {
      id: 1,
      name: "Jane's Cleaning Co",
      description: "Thorough cleaning including appliances",
      location: "New York, NY",
      serviceType: "Cleaning",
      price: 120,
      duration: "session",
      image: "https://picsum.photos/600/400?random=1",
      icon: "🧹",
      rating: 4.9
    },
    2: {
      id: 2,
      name: "Mike's Electrical Fix",
      description: "Electrical diagnostics and repairs",
      location: "Los Angeles, CA",
      serviceType: "Electrical",
      price: 85,
      duration: "hour",
      image: "https://picsum.photos/600/400?random=2",
      icon: "⚡",
      rating: 4.8
    },
    3: {
      id: 3,
      name: "Tom's Plumbing Pros",
      description: "Fix leaks and install fixtures",
      location: "Chicago, IL",
      serviceType: "Plumbing",
      price: 75,
      duration: "hour",
      image: "https://picsum.photos/600/400?random=3",
      icon: "🚿",
      rating: 4.7
    }
  };

  const service = services[id] || { name: "Service Not Found", description: "", price: 0 };

  // Mock reviews data
  const [reviews, setReviews] = useState([
    {
      rating: 5,
      comment: "Amazing service! My house has never looked better.",
      date: "2025-04-20"
    },
    {
      rating: 4,
      comment: "Very professional, but they were a bit late.",
      date: "2025-04-15"
    }
  ]);

  const handleReviewSubmit = (newReview) => {
    setReviews([...reviews, { ...newReview, date: new Date().toISOString().split('T')[0] }]);
  };

  return (
    <div className="py-16 bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{service.name}</h1>
          <p className="text-gray-600 text-lg">{service.description}</p>
          <div className="mt-4 flex items-center space-x-4">
            <span className="text-xl font-semibold text-gray-800">${service.price}/{service.duration}</span>
            <span className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.round(service.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                  ★
                </span>
              ))}
              <span className="ml-2 text-gray-600">({service.rating})</span>
            </span>
          </div>
          <img src={service.image} alt={service.name} className="mt-6 rounded-lg shadow-md w-full h-64 object-cover" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Leave a Review</h2>
            <ReviewForm onSubmit={handleReviewSubmit} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Reviews</h2>
            <ReviewList reviews={reviews} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;