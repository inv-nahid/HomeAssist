import { useNavigate } from "react-router-dom"

const ServiceCard = ({ service }) => {
  const navigate=useNavigate();
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group bg-white h-full flex flex-col">
      {/* Popular Badge */}
      {service.popular && (
        <div className="absolute top-4 right-4 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-md">
          POPULAR
        </div>
      )}
      
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3 text-xl">
            {service.icon}
          </div>
          <h3 className="text-xl font-bold text-gray-800">{service.name}</h3>
        </div>
        
        <p className="text-gray-600 mb-5 flex-grow">{service.description}</p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-indigo-600 font-bold text-lg">${service.price}</span>
            <span className="text-gray-500 text-sm"> / {service.duration}</span>
            <div className="flex items-center mt-1">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span className="text-gray-500 text-sm">{service.rating}</span>
            </div>
          </div>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
          onClick={()=>navigate('/booking')}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard