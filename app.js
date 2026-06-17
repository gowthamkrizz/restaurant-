// app.js – Dedicated JavaScript for Stackly Restaurant Home Page (index.html)

document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // 1. AOS INITIALIZATION
    // =============================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 60,
            easing: 'ease-out-cubic',
            disable: false,
        });
    } else {
        // Fallback if AOS JS is not loaded: make all elements immediately visible
        const aosElements = document.querySelectorAll('[data-aos]');
        aosElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

    // Safety fallback: force visibility after preloader hides if AOS fails to trigger
    setTimeout(() => {
        const aosElements = document.querySelectorAll('[data-aos]');
        aosElements.forEach(el => {
            const style = window.getComputedStyle(el);
            if (style.opacity === '0') {
                el.style.opacity = '1';
                el.style.transform = 'none';
                el.style.transition = 'none';
            }
        });
    }, 2500);

    // =============================================
    // 2. PRELOADER
    // =============================================
    const preloader = document.getElementById('preloader');
    
    // Fade out preloader after 1.5 seconds
    setTimeout(() => {
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.visibility = 'hidden';
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
                checkStatsScroll(); // Check if stats are in viewport on load
            }, 800);
        }
    }, 1500);

    // =============================================
    // 3. NAVBAR scroll shrink + mobile toggle
    // =============================================
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
                navbar.style.background = 'rgba(20,20,20,0.99)';
            } else {
                navbar.style.boxShadow = '';
                navbar.style.background = 'rgba(26,26,26,0.95)';
            }
        });
    }

   // =============================================
