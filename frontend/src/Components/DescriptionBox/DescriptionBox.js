import React, { useState, useEffect, useContext } from 'react';
import './DescriptionBox.css';
import { AuthContext } from '../../Context/AuthenticationContext';
import { createReview, getReviews, updateReview, deleteReview } from '../../data/repository';

const DescriptionBox = ({ productId }) => {
  const { authenticatedUser } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);
  const [editReviewId, setEditReviewId] = useState(null);
  const [editReviewText, setEditReviewText] = useState('');
  const [editRating, setEditRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState(''); // Added state for error message

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    console.log("Fetching reviews for product:", productId); // Debug
    try {
      const reviews = await getReviews(productId);
      console.log("Fetched reviews:", reviews); // Debug
      setReviews(reviews);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    }
  };
  
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (reviewText.split(' ').length > 100) {
        alert("Review cannot be more than 100 words");
        return;
    }
    if (rating < 1 || rating > 5) {
        alert("Please select a valid rating between 1 and 5.");
        return;
    }
    try {
        const reviewData = {
            user_id: authenticatedUser.SID,
            product_id: productId,
            rating,
            review_text: reviewText,
        };
        const newReview = await createReview(reviewData);
        setReviews([...reviews, newReview]);
        setReviewText('');
        setRating(1); // Reset rating to minimum of 1
        setErrorMessage(''); // Clear any previous error message
    } catch (error) {
        if (error.response && error.response.status === 400) {
            setErrorMessage(error.response.data.message);
        } else {
            console.error("Failed to submit review", error);
        }
    }
};

  const handleEditReviewSubmit = async (e) => {
    e.preventDefault();
    if (editReviewText.split(' ').length > 100) {
      alert("Review cannot be more than 100 words");
      return;
    }
    try {
      const updatedReview = await updateReview(editReviewId, {
        rating: editRating,
        review_text: editReviewText,
      });
      setReviews(reviews.map((review) => (review.review_id === editReviewId ? updatedReview : review)));
      setEditReviewId(null);
      setEditReviewText('');
      setEditRating(0);
    } catch (error) {
      console.error("Failed to edit review", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      setReviews(reviews.filter((review) => review.review_id !== reviewId));
    } catch (error) {
      console.error("Failed to delete review", error);
    }
  };

  if (!authenticatedUser) {
    return (
      <div className="descriptionbox2">
        <p>Please log in to see and submit reviews.</p>
      </div>
    );
  }

  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Reviews and Ratings</div>
      </div>
      <div className="descriptionbox-reviews">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.review_id} className="review">
              <p><strong>Rating:</strong> {review.rating}/5</p>
              <p>{review.review_text}</p>
              {review.user_id === authenticatedUser.SID && (
                <>
                  <button onClick={() => {
                    setEditReviewId(review.review_id);
                    setEditReviewText(review.review_text);
                    setEditRating(review.rating);
                  }}>Edit</button>
                  <button onClick={() => handleDeleteReview(review.review_id)}>Delete</button>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
      <div className="review-form">
        {errorMessage && <p className="error-message">{errorMessage}</p>} 
        {editReviewId ? (
          <form onSubmit={handleEditReviewSubmit}>
            <label>
              Rating:
              <select value={editRating} onChange={(e) => setEditRating(Number(e.target.value))}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </label>
            <label>
              Review:
              <textarea value={editReviewText} onChange={(e) => setEditReviewText(e.target.value)}></textarea>
            </label>
            <button type="submit">Update Review</button>
            <button type="button" onClick={() => {
              setEditReviewId(null);
              setEditReviewText('');
              setEditRating(0);
            }}>Cancel</button>
          </form>
        ) : (
          <form onSubmit={handleReviewSubmit}>
            <label>
              Rating:
              <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </label>
            <label>
              Review:
              <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)}></textarea>
            </label>
            <button type="submit">Submit Review</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default DescriptionBox;
