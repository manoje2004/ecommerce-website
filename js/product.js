const container = document.getElementById("productDetails");

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

fetch(`https://fakestoreapi.com/products/${id}`)
.then(res => res.json())
.then(product => {

container.innerHTML = `

<div class="card">

<img src="${product.image}">

<h2>${product.title}</h2>

<p>${product.description}</p>

<h3>₹ ${Math.round(product.price*85)}</h3>

<button onclick="history.back()">
Back
</button>

</div>

`;

});