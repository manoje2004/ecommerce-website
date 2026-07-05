const cartCount = document.getElementById("cartCount");

if(cartCount){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let count = 0;

    cart.forEach(product=>{
        count += product.quantity;
    });

    cartCount.innerText = count;

}

const darkBtn = document.getElementById("darkModeBtn");

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
}

if(darkBtn){

    darkBtn.onclick = function(){

        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")){
            localStorage.setItem("theme","dark");
        }else{
            localStorage.setItem("theme","light");
        }

    }

}