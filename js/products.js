const loader = document.getElementById("loader");
const productContainer = document.getElementById("products");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

let allProducts = [];

fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => {
        allProducts = data;
        loader.style.display = "none";displayProducts(allProducts);
        loader.style.display = "none";
    });

function displayProducts(products) {

    productContainer.innerHTML = "";

    products.forEach(product => {

        productContainer.innerHTML += `

        <div class="card">

            <img src="${product.image}" alt="${product.title}">

            <h3>${product.title}</h3>

            <p>₹ ${Math.round(product.price * 85)}</p>

            <a href="product.html?id=${product.id}">
                <button>View Details</button>
            </a>

            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>

        </div>

        `;

    });

}

searchInput.addEventListener("keyup", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

function filterProducts() {

    let filtered = allProducts;

    const search = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    if (search !== "") {
        filtered = filtered.filter(product =>
            product.title.toLowerCase().includes(search)
        );
    }

    if (category !== "all") {
        filtered = filtered.filter(product =>
            product.category === category
        );
    }

    displayProducts(filtered);

}

function addToCart(id) {

    const product = allProducts.find(item => item.id === id);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Product Added Successfully!");

const toast = document.getElementById("toast");

toast.classList.add("show");

setTimeout(() => {
    toast.classList.remove("show");
}, 2000);
}