const API_BASE = import.meta.env.VITE_API_URL || '';
const REVIEWS_ENDPOINT = API_BASE
  ? `${API_BASE.replace(/\/$/, '')}/api/reviews`
  : '/api/reviews';

export async function fetchReviews() {
  try {
    const res = await fetch(REVIEWS_ENDPOINT);
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
  } catch (err) {
    console.warn('API unavailable, using local reviews:', err.message);
    return null;
  }
}

export async function submitReview(review) {
  try {
    const res = await fetch(REVIEWS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    });
    if (!res.ok) throw new Error('Failed to submit');
    return await res.json();
  } catch (err) {
    console.warn('API unavailable, saving locally:', err.message);
    const stored = localStorage.getItem('cj_reviews');
    const reviews = stored ? JSON.parse(stored) : [];
    reviews.push(review);
    localStorage.setItem('cj_reviews', JSON.stringify(reviews));
    return { success: true, local: true };
  }
}
