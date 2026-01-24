import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebook, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { GiSpanner } from "react-icons/gi";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="relative bg-gray-900 text-gray-200 pt-20 pb-12 font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* WorkSure Section */}
          <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500">
            <h2 className="text-3xl font-extrabold mb-4 text-yellow-400 text-center tracking-wide">WorkSure</h2>
            <p className="text-gray-300 text-sm leading-relaxed text-center flex flex-col items-center">
              <GiSpanner color="#FCD34D" size={48} className="mb-3" /> 
              Thank you for visiting WorkSure! We connect you with top-tier professionals to bring your projects to life.
            </p>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-bold text-xl mb-4 relative text-white">
              CONTACT
              <span className="block w-12 h-[3px] bg-yellow-400 mt-2 rounded-full"></span>
            </h3>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li className="flex items-start gap-3">
                <CiLocationOn color="#FCD34D" size={20} /> Banco Ceylon pvt Ltd, 966 4-F <br /> Palawaththa, Battaramulla, Sri Lanka
              </li>
              <li className="flex items-center gap-3"><MdOutlinePhone color="#FCD34D" size={20} /> +94 77-7444866</li>
              <li className="flex items-center gap-3"><MdOutlineEmail color="#FCD34D" size={20} /> bancojobs@gmail.com</li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-5 mt-4">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition transform hover:scale-110"><FaFacebook size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition transform hover:scale-110"><FaTwitter size={24} /></a>
              <a href="https://www.youtube.com/channel/yourchannel" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-400 transition transform hover:scale-110"><FaYoutube size={24} /></a>
              <a href="https://wa.me/0777444866" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400 transition transform hover:scale-110"><FaWhatsapp size={24} /></a>
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="font-bold text-xl mb-5 text-white">
              COMPANY
              <span className="block w-12 h-[3px] bg-yellow-400 mt-2 rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              {["About Us", "Contact Us", "Privacy Policy", "Terms & Conditions", "Support"].map((item, i) => (
                <li key={i}>
                  <a className="relative group hover:text-yellow-400 transition-all duration-300">
                    {item}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="font-bold text-xl mb-5 text-white">
              SERVICES
              <span className="block w-12 h-[3px] bg-yellow-400 mt-2 rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              {["Electrician", "Plumbers", "Carpenters", "Painters", "Masons"].map((service, i) => (
                <li key={i}>
                  <a className="relative group hover:text-yellow-400 transition-all duration-300">
                    {service}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
          © <span className="text-white font-semibold">WorkSure</span>, All Rights Reserved. Designed by <span className="text-yellow-400 font-semibold">Group</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
