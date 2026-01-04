/* ============================================
   Islamic Art House & Hijab House - Main JavaScript
   Handles: Navigation, Animations, Filters, Forms
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initPreloader();
    initNavigation();
    initScrollEffects();
    initProductFilter();
    initScrollAnimations();
    initContactForm();
    initSmoothScroll();
    initReviewSystem();
});

/* ============================================
   Preloader
   ============================================ */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
        // Hide preloader after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 800);
        });
        
        // Fallback - hide preloader after 3 seconds max
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 3000);
    }
}

/* ============================================
   Navigation
   ============================================ */
function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
    
    // Header scroll effect
    if (header) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
}

/* ============================================
   Scroll Effects (Back to Top)
   ============================================ */
function initScrollEffects() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        // Show/hide back to top button
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        // Scroll to top on click
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/* ============================================
   Product Filter
   ============================================ */
function initProductFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterBtns.length && productCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                
                // Filter products with animation
                productCards.forEach((card, index) => {
                    const category = card.dataset.category;
                    
                    if (filter === 'all' || category === filter) {
                        // Show card with delay for stagger effect
                        setTimeout(() => {
                            card.classList.remove('hidden');
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 50);
                        }, index * 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.classList.add('hidden');
                        }, 300);
                    }
                });
            });
        });
    }
}

/* ============================================
   Scroll Animations
   ============================================ */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    // Optionally unobserve after animation
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        animatedElements.forEach(el => observer.observe(el));
    }
    
    // Add stagger effect to grid items
    const grids = document.querySelectorAll('.categories-grid, .products-grid, .testimonials-grid');
    
    grids.forEach(grid => {
        const items = grid.querySelectorAll('.animate-on-scroll');
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });
}

/* ============================================
   Contact Form
   ============================================ */
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            // Validate form
            if (!validateForm(form)) {
                return;
            }
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Simulate form submission (replace with actual API call)
            try {
                await simulateFormSubmission(data);
                
                // Success feedback
                showNotification('Message sent successfully! We will contact you soon.', 'success');
                form.reset();
            } catch (error) {
                // Error feedback
                showNotification('Something went wrong. Please try again or contact us directly.', 'error');
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateInput(input);
            });
            
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateInput(input);
                }
            });
        });
    }
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    let isValid = true;
    
    // Remove previous error
    input.classList.remove('error');
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    // Check if empty
    if (input.required && !value) {
        showInputError(input, 'This field is required');
        isValid = false;
    }
    // Email validation
    else if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showInputError(input, 'Please enter a valid email address');
            isValid = false;
        }
    }
    // Phone validation
    else if (type === 'tel' && value) {
        const phoneRegex = /^[\d\s\-+()]{10,}$/;
        if (!phoneRegex.test(value)) {
            showInputError(input, 'Please enter a valid phone number');
            isValid = false;
        }
    }
    
    return isValid;
}

function showInputError(input, message) {
    input.classList.add('error');
    const errorEl = document.createElement('span');
    errorEl.className = 'error-message';
    errorEl.textContent = message;
    errorEl.style.cssText = 'color: #dc3545; font-size: 0.75rem; margin-top: 4px; display: block;';
    input.parentNode.appendChild(errorEl);
}

function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        // Simulate API call delay
        setTimeout(() => {
            // Log data for debugging (in production, send to server)
            console.log('Form submitted:', data);
            
            // Simulate success (90% success rate for demo)
            if (Math.random() > 0.1) {
                resolve({ success: true });
            } else {
                reject(new Error('Simulated error'));
            }
        }, 1500);
    });
}

function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) existingNotification.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        max-width: 90%;
    `;
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = 'background: none; border: none; color: white; cursor: pointer; padding: 4px;';
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .form-group input.error,
    .form-group textarea.error {
        border-color: #dc3545 !important;
    }
`;
document.head.appendChild(style);

/* ============================================
   Smooth Scroll
   ============================================ */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   Customer Review System - Marquee Style
   ============================================ */
