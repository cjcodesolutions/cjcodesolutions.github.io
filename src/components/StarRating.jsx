export default function StarRating({ rating, onRate, interactive = false }) {
  const handleMouseEnter = (e, i) => {
    if (!interactive) return;
    const stars = e.target.closest('.star-rating').querySelectorAll('.star');
    stars.forEach((s, idx) => {
      s.classList.toggle('hovered', idx <= i);
    });
  };

  const handleMouseLeave = (e) => {
    if (!interactive) return;
    const stars = e.target.closest('.star-rating').querySelectorAll('.star');
    stars.forEach((s) => s.classList.remove('hovered'));
  };

  if (!interactive) {
    return (
      <div className="review-stars">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="star-filled" style={{ opacity: i < rating ? 1 : 0.2 }}>
            ★
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="star-rating" id="starRating">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          className={`star ${i <= rating ? 'active' : ''}`}
          data-rating={i}
          aria-label={`${i} star${i > 1 ? 's' : ''}`}
          onClick={() => onRate(i)}
          onMouseEnter={(e) => handleMouseEnter(e, i - 1)}
          onMouseLeave={handleMouseLeave}
        >
          ★
        </button>
      ))}
    </div>
  );
}
