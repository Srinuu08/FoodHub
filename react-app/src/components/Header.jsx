import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);

  function refreshHeader() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCount(cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0));
    setUser(JSON.parse(localStorage.getItem("currentUser") || "null"));
  }

  useEffect(() => {
    refreshHeader();
    window.addEventListener("storage", refreshHeader);
    window.addEventListener("foodhub-cart-updated", refreshHeader);
    window.addEventListener("foodhub-user-updated", refreshHeader);
    return () => {
      window.removeEventListener("storage", refreshHeader);
      window.removeEventListener("foodhub-cart-updated", refreshHeader);
      window.removeEventListener("foodhub-user-updated", refreshHeader);
    };
  }, []);

  return (
    <header className="site-header">
      <a className="brand-link" href="../index.html">
        <img src="./images/logo.png" alt="FoodHub logo" />
        <h1><span>Food</span><b>Hub</b></h1>
      </a>
      <nav>
        <a href="../index.html">Home</a>
        <a href="../menu.html">Menu</a>
        <Link to="/cart">Cart <span className="cart-badge">{count}</span></Link>
        <Link to="/login">{user ? user.username || user.name : "Login"}</Link>
      </nav>
    </header>
  );
}
