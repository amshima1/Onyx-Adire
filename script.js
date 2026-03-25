/**
 * Onyx—Adire Official Script
 * Handles: Navigation, Modal Popups, Recently Viewed Persistence, and WhatsApp Orders
 */

// 1. SIDE NAVIGATION (HAMBURGER)
function toggleNav() {
    const sideNav = document.getElementById("mySidenav");
    const overlay = document.getElementById("overlay");
    
    // Check current width to toggle
    if (sideNav.style.width === "280px") {
        sideNav.style.width = "0";
        overlay.style.display = "none";
        document.body.style.overflow = "auto"; // Re-enable scroll
    } else {
        sideNav.style.width = "280px";
        overlay.style.display = "block";
        document.body.style.overflow = "hidden"; // Lock scroll when menu is open
    }
}

// 2. PRODUCT MODAL (POPUP)
function openProduct(name, price, img) {
    const modal = document.getElementById('productModal');
    const modalImg = document.getElementById('modalImg');
    const modalName = document.getElementById('modalName');
    const modalPrice = document.getElementById('modalPrice');
    
    // Update content
    modalImg.src = img;
    modalName.innerText = name;
    modalPrice.innerText = price;

    // Configure WhatsApp Button inside Modal
    const whatsappBtn = document.querySelector('#productModal .subscribe-btn');
    const myNumber = "234XXXXXXXXXX"; // REPLACEME: Your actual WhatsApp number
    const text = encodeURIComponent(`Hello Onyx—Adire, I'm interested in the ${name} (${price}). Is it available?`);
    
    whatsappBtn.onclick = () => {
        window.open(`https://wa.me/${myNumber}?text=${text}`, '_blank');
    };

    // Show Modal & Disable background scroll
    modal.style.display = "block";
    document.body.style.overflow = "hidden";

    // Save this click to "Recently Viewed"
    saveToRecent(name, img);
}

function closeModal() {
    document.getElementById('productModal').style.display = "none";
    document.body.style.overflow = "auto"; // Re-enable scrolling
}

// 3. RECENTLY VIEWED LOGIC
function saveToRecent(name, img) {
    // SECURITY CHECK: Only save if it's a valid Onyx-Adire image 
    // This prevents the "broken" images from your screenshot from saving.
    if (!img.toLowerCase().includes('onyx-adire')) return;

    let items = JSON.parse(localStorage.getItem('onyx_recent_v2')) || [];

    // Check if it's already in the list
    const isDuplicate = items.find(i => i.name === name);

    if (!isDuplicate) {
        // Add to front of list
        items.unshift({ name, img });
        
        // Only keep the most recent 2 items (matching your design)
        if (items.length > 2) items.pop();
        
        localStorage.setItem('onyx_recent_v2', JSON.stringify(items));
        renderRecentSection();
    }
}

function renderRecentSection() {
    const items = JSON.parse(localStorage.getItem('onyx_recent_v2')) || [];
    const section = document.getElementById('recent-section');
    const grid = document.getElementById('recent-grid');

    // If no items, hide the whole section
    if (items.length === 0) {
        if (section) section.style.display = "none";
        return;
    }

    // Show section and build HTML
    if (section) section.style.display = "block";
    if (grid) {
        grid.innerHTML = items.map(item => `
            <div class="gallery-card" onclick="openProduct('${item.name}', 'View Piece', '${item.img}')">
                <img src="${item.img}" style="height: 140px; object-fit: cover; border-radius: 2px;">
                <div class="card-info" style="text-align: center;">
                    <span class="item-name" style="font-size: 10px;">${item.name}</span>
                </div>
            </div>
        `).join('');
    }
}

// 4. INITIALIZE ON LOAD
document.addEventListener('DOMContentLoaded', () => {
    renderRecentSection();
    
    // Close modal if user clicks outside the content box
    window.onclick = function(event) {
        const modal = document.getElementById('productModal');
        const overlay = document.getElementById('overlay');
        if (event.target == modal) closeModal();
        if (event.target == overlay) toggleNav();
    };
});
