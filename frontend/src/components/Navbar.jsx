import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets.js";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const { setShowSearch, cartItems, navigate, setToken, token, setCartItems } =
    useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };
  /* Cart Count */
  const getCartCount = () => {
    let count = 0;

    for (const id in cartItems) {
      for (const size in cartItems[id]) {
        count += cartItems[id][size];
      }
    }

    return count;
  };

 return (
  <div className="flex items-center justify-between py-5 font-medium">

    {/* Logo */}
    <Link to="/">
      <img
        src={assets.logo}
        className="w-36 cursor-pointer hover:scale-105 hover:opacity-90 transition-all duration-300"
        alt="Logo"
      />
    </Link>

    {/* Nav Links */}
    <ul className="hidden md:flex gap-10 text-gray-700 tracking-wide">
      {[
        { name: "Home", to: "/" },
        { name: "Collection", to: "/collection" },
        { name: "About", to: "/about" },
        { name: "Contact", to: "/contact" },
      ].map((item) => (
        <NavLink
          key={item.name}
          to={item.to}
          className="group relative cursor-pointer"
        >
          <p className="transition-all duration-300 group-hover:text-black">
            {item.name}
          </p>
          <hr className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
        </NavLink>
      ))}
    </ul>

    {/* Right Icons */}
    <div className="flex items-center gap-6">

      {/* Search */}
      <img
        onClick={() => setShowSearch(true)}
        src={assets.search_icon}
        className="w-5 cursor-pointer opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-200"
        alt="Search"
      />

      {/* Profile */}
      <div className="relative group cursor-pointer">

        <img
          onClick={() => (token ? null : navigate("/login"))}
          src={assets.profile_icon}
          className="w-6 opacity-70 transition-all duration-200 group-hover:opacity-100 group-hover:scale-110"
          alt="Profile"
        />

        {/* Dropdown */}
        {token && (
          <div className="absolute right-0 pt-4 hidden group-hover:block">
            <div className="flex min-w-[160px] flex-col rounded-lg bg-white py-2 shadow-lg ring-1 ring-black/5">

              <p className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition">
                My Profile
              </p>

              <p onClick={()=>navigate('/orders')} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition">
                Orders
              </p>

              <p
                onClick={logout}
                className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition cursor-pointer"
              >
                Logout
              </p>

            </div>
          </div>
        )}

      </div>

      {/* Cart */}
      <Link
        to="/cart"
        className="relative flex items-center justify-center group"
      >
        <img
          src={assets.cart_icon}
          className="w-5 min-w-5 opacity-70 transition-all duration-200 group-hover:opacity-100 group-hover:scale-110"
          alt="Cart"
        />

        {/* Badge */}
        {getCartCount() > 0 && (
          <p className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-gray-900 text-[10px] font-semibold text-white shadow">
            {getCartCount()}
          </p>
        )}
      </Link>

      {/* Mobile Menu */}
      <img
        onClick={() => setVisible(true)}
        src={assets.menu_icon}
        className="w-5 cursor-pointer sm:hidden"
        alt=""
      />

    </div>

    {/* Sidebar */}
    <div
      className={`fixed top-0 right-0 h-full z-50 bg-white shadow-2xl transition-all duration-300
      ${visible ? "w-72" : "w-0"}`}
    >

      {/* Close */}
      <div className="flex justify-end p-4">
        <img
          onClick={() => setVisible(false)}
          src={assets.cross_icon}
          className="w-5 cursor-pointer opacity-70 hover:opacity-100"
          alt="Close"
        />
      </div>

      {/* Menu */}
      <ul className="flex flex-col gap-6 px-6 text-gray-700 font-medium">

        {["/", "/collection", "/about", "/contact"].map((path, i) => (
          <NavLink
            key={i}
            to={path}
            onClick={() => setVisible(false)}
            className="hover:text-black transition"
          >
            {["Home", "Collection", "About", "Contact"][i]}
          </NavLink>
        ))}

      </ul>

    </div>

  </div>
);
}

export default Navbar;
