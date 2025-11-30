import React from "react";
import { AiOutlineCreditCard, AiOutlineWallet } from "react-icons/ai";

export default function SecurePayment() {
  return (
    <div className="max-w-[1400px] mx-auto p-8 bg-gray-50 min-h-screen">

      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-2">
        Secure Payment
      </h1>
      <p className="text-center text-gray-600 mb-10 text-lg">
        Finalize your payment for the service below.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

        {/* Left – Payment Details */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Payment Details</h2>

          <div className="font-semibold text-gray-700 mb-3">Billing Information</div>

          <label className="block mt-4 text-sm font-medium text-gray-600">Full Name</label>
          <input
            type="text"
            placeholder="hasalkenula"
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition"
          />

          <label className="block mt-4 text-sm font-medium text-gray-600">Billing Address</label>
          <input
            type="text"
            placeholder="23, Janaraja mawatha , Mathara"
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition"
          />

          <label className="block mt-4 text-sm font-medium text-gray-600">Email Address</label>
          <input
            type="email"
            placeholder="hasalkenula@gmail.com"
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition"
          />

          <div className="font-semibold text-gray-700 mt-6 mb-3">Choose Payment Method</div>

          {/* Card Box */}
          <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl mb-4">
            <div className="flex items-center gap-2 text-blue-600 mb-3">
              <AiOutlineCreditCard className="text-2xl" /> Credit / Debit Card
            </div>
            <input
              type="text"
              placeholder="XXXX XXXX XXXX XXXX"
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition"
            />
            <div className="flex gap-3 mt-3">
              <input
                type="text"
                placeholder="MM/YY"
                className="flex-1 p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition"
              />
              <input
                type="text"
                placeholder="CVC"
                className="flex-1 p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition"
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

        
      </div>
    </div>
  );
}
