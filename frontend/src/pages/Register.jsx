import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    password: '', 
    confirmPassword: '', 
    agreeTerms: false 
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // NEW: Loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSubmit = async (e) => { // NEW: Made async
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Validation checks
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords don't match!");
      setIsLoading(false);
      return;
    }

    if (!formData.agreeTerms) {
      setMessage("You must agree to the terms");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setMessage('Registration successful! Redirecting...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMessage(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center py-16">
      <div className="animate-slide-up max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create an Account</h1>
          <p className="text-gray-600">Join us to book professional home services</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              required 
            />
          </div>

          {/* Email Field */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              required 
            />
          </div>

          {/* Phone Field */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              required 
            />
          </div>

          {/* Password Field */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              required 
            />
          </div>

          {/* Confirm Password Field */}
          <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              required 
            />
          </div>

          {/* Terms Checkbox */}
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                name="agreeTerms" 
                checked={formData.agreeTerms} 
                onChange={handleChange} 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                required 
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the{' '}
                <Link to="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>

          {/* Message Display */}
          {message && (
            <p className={`text-center animate-fade-in ${
              message.includes('successful') ? 'text-green-600' : 'text-red-600'
            }`}>
              {message}
            </p>
          )}
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;