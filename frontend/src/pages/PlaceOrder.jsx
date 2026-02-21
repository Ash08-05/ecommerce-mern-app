import React, { useContext, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {

  const {
    cartItems,
    products,
    currency,
    delivery_fee,
    navigate,
    token,
    backendUrl,
  } = useContext(ShopContext);


  /* ================= FORM STATE ================= */

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });


  const [method, setMethod] = useState("cod");


  /* ================= HANDLE INPUT ================= */

  const onChangeHandler = (event) => {

    const { name, value } = event.target;

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };


  /* ================= CALCULATE TOTAL ================= */

  const total =
    Object.keys(cartItems).reduce((acc, id) => {
      return (
        acc +
        Object.keys(cartItems[id]).reduce((sum, size) => {
          const product = products.find(
            (p) => p._id === id
          );

          if (!product) return sum;

          return sum + product.price * cartItems[id][size];
        }, 0)
      );
    }, 0) + delivery_fee;


  /* ================= SUBMIT ================= */

  const submitHandler = async (e) => {

    e.preventDefault();

    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {

      /* Build Order Items */
      let orderItems = [];

      for (const items in cartItems) {

        for (const item in cartItems[items]) {

          if (cartItems[items][item] > 0) {

            const itemInfo = structuredClone(
              products.find(
                (product) => product._id === items
              )
            );

            if (itemInfo) {

              itemInfo.size = item;
              itemInfo.quantity =
                cartItems[items][item];

              orderItems.push(itemInfo);
            }
          }
        }
      }


      /* Order Data */
      const orderData = {
        address: formData,
        items: orderItems,
        amount: total,
        paymentMethod: method,
      };


      /* ================= PAYMENT ================= */

      switch (method) {


        /* ===== COD ===== */
        case 'cod': {

          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.success) {

            toast.success("Order placed successfully!");

            navigate("/orders");

          } else {
            toast.error(response.data.message);
          }

          break;
        }


        /* ===== STRIPE ===== */
       case "stripe": {

  const response = await axios.post(
    backendUrl + "/api/order/stripe",
    orderData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("STRIPE RESPONSE:", response.data); // ✅ ADD THIS

  if (response.data.url) {
   window.location.replace(response.data.url);
  } else {
    toast.error("Stripe payment failed");
  }

  break;
}


        /* ===== RAZORPAY ===== */
        case "razorpay": {

          const response = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.success) {

            const options = {
              key: response.data.key,
              amount: response.data.amount,
              currency: "INR",
              name: "Your Store",
              description: "Order Payment",
              order_id: response.data.orderId,

              handler: function () {

                toast.success("Payment successful!");

                navigate("/orders");
              },

              prefill: {
                name: formData.firstName,
                email: formData.email,
                contact: formData.phone,
              },

              theme: {
                color: "#000000",
              },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

          } else {
            toast.error("Razorpay order failed");
          }

          break;
        }


        /* ===== DEFAULT ===== */
        default:
          toast.error("Invalid payment method");
      }


    } catch (error) {

      console.log(error);

      toast.error("Something went wrong");

    }
  };


  return (

    <form
      onSubmit={submitHandler}
      className="flex flex-col sm:flex-row gap-10"
    >


      {/* ================= LEFT ================= */}
      <div className="flex flex-col w-full max-w-lg">


        {/* Title */}
        <div className="text-xl sm:text-2xl my-4">
          <Title text1="DELIVERY" text2="DETAILS" />
        </div>


        {/* Inputs */}
        <div className="space-y-4">


          {/* First + Last */}
          <div className="flex flex-col sm:flex-row gap-4">

            <input
              name="firstName"
              value={formData.firstName}
              onChange={onChangeHandler}
              type="text"
              placeholder="First Name"
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm
              text-gray-800 placeholder-gray-400 focus:border-gray-800 focus:outline-none"
              required
            />

            <input
              name="lastName"
              value={formData.lastName}
              onChange={onChangeHandler}
              type="text"
              placeholder="Last Name"
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm
              text-gray-800 placeholder-gray-400 focus:border-gray-800 focus:outline-none"
              required
            />

          </div>


          <input
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Email Address"
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm
            text-gray-800 placeholder-gray-400 focus:border-gray-800 focus:outline-none"
            required
          />


          <input
            name="street"
            value={formData.street}
            onChange={onChangeHandler}
            type="text"
            placeholder="Address"
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm
            text-gray-800 placeholder-gray-400 focus:border-gray-800 focus:outline-none"
            required
          />


          <input
            name="landmark"
            value={formData.landmark}
            onChange={onChangeHandler}
            type="text"
            placeholder="Landmark"
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm
            text-gray-800 placeholder-gray-400 focus:border-gray-800 focus:outline-none"
          />


          <div className="flex flex-col sm:flex-row gap-4">

            <input
              name="city"
              value={formData.city}
              onChange={onChangeHandler}
              type="text"
              placeholder="City"
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm
              text-gray-800 placeholder-gray-400 focus:border-gray-800 focus:outline-none"
              required
            />

            <input
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
              type="text"
              placeholder="State"
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm
              text-gray-800 placeholder-gray-400 focus:border-gray-800 focus:outline-none"
              required
            />

          </div>


          <input
            name="zipcode"
            value={formData.zipcode}
            onChange={onChangeHandler}
            type="text"
            placeholder="Pincode"
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm
            text-gray-800 placeholder-gray-400 focus:border-gray-800 focus:outline-none"
            required
          />


          <input
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            type="text"
            placeholder="Country"
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm
            text-gray-800 placeholder-gray-400 focus:border-gray-800 focus:outline-none"
            required
          />


          <input
            name="phone"
            value={formData.phone}
            onChange={onChangeHandler}
            type="text"
            placeholder="Phone Number"
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm
            text-gray-800 placeholder-gray-400 focus:border-gray-800 focus:outline-none"
            required
          />

        </div>
      </div>


      {/* ================= RIGHT ================= */}
      <div className="mt-8 w-full max-w-md">


        {/* Total */}
        <div className="flex justify-between font-semibold text-lg">

          <span>Total</span>

          <span>
            {currency}{total}
          </span>

        </div>


        {/* Payment */}
        <div className="mt-12">

          <Title text1="Payment" text2="Method" />


          <div className="flex gap-3 flex-col lg:flex-row">


            {/* Stripe */}
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>

              <img
                className="h-5 mx-4"
                src={assets.stripe_logo}
                alt=""
              />
            </div>


            {/* Razorpay */}
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>

              <img
                className="h-5 mx-4"
                src={assets.razorpay_logo}
                alt=""
              />
            </div>


            {/* COD */}
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>

              <p className="text-grey-500 text-sm font-medium mx-4">
                Cash On Delivery
              </p>
            </div>

          </div>


          {/* Submit */}
          <div className="w-full text-end mt-8">

            <button
              type="submit"
              className="px-8 py-3 bg-gray-900 text-white rounded-lg text-sm font-medium
              hover:bg-black transition duration-200 active:scale-95"
            >
              Place Order
            </button>

          </div>

        </div>
      </div>

    </form>
  );
};

export default PlaceOrder;
