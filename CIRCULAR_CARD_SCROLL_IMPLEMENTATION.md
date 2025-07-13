# Circular Card Scroll Implementation

A complete guide to implementing a smooth, infinite circular card scrolling system with multiple input methods.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [File Structure](#file-structure)
4. [HTML Structure](#html-structure)
5. [CSS Implementation](#css-implementation)
6. [JavaScript Core Logic](#javascript-core-logic)
7. [Navigation Methods](#navigation-methods)
8. [Advanced Features](#advanced-features)
9. [Mobile Responsiveness](#mobile-responsiveness)
10. [Usage Examples](#usage-examples)
11. [Customization Guide](#customization-guide)

## 🎯 Overview

This implementation creates a smooth, infinite circular card scrolling system where users can navigate through cards using multiple input methods:
- Mouse drag/swipe
- Touch gestures
- Keyboard arrows
- Mouse wheel
- Indicator dots
- Programmatic navigation

The system shows 3 cards at a time: one active (center) card and two side cards (left/right), with smooth transitions between states.

## ✨ Features

- **Infinite Circular Scrolling**: Never-ending navigation in both directions
- **Multiple Input Methods**: Mouse, touch, keyboard, wheel, indicators
- **Smooth Animations**: CSS transitions with cubic-bezier easing
- **Responsive Design**: Adapts to different screen sizes
- **Performance Optimized**: Throttled events and efficient DOM updates
- **Accessibility**: Keyboard navigation and ARIA support
- **Mobile-First**: Touch-friendly with proper gesture handling

## 📁 File Structure

```
project/
├── index.html          # Main HTML structure
├── style.css           # Styling and animations
├── script.js           # Core JavaScript logic
└── README.md           # This documentation
```

## 🏗️ HTML Structure

### Basic Setup

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Circular Card Scroll</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <section class="card-section">
            <!-- Scroll indicators -->
            <div class="scroll-indicators">
                <div class="indicator active" data-index="0"></div>
                <div class="indicator" data-index="1"></div>
                <div class="indicator" data-index="2"></div>
                <div class="indicator" data-index="3"></div>
            </div>

            <!-- Cards -->
            <div class="card" id="card-1">
                <div class="card-initial-content">
                    <div class="card-content-title">Card 1</div>
                    <div class="card-content-subtitle">Subtitle</div>
                </div>
                <div class="card-external-content hidden">
                    <!-- Expanded content goes here -->
                </div>
                <button class="back-button"></button>
            </div>

            <div class="card" id="card-2">
                <div class="card-initial-content">
                    <div class="card-content-title">Card 2</div>
                </div>
                <div class="card-external-content hidden"></div>
                <button class="back-button"></button>
            </div>

            <div class="card" id="card-3">
                <div class="card-initial-content">
                    <div class="card-content-title">Card 3</div>
                </div>
                <div class="card-external-content hidden"></div>
                <button class="back-button"></button>
            </div>

            <div class="card" id="card-4">
                <div class="card-initial-content">
                    <div class="card-content-title">Card 4</div>
                </div>
                <div class="card-external-content hidden"></div>
                <button class="back-button"></button>
            </div>
        </section>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### Key HTML Elements

- **`.card-section`**: Container for all cards and indicators
- **`.scroll-indicators`**: Dot navigation at bottom
- **`.card`**: Individual card elements with unique IDs
- **`.card-initial-content`**: Default card content (visible when not expanded)
- **`.card-external-content`**: Expanded card content (hidden by default)
- **`.back-button`**: Button to close expanded cards

## 🎨 CSS Implementation

### Core Card Positioning System

```css
/* Card section container */
.card-section {
    position: relative;
    height: 420px;
    margin: 5rem 0;
    cursor: grab;
}

.card-section:active {
    cursor: grabbing;
}

/* Base card styles */
.card {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 320px;
    height: 420px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 15px;
    transform: translate(-50%, -50%);
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    cursor: pointer;
    z-index: 3;
    overflow: hidden;
    box-shadow: 
        0 0 10px rgba(0, 255, 255, 0.3),
        0 0 20px rgba(0, 255, 255, 0.2),
        0 0 30px rgba(0, 255, 255, 0.1);
}
```

### Position Classes (The Magic!)

```css
/* LEFT CARD - Positioned to the left */
.card.left {
    transform: translate(-180%, -50%) scale(0.8);
    opacity: 0.8;
    z-index: 1;
    box-shadow: 
        0 0 15px rgba(0, 255, 255, 0.5),
        0 0 25px rgba(0, 255, 255, 0.3);
}

/* RIGHT CARD - Positioned to the right */
.card.right {
    transform: translate(80%, -50%) scale(0.8);
    opacity: 0.8;
    z-index: 1;
    box-shadow: 
        0 0 15px rgba(0, 255, 255, 0.5),
        0 0 25px rgba(0, 255, 255, 0.3);
}

/* ACTIVE CARD - Center, larger, focused */
.card.active {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 1;
    z-index: 2;
    border-color: rgba(0, 255, 255, 0.6);
    box-shadow:
        0 0 15px rgba(0, 255, 255, 0.4),
        0 0 30px rgba(0, 255, 255, 0.3),
        0 0 45px rgba(0, 255, 255, 0.2),
        0 0 60px rgba(0, 255, 255, 0.1);
    cursor: pointer;
}

/* HIDDEN CARDS - Not visible */
.card.hidden {
    opacity: 0;
    pointer-events: none;
    z-index: 0;
}
```

### Scroll Indicators

```css
.scroll-indicators {
    position: absolute;
    bottom: -60px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 12px;
    z-index: 10;
}

.indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(0, 255, 255, 0.2);
    border: 2px solid rgba(0, 255, 255, 0.3);
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.indicator:hover {
    background: rgba(0, 255, 255, 0.4);
    border-color: rgba(0, 255, 255, 0.6);
    transform: scale(1.2);
}

.indicator.active {
    background: rgba(0, 255, 255, 0.6);
    border-color: rgba(0, 255, 255, 0.8);
    box-shadow: 
        0 0 15px rgba(0, 255, 255, 0.5),
        inset 0 0 10px rgba(0, 255, 255, 0.3);
}
```

## 🧠 JavaScript Core Logic

### Main Structure

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const cardSection = document.querySelector('.card-section');
    
    let currentIndex = 0;
    const totalCards = cards.length;

    // Core Functions
    function updateScrollIndicators() { /* ... */ }
    function navigateToCard(index) { /* ... */ }
    function navigatePrevious() { /* ... */ }
    function navigateNext() { /* ... */ }
    function updateCardDisplay() { /* ... */ }
    
    // Initialize
    updateCardDisplay();
});
```

### The Heart: updateCardDisplay()

```javascript
/**
 * CORE FUNCTION: Updates card positions based on current index
 * This is where the circular magic happens!
 */
function updateCardDisplay() {
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
```

### Circular Navigation Logic

```javascript
// Navigate to previous card (CIRCULAR)
function navigatePrevious() {
    // The magic formula for circular previous navigation
    const newIndex = (currentIndex - 1 + totalCards) % totalCards;
    navigateToCard(newIndex);
}

// Navigate to next card (CIRCULAR)  
function navigateNext() {
    // The magic formula for circular next navigation
    const newIndex = (currentIndex + 1) % totalCards;
    navigateToCard(newIndex);
}

// Navigate to specific card
function navigateToCard(index) {
    if (index >= 0 && index < totalCards && index !== currentIndex) {
        currentIndex = index;
        updateCardDisplay();
        updateScrollIndicators();
    }
}
```

### Scroll Indicators Management

```javascript
function updateScrollIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Add click listeners to indicators
const indicators = document.querySelectorAll('.indicator');
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateToCard(index);
    });
});
```

## 🎮 Navigation Methods

### 1. Mouse Drag Navigation

```javascript
let isDragging = false;
let startPos = 0;
const sensitivity = 100; // Minimum drag distance

// Mouse events
cardSection.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;
    startPos = e.clientX;
    cardSection.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
});

document.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    cardSection.style.cursor = 'grab';
    
    const distance = e.clientX - startPos;
    handleSwipe(distance);
});

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
```

### 2. Touch Navigation

```javascript
// Touch events for mobile
cardSection.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isDragging = true;
    startPos = e.touches[0].clientX;
});

