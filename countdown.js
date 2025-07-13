// Countdown Timer for Conscientia Tech Fest
// Event dates: October 4-7, 2025

document.addEventListener('DOMContentLoaded', () => {
    const countdownElement = document.querySelector('[data-countdown]');
    
    if (!countdownElement) {
        console.warn('Countdown element not found');
        return;
    }

    // Set the target date (October 4, 2025 - start of the festival)
    const targetDate = new Date('October 4, 2025 09:00:00').getTime();

    // Create countdown HTML structure
    countdownElement.innerHTML = `
        <div class="countdown-timer">
            <div class="countdown-container">
                <div class="countdown-unit">
                    <div class="countdown-value" id="days">00</div>
                    <div class="countdown-label">Days</div>
                </div>
                <div class="countdown-unit">
                    <div class="countdown-value" id="hours">00</div>
                    <div class="countdown-label">Hours</div>
                </div>
                <div class="countdown-unit">
                    <div class="countdown-value" id="minutes">00</div>
                    <div class="countdown-label">Minutes</div>
                </div>
                <div class="countdown-unit">
                    <div class="countdown-value" id="seconds">00</div>
                    <div class="countdown-label">Seconds</div>
                </div>
            </div>
        </div>
    `;

    // Get countdown elements
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // Update countdown function
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // If countdown is finished
        if (distance < 0) {
            countdownElement.innerHTML = `
                <div class="countdown-timer">
                    <div class="countdown-container countdown-complete">
                        <div class="countdown-unit">
                            <div class="countdown-value">00</div>
                            <div class="countdown-label">Days</div>
                        </div>
                        <div class="countdown-unit">
                            <div class="countdown-value">00</div>
                            <div class="countdown-label">Hours</div>
                        </div>
                        <div class="countdown-unit">
                            <div class="countdown-value">00</div>
                            <div class="countdown-label">Minutes</div>
                        </div>
                        <div class="countdown-unit">
                            <div class="countdown-value">00</div>
                            <div class="countdown-label">Seconds</div>
                        </div>
                    </div>
                    <div style="text-align: center; margin-top: 2rem; color: rgba(0, 255, 0, 0.8); font-size: 1.5rem; font-weight: bold;">
                        🎉 Event Has Started! 🎉
                    </div>
                </div>
            `;
            return;
        }

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update display with leading zeros
        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }

    // Initial call
    updateCountdown();

    // Update every second
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Cleanup function
    function cleanup() {
        clearInterval(countdownInterval);
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', cleanup);

    // Optional: Add variable proximity effect for countdown values
    const countdownValues = document.querySelectorAll('.countdown-value');
    
    countdownValues.forEach(value => {
        value.addEventListener('mouseenter', () => {
            value.style.fontVariationSettings = "'wght' 700, 'opsz' 14";
        });
        
        value.addEventListener('mouseleave', () => {
            value.style.fontVariationSettings = "'wght' 400, 'opsz' 14";
        });
    });

    console.log('Countdown timer initialized for Conscientia Tech Fest 2025!');
}); 