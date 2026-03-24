// JavaScript for Onyx-Adire: Left Hamburger Feature
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    // JS Feature: Toggle Menu Visibility
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Optional: Console log for debugging DOM action
        console.log("Navigation menu state: " + (navLinks.classList.contains('active') ? "Open" : "Closed"));
    });

    // Close menu if user clicks a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
});
