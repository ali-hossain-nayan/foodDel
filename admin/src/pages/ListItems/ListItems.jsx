import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ListItems = () => {
  const [list, setList] = useState([]);
  const url = "http://localhost:4001";

  const fetchMenuList = async () => {
    try {
      const response = await axios.get("/api/food/list");
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Something went wrong!!");
      }
    } catch (error) {
      toast.error("Failed to fetch data!");
    }
  };

  const removeFood = async (foodId) => {
    console.log(foodId)
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success("Item removed successfully!");
        // Update the list by filtering out the removed item
        //await fetchMenuList(); instead of below line for update list again
        setList(list.filter(item => item._id !== foodId));
      } else {
        toast.error("Failed to remove item!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove item!");
    }
  };

  useEffect(() => {
    fetchMenuList();
  }, []);

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl text-center text-[#137548] mb-6">All Menu List</h1>

      {/* Titles */}
      <div className="grid grid-cols-5 gap-4 bg-gray-200 p-4 rounded-t-lg text-sm font-semibold">
        <p className="text-center">Image</p>
        <p className="text-center">Name</p>
        <p className="text-center">Category</p>
        <p className="text-center">Price</p>
        <p className="text-center">Action</p>
      </div>

      {/* Data Rows */}
      <div className="divide-y divide-gray-300">
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-5 gap-4 items-center bg-white p-4 text-center"
          >
            <img
              className="w-20 h-20 object-cover mx-auto rounded-lg"
              src={`${url}/images/${item.image}`}
              alt="Food"
            />
            <p className="text-gray-800 font-medium">{item.name}</p>
            <p className="text-gray-600">{item.category}</p>
            <p className="text-gray-800 font-semibold">${item.price}</p>
            <button
              className="bg-[#137548] text-white px-4 py-2 rounded-md hover:bg-[#7cc9a5] transition"
              onClick={() => removeFood(item._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListItems;
