import { useNavigate } from 'react-router-dom';

const services = [
  { id: 1, name: 'Deep Cleaning', price: 120, duration: 'session' },
  { id: 2, name: 'Electrical Repair', price: 85, duration: 'hour' },
  { id: 3, name: 'Plumbing', price: 75, duration: 'hour' },
];

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-pink-50 flex flex-col">
      <header className="w-full bg-white shadow p-4 mb-6">
        <h1 className="text-2xl font-bold text-pink-600 text-center">HomeAssist</h1>
      </header>
      <main className="flex flex-col items-center flex-1 px-2">
        <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-lg mb-8 text-center">
          <h2 className="text-xl font-bold mb-2">Welcome to HomeAssist</h2>
          <p className="mb-4 text-gray-700">Book trusted professionals for your home service needs.</p>
          <button className="mb-2 px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded transition" onClick={() => navigate('/services')}>Get Started</button>
        </div>
        <div className="w-full max-w-lg">
          <h3 className="text-lg font-semibold mb-3 text-pink-600">Featured Services</h3>
          <div className="grid gap-4">
            {services.map(s => (
              <div key={s.id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-800">{s.name}</div>
                  <div className="text-sm text-gray-500">${s.price} / {s.duration}</div>
                </div>
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-1 rounded transition text-sm" onClick={() => navigate('/booking')}>Book Now</button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;