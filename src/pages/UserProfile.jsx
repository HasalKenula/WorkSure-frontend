// import Navbar from "../components/NavBar"
// import MM from "../assets/man.jpg";

// export default function UserProfile() {
//   return (
//     <>
//       <Navbar />

//       <div className="mt-19 flex justify-center items-center min-h-screen font-outfit px-4">
//         <div className="shadow-2xl w-[85%] min-h-screen flex flex-col rounded-2xl mt-6 bg-white/10 backdrop-blur-xl p-4">

//           {/* Title */}
//           <div className="mb-4">
//             <h1 className="mt-5 ml-5 text-4xl font-bold text-primary">Your Profile</h1>
//           </div>

//           {/* DETAILS SECTION */}
//           <div className="mt-5 flex flex-col lg:flex-row">
            
//             {/* PHOTO */}
//             <div className="lg:w-1/4 w-full flex flex-col">
//               <div className="flex justify-center items-center">
//                 <div className="w-62 h-62 rounded-full overflow-hidden border-4 border-primary shadow-lg">
//                   <img src={MM} className="w-full h-full object-cover" />
//                 </div>
//               </div>

//               <div className="flex justify-center items-center mt-4">
//                 <button className="text-lg font-semibold text-black rounded-xl shadow-md hover:bg-gray-300 hover:scale-105 hover:shadow-xl transition-all duration-300 w-1/3 h-95/100 border border-gray-400">
//                   Edit Image
//                 </button>
//               </div>
//             </div>

//             {/* RIGHT DETAILS */}
//             <div className="lg:w-3/4 w-full mt-6 lg:mt-0">
//               <form className="flex flex-col space-y-5">

//                 <div className="flex flex-col lg:flex-row lg:items-center">
//                   <label className="font-semibold text-lg lg:w-1/3">User Name</label>
//                   <input type="text" placeholder="Ishini Shehara"
//                     className="w-full lg:w-2/3 p-2 border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none" />
//                 </div>

//                 <div className="flex flex-col lg:flex-row lg:items-center">
//                   <label className="font-semibold text-lg lg:w-1/3">Email</label>
//                   <input type="text" placeholder="gmail@gmail.com"
//                     className="w-full lg:w-2/3 p-2 border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none" />
//                 </div>

//                 <div className="flex flex-col lg:flex-row lg:items-center">
//                   <label className="font-semibold text-lg lg:w-1/3">Address</label>
//                   <input type="text" placeholder="336, Piliyandala , Colombo"
//                     className="w-full lg:w-2/3 p-2 border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none" />
//                 </div>

//                 <div className="flex flex-col lg:flex-row lg:items-center">
//                   <label className="font-semibold text-lg lg:w-1/3">Contact No</label>
//                   <input type="text" placeholder="0712345678"
//                     className="w-full lg:w-2/3 p-2 border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none" />
//                 </div>

//               </form>
//             </div>
//           </div>

//           {/* CHANGE PASSWORD */}
//           <div className="mt-10">
//             <h1 className="ml-5 text-3xl font-semibold text-primary">Change Your Password</h1>
//           </div>

//           <div className="flex flex-col lg:flex-row mt-5">

//             <div className="lg:w-1/5 w-full"></div>

//             <div className="lg:w-4/5 w-full">
//               <form className="flex flex-col space-y-5">

//                 <div className="flex flex-col lg:flex-row lg:items-center">
//                   <label className="font-semibold text-lg lg:w-1/3">Current Password</label>
//                   <input type="password"
//                     className="w-full lg:w-2/3 p-2 border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none" />
//                 </div>

//                 <div className="flex flex-col lg:flex-row lg:items-center">
//                   <label className="font-semibold text-lg lg:w-1/3">New Password</label>
//                   <input type="password"
//                     className="w-full lg:w-2/3 p-2 border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none" />
//                 </div>

//                 <div className="flex flex-col lg:flex-row lg:items-center">
//                   <label className="font-semibold text-lg lg:w-1/3">Confirm Password</label>
//                   <input type="password"
//                     className="w-full lg:w-2/3 p-2 border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none" />
//                 </div>

//               </form>
//             </div>
//           </div>

//           {/* SAVE BUTTON */}
//           <div className="flex justify-end mt-6 pr-5">
//             <button className="text-lg font-semibold text-black rounded-xl bg-primary shadow-md hover:bg-gray-300 hover:scale-105 hover:shadow-xl transition-all duration-300 w-1/6 h-1/2 border border-gray-400">
//               Save Changes
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import Navbar from "../components/NavBar";
import MM from "../assets/man.jpg";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function UserProfile() {
  const { jwtToken, isAuthenticated } = useAuth();
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    contact: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!isAuthenticated || !jwtToken) return;

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        };

        const response = await axios.get("http://localhost:8081/user", config);
        setUser({
          name: response.data.name || "",
          email: response.data.email || "",
          address: response.data.address || "",
          contact: response.data.contact || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load profile.");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [isAuthenticated, jwtToken]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <Navbar />

      <div className="mt-19 flex justify-center items-center min-h-screen font-outfit px-4">
        <div className="shadow-2xl w-[85%] min-h-screen flex flex-col rounded-2xl mt-6 bg-white/10 backdrop-blur-xl p-4">

          {/* Title */}
          <div className="mb-4">
            <h1 className="mt-5 ml-5 text-4xl font-bold text-primary">Your Profile</h1>
          </div>

          {/* DETAILS SECTION */}
          <div className="mt-5 flex flex-col lg:flex-row">

            {/* PHOTO */}
            <div className="lg:w-1/4 w-full flex flex-col">
              <div className="flex justify-center items-center">
                <div className="w-62 h-62 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                  <img src={MM} className="w-full h-full object-cover" alt="Profile" />
                </div>
              </div>

              <div className="flex justify-center items-center mt-4">
                <button className="text-lg font-semibold text-black rounded-xl shadow-md hover:bg-gray-300 hover:scale-105 hover:shadow-xl transition-all duration-300 w-1/3 h-95/100 border border-gray-400">
                  Edit Image
                </button>
              </div>
            </div>

            {/* RIGHT DETAILS */}
            <div className="lg:w-3/4 w-full mt-6 lg:mt-0">
              <form className="flex flex-col space-y-5">

                <div className="flex flex-col lg:flex-row lg:items-center">
                  <label className="font-semibold text-lg lg:w-1/3">User Name</label>
                  <input
                    type="text"
                    value={user.name}
                    readOnly
                    className="w-full lg:w-2/3 p-2 border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center">
                  <label className="font-semibold text-lg lg:w-1/3">Email</label>
                  <input
                    type="text"
                    value={user.email}
                    readOnly
                    className="w-full lg:w-2/3 p-2 border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center">
                  <label className="font-semibold text-lg lg:w-1/3">Address</label>
                  <input
                    type="text"
                    value={user.address}
                    readOnly
                    className="w-full lg:w-2/3 p-2 border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center">
                  <label className="font-semibold text-lg lg:w-1/3">Contact No</label>
                  <input
                    type="text"
                    value={user.contact}
                    readOnly
                    className="w-full lg:w-2/3 p-2 border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>

              </form>
            </div>
          </div>

          {/* CHANGE PASSWORD */}
          <div className="mt-10">
            <h1 className="ml-5 text-3xl font-semibold text-primary">Change Your Password</h1>
          </div>

          <div className="flex flex-col lg:flex-row mt-5">

            <div className="lg:w-1/5 w-full"></div>

            <div className="lg:w-4/5 w-full">
              <form className="flex flex-col space-y-5">

                <div className="flex flex-col lg:flex-row lg:items-center">
                  <label className="font-semibold text-lg lg:w-1/3">Current Password</label>
                  <input type="password"
                    className="w-full lg:w-2/3 p-2 border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none" />
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center">
                  <label className="font-semibold text-lg lg:w-1/3">New Password</label>
                  <input type="password"
                    className="w-full lg:w-2/3 p-2 border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none" />
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center">
                  <label className="font-semibold text-lg lg:w-1/3">Confirm Password</label>
                  <input type="password"
                    className="w-full lg:w-2/3 p-2 border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none" />
                </div>

              </form>
            </div>
          </div>

          {/* SAVE BUTTON */}
          <div className="flex justify-end mt-6 pr-5">
            <button className="text-lg font-semibold text-black rounded-xl bg-primary shadow-md hover:bg-gray-300 hover:scale-105 hover:shadow-xl transition-all duration-300 w-1/6 h-1/2 border border-gray-400">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
