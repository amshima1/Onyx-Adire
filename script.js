document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('close-btn');

    // Open Menu
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.style.display = 'block';
        });
    }

    // Close Menu
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            mobileMenu.style.display = 'none';
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    
    // --- FEATURE 1: Home Page Scroll Fade-in ---
    const faders = document.querySelectorAll('.grid-item');
    const appearOptions = { 
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px" 
    };

    if (faders.length > 0) {
        const appearOnScroll = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            });
        }, appearOptions);

        faders.forEach(fader => appearOnScroll.observe(fader));
    }

    // --- FEATURE 2: Mobile Menu Toggle (Already in your index.html) ---
    const menuBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('close-btn');

    if (menuBtn && mobileMenu) {
        menuBtn.onclick = () => mobileMenu.style.display = 'block';
        if (closeBtn) closeBtn.onclick = () => mobileMenu.style.display = 'none';
    }
});
