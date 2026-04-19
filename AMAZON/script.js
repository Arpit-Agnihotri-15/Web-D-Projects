function login() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    if (email === "" || pass === "") {
        document.getElementById("error").innerText = "All fields required!";
    } else {
        localStorage.setItem("user", email);
        alert("Login Successful!");
        window.location.href = "index.html";
    }
}

function createAccount() {
    let email = document.getElementById("email").value;
    if (!email) {
        alert("Enter email first!");
        return;
    }
    localStorage.setItem("user", email);
    alert("Account Created & Logged In!");
    window.location.href = "index.html";
}

function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");   
    alert("Logged out & Cart cleared!");
    window.location.href = "index.html";
}

function showUser() {
    let user = localStorage.getItem("user");
    if (user) {
        document.getElementById("user-text").innerText = "Hello, " + user;
    }
}

showUser();

function addToCart(id) {
    let user = localStorage.getItem("user");
    if (!user) {
        alert("Please login first!");
        window.location.href = "login.html";
        return;
    }
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = products.find(p => p.id === id);
    let existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        product.qty = 1;
        cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Added to Cart!");
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    cart.forEach(item => total += item.qty || 1);
    let count = document.getElementById("cart-count");
    if (count) count.innerText = total;
}

updateCartCount();

let slides = [
    "images/banner1.jpg",
    "images/banner2.jpg",
    "images/banner3.jpg",
    "images/banner4.jpg",
    "images/banner5.jpg"
];

let index = 0;
setInterval(() => {
    let slide = document.getElementById("slide");
    if (slide) {
        slide.src = slides[index];
        index = (index + 1) % slides.length;
    }
}, 2500);
document.querySelector(".search").addEventListener("input", function () {
    let value = this.value.toLowerCase();
    let cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        let text = card.innerText.toLowerCase();
        card.style.display = text.includes(value) ? "block" : "none";
    });
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}