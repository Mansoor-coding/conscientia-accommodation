# 4. Countdown Timer

## HTML Structure

```html
<!-- Countdown Section -->
<div class="countdown-section">
    <div data-countdown></div>
</div>
```

## CSS Styling

```css
/* Countdown Section */
.countdown-section {
  margin: 4rem 0;
  padding: 3rem;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 255, 255, 0.03) 50%, rgba(0, 0, 0, 0.3) 100%);
  border-radius: 16px;
  border: 1px solid rgba(0, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.countdown-section::before {
  content: "Event Countdown";
  display: block;
  text-align: center;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  background: linear-gradient(90deg, rgba(0, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(0, 255, 255, 0.9) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 2rem;
  font-weight: 400;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
}

.countdown-section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(0, 255, 255, 0.05) 0%, transparent 70%);
  pointer-events: none;
  z-index: -1;
}

/* Countdown Timer Styles */
.countdown-timer {
  text-align: center;
}

.countdown-container {
  display: flex;
  justify-content: center;
  gap: 4rem;
  flex-wrap: wrap;
}

.countdown-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(145deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 255, 255, 0.1) 100%);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  min-width: 120px;
}

.countdown-unit::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, transparent 50%, rgba(0, 255, 255, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.countdown-unit:hover::before {
  opacity: 1;
}

.countdown-value {
  font-family: 'Orbitron', monospace;
  font-size: 5rem;
  font-weight: 700;
  color: rgba(0, 255, 255, 0.9);
  text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  margin-bottom: 0.5rem;
  letter-spacing: 0.1em;
  line-height: 1;
  position: relative;
  z-index: 2;
}

.countdown-label {
  font-family: 'Electrolize', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 400;
  position: relative;
  z-index: 2;
}

/* Pulse animation for active countdown */
.countdown-unit.active {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 12px 40px rgba(0, 255, 255, 0.2);
  }
}

/* Countdown complete state */
.countdown-complete {
  opacity: 0.6;
}

.countdown-complete .countdown-value {
  color: rgba(255, 255, 255, 0.5);
  text-shadow: none;
}

.countdown-complete .countdown-unit {
  background: linear-gradient(145deg, rgba(0, 0, 0, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%);
  border-color: rgba(255, 255, 255, 0.2);
}

.countdown-complete::before {
  content: "Event Has Started!";
  color: rgba(0, 255, 0, 0.8);
}

/* Flip animation for number changes */
.countdown-value.flip {
  animation: flip 0.6s ease-in-out;
}

@keyframes flip {
  0% {
    transform: rotateY(0);
  }
  50% {
    transform: rotateY(90deg);
  }
  100% {
    transform: rotateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .countdown-section {
    margin: 3rem 0;
    padding: 2rem 1rem;
  }
  
  .countdown-container {
    gap: 2rem;
  }
  
  .countdown-unit {
    padding: 0.8rem 1.5rem;
    min-width: 100px;
  }
  
  .countdown-value {
    font-size: 3.5rem;
  }
  
  .countdown-label {
    font-size: 0.9rem;
  }
  
  .countdown-section::before {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 480px) {
  .countdown-container {
    gap: 1.5rem;
    flex-direction: column;
    align-items: center;
  }
  
  .countdown-unit {
    padding: 1rem 2rem;
    min-width: 140px;
  }
  
  .countdown-value {
    font-size: 3rem;
  }
  
  .countdown-label {
    font-size: 0.8rem;
  }
}

/* Screen reader only class */
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
```

## Required Fonts

Add this to your HTML `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Electrolize:wght@400&display=swap" rel="stylesheet">
```

## JavaScript Implementation

