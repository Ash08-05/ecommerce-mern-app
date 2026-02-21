import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="px-6 sm:px-10 md:px-20 my-24">

      {/* Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Image */}
        <div className="overflow-hidden rounded-2xl shadow-md">
          <img
            src={assets.about_img}
            alt="About Us"
            className="w-full h-full object-cover hover:scale-105 transition duration-500"
          />
        </div>

        {/* Content */}
        <div className="space-y-6">

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            About Our Store
          </h1>

          <p className="text-gray-600 leading-7">
            We are dedicated to delivering premium quality products that blend
            comfort, style, and affordability. Our mission is to create an
            exceptional shopping experience for customers across India.
          </p>

          <p className="text-gray-600 leading-7">
            From carefully selected materials to modern designs, every product
            is crafted with attention to detail and customer satisfaction.
          </p>

          <div className="pt-4">

            <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition">
              <Link to={'/collection'}>
                Explore Collection
              </Link> 
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default About;
