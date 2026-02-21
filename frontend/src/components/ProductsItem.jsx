import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductsItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);
    return (
        <Link
            className="group cursor-pointer text-gray-800 block"
            to={`/product/${id}`}
        >
            <div className="overflow-hidden rounded-xl shadow-sm bg-gray-50">

                <img
                    src={image[0]}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />

            </div>
            <p className="mt-3 text-sm md:text-base font-medium text-gray-800 truncate">
                {name}
            </p>

            <p className="mt-1 text-sm md:text-base font-semibold text-gray-900">
                {currency}{price}
            </p>

        </Link>


    )
}

export default ProductsItem
