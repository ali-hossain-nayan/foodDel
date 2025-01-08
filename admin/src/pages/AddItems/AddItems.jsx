import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';


const AddItems = () => {
  // const url = "http://localhost:4001"

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  useEffect(() => {
    console.log(data);
  }, [data])


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)

    const callAPI = await axios.post(`/api/food/add`, formData);

    if (callAPI.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad"
      })
      setImage(false);
      toast.success(callAPI.data.message);
    } else {
      toast.error(callAPI.data.message);
    }

  }

  return (
    <div className="px-4 md:ml-12">
      <form onSubmit={onSubmitHandler}>
        <div>
          <p className="flex justify-start text-gray-700 mt-4">Upload Image</p>
          <label htmlFor="image">
            <img
              className="mt-2 cursor-pointer max-w-full rounded-lg  sm:max-w-xs"
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="upload"
            />
          </label>
          <input type="file" id="image" hidden required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div>
          <p className="flex justify-start mt-4">Product Name</p>
          <input
            className="border-2 w-full p-2 mt-2 rounded-md focus:outline-none"
            type="text"
            name="name"
            placeholder="type here"
            required
            onChange={onChangeHandler} value={data.name}
          />
        </div>
        <div>
          <p className="flex justify-start mt-4">Product description</p>
          <textarea
            className="border-2 w-full p-2 mt-2 rounded-md focus:outline-none"
            name="description"
            rows="6"
            placeholder="write content here"
            required
            onChange={onChangeHandler} value={data.description}

          ></textarea>
        </div>

        <div className="flex flex-col md:flex-row mt-4 gap-4">
          <div className="w-full">
            <p className="flex justify-start">Product category</p>
            <select
              className="border-2 w-full p-2 mt-2 rounded-md focus:outline-none cursor-pointer"
              name="category" required
              onChange={onChangeHandler} value={data.category}

            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="w-full">
            <p className="mt-4 md:mt-0">Product price</p>
            <input
              className="border-2 w-full p-2 mt-2 rounded-md focus:outline-none"
              type="number"
              name="price"
              placeholder="$25"
              required
              onChange={onChangeHandler} value={data.price}

            />
          </div>
        </div>

        <button
          className="rounded-md bg-[#137548] text-white w-full md:w-auto px-6 py-2 transition hover:bg-[#63d29e] mt-4"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddItems;
