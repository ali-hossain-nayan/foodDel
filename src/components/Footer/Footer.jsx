import React from 'react';

const Footer = () => {
    const handleScroll = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the section
        } else if (id === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top for "Home"
        }
    };

    return (
        <div id="footer" className="bg-gray-800 text-gray-300 mt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="">
                    <h2 className="text-xl font-bold text-white mb-4">COMPANY</h2>
                    <ul>
                        <li
                            onClick={() => handleScroll("/")}
                            className="mb-2 cursor-pointer hover:bg-[#137548] hover:text-white rounded-lg px-3 py-2 transition duration-300"
                        >
                            Home
                        </li>
                        <li
                            onClick={() => handleScroll("explore-menu")}
                            className="mb-2 cursor-pointer hover:bg-[#137548] hover:text-white rounded-lg px-3 py-2 transition duration-300"
                        >
                            Menu
                        </li>
                        <li
                            onClick={() => handleScroll("footer")}
                            className="mb-2 cursor-pointer hover:bg-[#137548] hover:text-white rounded-lg px-3 py-2 transition duration-300"
                        >
                            Contact
                        </li>
                        <li className="mb-2 cursor-pointer hover:bg-[#137548] hover:text-white rounded-lg px-3 py-2 transition duration-300">
                            Privacy Policy
                        </li>
                    </ul>
                </div>

                <div className="">
                    <h2 className="text-xl font-bold text-white mb-4">GET IN TOUCH</h2>
                    <ul>
                        <li className="mb-2">📞 <span>01690205129</span></li>
                        <li className="mb-2">✉️ <span>info@gmail.com</span></li>
                    </ul>
                </div>

                <div className="">
                    <h2 className="text-xl font-bold text-white mb-4">SUBSCRIBE</h2>
                    <p className="mb-4">Sign up to receive the latest updates and offers.</p>
                    <form className="flex flex-col sm:flex-row items-center gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#137548] text-gray-800"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 bg-[#137548] text-white rounded-lg hover:bg-green-700 transition duration-300"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <div className="bg-gray-900 text-gray-400 text-center py-4">
                <p>Copyright 2024 &copy; food-del.com | All Rights Reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
