import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const Cart = () => {

  const {
    cartItems,
    products,
    currency,
    delivery_fee,
    updateCartQuantity,
    removeFromCart,
    navigate,
  } = useContext(ShopContext);


  /* ================= BUILD CART LIST ================= */

  const cartList = Object.entries(cartItems).flatMap(
    ([id, sizes]) =>
      Object.entries(sizes).map(([size, qty]) => ({
        id,
        size,
        quantity: qty,
      }))
  );


  /* ================= SUBTOTAL ================= */

  const subtotal = cartList.reduce((acc, item) => {

    const product = products.find(
      (p) => p._id === item.id
    );

    if (!product) return acc;

    return acc + product.price * item.quantity;

  }, 0);


  const total = subtotal + delivery_fee;


  /* ================= EMPTY CART ================= */

  if (cartList.length === 0) {
    return (
      <div className="px-6 sm:px-10 md:px-20 my-28 text-center">

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">
          Shopping Cart
        </h1>

        <p className="text-gray-500 mb-6">
          Your cart is currently empty.
        </p>

        <Link
          to="/collection"
          className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition"
        >
          Continue Shopping
        </Link>

      </div>
    );
  }


  /* ================= MAIN CART ================= */

  return (
    <div className="px-6 sm:px-10 md:px-20 my-28">

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">


        {/* ================= CART ITEMS ================= */}
        <div className="lg:col-span-2 space-y-6">

          {cartList.map((item) => {

            const product = products.find(
              (p) => p._id === item.id
            );

            if (!product) return null;

            return (
              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-5 border rounded-xl p-5 bg-white shadow-sm"
              >

                {/* Image */}
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />


                {/* Info */}
                <div className="flex-1 space-y-2">

                  <h3 className="font-semibold text-gray-900">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Size: {item.size}
                  </p>

                  <p className="font-medium text-gray-900">
                    {currency}{product.price}
                  </p>


                  {/* Quantity */}
                  <div className="flex items-center gap-3 mt-3">

                    <button
                      onClick={() =>
                        updateCartQuantity(
                          item.id,
                          item.size,
                          item.quantity - 1
                        )
                      }
                      className="w-8 h-8 border rounded hover:bg-gray-100"
                    >
                      -
                    </button>

                    <span className="w-8 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateCartQuantity(
                          item.id,
                          item.size,
                          item.quantity + 1
                        )
                      }
                      className="w-8 h-8 border rounded hover:bg-gray-100"
                    >
                      +
                    </button>

                  </div>

                </div>


                {/* Remove */}
                <button
                  onClick={() =>
                    removeFromCart(item.id, item.size)
                  }
                  className="text-sm text-red-500 hover:underline cursor-pointer"
                >
                  Remove
                </button>

              </div>
            );
          })}

        </div>


        {/* ================= SUMMARY ================= */}
        <div className="border rounded-xl p-6 bg-white shadow-sm h-fit">

          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Order Summary
          </h2>


          {/* Subtotal */}
          <div className="flex justify-between mb-3 text-sm">

            <span>Subtotal</span>

            <span className="font-medium">
              {currency}{subtotal}.00
            </span>

          </div>


          {/* Delivery */}
          <div className="flex justify-between mb-3 text-sm">

            <span>Delivery</span>

            <span className="font-medium">
              {currency}{delivery_fee}.00
            </span>

          </div>


          <hr className="my-4" />


          {/* Total */}
          <div className="flex justify-between text-base font-semibold mb-6">

            <span>Total</span>

            <span>
              {currency}{total}.00
            </span>

          </div>


          {/* Checkout */}
          <button
            onClick={() => navigate("/place-order")}
            className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition"
          >
            Proceed to Checkout
          </button>

        </div>

      </div>
    </div>
  );
};

export default Cart;
