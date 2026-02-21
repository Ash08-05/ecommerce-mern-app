import axios from "axios";
import React, { useState, useEffect } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.post(
  backendUrl + "/api/product/list",
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      if (response.data.success) {
        setList(response.data.products); // must match backend
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching products");
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } },
      );

      if (response.data.success) {
        toast.success("Product deleted");
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-full px-6 py-8">
      <h2 className="text-2xl font-semibold mb-6">Product List</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Bestseller</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-700">
            {list.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              list.map((item) => (
                <tr
                  key={item._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">
                    <img
                      src={item.image[0]}
                      alt=""
                      className="w-14 h-14 object-cover rounded-md"
                    />
                  </td>

                  <td className="px-4 py-3 font-medium">{item.name}</td>

                  <td className="px-4 py-3 max-w-xs truncate">
                    {item.description}
                  </td>

                  <td className="px-4 py-3">{item.category}</td>

                  <td className="px-4 py-3">₹{item.price}</td>

                  <td className="px-4 py-3">
                    {item.bestseller ? (
                      <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                      <span className="text-gray-400">No</span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => removeProduct(item._id)}
                      className="rounded-md bg-red-500 px-4 py-2 text-xs font-medium text-white
                                 hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
