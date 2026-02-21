import React from "react";

const Title = ({ text1, text2 }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-2 mb-6 text-center">

            {/* Text */}
            <p className="text-sm md:text-base tracking-wide text-gray-500">
                {text1}
                <span className="ml-1 text-gray-900 font-semibold">
                    {text2}
                </span>
            </p>

            {/* Accent Line */}
            <span className="h-[2px] w-12 bg-gradient-to-r from-gray-900 to-gray-400 rounded-full" />

        </div>

    );
};

export default Title;
