import React , { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.post(
                "http://localhost:8081/api/email/reset-password",
                {
                    token: token,
                    password: password
                }
            );
            setMessage(response.data);
        }catch(error){
            setMessage("Password reset failed");
        }
    };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">Reset Password</h2>
            <p className="text-center text-gray-600 mb-6">
                    Enter your new password below to reset your account password.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-1" htmlFor="password">
                            New Password
                    </label>
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} placeholder='Enter new password' value={password} required onChange={(E)=>setPassword(E.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                        />
                        <span
                            className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>
                <button type='submit' className="w-full bg-gradient-to-r from-orange-400 to-yellow-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition">Reset Password</button>
            </form>
            {message && (
                    <p className={`text-center mt-4 ${message.includes("failed") ? "text-red-500" : "text-green-500"}`}>
                        {message}
                    </p>
            )}
            <p className="text-center text-gray-500 mt-6">
                    Remembered your password?{" "}
                    <a href="/auth/login" className="text-orange-500 font-semibold hover:underline">
                        Login
                    </a>
            </p>
        </div>
    </div>
  )
}
