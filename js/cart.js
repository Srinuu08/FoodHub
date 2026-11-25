function displayCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartContainer = document.getElementById("cartItems");
    const query=(document.getElementById("cartSearch")?.value||"").trim().toLowerCase();
    const visibleCart=cart.filter(food=>food.name.toLowerCase().includes(query));

    if (visibleCart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty!</p>";
        calculateTotal();
        return;
    }

    cartContainer.innerHTML = "";

    visibleCart.forEach(function(food) {
        const index=cart.findIndex(item=>item.name===food.name);

        let foodItem = document.createElement("div");
        foodItem.className = "cart-item";
        foodItem.innerHTML = `
            <h3>${food.name}</h3>
            <p>Price: ₹${food.price}</p>

            <button onclick="decreaseQuantity(${index})">−</button>

            <span>${food.quantity}</span>

            <button onclick="increaseQuantity(${index})">+</button>

            <button onclick="removeFood(${index})">Remove</button>
        `;

        cartContainer.appendChild(foodItem);
    });

    calculateTotal();
}


function increaseQuantity(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}


function decreaseQuantity(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}


displayCart();
function removeFood(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
   
    displayCart();
   
}

function calculateTotal() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(function(food) {

        total = total + (food.price * food.quantity);

    });

    let totalElement = document.getElementById("cartTotal");

    totalElement.innerHTML = `Total: ₹${total}`;
}

if (typeof updateHeader === "function") updateHeader();

 document.getElementById("cartSearch")?.addEventListener("input",displayCart);
