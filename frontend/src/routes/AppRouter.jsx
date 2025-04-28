import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookingPage from '../pages/BookingPage';
import Home from '../pages/Home';
import Services from '../pages/Services';
import ServiceDetails from '../pages/ServiceDetails';
import Booking from '../pages/Booking';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Profile from '../pages/Profile'; 
import KnowledgeBase from '../pages/KnowledgeBase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="min-h-[calc(100vh-120px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book-now" element={<BookingPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;