import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductsItem from './ProductsItem';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [LastestProducts, setLatestProducts] = useState([]);
    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
    }, [])
    return (
        <div className="my-24">

            {/* Section Header */}
            <div className="flex flex-col items-center gap-4 text-center mb-12">

                <Title text1={"LATEST"} text2={"COLLECTION"} />

                <p className="mx-auto max-w-xl text-center text-[15px] md:text-base leading-7 text-gray-600 tracking-wide">
                    Explore our newest arrivals, crafted with premium quality and modern
                    designs to elevate your everyday style.
                </p>

            </div>

            {/* Display Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">

                {
                    LastestProducts.map((item, index) => (
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



    )
}

export default LatestCollection