function initReviewSystem() {
    const reviewForm = document.getElementById('review-form');
    const marqueeContent = document.getElementById('marquee-content');
    const averageRatingEl = document.getElementById('average-rating');
    const totalReviewsEl = document.getElementById('total-reviews');
    const starRating = document.getElementById('star-rating');
    const ratingValue = document.getElementById('rating-value');
    
    // Load reviews from localStorage
    let reviews = JSON.parse(localStorage.getItem('customerReviews')) || getInitialReviews();
    
    // Display existing reviews in marquee
    displayMarqueeReviews();
    
    // Star rating click handler
    if (starRating) {
        const stars = starRating.querySelectorAll('i');
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = parseInt(star.dataset.rating);
                ratingValue.value = rating;
                
                // Update visual state
                stars.forEach((s, index) => {
                    if (index < rating) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
            
            // Hover effect
            star.addEventListener('mouseenter', () => {
                const rating = parseInt(star.dataset.rating);
                stars.forEach((s, index) => {
                    if (index < rating) {
                        s.style.color = '#d4af37';
                        s.style.transform = 'scale(1.2)';
                    }
                });
            });
            
            star.addEventListener('mouseleave', () => {
                const currentRating = parseInt(ratingValue.value);
                stars.forEach((s, index) => {
                    if (!s.classList.contains('active')) {
                        s.style.color = '';
                        s.style.transform = '';
                    }
                });
            });
        });
    }
    
    // Handle form submission
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('reviewer-name').value.trim();
            const reviewText = document.getElementById('review-text').value.trim();
            const rating = parseInt(ratingValue.value);
            
            // Validate
            if (!name || !reviewText) {
                showNotification('Please enter your name and review', 'error');
                return;
            }
            
            if (rating < 1) {
                showNotification('Please select a star rating', 'error');
                return;
            }
            
            // Create new review
            const newReview = {
                id: Date.now(),
                name: name,
                text: reviewText,
                rating: rating,
                date: new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                })
            };
            
            // Add to reviews
            reviews.unshift(newReview);
            
            // Save to localStorage
            localStorage.setItem('customerReviews', JSON.stringify(reviews));
            
            // Display updated reviews
            displayMarqueeReviews();
            
            // Reset form
            reviewForm.reset();
            ratingValue.value = '0';
            starRating.querySelectorAll('i').forEach(s => s.classList.remove('active'));
            
            // Show success message
            showNotification('Thank you for your review! ✨ Your feedback means a lot to us!', 'success');
        });
    }
    
    function displayMarqueeReviews() {
        if (!marqueeContent) return;
        
        // Calculate statistics
        const totalReviews = reviews.length;
        const avgRating = totalReviews > 0 
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
            : '5.0';
        
        // Update stats
        if (averageRatingEl) averageRatingEl.textContent = avgRating;
        if (totalReviewsEl) totalReviewsEl.textContent = totalReviews;
        
        // Clear marquee
        marqueeContent.innerHTML = '';
        
        if (totalReviews === 0) {
            marqueeContent.innerHTML = '<div class="marquee-review"><span>Be the first to share your experience! ⭐</span></div>';
            return;
        }
        
        // Create marquee items (duplicate for seamless loop)
        const allReviews = [...reviews, ...reviews]; // Duplicate for seamless scroll
        
        allReviews.forEach((review) => {
            const reviewItem = document.createElement('div');
            reviewItem.className = 'marquee-review';
            
            reviewItem.innerHTML = `
                <div class="marquee-avatar">${getInitials(review.name)}</div>
                <div class="marquee-text">
                    <span class="marquee-name">${escapeHtml(review.name)}</span>
                    <span class="marquee-review-text">"${escapeHtml(truncateText(review.text, 60))}"</span>
                </div>
                <div class="marquee-stars">
                    ${generateStars(review.rating)}
                </div>
            `;
            
            marqueeContent.appendChild(reviewItem);
        });
    }
    
    function generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }
    
    function getInitials(name) {
        return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    function truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
    
    // Initial sample reviews (shown only if no localStorage reviews)
    function getInitialReviews() {
        return [
            {
                id: 1,
                name: "Ayesha Khan",
                text: "Beautiful calligraphy work! The Ayatul Kursi frame looks stunning in my living room. Quality is excellent.",
                rating: 5,
                date: "Dec 28, 2025"
            },
            {
                id: 2,
                name: "Mohammed Ali",
                text: "Ordered acrylic wall art for my new home. Very impressed with the craftsmanship. Will order again!",
                rating: 5,
                date: "Dec 20, 2025"
            },
            {
                id: 3,
                name: "Fatima Begum",
                text: "Great collection of hijabs and Islamic art. The wooden frames are beautifully crafted. Fast delivery!",
                rating: 5,
                date: "Dec 15, 2025"
            },
            {
                id: 4,
                name: "Ahmed Hassan",
                text: "MashaAllah! The acrylic art exceeded my expectations. Perfect for gifting. Highly recommend!",
                rating: 5,
                date: "Dec 10, 2025"
            },
            {
                id: 5,
                name: "Zainab Patel",
                text: "Premium quality hijabs and wonderful customer service. WhatsApp support is very responsive!",
                rating: 5,
                date: "Dec 5, 2025"
            }
        ];
    }
}
                
/* ============================================
   Quick View Modal (Optional Enhancement)
   ============================================ */
function initQuickView() {
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.product-card');
            const productName = card.querySelector('.product-name').textContent;
            const productCategory = card.querySelector('.product-category').textContent;
            const productDescription = card.querySelector('.product-description').textContent;
            
            // Open WhatsApp with product inquiry
            const message = `Assalamu Alaikum! I'm interested in *${productName}*. Please share price and details.`;
            window.open(`https://wa.me/917041337960?text=${encodeURIComponent(message)}`, '_blank');
        });
    });
}

// Initialize quick view
document.addEventListener('DOMContentLoaded', initQuickView);

/* ============================================
   Utility Functions
   ============================================ */

// Debounce function for performance
function debounce(func, wait = 100) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit = 100) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ============================================
   Lazy Loading Images (for future use)
   ============================================ */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Initialize lazy loading when images are added
document.addEventListener('DOMContentLoaded', initLazyLoading);

/* ============================================
   Console Welcome Message
   ============================================ */
console.log('%c☪ Islamic Art House & Hijab House', 'color: #1a5f4a; font-size: 24px; font-weight: bold;');
console.log('%cBringing Islamic Elegance to Your Home & Wardrobe', 'color: #c9a227; font-size: 14px;');
console.log('%cContact: +91 7041337960 | vohramuhammad89@gmail.com', 'color: #666; font-size: 12px;');
