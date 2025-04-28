const About = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        
        <div className="max-w-3xl mx-auto space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Our Story</h2>
            <p className="text-gray-700">
              Founded in 2023, HomeAssist connects customers with trusted service professionals 
              in their local area. Our mission is to make finding and booking home services 
              as easy as possible.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-3">Our Team</h2>
            <p className="text-gray-700">
              We're a team of passionate individuals dedicated to improving the service 
              industry through technology. Every service professional on our platform 
              is thoroughly vetted to ensure quality and reliability.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-3">Why Choose Us?</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Verified service providers</li>
              <li>Transparent pricing</li>
              <li>Easy online booking</li>
              <li>Customer satisfaction guarantee</li>
            </ul>
          </section>
        </div>
      </div>
    )
  }
  
  export default About