document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
});

document.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    
    const distance = e.changedTouches[0].clientX - startPos;
    handleSwipe(distance);
});
```

### 3. Keyboard Navigation

```javascript
document.addEventListener('keydown', (e) => {
    // Only handle navigation if no expanded card and not typing in an input
    if (!document.querySelector('.card.expanded') && 
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        
        switch(e.key) {
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
        }
    }
});
```

### 4. Mouse Wheel Navigation

```javascript
let wheelTimeout;
let accumulatedDelta = 0;
const wheelThreshold = 80;
let lastWheelTime = 0;

cardSection.addEventListener('wheel', (e) => {
    // Only handle wheel navigation if no expanded card exists
    if (document.querySelector('.card.expanded')) {
        return; // Allow normal scrolling when card is expanded
    }
    
    // Throttle wheel events for better performance
    const currentTime = Date.now();
    if (currentTime - lastWheelTime < 50) {
        return; // Throttle to max 20 events per second
    }
    lastWheelTime = currentTime;
    
    // Check if we're at the top or bottom of the page
    const atTop = window.pageYOffset <= 0;
    const atBottom = window.pageYOffset >= 
        document.documentElement.scrollHeight - window.innerHeight;
    
    // Allow normal scrolling if we can still scroll in that direction
    if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) {
        return; // Allow normal page scrolling
    }
    
    // Only prevent default and handle card navigation at page boundaries
    e.preventDefault();
    
    // Accumulate scroll delta
    accumulatedDelta += Math.abs(e.deltaY);
    
    // Optimized debounce for smoother navigation
    clearTimeout(wheelTimeout);
    wheelTimeout = setTimeout(() => {
        // Only navigate if accumulated scroll exceeds threshold
        if (accumulatedDelta >= wheelThreshold) {
            if (e.deltaY > 0) {
                navigateNext();
            } else {
                navigatePrevious();
            }
        }
        // Reset accumulated delta
        accumulatedDelta = 0;
    }, 300);
}, { passive: false });
```

## 🚀 Advanced Features

### Card Expansion System

```javascript
// Add click listeners to cards for expansion
cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        if (card.classList.contains('active')) {
            // Toggle expanded state
            const isExpanded = card.classList.contains('expanded');
            
            // First, collapse any expanded cards
            cards.forEach(c => {
                c.classList.remove('expanded', 'closing', 'ultra-smooth-closing');
                c.querySelector('.card-external-content')?.classList.add('hidden');
                c.querySelector('.card-initial-content')?.classList.remove('hidden');
                c.querySelector('.back-button').style.display = 'none';
            });
            
            if (!isExpanded) {
                // Expand this card
                expandCard(card);
            }
            
            // Update button position
            handleButtonPosition();
            toggleBackgroundBlur(!isExpanded);
        } else {
            // Navigate to clicked card first
            navigateToCard(index);
        }
    });
});

