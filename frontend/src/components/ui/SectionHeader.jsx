const SectionHeader = ({ title, subtitle }) => {
    return (
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      </div>
    )
  }
  
  export default SectionHeader