function addtocart(foodName, price, button) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.name === foodName);
    if (existing) existing.quantity += 1;
    else cart.push({ name: foodName, price: Number(price), quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));

    if (button) {
        const original = button.textContent;
        button.textContent = "✓ Added";
        button.classList.add("added");
        setTimeout(() => { button.textContent = original; button.classList.remove("added"); }, 1200);
    }
    showCartToast(`${foodName} added to cart!`);
    if (typeof updateHeader === "function") updateHeader();
}

function showCartToast(message) {
    let toast = document.getElementById("cartToast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "cartToast";
        document.body.appendChild(toast);
    }
    toast.textContent = "🛒 " + message;
    toast.classList.add("show");
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}