function expandCard(card) {
    // Load external content if needed
    loadCardContent(card);
    
    // Show expanded content
    const externalContent = card.querySelector('.card-external-content');
    const initialContent = card.querySelector('.card-initial-content');
    const backButton = card.querySelector('.back-button');
    
    if (externalContent) externalContent.classList.remove('hidden');
    if (initialContent) initialContent.classList.add('hidden');
    if (backButton) backButton.style.display = 'flex';
    
    // Add expanded class
    card.classList.add('expanded');
    
    // Scroll card to center
    scrollCardToCenter(card);
}
```

### Dynamic Content Loading

```javascript
// Map card IDs to external content files
const cardContentMap = {
    'card-guidelines': 'content/guidelines.html',
    'card-prices': 'content/prices.html', 
    'card-howtoreach': 'content/howtoreach.html',
    'card-location': null // No external file needed, content is in HTML
};

function loadCardContent(card) {
    const cardId = card.id;
    const contentFile = cardContentMap[cardId];
    const externalContent = card.querySelector('.card-external-content');
    
    if (contentFile && externalContent && !externalContent.dataset.loaded) {
        // Create iframe for external content
        const iframe = document.createElement('iframe');
        iframe.src = contentFile;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '25px';
        
        externalContent.innerHTML = '';
        externalContent.appendChild(iframe);
        externalContent.dataset.loaded = 'true';
    }
}
```

### Back Button Functionality

```javascript
// Add back button functionality
cards.forEach(card => {
    const backButton = card.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', (e) => {
            e.stopPropagation();
            closeCard(card);
        });
    }
});

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
        handleButtonPosition();
        toggleBackgroundBlur(false);
    }, 1100); // Match animation duration
}
```

## 📱 Mobile Responsiveness

### Responsive CSS

```css
/* Mobile responsive styles */
@media (max-width: 768px) {
    .card-section {
        height: 350px;
        margin: 3rem 0;
    }
    
    .card {
        width: 280px;
        height: 350px;
    }
    
    .card.active.expanded {
        width: 95vw !important;
        height: 85vh !important;
    }
    
    .scroll-indicators {
        bottom: -50px;
        gap: 10px;
    }
    
    .indicator {
        width: 10px;
        height: 10px;
    }
}

@media (max-width: 480px) {
    .card {
        width: 260px;
        height: 320px;
    }
    
    .card.active.expanded {
        width: 98vw !important;
        height: 90vh !important;
    }
    
    .scroll-indicators {
        bottom: -45px;
        gap: 8px;
    }
    
    .indicator {
        width: 8px;
        height: 8px;
    }
}
```

### Touch-Friendly Interactions

```javascript
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

// Adjust sensitivity based on device type
function updateSensitivity() {
    const deviceType = deviceInfo.getDeviceType();
    sensitivity = deviceType === 'mobile' ? 80 : 
                 deviceType === 'small-mobile' ? 60 : 100;
}

