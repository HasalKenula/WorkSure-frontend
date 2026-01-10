import Navbar from "../components/NavBar";
import { FaUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import RateWorker from "../components/RateWorker";

export default function UserFeedback() {
    const location = useLocation();
    const navigate = useNavigate();

    const workerData = location.state || { id: null, name: "Unknown Worker" };
    const userId = localStorage.getItem("userId");

    const [reviews, setReviews] = useState([]);

    const gotoProfile = () => navigate("/workerProfile");

    const fetchReviews = async () => {
        try {
            if (!workerData.id) return;

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `http://localhost:8081/rating/${workerData.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            setReviews(response.data.ratings || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <div className="mt-19 flex flex-col items-center min-h-screen bg-[#e5e5e5] font-outfit">
            <Navbar />

            <h1 className="text-4xl font-bold text-primary mt-6 mb-4">
                USER RATING & FEEDBACK
            </h1>

            <div className="w-[90%] min-h-screen flex flex-col lg:flex-row bg-white shadow-xl border border-gray-300 p-6 rounded-2xl gap-6">

                {/* PROVIDE FEEDBACK */}
                <div className="w-full lg:w-1/3 flex flex-col">
                    <p className="text-3xl font-semibold mt-4 ml-5">Provide Feedback</p>

                    <div className="flex flex-row items-center space-x-3 mt-6 ml-5">
                        <FaUserCircle className="text-8xl text-gray-700" />
                        <p className="text-2xl font-semibold">{workerData.name}</p>
                    </div>

                    <div className="mt-6 ml-5 mr-6">
                        <RateWorker
                            workerId={workerData.id}
                            userId={userId}
                            onSubmit={fetchReviews}
                        />
                    </div>

                    <div className="flex flex-row space-x-6 mt-6 ml-5">
                        <button
                            onClick={gotoProfile}
                            className="text-lg font-semibold text-black border border-gray-400 rounded-xl shadow-md w-1/3 py-2 hover:bg-gray-200 transition-all duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>

                {/* PAST REVIEWS */}
                <div className="w-full lg:w-2/3 flex flex-col space-y-4">
                    <h1 className="font-semibold text-3xl ml-6 mt-2">Past Reviews</h1>

                    <div className="flex flex-col overflow-y-auto space-y-4 pr-2">
                        {reviews.length === 0 && (
                            <p className="ml-6 text-gray-600">No reviews yet.</p>
                        )}

                        {reviews.map((r) => (
                            <div key={r.id} className="flex flex-col p-4 border rounded-xl shadow-sm">
                                <div className="flex flex-row items-center mb-2">
                                    <FaUserCircle className="text-4xl mr-3" />
                                    <p className="font-semibold text-lg flex-1">{r.user.name}</p>
                                    <p className="text-sm text-gray-800">
                                        {new Date(r.createdAT).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="flex items-center space-x-1 mb-2">
                                    {[...Array(r.rating)].map((_, i) => (
                                        <span key={i} className="text-yellow-500 text-xl">★</span>
                                    ))}
                                </div>

                                <p className="text-lg text-gray-800">{r.feedback}</p>
                                <div className="mt-2 h-px bg-gray-400 w-full"></div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
