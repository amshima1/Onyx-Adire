/**
 * Onyx—Adire Official Site Engine
 * Updated: Random Suggestions & Full-Image Display
 */

// Master List for Suggestions (Matches your 16 Items)
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
    { name: 'Aso Oke Set', price: '₦150,000', img: 'Onyx-Adire15.jpg' },
    { name: 'Vibrant Jumpsuit', price: '₦45,000', img: 'Onyx-Adire16.jpg' }
];

// 1. PRODUCT MODAL (Main Display + Random 4)
function openProduct(name, price, img) {
    const modal = document.getElementById('productModal');
    const modalImg = document.getElementById('modalImg');
    const modalName = document.getElementById('modalName');
    const modalPrice = document.getElementById('modalPrice');
    
    modalImg.src = img;
    modalName.innerText = name;
    modalPrice.innerText = price;

    // WhatsApp Configuration
    const orderBtn = document.querySelector('.order-btn');
    const myNumber = "234XXXXXXXXXX"; 
    const message = encodeURIComponent(`Hello Onyx—Adire, I am interested in ${name} (${price}).`);
    orderBtn.onclick = () => { window.open(`https://wa.me/${myNumber}?text=${message}`, '_blank'); };

    // GENERATE 4 RANDOM SUGGESTIONS
    const suggestions = allProducts
        .filter(p => p.name !== name) // Don't suggest the item they are currently looking at
        .sort(() => 0.5 - Math.random()) // Shuffle the list
        .slice(0, 4); // Pick top 4

    const suggestGrid = document.getElementById('suggestion-grid');
    suggestGrid.innerHTML = suggestions.map(p => `
        <div class="gallery-card" onclick="openProduct('${p.name}', '${p.price}', '${p.img}')" style="cursor:pointer;">
            <img src="${p.img}" style="width:100%; height:120px; object-fit:contain; background:#f9f9f9;">
            <div style="text-align:center; padding:5px;">
                <span style="font-size:9px; display:block; font-weight:bold;">${p.name}</span>
            </div>
        </div>
    `).join('');

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    saveToRecent(name, img);
}

// 2. RECENTLY VIEWED (Picking 2 Randomly from History)
function saveToRecent(name, img) {
    let items = JSON.parse(localStorage.getItem('onyx_recent_v8')) || [];
    if (!items.find(i => i.name === name)) {
        items.unshift({ name, img });
        localStorage.setItem('onyx_recent_v8', JSON.stringify(items));
        renderRecent();
    }
}

function renderRecent() {
    let items = JSON.parse(localStorage.getItem('onyx_recent_v8')) || [];
    const section = document.getElementById('recent-section');
    const grid = document.getElementById('recent-grid');

    if (items.length < 2) return;

    // Pick 2 random items from your history to keep it fresh
    const randomHistory = items.sort(() => 0.5 - Math.random()).slice(0, 2);

    if (section) section.style.display = "block";
    if (grid) {
        grid.innerHTML = randomHistory.map(item => `
            <div class="gallery-card" onclick="openProduct('${item.name}', 'View Piece', '${item.img}')">
                <img src="${item.img}" style="height: 140px; width: 100%; object-fit: contain; background: #fff;">
                <div class="card-info"><span class="item-name">${item.name}</span></div>
            </div>
        `).join('');
    }
}

// Standard Nav & Modal Close functions stay the same...
function closeModal() {
    document.getElementById('productModal').style.display = "none";
    document.body.style.overflow = "auto";
}

function toggleNav() {
    const sideNav = document.getElementById("mySidenav");
    const h = document.getElementById("main-header").offsetHeight;
    sideNav.style.top = h + "px";
    sideNav.style.width = (sideNav.style.width === "280px") ? "0" : "280px";
}
