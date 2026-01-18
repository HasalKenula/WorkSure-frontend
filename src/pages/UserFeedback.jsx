import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaRegStar, FaUserCircle } from "react-icons/fa";
import axios from "axios";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

export default function UserFeedback() {
  const { workerId } = useParams();
  const navigate = useNavigate();
  const { jwtToken, isAuthenticated } = useAuth();

  const [user, setUser] = useState(null); // current user
  const [worker, setWorker] = useState(null); // worker info
  const [reviews, setReviews] = useState([]); // user's past reviews
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  };

  // 1️⃣ Load current user
  useEffect(() => {
    if (!jwtToken) return;

    axios
      .get("http://localhost:8081/user", authHeaders)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Failed to load user:", err));
  }, [jwtToken]);

  // 2️⃣ Load worker info
  useEffect(() => {
    if (!jwtToken || !workerId) return;

    axios
      .get(`http://localhost:8081/worker/id/${workerId}`, authHeaders)
      .then((res) => setWorker(res.data))
      .catch((err) => console.error("Failed to load worker:", err))
      .finally(() => setLoading(false));
  }, [jwtToken, workerId]);

  // 3️⃣ Load user's past reviews
  useEffect(() => {
    if (!jwtToken || !user?.id) return;

    axios
      .get(`http://localhost:8081/rating/user/${user.id}`, authHeaders)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Failed to load reviews:", err));
  }, [jwtToken, user]);

  // 4️⃣ Submit feedback
  const submitFeedback = async () => {
    if (!rating || !feedback.trim()) {
      alert("Please provide rating and feedback");
      return;
    }

    if (!user?.id) {
      alert("User not loaded yet");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8081/rating",
        {
          workerId,
          userId: user.id, // ✅ real userId from backend
          rating,
          feedback,
        },
        authHeaders
      );

      alert("Feedback submitted successfully!");
      navigate(-1);
    } catch (err) {
      console.error("Submit error:", err.response || err);
      alert("Failed to submit feedback");
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center font-semibold">
        Loading...
      </div>
    );
  }

  // Worker not found
  if (!worker) {
    return (
      <div className="h-screen flex items-center justify-center font-semibold">
        Worker not found
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="mt-24 min-h-screen bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-orange-500 mb-8">
            Rate & Review {worker.fullName}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT FORM */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Provide Feedback</h3>

              <div className="flex justify-center mb-4">
                <FaUserCircle className="text-7xl text-gray-600" />
              </div>

              <p className="font-medium mb-2">Your Rating</p>
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="cursor-pointer"
                  >
                    {star <= (hover || rating) ? (
                      <FaStar className="text-orange-400 text-xl" />
                    ) : (
                      <FaRegStar className="text-gray-400 text-xl" />
                    )}
                  </span>
                ))}
              </div>

              <p className="font-medium mb-2">Detailed Feedback</p>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write your feedback here..."
                className="w-full h-32 border rounded-lg p-3 focus:ring-2 focus:ring-orange-400"
              />

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => navigate(-1)}
                  className="px-5 py-2 rounded-lg border"
                >
                  Cancel
                </button>
                <button
                  onClick={submitFeedback}
                  className="px-6 py-2 rounded-lg bg-orange-500 text-white font-semibold"
                >
                  Submit Feedback
                </button>
              </div>
            </div>

            {/* RIGHT REVIEWS */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-6">Your Past Reviews</h3>

              {reviews.length === 0 && (
                <p className="text-gray-500">No reviews yet.</p>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {reviews.map((review, index) => (
                  <div key={index} className="border rounded-xl p-4">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FaUserCircle />
                        <span>{review.worker.fullName}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.createdAT).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex gap-1 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} className="text-orange-400" />
                      ))}
                    </div>

                    <p className="text-sm text-gray-700">{review.feedback}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
