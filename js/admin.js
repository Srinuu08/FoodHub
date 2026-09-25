document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user || user.role !== "admin") { window.location.href = "login.html"; return; }
    const orders = JSON.parse(localStorage.getItem("foodhubOrders")) || [];
    const box = document.getElementById("adminOrders");
    if (!orders.length) { box.innerHTML = "<p>No orders yet.</p>"; return; }
    box.innerHTML = orders.slice().reverse().map(o => `<div class="admin-order"><h3>Order ${o.id}</h3><p><b>User:</b> ${o.user}</p><p><b>Total:</b> ₹${o.total}</p><p><b>Payment:</b> ${o.payment}</p><p><b>Date:</b> ${o.date}</p><ul>${o.items.map(i=>`<li>${i.name} × ${i.quantity}</li>`).join("")}</ul></div>`).join("");
});
