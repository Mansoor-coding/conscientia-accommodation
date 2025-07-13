# 3. Book Accommodation Button

## HTML Structure

```html
<div class="book-accommodation-section">
    <a href="booking.html">
        <button class="book-accommodation-btn">Book Accommodation</button>
    </a>
</div>
```

## CSS Styling

```css
/* Book Accommodation Section */
.book-accommodation-section {
  text-align: center;
  margin: 5.236rem 0 3.236rem 0; /* Golden ratio spacing: top=φ³, bottom=φ² */
  padding: 2.618rem 1.618rem; /* Golden ratio padding */
  position: relative;
}

/* Add subtle separator line */
.book-accommodation-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(0, 255, 255, 0.3) 50%, 
    transparent 100%);
}

/* Enhanced Button Styling */
.book-accommodation-btn {
  /* Base styling */
  background: linear-gradient(135deg, 
    rgba(0, 255, 255, 0.15) 0%, 
    rgba(0, 165, 233, 0.25) 50%,
    rgba(16, 185, 129, 0.15) 100%);
  border: 2px solid rgba(0, 255, 255, 0.4);
  color: rgba(255, 255, 255, 0.95);
  padding: 1.272rem 3.236rem; /* Golden ratio proportions */
  font-size: 1.125rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;
  transform: scale(1);
  text-decoration: none;
  display: inline-block;
  
  /* Remove default button styles */
  border: none;
  outline: none;
  
  /* Add custom border */
  box-shadow: 
    0 0 0 2px rgba(0, 255, 255, 0.4),
    0 4px 20px rgba(0, 0, 0, 0.2);
}

/* Remove link styling */
.book-accommodation-section a {
  text-decoration: none;
  display: inline-block;
}

/* Shimmer Effect */
.book-accommodation-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(255, 255, 255, 0.1) 50%, 
    transparent 100%);
  transition: left 0.5s ease;
  z-index: 1;
}

/* Button text */
.book-accommodation-btn span {
  position: relative;
  z-index: 2;
}

/* Hover Effects */
.book-accommodation-btn:hover {
  background: linear-gradient(135deg, 
    rgba(0, 255, 255, 0.25) 0%, 
    rgba(0, 165, 233, 0.35) 50%,
    rgba(16, 185, 129, 0.25) 100%);
  color: rgba(255, 255, 255, 1);
  text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  box-shadow: 
    0 0 0 2px rgba(0, 255, 255, 0.7),
    0 0 30px rgba(0, 255, 255, 0.2),
    0 8px 32px rgba(0, 0, 0, 0.3);
  transform: translateY(-3px) scale(1.05);
}

.book-accommodation-btn:hover::before {
  left: 100%;
}

/* Active/Click Effect */
.book-accommodation-btn:active {
  transform: translateY(-1px) scale(1.02);
  transition: all 0.1s ease;
}

/* Focus state for accessibility */
.book-accommodation-btn:focus {
  outline: 2px solid rgba(0, 255, 255, 0.6);
  outline-offset: 4px;
}

/* Loading state (optional) */
.book-accommodation-btn.loading {
  pointer-events: none;
  opacity: 0.7;
}

.book-accommodation-btn.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid rgba(0, 255, 255, 0.8);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  z-index: 3;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .book-accommodation-section {
    margin: 3rem 0 2rem 0;
    padding: 2rem 1rem;
  }
  
  .book-accommodation-btn {
    padding: 1rem 2.5rem;
    font-size: 1rem;
    letter-spacing: 0.1em;
  }
  
  .book-accommodation-section::before {
    width: 150px;
  }
}

@media (max-width: 480px) {
  .book-accommodation-btn {
    padding: 0.8rem 2rem;
    font-size: 0.9rem;
    width: 100%;
    max-width: 280px;
  }
  
  .book-accommodation-section::before {
    width: 100px;
  }
}

/* Alternative button variants */
.book-accommodation-btn.variant-solid {
  background: linear-gradient(135deg, 
    rgba(0, 255, 255, 0.8) 0%, 
    rgba(0, 165, 233, 0.9) 100%);
  color: rgba(0, 0, 0, 0.9);
  text-shadow: none;
}

.book-accommodation-btn.variant-outline {
  background: transparent;
  border: 2px solid rgba(0, 255, 255, 0.6);
  color: rgba(0, 255, 255, 0.9);
}

.book-accommodation-btn.variant-minimal {
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.3);
  color: rgba(0, 255, 255, 0.8);
  padding: 1rem 2rem;
  font-size: 1rem;
}
```

## Required Fonts

Add this to your HTML `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

## JavaScript (Optional - Enhanced Interactions)

```javascript
// Enhanced button interactions
document.addEventListener('DOMContentLoaded', () => {
  const bookBtn = document.querySelector('.book-accommodation-btn');
  
  if (bookBtn) {
    // Add ripple effect on click
    bookBtn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1;
      `;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
    
    // Loading state simulation
    bookBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Add loading state
      this.classList.add('loading');
      this.textContent = 'Loading...';
      
      // Simulate loading time
      setTimeout(() => {
        this.classList.remove('loading');
        this.textContent = 'Book Accommodation';
        
        // Navigate to booking page
        window.location.href = this.parentElement.href;
      }, 1500);
    });
  }
});

// Add CSS animation for ripple effect
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
```

## Alternative HTML Structures

### With Icon

```html
<div class="book-accommodation-section">
    <a href="booking.html">
        <button class="book-accommodation-btn">
            <span class="btn-icon">🏨</span>
            <span class="btn-text">Book Accommodation</span>
        </button>
    </a>
</div>
```

### Multiple Buttons

```html
<div class="book-accommodation-section">
    <div class="button-group">
        <a href="booking.html">
            <button class="book-accommodation-btn">Book Now</button>
        </a>
        <a href="#pricing">
            <button class="book-accommodation-btn variant-outline">View Pricing</button>
        </a>
    </div>
</div>
```

### With Description

```html
<div class="book-accommodation-section">
    <h3>Ready to Secure Your Stay?</h3>
    <p>Book your accommodation now and guarantee your spot at the festival.</p>
    <a href="booking.html">
        <button class="book-accommodation-btn">Book Accommodation</button>
    </a>
</div>
```

## Features

- **Golden Ratio Spacing**: Mathematically pleasing proportions
- **Shimmer Animation**: Eye-catching hover effect
- **Multiple States**: Hover, active, focus, and loading states
- **Accessibility**: Proper focus indicators and keyboard navigation
- **Responsive Design**: Adapts to all screen sizes
- **Customizable**: Multiple style variants available
- **Performance**: GPU-accelerated animations
- **Interactive**: Optional ripple effect and loading states

## Usage

1. Include the required fonts in your HTML
2. Add the HTML structure to your page
3. Include the CSS styles
4. Optionally add JavaScript for enhanced interactions
5. Customize the button text and destination URL
6. Choose from different style variants as needed
