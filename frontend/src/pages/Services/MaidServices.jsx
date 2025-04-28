import ServiceCard from "../../components/ServiceCard";

const MaidServices = () => {
  const maidServices = [
    {
      id: 1,
      name: "Standard Cleaning",
      description: "Basic cleaning for all rooms including vacuuming and mopping",
      price: 25,
      duration: "2 hours",
      image: "https://picsum.photos/600/400?random=4", // Placeholder image
      icon: "🧹",
      popular: false,
      rating: 4.5
    },
    {
      id: 2,
      name: "Deep Cleaning",
      description: "Thorough cleaning including appliances and hard-to-reach areas",
      price: 45,
      duration: "4 hours",
      image: "https://picsum.photos/600/400?random=5", // Placeholder image
      icon: "🧹",
      popular: true,
      rating: 4.8
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {maidServices.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default MaidServices;