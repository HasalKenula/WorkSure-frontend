import React from 'react'
import Navbar from '../components/NavBar'
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from 'react-router-dom';
import toast from "react-hot-toast";
import MM from "../assets/man.jpg";

export default function WorkerView() {

  const { userId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, jwtToken } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  }
  const [user, setUser] = useState({});
  async function loadWorkerDetails() {
    try {
      const response = await axios.get(
        `http://localhost:8081/user/${userId}`,
        config
      );
      setUser(response.data);
      toast.success("workers are loaded successfully");
    } catch (error) {
      toast.error("have error here not loaded workers");
    }
  }

  useEffect(function () {
    if (isAuthenticated) {

      loadWorkerDetails();
    }
  }, [isAuthenticated])

   return (
    <>
      <Navbar />

      <div className="bg-slate-100 min-h-screen flex justify-center items-start pt-20 px-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="bg-white shadow-lg rounded-xl p-6 border-l-8 border-yellow-400 mb-6">
            <h1 className="text-3xl font-bold text-slate-900">Client Profile</h1>
            <p className="text-slate-500 mt-1">Check Client information and contact details</p>
          </div>

          {/* Profile Card */}
          <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            
            {/* Image */}
            <div className="flex-shrink-0 w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg">
              <img src={user?.imageUrl || MM} alt="profile" className="w-full h-full object-cover" />
            </div>

            {/* Info */}
            <div className="flex-1 w-full">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{user.name}</h2>
              <p className="text-yellow-600 font-medium mb-4">{user.jobRole || 'Client'}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="text-slate-800 font-semibold">{user.email}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <p className="text-sm text-slate-500">Contact Number</p>
                  <p className="text-slate-800 font-semibold">{user.contact}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <p className="text-sm text-slate-500">Address</p>
                  <p className="text-slate-800 font-semibold">{user.address}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <p className="text-sm text-slate-500">User Id</p>
                  <p className="text-slate-800 font-semibold">U{user.id || '-'}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button
                  className="w-full sm:w-auto px-6 py-2 bg-yellow-500 text-black font-bold rounded-lg shadow hover:bg-yellow-400 transition"
                  onClick={() => navigate(-1)}
                >
                  Go Back
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}



// import React from 'react'
// import Navbar from '../components/NavBar'
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate, useParams } from 'react-router-dom';
// import toast from "react-hot-toast";
// import MM from "../assets/man.jpg";

// export default function WorkerView() {
//   const { userId } = useParams();
//   const navigate = useNavigate();
//   const { isAuthenticated, jwtToken } = useAuth();

//   const config = {
//     headers: { Authorization: `Bearer ${jwtToken}` }
//   }
//   const [user, setUser] = useState({});

//   async function loadWorkerDetails() {
//     try {
//       const response = await axios.get(
//         `http://localhost:8081/user/${userId}`,
//         config
//       );
//       setUser(response.data);
//       toast.success("Worker loaded successfully");
//     } catch (error) {
//       toast.error("Error: Could not load worker");
//     }
//   }

//   useEffect(() => {
//     if (isAuthenticated) {
//       loadWorkerDetails();
//     }
//   }, [isAuthenticated]);

 
// }
