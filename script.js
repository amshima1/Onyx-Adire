document.addEventListener("DOMContentLoaded", () => {
    
    // Feature 1: Dynamic Greeting
    const welcomeMsg = document.getElementById("welcome-text");
    const hour = new Date().getHours();
    
    if (welcomeMsg) {
        if (hour < 12) welcomeMsg.textContent = "Good Morning, Welcome to Onyx & Adire";
        else if (hour < 18) welcomeMsg.textContent = "Good Afternoon, Explore our Collections";
        else welcomeMsg.textContent = "Good Evening, Shop the Night Edit";
    }

    // Feature 2: Form Handling
    const form = document.getElementById("appointment-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            document.getElementById("booking-area").innerHTML = `
                <div style="padding: 50px;">
                    <h2 style="color: #c5a059;">Inquiry Received!</h2>
                    <p>Thank you, ${name}. Our team will contact you shortly.</p>
                    <br>
                    <a href="index.html" style="color: #1a1a1a; font-weight: bold;">Back to Home</a>
                </div>
            `;
        });
    }
});
// Function to open the hamburger menu
document.getElementById("hamburger-btn").addEventListener("click", () => {
    document.getElementById("mobile-menu").style.width = "250px";
});

// Function to close the hamburger menu
document.getElementById("close-btn").addEventListener("click", () => {
    document.getElementById("mobile-menu").style.width = "0";
});

