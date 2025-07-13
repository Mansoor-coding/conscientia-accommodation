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