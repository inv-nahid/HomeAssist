import { useState, useEffect } from 'react';

const ReviewForm = ({ onSubmit, initialReview }) => {
  const [formData, setFormData] = useState({
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    if (initialReview) {
      setFormData({
        rating: initialReview.rating || 5,
        comment: initialReview.comment || ''
      });
    }
  }, [initialReview]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating
        </label>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFormData({ ...formData, rating: star })}
              className="text-2xl focus:outline-none"
            >
              <span className={star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}>
                ★
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Review
        </label>
        <textarea
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows="4"
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          required
          placeholder="Share your experience with this service..."
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 px-6 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
      >
        {initialReview ? 'Update Review' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;