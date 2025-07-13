// Enhanced Variable Proximity Effect
console.log('Loading enhanced variable proximity script...');

// Wait for fonts to load before applying the effect
document.fonts.ready.then(() => {
    console.log('Fonts are loaded, initializing proximity effect...');
    initializeProximityEffect();
});

// Fallback: also initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeProximityEffect, 500); // Small delay to ensure fonts are loaded
});

function initializeProximityEffect() {
    const heading = document.querySelector('.variable-proximity');
    
    if (!heading) {
        console.error('No element with class .variable-proximity found');
        return;
    }
    
    console.log('Initializing proximity effect for:', heading.textContent);
    
    // Check if Roboto Flex is properly loaded
    const computedStyle = getComputedStyle(heading);
    console.log('Font family:', computedStyle.fontFamily);
    console.log('Font variation settings:', computedStyle.fontVariationSettings);
    
    // Test font weight change capability
    console.log('Testing font weight change...');
    heading.style.fontVariationSettings = "'wght' 800, 'opsz' 14";
    
    setTimeout(() => {
        heading.style.fontVariationSettings = "'wght' 300, 'opsz' 14";
        console.log('Font weight test completed');
    }, 1000);
    
    // Add proximity effect
    let isMouseOver = false;
    
    heading.addEventListener('mouseenter', function() {
        isMouseOver = true;
        console.log('Mouse entered heading area');
    });
    
    heading.addEventListener('mouseleave', function() {
        isMouseOver = false;
        this.style.fontVariationSettings = "'wght' 300, 'opsz' 14";
        console.log('Mouse left heading area - reset to weight 300');
    });
    
    heading.addEventListener('mousemove', function(e) {
        if (!isMouseOver) return;
        
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
        const maxDistance = 250; // Maximum distance for effect
        const minWeight = 300;   // Minimum font weight
        const maxWeight = 900;   // Maximum font weight
        
        // Normalize distance (0 = at center, 1 = at maxDistance or beyond)
        const normalizedDistance = Math.min(distance / maxDistance, 1);
        
        // Calculate weight (inverse relationship: closer = heavier)
        const weight = minWeight + (1 - normalizedDistance) * (maxWeight - minWeight);
        const finalWeight = Math.round(weight);
        
        // Apply the dynamic font weight
        const settings = `'wght' ${finalWeight}, 'opsz' 14`;
        this.style.fontVariationSettings = settings;
        
        // Occasional logging for debugging
        if (Math.random() < 0.01) {
            console.log(`Distance: ${Math.round(distance)}, Weight: ${finalWeight}`);
        }
    });
    
    console.log('Proximity effect initialized successfully');
}

// Export for potential reuse
window.initializeProximityEffect = initializeProximityEffect;
