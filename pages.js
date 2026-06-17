// pages.js – Shared JavaScript for all separate page files

document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // BODY FADE-IN on every page load
    // =============================================
    document.body.style.opacity = '1';

    // =============================================
    // 1. PRELOADER
    // =============================================
    const preloader = document.getElementById('preloader');

    function hidePreloader() {
        if (!preloader) return;
        setTimeout(() => {
            preloader.classList.add('hide');
            setTimeout(() => {
                preloader.style.display = 'none';
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
            }, 700);
        }, 1400);
    }

    hidePreloader();

    // =============================================
    // AOS INITIALIZATION for all pages
    // =============================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 60,
            easing: 'ease-out-cubic',
            disable: false,
            mirror: false,
            startEvent: 'DOMContentLoaded'
        });
    } else {
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
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 2500);

    // =============================================
    // 2. NAVBAR — scroll shrink
    // =============================================
    const navbar = document.getElementById('navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
                navbar.style.background = 'rgba(20,20,20,0.99)';
            } else {
                navbar.style.boxShadow = '';
                navbar.style.background = 'rgba(26,26,26,0.97)';
            }
        });
    }

    // =============================================
    // 3. MOBILE MENU - FIXED FOR ALL PAGES
    // =============================================
    function initMobileMenu() {
        const mobileToggle = document.getElementById('mobile-menu-toggle-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (!mobileToggle || !navLinks) return;
        
        // Remove any existing inline styles that might hide the menu
        navLinks.style.display = '';
        navLinks.style.position = '';
        navLinks.style.top = '';
        navLinks.style.left = '';
        navLinks.style.right = '';
        navLinks.style.bottom = '';
        navLinks.style.width = '';
        navLinks.style.height = '';
        navLinks.style.background = '';
        navLinks.style.zIndex = '';
        navLinks.style.padding = '';
        navLinks.style.flexDirection = '';
        navLinks.style.gap = '';
        navLinks.style.overflowY = '';
        navLinks.style.overflowX = '';
        
        // Ensure the menu is hidden by default on mobile
        if (window.innerWidth <= 992) {
            navLinks.classList.remove('show');
            navLinks.style.display = 'none';
        }
        
        function openMenu() {
            // Save current scroll position
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100%';
            document.body.dataset.scrollY = scrollY;
            document.body.classList.add('menu-open');
            
            // Force menu to display and fill screen
            navLinks.style.display = 'flex !important';
            navLinks.style.display = 'flex';
            navLinks.style.position = 'fixed';
            navLinks.style.top = '72px';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.bottom = '0';
            navLinks.style.width = '100%';
            navLinks.style.height = 'calc(100vh - 72px)';
            navLinks.style.background = 'rgba(26, 26, 26, 0.99)';
            navLinks.style.backdropFilter = 'blur(10px)';
            navLinks.style.WebkitBackdropFilter = 'blur(10px)';
            navLinks.style.zIndex = '9999';
            navLinks.style.padding = '1.5rem';
            navLinks.style.flexDirection = 'column';
            navLinks.style.gap = '0.3rem';
            navLinks.style.overflowY = 'auto';
            navLinks.style.overflowX = 'hidden';
            navLinks.style.borderTop = '1px solid rgba(212, 175, 55, 0.15)';
            navLinks.style.WebkitOverflowScrolling = 'touch';
            navLinks.style.overscrollBehavior = 'contain';
            
            // Make sure all nav links are visible
            navLinks.querySelectorAll('.nav-link').forEach(link => {
                link.style.display = 'block';
                link.style.width = '100%';
                link.style.padding = '0.8rem 1.2rem';
                link.style.fontSize = '1rem';
                link.style.textAlign = 'center';
                link.style.borderBottom = '1px solid rgba(255, 255, 255, 0.06)';
                link.style.color = 'rgba(255, 255, 255, 0.85)';
                link.style.borderRadius = '4px';
            });
        }
        
        function closeMenu() {
            // Restore scrolling
            const scrollY = parseInt(document.body.dataset.scrollY || '0');
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            document.body.style.height = '';
            document.body.classList.remove('menu-open');
            window.scrollTo(0, scrollY);
            
            // Hide menu
            navLinks.style.display = 'none';
            navLinks.style.position = '';
            navLinks.style.top = '';
            navLinks.style.left = '';
            navLinks.style.right = '';
            navLinks.style.bottom = '';
            navLinks.style.width = '';
            navLinks.style.height = '';
            navLinks.style.background = '';
            navLinks.style.backdropFilter = '';
            navLinks.style.WebkitBackdropFilter = '';
            navLinks.style.zIndex = '';
            navLinks.style.padding = '';
            navLinks.style.flexDirection = '';
            navLinks.style.gap = '';
            navLinks.style.overflowY = '';
            navLinks.style.overflowX = '';
            navLinks.style.borderTop = '';
            navLinks.style.WebkitOverflowScrolling = '';
            navLinks.style.overscrollBehavior = '';
            
            // Reset nav links styles
            navLinks.querySelectorAll('.nav-link').forEach(link => {
                link.style.display = '';
                link.style.width = '';
                link.style.padding = '';
                link.style.fontSize = '';
                link.style.textAlign = '';
                link.style.borderBottom = '';
                link.style.color = '';
                link.style.borderRadius = '';
            });
        }
        
        // Toggle button click
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = navLinks.classList.contains('show');
            
            if (isOpen) {
                navLinks.classList.remove('show');
                const icon = this.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
                closeMenu();
            } else {
                navLinks.classList.add('show');
                const icon = this.querySelector('i');
                if (icon) icon.className = 'fas fa-times';
                openMenu();
            }
        });

        // Close menu on link click
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('show');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
                closeMenu();
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('show')) {
                const isClickInside = navLinks.contains(e.target) || mobileToggle.contains(e.target);
                if (!isClickInside) {
                    navLinks.classList.remove('show');
                    const icon = mobileToggle.querySelector('i');
                    if (icon) icon.className = 'fas fa-bars';
                    closeMenu();
                }
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 992 && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
                closeMenu();
            }
        });
    }

    // Initialize mobile menu
    initMobileMenu();

    // =============================================
    // 4. BACK TO TOP BUTTON
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
    // 5. NEWSLETTER SUBSCRIPTION
    // =============================================
    const newsletterForms = document.querySelectorAll('#newsletter-form, .newsletter-form, .newsletter-inline');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input[type="email"]');
            if (input && input.value.trim() !== '') {
                localStorage.setItem('stackly_email', input.value.trim());
                alert('✅ Thank you for subscribing! You will receive our latest updates.');
                input.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    });

    document.querySelectorAll('.newsletter-inline button[type="submit"], .newsletter-form button[type="submit"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const form = this.closest('form');
            if (form) {
                e.preventDefault();
                const input = form.querySelector('input[type="email"]');
                if (input && input.value.trim() !== '') {
                    localStorage.setItem('stackly_email', input.value.trim());
                    alert('✅ Thank you for subscribing! You will receive our latest updates.');
                    input.value = '';
                } else {
                    alert('Please enter a valid email address.');
                }
            }
        });
    });

    // =============================================
    // 6. PAGE TRANSITIONS & 404 HANDLING
    // =============================================
    const validPages = [
        'index.html', 'about.html', 'menu.html', 'gallery.html', 
        'reservations.html', 'blog.html', 'contact.html', 
        'login.html', 'signup.html', 'dashboard.html', 'admin.html'
    ];

    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        
        if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('//')) {
            return;
        }

        if (link.closest('.payment-badge') || link.closest('.social-icon-mini') || link.closest('.social-icon')) {
            return;
        }

        link.addEventListener('click', function(e) {
            const targetHref = this.getAttribute('href');
            
            const isValidPage = validPages.some(page => targetHref === page || targetHref.endsWith('/' + page));
            
            if (!isValidPage && !targetHref.endsWith('.html')) {
                e.preventDefault();
                window.location.href = '404.html';
                return;
            }

            if (isValidPage || targetHref.endsWith('.html')) {
                e.preventDefault();
                document.body.classList.add('page-exit');
                setTimeout(() => {
                    window.location.href = targetHref;
                }, 280);
            }
        });
    });

    // =============================================
    // 7. PAYMENT BADGES AND SOCIAL ICONS
    // =============================================
    document.querySelectorAll('.payment-badge, .social-icon-mini, .social-icon').forEach(el => {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = '404.html';
        });
    });

    document.querySelectorAll('footer a[href="#"]').forEach(el => {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = '404.html';
        });
    });

    // =============================================
    // 8. FOOTER LOGO CLICK - Redirect to Home
    // =============================================
    document.querySelectorAll('.footer-logo').forEach(el => {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    });

    // =============================================
    // 9. EMAIL STORAGE IN LOCALSTORAGE
    // =============================================
    document.querySelectorAll('form input[type="email"]').forEach(emailInput => {
        const form = emailInput.closest('form');
        if (form) {
            form.addEventListener('submit', function(e) {
                const email = emailInput.value.trim();
                if (email) {
                    localStorage.setItem('stackly_email', email);
                }
            });
        }
    });

    document.querySelectorAll('.newsletter-inline-input, .newsletter-input').forEach(input => {
        input.addEventListener('change', function() {
            const email = this.value.trim();
            if (email) {
                localStorage.setItem('stackly_email', email);
            }
        });
    });

    // =============================================
    // 10. REFRESH AOS ON PAGE LOAD
    // =============================================
    if (typeof AOS !== 'undefined') {
        setTimeout(() => {
            AOS.refresh();
        }, 500);
    }

});