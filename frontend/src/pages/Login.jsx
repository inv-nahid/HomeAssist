import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
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
    try {
      const res = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('token', data.token);
      setMessage('Login successful!');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (e) {
      setMessage(e.message || 'Login failed.');
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
        <form onSubmit={handleSubmit} className="w-full max-w-xs bg-white p-6 rounded-xl shadow-md space-y-4">
          <h2 className="text-xl font-bold mb-2 text-center">Login</h2>
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full border p-2 rounded" required />
          <label className="flex items-center text-sm">
            <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} className="mr-2" /> Remember Me
          </label>
          <button type="submit" disabled={isLoading} className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded transition">{isLoading ? 'Logging in...' : 'Login'}</button>
          <div className="text-sm text-center">
            Don't have an account? <Link to="/register" className="text-pink-600 underline">Register</Link>
          </div>
          {message && <div className="text-center text-sm text-red-500">{message}</div>}
        </form>
      </main>
    </div>
  );
};

export default Login;