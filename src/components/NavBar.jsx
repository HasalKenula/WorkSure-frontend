import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WorkerCardModal from "./WorkerCardModal";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import MM from "../assets/man.jpg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { jwtToken, isAuthenticated } = useAuth();

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
      .then((res) => {
        setUser(res.data);
        //setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [jwtToken]);

  // Check if user is logged in (token stored?)
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    navigate("/auth/login"); // redirect to login page
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">


        <h1 className="text-2xl font-bold text-primary">Work<span className="text-black">Sure</span></h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <li className="hover:text-primary cursor-pointer"><Link to="/">Home</Link></li>
          <li className="hover:text-primary cursor-pointer"><Link to="/workerDetails">Find Workers</Link></li>
          <li className="hover:text-primary cursor-pointer"><Link to="/contact">Contact</Link></li>
          <li className="hover:text-primary cursor-pointer"><Link to="/about">About</Link></li>
          <li className="hover:text-primary cursor-pointer"> <WorkerCardModal triggerButtonText="Worker Registration" /></li>
        </ul>

        <div className="hidden md:flex items-center gap-4">

       
          {isLoggedIn && (
            <img
              src={user.imageUrl || MM}  
              alt="User"
              onClick={() => navigate("/userProfile")}         
              className="w-10 h-10 rounded-full object-cover cursor-pointer border border-gray-300"  
            />
          )}

          {!isLoggedIn ? (
            <button
              type="button"
              onClick={() => navigate("/auth/login")}
              className="hover:text-white cursor-pointer border-0 p-2 px-3 rounded-lg bg-primary"
            >
              Login
            </button>
          ) : (
            <button
              type="button"
              onClick={handleLogout}
              className="hover:text-primary cursor-pointer border-2 p-2 px-3 rounded-lg"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
          <span className="text-3xl">&#9776;</span>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden bg-white px-6 pb-4 space-y-4 shadow">
          <li className="hover:text-primary cursor-pointer"><Link to="/">Home</Link></li>
          <li className="hover:text-primary cursor-pointer"><Link to="/workerDetails">Find Workers</Link></li>
          <li className="hover:text-primary cursor-pointer"><Link to="/contact">Contact</Link></li>
          <li className="hover:text-primary cursor-pointer"><Link to="/about">About</Link></li>
          <li className="hover:text-primary cursor-pointer"> <WorkerCardModal triggerButtonText="Find Workers" /></li>

          {isLoggedIn && (
            <img
              src={user.imageUrl || MM}       
              alt="User"
              onClick={() => { setOpen(false); navigate("/userProfile"); }} 
              className="w-12 h-12 rounded-full object-cover cursor-pointer border border-gray-300" 
            />
          )}
        </ul>
      )}
    </nav>
  );
}
