// Advanced Variable Proximity Effect - Per-Letter Animation
// Based on React component but adapted for vanilla JavaScript

class VariableProximityEffect {
    constructor(element, options = {}) {
        this.element = element;
        this.originalText = element.textContent;
        this.letterElements = [];
        this.mousePosition = { x: 0, y: 0 };
        this.lastPosition = { x: null, y: null };
        this.animationId = null;
        this.isActive = false;
        
        // Configuration options
        this.config = {
            fromFontVariationSettings: "'wght' 300, 'opsz' 14",
            toFontVariationSettings: "'wght' 900, 'opsz' 40",
            radius: 120,
            falloff: 'linear', // 'linear', 'exponential', 'gaussian'
            ...options
        };
        
        this.parsedSettings = this.parseSettings();
        this.init();
    }
    
    parseSettings() {
        const parseSettingsString = (settingsStr) => {
            const map = new Map();
            settingsStr.split(',').forEach(setting => {
                const trimmed = setting.trim();
                const spaceIndex = trimmed.indexOf(' ');
                if (spaceIndex > 0) {
                    const name = trimmed.substring(0, spaceIndex).replace(/['"]/g, '');
                    const value = parseFloat(trimmed.substring(spaceIndex + 1));
                    map.set(name, value);
                }
            });
            return map;
        };
        
        const fromSettings = parseSettingsString(this.config.fromFontVariationSettings);
        const toSettings = parseSettingsString(this.config.toFontVariationSettings);
        
        return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
            axis,
            fromValue,
            toValue: toSettings.get(axis) || fromValue
        }));
    }
    
    init() {
        console.log('Initializing advanced variable proximity effect...');
        console.log('Original text:', this.originalText);
        console.log('Element before clearing:', this.element.innerHTML);
        
        // Clear existing content completely
        this.element.innerHTML = '';
        console.log('Element after clearing:', this.element.innerHTML);
        
        // Create letter elements
        this.createLetterElements();
        
        // Set up mouse tracking
        this.setupMouseTracking();
        
        // Start animation loop
        this.startAnimationLoop();
        
        console.log(`Created ${this.letterElements.length} letter elements`);
        console.log('Element final state:', this.element.innerHTML);
    }
    
    createLetterElements() {
        const words = this.originalText.split(' ');
        let letterIndex = 0;
        
        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'nowrap';
            
            word.split('').forEach(letter => {
                const letterSpan = document.createElement('span');
                letterSpan.textContent = letter;
                letterSpan.style.display = 'inline-block';
                letterSpan.style.fontVariationSettings = this.config.fromFontVariationSettings;
                letterSpan.style.transition = 'font-variation-settings 0.05s ease-out';
                letterSpan.dataset.letterIndex = letterIndex++;
                
                this.letterElements.push(letterSpan);
                wordSpan.appendChild(letterSpan);
            });
            
            this.element.appendChild(wordSpan);
            
            // Add space between words
            if (wordIndex < words.length - 1) {
                const space = document.createElement('span');
                space.innerHTML = '&nbsp;';
                space.style.display = 'inline-block';
                this.element.appendChild(space);
            }
        });
        
        // Add screen reader accessible text
        const srText = document.createElement('span');
        srText.className = 'sr-only';
        srText.textContent = this.originalText;
        this.element.appendChild(srText);
    }
    
    setupMouseTracking() {
        const updateMousePosition = (x, y) => {
            const rect = this.element.getBoundingClientRect();
            this.mousePosition = {
                x: x - rect.left,
                y: y - rect.top
            };
        };
        
        // Mouse events
        document.addEventListener('mousemove', (e) => {
            updateMousePosition(e.clientX, e.clientY);
        });
        
        // Touch events for mobile
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                updateMousePosition(touch.clientX, touch.clientY);
            }
        });
        
        // Activation/deactivation based on proximity to element
        this.element.addEventListener('mouseenter', () => {
            this.isActive = true;
            console.log('Mouse entered heading area');
        });
        
        this.element.addEventListener('mouseleave', () => {
            this.isActive = false;
            this.resetAllLetters();
            console.log('Mouse left heading area');
        });
    }
    
    calculateDistance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }
    
    calculateFalloff(distance) {
        const norm = Math.min(Math.max(1 - distance / this.config.radius, 0), 1);
        
        switch (this.config.falloff) {
            case 'exponential':
                return norm ** 2;
            case 'gaussian':
                return Math.exp(-((distance / (this.config.radius / 2)) ** 2) / 2);
            case 'linear':
            default:
                return norm;
        }
    }
    
    updateLetterProximity() {
        if (!this.isActive) return;
        
        const { x, y } = this.mousePosition;
        
        // Skip if mouse hasn't moved
        if (this.lastPosition.x === x && this.lastPosition.y === y) {
            return;
        }
        
        this.lastPosition = { x, y };
        
        const elementRect = this.element.getBoundingClientRect();
        
        this.letterElements.forEach((letterElement) => {
            const letterRect = letterElement.getBoundingClientRect();
            const letterCenterX = letterRect.left + letterRect.width / 2 - elementRect.left;
            const letterCenterY = letterRect.top + letterRect.height / 2 - elementRect.top;
            
            const distance = this.calculateDistance(
                this.mousePosition.x,
                this.mousePosition.y,
                letterCenterX,
                letterCenterY
            );
            
            if (distance >= this.config.radius) {
                letterElement.style.fontVariationSettings = this.config.fromFontVariationSettings;
                return;
            }
            
            const falloffValue = this.calculateFalloff(distance);
            const newSettings = this.parsedSettings
                .map(({ axis, fromValue, toValue }) => {
                    const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
                    return `'${axis}' ${interpolatedValue}`;
                })
                .join(', ');
            
            letterElement.style.fontVariationSettings = newSettings;
        });
    }
    
    resetAllLetters() {
        this.letterElements.forEach(letterElement => {
            letterElement.style.fontVariationSettings = this.config.fromFontVariationSettings;
        });
    }
    
    startAnimationLoop() {
        const animate = () => {
            this.updateLetterProximity();
            this.animationId = requestAnimationFrame(animate);
        };
        
        this.animationId = requestAnimationFrame(animate);
    }
    
    destroy() {
        console.log('Destroying variable proximity effect...');
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        // Clear the dataset flag
        if (this.element) {
            this.element.dataset.proximityInitialized = 'false';
            // Restore original text
            this.element.innerHTML = '';
            this.element.textContent = this.originalText;
        }
        
        // Clear arrays
        this.letterElements = [];
        this.isActive = false;
        
        console.log('Variable proximity effect destroyed');
    }
}

