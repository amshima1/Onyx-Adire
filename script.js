// Wait for the document to fully load
document.addEventListener('DOMContentLoaded', () => {
    
    const menuBtn = document.getElementById('hamburger');
    const menuContent = document.getElementById('navLinks');

    // Check if elements exist to avoid errors
    if (menuBtn && menuContent) {
        menuBtn.addEventListener('click', () => {
            // This toggles the 'active' class we defined in CSS
            menuContent.classList.toggle('active');
            
            // Testing: This will show up in your browser's 'Inspect' console
            console.log("Hamburger clicked! Menu is now active.");
        });
    } else {
        console.error("Missing HTML IDs: Ensure you have id='hamburger' and id='navLinks'");
    }
});
