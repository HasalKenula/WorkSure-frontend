import axios from 'axios';
import React, { useState } from 'react'

export default function ForgotPassword() {
    const [email,setEmail] = useState("");
    const [message, setMessage] = useState("");
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post(
                "http://localhost:8081/api/email/forgot-password",null,{params:{email:email}}
            );
            setMessage( response.data);
        }catch(error){
            setMessage("Error sending reset email");
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">ForgotPassword</h2>
            <p className="text-center text-gray-600 mb-6">
                    Enter your email address and we’ll send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
                    <input type='email' placeholder='Enter your email' value={email} required onChange={(e)=>setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-orange-400 to-yellow-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition">Send Reset Link</button>
            </form>
            {message && (
                    <p className="text-center text-green-500 mt-4">{message}</p>
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

