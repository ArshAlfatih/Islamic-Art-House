/* ============================================
   Islamic Art House - Main JavaScript
   Handles: Navigation, Animations, Filters, Forms, AR
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
    initARPreview();
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
                text: "Great collection of Islamic art. The wooden frames are beautifully crafted. Fast delivery!",
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
                text: "Premium quality art pieces and wonderful customer service. WhatsApp support is very responsive!",
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
   3D AR Preview Feature - Mobile Optimized
   ============================================ */
function initARPreview() {
    const arModal = document.getElementById('arModal');
    const arCloseBtn = document.getElementById('arCloseBtn');
    const arVideo = document.getElementById('arVideo');
    const arFrameOverlay = document.getElementById('arFrameOverlay');
    const arFrame3D = document.getElementById('arFrame3D');
    const arFrameImage = document.getElementById('arFrameImage');
    const arFrameBorder = document.querySelector('.ar-frame-border');
    const arSizeSlider = document.getElementById('arSizeSlider');
    const arDepthSlider = document.getElementById('arDepthSlider');
    const arCaptureBtn = document.getElementById('arCaptureBtn');
    const arWhatsAppBtn = document.getElementById('arWhatsAppBtn');
    
    // Handle viewport resize (for mobile browser address bar)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (arModal && arModal.classList.contains('active')) {
                // Adjust modal height on resize
                arModal.style.height = `${window.innerHeight}px`;
            }
        }, 100);
    });
    
    // Handle visual viewport changes (keyboard appearing)
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', () => {
            if (arModal && arModal.classList.contains('active')) {
                arModal.style.height = `${window.visualViewport.height}px`;
            }
        });
    }
    const arProductName = document.getElementById('arProductName');
    const arViewBtns = document.querySelectorAll('.ar-view-btn');
    const frameStyleBtns = document.querySelectorAll('.frame-style-btn');
    
    let currentStream = null;
    let currentProductName = '';
    let isDragging = false;
    let startX, startY, initialX, initialY;
    let frameX = 0, frameY = 0;
    let currentFrameStyle = 'gold';
    let frameDepth = 15;
    
    // Device motion for realistic 3D effect
    let tiltX = 0, tiltY = 0;
    let useDeviceMotion = false;
    
    // Open AR Modal
    arViewBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const imageSrc = btn.dataset.image;
            const productName = btn.dataset.name;
            currentProductName = productName;
            
            arProductName.textContent = `View "${productName}" on Your Wall`;
            arFrameImage.src = imageSrc;
            arWhatsAppBtn.href = `https://wa.me/917041337960?text=Assalamu%20Alaikum!%20I%20used%20AR%20preview%20for%20*${encodeURIComponent(productName)}*%20and%20I'm%20interested%20in%20ordering%20it.%20Please%20share%20price%20and%20details.`;
            
            arModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Reset frame position and settings
            frameX = 0;
            frameY = 0;
            tiltX = 0;
            tiltY = 0;
            frameDepth = 15;
            arFrameOverlay.style.transform = 'translate(-50%, -50%)';
            arSizeSlider.value = 200;
            arDepthSlider.value = 15;
            arFrameImage.style.width = '200px';
            
            // Set mobile-optimized default size
            if (window.innerWidth <= 480) {
                arFrameImage.style.width = '130px';
                arSizeSlider.value = 130;
            } else if (window.innerWidth <= 768) {
                arFrameImage.style.width = '160px';
                arSizeSlider.value = 160;
            }
            
            updateFrame3DTransform();
            
            // Reset frame style
            setFrameStyle('gold');
            
            // Start camera
            await startCamera();
            
            // Request device motion permission (iOS 13+)
            requestDeviceMotion();
            
            // Lock screen orientation if possible (mobile)
            lockScreenOrientation();
        });
    });
    
    // Lock screen orientation for better AR experience
    function lockScreenOrientation() {
        if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('portrait').catch(() => {
                // Orientation lock not supported
            });
        }
    }
    
    // Request device motion for 3D tilt effect
    async function requestDeviceMotion() {
        if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
            try {
                const permission = await DeviceMotionEvent.requestPermission();
                if (permission === 'granted') {
                    useDeviceMotion = true;
                    window.addEventListener('deviceorientation', handleDeviceOrientation);
                }
            } catch (e) {
                console.log('Device motion not available');
            }
        } else if (window.DeviceOrientationEvent) {
            useDeviceMotion = true;
            window.addEventListener('deviceorientation', handleDeviceOrientation);
        }
    }
    
    // Handle device orientation for PHOTOREALISTIC 3D effect
    function handleDeviceOrientation(e) {
        if (!arModal.classList.contains('active')) return;
        
        // Get device tilt (beta = front-back, gamma = left-right)
        const beta = e.beta || 0;  // -180 to 180
        const gamma = e.gamma || 0; // -90 to 90
        
        // Smooth, realistic tilt with reduced sensitivity for mobile comfort
        const sensitivity = window.innerWidth <= 480 ? 0.4 : 0.6;
        const targetTiltX = Math.max(-20, Math.min(20, gamma * sensitivity));
        const targetTiltY = Math.max(-15, Math.min(15, (beta - 45) * (sensitivity * 0.7)));
        
        // Smooth interpolation for realistic motion
        tiltX += (targetTiltX - tiltX) * 0.12;
        tiltY += (targetTiltY - tiltY) * 0.12;
        
        updateFrame3DTransform();
    }
    
    // Update 3D frame transform - MAXIMUM REALISTIC
    function updateFrame3DTransform() {
        if (arFrame3D) {
            // Add subtle perspective shift based on tilt
            const perspectiveShiftX = tiltX * 0.3;
            const perspectiveShiftY = tiltY * 0.3;
            
            arFrame3D.style.transform = `
                perspective(2500px)
                rotateX(${tiltY}deg) 
                rotateY(${tiltX}deg) 
                translateZ(${frameDepth}px)
                translate3d(${perspectiveShiftX}px, ${perspectiveShiftY}px, 0)
            `;
            
            // Update shadow dynamically for photorealistic lighting
            const shadowX = -tiltX * 2;
            const shadowY = 20 + tiltY * 1.5;
            const shadowBlur = 25 + Math.abs(frameDepth);
            const shadowOpacity = 0.85 - (Math.abs(tiltX) + Math.abs(tiltY)) * 0.008;
            
            const wallShadow = document.querySelector('.ar-wall-shadow');
            if (wallShadow) {
                wallShadow.style.transform = `
                    translateX(${shadowX}px) 
                    translateY(${shadowY}px) 
                    translateZ(-${40 + frameDepth}px)
                    skewX(${-tiltX * 0.3}deg)
                    skewY(${-tiltY * 0.2}deg)
                `;
                wallShadow.style.filter = `blur(${shadowBlur}px)`;
                wallShadow.style.opacity = shadowOpacity;
            }
            
            // Update glass reflection based on angle
            const glassReflection = document.querySelector('.ar-glass-reflection');
            if (glassReflection) {
                const reflectionAngle = 130 + tiltX * 0.5;
                const reflectionOpacity = 0.8 + tiltX * 0.01;
                glassReflection.style.background = `
                    linear-gradient(${reflectionAngle}deg,
                        rgba(255, 255, 255, ${0.35 + tiltX * 0.005}) 0%,
                        rgba(255, 255, 255, 0.15) 20%,
                        transparent 50%),
                    linear-gradient(${310 + tiltY * 0.3}deg,
                        transparent 60%,
                        rgba(255, 255, 255, 0.05) 85%,
                        rgba(255, 255, 255, 0.1) 100%)
                `;
            }
        }
    }
    
    // Frame Style Selection
    frameStyleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const style = btn.dataset.frame;
            setFrameStyle(style);
        });
    });
    
    function setFrameStyle(style) {
        currentFrameStyle = style;
        
        // Update active button
        frameStyleBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.frame === style) {
                btn.classList.add('active');
            }
        });
        
        // Update frame border class
        if (arFrameBorder) {
            arFrameBorder.className = 'ar-frame-border frame-' + style;
        }
    }
    
    // Start Camera - Optimized for mobile
    async function startCamera() {
        try {
            // Try rear camera first, fallback to any camera
            const constraints = {
                video: {
                    facingMode: { ideal: 'environment' },
                    width: { ideal: 1920, min: 640 },
                    height: { ideal: 1080, min: 480 }
                }
            };
            
            try {
                currentStream = await navigator.mediaDevices.getUserMedia(constraints);
            } catch (e) {
                // Fallback to any camera
                currentStream = await navigator.mediaDevices.getUserMedia({
                    video: true
                });
            }
            
            arVideo.srcObject = currentStream;
            arVideo.play();
        } catch (error) {
            console.error('Camera error:', error);
            showARError();
        }
    }
    
    // Show error if camera not available
    function showARError() {
        const arContainer = document.querySelector('.ar-container');
        arContainer.innerHTML = `
            <div class="ar-error">
                <i class="fas fa-video-slash"></i>
                <h4>Camera Access Required</h4>
                <p>Please allow camera access to use the AR preview feature. 
                   Make sure you're using HTTPS and have granted camera permissions.</p>
                <button onclick="location.reload()" class="btn btn-primary" style="margin-top: 15px;">
                    <i class="fas fa-redo"></i> Try Again
                </button>
            </div>
        `;
    }
    
    // Stop Camera
    function stopCamera() {
        if (currentStream) {
            currentStream.getTracks().forEach(track => track.stop());
            currentStream = null;
        }
        if (useDeviceMotion) {
            window.removeEventListener('deviceorientation', handleDeviceOrientation);
        }
    }
    
    // Close AR Modal
    arCloseBtn.addEventListener('click', () => {
        arModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        stopCamera();
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && arModal.classList.contains('active')) {
            arModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            stopCamera();
        }
    });
    
    // Size Slider - Smooth transition
    arSizeSlider.addEventListener('input', (e) => {
        const size = e.target.value;
        arFrameImage.style.width = `${size}px`;
    });
    
    // Depth Slider for 3D effect
    arDepthSlider.addEventListener('input', (e) => {
        frameDepth = parseInt(e.target.value);
        updateFrame3DTransform();
        
        // Update frame border width based on depth for 3D effect
        if (arFrameBorder) {
            const padding = 12 + (frameDepth / 2.5);
            arFrameBorder.style.padding = `${padding}px`;
        }
        
        // Update mat padding
        const frameMat = document.querySelector('.ar-frame-mat');
        if (frameMat) {
            const matPadding = 8 + (frameDepth / 4);
            frameMat.style.padding = `${matPadding}px`;
        }
    });
    
    // Mouse movement for 3D tilt effect (desktop) - Enhanced
    document.addEventListener('mousemove', (e) => {
        if (!arModal.classList.contains('active') || useDeviceMotion) return;
        
        const rect = arModal.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Smooth, realistic tilt with easing
        const targetTiltX = ((mouseX - centerX) / centerX) * 15;
        const targetTiltY = ((mouseY - centerY) / centerY) * 12;
        
        tiltX += (targetTiltX - tiltX) * 0.12;
        tiltY += (targetTiltY - tiltY) * 0.12;
        
        updateFrame3DTransform();
    });
    
    // Drag functionality for frame - Enhanced for mobile
    arFrameOverlay.addEventListener('mousedown', startDrag);
    arFrameOverlay.addEventListener('touchstart', startDrag, { passive: false });
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag, { passive: false });
    
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
    
    function startDrag(e) {
        if (e.target.closest('.ar-resize-handle')) return;
        
        isDragging = true;
        arFrameOverlay.style.cursor = 'grabbing';
        
        if (e.type === 'touchstart') {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        } else {
            startX = e.clientX;
            startY = e.clientY;
        }
        
        initialX = frameX;
        initialY = frameY;
        
        e.preventDefault();
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        let currentX, currentY;
        
        if (e.type === 'touchmove') {
            if (e.touches.length !== 1) return;
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
        } else {
            currentX = e.clientX;
            currentY = e.clientY;
        }
        
        const deltaX = currentX - startX;
        const deltaY = currentY - startY;
        
        frameX = initialX + deltaX;
        frameY = initialY + deltaY;
        
        arFrameOverlay.style.transform = `translate(calc(-50% + ${frameX}px), calc(-50% + ${frameY}px))`;
        
        e.preventDefault();
    }
    
    function endDrag() {
        isDragging = false;
        arFrameOverlay.style.cursor = 'move';
    }
    
    // Pinch to zoom for mobile
    let initialPinchDistance = 0;
    let initialFrameWidth = 200;
    
    arFrameOverlay.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            initialPinchDistance = getPinchDistance(e);
            initialFrameWidth = parseInt(arFrameImage.style.width) || 200;
        }
    }, { passive: true });
    
    arFrameOverlay.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            const currentDistance = getPinchDistance(e);
            const scale = currentDistance / initialPinchDistance;
            let newWidth = Math.round(initialFrameWidth * scale);
            newWidth = Math.max(80, Math.min(400, newWidth));
            arFrameImage.style.width = `${newWidth}px`;
            arSizeSlider.value = newWidth;
        }
    }, { passive: false });
    
    function getPinchDistance(e) {
        return Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );
    }
    
    // Capture Screenshot with 3D frame
    arCaptureBtn.addEventListener('click', () => {
        captureARScreenshot();
    });
    
    async function captureARScreenshot() {
        try {
            // Use html2canvas approach for better 3D capture
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = arVideo.videoWidth || 1280;
            canvas.height = arVideo.videoHeight || 720;
            
            // Draw video frame
            ctx.drawImage(arVideo, 0, 0, canvas.width, canvas.height);
            
            // Calculate frame position
            const containerRect = document.querySelector('.ar-container').getBoundingClientRect();
            const frameRect = arFrameOverlay.getBoundingClientRect();
            
            const scaleX = canvas.width / containerRect.width;
            const scaleY = canvas.height / containerRect.height;
            
            const frameWidth = parseInt(arFrameImage.style.width) || 200;
            const frameHeight = arFrameImage.offsetHeight || 150;
            const borderWidth = 15 + (frameDepth / 3);
            const matWidth = 8;
            
            const totalWidth = frameWidth + (borderWidth + matWidth) * 2;
            const totalHeight = frameHeight + (borderWidth + matWidth) * 2;
            
            const frameCanvasX = (frameRect.left - containerRect.left) * scaleX;
            const frameCanvasY = (frameRect.top - containerRect.top) * scaleY;
            const frameCanvasWidth = totalWidth * scaleX;
            const frameCanvasHeight = totalHeight * scaleY;
            
            // Draw shadow
            ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
            ctx.shadowBlur = 30 * scaleX;
            ctx.shadowOffsetX = 10 * scaleX;
            ctx.shadowOffsetY = 15 * scaleY;
            
            // Draw frame background based on style
            const frameColors = {
                gold: '#d4af37',
                black: '#2a2a2a',
                white: '#f5f5f5',
                wood: '#8B4513',
                silver: '#C0C0C0'
            };
            
            ctx.fillStyle = frameColors[currentFrameStyle] || '#d4af37';
            ctx.fillRect(frameCanvasX, frameCanvasY, frameCanvasWidth, frameCanvasHeight);
            
            // Reset shadow for inner elements
            ctx.shadowColor = 'transparent';
            
            // Draw mat
            const matX = frameCanvasX + borderWidth * scaleX;
            const matY = frameCanvasY + borderWidth * scaleY;
            const matW = frameCanvasWidth - borderWidth * 2 * scaleX;
            const matH = frameCanvasHeight - borderWidth * 2 * scaleY;
            
            ctx.fillStyle = '#f5f5f0';
            ctx.fillRect(matX, matY, matW, matH);
            
            // Draw artwork
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = arFrameImage.src;
            
            img.onload = () => {
                const artX = matX + matWidth * scaleX;
                const artY = matY + matWidth * scaleY;
                const artW = matW - matWidth * 2 * scaleX;
                const artH = matH - matWidth * 2 * scaleY;
                
                ctx.drawImage(img, artX, artY, artW, artH);
                
                // Add glass reflection effect
                const gradient = ctx.createLinearGradient(artX, artY, artX + artW, artY + artH);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
                gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.02)');
                gradient.addColorStop(0.6, 'transparent');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
                ctx.fillStyle = gradient;
                ctx.fillRect(artX, artY, artW, artH);
                
                // Add watermark
                ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                ctx.font = `bold ${16 * scaleX}px Poppins, sans-serif`;
                ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                ctx.shadowBlur = 4;
                ctx.fillText('✦ Islamic Art House', 15, canvas.height - 20);
                
                // Download
                const link = document.createElement('a');
                link.download = `AR-Preview-${currentProductName.replace(/\s+/g, '-')}.png`;
                link.href = canvas.toDataURL('image/png', 0.95);
                link.click();
                
                showNotification('📸 Screenshot saved successfully!');
            };
            
            img.onerror = () => {
                showNotification('Could not capture. Please try again.');
            };
            
        } catch (error) {
            console.error('Screenshot error:', error);
            showNotification('Could not capture screenshot. Please try again.');
        }
    }
    
    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #0f4c3a, #1a7a5e);
            color: white;
            padding: 15px 30px;
            border-radius: 30px;
            font-size: 1rem;
            z-index: 10000;
            box-shadow: 0 5px 30px rgba(0, 0, 0, 0.4);
            animation: slideDown 0.3s ease;
            border: 1px solid rgba(212, 175, 55, 0.3);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2500);
    }
}

/* ============================================
   Console Welcome Message
   ============================================ */
console.log('%c☪ Islamic Art House', 'color: #1a5f4a; font-size: 24px; font-weight: bold;');
console.log('%cBringing Islamic Elegance to Your Home', 'color: #c9a227; font-size: 14px;');
console.log('%cContact: +91 7041337960 | vohramuhammad89@gmail.com', 'color: #666; font-size: 12px;');
