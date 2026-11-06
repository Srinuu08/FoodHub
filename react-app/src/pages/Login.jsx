import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function getUsers() {
  try { return JSON.parse(localStorage.getItem("foodhubUsers") || "[]"); }
  catch { return []; }
}

export default function Login() {
  const [type, setType] = useState("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  function showMessage(text, kind = "error") {
    setMessage(text);
    setMessageType(kind);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (type === "admin") {
      if (username.trim() === "admin" && password === "admin123") {
        localStorage.setItem("currentUser", JSON.stringify({ username: "admin", role: "admin" }));
        window.dispatchEvent(new Event("foodhub-user-updated"));
        showMessage("Admin login successful!", "success");
        setTimeout(() => { window.location.href = "../admin.html"; }, 600);
      } else {
        showMessage("Invalid admin credentials.");
      }
      return;
    }

    const user = getUsers().find(
      item => item.username === username.trim() && item.password === password
    );

    if (!user) {
      showMessage("Invalid username or password.");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify({
      name: user.name,
      username: user.username,
      email: user.email,
      role: "user"
    }));
    window.dispatchEvent(new Event("foodhub-user-updated"));
    showMessage("Login successful!", "success");
    setTimeout(() => navigate("/cart"), 600);
  }

  return (
    <main className="auth-page">
      <section className="login-card">
        <h2>Welcome Back</h2>
        <p className="subheading">Login to continue with FoodHub</p>

        <div className="auth-tabs">
          <button className={type === "user" ? "active" : ""} onClick={() => { setType("user"); setMessage(""); }}>User Login</button>
          <button className={type === "admin" ? "active" : ""} onClick={() => { setType("admin"); setMessage(""); }}>Admin Login</button>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">{type === "admin" ? "Admin Username" : "Username"}</label>
          <input id="username" value={username} onChange={e => setUsername(e.target.value)}
            placeholder="Enter username" autoComplete="username" required />

          <label htmlFor="password">Password</label>
          <input id="password" type={showPassword ? "text" : "password"} value={password}
            onChange={e => setPassword(e.target.value)} placeholder="Enter password"
            autoComplete="current-password" required />

          <label className="show-password">
            <input type="checkbox" checked={showPassword} onChange={e => setShowPassword(e.target.checked)} />
            Show password
          </label>

          <button className="primary-button full-width" type="submit">
            {type === "admin" ? "Admin Login" : "Login"}
          </button>
          {message && <p className={`form-message ${messageType}`}>{message}</p>}
        </form>

        {type === "user" ? (
          <p className="signup-text">Don't have an account? <a href="../signup.html">Create Account</a></p>
        ) : (
          <p className="demo-note">Demo admin: <b>admin</b> / <b>admin123</b></p>
        )}
      </section>
    </main>
  );
}
