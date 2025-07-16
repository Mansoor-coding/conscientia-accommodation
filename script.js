document.addEventListener('DOMContentLoaded', () => {
    // Core elements
    const cards = document.querySelectorAll('.card');
    const cardSection = document.querySelector('.card-section');
    const indicators = document.querySelectorAll('.indicator');
    
    // Debug logging
    console.log('Cards found:', cards.length);
    console.log('Card section found:', !!cardSection);
    console.log('Indicators found:', indicators.length);
    
    // State variables
    let currentIndex = 0;
    const totalCards = cards.length;
    let isDragging = false;
    let startPos = 0;
    let currentPos = 0;
    let sensitivity = 50; // Reduced for better responsiveness
    let wheelThreshold = 50; // Reduced for better wheel scrolling
    let lastWheelTime = 0;
    let isAnimating = false; // Prevent rapid navigation
    
    // Device detection utility
    const deviceInfo = {
        isMobile: () => window.innerWidth <= 768,
        isSmallMobile: () => window.innerWidth <= 480,
        isTablet: () => window.innerWidth > 768 && window.innerWidth <= 1024,
        isDesktop: () => window.innerWidth > 1024,
        getDeviceType: () => {
            if (deviceInfo.isSmallMobile()) return 'small-mobile';
            if (deviceInfo.isMobile()) return 'mobile';
            if (deviceInfo.isTablet()) return 'tablet';
            return 'desktop';
        }
    };

    /**
     * CORE FUNCTION: Updates card positions based on current index
     * This is where the circular magic happens!
     */
    function updateCardDisplay() {
        if (isAnimating) return; // Prevent rapid updates
        
        cards.forEach((card, index) => {
            // Remove all position classes
            card.classList.remove('active', 'left', 'right', 'hidden');
            
            // Calculate relative position from current card
            // This formula ensures circular behavior!
            const position = (index - currentIndex + totalCards) % totalCards;

            // Apply position classes based on relative position
            if (position === 0) {
                card.classList.add('active');        // Center card
            } else if (position === 1) {
                card.classList.add('right');         // Right card  
            } else if (position === totalCards - 1) {
                card.classList.add('left');          // Left card
            } else {
                card.classList.add('hidden');        // Hidden cards
            }
        });
        
        updateScrollIndicators();
    }

    /**
     * Updates scroll indicators to reflect current position
     */
    function updateScrollIndicators() {
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    /**
     * Navigate to specific card with animation lock
     */
    function navigateToCard(index) {
        if (index >= 0 && index < totalCards && index !== currentIndex && !isAnimating) {
            isAnimating = true;
            currentIndex = index;
            updateCardDisplay();
            
            // Release animation lock after transition
            setTimeout(() => {
                isAnimating = false;
            }, 600); // Match CSS transition duration
        }
    }

    /**
     * Navigate to previous card (CIRCULAR)
     */
    function navigatePrevious() {
        if (isAnimating) return;
        const newIndex = (currentIndex - 1 + totalCards) % totalCards;
        navigateToCard(newIndex);
    }

    /**
     * Navigate to next card (CIRCULAR)  
     */
    function navigateNext() {
        if (isAnimating) return;
        const newIndex = (currentIndex + 1) % totalCards;
        navigateToCard(newIndex);
    }

    /**
     * Handle swipe gestures (mouse drag and touch) with improved logic
     */
    function handleSwipe(distance) {
        if (Math.abs(distance) > sensitivity) {
            if (distance > 0) {
                // Swipe right - go to previous card
                navigatePrevious();
            } else {
                // Swipe left - go to next card
                navigateNext();
            }
        }
    }

    /**
     * Toggle background blur effect
     */
    function toggleBackgroundBlur(blur) {
        if (blur) {
            document.body.classList.add('blurred');
        } else {
            document.body.classList.remove('blurred');
        }
    }

    /**
     * Handle card expansion
     */
    function expandCard(card) {
        // Only expand active cards
        if (!card.classList.contains('active')) return;
        
        const externalContent = card.querySelector('.card-external-content');
        const initialContent = card.querySelector('.card-initial-content');
        const backButton = card.querySelector('.back-button');
        
        if (externalContent) externalContent.classList.remove('hidden');
        if (initialContent) initialContent.classList.add('hidden');
        if (backButton) backButton.style.display = 'block';
        
        card.classList.add('expanded');
        toggleBackgroundBlur(true);
    }

    /**
     * Handle card closing
     */
    function closeCard(card) {
        // Add closing animation class
        card.classList.add('ultra-smooth-closing');
        
        // Hide expanded content after animation starts
        setTimeout(() => {
            const externalContent = card.querySelector('.card-external-content');
            const initialContent = card.querySelector('.card-initial-content');
            const backButton = card.querySelector('.back-button');
            
            if (externalContent) externalContent.classList.add('hidden');
            if (initialContent) initialContent.classList.remove('hidden');
            if (backButton) backButton.style.display = 'none';
            
            // Remove expanded and closing classes
            card.classList.remove('expanded', 'ultra-smooth-closing');
            
            // Update button position and background blur
            toggleBackgroundBlur(false);
        }, 1100); // Match animation duration
    }

    /**
     * Update sensitivity based on device type
     */
    function updateSensitivity() {
        const deviceType = deviceInfo.getDeviceType();
        sensitivity = deviceType === 'mobile' ? 40 : 
                     deviceType === 'small-mobile' ? 30 : 50;
        wheelThreshold = deviceType === 'mobile' ? 30 : 50;
    }

    // Throttle function for performance
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // ===== IMPROVED EVENT LISTENERS =====

    // Mouse drag navigation with better handling
    cardSection.addEventListener('mousedown', (e) => {
        if (e.target.closest('.card.expanded')) return; // Don't drag when card is expanded
        e.preventDefault();
        isDragging = true;
        startPos = e.clientX;
        currentPos = e.clientX;
        cardSection.style.cursor = 'grabbing';
        cardSection.classList.add('dragging');
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        currentPos = e.clientX;
    });

    document.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        cardSection.style.cursor = 'grab';
        cardSection.classList.remove('dragging');
        
        const distance = currentPos - startPos;
        handleSwipe(distance);
    });

    // Touch navigation for mobile with improved handling
    cardSection.addEventListener('touchstart', (e) => {
        if (e.target.closest('.card.expanded')) return; // Don't drag when card is expanded
        e.preventDefault();
        isDragging = true;
        startPos = e.touches[0].clientX;
        currentPos = e.touches[0].clientX;
        cardSection.classList.add('dragging');
    });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        currentPos = e.touches[0].clientX;
    });

    document.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        cardSection.classList.remove('dragging');
        
        const distance = currentPos - startPos;
        handleSwipe(distance);
    });

    // ===== KEYBOARD NAVIGATION (MERGED) =====
    document.addEventListener('keydown', (e) => {
        const expandedCard = document.querySelector('.card.expanded');
        if (expandedCard) {
            // Card content scrolling and closing
            const externalContent = expandedCard.querySelector('.card-external-content');
            if (externalContent) {
                const scrollAmount = 100;
                switch (e.key) {
                    case 'ArrowUp':
                        e.preventDefault();
                        externalContent.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        externalContent.scrollBy({ top: scrollAmount, behavior: 'smooth' });
                        break;
                    case 'PageUp':
                        e.preventDefault();
                        externalContent.scrollBy({ top: -externalContent.clientHeight, behavior: 'smooth' });
                        break;
                    case 'PageDown':
                        e.preventDefault();
                        externalContent.scrollBy({ top: externalContent.clientHeight, behavior: 'smooth' });
                        break;
                    case 'Home':
                        e.preventDefault();
                        externalContent.scrollTo({ top: 0, behavior: 'smooth' });
                        break;
                    case 'End':
                        e.preventDefault();
                        externalContent.scrollTo({ top: externalContent.scrollHeight, behavior: 'smooth' });
                        break;
                    case 'Escape':
                        e.preventDefault();
                        closeCard(expandedCard);
                        break;
                }
            }
        } else if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
            // Card navigation and closing
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    navigatePrevious();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    navigateNext();
                    break;
                case 'Home':
                    e.preventDefault();
                    navigateToCard(0);
                    break;
                case 'End':
                    e.preventDefault();
                    navigateToCard(totalCards - 1);
                    break;
                case 'Escape':
                    e.preventDefault();
                    const expandedCard = document.querySelector('.card.expanded');
                    if (expandedCard) closeCard(expandedCard);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    scrollPageUp();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    scrollPageDown();
                    break;
                case 'PageUp':
                    e.preventDefault();
                    scrollPageUp();
                    break;
                case 'PageDown':
                    e.preventDefault();
                    scrollPageDown();
                    break;
            }
        }
    });

    // Mouse wheel navigation with improved throttling
    cardSection.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        const now = Date.now();
        if (now - lastWheelTime < wheelThreshold) return;
        lastWheelTime = now;
        
        if (e.deltaY > 0) {
            navigateNext();
        } else {
            navigatePrevious();
        }
    }, { passive: false });

    // Indicator click navigation with improved feedback
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!isAnimating) {
                navigateToCard(index);
            }
        });
    });

    // Card click to expand with improved logic
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't expand if clicking on back button
            if (e.target.classList.contains('back-button')) return;
            
            // Only expand if card is active and not already expanded
            if (card.classList.contains('active') && !card.classList.contains('expanded')) {
                expandCard(card);
            }
        });
    });

    // Back button functionality
    cards.forEach(card => {
        const backButton = card.querySelector('.back-button');
        if (backButton) {
            backButton.addEventListener('click', (e) => {
                e.stopPropagation();
                closeCard(card);
            });
        }
    });

    // Close expanded card when clicking outside
    document.addEventListener('click', (e) => {
        const expandedCard = document.querySelector('.card.expanded');
        if (expandedCard && !expandedCard.contains(e.target)) {
            closeCard(expandedCard);
        }
    });

    // Resize handler with throttling
    window.addEventListener('resize', throttle(() => {
        updateSensitivity();
    }, 100));

    // ===== INITIALIZATION =====

    // Initialize the display
    updateCardDisplay();
    updateSensitivity();

    // ===== SCROLL NAVIGATION =====
    
    // Page scroll functionality
    function smoothScrollTo(targetY, duration = 800) {
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startY, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }
    
    function scrollPageUp() {
        const currentScroll = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const targetScroll = Math.max(0, currentScroll - windowHeight);
        smoothScrollTo(targetScroll);
    }
    
    function scrollPageDown() {
        const currentScroll = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const targetScroll = Math.min(documentHeight - windowHeight, currentScroll + windowHeight);
        smoothScrollTo(targetScroll);
    }

    // ===== PUBLIC API (for external use) =====

    // Expose navigation methods globally
    window.cardScroll = {
        navigateToCard,
        navigateNext,
        navigatePrevious,
        getCurrentIndex: () => currentIndex,
        getTotalCards: () => totalCards,
        scrollPageUp,
        scrollPageDown
    };

    console.log('Circular Card Scroll initialized successfully!');
    console.log('Navigation methods available: cardScroll.navigateToCard(index), cardScroll.navigateNext(), cardScroll.navigatePrevious()');
    console.log('Scroll methods available: cardScroll.scrollPageUp(), cardScroll.scrollPageDown()');
    console.log('Keyboard navigation: Arrow keys, Page Up/Down, Home, End for scrolling');
});

// Page Loading and Enhancement Effects
document.addEventListener('DOMContentLoaded', function() {
    // Loading bar animation
    const loadingBar = document.createElement('div');
    loadingBar.className = 'loading-bar';
    document.body.appendChild(loadingBar);
    
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingBar.style.opacity = '0';
                setTimeout(() => loadingBar.remove(), 300);
            }, 200);
        }
        loadingBar.style.width = progress + '%';
    }, 100);
    
    // Add parallax background
    const parallaxBg = document.createElement('div');
    parallaxBg.className = 'parallax-bg';
    document.body.appendChild(parallaxBg);
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.pixel-card, .festival-description, .accommodation-gallery, .faq-section');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.pixel-card');
    cards.forEach(card => {
        card.classList.add('hover-lift');
    });
    
    // Add pulse animation to CTA buttons
    const ctaButtons = document.querySelectorAll('.book-accommodation-btn, .sticky-book-btn');
    ctaButtons.forEach(btn => {
        btn.classList.add('cta-pulse');
    });
    
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add floating animation to selected elements
    const floatingElements = document.querySelectorAll('.countdown-section');
    floatingElements.forEach(el => {
        el.classList.add('float-animation');
    });
});