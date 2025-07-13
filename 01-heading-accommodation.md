# 1. Heading "Accommodation" with Effects

## HTML Structure

```html
<header class="header">
    <h1 class="variable-proximity">ACCOMMODATION</h1>
</header>
```

## CSS Styling

```css
/* Variable Proximity Styles */
.variable-proximity {
  font-family: "Roboto Flex", sans-serif;
  font-variation-settings: 'wght' 400, 'opsz' 14;
  transition: font-variation-settings 0.1s ease;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 0.5rem 0 1rem 0;
}

.header h1 {
  font-family: "Roboto Flex", sans-serif;
  font-size: 3.5rem;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  font-variation-settings: 'wght' 300, 'opsz' 14;
  cursor: default;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header h1 {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 2rem;
  }
}
```

## Required Fonts

Add this to your HTML `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap" rel="stylesheet">
```

## JavaScript - Variable Proximity Effect

```javascript
// Variable Proximity Effect
document.addEventListener('DOMContentLoaded', function() {
    const heading = document.querySelector('.variable-proximity');
    
    if (heading) {
        // Mouse move event for proximity effect
        heading.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Calculate distance from mouse to center of text
            const distance = Math.sqrt(
                Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
            );
            
            // Calculate weight based on proximity (closer = heavier)
            const maxDistance = 200; // Maximum distance for effect
            const minWeight = 300;   // Minimum font weight
            const maxWeight = 900;   // Maximum font weight
            
            let weight = maxWeight - (distance / maxDistance) * (maxWeight - minWeight);
            weight = Math.max(minWeight, Math.min(maxWeight, weight));
            
            // Apply the dynamic font weight
            this.style.setProperty('font-variation-settings', `'wght' ${weight}, 'opsz' 14`);
        });
        
        // Reset to normal weight when mouse leaves
        heading.addEventListener('mouseleave', function() {
            this.style.setProperty('font-variation-settings', `'wght' 300, 'opsz' 14`);
        });
        
        // Optional: Add touch support for mobile
        heading.addEventListener('touchmove', function(e) {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const touchX = touch.clientX;
            const touchY = touch.clientY;
            
            const distance = Math.sqrt(
                Math.pow(touchX - centerX, 2) + Math.pow(touchY - centerY, 2)
            );
            
            const maxDistance = 150;
            const minWeight = 300;
            const maxWeight = 900;
            
            let weight = maxWeight - (distance / maxDistance) * (maxWeight - minWeight);
            weight = Math.max(minWeight, Math.min(maxWeight, weight));
            
            this.style.setProperty('font-variation-settings', `'wght' ${weight}, 'opsz' 14`);
        });
        
        heading.addEventListener('touchend', function() {
            this.style.setProperty('font-variation-settings', `'wght' 300, 'opsz' 14`);
        });
    }
});
```

## Features

- **Variable Font**: Uses Roboto Flex with dynamic font-variation-settings
- **Glowing Effect**: Text shadow with cyan color
- **Responsive**: Scales appropriately on mobile devices
- **Accessibility**: Screen reader friendly with proper semantic markup
- **Interactive**: Optional variable proximity effect for mouse interactions

## Usage

1. Include the required font in your HTML
2. Add the HTML structure to your page
3. Include the CSS styles
4. Optionally include variable-proximity.js for interactive effects
