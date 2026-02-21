import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/admin_assets/assets'

const Sidebar = () => {
    return (
        <div className="w-[18%] min-h-screen border-r-1 bg-white">
            <div className="flex flex-col pt-6 pl-[20%] text-[15px] gap-4">
                <NavLink
                    to="/add"
                    className="flex items-center justify-center md:justify-start gap-3rounded-lg px-3 md:px-4 py-3 text-gray-700text-sm font-medium transitionhover:bg-gray-100 hover:text-blackactive:bg-gray-200">
                    <img
                        src={assets.add_icon}
                        alt="Add"
                        className="w-5 h-5 " />
                    <p className='hidden md:block'>Add Items</p>
                </NavLink>
                <NavLink
                    to="/list"
                    className="flex items-center justify-center md:justify-start gap-3rounded-lg px-3 md:px-4 py-3 text-gray-700text-sm font-medium transitionhover:bg-gray-100 hover:text-blackactive:bg-gray-200">
                    <img src={assets.order_icon} alt="Add" className="w-5 h-5 " />
                    <p className='hidden md:block'>
                        List Items
                    </p>
                </NavLink>
                <NavLink
                    to="/order"
                    className="flex items-center justify-center md:justify-start gap-3rounded-lg px-3 md:px-4 py-3 text-gray-700text-sm font-medium transitionhover:bg-gray-100 hover:text-blackactive:bg-gray-200">
                    <img
                        src={assets.order_icon}
                        alt="Add"
                        className="w-5 h-5 "
                    />
                    <p className='hidden md:block'>
                        Orders
                    </p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar
