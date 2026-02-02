import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import MM from "../assets/man.jpg";
import { IoLocationSharp } from "react-icons/io5";
import { FaStar, FaUserCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function WorkerProfileCard() {
  const { jwtToken, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { workerId } = useParams();

  const [worker, setWorker] = useState(null);
  const [reviews, setReviews] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  async function getWorker() {
    try {
      const response = await axios.get(
        `http://localhost:8081/worker/id/${workerId}`,
        config
      );
      setWorker(response.data);
    } catch (error) {
      console.log("Error loading worker:", error);
    }
  }

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    if (isAuthenticated && workerId) {
      getWorker();
    }
  }, [isAuthenticated, workerId]);

  useEffect(() => {
    if (!jwtToken || !workerId) return;

    axios
      .get(`http://localhost:8081/rating/${workerId}`, authHeaders)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Failed to load reviews:", err));
  }, [jwtToken]);

  const getWorkingDays = (worker) => {
    if (!worker) return [];
    const days = [];
    if (worker.mon) days.push("Monday");
    if (worker.tue) days.push("Tuesday");
    if (worker.wed) days.push("Wednesday");
    if (worker.thu) days.push("Thursday");
    if (worker.fri) days.push("Friday");
    if (worker.sat) days.push("Saturday");
    if (worker.sun) days.push("Sunday");
    return days;
  };

  const userRate = [
    {
      id: 1,
      name: "John Doe",
      date: "2023/10/26",
      rating: 5,
      message:
        "Excellent work on the project, delivered ahead of schedule and with great attention to detail. Highly recommended!",
    },
    {
      id: 2,
      name: "Jane Smith",
      date: "2023/11/02",
      rating: 4,
      message: "Good work, punctual and professional.",
    },
  ];

  if (!worker) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-bold">
        Loading Worker Details...
      </div>
    );
  }

  return (

    <>
      <Navbar />

      <div className="mt-24 min-h-screen font-outfit py-12">
        <div className="max-w-6xl mx-auto px-4">

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[calc(100vh-6rem)]">

            {/* LEFT PROFILE CARD (STICKY) */}
            <div className="bg-white shadow-2xl rounded-2xl p-6 border border-gray-200 
                        self-start md:sticky md:top-28 
                        ">

              <div className="flex flex-col items-center text-center">

                {/* PROFILE IMAGE */}
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                  <img
                    src={worker.user?.imageUrl || MM}
                    className="w-full h-full object-cover"
                    alt="profile"
                  />
                </div>

                {/* NAME & ROLE */}
                <h2 className="mt-4 text-2xl font-bold text-gray-900">
                  {worker.fullName}
                </h2>
                <p className="text-primary font-semibold text-lg">
                  {worker.jobRole}
                </p>

                {/* LOCATION */}
                <div className="flex items-center justify-center mt-2 text-gray-600">
                  <IoLocationSharp className="mr-1 text-xl" />
                  <span>{worker.address}</span>
                </div>

                {/* RATINGS */}
                <div className="flex items-center mt-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                  <span className="ml-2 text-gray-500">(75 Reviews)</span>
                </div>

                {/* HIRE BUTTON */}
                <button
                  onClick={() => navigate(`/hire/${worker.id}`)}
                  className="mt-6 px-6 py-2 bg-primary text-white rounded-lg 
                         font-semibold hover:bg-accent transition"
                >
                  Hire Now
                </button>


                {/* WORKING AREA */}
                <div className="mt-6 bg-white shadow-lg rounded-xl p-5 border border-gray-200">
                  <h3 className="text-lg font-bold border-b pb-1 border-primary">
                    Working Area
                  </h3>
                  <p className="mt-2 text-gray-700">
                    {worker.preferredServiceLocation}
                  </p>
                </div>

              </div>
            </div>

            {/* RIGHT CONTENT (SCROLLABLE) */}
            <div
              className="md:col-span-2 space-y-6 
                     md:max-h-[calc(100vh-7rem)] 
                     md:overflow-y-auto pr-2"
            >

              {/* WORKING DAYS */}
              <div className="bg-white shadow-lg rounded-xl p-5 border border-gray-200">
                <h3 className="text-lg font-bold border-b pb-1 border-primary">
                  Working Schedule
                </h3>
                <ul className="list-disc ml-5 mt-2 text-gray-700">
                  {getWorkingDays(worker).map((day, i) => (
                    <li key={i}>
                      {day} — {worker.preferredStartTime} to {worker.preferredEndTime}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CERTIFICATIONS */}
              <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold border-b pb-2 border-primary">
                  Certifications
                </h3>
                <ul className="space-y-3 mt-3">
                  {worker.certificates?.map((c, i) => (
                    <li
                      key={i}
                      className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <p className="font-semibold">{c.certificateName}</p>
                      <p className="text-sm text-gray-500">{c.issuingBody}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* EXPERIENCE */}
              <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold border-b pb-2 border-primary">
                  Job Experience
                </h3>
                <ul className="space-y-3 mt-3">
                  {worker.jobExperiences?.map((exp, i) => (
                    <li
                      key={i}
                      className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <p><b>Job Title:</b> {exp.jobTitle}</p>
                      <p><b>Company:</b> {exp.companyName}</p>
                      <p><b>Years:</b> {exp.years}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* USER RATINGS */}
              {/* <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold border-b pb-2 border-primary">
              User Ratings
            </h3>

            {userRate.map((review, index) => (
              <div key={review.id} className="mt-4 border-b pb-4 last:border-none">
                <div className="flex items-center gap-3">
                  <FaUserCircle className="text-3xl text-gray-600" />
                  <div>
                    <p className="font-semibold">{review.username}</p>
                    <p className="text-sm text-gray-500">{user.date}</p>
                  </div>
                </div>

                <div className="flex mt-1">
                  {[...Array(user.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                </div>

                <p className="mt-2 text-gray-700">{user.message}</p>
              </div>
            ))}
          </div> */}
              {/* USER RATINGS */}
              <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold border-b pb-2 border-primary">
                  User Ratings
                </h3>

                {reviews.ratings && reviews.ratings.length > 0 ? (
                  reviews.ratings.map((review) => (
                    <div key={review.id} className="mt-4 border-b pb-4 last:border-none">
                      <div className="flex items-center gap-3">
                        {review.user?.imageUrl ? (
                          <img
                            src={review.user.imageUrl}
                            alt={review.user.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <FaUserCircle className="text-3xl text-gray-600" />
                        )}
                        <div>
                          <p className="font-semibold">{review.user?.name || "Anonymous"}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(review.createdAT).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex mt-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-500" />
                        ))}
                      </div>

                      <p className="mt-2 text-gray-700">{review.feedback}</p>
                    </div>
                  ))
                ) : (
                  <p className="mt-2 text-gray-500">No reviews yet.</p>
                )}
              </div>


              {/* FEEDBACK BUTTON */}
              <div className="flex justify-end">
                <button
                  onClick={() => navigate(`/feedback/${worker.id}`)}
                  className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-accent transition"
                >
                  Add Feedback
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>


  );
}
