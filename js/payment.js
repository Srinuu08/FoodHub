let selectedUpi = "";
function getCartTotal() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
}
function selectUpi(app) {
    selectedUpi = app;
    document.getElementById("upiSelected").textContent = `Selected: ${app} (Demo payment)`;
}
function updatePaymentUI() {
    document.getElementById("paymentTotal").textContent = `Total: ₹${getCartTotal()}`;
    document.querySelectorAll('input[name="payment"]').forEach(r => r.addEventListener("change", () => {
        document.getElementById("upiBox").classList.toggle("hidden", r.value !== "upi" || !r.checked);
        if (r.checked && r.value === "cash") { document.getElementById("upiBox").classList.add("hidden"); selectedUpi=""; }
    }));
}
function continueToCheckout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const selected = document.querySelector('input[name="payment"]:checked');
    const msg = document.getElementById("paymentMessage");
    if (!cart.length) { msg.textContent="Your cart is empty."; msg.className="form-message error"; return; }
    if (!user || user.role !== "user") { alert("Please login first."); window.location.href="login.html"; return; }
    if (!selected) { msg.textContent="Please select a payment method."; msg.className="form-message error"; return; }
    if (selected.value === "upi" && !selectedUpi) { msg.textContent="Please select a dummy UPI app."; msg.className="form-message error"; return; }
    const label = selected.value === "cash" ? "Cash on Delivery" : selectedUpi + " (Demo)";
    localStorage.setItem("paymentMethod", label);
    window.location.href = "checkout.html";
}
document.addEventListener("DOMContentLoaded", updatePaymentUI);