// Update sensitivity on resize
window.addEventListener('resize', updateSensitivity);
```

## 💡 Usage Examples

### Basic Implementation

```javascript
// Initialize with default settings
const cardScroll = new CircularCardScroll({
    container: '.card-section',
    cards: '.card',
    indicators: '.indicator'
});
```

### Advanced Configuration

```javascript
// Initialize with custom settings
const cardScroll = new CircularCardScroll({
    container: '.card-section',
    cards: '.card',
    indicators: '.indicator',
    sensitivity: 120,
    wheelThreshold: 100,
    enableKeyboard: true,
    enableWheel: true,
    enableTouch: true,
    enableDrag: true,
    autoPlay: false,
    autoPlayInterval: 5000,
    onNavigate: (index) => {
        console.log('Navigated to card:', index);
    }
});
```

### Programmatic Navigation

```javascript
// Navigate to specific card
cardScroll.navigateToCard(2);

// Navigate next/previous
cardScroll.navigateNext();
cardScroll.navigatePrevious();

// Get current index
const currentIndex = cardScroll.getCurrentIndex();

// Update cards dynamically
cardScroll.updateCards();
```

## 🎛️ Customization Guide

### Modifying Card Positions

```css
/* Adjust card spacing */
.card.left {
    transform: translate(-200%, -50%) scale(0.7); /* Further left, smaller */
}

.card.right {
    transform: translate(100%, -50%) scale(0.7); /* Further right, smaller */
}

/* Change active card scaling */
.card.active {
    transform: translate(-50%, -50%) scale(1.2); /* Larger scale */
}
```

### Custom Transitions

```css
/* Faster transitions */
.card {
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Bouncy transitions */
.card {
    transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Custom easing */
.card {
    transition: all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
}
```

### Adding More Visible Cards

```javascript
// Show 5 cards instead of 3
function updateCardDisplay() {
    cards.forEach((card, index) => {
        card.classList.remove('active', 'left', 'right', 'left-far', 'right-far', 'hidden');
        
        const position = (index - currentIndex + totalCards) % totalCards;

        if (position === 0) {
            card.classList.add('active');
        } else if (position === 1) {
            card.classList.add('right');
        } else if (position === 2) {
            card.classList.add('right-far');
        } else if (position === totalCards - 1) {
            card.classList.add('left');
        } else if (position === totalCards - 2) {
            card.classList.add('left-far');
        } else {
            card.classList.add('hidden');
        }
    });
}
```

```css
/* Additional CSS for 5-card layout */
.card.left-far {
    transform: translate(-280%, -50%) scale(0.6);
    opacity: 0.6;
    z-index: 0;
}

.card.right-far {
    transform: translate(180%, -50%) scale(0.6);
    opacity: 0.6;
    z-index: 0;
}
```

## 🔧 Performance Optimization

### Throttling and Debouncing

```javascript
// Throttle function
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

// Debounce function
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Use throttled resize handler
window.addEventListener('resize', throttle(() => {
    updateSensitivity();
    handleButtonPosition();
}, 100));
```

### CSS Performance Optimizations

```css
/* Use transform and opacity for animations (GPU accelerated) */
.card {
    will-change: transform, opacity;
    transform: translate3d(-50%, -50%, 0); /* Force GPU acceleration */
}

/* Optimize transitions */
.card {
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Use contain for better performance */
.card-section {
    contain: layout style paint;
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Cards not positioning correctly**
   - Check that all cards have the `.card` class
   - Verify CSS positioning classes are defined
   - Ensure JavaScript is calculating positions correctly

2. **Smooth scrolling not working**
   - Check CSS transition properties
   - Verify cubic-bezier values
   - Ensure `will-change` property is set

3. **Touch events not working on mobile**
   - Add `touch-action: none` to card container
   - Ensure `preventDefault()` is called on touch events
   - Check viewport meta tag

4. **Performance issues**
   - Implement throttling for event handlers
   - Use `transform` instead of changing `left/top`
   - Add `will-change` property for animated elements

### Debug Mode

```javascript
// Enable debug logging
const DEBUG = true;

function debugLog(message, data) {
    if (DEBUG) {
        console.log(`[CardScroll] ${message}`, data);
    }
}

// Use throughout the code
function updateCardDisplay() {
    debugLog('Updating card display', { currentIndex, totalCards });
    // ... rest of function
}
```

---

## 📄 License

This implementation is provided as-is for educational and commercial use. Feel free to modify and distribute.

## 🤝 Contributing

Feel free to submit issues, feature requests, and improvements to make this implementation even better!

---

**Happy Scrolling! 🎠**
