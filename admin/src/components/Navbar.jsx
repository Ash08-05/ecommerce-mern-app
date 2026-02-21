import React from 'react'
import { assets } from '../assets/admin_assets/assets.js'
const Navbar = ({setToken}) => {
    return (
        <div className="flex items-center justify-between py-3 px-[4%]">
            <img
                className="w-[max(10%,85px)] object-contain"
                src={assets.logo}
                alt="Logo"
            />
            <button onClick={() =>setToken('')}
                className="cursor-pointer rounded-lg bg-gray-800 px-5 py-2 text-sm font-medium text-white
               transition hover:bg-black active:scale-95"
            >Logout</button>
        </div>
    )
}
export default Navbar
