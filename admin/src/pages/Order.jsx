import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Order = ({ token }) => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);


  /* ================= FETCH ALL ORDERS ================= */

  const fetchAllOrder = async () => {

    if (!token) return;

    try {

      setLoading(true);

      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {

      console.log(error);
      toast.error("Failed to load orders");

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchAllOrder();
  }, [token]);


  /* ================= UPDATE STATUS ================= */

  const updateOrderStatus = async (orderId, status) => {

    try {

      const response = await axios.post(
        backendUrl + "/api/order/status",
        {
          orderId,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {

        toast.success("Status updated");

        fetchAllOrder(); // refresh

      } else {
        toast.error(response.data.message);
      }

    } catch (error) {

      console.log(error);

      toast.error("Failed to update status");
    }
  };


  /* ================= STATUS COLOR ================= */

  const getStatusColor = (status) => {

    switch (status) {

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Shipped":
        return "bg-blue-100 text-blue-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      case "Out for Delivery":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };


  return (

    <div className="p-6 max-w-6xl mx-auto">

      {/* Title */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Order Management
      </h1>


      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500">
          Loading orders...
        </p>
      )}


      {/* Empty */}
      {!loading && orders.length === 0 && (
        <p className="text-center text-gray-500">
          No orders found
        </p>
      )}


      {/* Orders */}
      <div className="space-y-6">

        {orders.map((order) => (

          <div
            key={order._id}
            className="border rounded-xl p-6 bg-white shadow-sm"
          >

            {/* ================= HEADER ================= */}

            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">

              {/* Order Info */}
              <div>

                <p className="text-sm text-gray-500">
                  Order ID
                </p>

                <p className="font-mono text-sm">
                  {order._id}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Date:{" "}
                  {new Date(order.date).toLocaleString()}
                </p>

              </div>


              {/* Status */}
              <div className="flex items-center gap-3">

                <select
                  value={order.status || "Processing"}
                  onChange={(e) =>
                    updateOrderStatus(order._id, e.target.value)
                  }
                  className={`px-3 py-1 rounded-md text-sm font-medium border
                  ${getStatusColor(order.status)}`}
                >

                  <option value="Processing">Processing</option>
                  <option value="Packed">Packed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">
                    Out for Delivery
                  </option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>

                </select>

              </div>

            </div>


            {/* ================= CUSTOMER ================= */}

            <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg mb-4">

              {/* Customer */}
              <div>

                <p className="font-medium text-gray-700 mb-1">
                  Customer Details
                </p>

                <p>{order.address.firstName} {order.address.lastName}</p>

                <p className="text-sm text-gray-600">
                  {order.address.email}
                </p>

                <p className="text-sm text-gray-600">
                  {order.address.phone}
                </p>

              </div>


              {/* Address */}
              <div>

                <p className="font-medium text-gray-700 mb-1">
                  Shipping Address
                </p>

                <p className="text-sm text-gray-600">

                  {order.address.street}, {order.address.city},
                  {order.address.state} - {order.address.zipcode}

                </p>

                <p className="text-sm text-gray-600">
                  {order.address.country}
                </p>

              </div>

            </div>


            {/* ================= ITEMS ================= */}

            <div className="divide-y">

              {order.items.map((item, i) => (

                <div
                  key={i}
                  className="flex flex-col sm:flex-row gap-4 py-4"
                >

                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg border"
                  />

                  <div className="flex-1">

                    <p className="font-medium">
                      {item.name}
                    </p>

                    <div className="text-sm text-gray-600 mt-1 space-x-4">

                      <span>₹{item.price}</span>

                      <span>Qty: {item.quantity}</span>

                      <span>Size: {item.size}</span>

                    </div>

                  </div>

                </div>

              ))}

            </div>


            {/* ================= FOOTER ================= */}

            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4 pt-4 border-t">

              <p className="text-sm">

                Payment:{" "}
                <span className="font-medium">

                  {order.paymentMethod}

                </span>

                {order.payment ? " (Paid)" : " (Pending)"}

              </p>


              <p className="font-semibold text-lg">

                Total: ₹{order.amount}

              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Order;