// Variable Proximity Effect - Debug Version
console.log('Loading variable proximity script...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, searching for .variable-proximity element...');
    const heading = document.querySelector('.variable-proximity');
    
    if (heading) {
        console.log('Found heading element:', heading.textContent);
        
        // Test if Roboto Flex is loaded
        const computedStyle = getComputedStyle(heading);
        console.log('Font family:', computedStyle.fontFamily);
        console.log('Initial font variation settings:', computedStyle.fontVariationSettings);
        
        // Test if we can change the font weight immediately
        console.log('Testing immediate font weight change...');
        heading.style.fontVariationSettings = "'wght' 700, 'opsz' 14";
        
        setTimeout(() => {
            heading.style.fontVariationSettings = "'wght' 300, 'opsz' 14";
            console.log('Reset font weight to 300');
        }, 1000);
        
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
            
            // Apply the dynamic font weight using direct style property
            const settings = `'wght' ${Math.round(weight)}, 'opsz' 14`;
            this.style.fontVariationSettings = settings;
            
            // Log occasionally for debugging
            if (Math.random() < 0.01) {
                console.log(`Distance: ${Math.round(distance)}, Weight: ${Math.round(weight)}, Settings: ${settings}`);
            }
        });
        
        // Reset to normal weight when mouse leaves
        heading.addEventListener('mouseleave', function() {
            this.style.fontVariationSettings = "'wght' 300, 'opsz' 14";
            console.log('Mouse left - reset to normal weight');
        });
        });
        
        // Test by setting a heavy weight immediately
        setTimeout(() => {
            console.log('Testing heavy weight...');
            heading.style.setProperty('font-variation-settings', `'wght' 900, 'opsz' 14`);
            
            setTimeout(() => {
                console.log('Resetting to normal weight...');
                heading.style.setProperty('font-variation-settings', `'wght' 300, 'opsz' 14`);
            }, 2000);
        }, 1000);
        
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
            
            this.style.setProperty('font-variation-settings', `'wght' ${Math.round(weight)}, 'opsz' 14`);
        });
        
        heading.addEventListener('touchend', function() {
            this.style.setProperty('font-variation-settings', `'wght' 300, 'opsz' 14`);
        });
        
        console.log('Variable proximity effect initialized successfully!');
    } else {
        console.error('No element found with class .variable-proximity');
        console.log('Available elements:', document.querySelectorAll('h1'));
    }
});

console.log('Variable proximity script loaded completely.');
