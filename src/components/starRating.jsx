import React from "react";

export default function StarRating({ rating, setRating }) {
  return (
    <div style={{ display: "flex", gap: "5px", cursor: "pointer" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{ color: star <= rating ? "#FFD700" : "#ccc", fontSize: "24px" }}
          onClick={() => setRating(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
