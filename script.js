/* ============================================
   CJ CODE SOLUTIONS — PORTFOLIO SCRIPTS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1600);
    });
    // Fallback: hide preloader after 3s regardless
    setTimeout(() => preloader.classList.add('hidden'), 3000);

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Scroll class
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // --- Mobile nav toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    // Close mobile nav on link click
    navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    // --- Animated number counters ---
    const statNumbers = document.querySelectorAll('.hero-stat-number');
    let statsCounted = false;

    function animateCounters() {
        if (statsCounted) return;
        statsCounted = true;

        statNumbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'));
            const duration = 2000;
            const startTime = performance.now();

            function updateCount(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease out quart
                const easeOut = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(easeOut * target);
                
                num.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    num.textContent = target;
                }
            }
            requestAnimationFrame(updateCount);
        });
    }

    // Trigger counters when hero is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateCounters, 500);
            }
        });
    }, { threshold: 0.3 });

    const heroSection = document.getElementById('hero');
    if (heroSection) heroObserver.observe(heroSection);

    // --- Scroll Animations ---
    const animateElements = document.querySelectorAll('.about-card, .service-card, .project-card, .process-step');
    animateElements.forEach(el => el.classList.add('animate-on-scroll'));

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animateElements.forEach(el => scrollObserver.observe(el));

    // --- Project Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category') || '';
                if (filter === 'all' || category.includes(filter)) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s var(--ease-out) forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // --- Reviews System (localStorage) ---
    const defaultReviews = [
        {
            name: "Ashan P.",
            initial: "A",
            project: "Web Development",
            rating: 5,
            text: "Absolutely amazing work! They delivered my React project 2 days before the deadline. The code was clean, well-commented, and my professor was impressed. Highly recommend!",
            date: "March 2025"
        },
        {
            name: "Nethmi S.",
            initial: "N",
            project: "Software Engineering",
            rating: 5,
            text: "I was struggling with my software engineering project. CJ Code Solutions not only completed it perfectly but also explained the architecture so I could present it confidently.",
            date: "February 2025"
        },
        {
            name: "Kavindu R.",
            initial: "K",
            project: "Database Design",
            rating: 5,
            text: "The database design was exactly what I needed — properly normalized, with clear ER diagrams and SQL scripts. Fast turnaround and great communication throughout.",
            date: "January 2025"
        },
        {
            name: "Dilshan M.",
            initial: "D",
            project: "AI & Machine Learning",
            rating: 5,
            text: "Got an A+ on my ML assignment! The model was well-trained with proper documentation. They even included a Jupyter notebook with step-by-step explanations.",
            date: "April 2025"
        },
        {
            name: "Sachini W.",
            initial: "S",
            project: "Mobile Development",
            rating: 5,
            text: "My Android app project was done perfectly. Clean Kotlin code, proper MVVM architecture, and beautiful UI. These guys really know their stuff!",
            date: "March 2025"
        },
        {
            name: "Tharuka J.",
            initial: "T",
            project: "Reports & Research",
            rating: 4,
            text: "Great research report with proper IEEE formatting. The literature review was comprehensive. Would have liked it a day earlier, but overall great work!",
            date: "February 2025"
        }
    ];

    function getReviews() {
        const stored = localStorage.getItem('cj_reviews');
        if (stored) {
            return JSON.parse(stored);
        }
        localStorage.setItem('cj_reviews', JSON.stringify(defaultReviews));
        return defaultReviews;
    }

    function saveReview(review) {
        const reviews = getReviews();
        reviews.push(review);
        localStorage.setItem('cj_reviews', JSON.stringify(reviews));
        return reviews;
    }

    // --- Render Reviews Carousel ---
    const reviewsTrack = document.getElementById('reviewsTrack');
    const carouselDotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    let currentSlide = 0;
    let reviewsPerPage = 3;

    function getReviewsPerPage() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    function renderStars(rating) {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += `<span class="star-filled" style="opacity: ${i < rating ? 1 : 0.2}"">★</span>`;
        }
        return stars;
    }

    function renderReviews() {
        const reviews = getReviews();
        reviewsPerPage = getReviewsPerPage();
        const totalPages = Math.ceil(reviews.length / reviewsPerPage);
        
        reviewsTrack.innerHTML = reviews.map(review => `
            <div class="review-card">
                <div class="review-stars">${renderStars(review.rating)}</div>
                <p class="review-text">"${review.text}"</p>
                <div class="review-author">
                    <div class="review-avatar">${review.initial || review.name.charAt(0)}</div>
                    <div class="review-meta">
                        <h4>${review.name}</h4>
                        <span>${review.project} • ${review.date}</span>
                    </div>
                </div>
            </div>
        `).join('');

        // Render dots
        carouselDotsContainer.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(i));
            carouselDotsContainer.appendChild(dot);
        }
        
        currentSlide = 0;
        updateCarousel();
    }

    function updateCarousel() {
        const reviews = getReviews();
        reviewsPerPage = getReviewsPerPage();
        const totalPages = Math.ceil(reviews.length / reviewsPerPage);
        
        // Calculate the offset
        const cardWidth = reviewsTrack.querySelector('.review-card')?.offsetWidth || 300;
        const gap = 24;
        const offset = currentSlide * (cardWidth + gap) * reviewsPerPage;
        
        reviewsTrack.style.transform = `translateX(-${offset}px)`;
        
        // Update dots
        const dots = carouselDotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function goToSlide(index) {
        const reviews = getReviews();
        reviewsPerPage = getReviewsPerPage();
        const totalPages = Math.ceil(reviews.length / reviewsPerPage);
        currentSlide = Math.max(0, Math.min(index, totalPages - 1));
        updateCarousel();
    }

    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    // Auto-slide
    let autoSlideInterval = setInterval(() => {
        const reviews = getReviews();
        reviewsPerPage = getReviewsPerPage();
        const totalPages = Math.ceil(reviews.length / reviewsPerPage);
        goToSlide((currentSlide + 1) % totalPages);
    }, 5000);

    // Pause on hover
    const carousel = document.getElementById('reviewsCarousel');
    carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    carousel.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            const reviews = getReviews();
            reviewsPerPage = getReviewsPerPage();
            const totalPages = Math.ceil(reviews.length / reviewsPerPage);
            goToSlide((currentSlide + 1) % totalPages);
        }, 5000);
    });

    window.addEventListener('resize', () => {
        renderReviews();
    });

    renderReviews();

    // --- Star Rating Interaction ---
    const starButtons = document.querySelectorAll('#starRating .star');
    let selectedRating = 0;

    starButtons.forEach(star => {
        star.addEventListener('mouseenter', () => {
            const hoverRating = parseInt(star.getAttribute('data-rating'));
            starButtons.forEach(s => {
                const r = parseInt(s.getAttribute('data-rating'));
                s.classList.toggle('hovered', r <= hoverRating);
            });
        });

        star.addEventListener('mouseleave', () => {
            starButtons.forEach(s => s.classList.remove('hovered'));
        });

        star.addEventListener('click', () => {
            selectedRating = parseInt(star.getAttribute('data-rating'));
            starButtons.forEach(s => {
                const r = parseInt(s.getAttribute('data-rating'));
                s.classList.toggle('active', r <= selectedRating);
            });
        });
    });

    // --- Feedback Form Submission ---
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackSuccess = document.getElementById('feedbackSuccess');

    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('feedbackName').value.trim();
        const project = document.getElementById('feedbackProject').value;
        const message = document.getElementById('feedbackMessage').value.trim();

        if (!name || !project || !message || selectedRating === 0) {
            // Shake the form if rating not selected
            if (selectedRating === 0) {
                const starRating = document.getElementById('starRating');
                starRating.style.animation = 'shake 0.5s ease';
                setTimeout(() => starRating.style.animation = '', 500);
            }
            return;
        }

        const newReview = {
            name: name,
            initial: name.charAt(0).toUpperCase(),
            project: project,
            rating: selectedRating,
            text: message,
            date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        };

        saveReview(newReview);
        
        // Show success
        feedbackForm.style.display = 'none';
        feedbackSuccess.style.display = 'block';

        // Re-render reviews
        renderReviews();

        // Reset after 4 seconds
        setTimeout(() => {
            feedbackForm.style.display = 'block';
            feedbackSuccess.style.display = 'none';
            feedbackForm.reset();
            selectedRating = 0;
            starButtons.forEach(s => s.classList.remove('active'));
        }, 4000);
    });

    // --- Smooth anchor scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const elementPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Tilt effect on service cards ---
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;

            // Move glow
            const glow = card.querySelector('.service-card-glow');
            if (glow) {
                glow.style.left = `${x - rect.width}px`;
                glow.style.top = `${y - rect.height}px`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Add shake animation dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            50% { transform: translateX(8px); }
            75% { transform: translateX(-4px); }
        }
    `;
    document.head.appendChild(style);
});
