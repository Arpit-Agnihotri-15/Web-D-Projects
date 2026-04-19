const products = [
    { id: 1, name: "Laptop", price: 50000, img: "images/laptop.jpg" },
    { id: 2, name: "Headphones", price: 2000, img: "images/headphones.jpg" },
    { id: 3, name: "Phone", price: 15000, img: "images/phone.jpg" },
    { id: 4, name: "Shoes", price: 3000, img: "images/shoes.jpg" },
    { id: 5, name: "Jacket", price: 2500, img: "images/jacket.jpg" },
    { id: 6, name: "Lamp", price: 1500, img: "images/lamp.jpg" },
    { id: 7, name: "Sofa", price: 20000, img: "images/sofa.jpg" },
    { id: 8, name: "Smartwatch", price: 5000, img: "images/smartwatch.jpg" }
];

function displayProducts() {
    let container = document.getElementById("product-list");
    container.innerHTML = "";
    products.forEach(p => {
        container.innerHTML += `
        <div class="card">
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>`;
    });
}

displayProducts();