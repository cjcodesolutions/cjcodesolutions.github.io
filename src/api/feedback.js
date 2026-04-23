const API_BASE = import.meta.env.VITE_API_URL || '';

export async function fetchReviews() {
  if (!API_BASE) return null;
  try {
    const res = await fetch(`${API_BASE}/api/reviews`);
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
  } catch (err) {
    console.warn('API unavailable, using local reviews:', err.message);
    return null;
  }
}

export async function submitReview(review) {
  if (!API_BASE) {
    // Fallback: save to localStorage
    const stored = localStorage.getItem('cj_reviews');
    const reviews = stored ? JSON.parse(stored) : [];
    reviews.push(review);
    localStorage.setItem('cj_reviews', JSON.stringify(reviews));
    return { success: true, local: true };
  }
  try {
    const res = await fetch(`${API_BASE}/api/reviews`, {
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
