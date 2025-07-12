import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Login = ({ setShowLogin }) => {
    const [curState, setCurState] = useState('Sign Up');
    const { baseURL, setToken } = useContext(StoreContext);

    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let url = curState === 'Login'
            ? `${baseURL}/api/user/login`
            : `${baseURL}/api/user/signup`;

        try {
            const res = await axios.post(url, data);
            if (res.data.success) {
                setToken(res.data.token);
                localStorage.setItem('token', res.data.token);
                setShowLogin(false);
            } else {
                alert(res.data.message || 'Authentication failed.');
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong during login/signup.");
        }
    };

    return (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-60 flex justify-center items-center p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm sm:max-w-md mx-auto text-gray-500 bg-white flex flex-col gap-6 p-6 sm:p-8 rounded-lg animate-fadeIn"
            >

                <div className="flex justify-between items-center text-black">
                    <h2 className="font-bold text-lg sm:text-xl">{curState}</h2>
                    <img
                        className="w-4 cursor-pointer"
                        onClick={() => setShowLogin(false)}
                        src={assets.cross_icon}
                        alt="close"
                    />
                </div>

                <div className="flex flex-col gap-4">
                    {curState === "Login" ? null : (
                        <input
                            type="text"
                            placeholder="Your name"
                            name="name"
                            required
                            value={data.name}
                            onChange={onChangeHandler}
                            className="border p-2 rounded-md focus:outline-none focus:border-gray-500"
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Your email"
                        name="email"
                        required
                        value={data.email}
                        onChange={onChangeHandler}
                        className="border p-2 rounded-md focus:outline-none focus:border-gray-500"
                    />
                    <input
                        type="password"
                        placeholder="Your password"
                        name="password"
                        required
                        value={data.password}
                        onChange={onChangeHandler}
                        className="border p-2 rounded-md focus:outline-none focus:border-gray-500"
                    />
                </div>

                <button type="submit" className="bg-[#137548] text-white p-2 rounded hover:bg-[#2f9f6b]">
                    {curState === 'Sign Up' ? 'Create Account' : 'Login'}
                </button>

                <div className="flex gap-2 items-start -mt-2">
                    <input type="checkbox" required />
                    <p className="text-xs">By continuing, you agree to the Terms of Use & Privacy Policy</p>
                </div>

                {curState === 'Login' ? (
                    <p className="text-sm">
                        Create an account?{" "}
                        <span className="text-green-600 cursor-pointer font-medium" onClick={() => setCurState('Sign Up')}>Click here</span>
                    </p>
                ) : (
                    <p className="text-sm">
                        Already have an account?{" "}
                        <span className="text-green-600 cursor-pointer font-medium" onClick={() => setCurState('Login')}>Login here</span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default Login;
