document.addEventListener('DOMContentLoaded', () => {
    
    lucide.createIcons();

    /* Cinematic Intro Scroll */
    let isAutoScrolling = false;
    function startCinematicScroll() {
        const contactSection = document.getElementById('contact');
        if (!contactSection) return;
        isAutoScrolling = true;
        const scrollSpeed = 0.5; // Very slow and cinematic
        function scrollStep() {
            if (!isAutoScrolling) return;
            window.scrollBy(0, scrollSpeed);
            const contactTop = contactSection.getBoundingClientRect().top;
            if (contactTop <= 100 || (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                stopCinematicScroll();
            } else {
                requestAnimationFrame(scrollStep);
            }
        }
        requestAnimationFrame(scrollStep);
    }
    function stopCinematicScroll() { isAutoScrolling = false; }
    setTimeout(startCinematicScroll, 4000);
    ['mousedown', 'wheel', 'touchstart', 'keydown'].forEach(evt => {
        window.addEventListener(evt, stopCinematicScroll, { passive: true, once: true });
    });


    
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
                headers: {
                    'Accept': 'application/json'
                }
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
                } else {
                    throw new Error('Transmission Failed');
                }
            })
            .catch(error => {
                btn.innerHTML = 'Transmission Failed';
                btn.style.background = '#dc2626';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 5000);
            });
        });
    }


    
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