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
            <p>&copy; {new Date().getFullYear()} ServicePro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer