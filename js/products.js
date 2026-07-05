const productContainer = document.getElementById("products");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

let allProducts = [];

fetch("https://fakestoreapi.com/products")
.then(res => res.json())
.then(data => {
    allProducts = data;
    displayProducts(allProducts);
});

function displayProducts(products) {

    productContainer.innerHTML = "";

    products.forEach(product => {

        productContainer.innerHTML += `
            <div class="card">

                <img src="${product.image}" alt="${product.title}">

                <h3>${product.title}</h3>

                <p>₹ ${Math.round(product.price * 85)}</p>

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

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("✅ Product added to cart!");
}