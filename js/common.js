function readStoredJSON(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
    catch { return fallback; }
}

function updateHeader() {
    const countEl = document.getElementById("cartCount");
    const cart = readStoredJSON("cart", []);
    const count = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    if (countEl) countEl.textContent = count;

    const accountLink = document.getElementById("accountLink");
    const currentUser = readStoredJSON("currentUser", null);
    if (accountLink && currentUser) {
        accountLink.textContent = currentUser.role === "admin" ? "Admin" : currentUser.username;
        accountLink.href = currentUser.role === "admin" ? "admin.html" : "index.html";
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const logoutLink = document.getElementById("logoutLink");

    if (logoutLink) {
        logoutLink.addEventListener("click", function (event) {
            event.preventDefault();

            localStorage.removeItem("loggedInUser");
            localStorage.removeItem("currentUser");

            alert("You have been logged out.");

            window.location.href = "login.html";
        });
    }
});

function setupMobileMenu() {
    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("mainNav");
    if (toggle && nav) toggle.addEventListener("click", () => nav.classList.toggle("open"));
}

function goToPayment() {
    const cart = readStoredJSON("cart", []);
    if (!cart.length) { alert("Your cart is empty!"); return; }
    const user = readStoredJSON("currentUser", null);
    if (!user || user.role !== "user") {
        alert("Please login or create an account before payment.");
        window.location.href = "login.html";
        return;
    }
    window.location.href = "payment.html";
}

function logoutUser() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

window.addEventListener("storage", updateHeader);
window.addEventListener("foodhub-cart-updated", updateHeader);
window.addEventListener("foodhub-user-updated", updateHeader);
document.addEventListener("DOMContentLoaded", () => { updateHeader(); setupMobileMenu(); });
