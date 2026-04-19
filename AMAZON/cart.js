let cart = JSON.parse(localStorage.getItem("cart")) || [];
let container = document.getElementById("cart-items");
let totalDisplay = document.getElementById("total");

function displayCart() {
    container.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        if (!item.qty) item.qty = 1;
        total += item.price * item.qty;
        container.innerHTML += `
        <div class="cart-item">
            <img src="${item.img}">
            <div class="cart-details">
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
                <div class="qty-box">
                    <button onclick="changeQty(${index}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>
        </div>
        `;
    });
    totalDisplay.innerText = total;
    localStorage.setItem("cart", JSON.stringify(cart));
}

function changeQty(index, change) {
    cart[index].qty += change;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    displayCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    displayCart();
}

function goBack() {
    window.location.href = "index.html";
}

displayCart();

function checkout() {
    let user = localStorage.getItem("user");
    if (!user) {
        alert("Please login first!");
        window.location.href = "login.html";
        return;
    }
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Order placed successfully! (Demo)");
    localStorage.removeItem("cart");
    location.reload();
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}