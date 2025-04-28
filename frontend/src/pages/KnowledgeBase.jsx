const KnowledgeBase = () => {
  const tips = [
    { id: 1, title: "How to Maintain Your Plumbing", content: "Regularly check for leaks and avoid pouring grease down the drain to keep your plumbing in good shape." },
    { id: 2, title: "Energy-Saving Tips for Your Home", content: "Use LED bulbs and turn off appliances when not in use to save energy and reduce your bills." },
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Home Maintenance Tips</h1>
      <div className="space-y-4">
        {tips.map((tip) => (
          <div key={tip.id} className="p-4 bg-gray-100 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{tip.title}</h2>
            <p className="text-gray-700">{tip.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeBase;