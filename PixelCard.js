document.addEventListener('DOMContentLoaded', () => {
    const pixelCards = document.querySelectorAll('.pixel-card');
    
    if (pixelCards.length === 0) return;

    // Create modal structure
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'pixel-card-modal-overlay';
    document.body.appendChild(modalOverlay);

    pixelCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        card.addEventListener('click', () => {
            const content = card.querySelector('.pixel-card-content').innerHTML;
            
            modalOverlay.innerHTML = `
                <div class="pixel-card-modal-content">
                    <span class="pixel-card-modal-close">&times;</span>
                    ${content}
                </div>
            `;
            
            modalOverlay.classList.add('visible');

            // Close modal functionality
            const closeModal = () => {
                modalOverlay.classList.remove('visible');
                setTimeout(() => {
                    modalOverlay.innerHTML = '';
                }, 300); // Wait for transition
            };

            modalOverlay.querySelector('.pixel-card-modal-close').addEventListener('click', closeModal);
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    closeModal();
                }
            });
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('visible')) {
            modalOverlay.classList.remove('visible');
            setTimeout(() => {
                modalOverlay.innerHTML = '';
            }, 300); // Wait for transition
        }
    });
}); 