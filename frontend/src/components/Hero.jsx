import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Hero = () => {
    return (
        <div className="flex flex-col sm:flex-row border border-gray-300 rounded-xl overflow-hidden shadow-sm bg-gradient-to-br from-white to-gray-50">
            {/* hero left side */}
            <div className="w-full sm:w-1/2 flex items-center justify-center py-12 sm:py-0">
                <div className="text-[#414141] space-y-3">
                    <div className="flex items-center gap-3">
                        <p className="w-10 md:w-12 h-[2px] bg-[#414141] opacity-70"></p>
                        <p className="font-semibold tracking-wider text-xs md:text-sm uppercase">
                            Best Sellers
                        </p>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold leading-relaxed"
                        style={{ fontFamily: "Playfair" }}>
                        Latest Arrival
                    </h1>
                    <p className="text-sm md:text-base text-gray-500 max-w-sm">
                        Discover our newest collection crafted for modern style and comfort.
                    </p>
                </div>
            </div>
            {/* right side */}
            <img
                src={assets.hero_img}
                alt=""
                className="w-full sm:w-1/2 h-[280px] sm:h-full object-cover object-center rounded-tr-xl rounded-br-xl"
            />

        </div>

    )
}

export default Hero
