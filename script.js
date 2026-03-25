/**
 * Onyx—Adire Official Site Engine
 * Optimized for: Full-Image Modals, Random Suggestions, and Side-Menu Layering
 */

// 1. MASTER PRODUCT DATABASE (Ensure filenames match your GitHub folder exactly)
const allProducts = [
    { name: 'Todun Iro & Buba', price: '₦95,000', img: 'Onyx-Adire1.jpg' },
    { name: 'Adesewa Set', price: '₦48,000', img: 'Onyx-Adire2.jpg' },
    { name: 'Asymmetric Tunic', price: '₦42,000', img: 'Onyx-Adire3.jpg' },
    { name: 'Patchwork Tunic', price: '₦38,000', img: 'Onyx-Adire4.jpg' },
    { name: 'Midnight Lace', price: '₦45,000', img: 'Onyx-Adire5.jpg' },
    { name: 'Traditional Agbada', price: '₦120,000', img: 'Onyx-Adire6.jpg' },
    { name: 'Gold Agbada', price: '₦135,000', img: 'Onyx-Adire7.jpg' },
    { name: 'Velvet Caftan', price: '₦85,000', img: 'Onyx-Adire8.jpg' },
    { name: 'Fusion Agbada', price: '₦110,000', img: 'Onyx-Adire9.jpg' },
    { name: 'Boubou Abaya', price: '₦65,000', img: 'Onyx-Adire10.jpg' },
    { name: 'Ebony Silk', price: '₦75,000', img: 'Onyx-Adire11.jpg' },
    { name: 'Geo Boubou', price: '₦58,000', img: 'Onyx-Adire12.jpg' },
    { name: 'Lace Overlay', price: '₦70,000', img: 'Onyx-Adire13.jpg' },
    { name: 'Galaxy Jumpsuit', price: '₦52,000', img: 'Onyx-Adire14.jpg' },
    { name: 'Aso Oke Set', price: '₦150,000', img: 'Onyx-Adire15.jpg' }
];

// 2. NAVIGATION CONTROL (The "Logo-Visible" Logic)
function toggleNav() {
    const sideNav = document.getElementById("mySidenav");
    const overlay = document.getElementById("overlay");
    const header = document.getElementById("main-header");
    
    // Dynamically set the top of the menu to start UNDER the header
    const headerHeight = header.offsetHeight;
    sideNav.style.top = headerHeight + "px";

    if (sideNav.style.width === "280px") {
        closeNav();
    } else {
        sideNav.style.width = "280px";
        overlay.style.display = "block";
        document.body.style.overflow = "hidden"; // Lock scroll
    }
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("overlay").style.display = "none";
    document.body.style.overflow = "auto";
}

// 3. PRODUCT MODAL (Image Fix & Random 4 Suggestions)
function openProduct(name, price, img) {
    const modal = document.getElementById('productModal');
    const modalImg = document.getElementById('modalImg');
    const modalName = document.getElementById('modalName');
    const modalPrice = document.getElementById('modalPrice');
    
    // Fix: Ensure the image source is set correctly to avoid broken icons
    modalImg.src = img;
    modalName.innerText = name;
    modalPrice.innerText = price;

    // Configure WhatsApp Button Message
    const orderBtn = document.querySelector('.order-btn');
    const myNumber = "234XXXXXXXXXX"; // Your WhatsApp Number
    const message = encodeURIComponent(`Hello Onyx—Adire, I am interested in ordering the ${name} (${price}). Is it available?`);
    
    orderBtn.onclick = () => {
        window.open(`https://wa.me/${myNumber}?text=${message}`, '_blank');
    };

    // GENERATE 4 RANDOM SUGGESTIONS
    const suggestions = allProducts
        .filter(p => p.name !== name) // Don't suggest current item
        .sort(() => 0.5 - Math.random()) // Shuffle
        .slice(0, 4); // Pick top 4

    const suggestGrid = document.getElementById('suggestion-grid');
    suggestGrid.innerHTML = suggestions.map(p => `
        <div class="gallery-card" onclick="openProduct('${p.name}', '${p.price}', '${p.img}')" style="cursor:pointer;">
            <img src="${p.img}" style="width:100%; height:130px; object-fit:contain; background:#f9f9f9;">
            <span style="font-size:9px; font-weight:bold; display:block; margin-top:5px;">${p.name}</span>
        </div>
    `).join('');

    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Lock background scroll
    saveToHistory(name, img);
}

function closeModal() {
    document.getElementById('productModal').style.display = "none";
    document.body.style.overflow = "auto";
}

// 4. RECENTLY VIEWED (Random 2 from User History)
function saveToHistory(name, img) {
    let history = JSON.parse(localStorage.getItem('onyx_user_history')) || [];
    // Only add if it's not already in history
    if (!history.find(item => item.name === name)) {
        history.unshift({ name, img });
        localStorage.setItem('onyx_user_history', JSON.stringify(history));
    }
    renderRecent();
}

function renderRecent() {
    const history = JSON.parse(localStorage.getItem('onyx_user_history')) || [];
    const section = document.getElementById('recent-section');
    const grid = document.getElementById('recent-grid');

    if (history.length < 2) return; // Only show if user has seen at least 2 things

    // Pick 2 random items from history to keep the "Look" fresh
    const randomRecent = history.sort(() => 0.5 - Math.random()).slice(0, 2);

    section.style.display = "block";
    grid.innerHTML = randomRecent.map(item => `
        <div class="gallery-card" onclick="openProduct('${item.name}', 'View Piece', '${item.img}')">
            <img src="${item.img}" style="height:180px; width:100%; object-fit:contain; background:#fff;">
            <span class="item-name">${item.name}</span>
        </div>
    `).join('');
}

// 5. GLOBAL INITIALIZATION
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    const overlay = document.getElementById('overlay');
    if (event.target == modal) closeModal();
    if (event.target == overlay) closeNav();
};

document.addEventListener('DOMContentLoaded', renderRecent);
