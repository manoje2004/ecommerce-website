const form = document.querySelector(".checkout-form");

form.addEventListener("submit", function(e){

    e.preventDefault();

    alert("🎉 Order Placed Successfully!");

    localStorage.removeItem("cart");

    window.location.href = "index.html";

});