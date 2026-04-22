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


    /* Cinematic Autoscroll Intro (One-time) */
    let isAutoScrolling = false;
    const startIntroTour = () => {
        const contactSection = document.getElementById('contact');
        if (!contactSection) return;
        
        window.scrollTo({ top: 0, behavior: 'instant' });
        isAutoScrolling = true;
        const scrollSpeed = 1.25; 
        
        const step = () => {
            if (!isAutoScrolling) return;
            window.scrollBy(0, scrollSpeed);
            
            const contactTop = contactSection.getBoundingClientRect().top;
            const isAtBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 80);
            
            if (contactTop <= 60 || isAtBottom) {
                isAutoScrolling = false;
            } else {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);

        // ONLY start listening for stops AFTER the scroll has begun
        setTimeout(() => {
            const stopTour = () => { isAutoScrolling = false; };
            ['mousedown', 'wheel', 'touchstart', 'keydown'].forEach(evt => {
                window.addEventListener(evt, stopTour, { passive: true, once: true });
            });
        }, 100);
    };

    setTimeout(startIntroTour, 4000);



    // Stable Intersection Observer for Reveals
    const observerOptions = { threshold: 0.05 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
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