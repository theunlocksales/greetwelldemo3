// ==================== GREETWELL GROUP - UNIQUE JAVASCRIPT ====================

document.addEventListener('DOMContentLoaded', function() {
    initFloatingNav();
    initAOS();
    initSmoothScroll();
    initLucideIcons();
    initBackToTop();
    initContactForm();

    console.log('%c🌾 GreetWell Group', 'color: #FF6B35; font-size: 32px; font-weight: bold;');
    console.log('%cYour Growth Partner in Agri-Commodities', 'color: #004E89; font-size: 14px; font-weight: bold;');
});

// ==================== FLOATING NAVBAR ====================
function initFloatingNav() {
    const mobileBurger = document.getElementById('mobileBurger');
    const mobileNav = document.getElementById('mobileNav');
    const navItems = document.querySelectorAll('.nav-item');
    const mobileItems = document.querySelectorAll('.mobile-item');

    // Mobile menu toggle
    if (mobileBurger) {
        mobileBurger.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileBurger.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
    }

    // Close mobile menu
    document.addEventListener('click', (e) => {
        if (mobileNav && mobileNav.classList.contains('active')) {
            if (!mobileNav.contains(e.target) && !mobileBurger.contains(e.target)) {
                mobileBurger.classList.remove('active');
                mobileNav.classList.remove('active');
            }
        }
    });

    // Mobile link clicks
    mobileItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileBurger.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });

    // Active nav on scroll (desktop)
    if (window.innerWidth >= 1024) {
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// ==================== AOS INIT ====================
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-quad',
            once: true,
            offset: 100
        });
    }
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ==================== LUCIDE ICONS ====================
function initLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// ==================== BACK TO TOP ====================
function initBackToTop() {
    const backTop = document.getElementById('backTop');

    if (backTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backTop.classList.add('visible');
            } else {
                backTop.classList.remove('visible');
            }
        });

        backTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ==================== CONTACT FORM ====================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const company = document.getElementById('company').value.trim();
            const product = document.getElementById('product').value;
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !phone || !product) {
                showNotification('Please fill all required fields', 'error');
                return;
            }

            const whatsappMessage = createWhatsAppMessage(name, email, phone, company, product, message);
            const whatsappURL = `https://api.whatsapp.com/send?phone=919588479681&text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappURL, '_blank');

            showNotification('✅ Redirecting to WhatsApp!', 'success');

            setTimeout(() => {
                contactForm.reset();
            }, 1000);
        });
    }

    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9+]/g, '');
        });
    }
}

function createWhatsAppMessage(name, email, phone, company, product, message) {
    let msg = `*🌾 New Inquiry - GreetWell Group*\n\n`;
    msg += `*Name:* ${name}\n`;
    msg += `*Email:* ${email}\n`;
    msg += `*Phone:* ${phone}\n`;
    if (company) msg += `*Company:* ${company}\n`;
    msg += `*Product:* ${product}\n`;
    if (message) msg += `*Message:* ${message}\n`;
    msg += `\n_Sent from GreetWell Group Website_`;
    return msg;
}

function showNotification(message, type) {
    const notification = document.createElement('div');

    const icons = {
        success: '✅',
        error: '❌'
    };

    const colors = {
        success: 'linear-gradient(135deg, #10B981, #059669)',
        error: 'linear-gradient(135deg, #EF4444, #DC2626)'
    };

    notification.innerHTML = `${icons[type]} ${message}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${colors[type]};
        color: white;
        padding: 20px 35px;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.5s ease, slideOut 0.5s ease 2.5s;
    `;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
}

// ==================== PAGE VISIBILITY ====================
document.addEventListener('visibilitychange', () => {
    document.title = document.hidden 
        ? '👋 Come Back! - GreetWell Group' 
        : 'GreetWell Group | Your Growth Partner in Agri-Commodities';
});

// ==================== PERFORMANCE ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== ORIENTATION CHANGE ====================
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        if (typeof lucide !== 'undefined') lucide.createIcons();
        if (typeof AOS !== 'undefined') AOS.refresh();
    }, 300);
});

console.log('✅ GreetWell Group website initialized!');