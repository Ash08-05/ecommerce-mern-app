import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App"

const Verify = () => {

  const [params] = useSearchParams();

  const navigate = useNavigate();


  const success = params.get("success");
  const orderId = params.get("orderId");


  useEffect(() => {

    const verifyPayment = async () => {

      try {

        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Login required");
          navigate("/login");
          return;
        }
const verifyStripe = async (req, res) => {
  try {

    console.log("==== VERIFY API HIT ====");
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const { orderId, success } = req.body;
    const userId = req.user.id;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "OrderId missing",
      });
    }

    // Normalize success
    const isSuccess =
      success === true ||
      success === "true" ||
      success === 1 ||
      success === "1";

    console.log("IS SUCCESS:", isSuccess);

    if (!isSuccess) {

      console.log("PAYMENT FAILED → DELETING ORDER");

      await orderModel.findByIdAndDelete(orderId);

      return res.json({
        success: false,
        message: "Payment failed",
      });
    }


    // 🔍 Fetch order first
    const order = await orderModel.findById(orderId);

    console.log("FOUND ORDER:", order);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }


    // 🔒 Ownership check (important)
    if (order.userId.toString() !== userId) {

      console.log("USER MISMATCH");

      return res.status(403).json({
        success: false,
        message: "Not authorized for this order",
      });
    }


    // ✅ Update manually
    order.payment = true;
    order.status = "Processing";

    await order.save();

    console.log("ORDER UPDATED:", order);


    // Clear cart
    await userModel.findByIdAndUpdate(userId, {
      cartData: {},
    });


    return res.json({
      success: true,
      message: "Payment verified",
    });

  } catch (error) {

    console.log("VERIFY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
console.log("VERIFY API URL:", backendUrl + "/api/order/verify");
        const response = await axios.post(
          backendUrl + "/api/order/verify",
          {
            success,
            orderId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {

          toast.success("Payment successful!");

          setTimeout(() => {
            navigate("/orders");
          }, 2000);

        } else {

          toast.error("Payment failed");

          setTimeout(() => {
            navigate("/cart");
          }, 2000);
        }

      } catch (error) {

        console.log(error);

        toast.error("Verification failed");

        navigate("/");
      }
    };


    if (success && orderId) {
      verifyPayment();
    }

  }, [success, orderId, navigate]);


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">

        <h2 className="text-xl font-semibold mb-4">

          {success === "true"
            ? "Processing Payment..."
            : "Payment Failed"}

        </h2>

        <p className="text-gray-600">

          {success === "true"
            ? "Please wait while we verify your payment."
            : "Redirecting you back to cart."}

        </p>

      </div>

    </div>
  );
};

export default Verify;