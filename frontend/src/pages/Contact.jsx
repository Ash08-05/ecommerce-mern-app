import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Contact = () => {
  return (
    <div className="px-6 sm:px-10 md:px-20 my-24">

      {/* Contact Image */}
      <div className="relative mb-16 overflow-hidden rounded-2xl shadow-lg">

        <img
          src={assets.contact_img}
          alt="Contact"
          className="w-full h-64 sm:h-72 md:h-96 object-cover transition-transform duration-500 hover:scale-105"
        />

        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-black/10"></div>

      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* Info */}
        <div className="space-y-6">

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Contact Us
          </h1>

          <p className="text-gray-600 leading-7">
            Have questions, feedback, or need assistance? Our team is ready to
            help you. Reach out to us and we will respond as soon as possible.
          </p>

          <div className="space-y-3 text-gray-700 text-sm md:text-base">

            <p>Email: support@yourstore.com</p>
            <p>Phone: +91 75883 94591</p>
            <p>Working Hours: Mon - Sat, 9AM - 7PM</p>

          </div>

        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-md p-8">

          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Send a Message
          </h2>

          <form className="space-y-5">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-gray-900"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-gray-900"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-gray-900 resize-none"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-black transition"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Contact;
