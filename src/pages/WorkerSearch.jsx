import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MM from "../assets/man.jpg";
import { CiLocationOn } from "react-icons/ci";

// const workers = Array(18).fill({
//   name: "Eve Adams",
//   skill: "Carpenter",
//   rating: 5.0,
//   location: "Colombo",
//   status: "Free",
// });

export default function WorkersPage() {
  const navigate = useNavigate();

  const { isAuthenticated, jwtToken } = useAuth();


  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  }

  const [workers, setWorkers] = useState([]);

  async function loadWorkerDetails() {
    try {
      const workers = await axios.get("http://localhost:8081/worker", config);
      setWorkers(workers.data);
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
  const visibleWorkers = workers.filter(w => !w.isBlocked);

  //search by name
  const [searchText, setSearchText] = useState("");

  async function handleNameSearch(){
    if (searchText.trim() === "") {
      loadWorkerDetails(); // reset list
      return;
    }

    try {
      const res = await axios.get(
      `http://localhost:8081/worker/searchbyname?keyword=${searchText}`,
      config
      );
      setWorkers(res.data);
    } catch (error) {
      toast.error("Search error!");
    }
  }

  //search by location
  const [selectedLocation, setSelectedLocation] = useState("");

  async function handleLocationSearch(selectedLocation){
    if(selectedLocation.trim()===""){
      loadWorkerDetails();
      return;
    }

    try{
      const res = await axios.get(
        `http://localhost:8081/worker/searchbyloc?keyword=${selectedLocation}`,
        config
      );
      setWorkers(res.data);
    }
    catch(error){
      toast.error("Search error!");
    }
  }

  return (
    <div>
      <Navbar />
      <div className="bg-white min-h-screen p-5 mt-10 pt-20">

        {/* Filters Section */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-15 w-[95%]">
          <h3 className="text-2xl font-bold mr-5"></h3>

          <input
            type="text"
            placeholder="Search workers by skill, name, location"
            className="flex-1 min-w-[200px] px-4 py-3 rounded-full border border-gray-300 text-sm outline-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyUp={()=>handleNameSearch()}
          />

          <select className="px-4 py-3 rounded-full border border-gray-300 text-sm bg-white cursor-pointer">
            <option>Sort by rating</option>
            <option>Highest rating</option>
            <option>Lowest rating</option>
          </select>

          <select className="px-4 py-3 rounded-full border border-gray-300 text-sm bg-white cursor-pointer"
            value={selectedLocation}
            onChange={(e)=>{
              setSelectedLocation(e.target.value);
              handleLocationSearch(e.target.value);
            }}

          >
            <option>Location</option>
            <option >Colombo</option>
            <option>Gampaha</option>
            <option>Kandy</option>
            <option>Kurunegala</option>
            <option>Galle</option>
            <option>Matara</option>
            <option>Kaluthara</option>
            <option>Nugegoda</option>
            <option>Anuradhapura</option>
            <option>Trinco</option>
            <option>Kadawatha</option>
          </select>

          <div className="flex justify-end w-full mt-5">
            <span className="bg-[#e8f1ff] text-orange-500 px-5 py-2 rounded-full font-bold text-sm border border-[#c9dcff] shadow-md">
             {visibleWorkers.length} Available Workers
            </span>
          </div>
        </div>

        {/* Workers Grid */}

        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-10 max-w-[90%] mx-auto">
          {visibleWorkers.map((worker, index) => (
           // {
              // workers.map((worker, index) => (
                <div
                  className="bg-white p-5 rounded-xl text-center shadow-md relative  border border-slate-300"
                  key={index}
                >
                  <div className="absolute top-2 right-4 text-green-600 font-semibold text-sm">
                    {worker.status}
                  </div>
                  <div className="bg-gray-200 w-20 h-20 rounded-full flex justify-center items-center mx-auto overflow-hidden">
                    <img
                      src={worker.user?.imageUrl || MM}
                      alt={worker.fullName}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h3 className="mt-3 text-lg font-bold">{worker.fullName}</h3>
                  <p className="text-yellow-600 font-semibold my-1">{worker.jobRole}</p>

                  <div className="text-sm my-2">⭐⭐⭐⭐⭐ {worker.rating}</div>
                  <div className="flex items-center justify-center text-sm mb-3"> <CiLocationOn color="#f59e0b" size={24}  strokeWidth={2} />{worker.preferredServiceLocation}</div>

                  <button
                    className="w-full py-2 mb-2 bg-yellow-400 text-white rounded-md hover:bg-slate-400"
                    onClick={() => navigate(`/workerCard/${worker.id}`)}
                  >
                    View Profile
                  </button>
                  <button className="w-full py-2 border border-black rounded-md font-semibold hover:bg-gray-200" onClick={() => navigate(`/hire/${worker.id}`)}>
                    Hire Now
                  </button>
                </div>
              //))
            //}
          ))}
        </div>

      </div>

      <Footer />

    </div>
  );
}
