import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WorkerCardModal from "./WorkerCardModal";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import MM from "../assets/man.jpg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { jwtToken } = useAuth();

  const [user, setUser] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (!jwtToken) return;

    axios
      .get("http://localhost:8081/user", {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, [jwtToken]);

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "Find Workers", link: "/workerDetails" },
    { name: "Contact", link: "/contact" },
    { name: "About", link: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/70 shadow-xl transition-all duration-500 border-b border-white/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <h1 className="text-3xl font-extrabold cursor-pointer select-none">
          <span className="text-yellow-400">Work</span>
          <span className="text-white">Sure</span>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 font-semibold">
          {menuItems.map((item) => (
            <li key={item.name} className="relative group cursor-pointer">
              <Link
                to={item.link}
                className="
                  px-3 py-1
                  text-white
                  transition-all duration-300 
                  group-hover:text-yellow-400 
                  hover:scale-105 
                  hover:shadow-lg hover:shadow-yellow-400/50
                  rounded-full
                "
              >
                {item.name}
              </Link>
              {/* Animated gradient underline */}
              <span className="absolute left-0 -bottom-1 w-0 h-1 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 transition-all group-hover:w-full rounded-full"></span>
            </li>
          ))}
          <li>
            <WorkerCardModal triggerButtonText="Worker Registration" />
          </li>
        </ul>

        {/* User & Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn && (
            <img
              src={user.imageUrl || MM}
              alt="User"
              onClick={() => navigate("/userProfile")}
              className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-yellow-400 shadow-lg hover:scale-110 transition-transform duration-300"
            />
          )}

          {!isLoggedIn ? (
            <button
              onClick={() => navigate("/auth/login")}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 text-purple-800 font-bold hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-yellow-300/50"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg border-2 border-yellow-400 text-yellow-400 font-bold hover:bg-yellow-400 hover:text-purple-800 transition-all duration-300 shadow-xl hover:shadow-yellow-300/50"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div
          className="md:hidden cursor-pointer text-white text-3xl select-none"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 backdrop-blur-lg bg-black/70 ${
          open ? "max-h-96 py-4" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-6 gap-4 text-white">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className="hover:text-yellow-400 font-medium transition-colors duration-300"
            >
              <Link
                to={item.link}
                onClick={() => setOpen(false)}
                className="px-3 py-1 rounded-full hover:shadow-lg hover:shadow-yellow-400/50 transition-all duration-300"
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <WorkerCardModal triggerButtonText="Find Workers" />
          </li>

          {isLoggedIn && (
            <img
              src={user.imageUrl || MM}
              alt="User"
              onClick={() => {
                setOpen(false);
                navigate("/userProfile");
              }}
              className="w-12 h-12 rounded-full object-cover cursor-pointer border-2 border-yellow-400 shadow-lg hover:scale-110 transition-transform duration-300"
            />
          )}
        </ul>
      </div>
    </nav>
  );
}
2