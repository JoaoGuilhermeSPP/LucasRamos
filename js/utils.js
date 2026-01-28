/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// ============================================
// WHATSAPP CONTACT
// ============================================

function contactWhatsapp(message) {
    const phoneNumber = '5522998055386';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// ============================================
// FORM VALIDATION
// ============================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function validateForm(formData) {
    const errors = [];

    if (!formData.name || formData.name.trim() === '') {
        errors.push('Nome é obrigatório');
    }

    if (!formData.phone || !validatePhone(formData.phone)) {
        errors.push('Telefone inválido');
    }

    if (!formData.email || !validateEmail(formData.email)) {
        errors.push('Email inválido');
    }

    if (!formData.message || formData.message.trim() === '') {
        errors.push('Mensagem é obrigatória');
    }

    return errors;
}

// ============================================
// SCROLL UTILITIES
// ============================================

function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// DOM UTILITIES
// ============================================

function addClass(element, className) {
    if (element) {
        element.classList.add(className);
    }
}

function removeClass(element, className) {
    if (element) {
        element.classList.remove(className);
    }
}

function toggleClass(element, className) {
    if (element) {
        element.classList.toggle(className);
    }
}

function hasClass(element, className) {
    if (element) {
        return element.classList.contains(className);
    }
    return false;
}

// ============================================
// LOCAL STORAGE
// ============================================

function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        console.error('Erro ao salvar no localStorage:', e);
        return false;
    }
}

function getFromLocalStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.error('Erro ao recuperar do localStorage:', e);
        return null;
    }
}

function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (e) {
        console.error('Erro ao remover do localStorage:', e);
        return false;
    }
}

// ============================================
// STRING UTILITIES
// ============================================

function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

// ============================================
// ANIMATION UTILITIES
// ============================================

function observeElements(selector, options = {}) {
    const defaultOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
        ...options
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, defaultOptions);

    document.querySelectorAll(selector).forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    return observer;
}

// ============================================
// EVENT UTILITIES
// ============================================

function onReady(callback) {
    if (document.readyState !== 'loading') {
        callback();
    } else {
        document.addEventListener('DOMContentLoaded', callback);
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// CONSOLE UTILITIES
// ============================================

function logInfo(message, data = null) {
    console.log(`%c[INFO] ${message}`, 'color: #4CAF50; font-weight: bold;', data);
}

function logError(message, data = null) {
    console.error(`%c[ERROR] ${message}`, 'color: #F44336; font-weight: bold;', data);
}

function logWarning(message, data = null) {
    console.warn(`%c[WARNING] ${message}`, 'color: #FF9800; font-weight: bold;', data);
}
