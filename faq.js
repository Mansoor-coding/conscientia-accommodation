// FAQ Accordion functionality with enhanced accessibility
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Set up ARIA attributes
        const questionId = `faq-question-${index}`;
        const answerId = `faq-answer-${index}`;
        
        question.setAttribute('id', questionId);
        answer.setAttribute('id', answerId);
        question.setAttribute('aria-controls', answerId);
        answer.setAttribute('aria-labelledby', questionId);
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    otherQuestion.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                question.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
                
                // Smooth scroll to make sure the opened content is visible
                setTimeout(() => {
                    const rect = item.getBoundingClientRect();
                    const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;
                    if (!isInViewport) {
                        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                }, 300);
            }
        });
        
        // Add keyboard accessibility
        question.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
        
        // Arrow key navigation
        question.addEventListener('keydown', (e) => {
            let targetIndex;
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                targetIndex = index + 1;
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                targetIndex = index - 1;
            } else if (e.key === 'Home') {
                e.preventDefault();
                targetIndex = 0;
            } else if (e.key === 'End') {
                e.preventDefault();
                targetIndex = faqItems.length - 1;
            }
            
            if (targetIndex !== undefined) {
                targetIndex = Math.max(0, Math.min(targetIndex, faqItems.length - 1));
                const targetQuestion = faqItems[targetIndex].querySelector('.faq-question');
                targetQuestion.focus();
            }
        });
        
        // Make it focusable with proper attributes
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
    });
    
    // Add smooth scroll effect when FAQ section comes into view
    const faqSection = document.querySelector('.faq-section');
    if (faqSection) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Initial state
        faqSection.style.opacity = '0';
        faqSection.style.transform = 'translateY(30px)';
        faqSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        sectionObserver.observe(faqSection);
    }
});
