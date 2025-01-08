import React from 'react';
import { assets } from '../assets/assets';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <h3 className="text-[22px] font-bold text-[#1c734b] tracking-wide">
        Admin Dashboard
      </h3>

      <div className="flex items-center space-x-4">
        <p className="text-gray-700 text-sm hidden md:block">Welcome, Admin</p>
        <img
          className="rounded-full object-cover cursor-pointer shadow-md h-12 w-12 border-2 border-[#1c734b]"
          src={assets.profile_image}
          alt="Profile"
        />
      </div>
    </nav>
  );
};

export default Navbar;
