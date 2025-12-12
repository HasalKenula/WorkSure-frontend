import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { GiSpanner } from "react-icons/gi";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#0B1320] text-white pt-20 pb-8 font-sans">
      <div className="max-w-[90%] mx-auto px-6">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* WorkSure Section */}
          <div className="bg-[#F4A31D] p-6 rounded-md shadow-md">
            <h2 className="text-4xl font-black mb-4 text-center ">WorkSure</h2>
            <p className="text-1xl  text-black leading-relaxed flex flex-col flex-wrap items-center ">
             <GiSpanner color="#ffffff" size={64}  /> Thanks for visiting WorkSure! Your projects deserve the best developers and we deliver. Let's build something amazing!
            </p>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-bold text-xl mb-4 relative">
              CONTACT
              <span className="block w-12 h-[3px] bg-yellow-500 mt-5"></span>
            </h3>

            <ul className="space-y-3 text-gray-300 text-1xl mb-5">
              <li className="flex items-center justify-start gap-4"><CiLocationOn color="#f59e0b" size={24}  strokeWidth={2} /> Banco Ceylon pvt Ltd, 966 4-F <br /> Palawaththa, Battaramulla, Sri Lanka</li>
              <li className="flex items-center justify-start gap-4"><MdOutlinePhone color="#f59e0b" size={24} /> +94 77-7444866</li>
              <li className="flex items-center justify-start gap-4"><MdOutlineEmail  color="#f59e0b" size={24} />  bancojobs@gmail.com</li>
            </ul>




            {/* Icons */}
            <div className="flex gap-4 mt-4">
              <a className="hover:text-yellow-400 text-gray-300 text-xl" href="#">
                <a href="#" className="text-gray-400 hover:text-white text-2xl">
                    <FaFacebook />
                </a>
              </a>
              <a className="hover:text-yellow-400 text-gray-300 text-xl" href="#">
                <a href="#" className="text-gray-400 hover:text-white text-2xl">
                    <FaTwitter />
                </a>
              </a>
              <a className="hover:text-yellow-400 text-gray-300 text-xl" href="#">
                <a href="https://www.youtube.com/channel/yourchannel" target="_blank" rel="noopener noreferrer" 
                    className="text-red-600 hover:text-red-500 text-2xl">
                    <FaYoutube />
                </a>
              </a>
              <a className="hover:text-yellow-400 text-gray-300 text-xl" href="#">
                <a href="https://wa.me/0777444866" target="_blank" rel="noopener noreferrer" 
                    className="text-green-500 hover:text-green-400 text-2xl">
                    <FaWhatsapp />
                </a>
              </a>
            </div>
          </div>




          {/* COMPANY */}
          <div>
            <h3 className="font-bold text-xl mb-5">
              COMPANY
              <span className="block w-12 h-[3px] bg-yellow-500 mt-1"></span>
            </h3>

            <ul className="space-y-3 text-gray-300 text-1xl">
              <li><a className="hover:text-yellow-400" href="#">About Us</a></li>
              <li><a className="hover:text-yellow-400" href="#">Contact Us</a></li>
              <li><a className="hover:text-yellow-400" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-yellow-400" href="#">Terms & Condition</a></li>
              <li><a className="hover:text-yellow-400" href="#">Support</a></li>
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="font-bold text-xl mb-5">
              SERVICES
              <span className="block w-12 h-[3px] bg-yellow-500 mt-5"></span>
            </h3>

            <ul className="space-y-3 text-gray-300 text-1xl">
              <li><a className="hover:text-yellow-400" href="#">Electrician</a></li>
              <li><a className="hover:text-yellow-400" href="#">Plumbers</a></li>
              <li><a className="hover:text-yellow-400" href="#">Capenters</a></li>
              <li><a className="hover:text-yellow-400" href="#">Painters</a></li>
              <li><a className="hover:text-yellow-400" href="#">Masons</a></li>
            </ul>
          </div>

        </div>

        {/* BOTTOM NAV */}{/*
        <div className="border-t border-white/10 mt-10 py-4">
          <div className="flex justify-center gap-10 text-sm text-gray-300">
            <a href="#" className="hover:text-yellow-400">Home</a>
            <a href="#" className="hover:text-yellow-400">Cookies</a>
            <a href="#" className="hover:text-yellow-400">Help</a>
            <a href="#" className="hover:text-yellow-400">FAQs</a>
          </div>
        </div>*/}

        {/* COPYRIGHT */}
        <div className="border-t border-white/10 mt-4 pt-4 text-center text-gray-400 text-1xl">
          © <span className="text-white font-semibold">WorkSure</span>, All Right Reserved. Designed By <span className="text-yellow-400">Group</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
