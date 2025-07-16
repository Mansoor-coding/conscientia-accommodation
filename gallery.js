// Photo Gallery Functionality
let currentSlide = 1;
const totalSlides = 3;

function showGallerySlide(n) {
    const items = document.querySelectorAll('.gallery-item');
    const dots = document.querySelectorAll('.dot');
    
    if (n > totalSlides) currentSlide = 1;
    if (n < 1) currentSlide = totalSlides;
    
    // Hide all slides
    items.forEach(item => item.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    if (items[currentSlide - 1]) {
        items[currentSlide - 1].classList.add('active');
    }
    if (dots[currentSlide - 1]) {
        dots[currentSlide - 1].classList.add('active');
    }
}

function changeGallerySlide(n) {
    currentSlide += n;
    showGallerySlide(currentSlide);
}

function currentGallerySlide(n) {
    currentSlide = n;
    showGallerySlide(currentSlide);
}

// Auto-advance gallery
function autoAdvanceGallery() {
    changeGallerySlide(1);
}

// Initialize gallery
document.addEventListener('DOMContentLoaded', function() {
    showGallerySlide(currentSlide);
    
    // Auto-advance every 5 seconds
    setInterval(autoAdvanceGallery, 5000);
    
    // Pause auto-advance on hover
    const gallery = document.querySelector('.accommodation-gallery');
    if (gallery) {
        let autoAdvanceInterval = setInterval(autoAdvanceGallery, 5000);
        
        gallery.addEventListener('mouseenter', () => {
            clearInterval(autoAdvanceInterval);
        });
        
        gallery.addEventListener('mouseleave', () => {
            autoAdvanceInterval = setInterval(autoAdvanceGallery, 5000);
        });
    }
});
