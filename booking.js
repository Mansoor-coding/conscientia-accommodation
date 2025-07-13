// Initialize Razorpay
let razorpay;

// DOM Elements
const bookingForm = document.getElementById('bookingForm');
const confirmationModal = document.getElementById('confirmationModal');
const paymentModal = document.getElementById('paymentModal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const printBtn = document.getElementById('printBtn');
const closeBtn = document.getElementById('closeBtn');
const paymentBtn = document.getElementById('paymentBtn');
const processPaymentBtn = document.getElementById('processPaymentBtn');
const phoneInput = document.getElementById('phone');

// Initialize date inputs with min/max dates
const checkInInput = document.getElementById('checkIn');
const checkOutInput = document.getElementById('checkOut');
const today = new Date();
const bookingStart = new Date('2025-10-03');
const festivalStart = new Date('2025-10-04');
const festivalEnd = new Date('2025-10-07');

// Set min and max dates for check-in
checkInInput.min = bookingStart.toISOString().split('T')[0];
checkInInput.max = festivalEnd.toISOString().split('T')[0];

// Set min and max dates for check-out
checkOutInput.min = bookingStart.toISOString().split('T')[0];
checkOutInput.max = festivalEnd.toISOString().split('T')[0];

// Phone number validation
phoneInput.addEventListener('input', function(e) {
    // Remove any non-numeric characters
    this.value = this.value.replace(/\D/g, '');
    
    // Limit to 10 digits
    if (this.value.length > 10) {
        this.value = this.value.slice(0, 10);
    }
});

// Update check-out min date when check-in changes
checkInInput.addEventListener('change', function() {
    const start = new Date(this.value);
    const minCheckOut = new Date(start);
    minCheckOut.setDate(start.getDate() + 1);
    
    checkOutInput.min = minCheckOut.toISOString().split('T')[0];
    
    // If current check-out date is before new check-in date, update it
    if (new Date(checkOutInput.value) <= start) {
        checkOutInput.value = minCheckOut.toISOString().split('T')[0];
    }
});

// Update total amount when dates or guests change
function updateTotal() {
    const checkIn = new Date(checkInInput.value);
    const checkOut = new Date(checkOutInput.value);
    const guests = parseInt(document.getElementById('guests').value);
    const roomType = document.getElementById('roomType').value;
    
    // Calculate number of nights
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
    // Base price per night based on room type
    let basePrice;
    switch(roomType) {
        case 'standard':
            basePrice = 2000;
            break;
        case 'deluxe':
            basePrice = 3000;
            break;
        case 'suite':
            basePrice = 5000;
            break;
        default:
            basePrice = 2000;
    }
    
    // Calculate total
    const subtotal = basePrice * nights;
    const gst = subtotal * 0.18;
    const total = subtotal + gst;
    
    // Update summary
    document.getElementById('roomTypeSummary').textContent = roomType.charAt(0).toUpperCase() + roomType.slice(1);
    document.getElementById('nightsSummary').textContent = nights;
    document.getElementById('guestsSummary').textContent = guests;
    document.getElementById('subtotalSummary').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('gstSummary').textContent = `₹${gst.toFixed(2)}`;
    document.getElementById('totalSummary').textContent = `₹${total.toFixed(2)}`;
    
    return total;
}

// Add event listeners for total calculation
checkInInput.addEventListener('change', updateTotal);
checkOutInput.addEventListener('change', updateTotal);
document.getElementById('guests').addEventListener('change', updateTotal);
document.getElementById('roomType').addEventListener('change', updateTotal);

// Form submission handler
bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Generate booking reference
    const bookingRef = 'BK' + Date.now().toString().slice(-6);
    
    // Get form data
    const formData = new FormData(this);
    const bookingData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        roomType: formData.get('roomType'),
        checkIn: formData.get('checkIn'),
        checkOut: formData.get('checkOut'),
        guests: formData.get('guests'),
        specialRequests: formData.get('specialRequests'),
        bookingRef: bookingRef
    };
    
    // Update confirmation modal
    document.getElementById('bookingRef').textContent = bookingRef;
    document.getElementById('name').textContent = bookingData.name;
    document.getElementById('email').textContent = bookingData.email;
    document.getElementById('phone').textContent = bookingData.phone;
    document.getElementById('roomType').textContent = bookingData.roomType.charAt(0).toUpperCase() + bookingData.roomType.slice(1);
    document.getElementById('checkIn').textContent = new Date(bookingData.checkIn).toLocaleDateString();
    document.getElementById('checkOut').textContent = new Date(bookingData.checkOut).toLocaleDateString();
    document.getElementById('guests').textContent = bookingData.guests;
    document.getElementById('specialRequests').textContent = bookingData.specialRequests || 'None';
    
    // Show confirmation modal
    confirmationModal.style.display = 'block';
});