// Initialize when fonts are loaded and DOM is ready
function initializeAdvancedProximityEffect() {
    console.log('Initializing advanced proximity effect...');
    
    const headingElements = document.querySelectorAll('.variable-proximity');
    console.log(`Found ${headingElements.length} elements with .variable-proximity class`);
    
    if (headingElements.length === 0) {
        console.error('No element with class .variable-proximity found');
        return;
    }
    
    // Initialize effect for each heading
    headingElements.forEach((headingElement, index) => {
        console.log(`Initializing effect for element ${index + 1}:`, headingElement.textContent);
        
        // Check if already initialized
        if (headingElement.dataset.proximityInitialized === 'true') {
            console.log(`Element ${index + 1} already initialized, skipping...`);
            return;
        }
        
        // Mark as initialized
        headingElement.dataset.proximityInitialized = 'true';
        
        // Wait for fonts to be fully loaded
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
                console.log(`Fonts loaded, creating proximity effect for element ${index + 1}...`);
                createProximityEffect(headingElement, index);
            });
        } else {
            // Fallback for browsers without font loading API
            setTimeout(() => createProximityEffect(headingElement, index), 1000);
        }
    });
    
    function createProximityEffect(element, index) {
        // Destroy any existing effect first
        const effectKey = `proximityEffect_${index}`;
        if (window[effectKey]) {
            console.log(`Destroying existing proximity effect for element ${index + 1}...`);
            window[effectKey].destroy();
        }
        
        // Create the effect with custom settings
        window[effectKey] = new VariableProximityEffect(element, {
            fromFontVariationSettings: "'wght' 300, 'opsz' 14",
            toFontVariationSettings: "'wght' 900, 'opsz' 40",
            radius: 150,
            falloff: 'exponential'
        });
        
        console.log(`Advanced variable proximity effect initialized successfully for element ${index + 1}`);
    }
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', initializeAdvancedProximityEffect);

// Also initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAdvancedProximityEffect);
} else {
    initializeAdvancedProximityEffect();
}

// Export for potential external use
window.VariableProximityEffect = VariableProximityEffect;
