/**
 * ONYX-ADIRE MASTER SCRIPT
 * Handles Navigation, Live Clock, Image Lightbox, and Gallery Shuffling.
 */

// 1. MOBILE NAVIGATION MENU
// Toggles the 'active' class on the menu-links div
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    } else {
        console.error("Navigation menu ID 'nav-menu' not found.");
    }
}

// 2. LIVE CLOCK FUNCTION
// Updates the clock in the footer every second
function updateClock() {
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit', 
            hour12: false 
        });
        clockElement.textContent = timeString;
    }
}

// 3. IMAGE LIGHTBOX (WIDE VIEW)
// Opens the modal and sets the source to the clicked image
function openModal(src) {
    const modal = document.getElementById('imageModal');
    const fullImg = document.getElementById('fullImage');
    if (modal && fullImg) {
        modal.style.display = "flex";
        fullImg.src = src;
    }
}

// Closes the modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = "none";
    }
}

// 4. GALLERY RANDOMIZER (SHUFFLE)
// Mixes the order of product cards for a fresh look
function shuffleGallery() {
    const galleryGrid = document.querySelector('.product-grid');
    if (!galleryGrid) return;

    // Convert children to an array
    const cards = Array.from(galleryGrid.children);

    // Fisher-Yates Shuffle Algorithm
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    // Re-append to the grid in new order
    galleryGrid.innerHTML = '';
    cards.forEach(card => galleryGrid.appendChild(card));
}

// 5. INITIALIZATION ON PAGE LOAD
document.addEventListener('DOMContentLoaded', () => {
    // Start the clock immediately
    updateClock();
    setInterval(updateClock, 1000);

    // Run shuffle ONLY if we are on the Showcase/Gallery page
    // This checks the URL for 'gallery.html'
    if (window.location.pathname.includes('gallery.html')) {
        shuffleGallery();
    }

    // Attach click events to all images inside product cards for Wide View
    const images = document.querySelectorAll('.product-card img');
    images.forEach(img => {
        img.addEventListener('click', () => {
            openModal(img.src);
        });
    });

    // Close mobile menu automatically if a link is clicked
    const navLinks = document.querySelectorAll('.menu-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.getElementById('nav-menu');
            if (navMenu) navMenu.classList.remove('active');
        });
    });
});
