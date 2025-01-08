import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  return (
    <div className="border-r-2 min-h-screen bg-gray-100 p-4">
      <div className="space-y-6">
        {/* Add Items Link */}
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-md transition-colors ${isActive
              ? 'bg-[#1c734b] text-white'
              : 'bg-transparent text-gray-700 hover:bg-[#1c734b] hover:text-white'
            }`
          }
        >
          <img className="h-6 w-6 ml-2" src={assets.add_icon} alt="Add Items" />
          <p className="ml-3 text-sm font-medium">Add Items</p>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-md transition-colors ${isActive
              ? 'bg-[#1c734b] text-white'
              : 'bg-transparent text-gray-700 hover:bg-[#1c734b] hover:text-white'
            }`
          }
        >
          <img className="h-6 w-6 ml-2" src={assets.order_icon} alt="List Items" />
          <p className="ml-3 text-sm font-medium">List Items</p>
        </NavLink>

        <NavLink
          to="/order"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-md transition-colors ${isActive
              ? 'bg-[#1c734b] text-white'
              : 'bg-transparent text-gray-700 hover:bg-[#1c734b] hover:text-white'
            }`
          }
        >
          <img className="h-6 w-6 ml-2" src={assets.order_icon} alt="Order" />
          <p className="ml-3 text-sm font-medium">Order</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
