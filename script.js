// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Form submission handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const service = formData.get('service');
        const message = formData.get('message');
        
        // Create SMS message
        const smsBody = `New Quote Request from SignalCraft Website:\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\nMessage: ${message}`;
        
        // Encode the message for SMS
        const encodedMessage = encodeURIComponent(smsBody);
        
        // Create SMS link
        const smsLink = `sms:8052841054${/iPhone|iPad|iPod/.test(navigator.userAgent) ? '&' : '?'}body=${encodedMessage}`;
        
        // Open SMS app
        window.location.href = smsLink;
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 3rem;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            text-align: center;
            z-index: 10000;
            max-width: 90%;
            width: 400px;
        `;
        
        successMessage.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 1rem;">📱</div>
            <h3 style="font-size: 1.8rem; margin-bottom: 1rem; color: #000000;">Opening Messages</h3>
            <p style="color: #666666; margin-bottom: 2rem;">Your messaging app will open with your message ready to send to (805) 284-1054</p>
            <button onclick="this.parentElement.remove(); document.getElementById('overlay').remove();" style="
                background: #000000;
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                font-size: 1rem;
            ">Close</button>
        `;
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9999;
        `;
        
        overlay.addEventListener('click', () => {
            successMessage.remove();
            overlay.remove();
        });
        
        document.body.appendChild(overlay);
        document.body.appendChild(successMessage);
        
        // Reset form
        contactForm.reset();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .benefit-card, .project-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Click to call tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Call button clicked:', link.href);
        // In production, you might want to track this with analytics
    });
});

// Add hover effects to cards
document.querySelectorAll('.service-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});
