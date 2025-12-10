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


  useEffect(() => {
    if (isAuthenticated && workerId) {
      getWorker();
    }
  }, [isAuthenticated, workerId]);

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
      <div className="mt-20 flex justify-center items-center min-h-screen font-outfit relative overflow-hidden">
        <div className="shadow-2xl w-[85%] h-auto flex flex-col gap-3.5 rounded-2xl mt-6 bg-white/10 backdrop-blur-xl">

          {/* PROFILE SECTION */}
          <div className="h-[40vh] flex flex-row space-x-25 p-6">
            <div className="w-1/4 flex justify-center items-center">
              <div className="w-62 h-62 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                <img src={ worker.user?.imageUrl || MM} className="w-full h-full object-cover" alt="profile" />
              </div> 
            </div>

            <div className="w-3/4 flex flex-col space-y-5 p-6">
              <p className="text-4xl font-bold">{worker.fullName}</p>
              <p className="font-bold text-primary text-xl">{worker.jobRole}</p>
              <div className="flex items-center space-x-1.5">
                <IoLocationSharp className="text-2xl" />
                <p className="text-lg font-medium">{worker.address}</p>
              </div>
              <div className="flex flex-row space-x-1 items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500 text-xl" />
                ))}
                <p className="px-1.5 text-lg flex items-center">
                  <span className="font-bold">5.0</span>
                  <span className="text-gray-600 ml-1">(75 Reviews)</span>
                </p>
              </div>
              <button className="px-6 py-3 text-lg font-semibold bg-primary text-white rounded shadow-md hover:bg-accent hover:scale-105 transition-all duration-300 w-1/3" onClick={() => navigate(`/hire/${worker.id}`)}>
                Hire Now
              </button>
            </div>
          </div>

          {/* WORKING AREA / DAYS / CERTIFICATIONS / EXPERIENCE */}
          <div className="border-solid flex flex-row">

            {/* LEFT SIDE */}
            <div className="w-[30%] flex flex-col gap-4 p-6">

              {/* WORKING AREA */}
              <div>
                <h3 className="text-xl font-bold text-primary">WORKING AREA</h3>
                <ul className="list-disc pl-5 mt-2 text-lg">
                  <li>{worker.preferredServiceLocation}</li>
                </ul>
              </div>

              {/* WORKING DAYS */}
              <div>
                <h3 className="text-xl font-bold text-primary">WORKING DAYS</h3>
                <ul className="list-disc pl-5 mt-2 text-lg">
                  {getWorkingDays(worker).map((day, i) => (
                    <li key={i}>
                      {day} ({worker.preferredStartTime} - {worker.preferredEndTime})
                    </li>
                  ))}
                </ul>
              </div>

              {/* CERTIFICATIONS */}
              <div>
                <h3 className="text-xl font-bold text-primary">CERTIFICATIONS</h3>
                <ul className="list-disc pl-5 mt-2 text-lg">
                  {worker.certificates?.map((c, i) => (
                    <li key={i}>
                      <b>{c.certificateName}</b> <br />
                      {c.issuingBody}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT SIDE: EXPERIENCE + RATINGS */}
            <div className="w-[70%] flex flex-col gap-6 p-6">

              {/* EXPERIENCE */}
              <div>
                <h3 className="text-xl font-bold text-primary">EXPERIENCE</h3>
                <ul className="list-disc pl-5 mt-2 text-lg">
                  {worker.jobExperiences?.map((exp, i) => (
                    <li key={i}>
                      <b>Job Title:</b> {exp.jobTitle} <br />
                      <b>Company:</b> {exp.companyName} <br />
                      <b>Years:</b> {exp.years}
                    </li>
                  ))}
                </ul>
              </div>

              {/* USER RATINGS */}
              <div>
                <h3 className="text-xl font-bold text-primary">USER RATINGS</h3>
                {userRate.map((user) => (
                  <div key={user.id} className="mt-4 border-b pb-2">
                    <div className="flex items-center gap-3">
                      <FaUserCircle className="text-4xl" />
                      <p className="text-lg font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.date}</p>
                    </div>
                    <div className="flex mt-1">
                      {[...Array(user.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-500 text-xl" />
                      ))}
                    </div>
                    <p className="mt-1 text-lg">{user.message}</p>
                  </div>
                ))}
              </div>

              {/* FEEDBACK BUTTON */}
              <div className="mt-4">
                <button
                  onClick={() => navigate("/feedback", { state: worker })}
                  className="px-3 py-2 text-lg font-semibold bg-primary text-white rounded-2xl shadow-md hover:bg-accent hover:scale-105 transition-all duration-300"
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
