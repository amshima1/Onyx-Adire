document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Logic
    const menuBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('close-btn');

    if (menuBtn && mobileMenu) {
        menuBtn.onclick = () => mobileMenu.style.display = 'flex';
        closeBtn.onclick = () => mobileMenu.style.display = 'none';
    }

    // 2. Scroll Animation for the 10 Images
    const items = document.querySelectorAll('.grid-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease-out';
        observer.observe(item);
    });
});
