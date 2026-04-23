import StarRating from './StarRating';

export default function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <StarRating rating={review.rating} />
      <p className="review-text">"{review.text}"</p>
      <div className="review-author">
        <div className="review-avatar">{review.initial || review.name.charAt(0)}</div>
        <div className="review-meta">
          <h4>{review.name}</h4>
          <span>{review.project} • {review.date}</span>
        </div>
      </div>
    </div>
  );
}
