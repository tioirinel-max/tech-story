const products = [
    { id: 1, name: "Headphone Ultra G7", price: 899.90, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
    { id: 2, name: "Smartwatch Series X", price: 1249.00, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
    { id: 3, name: "Mechanical Keyboard", price: 450.00, img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500" },
    { id: 4, name: "Pro Mouse Wireless", price: 320.00, img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500" }
];

let cart = JSON.parse(localStorage.getItem('techstore_cart')) || [];

function init() {
    renderProducts();
    updateCart();
    lucide.createIcons();
}

function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.img}" class="product-image">
            <h3>${p.name}</h3>
            <p class="price">R$ ${p.price.toFixed(2)}</p>
            <button class="btn-add" onclick="addToCart(${p.id})">Adicionar ao Carrinho</button>
        </div>
    `).join('');
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const itemInCart = cart.find(item => item.id === id);

    if (itemInCart) {
        itemInCart.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
    if(!document.getElementById('cartSidebar').classList.contains('active')) toggleCart();
}

function updateCart() {
    localStorage.setItem('techstore_cart', JSON.stringify(cart));
    
    // Contador da Navbar
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('cart-count').innerText = count;

    // Itens da Sidebar
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.img}">
            <div style="flex:1">
                <h4>${item.name}</h4>
                <p>${item.quantity}x - R$ ${item.price.toFixed(2)}</p>
            </div>
            <button onclick="removeItem(${index})" style="background:none; border:none; color:#f02d4e; cursor:pointer">✕</button>
        </div>
    `).join('');

    // Total
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    document.getElementById('cart-total').innerText = `R$ ${total.toFixed(2)}`;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
    document.getElementById('cartOverlay').classList.toggle('active');
}

function checkout() {
    if(cart.length === 0) return alert("Seu carrinho está vazio!");
    alert("Compra simulada com sucesso!");
    cart = [];
    updateCart();
    toggleCart();
}

init();