// MOBILE MENU - WORKS ON HOME PAGE
// =============================================
const mobileMenuToggle = document.getElementById('mobile-menu-toggle-btn');
const navLinksContainer = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinksContainer) {
    // Remove existing listeners by cloning
    const newToggle = mobileMenuToggle.cloneNode(true);
    mobileMenuToggle.parentNode.replaceChild(newToggle, mobileMenuToggle);
    
    const newNavLinks = navLinksContainer.cloneNode(true);
    navLinksContainer.parentNode.replaceChild(newNavLinks, navLinksContainer);
    
    // Get fresh references
    const freshToggle = document.getElementById('mobile-menu-toggle-btn');
    const freshNavLinks = document.querySelector('.nav-links');
    
    if (freshToggle && freshNavLinks) {
        function openMenuHome() {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100%';
            document.body.dataset.scrollY = scrollY;
            document.body.classList.add('menu-open');
            
            freshNavLinks.style.maxHeight = 'calc(100vh - 72px)';
            freshNavLinks.style.overflowY = 'auto';
            freshNavLinks.style.overflowX = 'hidden';
            freshNavLinks.style.webkitOverflowScrolling = 'touch';
        }
        
        function closeMenuHome() {
            const scrollY = parseInt(document.body.dataset.scrollY || '0');
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            document.body.style.height = '';
            document.body.classList.remove('menu-open');
            window.scrollTo(0, scrollY);
            
            freshNavLinks.style.maxHeight = '';
            freshNavLinks.style.overflowY = '';
            freshNavLinks.style.overflowX = '';
            freshNavLinks.style.webkitOverflowScrolling = '';
        }
        
        freshToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = freshNavLinks.classList.toggle('show');
            const icon = this.querySelector('i');
            if (icon) {
                icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
            }
            
            if (isOpen) {
                openMenuHome();
            } else {
                closeMenuHome();
            }
        });

        freshNavLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                freshNavLinks.classList.remove('show');
                const icon = freshToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
                closeMenuHome();
            });
        });
    }
}
    // =============================================
    // 4. STATS COUNTER ANIMATION
    // =============================================
    const statsSection = document.getElementById('stats-section');
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    function runCounters() {
        if (countersAnimated) return;
        countersAnimated = true;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const stepTime = 16; // approx 60fps
            const increment = target / (duration / stepTime);
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    setTimeout(updateCounter, stepTime);
                } else {
                    counter.innerText = target + (target > 1000 ? '+' : '');
                    counter.classList.add('counted');
                    setTimeout(() => counter.classList.remove('counted'), 500);
                }
            };
            updateCounter();
        });
    }

    function checkStatsScroll() {
        if (!statsSection) return;
        const rect = statsSection.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        
        // Trigger counters when stats section is 80% visible in viewport
        if (!(rect.bottom < 0 || rect.top - viewHeight >= -100)) {
            runCounters();
        }
    }

    window.addEventListener('scroll', checkStatsScroll);

    // =============================================
    // 5. SPECIAL OFFER COUNTDOWN TIMER
    // =============================================
    function initCountdown() {
        let targetDate = localStorage.getItem('special_offer_target');
        if (!targetDate) {
            targetDate = new Date().getTime() + (4 * 24 * 60 * 60 * 1000) + (6 * 60 * 60 * 1000); 
            localStorage.setItem('special_offer_target', targetDate);
        } else {
            targetDate = parseInt(targetDate);
            if (targetDate < new Date().getTime()) {
                targetDate = new Date().getTime() + (4 * 24 * 60 * 60 * 1000) + (6 * 60 * 60 * 1000);
                localStorage.setItem('special_offer_target', targetDate);
            }
        }
        
        function updateTimer() {
            const now = new Date().getTime();
            const difference = targetDate - now;
            
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            const dEl = document.getElementById('days');
            const hEl = document.getElementById('hours');
            const mEl = document.getElementById('minutes');
            const sEl = document.getElementById('seconds');

            if (dEl && hEl && mEl && sEl) {
                dEl.innerText = String(days).padStart(2, '0');
                hEl.innerText = String(hours).padStart(2, '0');
                mEl.innerText = String(minutes).padStart(2, '0');
                sEl.innerText = String(seconds).padStart(2, '0');
            }
            
            if (difference < 0) {
                clearInterval(interval);
            }
        }
        
        updateTimer();
        const interval = setInterval(updateTimer, 1000);
    }
    
    if (document.getElementById('days')) {
        initCountdown();
    }

    // =============================================
    // 6. RESERVATION FORM - REMOVED conflicting handler
    // =============================================
    // The reservation form on the home page now uses handleHomeReservationSubmit in the inline script
    // This prevents conflicts with the app.js handler

    // =============================================
    // 7. LIGHTBOX FOR GALLERY PREVIEW
    // =============================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryImgs = document.querySelectorAll('.gallery-img');
    const closeBtn = document.querySelector('.lightbox-close');

    if (galleryImgs.length > 0 && lightbox) {
        galleryImgs.forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.remove('hidden');
            });
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.classList.add('hidden');
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.add('hidden');
            }
        });
    }

    // =============================================
    // 8. BACK TO TOP BUTTON
    // =============================================
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            backToTopBtn.classList.toggle('visible', window.scrollY > 400);
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // =============================================
    // 9. SCROLL REVEAL ANIMATION
    // =============================================
    const srElements = document.querySelectorAll(
        '.section-title, .food-card, .chef-card, .feature-card, .category-card, .stat-item'
    );

    srElements.forEach(el => {
        if (!el.hasAttribute('data-aos')) {
            el.classList.add('sr-hidden');
        }
    });

    function checkScrollReveal() {
        srElements.forEach(el => {
            if (el.hasAttribute('data-aos')) return; // AOS handles these
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                el.classList.add('sr-visible');
                el.classList.remove('sr-hidden');
            }
        });
    }

    window.addEventListener('scroll', checkScrollReveal, { passive: true });
    checkScrollReveal();

    // =============================================
    // 10. COUNTER POP ANIMATION (on finish)
    // =============================================
    const originalRunCounters = runCounters;
    document.querySelectorAll('.counter').forEach(counter => {
        const origUpdate = () => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const stepTime = 16;
            const increment = target / (duration / stepTime);
            let current = 0;
            const update = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    setTimeout(update, stepTime);
                } else {
                    counter.innerText = target + (target > 1000 ? '+' : '');
                    counter.classList.add('counted');
                    setTimeout(() => counter.classList.remove('counted'), 500);
                }
            };
            update();
        };
        counter._enhancedUpdate = origUpdate;
    });

    // =============================================
    // 11. FOOD STEAM ANIMATION — inject steam into food-img wrappers
    // =============================================
    document.querySelectorAll('.food-img').forEach(foodImg => {
        const steamWrap = document.createElement('div');
        steamWrap.className = 'steam-wrap';
        for (let i = 0; i < 3; i++) {
            const steam = document.createElement('div');
            steam.className = 'steam';
            steamWrap.appendChild(steam);
        }
        foodImg.appendChild(steamWrap);
    });

});