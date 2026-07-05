const cartContainer = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

displayCart();

function displayCart(){

    cartContainer.innerHTML = "";

    let total = 0;

    if(cart.length === 0){
        cartContainer.innerHTML = "<h2>Your Cart is Empty</h2>";
        totalPrice.innerText = 0;
        return;
    }

    cart.forEach((product,index)=>{

        total += Math.round(product.price * 85) * product.quantity;

        cartContainer.innerHTML += `
        <div class="card">

            <img src="${product.image}">

            <h3>${product.title}</h3>

            <p>₹ ${Math.round(product.price*85)}</p>

            <h4>Quantity : ${product.quantity}</h4>

            <button onclick="increase(${index})">+</button>

            <button onclick="decrease(${index})">-</button>

            <button onclick="removeItem(${index})">
                Remove
            </button>

        </div>
        `;
    });

    totalPrice.innerText = total;

}

function increase(index){

    cart[index].quantity++;

    localStorage.setItem("cart",JSON.stringify(cart));

    displayCart();

}

function decrease(index){

    if(cart[index].quantity > 1){
        cart[index].quantity--;
    }else{
        cart.splice(index,1);
    }

    localStorage.setItem("cart",JSON.stringify(cart));

    displayCart();

}

function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    displayCart();

}