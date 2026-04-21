document.addEventListener('DOMContentLoaded', () => {
    
    lucide.createIcons();

    // Scroll Progress & Navbar Effect
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
    
    // Form AJAX Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = document.getElementById('submit-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Transmitting...';
            btn.disabled = true;

            const formData = new FormData(contactForm);
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    btn.innerHTML = 'Securely Sent!';
                    btn.style.background = '#059669';
                    contactForm.reset();
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 5000);
                } else { throw new Error(); }
            })
            .catch(() => {
                btn.innerHTML = 'Failed';
                btn.style.background = '#dc2626';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 5000);
            });
        });
    }

    // Stable Reveal Logic
    const reveal = () => {
        const sections = document.querySelectorAll('section, .glass-card');
        sections.forEach(s => {
            const top = s.getBoundingClientRect().top;
            if (top < window.innerHeight - 100) {
                s.style.opacity = '1';
                s.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for reveal
    document.querySelectorAll('section:not(.hero-section), .glass-card').forEach(s => {
        s.style.opacity = '0';
        s.style.transform = 'translateY(20px)';
        s.style.transition = '0.8s ease-out';
    });
    
    window.addEventListener('scroll', reveal);
    reveal(); // Run once on load
});

const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });
}

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