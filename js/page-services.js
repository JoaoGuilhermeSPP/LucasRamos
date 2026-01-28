/* ============================================
   PAGE 2: SERVICES PAGE SPECIFIC JAVASCRIPT
   ============================================ */

// ============================================
// FORM HANDLING
// ============================================

function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate form
    const errors = validateForm({ name, phone, email, message });
    
    if (errors.length > 0) {
        alert('Erros encontrados:\n' + errors.join('\n'));
        return;
    }

    // Format message for WhatsApp
    const whatsappMessage = `Olá Lucas!\n\nMeu nome é ${name}\nTelefone: ${phone}\nEmail: ${email}\n\nMensagem:\n${message}`;

    // Send to WhatsApp
    contactWhatsapp(whatsappMessage);

    // Reset form
    form.reset();

    // Show success message
    showSuccessMessage();
}

// ============================================
// SUCCESS MESSAGE
// ============================================

function showSuccessMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: slideInRight 0.5s ease-out;
    `;
    message.textContent = 'Mensagem enviada com sucesso! Redirecionando para WhatsApp...';
    
    document.body.appendChild(message);

    setTimeout(() => {
        message.remove();
    }, 3000);
}

// ============================================
// PRICING CARD INTERACTIONS
// ============================================

function setupPricingCards() {
    const buyButtons = document.querySelectorAll('.buy-btn');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.closest('.pricing-card');
            const planName = card.querySelector('h3').textContent;
            const price = card.querySelector('.price').textContent;
            
            const message = `Olá Lucas! Gostaria de contratar o plano: ${planName} ${price}`;
            contactWhatsapp(message);
        });
    });
}

// ============================================
// SERVICE CARD ANIMATIONS
// ============================================

function setupServiceCardAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// ============================================
// TESTIMONIAL ANIMATIONS
// ============================================

function setupTestimonialAnimations() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    observeElements('.testimonial-card', {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
}

// ============================================
// SMOOTH SCROLL TO SECTIONS
// ============================================

function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ============================================
// INITIALIZATION
// ============================================

onReady(function() {
    // Setup form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Setup pricing cards
    setupPricingCards();

    // Setup animations
    setupServiceCardAnimations();
    setupTestimonialAnimations();

    // Setup smooth scroll
    setupSmoothScroll();

    // Log initialization
    logInfo('Page 2 (Services) initialized successfully');
});

// ============================================
// FORM INPUT FORMATTING
// ============================================

const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('blur', function() {
        this.value = formatPhoneNumber(this.value);
    });
}

// ============================================
// FORM VALIDATION ON INPUT
// ============================================

const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#FF6B6B';
        } else {
            this.style.borderColor = 'var(--accent-gold)';
        }
    });
}
