import { FiGithub, FiTwitter, FiHeart } from 'react-icons/fi'; 

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">HomeAssist</h3>
            <p>Connecting you with trusted service providers in your area.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-blue-400">Home</a></li>
              <li><a href="/services" className="hover:text-blue-400">Services</a></li>
              <li><a href="/about" className="hover:text-blue-400">About Us</a></li>
              <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <p>Email: contact@homeassist.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <div className="flex justify-center gap-4 mb-2">
            <a href="https://github.com/inv-nahid" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              <FiGithub className="inline-block text-xl" />
            </a>
            <a href="https://x.com/xizt_7" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              <FiTwitter className="inline-block text-xl" />
            </a>
          </div>
          <p>
            Made with <FiHeart className="inline-block text-red-500 mx-1" /> by Nahid Azad
          </p>
          <p className="text-xs mt-1">HomeAssist 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;