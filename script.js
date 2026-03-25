/**
 * Onyx—Adire Navigation Logic
 * Handles the GitHub-style side drawer and background overlay
 */

function toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const body = document.body;

    // 1. Toggle the 'active' class on the menu drawer and the dimming overlay
    sideMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');

    // 2. Prevent the background from scrolling when the menu is open
    // This is a standard UX practice for mobile side-drawers
    if (sideMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
}

// 3. Optional: Close the menu automatically if a link inside is clicked
// Useful for one-page sections (e.g., jumping to #collections)
document.querySelectorAll('.menu-links a').forEach(link => {
    link.addEventListener('click', () => {
        const sideMenu = document.getElementById('sideMenu');
        if (sideMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// 4. Accessibility: Close menu if the 'Escape' key is pressed
document.addEventListener('keydown', (e) => {
    const sideMenu = document.getElementById('sideMenu');
    if (e.key === 'Escape' && sideMenu.classList.contains('active')) {
        toggleMenu();
    }
});
