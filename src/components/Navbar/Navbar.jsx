import React, { useState, useEffect } from 'react';
import { assets, food_list } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTotalCartAmount } from '../../store/cartSlic/foodListSlice';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("Home");
    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [token, setToken] = useState(null);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const totalAmount = useSelector(getTotalCartAmount);

    const menuItems = [
        { name: "Home", id: "/" },
        { name: "Menu", id: "explore-menu" },
        { name: "Contact", id: "footer" },
    ];

    // Retrieve the token from localStorage when the component mounts
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    const handleSearch = (term) => {
        setSearchTerm(term);
        if (term.trim() === "") {
            setSearchResults([]);
        } else {
            const results = food_list.filter((item) =>
                item.name.toLowerCase().includes(term.toLowerCase())
            );
            setSearchResults(results);
        }
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token from localStorage
        setToken(null); // Reset the token state
        // alert("You have been logged out.");
        navigate("/");
    };

    return (
        <div className="flex p-4 justify-center shadow-lg bg-white">
            <ul className="flex gap-x-12 text-lg text-[#137548] font-bold cursor-pointer">
                {menuItems.map((item) => (
                    <li
                        key={item.name}
                        className={`transition ${menu === item.name
                            ? "border-b-4 border-[#137548] text-[#137548]"
                            : "hover:text-[#0a4d32] text-gray-500"
                            }`}
                        onClick={() => {
                            setMenu(item.name);
                            if (item.id) {
                                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>

            <div className="flex ml-60 gap-x-20 items-center relative">
                {/* Search Icon */}
                <img
                    src={assets.search_icon}
                    alt="search"
                    className="cursor-pointer"
                    onClick={() => setShowSearch(!showSearch)}
                />

                {/* Search Input */}
                {showSearch && (
                    <div className="absolute top-10 left-0 w-48 bg-white shadow-lg p-2 rounded-lg">
                        <input
                            type="text"
                            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none"
                            placeholder="Search food..."
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        {searchResults.length > 0 && (
                            <ul className="mt-2">
                                {searchResults.map((result) => (
                                    <li
                                        key={result._id}
                                        className="flex items-center gap-2 py-1 px-2 hover:bg-[#137548] hover:text-white rounded-lg cursor-pointer"
                                        onClick={() => {
                                            alert(`You selected: ${result.name}`);
                                            setShowSearch(false);
                                            setSearchTerm("");
                                        }}
                                    >
                                        <img src={result.image} alt={result.name} className="w-6 h-6 rounded-full" />
                                        {result.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {searchResults.length === 0 && searchTerm.trim() !== "" && (
                            <p className="text-gray-500 text-sm mt-2">No results found</p>
                        )}
                    </div>
                )}

                {/* Basket Icon */}
                <div className="relative">
                    <Link to="/cart">
                        <img src={assets.basket_icon} alt="basket" />
                    </Link>
                    <div
                        className={
                            totalAmount === 0
                                ? ""
                                : "absolute top-[-5px] right-[-6px] bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full"
                        }
                    >
                        {totalAmount}
                    </div>
                </div>

                {/* Profile or Sign In */}
                {token ? (
                    <div className="relative">
                        <img
                            src={assets.profile_icon}
                            alt="profile"
                            className="cursor-pointer"
                            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                        />
                        {showProfileDropdown && (
                            <ul className="absolute top-10 right-0 bg-white shadow-lg rounded-lg w-32">
                                <li
                                    className="flex items-center gap-2 p-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => alert("Orders clicked")}
                                >
                                    <img src={assets.bag_icon} alt="Orders" className="w-4 h-4" />
                                    <p>Orders</p>
                                </li>
                                <hr />
                                <li
                                    className="flex items-center gap-2 p-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    <img src={assets.logout_icon} alt="Logout" className="w-4 h-4" />
                                    <p>Logout</p>
                                </li>
                            </ul>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={() => setShowLogin(true)}
                        className="cursor-pointer transition hover:bg-[#137548] hover:text-white text-lg border-2 px-[14px] py-[4px] rounded-[20px] border-[#137548]"
                    >
                        Sign In
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
