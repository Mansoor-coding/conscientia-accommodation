// Enhanced Variable Proximity Interactive Effect - Letter by Letter
class VariableProximityEffect {
    constructor(selector, options = {}) {
        this.elements = document.querySelectorAll(selector);
        this.options = {
            radius: options.radius || 120,
            fromWeight: options.fromWeight || 300,
            toWeight: options.toWeight || 900,
            fromOpticalSize: options.fromOpticalSize || 14,
            toOpticalSize: options.toOpticalSize || 40,
            falloff: options.falloff || 'linear',
            ...options
        };
        
        this.mousePosition = { x: 0, y: 0 };
        this.letterElements = [];
        this.animationFrameId = null;
        
        this.init();
    }
    
    init() {
        if (this.elements.length === 0) return;
        
        this.elements.forEach(element => {
            this.convertToLetters(element);
        });
        
        this.bindEvents();
        this.startAnimation();
    }
    
    convertToLetters(element) {
        const text = element.textContent;
        const words = text.split(' ');
        element.innerHTML = '';
        
        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'nowrap';
            
            word.split('').forEach((letter, letterIndex) => {
                const letterSpan = document.createElement('span');
                letterSpan.textContent = letter;
                letterSpan.style.display = 'inline-block';
                letterSpan.style.fontVariationSettings = `'wght' ${this.options.fromWeight}, 'opsz' ${this.options.fromOpticalSize}`;
                letterSpan.style.transition = 'font-variation-settings 0.1s ease';
                
                this.letterElements.push({
                    element: letterSpan,
                    container: element
                });
                
                wordSpan.appendChild(letterSpan);
            });
            
            element.appendChild(wordSpan);
            
            // Add space between words (except for the last word)
            if (wordIndex < words.length - 1) {
                const spaceSpan = document.createElement('span');
                spaceSpan.innerHTML = '&nbsp;';
                spaceSpan.style.display = 'inline-block';
                element.appendChild(spaceSpan);
            }
        });
    }
    
    bindEvents() {
        // Mouse tracking for desktop
        document.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
        });
        
        // Touch tracking for mobile
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                this.mousePosition.x = e.touches[0].clientX;
                this.mousePosition.y = e.touches[0].clientY;
            }
        });
        
        // Touch start for mobile interaction
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length > 0) {
                this.mousePosition.x = e.touches[0].clientX;
                this.mousePosition.y = e.touches[0].clientY;
            }
        });
    }
    
    calculateDistance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }
    
    calculateFalloff(distance) {
        const norm = Math.min(Math.max(1 - distance / this.options.radius, 0), 1);
        
        switch (this.options.falloff) {
            case 'exponential':
                return norm ** 2;
            case 'gaussian':
                return Math.exp(-((distance / (this.options.radius / 2)) ** 2) / 2);
            case 'linear':
            default:
                return norm;
        }
    }
    
    updateLetters() {
        this.letterElements.forEach(({ element, container }) => {
            const containerRect = container.getBoundingClientRect();
            const letterRect = element.getBoundingClientRect();
            
            // Calculate letter center position relative to viewport
            const letterCenterX = letterRect.left + letterRect.width / 2;
            const letterCenterY = letterRect.top + letterRect.height / 2;
            
            // Calculate distance from mouse to letter center
            const distance = this.calculateDistance(
                this.mousePosition.x,
                this.mousePosition.y,
                letterCenterX,
                letterCenterY
            );
            
            // Apply falloff if within radius
            if (distance >= this.options.radius) {
                element.style.fontVariationSettings = `'wght' ${this.options.fromWeight}, 'opsz' ${this.options.fromOpticalSize}`;
                return;
            }
            
            const falloffValue = this.calculateFalloff(distance);
            
            // Interpolate weight and optical size
            const weight = this.options.fromWeight + (this.options.toWeight - this.options.fromWeight) * falloffValue;
            const opticalSize = this.options.fromOpticalSize + (this.options.toOpticalSize - this.options.fromOpticalSize) * falloffValue;
            
            element.style.fontVariationSettings = `'wght' ${weight}, 'opsz' ${opticalSize}`;
        });
    }
    
    startAnimation() {
        const animate = () => {
            this.updateLetters();
            this.animationFrameId = requestAnimationFrame(animate);
        };
        this.animationFrameId = requestAnimationFrame(animate);
    }
    
    destroy() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create variable proximity effect for all elements with the class
    const proximityEffect = new VariableProximityEffect('.variable-proximity', {
        radius: window.innerWidth <= 768 ? 80 : 120, // Smaller radius on mobile
        fromWeight: 300,
        toWeight: 900,
        fromOpticalSize: 14,
        toOpticalSize: 40,
        falloff: 'linear'
    });
    
    // Adjust radius on window resize
    window.addEventListener('resize', () => {
        proximityEffect.options.radius = window.innerWidth <= 768 ? 80 : 120;
    });
    
    // Store globally for cleanup if needed
    window.proximityEffect = proximityEffect;
});