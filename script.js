// Feature: DOM Clock for all Footers
function updateClock() {
    const clockElement = document.getElementById('footer-date');
    if (clockElement) {
        const now = new Date();
        clockElement.innerText = now.toLocaleString();
    }
}
setInterval(updateClock, 1000);

// Feature: Smooth Scroll Reveal
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.card');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
    });
});

// Form Logic
const bForm = document.getElementById('bookingForm');
if(bForm) {
    bForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Onyx-Adire has received your request. We will reach out shortly!");
    });
}
const bigMarquee = document.querySelector('marquee');

if (bigMarquee) {
    bigMarquee.addEventListener('mouseover', () => {
        bigMarquee.scrollAmount = 20; // Speed up on hover
    });

    bigMarquee.addEventListener('mouseout', () => {
        bigMarquee.scrollAmount = 12; // Normal speed
    });
}
