import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import ProductsItem from "../components/ProductsItem";

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { products, currency, addToCart } = useContext(ShopContext);

  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [related, setRelated] = useState([]);

  /* ---------------- Fetch Product ---------------- */

  useEffect(() => {
    if (products && products.length > 0) {
      const found = products.find((item) => item._id === productId);

      setProduct(found);

      if (found?.image?.length) {
        setImage(found.image[0]);
      }
    }
  }, [products, productId]);

  /* ---------------- Related Products ---------------- */

  useEffect(() => {
    if (product && products?.length > 0) {
      const relatedProducts = products
        .filter(
          (item) =>
            item.category === product.category && item._id !== product._id,
        )
        .slice(0, 5);

      setRelated(relatedProducts);
    }
  }, [product, products]);

  /* ---------------- Loading ---------------- */

  if (!product) {
    return (
      <div className="py-32 text-center text-gray-500">Loading product...</div>
    );
  }

  return (
    <div className="px-6 sm:px-10 md:px-20 my-28">
      {/* ================= Main Product ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* ================= Images ================= */}
        <div className="space-y-5">
          {/* Main Image */}
          <div className="group overflow-hidden rounded-3xl border bg-gray-50 shadow-sm">
            <img
              src={image}
              alt={product.name}
              className="w-full h-[420px] object-cover transition duration-500 group-hover:scale-105"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                onClick={() => setImage(img)}
                className={`w-20 h-20 rounded-xl object-cover cursor-pointer border transition
                ${
                  image === img
                    ? "border-gray-900 ring-2 ring-gray-900/30"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ================= Info ================= */}
        <div className="lg:sticky lg:top-28 space-y-7">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>

          {/* Rating (Mock) */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="flex gap-1 text-yellow-500">★★★★☆</div>

            <span>(124 reviews)</span>
          </div>

          {/* Price */}
          <p className="text-3xl font-semibold text-gray-900">
            {currency}
            {product.price}
          </p>

          {/* Description */}
          <p className="text-gray-600 leading-7 max-w-lg">
            {product.description}
          </p>

          {/* Sizes */}
          {product.size?.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-800 mb-3">
                Select Size
              </p>

              <div className="flex flex-wrap gap-3">
                {product.size.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSize(item)}
                    className={`min-w-[48px] px-4 py-2 border rounded-lg text-sm font-medium transition
          ${
            size === item
              ? "bg-gray-900 text-white border-gray-900"
              : "border-gray-300 hover:border-gray-900 hover:bg-gray-50"
          }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => {
                addToCart(product._id, size);
                navigate("/cart");
              }}
              disabled={product.sizes?.length > 0 && !size}
              className="flex-1 px-8 py-4 bg-gray-900 text-white rounded-xl text-sm font-semibold
              hover:bg-black transition disabled:opacity-50"
            >
              Add to Cart
            </button>

            {/* Wishlist */}
            <button className="px-5 py-4 border border-gray-300 rounded-xl hover:border-gray-900 transition">
              ♡
            </button>
          </div>

          {/* Extra Info */}
          <div className="pt-6 border-t space-y-2 text-sm text-gray-600">
            <p>Free delivery on orders above ₹999</p>
            <p>7 days easy return</p>
            <p>100% genuine products</p>
          </div>
        </div>
      </div>

      {/* ================= Related Products ================= */}
      {related.length > 0 && (
        <div className="mt-32">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Related Products
            </h2>

            <p className="text-sm text-gray-500">
              You may also like these items
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            {related.map((item, index) => (
              <ProductsItem
                key={index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
