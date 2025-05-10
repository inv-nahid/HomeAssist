import ServiceCard from "../../components/ServiceCard";
import outletImg from '../../assets/outlet.jpg';
import circuitImg from '../../assets/circuit.jpg';

const ElectricianServices = () => {
  const electricianServices = [
    {
      id: 1,
      name: "Outlet Installation",
      description: "Professional installation of electrical outlets",
      price: 50,
      duration: "1 hour",
      image: outletImg, 
      icon: "⚡",
      popular: false,
      rating: 4.6
    },
    {
      id: 2,
      name: "Circuit Repair",
      description: "Diagnosis and repair of electrical circuits",
      price: 75,
      duration: "2 hours",
      image: circuitImg, 
      icon: "⚡",
      popular: true,
      rating: 4.7
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {electricianServices.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ElectricianServices;