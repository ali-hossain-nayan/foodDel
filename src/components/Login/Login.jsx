import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { data } from "autoprefixer";
import axios from "axios";

const Login = ({ setShowLogin }) => {
    const [curState, setCurState] = useState("Sign Up");
    const [token, setToken] = useState("");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (e) => {
        e.preventDefault();
        let newUrl = ""; // Initialize the variable
        if (curState === "Login") {
            newUrl = "/api/user/login";
        } else {
            newUrl = "/api/user/signup";
        }
        try {
            const response = await axios.post(newUrl, data);
            if (response.data.success) {
                setToken(response.data.token); // Save the token
                localStorage.setItem("token", response.data.token); // Store in localStorage
                setShowLogin(false); // Close the login modal
            } else {
                alert(response.data.message); // Show error message
            }
        } catch (error) {
            console.error("Error during API call:", error);
            alert("An error occurred. Please try again.");
        }
    };


    useEffect(() => {
        console.log(data)
    }, [data])
    return (
        <div className="fixed justify-center items-center inset-0 z-10 bg-black bg-opacity-60 grid ">
            <form onSubmit={onLogin} className=" w-[min(23vw,330px)] text-gray-500 bg-white flex flex-col gap-6 p-6 rounded-lg  animate-fadeIn">
                <div className="flex justify-between items-center text-black">
                    <h2 className="font-bold">{curState}</h2>
                    <img
                        className="w-4 cursor-pointer"
                        onClick={() => setShowLogin(false)}
                        src={assets.cross_icon}
                        alt="cross-icon"
                    />
                </div>

                <div className="flex flex-col gap-4">
                    {curState === "Login" ? null : (
                        <input
                            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-gray-500"
                            type="text"
                            placeholder="Your name"
                            required
                            name="name"
                            onChange={onChangeHandler}
                            value={data.name}
                        />
                    )}
                    <input
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-gray-500"
                        type="email"
                        placeholder="Your email"
                        required
                        name="email"
                        onChange={onChangeHandler}
                        value={data.email}
                    />
                    <input
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-gray-500"
                        type="password"
                        placeholder="Your password"
                        required
                        name="password"
                        onChange={onChangeHandler}
                        value={data.password}
                    />
                </div>

                <button type="submit" className="border-none p-2 rounded-md text-white hover:bg-[#2f9f6b] bg-[#137548] text-sm  transition">
                    {curState === "Sign Up" ? "Create an account" : "Login"}
                </button>

                <div className="flex items-start gap-2 -mt-3">
                    <input type="checkbox" required />
                    <p className="text-xs">
                        By continuing, I agree to the terms of use & private policy
                    </p>
                </div>

                {curState === "Login" ? (
                    <p className="text-sm">
                        Create an account{" "}
                        <span
                            className="text-[#24a86a] font-semibold cursor-pointer"
                            onClick={() => setCurState("Sign Up")}
                        >
                            Click here
                        </span>
                    </p>
                ) : (
                    <p className="text-sm">
                        Already have an account?{" "}
                        <span
                            className="text-[#24a86a] font-semibold cursor-pointer"
                            onClick={() => setCurState("Login")}
                        >
                            Login here
                        </span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default Login;
