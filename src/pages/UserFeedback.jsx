import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaRegStar, FaUserCircle } from "react-icons/fa";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import api from '../api/axios'
export default function UserFeedback() {
  const { workerId } = useParams();
  const navigate = useNavigate();
  const { jwtToken } = useAuth();

  const [user, setUser] = useState(null);
  const [worker, setWorker] = useState(null);
  const [reviews, setReviews] = useState([]);
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

  useEffect(() => {
    if (!jwtToken) return;

    api
      .get("/user", authHeaders)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Failed to load user:", err));
  }, [jwtToken]);

  useEffect(() => {
    if (!jwtToken || !workerId) return;

    api
      .get(`/worker/id/${workerId}`, authHeaders)
      .then((res) => setWorker(res.data))
      .catch((err) => console.error("Failed to load worker:", err))
      .finally(() => setLoading(false));
  }, [jwtToken, workerId]);

  useEffect(() => {
    if (!jwtToken || !user?.id) return;

    api
      .get(`/rating/user/${user.id}`, authHeaders)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Failed to load reviews:", err));
  }, [jwtToken, user]);

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
      await api.post(
        "/rating",
        {
          workerId,
          userId: user.id,
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

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center font-semibold text-orange-500 text-xl">
        Loading...
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="h-screen flex items-center justify-center font-semibold text-red-500 text-xl">
        Worker not found
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="mt-24 min-h-screen bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-orange-500 mb-10">
            Rate & Review
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT FORM */}
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Provide Feedback
              </h3>

              {/* Worker Avatar */}
              <div className="flex flex-col items-center gap-3">
                {worker.user?.imageUrl ? (
                  <img
                    src={worker.user.imageUrl}
                    alt={worker.fullName}
                    className="w-28 h-28 rounded-full object-cover border-2 border-orange-400"
                  />
                ) : (
                  <FaUserCircle className="text-7xl text-gray-400" />
                )}
                <span className="text-lg font-medium">{worker.fullName}</span>
              </div>

              {/* Rating */}
              <div>
                <p className="font-medium mb-2 text-gray-600">Your Rating</p>
                <div className="flex gap-2 mb-4 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      className="cursor-pointer transition-transform hover:scale-110"
                    >
                      {star <= (hover || rating) ? (
                        <FaStar className="text-orange-400 text-2xl" />
                      ) : (
                        <FaRegStar className="text-gray-400 text-2xl" />
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Feedback */}
              <div>
                <p className="font-medium mb-2 text-gray-600">Detailed Feedback</p>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Write your feedback here..."
                  className="w-full h-32 border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => navigate(-1)}
                  className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={submitFeedback}
                  className="px-6 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
                >
                  Submit Feedback
                </button>
              </div>
            </div>

            {/* RIGHT REVIEWS */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 space-y-6">
              <h3 className="text-xl font-semibold text-gray-700">Your Past Reviews</h3>

              {reviews.length === 0 && (
                <p className="text-gray-500">No reviews yet.</p>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="border rounded-xl p-4 hover:shadow-md transition"
                  >
                    <div className="flex justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {review.worker.user?.imageUrl ? (
                          <img
                            src={review.worker.user.imageUrl}
                            alt={review.user?.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <FaUserCircle className="text-2xl text-gray-400" />
                        )}
                        <span className="font-medium text-gray-700">
                          {review.worker?.fullName || "Anonymous"}
                        </span>
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

                    <p className="text-gray-700 text-sm">{review.feedback}</p>
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

