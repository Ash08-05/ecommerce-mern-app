import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

//globally used Variabale
const currency = "inr";
const deliveryCharge = 10;

//PAyment GAteway INITIALIZE

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  try {
    // ✅ Get userId from auth middleware
    const userId = req.user.id;

    const { items, amount, address } = req.body;

    const orderData = {
      userId, // ✅ FIXED
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);

    await newOrder.save();

    // Clear cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "Order placed",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.user.id;

    const { items, amount, address } = req.body;

    // ✅ FIX: Get origin correctly
    const origin = req.get("origin") || "https://ecommerce-mern-app-frontend-y5b7.onrender.com";

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // ✅ Build Stripe items
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr", // ⚠️ use string
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Delivery fee
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Fee",
        },
        unit_amount: 49 * 100, // example
      },
      quantity: 1,
    });

    // ✅ Create session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items,

      mode: "payment",

      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,

      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
    });

    // ✅ Send URL (IMPORTANT)
    res.json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.log("STRIPE ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: "Stripe payment failed",
    });
  }
};

//verify srtipe

const verifyStripe = async (req, res) => {
  try {

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

    if (!isSuccess) {

      await orderModel.findByIdAndDelete(orderId);

      return res.json({
        success: false,
        message: "Payment failed",
      });
    }


    // Fetch order
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }


    // Ownership check
    if (order.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized for this order",
      });
    }


    // Update order
    order.payment = true;
    order.status = "Processing";

    await order.save();


    // Clear user cart
    await userModel.findByIdAndUpdate(userId, {
      cartData: {},
    });


    return res.json({
      success: true,
      message: "Payment verified",
    });

  } catch (error) {

    console.error("VERIFY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Verification failed",
    });
  }
};

const placeOrderRazorpay = async (req, res) => {};

// Admin panel
const allOrders = async (req, res) => {
  try {
    // ✅ Fetch all orders (latest first)
    const orders = await orderModel.find({}).sort({ date: -1 });

    // ✅ If no orders
    if (!orders || orders.length === 0) {
      return res.status(200).json({
        success: true,
        orders: [],
        message: "No orders found",
      });
    }

    // ✅ Success
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("ALL ORDERS ERROR:", error);

    // MongoDB validation error
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: "VALIDATION_ERROR",
        message: error.message,
      });
    }

    // Server error
    res.status(500).json({
      success: false,
      error: "SERVER_ERROR",
      message: "Failed to fetch orders",
    });
  }
};

const userOrders = async (req, res) => {
  try {
    // Check auth middleware
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        error: "AUTH_FAILED",
        message: "User authentication failed",
      });
    }

    const userId = req.user.id;

    // ✅ Fetch orders
    const orders = await orderModel.find({ userId }).sort({ date: -1 });

    // ✅ No orders case
    if (!orders || orders.length === 0) {
      return res.status(200).json({
        success: true,
        orders: [],
        message: "No orders found",
      });
    }

    // ✅ Success
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    // ✅ Detailed server log
    console.error("USER ORDERS ERROR:", error);

    // ✅ MongoDB validation error
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: "VALIDATION_ERROR",
        message: error.message,
      });
    }

    // ✅ Cast error (bad ID)
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "INVALID_ID",
        message: "Invalid user ID format",
      });
    }

    // ✅ Default error
    res.status(500).json({
      success: false,
      error: "SERVER_ERROR",
      message: "Failed to fetch orders",
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        message: "Order ID and status required",
      });
    }

    await orderModel.findByIdAndUpdate(orderId, {
      status,
    });

    res.status(200).json({
      success: true,
      message: "Order status updated",
    });
  } catch (error) {
    console.log("UPDATE STATUS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
};
