// JavaScript for Onyx-Adire
document.addEventListener("DOMContentLoaded", () => {
    // Feature 1: Toggle Red Mode (Example of DOM Manipulation)
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', () => {
        alert("Onyx-Adire: Redefining Nigerian Heritage in Red.");
    });

    // Feature 2: Appointment Form Logic
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.onsubmit = (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            document.getElementById('formResponse').innerText = `Thank you, ${name}. Your appointment is being processed!`;
        };
    }
});