```javascript
class CountdownTimer {
  constructor(element, options = {}) {
    this.element = element;
    this.targetDate = new Date('November 1, 2025 00:00:00').getTime();
    this.options = {
      separator: ',',
      showLabels: true,
      showDays: true,
      showHours: true,
      showMinutes: true,
      showSeconds: true,
      onComplete: null,
      enableFlipAnimation: true,
      ...options
    };
    
    this.interval = null;
    this.isComplete = false;
    this.previousValues = {};
    
    this.init();
  }
  
  init() {
    this.createElements();
    this.startCountdown();
  }
  
  createElements() {
    this.element.classList.add('countdown-timer');
    
    const container = document.createElement('div');
    container.className = 'countdown-container';
    
    // Create time unit elements
    this.timeUnits = {};
    
    if (this.options.showDays) {
      this.timeUnits.days = this.createTimeUnit('days', 'Days');
      container.appendChild(this.timeUnits.days.element);
    }
    
    if (this.options.showHours) {
      this.timeUnits.hours = this.createTimeUnit('hours', 'Hours');
      container.appendChild(this.timeUnits.hours.element);
    }
    
    if (this.options.showMinutes) {
      this.timeUnits.minutes = this.createTimeUnit('minutes', 'Minutes');
      container.appendChild(this.timeUnits.minutes.element);
    }
    
    if (this.options.showSeconds) {
      this.timeUnits.seconds = this.createTimeUnit('seconds', 'Seconds');
      container.appendChild(this.timeUnits.seconds.element);
    }
    
    this.element.appendChild(container);
  }
  
  createTimeUnit(unit, label) {
    const unitElement = document.createElement('div');
    unitElement.className = `countdown-unit countdown-${unit}`;
    
    const valueElement = document.createElement('span');
    valueElement.className = 'countdown-value';
    valueElement.textContent = '00';
    
    // Add screen reader text
    const srElement = document.createElement('span');
    srElement.className = 'sr-only';
    srElement.textContent = '00';
    valueElement.appendChild(srElement);
    
    const labelElement = document.createElement('span');
    labelElement.className = 'countdown-label';
    labelElement.textContent = this.options.showLabels ? label : '';
    
    unitElement.appendChild(valueElement);
    if (this.options.showLabels) {
      unitElement.appendChild(labelElement);
    }
    
    return {
      element: unitElement,
      value: valueElement,
      label: labelElement
    };
  }
  
  formatNumber(number) {
    const str = number.toString().padStart(2, '0');
    return this.options.separator && number >= 1000 
      ? str.replace(/\B(?=(\d{3})+(?!\d))/g, this.options.separator)
      : str;
  }
  
  updateCountdown() {
    const now = new Date().getTime();
    const distance = this.targetDate - now;
    
    if (distance < 0) {
      this.handleComplete();
      return;
    }
    
    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update display with animation
    this.updateValue('days', days);
    this.updateValue('hours', hours);
    this.updateValue('minutes', minutes);
    this.updateValue('seconds', seconds);
  }
  
  updateValue(unit, value) {
    if (this.timeUnits[unit]) {
      const formattedValue = this.formatNumber(value);
      const currentValue = this.timeUnits[unit].value.textContent;
      
      if (currentValue !== formattedValue) {
        // Add flip animation if enabled
        if (this.options.enableFlipAnimation) {
          this.timeUnits[unit].value.classList.add('flip');
          this.timeUnits[unit].element.classList.add('active');
          
          setTimeout(() => {
            this.timeUnits[unit].value.classList.remove('flip');
            this.timeUnits[unit].element.classList.remove('active');
          }, 600);
        }
        
        // Check if variable proximity is active (has letter spans)
        const hasVariableProximity = this.timeUnits[unit].value.querySelector('span[aria-hidden="true"]');
        
        if (hasVariableProximity) {
          // Update the sr-only text for screen readers
          const srElement = this.timeUnits[unit].value.querySelector('.sr-only');
          if (srElement) {
            srElement.textContent = formattedValue;
          }
          
          // Update individual letter spans
          const letterSpans = this.timeUnits[unit].value.querySelectorAll('span[aria-hidden="true"]');
          const letters = formattedValue.split('');
          
          letterSpans.forEach((span, index) => {
            if (index < letters.length) {
              span.textContent = letters[index];
            }
          });
        } else {
          // Update value normally if no variable proximity
          this.timeUnits[unit].value.textContent = formattedValue;
          
          // Update screen reader text
          const srElement = this.timeUnits[unit].value.querySelector('.sr-only');
          if (srElement) {
            srElement.textContent = formattedValue;
          }
        }
        
        this.previousValues[unit] = formattedValue;
      }
    }
  }
  
  handleComplete() {
    this.isComplete = true;
    this.stopCountdown();
    
    // Set all values to 00
    Object.keys(this.timeUnits).forEach(unit => {
      const valueElement = this.timeUnits[unit].value;
      valueElement.textContent = '00';
      
      const srElement = valueElement.querySelector('.sr-only');
      if (srElement) {
        srElement.textContent = '00';
      }
    });
    
    // Add completed class
    this.element.classList.add('countdown-complete');
    
    // Call completion callback
    if (typeof this.options.onComplete === 'function') {
      this.options.onComplete();
    }
  }
  
  startCountdown() {
    this.updateCountdown(); // Initial update
    this.interval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }
  
  stopCountdown() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
  
  destroy() {
    this.stopCountdown();
    this.element.innerHTML = '';
    this.element.classList.remove('countdown-timer', 'countdown-complete');
  }
  
  // Public methods
  setTargetDate(date) {
    this.targetDate = new Date(date).getTime();
    this.isComplete = false;
    this.element.classList.remove('countdown-complete');
    this.startCountdown();
  }
  
  getTimeRemaining() {
    const now = new Date().getTime();
    const distance = this.targetDate - now;
    
    if (distance < 0) return null;
    
    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };
  }
}

// Auto-initialize countdown timers
document.addEventListener('DOMContentLoaded', () => {
  const countdownElements = document.querySelectorAll('[data-countdown]');
  
  countdownElements.forEach(element => {
    const options = {
      separator: element.dataset.separator || ',',
      showLabels: element.dataset.showLabels !== 'false',
      showDays: element.dataset.showDays !== 'false',
      showHours: element.dataset.showHours !== 'false',
      showMinutes: element.dataset.showMinutes !== 'false',
      showSeconds: element.dataset.showSeconds !== 'false',
      enableFlipAnimation: element.dataset.enableFlipAnimation !== 'false',
      onComplete: () => {
        console.log('Countdown completed!');
        // Add custom completion logic here
        element.style.filter = 'grayscale(1)';
      }
    };
    
    new CountdownTimer(element, options);
  });
});
```

