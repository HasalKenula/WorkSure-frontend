// WorkerReviews.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkerRatingCard from "./WorkerRatingCard";
import { FaStar, FaRegStar } from "react-icons/fa";


export default function WorkerReviews({ workerId }) {
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:8081/rating/${workerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setReviews(res.data.ratings);
      setAverage(res.data.average);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [workerId]);

  const renderStars = (ratingValue) => {
  const r = Number(ratingValue) || 0; // ensures no crash

  return Array.from({ length: 5 }, (_, i) => (
    <span key={i}>
      {i < r ? (
        <FaStar className="text-yellow-400 text-xl" />
      ) : (
        <FaRegStar className="text-gray-300 text-xl" />
      )}
    </span>
  ));
};



  return (
    <div style={{ marginTop: "20px" }}>
      {reviews.length === 0 && <p>No reviews yet.</p>}

      {reviews.map((t) => (
        <div key={t.id} className="mb-3 p-2 border-b">
          <p><strong>{t.user.name}</strong></p>

          <div className="flex items-center gap-1">
            {renderStars(t.rating)}
            <span className="text-sm text-gray-600 ml-1">({t.rating.toFixed(1)})</span>
          </div>

          <p className="mt-1 text-gray-700">"{t.feedback}"</p>
        </div>
      ))}
    </div>
  );
}
