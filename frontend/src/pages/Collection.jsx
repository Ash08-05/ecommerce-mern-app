import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductsItem from "../components/ProductsItem";
import Title from "../components/Title";

const Collection = () => {
  const { products, search } = useContext(ShopContext);

  const [ShowFilter, setShowFilter] = useState(false);

  // Filters
  const [category, setCategory] = useState([]);
  const [style, setStyle] = useState([]);

  // Sorting
  const [sortType, setSortType] = useState("relevant");

  // Final Products
  const [filteredProducts, setFilteredProducts] = useState([]);

  /* ---------------- Filter Handlers ---------------- */

  const handleCategory = (e) => {
    const value = e.target.value;

    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleStyle = (e) => {
    const value = e.target.value;

    setStyle((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

 

  useEffect(() => {
    let tempProducts = [...(products || [])];

    // Search Filter
    if (search && search.trim() !== "") {
      tempProducts = tempProducts.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category Filter
    if (category.length > 0) {
      tempProducts = tempProducts.filter((item) =>
        category.includes(item.category)
      );
    }

    // Style Filter
    if (style.length > 0) {
      tempProducts = tempProducts.filter((item) =>
        style.includes(item.subCategory)
      );
    }

    // Sorting
    if (sortType === "low-high") {
      tempProducts.sort((a, b) => a.price - b.price);
    }

    if (sortType === "high-low") {
      tempProducts.sort((a, b) => b.price - a.price);
    }

    if (sortType === "newest") {
      tempProducts.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    }

    setFilteredProducts(tempProducts);

  }, [products, category, style, sortType, search]);

  return (
    <div className="w-full max-w-none px-6 sm:px-10 md:px-20 my-28">

      <div className="flex flex-col lg:flex-row gap-12">

        {/* ================= Overlay (Mobile) ================= */}
        {ShowFilter && (
          <div
            onClick={() => setShowFilter(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )}

        {/* ================= Sidebar ================= */}
        <aside
          className={`fixed lg:static top-0 left-0 h-full lg:h-auto w-72 bg-white z-50
          transform transition-transform duration-300
          ${ShowFilter ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        >

          <div className="sticky top-0 lg:top-24 rounded-none lg:rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            {/* Mobile Header */}
            <div className="flex justify-between items-center mb-6 lg:hidden">

              <h2 className="text-lg font-semibold">
                Filters
              </h2>

              <button
                onClick={() => setShowFilter(false)}
                className="text-2xl font-bold text-gray-600"
              >
                ×
              </button>

            </div>

            {/* Desktop Title */}
            <h2 className="hidden lg:block text-lg font-semibold text-gray-900 mb-6">
              Filters
            </h2>

            {/* Category */}
            <div className="mb-8">

              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Category
              </p>

              <div className="space-y-3 text-sm text-gray-700">

                {["Men", "Women", "Kids"].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 cursor-pointer hover:text-black transition"
                  >
                    <input
                      type="checkbox"
                      value={item}
                      onChange={handleCategory}
                      className="accent-gray-900"
                    />
                    {item}
                  </label>
                ))}

              </div>

            </div>

            {/* Style */}
            <div>

              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Style
              </p>

              <div className="space-y-3 text-sm text-gray-700">

                {["Topwear", "Bottomwear", "Winterwear"].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 cursor-pointer hover:text-black transition"
                  >
                    <input
                      type="checkbox"
                      value={item}
                      onChange={handleStyle}
                      className="accent-gray-900"
                    />
                    {item}
                  </label>
                ))}

              </div>

            </div>

          </div>

        </aside>

        {/* ================= Main ================= */}
        <main className="flex-1 w-full">

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-14">

            <div className="text-center sm:text-left space-y-2">

              <Title text1={"ALL"} text2={"COLLECTIONS"} />

              <p className="max-w-md text-sm text-gray-500">
                Browse our complete range of premium products.
              </p>

            </div>

            <div className="flex items-center gap-4">

              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFilter(true)}
                className="lg:hidden border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100 transition"
              >
                Filters
              </button>

              {/* Sort */}
              <div className="relative">

                <select
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value)}
                  className="appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-gray-700 shadow-sm outline-none focus:border-gray-900"
                >
                  <option value="relevant">Relevant</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  ▼
                </span>

              </div>

            </div>

          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">

            {
              filteredProducts.length > 0 ? (
                filteredProducts.map((item, index) => (
                  <ProductsItem
                    key={index}
                    id={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                  />
                ))
              ) : (
                <p className="col-span-full py-32 text-center text-gray-500">
                  No products found.
                </p>
              )
            }

          </div>

        </main>

      </div>

    </div>
  );
};

export default Collection;