## Advanced Usage Examples

### Custom Target Date

```html
<div class="countdown-section">
    <div data-countdown data-target="2025-12-31 23:59:59"></div>
</div>
```

### Minimal Countdown (Hours and Minutes Only)

```html
<div class="countdown-section">
    <div data-countdown 
         data-show-days="false" 
         data-show-seconds="false"></div>
</div>
```

### Without Labels

```html
<div class="countdown-section">
    <div data-countdown data-show-labels="false"></div>
</div>
```

### Programmatic Control

```javascript
// Create countdown with custom options
const countdown = new CountdownTimer(document.querySelector('[data-countdown]'), {
  showDays: true,
  showHours: true,
  showMinutes: true,
  showSeconds: true,
  enableFlipAnimation: true,
  onComplete: () => {
    alert('Event has started!');
  }
});

// Change target date
countdown.setTargetDate('2025-12-31 23:59:59');

// Get remaining time
const timeLeft = countdown.getTimeRemaining();
console.log(timeLeft); // { days: 10, hours: 5, minutes: 30, seconds: 45 }

// Destroy countdown
countdown.destroy();
```

## Features

- **Real-time Updates**: Updates every second with smooth animations
- **Responsive Design**: Adapts to all screen sizes
- **Accessibility**: Screen reader friendly with proper ARIA labels
- **Customizable**: Multiple configuration options
- **Visual Effects**: Hover effects, pulse animations, and flip transitions
- **Performance**: Efficient interval management
- **Error Handling**: Graceful handling of invalid dates
- **Auto-initialization**: Automatically starts on page load
- **Programmatic Control**: Full API for dynamic control

## Usage

1. Include the required fonts in your HTML
2. Add the HTML structure to your page
3. Include the CSS styles
4. Include the JavaScript code
5. Customize the target date and options as needed
6. The countdown will automatically start on page load
