function getUsers() {
    return JSON.parse(localStorage.getItem("foodhubUsers")) || [];
}

function saveUsers(users) { localStorage.setItem("foodhubUsers", JSON.stringify(users)); }

function showLogin(type) {
    const userForm = document.getElementById("userLoginForm");
    const adminForm = document.getElementById("adminLoginForm");
    const tabs = document.querySelectorAll(".auth-tab");
    if (!userForm || !adminForm) return;
    userForm.classList.toggle("hidden", type !== "user");
    adminForm.classList.toggle("hidden", type !== "admin");
    tabs.forEach((tab, i) => tab.classList.toggle("active", (type === "user" && i === 0) || (type === "admin" && i === 1)));
}

const userLoginForm = document.getElementById("userLoginForm");
if (userLoginForm) userLoginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const user = getUsers().find(u => u.username === username && u.password === password);
    const msg = document.getElementById("loginMessage");
    if (!user) { msg.textContent = "Invalid username or password."; msg.className = "form-message error"; return; }
    localStorage.setItem("currentUser", JSON.stringify({ name:user.name, username:user.username, email:user.email, role:"user" }));
    msg.textContent = "Login successful!"; msg.className = "form-message success";
    setTimeout(() => window.location.href = "menu.html", 500);
});

const adminLoginForm = document.getElementById("adminLoginForm");
if (adminLoginForm) adminLoginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("adminUsername").value.trim();
    const password = document.getElementById("adminPassword").value;
    const msg = document.getElementById("adminMessage");
    if (username === "admin" && password === "admin123") {
        localStorage.setItem("currentUser", JSON.stringify({ username:"admin", role:"admin" }));
        msg.textContent = "Admin login successful!"; msg.className = "form-message success";
        setTimeout(() => window.location.href = "admin.html", 500);
    } else { msg.textContent = "Invalid admin credentials."; msg.className = "form-message error"; }
});

const signupForm = document.getElementById("signupForm");
if (signupForm) signupForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("signupName").value.trim();
    const username = document.getElementById("signupUsername").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirm = document.getElementById("signupConfirm").value;
    const msg = document.getElementById("signupMessage");
    let users = getUsers();
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) { msg.textContent = "Username already exists."; msg.className="form-message error"; return; }
    if (password !== confirm) { msg.textContent = "Passwords do not match."; msg.className="form-message error"; return; }
    users.push({ name, username, email, password });
    saveUsers(users);
    localStorage.setItem("currentUser", JSON.stringify({ name, username, email, role:"user" }));
    msg.textContent = "Account created successfully!"; msg.className="form-message success";
    setTimeout(() => window.location.href = "menu.html", 700);
});
