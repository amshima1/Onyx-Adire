/**
 * Onyx—Adire Official Site Script
 * Logic: Dynamic Navigation, Full-Image Modals, and Orange WhatsApp CTA
 */

// 1. NAVIGATION CONTROL (White Menu Logic)
function toggleNav() {
    const sideNav = document.getElementById("mySidenav");
    const overlay = document.getElementById("overlay");
    const header = document.getElementById("main-header");
    
    // Calculate header height so the menu starts EXACTLY below the logo
    const headerHeight = header.offsetHeight;
    sideNav.style.top = headerHeight + "px";

    if (sideNav.style.width === "280px") {
        closeNav();
    } else {
        sideNav.style.width = "280px";
        if (overlay) overlay.style.display = "block";
        // Lock background scroll to keep the focus on the menu
        document.body.style.overflow = "hidden"; 
    }
}

function closeNav() {
    const sideNav = document.getElementById("mySidenav");
    const overlay = document.getElementById("overlay");
    
    sideNav.style.width = "0";
    if (overlay) overlay.style.display = "none";
    document.body.style.overflow = "auto";
}

// 2. PRODUCT MODAL (Full Picture Popup)
function openProduct(name, price, img) {
    const modal = document.getElementById('productModal');
    const modalImg = document.getElementById('modalImg');
    const modalName = document.getElementById('modalName');
    const modalPrice = document.getElementById('modalPrice');
    
    // Set Image and Content
    modalImg.src = img;
    // Double-ensure full display in the popup
    modalImg.style.objectFit = "contain"; 
    
    modalName.innerText = name;
    modalPrice.innerText = price;

    // Configure the "Order Now" Button inside the popup
    const orderBtn = document.querySelector('.order-btn');
    const myNumber = "234XXXXXXXXXX"; // REPLACE with your actual WhatsApp number
    const message = encodeURIComponent(`Hello Onyx—Adire, I'm interested in the ${name} (${price}). Is it available for order?`);
    
    orderBtn.onclick = () => {
        window.open(`https://wa.me/${myNumber}?text=${message}`, '_blank');
    };

    // Show Modal
    modal.style.display = "block";
    document.body.style.overflow = "hidden";

    // Track for Recently Viewed
    saveToRecent(name, img);
}

function closeModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = "none";
    
    // Only re-enable scroll if the side menu is ALSO closed
    if (document.getElementById("mySidenav").style.width !== "280px") {
        document.body.style.overflow = "auto";
    }
}

// 3. RECENTLY VIEWED (Full Image Handling)
function saveToRecent(name, img) {
    // Only save valid Onyx-Adire product images
    if (!img.toLowerCase().includes('onyx-adire')) return;

    let items = JSON.parse(localStorage.getItem('onyx_recent_v6')) || [];
    const exists = items.find(i => i.name === name);

    if (!exists) {
        items.unshift({ name, img });
        if (items.length > 2) items.pop(); // Keep it clean with 2 items
        localStorage.setItem('onyx_recent_v6', JSON.stringify(items));
        renderRecent();
    }
}

function renderRecent() {
    const items = JSON.parse(localStorage.getItem('onyx_recent_v6')) || [];
    const section = document.getElementById('recent-section');
    const grid = document.getElementById('recent-grid');

    if (items.length === 0) {
        if (section) section.style.display = "none";
        return;
    }

    if (section) section.style.display = "block";
    if (grid) {
        grid.innerHTML = items.map(item => `
            <div class="gallery-card" onclick="openProduct('${item.name}', 'View Piece', '${item.img}')">
                <img src="${item.img}" style="height: 150px; width: 100%; object-fit: contain; background: #fff;">
                <div class="card-info">
                    <span class="item-name" style="font-size: 10px;">${item.name}</span>
                </div>
            </div>
        `).join('');
    }
}

// 4. GLOBAL CLICK EVENTS
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    const overlay = document.getElementById('overlay');
    
    if (event.target == modal) closeModal();
    if (event.target == overlay) closeNav();
};

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    renderRecent();
    
    // Fix: Force the Orange WhatsApp button to stay visible above everything
    const whatsapp = document.querySelector('.whatsapp-float');
    if (whatsapp) {
        whatsapp.style.zIndex = "5000";
    }
});
