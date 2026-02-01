import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MM from "../assets/man.jpg";
import api from '../api/axios'
export default function AdminNavbar() {
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

        api
            .get("/user", {
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


    return (
        <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/70 border-b border-white/20 shadow-xl">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                {/* Logo */}
                <h1
                    onClick={() => navigate("/")}
                    className="text-3xl font-extrabold cursor-pointer select-none"
                >
                    <span className="text-yellow-400">Work</span>
                    <span className="text-white">Sure</span>
                </h1>



                {/* Auth & Profile */}
                <div className="hidden md:flex items-center gap-4">
                    {isLoggedIn && (
                        <img
                            src={user.imageUrl || MM}
                            alt="User"
                            onClick={() => navigate("/userProfile")}
                            className="w-10 h-10 rounded-full object-cover cursor-pointer
                         border-2 border-yellow-400 shadow-lg
                         hover:scale-110 transition-transform"
                        />
                    )}

                    {!isLoggedIn ? (
                        <button
                            onClick={() => navigate("/auth/login")}
                            className="px-4 py-2 rounded-lg font-bold
                         bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500
                         text-purple-900 hover:scale-105 transition-all shadow-lg"
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 rounded-lg font-bold
                         border-2 border-yellow-400 text-yellow-400
                         hover:bg-yellow-400 hover:text-purple-900
                         transition-all shadow-lg"
                        >
                            Logout
                        </button>
                    )}
                </div>

                {/* Mobile Toggle */}
                <div
                    className="md:hidden text-white text-3xl cursor-pointer"
                    onClick={() => setOpen(!open)}
                >
                    {open ? "✖" : "☰"}
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden backdrop-blur-lg bg-black/70 overflow-hidden
                    transition-all duration-500 ${open ? "max-h-96 py-4" : "max-h-0"
                    }`}
            >
                <ul className="flex flex-col gap-4 px-6 text-white">

                    {isLoggedIn && (
                        <img
                            src={user.imageUrl || MM}
                            alt="User"
                            onClick={() => {
                                setOpen(false);
                                navigate("/userProfile");
                            }}
                            className="w-12 h-12 rounded-full object-cover cursor-pointer
                 border-2 border-yellow-400 shadow-lg
                 hover:scale-110 transition-transform"
                        />
                    )}

                    {!isLoggedIn ? (
                        <button
                            onClick={() => {
                                setOpen(false);
                                navigate("/auth/login");
                            }}
                            className="px-4 py-2 rounded-lg font-bold
                 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500
                 text-purple-900 hover:scale-105 transition-all shadow-lg"
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                setOpen(false);
                                handleLogout();
                            }}
                            className="px-4 py-2 rounded-lg font-bold
                 border-2 border-yellow-400 text-yellow-400
                 hover:bg-yellow-400 hover:text-purple-900
                 transition-all shadow-lg"
                        >
                            Logout
                        </button>
                    )}

                </ul>

            </div>
        </nav>
    );
}
