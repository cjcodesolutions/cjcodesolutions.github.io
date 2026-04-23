import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchReviews, submitReview } from '../api/feedback';
import ReviewCard from '../components/ReviewCard';
import StarRating from '../components/StarRating';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const trackRef = useRef(null);
  const autoSlideRef = useRef(null);

  // Load reviews from MongoDB
  useEffect(() => {
    async function load() {
      const apiReviews = await fetchReviews();
      if (apiReviews && apiReviews.length > 0) {
        setReviews(apiReviews);
      }
      setLoading(false);
    }
    load();
  }, []);

  const getReviewsPerPage = useCallback(() => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }, []);

  const totalPages = Math.ceil(reviews.length / getReviewsPerPage());

  const goToSlide = useCallback((index) => {
    setCurrentSlide(Math.max(0, Math.min(index, totalPages - 1)));
  }, [totalPages]);

  // Auto-slide
  useEffect(() => {
    autoSlideRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(autoSlideRef.current);
  }, [totalPages]);

  // Update carousel position
  useEffect(() => {
    if (!trackRef.current) return;
    const card = trackRef.current.querySelector('.review-card');
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const gap = 24;
    const perPage = getReviewsPerPage();
    const offset = currentSlide * (cardWidth + gap) * perPage;
    trackRef.current.style.transform = `translateX(-${offset}px)`;
  }, [currentSlide, reviews, getReviewsPerPage]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.feedbackName.value.trim();
    const project = e.target.feedbackProject.value;
    const message = e.target.feedbackMessage.value.trim();

    if (!name || !project || !message || selectedRating === 0) return;

    setSubmitting(true);
    const newReview = {
      name,
      initial: name.charAt(0).toUpperCase(),
      project,
      rating: selectedRating,
      text: message,
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    };

    await submitReview(newReview);
    setReviews((prev) => [...prev, newReview]);
    setFormSubmitted(true);
    setSubmitting(false);

    setTimeout(() => {
      setFormSubmitted(false);
      setSelectedRating(0);
      e.target.reset();
    }, 4000);
  };

  return (
    <div className="page-transition">
      <section className="section feedback-section" style={{ paddingTop: '140px' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{'// reviews'}</span>
            <h2 className="section-title">Client <span className="gradient-text">Feedback</span></h2>
            <p className="section-desc">Hear from students who've used our services. Your feedback helps us grow!</p>
          </div>

          {loading ? (
            <div className="loading-spinner"><div className="spinner"></div></div>
          ) : reviews.length === 0 ? (
            <div className="reviews-empty" style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              <h3>No reviews yet!</h3>
              <p>Be the first to share your experience with us.</p>
            </div>
          ) : (
            <div
              className="reviews-carousel"
              onMouseEnter={() => clearInterval(autoSlideRef.current)}
              onMouseLeave={() => {
                autoSlideRef.current = setInterval(() => {
                  setCurrentSlide((prev) => (prev + 1) % totalPages);
                }, 5000);
              }}
            >
              <div className="reviews-track" ref={trackRef}>
                {reviews.map((review, i) => (
                  <ReviewCard key={i} review={review} />
                ))}
              </div>
              <div className="carousel-controls">
                <button className="carousel-btn" onClick={() => goToSlide(currentSlide - 1)} aria-label="Previous">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <div className="carousel-dots">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <div key={i} className={`carousel-dot ${i === currentSlide ? 'active' : ''}`} onClick={() => goToSlide(i)} />
                  ))}
                </div>
                <button className="carousel-btn" onClick={() => goToSlide(currentSlide + 1)} aria-label="Next">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            </div>
          )}

          {/* Submit Feedback Form */}
          <div className="feedback-form-wrapper">
            {!formSubmitted ? (
              <>
                <div className="feedback-form-header">
                  <h3>Leave Your Feedback</h3>
                  <p>Worked with us? We'd love to hear about your experience!</p>
                </div>
                <form className="feedback-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="feedbackName">Your Name</label>
                      <input type="text" id="feedbackName" name="feedbackName" placeholder="e.g., John D." required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="feedbackProject">Project Type</label>
                      <select id="feedbackProject" name="feedbackProject" required>
                        <option value="">Select project type...</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Software Engineering">Software Engineering</option>
                        <option value="Database & System Design">Database & System Design</option>
                        <option value="Mobile Development">Mobile Development</option>
                        <option value="AI & Machine Learning">AI & Machine Learning</option>
                        <option value="Reports & Research">Reports & Research</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Rating</label>
                    <StarRating rating={selectedRating} onRate={setSelectedRating} interactive />
                  </div>
                  <div className="form-group">
                    <label htmlFor="feedbackMessage">Your Review</label>
                    <textarea id="feedbackMessage" name="feedbackMessage" rows="4" placeholder="Tell us about your experience..." required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary btn-submit" disabled={submitting}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>
                    {submitting ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                </form>
              </>
            ) : (
              <div className="feedback-success">
                <div className="success-icon">✓</div>
                <h3>Thank You!</h3>
                <p>Your feedback has been submitted successfully. We appreciate your review!</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
