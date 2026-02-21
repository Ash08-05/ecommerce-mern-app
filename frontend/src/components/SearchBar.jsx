import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();
    useEffect(() => {
        if (location?.pathname?.includes('collection')) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location]);
    return showSearch && visible ? (
        <div className="border-t border-b  py-5 px-4">

            <div className="max-w-3xl mx-auto flex items-center justify-center gap-4">

                {/* Search Box */}
                <div className="flex items-center gap-3 border border-gray-300 bg-white rounded-full px-5 py-2 shadow-sm focus-within:border-gray-900 transition">

                    {/* Input */}
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-52 sm:w-64 md:w-80 outline-none text-sm md:text-base text-gray-700 placeholder-gray-400 bg-transparent"
                        type="text"
                        placeholder="Search for products..."
                        autoFocus
                    />

                    {/* Search Icon */}
                    <img
                        src={assets.search_icon}
                        alt="Search"
                        className="w-4 h-4 opacity-60"
                    />

                </div>

                {/* Close Button */}
                <button
                    onClick={() => setShowSearch(false)}
                    className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 transition"
                >
                    <img
                        src={assets.cross_icon}
                        alt="Close"
                        className="w-3 h-3 opacity-70"
                    />
                </button>

            </div>

        </div>
    ) : null;


}

export default SearchBar
