const ReviewList = ({ reviews }) => {
    if (!reviews || reviews.length === 0) {
      return <p className="text-gray-600 italic">No reviews yet. Be the first to share your experience!</p>;
    }
  
    return (
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-600">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                    ★
                  </span>
                ))}
              </div>
              <span className="ml-2 text-gray-600 text-sm">{review.date}</span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default ReviewList;