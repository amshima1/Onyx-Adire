// DOM Manipulation: Changing the header based on time of day
document.addEventListener("DOMContentLoaded", () => {
    const welcomeMsg = document.getElementById("welcome-text");
    const hour = new Date().getHours();
    
    if (hour < 12) welcomeMsg.textContent = "Good Morning, Welcome to Onyx & Adire";
    else if (hour < 18) welcomeMsg.textContent = "Good Afternoon, Explore our Collections";
    else welcomeMsg.textContent = "Good Evening, Shop the Night Edit";
});
