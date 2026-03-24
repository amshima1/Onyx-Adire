/**
 * Onyx-Adire: International Luxury Edition
 * JavaScript for DOM Manipulation and Interactive Features
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SELECTING DOM ELEMENTS
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const body = document.body;

    // 2. FEATURE: LEFT-SIDE HAMBURGER TOGGLE
    // This satisfies the "JavaScript Features" and "DOM Manipulation" requirements.
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (event) => {
            // Stop the click from bubbling up to the document
            event.stopPropagation();
            
            // Toggle the 'active' class defined in style.css
            navLinks.classList.toggle('active');
            
            // Optional: Animate the hamburger lines (Visual feedback)
            console.log("International Menu Toggled: " + (navLinks.classList.contains('active') ? "Open" : "Closed"));
        });

        // Close menu if clicking anywhere else on the page
        document.addEventListener('click', (event) => {
            if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
                navLinks.classList.remove('active');
            }
        });
    }

    // 3. FEATURE: DYNAMIC ROMANTIC GREETING
    // Automatically changes the welcome message in the console or a specific div
    const hour = new Date().getHours();
    let welcomeMessage;

    if (hour < 12) welcomeMessage = "Bonjour. Start your morning with Onyx-Adire luxury.";
    else if (hour < 18) welcomeMessage = "Good Afternoon. Discover our latest international collection.";
    else welcomeMessage = "Good Evening. Experience the romance of the Crimson Legacy.";

    console.log("%c" + welcomeMessage, "color: #9e1b32; font-style: italic; font-size: 14px;");

    // 4. FEATURE: SCROLL EFFECT (FOR STYLISH ALPHABET)
    // Shrinks the navbar slightly when scrolling to keep the "Stylish" look clean
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.padding = "15px 5%";
            nav.style.backgroundColor = "rgba(255, 252, 245, 0.95)"; // Champagne with slight transparency
        } else {
            nav.style.padding = "30px 5%";
            nav.style.backgroundColor = "#fffcf5";
        }
    });

    // 5. FEATURE: APPOINTMENT FORM VALIDATION
    // This logic handles the "Inquiries and Appointments" page requirement
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            alert(`Merci, ${name}. Your private consultation at the Onyx-Adire Atelier is being scheduled.`);
            bookingForm.reset();
        });
    }
});
