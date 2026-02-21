import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductsItem from "./ProductsItem"; // ✅ Import component

const BestSeller = () => {

  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {

    if (!Array.isArray(products)) return;

    const bestProduct = products.filter(
      (item) => item.bestseller === true
    );

    setBestSeller(bestProduct.slice(0, 5));

  }, [products]);

  return (
    <div className="my-24">

      {/* Section Header */}
      <div className="flex flex-col items-center gap-4 text-center py-10">

        <Title text1={"BEST"} text2={"SELLER"} />

        <p className="mx-auto max-w-lg text-[15px] md:text-base leading-7 text-gray-600 tracking-wide">
          Discover our most loved products, handpicked by customers for their
          quality, comfort, and timeless style.
        </p>

      </div>

      {/* Best Seller Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">

        {
          bestSeller.map((item, index) => (
            <ProductsItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))
        }

      </div>

    </div>
  );
};

export default BestSeller;
