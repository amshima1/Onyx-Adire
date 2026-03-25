/**
 * Onyx—Adire Official Performance Script
 * Handles: Responsive Navigation, Full-Image Modals, and Orange WhatsApp Integration
 */

// 1. NAVIGATION CONTROL (White Menu & Header Priority)
function toggleNav() {
    const sideNav = document.getElementById("mySidenav");
    const overlay = document.getElementById("overlay");
    const header = document.getElementById("main-header");
    
    // Calculate header height so the white menu starts exactly below the logo
    const headerOffset = header.offsetHeight;
    sideNav.style.top = headerOffset + "px";

    if (sideNav.style.width === "280px") {
        closeNav();
    } else {
        sideNav.style.width = "280px";
        overlay.style.display = "block";
        // Lock background scroll but keep header/whatsapp accessible
        document.body.style.overflow = "hidden"; 
    }
}

function closeNav() {
    const sideNav = document.getElementById("mySidenav");
    const overlay = document.getElementById("overlay");
    
    sideNav.style.width = "0";
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
}

// 2. PRODUCT MODAL (Full Picture Popup)
function openProduct(name, price, img) {
    const modal = document.getElementById('productModal');
    const modalImg = document.getElementById('modalImg');
    const modalName = document.getElementById('modalName');
    const modalPrice = document.getElementById('modalPrice');
    
    // Set Content
    modalImg.src = img;
    // Enforce full image display in the popup
    modalImg.style.objectFit = "contain"; 
    
    modalName.innerText = name;
    modalPrice.innerText = price;

    // Configure WhatsApp Order Button
    const orderBtn = document.querySelector('.order-btn');
    const myNumber = "234XXXXXXXXXX"; // REPLACEME: Your actual WhatsApp number
    const message = encodeURIComponent(`Hello Onyx—Adire, I'm interested in ordering the ${name} (${price}). Is this piece available?`);
    
    orderBtn.onclick = () => {
        window.open(`https://wa.me/${myNumber}?text=${message}`, '_blank');
    };

    // Show Modal
    modal.style.display = "block";
    document.body.style.overflow = "hidden";

    // Save to Recently Viewed
    saveToRecent(name, img);
}

function closeModal() {
    document.getElementById('productModal').style.display = "none";
    // Only re-enable scroll if the side menu is also closed
    if (document.getElementById("mySidenav").style.width !== "280px") {
        document.body.style.overflow = "auto";
    }
}

// 3. RECENTLY VIEWED (Logic to avoid broken icons)
function saveToRecent(name, img) {
    // Only save if it's a valid Onyx-Adire product image
    if (!img.toLowerCase().includes('onyx-adire')) return;

    let items = JSON.parse(localStorage.getItem('onyx_recent_v5')) || [];
    const isDuplicate = items.find(i => i.name === name);

    if (!isDuplicate) {
        items.unshift({ name, img });
        if (items.length > 2) items.pop(); // Keep only 2 items for clean mobile UI
        localStorage.setItem('onyx_recent_v5', JSON.stringify(items));
        renderRecent();
    }
}

function renderRecent() {
    const items = JSON.parse(localStorage.getItem('onyx_recent_v5')) || [];
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
                <img src="${item.img}" style="height: 140px; width: 100%; object-fit: contain; background: #fff;">
                <div class="card-info" style="text-align: center;">
                    <span class="item-name" style="font-size: 10px;">${item.name}</span>
                </div>
            </div>
        `).join('');
    }
}

// 4. GLOBAL EVENTS & INITIALIZATION
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    const overlay = document.getElementById('overlay');
    
    if (event.target == modal) closeModal();
    if (event.target == overlay) closeNav();
};

document.addEventListener('DOMContentLoaded', () => {
    renderRecent();
    
    // Ensure the Orange WhatsApp button is always on top
    const whatsapp = document.querySelector('.whatsapp-float');
    if(whatsapp) whatsapp.style.zIndex = "5000";
});
