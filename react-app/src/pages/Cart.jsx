import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function readCart() {
  try { return JSON.parse(localStorage.getItem("cart") || "[]"); }
  catch { return []; }
}

export default function Cart() {
  const [cart, setCart] = useState(readCart);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("foodhub-cart-updated"));
  }, [cart]);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity || 1), 0),
    [cart]
  );
  const itemCount = cart.reduce((sum, item) => sum + Number(item.quantity || 1), 0);

  function changeQuantity(index, amount) {
    setCart(current => current.map((item, i) =>
      i === index ? { ...item, quantity: Math.max(1, Number(item.quantity || 1) + amount) } : item
    ));
  }

  function removeItem(index) {
    setCart(current => current.filter((_, i) => i !== index));
  }

  function checkout() {
    if (!cart.length) {
      alert("Your cart is empty!");
      return;
    }
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!user || user.role !== "user") {
      alert("Please login or create an account before payment.");
      navigate("/login");
      return;
    }
    // Continue with the existing FoodHub payment page.
    window.location.href = "../payment.html";
  }

  return (
    <main className="page-container">
      <h2 className="page-title">Your Cart</h2>
      <p className="subheading">{itemCount} item(s) in your cart</p>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h3>Your cart is empty!</h3>
          <p>Explore our menu and add your favourite food.</p>
          <a className="primary-button" href="../menu.html">Browse Menu</a>
        </div>
      ) : (
        <div className="cart-list">
          {cart.map((food, index) => (
            <article className="cart-card" key={`${food.name}-${index}`}>
              <div className="food-details">
                <h3>{food.name}</h3>
                <p>Price: ₹{Number(food.price).toFixed(2)}</p>
                <strong>Subtotal: ₹{(Number(food.price) * Number(food.quantity || 1)).toFixed(2)}</strong>
              </div>
              <div className="quantity-controls">
                <button aria-label={`Decrease ${food.name}`} onClick={() => changeQuantity(index, -1)}>−</button>
                <span>{food.quantity || 1}</span>
                <button aria-label={`Increase ${food.name}`} onClick={() => changeQuantity(index, 1)}>+</button>
              </div>
              <button className="remove-button" onClick={() => removeItem(index)}>Remove</button>
            </article>
          ))}
        </div>
      )}

      <section className="total-card">
        <h3>Total: ₹{total.toFixed(2)}</h3>
        <button className="primary-button" onClick={checkout}>Proceed to Payment</button>
      </section>
    </main>
  );
}
