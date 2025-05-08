import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', agreeTerms: false });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords don't match!");
      setIsLoading(false);
      return;
    }
    if (!formData.agreeTerms) {
      setMessage('You must agree to the terms');
      setIsLoading(false);
      return;
    }
    try {
      const res = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email, phone: formData.phone, password: formData.password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      setMessage('Registration successful!');
      setTimeout(() => navigate('/login'), 1000);
    } catch (e) {
      setMessage(e.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col">
      <header className="w-full bg-white shadow p-4 mb-6">
        <h1 className="text-2xl font-bold text-pink-600 text-center">HomeAssist</h1>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center px-2">
        <form onSubmit={handleSubmit} className="w-full max-w-xs bg-white p-6 rounded-xl shadow-md space-y-3">
          <h2 className="text-xl font-bold mb-2 text-center">Register</h2>
          <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="phone" type="tel" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="w-full border p-2 rounded" required />
          <label className="flex items-center text-sm">
            <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} className="mr-2" required /> I agree to the <Link to="/terms" className="text-pink-600 underline">Terms</Link>
          </label>
          <button type="submit" disabled={isLoading} className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded transition">{isLoading ? 'Registering...' : 'Register'}</button>
          <div className="text-sm text-center">
            Already have an account? <Link to="/login" className="text-pink-600 underline">Login</Link>
          </div>
          {message && <div className="text-center text-sm text-red-500">{message}</div>}
        </form>
      </main>
    </div>
  );
};

export default Register;