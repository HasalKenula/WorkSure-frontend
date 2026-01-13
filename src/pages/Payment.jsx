import React, { useEffect, useState } from "react";
import { AiOutlineCreditCard, AiOutlineWallet } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { FaLock } from "react-icons/fa";


export default function SecurePayment() {
  const navigate=useNavigate();
  const location = useLocation();
  const { planName, planPrice } = location.state || { planName: "N/A", planPrice: 0 };
  const { jwtToken, isAuthenticated } = useAuth();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("")
  const [userId, setUserId] = useState(null);
  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  }
  useEffect(() => {
    if (!jwtToken) return;

    axios
      .get("http://localhost:8081/user", config)
      .then((res) => {

        setUserId(res.data.id);
        setFullname(res.data.name);
        setEmail(res.data.email);
        setAddress(res.data.address);

      })
      .catch((error) => {
        console.error("Failed to load user:", error);

      });
  }, [jwtToken]);

  async function createPayment() {
    try {
      await axios.post("http://localhost:8081/payment", {
        name:fullname,
        email,
        address,
        amount: Math.round(planPrice * 1.08), 
        planName,
        userId: userId

      }, config);
      toast.success("submited your payment");
      setFullname("");
      setEmail("");
      setAddress("");
      navigate("/");
    } catch (error) {
      toast.error("cannot submited your payment")
    }
  }

  function handleFullname(event) {
    setFullname(event.target.value);
  }

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handleAddress(event) {
    setAddress(event.target.value);
  }
  return (
    <div className="max-w-[1400px] mx-auto p-8 bg-gray-50 min-h-screen">

      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-3 text-center" >
                  <FaLock className="inline-block mr-3 mb-1" />
                  Secure Payment
      </h1>
      <p className="text-amber-700 text-lg text-center  mb-10 ">
        Finalize your payment for the <b>{planName}</b> plan.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

        {/* Left – Payment Details */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-amber-100">
          <h2 className="text-2xl font-bold mb-6 text-amber-900">Payment Details</h2>

          <div className="font-semibold  mb-3 block  text-amber-700">Billing Information</div>

          <label className="block mt-4 text-sm font-medium text-gray-600">Full Name</label>
          <input
            type="text"
            value={fullname}
            onChange={handleFullname}
            placeholder="hasalkenula"
            // className="w-full p-3 mt-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition"
            className ="w-full p-3 mt-2  border border-gray-300  rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
          />

          <label className="block mt-4 text-sm font-medium text-gray-600">Billing Address</label>
          <input
            type="text"
            value={address}
            onChange={handleAddress}
            placeholder="23, Janaraja mawatha , Mathara"
            className="w-full p-3 mt-2 border border-gray-300  rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
          />

          <label className="block mt-4 text-sm font-medium text-gray-600">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={handleEmail}
            placeholder="hasalkenula@gmail.com"
            className="w-full p-3 mt-2 border border-gray-300  rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
          />

          <div className="  mt-6 mb-3 font-semibold  block  text-amber-700">Choose Payment Method</div>

          {/* Card Box */}
          <div 
          //  className="bg-blue-50 border border-blue-200 p-5 rounded-xl mb-4"
          className="p-5 bg-amber-50   rounded-xl mb-4 focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
          >
            <div className="flex items-center gap-2 text-amber-800 mb-3">
              <AiOutlineCreditCard className="text-2xl" /> Credit / Debit Card
            </div>
            <input
              type="text"
              placeholder="XXXX XXXX XXXX XXXX"
              // className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition"
              className="w-full p-3 bg-amber-50 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
            />
            <div className="flex gap-3 mt-3">
              <input
                type="text"
                placeholder="MM/YY"
                className="flex-1 p-3 bg-amber-50 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
              />
              <input
                type="text"
                placeholder="CVC"
                className="flex-1 p-3 bg-amber-50 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
              />
            </div>
            <label className="flex items-center gap-2 mt-3 text-sm text-gray-600">
              <input type="checkbox" className="accent-blue-500" />
              Save card details for future payments
            </label>
          </div>

          {/* Digital Wallet */}
          <label className="flex items-center gap-2 text-gray-600 font-medium mt-3 text-sm">
            <input type="radio" name="wallet" className="accent-blue-500" />
            <AiOutlineWallet className="text-xl text-gray-700" /> Digital Wallet (Apple Pay, Google Pay)
          </label>
        </div>

        {/* Right – Order Summary */}
        <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col justify-between border border-amber-100">
          <h2 className="text-2xl font-bold mb-6 text-amber-900">Order Summary</h2>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-gray-700">
              <span>Selected Plan:</span> <b>{planName}</b>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Service Fee:</span> <b>Rs. {planPrice}</b>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Tax (8%):</span> <b>Rs. {(planPrice * 0.08).toFixed(2)}</b>
            </div>
          </div>

          <hr className="my-4 border-gray-300" />

          <div className="flex justify-between font-bold text-lg text-amber-700 mb-4">
            <span>Total Amount:</span>
            <b>Rs. {(planPrice * 1.08).toFixed(2)}</b>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <input type="checkbox" className="accent-blue-500" />
            I have read and agree to the website Terms and Conditions
          </label>

          <button
            onClick={createPayment}
            // className="w-full bg-blue-600 hover:bg-yellow-500 text-white py-4 rounded-xl font-semibold transition-colors"
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center whitespace-nowrap"
          >
            Confirm Payment
          </button>


          <p className="text-xs text-gray-500 mt-4">
            Your personal data will be used to process your order, support your
            experience throughout this website, and for other purposes described
            in our <a href="#" className="underline text-blue-500">Privacy policy</a>.
          </p>
        </div>

      </div>
    </div>
  );
}
