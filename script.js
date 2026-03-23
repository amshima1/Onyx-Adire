/* --- 1. MOBILE NAVIGATION LOGIC --- */
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    // This toggles the 'active' class defined in your CSS to show/hide the menu
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

/* --- 2. LIVE FOOTER CLOCK --- */
function updateClock() {
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        const now = new Date();
        // Displays time in a clean 24-hour format
        const timeString = now.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: false 
        });
        clockElement.textContent = timeString;
    }
}
// Update the clock every second
setInterval(updateClock, 1000);
updateClock();

/* --- 3. CHATBOT INTERACTION LOGIC --- */
function toggleChat() {
    const chatBody = document.getElementById('chat-body');
    const chatFooter = document.querySelector('.chat-footer');
    const chatIcon = document.getElementById('chat-icon');
    
    if (chatBody && chatFooter) {
        // Switch between hidden and visible states
        if (chatBody.style.display === "none" || chatBody.style.display === "") {
            chatBody.style.display = "block";
            chatFooter.style.display = "flex";
            chatIcon.innerText = "▼";
        } else {
            chatBody.style.display = "none";
            chatFooter.style.display = "none";
            chatIcon.innerText = "▲";
        }
    }
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const chatBody = document.getElementById('chat-body');
    
    if (!input || !chatBody || input.value.trim() === "") return;

    const userText = input.value.trim();

    // Create and append User Message
    const userDiv = document.createElement('div');
    userDiv.className = "message user";
    // Inline styling to ensure it aligns right even if CSS is still loading
    userDiv.style.cssText = "background: #cc0000; color: white; margin: 5px; padding: 10px; border-radius: 8px; align-self: flex-end; text-align: right; margin-left: auto; max-width: 80%;";
    userDiv.innerText = userText;
    chatBody.appendChild(userDiv);

    // Clear input
    input.value = "";

    // Generate Bot Response after a short delay
    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = "message bot";
        botDiv.style.cssText = "background: #f1f1f1; color: #333; margin: 5px; padding: 10px; border-radius: 8px; align-self: flex-start; margin-right: auto; max-width: 80%;";
        
        const lowerText = userText.toLowerCase();

        // Automated responses based on Onyx-Adire's services
        if (lowerText.includes("price") || lowerText.includes("cost") || lowerText.includes("how much")) {
            botDiv.innerText = "Our luxury items generally range from ₦45,000 to ₦150,000. Which specific piece are you eyeing?";
        } else if (lowerText.includes("delivery") || lowerText.includes("shipping")) {
            botDiv.innerText = "We offer nationwide delivery in Nigeria and international shipping for our global clients!";
        } else if (lowerText.includes("bespoke") || lowerText.includes("order")) {
            botDiv.innerText = "For bespoke traditional wear, please click 'Book Appointment' or message us on WhatsApp for measurements.";
        } else {
            botDiv.innerText = "Welcome to Onyx-Adire! A stylist will respond shortly. For immediate help, use the WhatsApp button!";
        }

        chatBody.appendChild(botDiv);
        // Scroll to the latest message
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 600);
}

// Support for 'Enter' key on mobile keyboards
document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('user-input');
    if (userInput) {
        userInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});
