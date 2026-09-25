function updateHeader() {
    const countEl = document.getElementById("cartCount");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    if (countEl) countEl.textContent = count;

    const accountLink = document.getElementById("accountLink");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
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
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.length) { alert("Your cart is empty!"); return; }
    const user = JSON.parse(localStorage.getItem("currentUser"));
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

document.addEventListener("DOMContentLoaded", () => { updateHeader(); setupMobileMenu(); });