// Close modal handlers
closeModalBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        confirmationModal.style.display = 'none';
        paymentModal.style.display = 'none';
    });
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === confirmationModal) {
        confirmationModal.style.display = 'none';
    }
    if (e.target === paymentModal) {
        paymentModal.style.display = 'none';
    }
});

// Print booking confirmation
printBtn.addEventListener('click', function() {
    window.print();
});

// Payment button handler
paymentBtn.addEventListener('click', function() {
    // Hide confirmation modal and show payment modal
    confirmationModal.style.display = 'none';
    paymentModal.style.display = 'block';
    
    // Update payment summary
    const total = updateTotal();
    document.getElementById('paymentAmount').textContent = `₹${total.toFixed(2)}`;
});

// Process payment handler
processPaymentBtn.addEventListener('click', function() {
    const total = updateTotal();
    
    // Initialize Razorpay options
    const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
        amount: total * 100, // Amount in paise
        currency: "INR",
        name: "Cyberpunk Festival Accommodation",
        description: "Booking Payment",
        image: "https://your-logo-url.com/logo.png", // Replace with your logo URL
        handler: function (response) {
            // Handle successful payment
            const bookingRef = document.getElementById('bookingRef').textContent;
            
            // Prepare booking details for confirmation
            const bookingDetails = {
                name: document.getElementById('name').textContent,
                email: document.getElementById('email').textContent,
                phone: document.getElementById('phone').textContent,
                bookingRef: bookingRef,
                roomType: document.getElementById('roomType').textContent,
                checkIn: document.getElementById('checkIn').textContent,
                checkOut: document.getElementById('checkOut').textContent,
                guests: document.getElementById('guests').textContent,
                amount: total,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id
            };
            
            // Send booking details to backend
            fetch('http://localhost:3000/api/confirm-booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingDetails)
            })
            .then(response => response.json())
            .then(data => {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'payment-success';
                successMessage.innerHTML = `
                    <h3>Payment Successful!</h3>
                    <p>Your booking has been confirmed.</p>
                    <div class="success-details">
                        <p>Booking Reference: ${bookingRef}</p>
                        <p>Payment ID: ${response.razorpay_payment_id}</p>
                        <p>Order ID: ${response.razorpay_order_id}</p>
                        ${data.emailSent ? '<p>✓ Confirmation email sent</p>' : ''}
                        ${data.smsSent ? '<p>✓ Confirmation SMS sent</p>' : ''}
                    </div>
                `;
                
                // Replace payment modal content with success message
                const modalContent = document.querySelector('.payment-modal .modal-content');
                modalContent.innerHTML = '';
                modalContent.appendChild(successMessage);
            })
            .catch(error => {
                console.error('Error:', error);
                // Show error message but still display booking reference
                const errorMessage = document.createElement('div');
                errorMessage.className = 'payment-success';
                errorMessage.innerHTML = `
                    <h3>Payment Successful!</h3>
                    <p>Your booking has been confirmed.</p>
                    <div class="success-details">
                        <p>Booking Reference: ${bookingRef}</p>
                        <p>Payment ID: ${response.razorpay_payment_id}</p>
                        <p>Order ID: ${response.razorpay_order_id}</p>
                        <p>Note: There was an issue sending the confirmation. Please save your booking reference.</p>
                    </div>
                `;
                
                // Replace payment modal content with error message
                const modalContent = document.querySelector('.payment-modal .modal-content');
                modalContent.innerHTML = '';
                modalContent.appendChild(errorMessage);
            });
        },
        prefill: {
            name: document.getElementById('name').textContent,
            email: document.getElementById('email').textContent,
            contact: document.getElementById('phone').textContent
        },
        theme: {
            color: "#3395ff"
        }
    };
    
    // Initialize Razorpay
    razorpay = new Razorpay(options);
    razorpay.open();
});

// Initialize total on page load
document.addEventListener('DOMContentLoaded', updateTotal); 