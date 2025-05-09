import { FiHeart, FiUsers, FiCheckCircle } from 'react-icons/fi'; 

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-10 text-center animate-fade-in">
          About HomeAssist
        </h1>
        
        <div className="max-w-4xl mx-auto space-y-8">

          <section className="bg-white p-6 rounded-xl shadow-md border-l-4 border-pink-600 animate-fade-in animation-delay-200">
            <div className="flex items-center gap-3 mb-4">
              <FiHeart className="text-pink-600 text-3xl" />
              <h2 className="text-2xl font-semibold text-gray-800">Our Story</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Founded in 2025, HomeAssist was born out of a simple idea: to make home services accessible and stress-free. We connect customers with trusted service professionals in their local area, ensuring every job is handled with care and expertise. Our platform is designed to simplify the process of finding, booking, and managing home services, all while fostering trust and transparency.
            </p>
          </section>

          <section className="bg-white p-6 rounded-xl shadow-md border-l-4 border-pink-600 animate-fade-in animation-delay-400">
            <div className="flex items-center gap-3 mb-4">
              <FiUsers className="text-pink-600 text-3xl" />
              <h2 className="text-2xl font-semibold text-gray-800">Our Team</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              At HomeAssist, we’re a dedicated team of innovators, developers, and customer service experts passionate about transforming the home service industry. Every service provider on our platform undergoes a rigorous vetting process to ensure they meet our high standards of quality, reliability, and professionalism. We’re here to support you every step of the way.
            </p>
          </section>

          <section className="bg-white p-6 rounded-xl shadow-md border-l-4 border-pink-600 animate-fade-in animation-delay-600">
            <div className="flex items-center gap-3 mb-4">
              <FiCheckCircle className="text-pink-600 text-3xl" />
              <h2 className="text-2xl font-semibold text-gray-800">Why Choose Us?</h2>
            </div>
            <ul className="list-none space-y-3 text-gray-600">
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-pink-500" />
                <span>Verified service providers you can trust</span>
              </li>
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-pink-500" />
                <span>Transparent pricing with no hidden fees</span>
              </li>
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-pink-500" />
                <span>Seamless online booking at your fingertips</span>
              </li>
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-pink-500" />
                <span>Customer satisfaction guarantee for peace of mind</span>
              </li>
            </ul>
          </section>

          <section className="bg-pink-600 text-white p-6 rounded-xl shadow-lg text-center animate-fade-in animation-delay-800">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto">
              We aim to empower homeowners by providing a reliable, efficient, and user-friendly platform to access top-notch home services. At HomeAssist, we believe every home deserves the best care, and we’re committed to making that a reality.
            </p>
          </section>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
      `}</style>
    </div>
  );
};

export default About;