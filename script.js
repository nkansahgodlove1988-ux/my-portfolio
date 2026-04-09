document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Scroll Progress bar
    const scrollProgress = document.querySelector('.scroll-progress');

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (scrollProgress) scrollProgress.style.width = scrolled + "%";
        
        const nav = document.getElementById('main-nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(2, 6, 23, 0.95)';
            nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        } else {
            nav.style.background = 'rgba(2, 6, 23, 0.9)';
            nav.style.boxShadow = 'none';
        }
    });

    // Form submission feedback
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.innerHTML = 'Sending... <i data-lucide="loader" class="spin"></i>';
            lucide.createIcons();
            
            // Simulate sending
            setTimeout(() => {
                btn.innerHTML = 'Message Sent! <i data-lucide="check-circle"></i>';
                btn.style.background = '#22c55e';
                lucide.createIcons();
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    lucide.createIcons();
                }, 3000);
            }, 1500);
        });
    }

    // Scroll reveal animations
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section:not(.hero-section), .glass-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = '0.8s ease-out';
        observer.observe(el);
    });
});

function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function openTerms() {
    document.getElementById('terms-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeTerms(e) {
    document.getElementById('terms-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        // Toggle between menu and close icon
        if (navLinks.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-btn').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        }
    });
});