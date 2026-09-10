function displayCheckout() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let checkoutContainer = document.getElementById("checkoutItems");

    if (cart.length === 0) {

        checkoutContainer.innerHTML = "<p>Your cart is empty!</p>";

        document.getElementById("checkoutTotal").innerHTML = "Total: ₹0";

        return;
    }

    checkoutContainer.innerHTML = "";

    cart.forEach(function(food) {

        let itemTotal = food.price * food.quantity;

        let checkoutRow = document.createElement("div");

        checkoutRow.className = "cart-row";

        checkoutRow.innerHTML = `
            <span>${food.name}</span>
            <span>₹${food.price}</span>
            <span>${food.quantity}</span>
            <span>₹${itemTotal}</span>
        `;

        checkoutContainer.appendChild(checkoutRow);

    });

    calculateCheckoutTotal();
}


function calculateCheckoutTotal() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(function(food) {

        total = total + (food.price * food.quantity);

    });

    let totalElement = document.getElementById("checkoutTotal");

    totalElement.innerHTML = `Total: ₹${total}`;
}


function placeOrder() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    alert("🎉 Order placed successfully!");

    localStorage.removeItem("cart");

    window.location.href = "index.html";
}


displayCheckout();