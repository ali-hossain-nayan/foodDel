import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { getTotalCartAmount, token, setToken, food_list, baseURL } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, [setToken]);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken('');
    navigate("/");
  };

  const handleOrdersClick = () => {
    navigate('/myorders');
    setShowProfileDropdown(false);
    setMobileMenuOpen(false);
  };

  const totalAmount = getTotalCartAmount();

  const menuItems = [
    { name: "Home", id: "/" },
    { name: "Menu", id: "explore-menu" },
    { name: "Contact", id: "footer" },
  ];

  const handleNavClick = (item) => {
    setMenu(item.name);
    setMobileMenuOpen(false);

    if (item.id.startsWith('/')) {
      navigate(item.id);
    } else {
      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 relative z-30">
      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-between items-center max-w-7xl mx-auto">
        {/* Menu */}
        <ul className="flex gap-x-12 text-lg text-[#137548] font-bold cursor-pointer">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`transition ${menu === item.name ? "border-b-4 border-[#137548]" : "hover:text-[#0a4d32] text-gray-500"}`}
              onClick={() => handleNavClick(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-6 relative">
          {/* Search */}
          <img src={assets.search_icon} alt="search" className="cursor-pointer" onClick={() => setShowSearch(!showSearch)} />

          {/* Cart */}
          <div className="relative">
            <Link to="/cart">
              <img src={assets.basket_icon} alt="basket" />
            </Link>
            {totalAmount > 0 && (
              <div className="absolute top-[-5px] right-[-6px] bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {totalAmount}
              </div>
            )}
          </div>

          {/* Profile */}
          {token ? (
            <div className="relative">
              <img src={assets.profile_icon} alt="profile" className="cursor-pointer" onClick={() => setShowProfileDropdown(!showProfileDropdown)} />
              {showProfileDropdown && (
                <ul className="absolute top-10 right-0 bg-white shadow-lg rounded-lg w-32 z-30">
                  <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={handleOrdersClick}>
                    Orders
                  </li>
                  <hr />
                  <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>
                    Logout
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <button onClick={() => setShowLogin(true)} className="transition hover:bg-[#137548] hover:text-white text-lg border-2 px-[14px] py-[4px] rounded-[20px] border-[#137548]">
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Mobile Top Bar */}
      <div className="flex justify-between items-center md:hidden">
        <h2 className="text-xl font-bold text-[#137548]">Food App</h2>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? (
            <HiOutlineX className="text-2xl text-[#137548]" />
          ) : (
            <HiOutlineMenu className="text-2xl text-[#137548]" />
          )}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-4 text-center text-[#137548] font-bold">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="cursor-pointer border-b pb-2"
              onClick={() => handleNavClick(item)}
            >
              {item.name}
            </div>
          ))}

          {token ? (
            <>
              <div onClick={handleOrdersClick} className="cursor-pointer border-b pb-2">Orders</div>
              <div onClick={handleLogout} className="cursor-pointer border-b pb-2">Logout</div>
            </>
          ) : (
            <button onClick={() => { setShowLogin(true); setMobileMenuOpen(false); }} className="w-full bg-[#137548] text-white py-2 rounded-md">
              Sign In
            </button>
          )}
        </div>
      )}

      {/* Search Input */}
      {showSearch && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-72 bg-white shadow-lg p-2 rounded-lg z-50">
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none"
            placeholder="Search food..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {searchResults.length > 0 ? (
            <ul className="mt-2 max-h-48 overflow-y-auto">
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
                  <img src={`${baseURL}/images/${result.image}`} alt={result.name} className="w-6 h-6 rounded-full" />
                  {result.name}
                </li>
              ))}
            </ul>
          ) : searchTerm.trim() !== "" ? (
            <p className="text-gray-500 text-sm mt-2">No results found</p>
          ) : null}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
