import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Policy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-6 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 ">

      {/* Exchange */}
      <div className="flex flex-col items-center gap-3 max-w-xs">
        <img
          src={assets.exchange_icon}
          className="w-12 h-12 object-contain opacity-80"
          alt="Easy Exchange"
        />
        <p className="font-semibold text-gray-900">
          Easy Exchange
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          We offer a quick and hassle-free exchange process for your convenience.
        </p>
      </div>

      {/* Quality */}
      <div className="flex flex-col items-center gap-3 max-w-xs">
        <img
          src={assets.quality_icon}
          className="w-12 h-12 object-contain opacity-80"
          alt="Quality Assurance"
        />
        <p className="font-semibold text-gray-900">
          Quality Assurance
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Every product is carefully checked to meet our high quality standards.
        </p>
      </div>

      {/* Support */}
      <div className="flex flex-col items-center gap-3 max-w-xs">
        <img
          src={assets.support_img}
          className="w-12 h-12 object-contain opacity-80"
          alt="Customer Support"
        />
        <p className="font-semibold text-gray-900">
          24/7 Support
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Our support team is always available to help you anytime you need.
        </p>
      </div>

    </div>
  )
}

export default Policy
