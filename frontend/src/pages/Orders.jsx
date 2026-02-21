import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setorderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        let allOrderItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrderItem.push(item);
          });
        });
        setorderData(allOrderItem.reverse());
        // setorderData(response.data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);
  return (
    <div className="border-t pt-16 px-6 sm:px-10 md:px-20">
      {/* Page Title */}
      <div className="text-2xl mb-10 text-center sm:text-left">
        <Title text1={"My"} text2={"Orders"} />
      </div>
      <div className="space-y-6">
        {orderData.map((item, index) => (
          <div key={index} className="p-5 border rounded-xl bg-white shadow-sm">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Image */}
              <img
                className="w-24 h-24 object-cover rounded-lg border"
                src={item.image[0]}
                alt={item.name}
              />

              {/* Info */}
              <div className="flex-1 space-y-2">
                <p className="text-base sm:text-lg font-semibold text-gray-900">
                  {item.name}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <p>
                    {currency}
                    {item.price}
                  </p>

                  <p>Qty: {item.quantity}</p>

                  <p>Size: {item.size}</p>

                  <p>Payment: {item.paymentMethod}</p>
                </div>

                <p className="text-sm text-gray-500">
                  Date: <span>{new Date(item.date).toDateString()}</span>
                </p>
              </div>

              {/* Status */}
              <div className="flex sm:flex-col items-start sm:items-end gap-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />

                  <p className="text-green-600">
                    {item.status || "Processing"}
                  </p>
                </div>
              </div>
              <button
                onClick={loadOrderData}
                type="button"
                className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg
             text-gray-700 hover:bg-gray-100 hover:border-gray-500
             transition duration-200 active:scale-95"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
