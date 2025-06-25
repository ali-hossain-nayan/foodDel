import React from 'react';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div className="mt-20 px-4" id="explore-menu">
            <h1 className="text-4xl text-center font-bold text-[#137548]">
                Explore Our Menu
            </h1>
            <p
            className="mt-4 text-center text-lg text-gray-700">
                Choose the diverse food items you want to taste.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 justify-items-center mt-12">
                {menu_list.map((item, index) => {
                    return (<div
                        key={index}
                        onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
                        className="flex flex-col items-center text-center bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 cursor-pointer"
                    >
                        <img
                            src={item.menu_image}
                            alt="menu-img"
                            className={`w-full h-40 object-cover rounded-md ${category === item.menu_name ? "border-2 border-[#137548] rounded-3xl transition" : ""}`}
                        />
                        <p className="mt-4 text-lg font-medium text-gray-800">
                            {item.menu_name}
                        </p>
                    </div>
                    )
})}
            </div>
        </div>
    );
};

export default ExploreMenu;
