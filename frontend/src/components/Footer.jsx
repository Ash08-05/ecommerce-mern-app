import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="w-full text-gray-800 pt-16 pb-8 border-t border-gray-200">

            {/* Main Footer */}
            <div className="w-full px-12 md:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 text-center md:text-left">

                {/* About */}
                <div className="space-y-4">
                    <h3 className="text-gray-900 font-semibold text-lg">
                        About Us
                    </h3>

                    <p className="text-sm leading-relaxed text-gray-600">
                        Discover premium products crafted with quality, comfort, and
                        modern style. Your satisfaction is our top priority.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-gray-900 font-semibold text-lg mb-4">
                        Quick Links
                    </h3>

                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-black cursor-pointer transition">
                             <Link to={'/'}>
                                Home
                            </Link>
                        </li>
                        <li className="hover:text-black cursor-pointer transition">
                            <Link to={'/collection'}>
                                Collection
                            </Link>
                        </li>
                        <li className="hover:text-black cursor-pointer transition">
                             <Link to={'/about'}>
                                About Us
                            </Link>
                        </li>
                        <li className="hover:text-black cursor-pointer transition">
                            <Link to={'/contact'}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-gray-900 font-semibold text-lg mb-4">
                        Contact Us
                    </h3>

                    <ul className="space-y-2 text-sm text-gray-600">
                        <li>Email: support@yourstore.com</li>
                        <li>Phone: +91 75883 94591</li>
                        <li>Mon - Sat: 9AM - 7PM</li>
                    </ul>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200 mt-12 pt-6 text-center text-sm text-gray-500 px-6">

                © {new Date().getFullYear()} YourStore. All rights reserved.

            </div>

        </footer>

    );
};

export default Footer;
