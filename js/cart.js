function displayCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartContainer = document.getElementById("cartItems");

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty!</p>";
        calculateTotal();
        return;
    }

    cartContainer.innerHTML = "";

    cart.forEach(function(food, index) {

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
