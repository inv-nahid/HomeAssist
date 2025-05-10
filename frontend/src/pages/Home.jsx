import { useNavigate } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';

import deepCleanImg from '../assets/deepclean.jpg';
import electricImg from '../assets/electric.jpg';
import plumbingImg from '../assets/plumbing.jpg';

const Home = () => {
  const featuredServices = [
    {
      id: 1,
      name: "Deep Cleaning",
      description: "Thorough cleaning including appliances and hard-to-reach areas",
      price: 120,
      duration: "session",
      image: deepCleanImg,
      icon: "🧹",
      popular: true,
      rating: 4.9
    },
    {
      id: 2,
      name: "Electrical Repair",
      description: "Professional electrical diagnostics and repairs",
      price: 85,
      duration: "hour",
      image: electricImg,
      icon: "⚡",
      popular: false,
      rating: 4.8
    },
    {
      id: 3,
      name: "Plumbing",
      description: "Fix leaks, clogs, and install new fixtures",
      price: 75,
      duration: "hour",
      image: plumbingImg,
      icon: "🚿",
      popular: true,
      rating: 4.7
    }
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <section className="relative bg-gradient-to-r from-pink-600 to-purple-800 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Transform Your Space <br />
            <span className="text-pink-_THREAD300">With Expert Care</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Book trusted professionals for all your home service needs
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            onClick={() => navigate('/services')}>
              Get Started
            </button>
            <button className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-bold rounded-lg backdrop-blur-sm transition-all border border-white/30">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-pink-600">Featured</span> Services
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Professional services tailored to your home's needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;