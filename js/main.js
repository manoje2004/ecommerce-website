function updateCartCount() {
    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        let count = 0;

        cart.forEach(product => {
            count += product.quantity;
        });

        cartCount.innerText = count;
    }
}

updateCartCount();