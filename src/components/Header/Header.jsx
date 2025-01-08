import React from 'react';
import { assets } from '../../assets/assets';

const Header = () => {
    const handleScroll = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the section
        } else if (id === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top for "Home"
        }
    };
    return (
        <div
            className="mt-20 animate-pulse transition bg-no-repeat bg-cover bg-center w-full h-[600px] sm:h-[500px] md:h-[550px] lg:h-[600px] flex items-center justify-center"
            style={{ backgroundImage: `url(${assets.heroImg})` }}
        >
            <div className="text-center bg-white/80 p-6 sm:p-8 rounded-lg text-gray-800 max-w-[90%] sm:max-w-[75%] lg:max-w-[60%]">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                    Welcome to <span className="text-[#137548]">Fresh</span> Food
                </h1>
                <p className="mt-6 font-medium text-sm sm:text-base md:text-lg lg:text-xl">
                    We provide you the daily self-made best food in the city. Choose from a diverse menu <br className="hidden sm:block" />
                    featuring a delectable array of dishes.
                </p>
                <button onClick={() => handleScroll("explore-menu")} className="mt-4 transition border-2 px-6 py-3 rounded-full text-sm sm:text-base md:text-lg cursor-pointer hover:bg-[#137548] text-white bg-[#137548]/90 hover:border-[#137548]">
                    View Menu
                </button>
            </div>
        </div>
    );
};

export default Header;
