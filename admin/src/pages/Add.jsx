import React, { useEffect, useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestSeller] = useState(false);

  const [sizes, SetSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);

      // ✅ FIX HERE
      formData.append("subcategory", subCategory);

      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(
  backendUrl + "/api/product/add",
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      if(response.data.success){
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="space-y-6">
      {/* Upload Section */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-gray-700">Upload Images</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((num) => (
            <label
              key={num}
              htmlFor={`image${num}`}
              className="group flex cursor-pointer flex-col items-center justify-center
        rounded-xl border-2 border-dashed border-gray-300
        bg-gray-50 p-4 transition
        hover:border-gray-900 hover:bg-gray-100"
            >
              {/* Preview*/}
              <img
                src={
                  num === 1 && image1
                    ? URL.createObjectURL(image1)
                    : num === 2 && image2
                      ? URL.createObjectURL(image2)
                      : num === 3 && image3
                        ? URL.createObjectURL(image3)
                        : num === 4 && image4
                          ? URL.createObjectURL(image4)
                          : assets.upload_area
                }
                alt=""
                className="w-10 opacity-70 group-hover:opacity-100 transition"
              />

              <span className="mt-2 text-xs text-gray-500">Upload</span>

              {/* File Input */}
              <input
                type="file"
                name={`image${num}`} // ✅ REQUIRED
                id={`image${num}`}
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (num === 1) setImage1(file);
                  if (num === 2) setImage2(file);
                  if (num === 3) setImage3(file);
                  if (num === 4) setImage4(file);
                }}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-700">Product Name</p>

        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Enter product name"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                 text-gray-800 placeholder-gray-400
                 focus:border-gray-900 focus:outline-none transition"
        />
      </div>

      {/* Description */}
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-700">Product Description</p>

        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Enter product description"
          required
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                 text-gray-800 placeholder-gray-400
                 focus:border-gray-900 focus:outline-none transition resize-none"
        />
      </div>

      {/* Category + Subcategory */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Category */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-700">Product Category</p>

          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                   text-gray-800 bg-white
                   focus:border-gray-900 focus:outline-none transition"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kid">Kid</option>
          </select>
        </div>

        {/* Sub Category */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-700">Sub Category</p>

          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                   text-gray-800 bg-white
                   focus:border-gray-900 focus:outline-none transition"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
      </div>

      {/* Price */}
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-700">Product Price</p>

        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          type="number"
          placeholder="Enter price"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                 text-gray-800 placeholder-gray-400
                 focus:border-gray-900 focus:outline-none transition"
        />
      </div>

      {/* SIZE */}
      <div>
        <p className="mb-2">Product Sizes</p>
        <div>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-3">
              <div
                onClick={() =>
                  SetSizes((prev) =>
                    prev.includes("S")
                      ? prev.filter((item) => item !== "S")
                      : [...prev, "S"],
                  )
                }
                className={`min-w-[40px] cursor-pointer rounded-lg border px-4 py-2
    text-center text-sm font-medium transition active:scale-95
    ${
      sizes.includes("S")
        ? "bg-pink-200 border-pink-400 text-pink-900"
        : "border-gray-300 text-gray-700 hover:border-gray-900 hover:bg-gray-100"
    }`}
              >
                S
              </div>

              <div
                onClick={() =>
                  SetSizes((prev) =>
                    prev.includes("M")
                      ? prev.filter((item) => item !== "M")
                      : [...prev, "M"],
                  )
                }
                className={`min-w-[40px] cursor-pointer rounded-lg border px-4 py-2
    text-center text-sm font-medium transition active:scale-95
    ${
      sizes.includes("M")
        ? "bg-pink-200 border-pink-400 text-pink-900"
        : "border-gray-300 text-gray-700 hover:border-gray-900 hover:bg-gray-100"
    }`}
              >
                M
              </div>

              <div
                onClick={() =>
                  SetSizes((prev) =>
                    prev.includes("L")
                      ? prev.filter((item) => item !== "L")
                      : [...prev, "L"],
                  )
                }
                className={`min-w-[40px] cursor-pointer rounded-lg border px-4 py-2
    text-center text-sm font-medium transition active:scale-95
    ${
      sizes.includes("L")
        ? "bg-pink-200 border-pink-400 text-pink-900"
        : "border-gray-300 text-gray-700 hover:border-gray-900 hover:bg-gray-100"
    }`}
              >
                L
              </div>

              <div
                onClick={() =>
                  SetSizes((prev) =>
                    prev.includes("XL")
                      ? prev.filter((item) => item !== "XL")
                      : [...prev, "XL"],
                  )
                }
                className={`min-w-[40px] cursor-pointer rounded-lg border px-4 py-2
    text-center text-sm font-medium transition active:scale-95
    ${
      sizes.includes("XL")
        ? "bg-pink-200 border-pink-400 text-pink-900"
        : "border-gray-300 text-gray-700 hover:border-gray-900 hover:bg-gray-100"
    }`}
              >
                XL
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-2">
        <input
          onChange={() => setBestSeller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
          className="h-4 w-4 cursor-pointer accent-gray-900"
        />
        <label
          htmlFor="bestseller"
          className="cursor-pointer text-sm font-medium text-gray-700
               hover:text-black transition"
        >
          Add to Bestseller
        </label>
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto mt-4 rounded-lg bg-gray-900 px-8 py-3
             text-sm font-semibold text-white transition
             hover:bg-black active:scale-95 focus:outline-none"
      >
        Add Product
      </button>
    </form>
  );
};

export default Add;
