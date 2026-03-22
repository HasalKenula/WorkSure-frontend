// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import WorkerCardModal from "./WorkerCardModal";
// import { useAuth } from "../context/AuthContext";
// import MM from "../assets/man.jpg";
// import api from '../api/axios'
// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();
//   const { jwtToken } = useAuth();

//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     contact: "",
//     address: "",
//     imageUrl: "",
//   });

//   useEffect(() => {
//     if (!jwtToken) return;

//     api
//       .get("/user", {
//         headers: { Authorization: `Bearer ${jwtToken}` },
//       })
//       .then((res) => setUser(res.data))
//       .catch((err) => console.error(err));
//   }, [jwtToken]);

//   const isLoggedIn = Boolean(localStorage.getItem("token"));

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/auth/login");
//   };

//   const menuItems = [
//     { name: "Home", link: "/" },
//     { name: "Find Workers", link: "/workerDetails" },
//     { name: "Contact", link: "/contact" },
//     { name: "About", link: "/about" },
//     { name: "Transfer", link: "/transfer" },
//   ];

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/70 border-b border-white/20 shadow-xl">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

//         {/* Logo */}
//         <h1
//           onClick={() => navigate("/")}
//           className="text-3xl font-extrabold cursor-pointer select-none"
//         >
//           <span className="text-yellow-400">Work</span>
//           <span className="text-white">Sure</span>
//         </h1>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex gap-8 font-semibold">
//           {menuItems.map((item) => (
//             <li key={item.name} className="relative group">
//               <Link
//                 to={item.link}
//                 className="px-3 py-1 text-white transition-all duration-300 
//                            group-hover:text-yellow-400 hover:scale-105 rounded-full"
//               >
//                 {item.name}
//               </Link>
//               <span className="absolute left-0 -bottom-1 w-0 h-1 bg-gradient-to-r 
//                                from-yellow-400 via-pink-400 to-purple-500 
//                                transition-all duration-300 group-hover:w-full rounded-full" />
//             </li>
//           ))}

//           <li>
//             <WorkerCardModal triggerButtonText="Worker Registration" />
//           </li>
//         </ul>

//         {/* Auth & Profile */}
//         <div className="hidden md:flex items-center gap-4">
//           {isLoggedIn && (
//             <img
//               src={user.imageUrl || MM}
//               alt="User"
//               onClick={() => navigate("/userProfile")}
//               className="w-10 h-10 rounded-full object-cover cursor-pointer
//                          border-2 border-yellow-400 shadow-lg
//                          hover:scale-110 transition-transform"
//             />
//           )}

//           {!isLoggedIn ? (
//             <button
//               onClick={() => navigate("/auth/login")}
//               className="px-4 py-2 rounded-lg font-bold
//                          bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500
//                          text-purple-900 hover:scale-105 transition-all shadow-lg"
//             >
//               Login
//             </button>
//           ) : (
//             <button
//               onClick={handleLogout}
//               className="px-4 py-2 rounded-lg font-bold
//                          border-2 border-yellow-400 text-yellow-400
//                          hover:bg-yellow-400 hover:text-purple-900
//                          transition-all shadow-lg"
//             >
//               Logout
//             </button>
//           )}
//         </div>

//         {/* Mobile Toggle */}
//         <div
//           className="md:hidden text-white text-3xl cursor-pointer"
//           onClick={() => setOpen(!open)}
//         >
//           {open ? "✖" : "☰"}
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`md:hidden backdrop-blur-lg bg-black/70 overflow-hidden
//                     transition-all duration-500 ${
//                       open ? "max-h-96 py-4" : "max-h-0"
//                     }`}
//       >
//         <ul className="flex flex-col gap-4 px-6 text-white">
//           {menuItems.map((item) => (
//             <li key={item.name}>
//               <Link
//                 to={item.link}
//                 onClick={() => setOpen(false)}
//                 className="block px-3 py-1 rounded-full
//                            hover:text-yellow-400 hover:shadow-lg
//                            hover:shadow-yellow-400/50 transition-all"
//               >
//                 {item.name}
//               </Link>
//             </li>
//           ))}

//           <li>
//             <WorkerCardModal triggerButtonText="Worker Registration" />
//           </li>

//           {isLoggedIn && (
//             <img
//               src={user.imageUrl || MM}
//               alt="User"
//               onClick={() => {
//                 setOpen(false);
//                 navigate("/userProfile");
//               }}
//               className="w-12 h-12 rounded-full object-cover cursor-pointer
//                          border-2 border-yellow-400 shadow-lg
//                          hover:scale-110 transition-transform"
//             />
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// }

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WorkerCardModal from "./WorkerCardModal";
import { useAuth } from "../context/AuthContext";
import MM from "../assets/man.jpg";
import api from "../api/axios";

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

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "Find Workers", link: "/workerDetails" },
    { name: "Contact", link: "/contact" },
    { name: "About", link: "/about" },
    { name: "Transfer", link: "/transfer" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/70 border-b border-white/20 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-4">

        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl md:text-3xl font-extrabold cursor-pointer select-none"
        >
          <span className="text-yellow-400">Work</span>
          <span className="text-white">Sure</span>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 lg:gap-8 font-semibold">
          {menuItems.map((item) => (
            <li key={item.name} className="relative group">
              <Link
                to={item.link}
                className="px-3 py-1 text-white transition-all duration-300 
                           group-hover:text-yellow-400 hover:scale-105 rounded-full"
              >
                {item.name}
              </Link>
              <span className="absolute left-0 -bottom-1 w-0 h-1 bg-gradient-to-r 
                               from-yellow-400 via-pink-400 to-purple-500 
                               transition-all duration-300 group-hover:w-full rounded-full" />
            </li>
          ))}

          <li>
            <WorkerCardModal triggerButtonText="Worker Registration" />
          </li>
        </ul>

        {/* Desktop Auth */}
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
          className="md:hidden text-white text-2xl cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden backdrop-blur-lg bg-black/90 overflow-hidden
                    transition-all duration-500 ${
                      open ? "max-h-[500px] py-4" : "max-h-0"
                    }`}
      >
        <ul className="flex flex-col gap-4 px-6 text-white">

          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.link}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-lg
                           hover:text-yellow-400 hover:bg-white/10
                           transition-all"
              >
                {item.name}
              </Link>
            </li>
          ))}

          <li
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          >
            <WorkerCardModal triggerButtonText="Worker Registration" />
          </li>

          {/* Profile */}
          {isLoggedIn && (
            <div className="flex items-center gap-3 mt-2">
              <img
                src={user.imageUrl || MM}
                alt="User"
                onClick={() => {
                  setOpen(false);
                  navigate("/userProfile");
                }}
                className="w-12 h-12 rounded-full object-cover cursor-pointer
                           border-2 border-yellow-400 shadow-lg"
              />
              <span className="font-medium">{user.name}</span>
            </div>
          )}

          {/* ✅ Mobile Login / Logout */}
          <div className="mt-4">
            {!isLoggedIn ? (
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/auth/login");
                }}
                className="w-full px-4 py-2 rounded-lg font-bold
                           bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500
                           text-purple-900 transition-all shadow-lg"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="w-full px-4 py-2 rounded-lg font-bold
                           border-2 border-yellow-400 text-yellow-400
                           hover:bg-yellow-400 hover:text-purple-900
                           transition-all shadow-lg"
              >
                Logout
              </button>
            )}
          </div>

        </ul>
      </div>
    </nav>
  );
}