import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import Navbar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import MM from "../assets/man.jpg";
import { motion } from "framer-motion";
import api from '../api/axios'
import { FaStar } from "react-icons/fa6";

export default function WorkerHire() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [description, setDescription] = useState("");
  const [isBooked, setIsBooked] = useState(true);
  const [isPending, setIsPending] = useState(true);
  const [isOngoing, setIsOngoing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const { jwtToken, isAuthenticated } = useAuth();
  const { workerId } = useParams();

  const [worker, setWorker] = useState(null);
  const [user, setUser] = useState({ id: null, name: "", email: "", contact: "", address: "", imageUrl: "" });
  const [hires, setHires] = useState([]);
  const [hiresByDate, setHiresByDate] = useState({});
  const [myHires, setMyHires] = useState([]);
  const [reviews, setReviews] = useState([]);


  const config = {
    headers: { Authorization: `Bearer ${jwtToken}` },
  };

  // Fetch worker
  async function getWorker() {
    try {
      const response = await api.get(`/worker/id/${workerId}`, config);
      setWorker(response.data);
    } catch (error) {
      console.log("Error loading worker:", error);
    }
  }

  // Fetch logged-in user
  useEffect(() => {
    if (!jwtToken) return;
    api
      .get("/user", { headers: { Authorization: `Bearer ${jwtToken}` } })
      .then((res) => setUser(res.data))
      .catch((err) => console.log("Failed to load user", err));
  }, [jwtToken]);

  useEffect(() => {
    if (isAuthenticated && workerId) getWorker();
  }, [isAuthenticated, workerId]);

  // Create hire request
  async function createHire() {
    if (!user?.id) return alert("User not loaded yet");

    try {
      await api.post(
        "/hire",
        {
          workerId,
          userId: user.id,
          bookingDate: format(selectedDate, "yyyy-MM-dd"),
          bookingTime: selectedTime,
          description,
          isBooked,
          isPending,
          isOngoing,
          isComplete,
        },
        config
      );
      getHires();
      alert("Job Request Sent Successfully!");
    } catch (error) {
      console.log("Error sending hire request:", error);
      alert("Failed to send hire request.");
    }
  }

  // Fetch all hires for this worker
  async function getHires() {
    if (!worker?.id) return;

    try {
      const response = await api.get(`/hire/${workerId}`, config);
      setHires(response.data);
    } catch (error) {
      console.log("Error loading hires:", error);
    }
  }

  useEffect(() => {
    if (worker?.id) getHires();
  }, [worker]);

  // Map hires by date
  useEffect(() => {
    const map = {};
    hires
      .filter((hire) => !hire.isBooked)
      .forEach((hire) => {
        const date = hire.bookingDate;
        if (!map[date]) map[date] = [];
        map[date].push(hire.bookingTime);
      });
    setHiresByDate(map);
  }, [hires]);

  // Filter user's own hires
  useEffect(() => {
    if (hires.length > 0 && user?.id) {
      setMyHires(hires.filter((h) => h.user?.id === user.id));
    }
  }, [hires, user]);

  // Booked dates for calendar
  const bookedDates = Array.from(new Set(hires.filter((h) => h.isBooked).map((h) => format(new Date(h.bookingDate), "yyyy-MM-dd"))));


  useEffect(() => {
    if (!jwtToken || !worker?.id) return;

    api
      .get(`/rating/${worker.id}`, config)
      .then(res => setReviews(res.data.ratings || []))

      .catch(err => console.error("Failed to load reviews", err));
  }, [jwtToken, worker]);

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? (
        reviews.reduce((sum, r) => sum + r.rating, 0) /
        totalReviews
      )
      : 0;


  const renderAverageStars = (avg) => {
    const roundedAvg = Math.round(avg); // ⭐ KEY FIX

    return [...Array(5)].map((_, i) => {
      const starValue = i + 1;

      return (
        <FaStar
          key={i}
          className={
            starValue <= roundedAvg
              ? "text-yellow-500"
              : "text-gray-300"
          }
        />
      );
    });
  };



  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <Navbar />
      <motion.div
        className="max-w-6xl mx-auto p-6 md:p-10 mt-24 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Worker Header Card */}

        <motion.div
          className="relative flex flex-col md:flex-row items-center gap-6 p-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-transparent hover:border-indigo-300"
          whileHover={{ scale: 1.03 }}>
          {/* Ribbon Badge */}
          <div className="absolute top-0 left-0 bg-yellow-400 text-white px-3 py-1 rounded-tr-3xl rounded-bl-3xl font-semibold text-sm shadow-md z-10">
            Premium
          </div>

          {/* Profile Picture with ring animation */}

          <div className="bg-gray-200 w-28 h-28 lg:w-40 lg:h-40 rounded-full flex justify-center items-center overflow-hidden">
            <img src={worker?.user?.imageUrl || MM} alt={worker?.fullName || "Worker"} className="w-full h-full object-cover rounded-full" />
          </div>

          {/* Info Section */}
          <div className="flex-1 flex flex-col justify-center gap-2">
            <h2 className="text-3xl font-extrabold text-gray-800">{worker?.fullName}</h2>
            <p className="text-gray-600 font-semibold">{worker?.jobRole}</p>
            <p className="text-gray-500">{worker?.preferredServiceLocation}</p>

            {/* Star Rating + Reviews */}
            <div className="flex items-center mt-2 gap-2 text-yellow-500">
              {worker && (
                <>
                  {/* Render stars */}
                  {renderAverageStars(averageRating)}

                  {/* Show average number and review count */}
                  <span className="ml-2 text-sm text-gray-600">
                    {averageRating.toFixed(1)} ({totalReviews} reviews)
                  </span>
                </>
              )}
            </div>

          </div>
        </motion.div>


        {/* Calendar + Time Slots */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className="flex justify-center">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="rounded-xl shadow-lg p-4 w-[320px]"
              tileContent={({ date, view }) => {
                if (view !== "month") return null;
                const formatted = format(date, "yyyy-MM-dd");
                if (bookedDates.includes(formatted)) {
                  return (

                    <div className="relative group flex justify-center">
                      <div className="bg-red-200 w-8 h-8 rounded-full"></div>

                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-2 hidden group-hover:block">
                        <div className="bg-black text-white text-xs px-3 py-1 rounded-lg shadow-lg whitespace-nowrap">
                          New job request is pending
                        </div>
                      </div>
                    </div>


                  );
                }
                return null;
              }}
              tileClassName={({ date, view }) => (view === "month" && bookedDates.includes(format(date, "yyyy-MM-dd")) ? "bg-red-200 rounded-full" : "")}
            />
          </div>

          <div className="space-y-4">
            {Object.keys(hiresByDate).length > 0 ? (
              Object.entries(hiresByDate).map(([date, slots]) => (
                <motion.div key={date} className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300" whileHover={{ scale: 1.02 }}>
                  <h4 className="font-semibold text-gray-700 mb-2">{format(new Date(date), "dd MMMM yyyy")}</h4>
                  {slots.map((slot, i) => (
                    <div key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg mb-2 transition hover:bg-gray-100">
                      <span className="text-gray-800 font-medium">{slot}</span>
                      <span className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full">Booked</span>
                    </div>
                  ))}
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500 text-center mt-4">No bookings for this worker yet.</p>
            )}
          </div>
        </motion.div>

        {/* Job Request Form */}
        <motion.div className="bg-white p-6 rounded-3xl shadow-xl mt-10" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Send a Job Request</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-medium text-gray-700">Date</label>
              <input type="text" value={format(selectedDate, "dd MMMM yyyy")} readOnly className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none" />
            </div>
            <div>
              <label className="font-medium text-gray-700">Time</label>
              <input type="time" onChange={(e) => setSelectedTime(e.target.value)} className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none" />
            </div>
          </div>
          <div className="mt-4">
            <label className="font-medium text-gray-700">Description</label>
            <textarea onChange={(e) => setDescription(e.target.value)} value={description} rows={4} placeholder="Describe the job..." className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none" />
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={createHire} className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold rounded-xl hover:shadow-lg hover:scale-103 transition-all duration-300 flex items-center gap-2 justify-center whitespace-nowrap">
              Send Request
            </button>
            <button className="flex-1 border border-gray-300 p-3 rounded-2xl hover:bg-gray-100 transition">Cancel</button>
          </div>
        </motion.div>

        {/* User Hires */}
        {myHires.length > 0 && (
          <motion.div className="mt-10 space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <h3 className="text-2xl font-bold text-gray-800">Your Requests</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myHires.map((hire, idx) => (
                <motion.div key={idx} className="p-5 bg-white rounded-3xl shadow-md hover:shadow-xl transition hover:scale-105" whileHover={{ scale: 1.03 }}>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-800">Request #{idx + 1}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${hire.isPending ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                      {hire.isPending ? "Pending" : "Seen"}
                    </span>
                  </div>
                  <p><strong>Date:</strong> {hire.bookingDate}</p>
                  <p><strong>Time:</strong> {hire.bookingTime}</p>
                  <p className="mt-3"><strong>Description:</strong> <div className="p-2 bg-gray-50 rounded-lg">{hire.description}</div></p>
                  <div className="flex gap-2 mt-4 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${hire.isBooked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                      {hire.isBooked ? "Not Approved" : "Approved"}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${hire.isOngoing ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-600"}`}>
                      {hire.isOngoing ? "Ongoing" : "Not Ongoing"}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${hire.isComplete ? "bg-purple-100 text-purple-700" : "bg-gray-200 text-gray-600"}`}>
                      {hire.isComplete ? "Completed" : "Incomplete"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

