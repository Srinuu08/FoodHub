console.log("FoodHub JavaScript is working!");

function addtocart(foodName, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let food = {
        name: foodName,
        price: price,
        quantity: 1
    };

    cart.push(food);

    localStorage.setItem("cart", JSON.stringify(cart));

    console.log("Added to cart:", food);
}