import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MM from "../assets/man.jpg";
import { CiLocationOn } from "react-icons/ci";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import api from '../api/axios'

/* ================= SKELETON CARD ================= */
const SkeletonCard = () => (
  <div className="animate-pulse bg-white p-6 rounded-2xl shadow border">
    <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto" />
    <div className="h-4 bg-gray-300 rounded mt-4 w-3/4 mx-auto" />
    <div className="h-3 bg-gray-200 rounded mt-2 w-1/2 mx-auto" />
    <div className="h-3 bg-gray-200 rounded mt-4 w-1/3 mx-auto" />
    <div className="h-10 bg-gray-300 rounded mt-6" />
  </div>
);

export default function WorkersPage() {
  const [searchParams] = useSearchParams();
  const skillFromURL = searchParams.get("skill");

  const navigate = useNavigate();
  const { isAuthenticated, jwtToken } = useAuth();

  const config = {
    headers: { Authorization: `Bearer ${jwtToken}` },
  };

  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  /* ================= LOAD WORKERS ================= */
  async function loadWorkerDetails() {
    try {
      setLoading(true);
      const res = await api.get("/worker", config);
      setWorkers(res.data);
    } catch {
      toast.error("Failed to load workers");
    } finally {
      setLoading(false);
    }
  }

  async function handleSort(order) {
    try {
      const res = await api.get(`/worker/sort-by-rating?order=${order}`, config);
      setWorkers(res.data);
    } catch {
      toast.error("Sorting failed");
    }
  }

  useEffect(() => {
    if (!isAuthenticated) return;

    if (skillFromURL) {
      setSelectedSkill(skillFromURL);
      handleSkillLocFilter("", skillFromURL);
    } else {
      loadWorkerDetails();
    }
  }, [isAuthenticated, skillFromURL]);


  /* ================= SEARCH BY NAME ================= */
  async function handleNameSearch() {
    if (!searchText.trim()) return loadWorkerDetails();
    try {
      setLoading(true);
      const res = await api.get(
        `/worker/searchbyname?keyword=${searchText}`,
        config
      );
      setWorkers(res.data);
    } catch {
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  }

  //all fiters together
  async function handleFilters(loc, skill, sort) {
    try {
      setLoading(true);

      const res = await api.get("/worker/searchbylocandskill", {
        params: {
          location: loc || null,
          jobRole: skill || null,
          sort: sort || null
        },
        headers: { Authorization: `Bearer ${jwtToken}` }
      });

      setWorkers(res.data);

    } catch {
      toast.error("Filter error");
    } finally {
      setLoading(false);
    }
  }

  /* ================= SORT BY RATING ================= */
  const visibleWorkers = workers.filter((w) => !w.isBlocked);

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="pt-28 pb-16 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
        >
          Discover Trusted Professionals
        </motion.h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Skilled workers available across Sri Lanka hire with confidence.
        </p>
      </section>

      {/* ================= FILTERS ================= */}
      <div className="flex flex-wrap justify-center gap-4 px-6">
        <input
          placeholder="Search by name"
          className="px-5 py-3 rounded-full border w-100 focus:ring-2 ring-yellow-400"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyUp={handleNameSearch}
        />

        <select
          className="px-8 py-3 rounded-full border"
          value={selectedLocation}
          onChange={(e) => {
            const loc = e.target.value;
            setSelectedLocation(loc);
            handleFilters(loc, selectedSkill, sortOrder);
          }}
        >
          <option value="">Location</option>

          <option>Colombo</option>
          <option>Gampaha</option>
          <option>Negombo</option>
          <option>Kandy</option>
          <option>Kurunegala</option>
          <option>Galle</option>
          <option>Matara</option>
          <option>Hambantota</option>
          <option>Kalutara</option>
          <option>Panadura</option>
          <option>Moratuwa</option>
          <option>Nugegoda</option>
          <option>Maharagama</option>
          <option>Homagama</option>
          <option>Kaduwela</option>
          <option>Malabe</option>
          <option>Ja-Ela</option>
          <option>Wattala</option>
          <option>Ragama</option>
          <option>Kadawatha</option>
          <option>Anuradhapura</option>
          <option>Polonnaruwa</option>
          <option>Badulla</option>
          <option>Bandarawela</option>
          <option>Nuwara Eliya</option>
          <option>Ratnapura</option>
          <option>Kegalle</option>
          <option>Trincomalee</option>
          <option>Batticaloa</option>
          <option>Jaffna</option>
        </select>

        <select
          className="px-5 py-3 rounded-full border"
          value={selectedSkill}
          onChange={(e) => {
            const skill = e.target.value;
            setSelectedSkill(skill);
            handleFilters(selectedLocation, skill, sortOrder);
          }}
        >
          <option value="">Job Role</option>
          <option>PLUMBER</option>
          <option>ELECTRICIAN</option>
          <option>CARPENTER</option>
          <option>PAINTER</option>
          <option>CLEANER</option>
        </select>

        <select
          className="px-5 py-3 rounded-full border"
          value={sortOrder}
          onChange={(e) => {
            const order = e.target.value;
            setSortOrder(order);
            handleFilters(selectedLocation, selectedSkill, order);
          }}
        >
          <option value="">Sort by Rating</option>
          <option value="high">Highest First</option>
          <option value="low">Lowest First</option>
        </select>
      </div>

      {/* ================= COUNT ================= */}
      <div className="text-center mt-6">
        <span className="bg-yellow-100 text-yellow-700 px-6 py-2 rounded-full font-bold shadow">
          {visibleWorkers.length} Available Workers
        </span>
      </div>

      {/* ================= GRID ================= */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {loading &&
            Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}

          {!loading && visibleWorkers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-20"
            >
              <h3 className="text-xl font-bold text-gray-700">
                No workers found
              </h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your filters or search terms
              </p>
            </motion.div>
          )}

          {!loading &&
            visibleWorkers.map((worker, index) => (
              <motion.div
                key={worker.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="relative bg-white rounded-2xl shadow-lg p-6 text-center border hover:shadow-2xl"
              >
                <span
                  className={`absolute top-4 right-4 text-xs px-3 py-1 rounded-full font-bold ${worker.status === "Free"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                    }`}
                >
                  {worker.status}
                </span>

                <img
                  src={worker.user?.imageUrl || MM}
                  className="w-24 h-24 rounded-full mx-auto border-4 border-yellow-400 object-cover"
                  alt={worker.fullName}
                />

                <h3 className="mt-4 font-bold">{worker.fullName}</h3>
                <p className="text-yellow-600 font-semibold">
                  {worker.jobRole}
                </p>

                <div className="flex justify-center gap-1 mt-2 text-yellow-500">
                  <div className="App">
                  </div>
                </div>

                <div className="flex justify-center items-center gap-1 text-sm text-gray-600 mt-2">
                  <CiLocationOn /> {worker.preferredServiceLocation}
                </div>

                <button
                  className="mt-5 w-full py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-semibold"
                  onClick={() => navigate(`/workerCard/${worker.id}`)}
                >
                  View Profile
                </button>

                <button
                  className="mt-2 w-full py-2 border rounded-lg font-semibold hover:bg-gray-100"
                  onClick={() => navigate(`/hire/${worker.id}`)}
                >
                  Hire Now
                </button>
              </motion.div>
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
