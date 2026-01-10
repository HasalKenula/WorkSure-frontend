import React, { useState, useEffect } from "react";
import axios from "axios";
import StarRating from "./StarRating";
import { useAuth } from "../context/AuthContext";

export default function RateWorker({ workerId, onSubmit }) {
  const { jwtToken } = useAuth();
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  // Fetch logged user data
  useEffect(() => {
    if (!jwtToken) return;

    axios
      .get("http://localhost:8081/user", {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
      .then((res) => setUserId(res.data.id))
      .catch((err) => console.error("Failed to fetch user", err));
  }, [jwtToken]);

  const submitRating = async () => {
    if (!jwtToken || !userId) {
      alert("Please log in to submit feedback.");
      return;
    }

    if (!feedback.trim()) {
      alert("Please write a feedback message.");
      return;
    }

    if (!workerId) {
      alert("Worker information is missing.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "http://localhost:8081/rating",
        {
          userId,
          workerId,
          rating,
          feedback: feedback.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setRating(5);
      setFeedback("");
      if (onSubmit) onSubmit();

      alert("Feedback submitted successfully.");
    } catch (err) {
      console.error(err);
      alert("Error submitting feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-300 p-4 rounded-xl bg-white">
      <p className="text-lg font-semibold mb-2">Your Rating</p>
      <StarRating rating={rating} setRating={setRating} />

      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Write your feedback..."
        className="w-full min-h-28 mt-3 p-3 border rounded-lg"
      />

      <button
        onClick={submitRating}
        disabled={loading}
        className="w-full mt-4 py-2 text-white rounded-lg bg-primary"
      >
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>
    </div>
  );
}
