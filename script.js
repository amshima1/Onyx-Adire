document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. NAVIGATION MENU (Hamburger) ---
    // Works on every page with the 3-line icon
    const menuBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-btn');

    if (menuBtn && mobileMenu) {
        menuBtn.onclick = () => {
            mobileMenu.style.display = 'block';
        };
        if (closeMenu) {
            closeMenu.onclick = () => {
                mobileMenu.style.display = 'none';
            };
        }
    }

    // --- 2. HOME PAGE: Scroll Fade-In Animation ---
    // Makes product cards slide up as you scroll
    const faders = document.querySelectorAll('.grid-item');
    if (faders.length > 0) {
        const appearOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const appearOnScroll = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            });
        }, appearOptions);

        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });
    }

    // --- 3. PRODUCT PAGE: WhatsApp Order Logic ---
    // Automatically creates a message based on the dress name
    const buyBtn = document.querySelector('.buy-now-btn');
    if (buyBtn) {
        buyBtn.onclick = function() {
            const productName = document.querySelector('h1').innerText;
            const price = document.querySelector('.product-price').innerText;
            const phone = "234XXXXXXXXXX"; // REPLACe WITH YOUR ACTUAL NUMBER
            
            const message = `Hello Onyx & Adire, I'm interested in the ${productName} (${price}). Is it available?`;
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            
            window.open(url, '_blank');
        };
    }

    // --- 4. GALLERY/MODAL: Image Enlarger ---
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("imgFull");
    if (modal) {
        const images = document.querySelectorAll('.grid-item img');
        images.forEach(img => {
            img.onclick = function() {
                modal.style.display = "block";
                modalImg.src = this.src;
            };
        });

        // Close modal when clicking the 'X' or outside the image
        window.onclick = (event) => {
            if (event.target == modal) modal.style.display = "none";
        };
    }
});
