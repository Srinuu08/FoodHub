function displayCheckout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("checkoutItems");
    if (!cart.length) {
        container.innerHTML = "<p>Your cart is empty!</p>";
        document.getElementById("checkoutTotal").textContent = "Total: ₹0";
        return;
    }
    container.innerHTML = "";
    cart.forEach(food => {
        const row = document.createElement("div");
        row.className = "cart-row";
        row.innerHTML = `<span>${food.name}</span><span>₹${food.price}</span><span>${food.quantity}</span><span>₹${food.price * food.quantity}</span>`;
        container.appendChild(row);
    });
    const total = cart.reduce((sum, f) => sum + f.price * f.quantity, 0);
    document.getElementById("checkoutTotal").textContent = `Total: ₹${total}`;
    const payment = localStorage.getItem("paymentMethod") || "Not selected";
    let p = document.getElementById("paymentInfo");
    if (!p) { p = document.createElement("p"); p.id="paymentInfo"; document.querySelector(".checkout-container").appendChild(p); }
    p.className="payment-info"; p.textContent = `Payment: ${payment}`;
}
function placeOrder() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.length) { alert("Your cart is empty!"); return; }
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user || user.role !== "user") { alert("Please login first."); window.location.href="login.html"; return; }
    const total = cart.reduce((sum, f) => sum + f.price * f.quantity, 0);
    const orders = JSON.parse(localStorage.getItem("foodhubOrders")) || [];
    orders.push({ id: "FH" + Date.now(), user:user.username, items:cart, total, payment:localStorage.getItem("paymentMethod") || "Not selected", date:new Date().toLocaleString() });
    localStorage.setItem("foodhubOrders", JSON.stringify(orders));
    localStorage.removeItem("cart");
    localStorage.removeItem("paymentMethod");
    alert("🎉 Order placed successfully!");
    window.location.href="index.html";
}
displayCheckout();
