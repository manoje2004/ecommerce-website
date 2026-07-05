const homeProductsContainer = document.getElementById("homeProducts");
const homeSearchInput = document.getElementById("homeSearchInput");

let homeProducts = [];

fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => {
        homeProducts = data.slice(0, 8);
        displayHomeProducts(homeProducts);
    });

function displayHomeProducts(products) {
    homeProductsContainer.innerHTML = "";

    if (products.length === 0) {
        homeProductsContainer.innerHTML = "<h2>No products found</h2>";
        return;
    }

    products.forEach(product => {
        homeProductsContainer.innerHTML += `
            <div class="card">
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>₹ ${Math.round(product.price * 85)}</p>

                <a href="product.html?id=${product.id}">
                    <button>View Details</button>
                </a>

                <button onclick="addToCartFromHome(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
    });
}

homeSearchInput.addEventListener("keyup", () => {
    const searchValue = homeSearchInput.value.toLowerCase();

    const filteredProducts = homeProducts.filter(product =>
        product.title.toLowerCase().includes(searchValue)
    );

    displayHomeProducts(filteredProducts);
});

function addToCartFromHome(id) {
    const product = homeProducts.find(item => item.id === id);

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
}