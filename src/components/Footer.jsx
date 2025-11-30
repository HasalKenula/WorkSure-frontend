import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0B1320] text-white pt-20 pb-8 font-sans">
      <div className="max-w-[90%] mx-auto px-6">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* WorkSure Section */}
          <div className="bg-[#F4A31D] p-6 rounded-md shadow-md">
            <h2 className="text-4xl font-black mb-4 text-center ">WorkSure</h2>
            <p className="text-1xl  text-black leading-relaxed ">
              🔧 Thanks for visiting WorkSure! Your projects deserve the best developers and we deliver. Let’s build something amazing! ✨
            </p>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-bold text-xl mb-4 relative">
              CONTACT
              <span className="block w-12 h-[3px] bg-yellow-500 mt-5"></span>
            </h3>

            <ul className="space-y-3 text-gray-300 text-1xl mb-5">
              <li>📍 Banco Ceylon pvt Ltd, 966 4-F <br /> Palawaththa, Battaramulla, Sri Lanka</li>
              <li>📞 +94 77-7444866</li>
              <li>✉️ bancojobs@gmail.com</li>
            </ul>


      </div>
    </footer>
  );
};

export default Footer;
