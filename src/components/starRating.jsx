import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import api from '../api/axios'
function StarRating({ itemId }) {

  const [savedRating, setSavedRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);

  // GET rating function
  const fetchRating = async () => {
    try {
      const response = await api.get(
        `/rating/${itemId}`
      );

      if (response.data.length > 0) {
        const total = response.data.reduce((sum, r) => sum + r.stars, 0);
        const avg = Math.round(total / response.data.length);

        setSavedRating(avg);
        setRatingCount(response.data.length);
      } else {
        setSavedRating(0);
        setRatingCount(0);
      }
    } catch (error) {
      console.error("GET rating failed:", error);
    }
  };

  // Load rating on component mount
  useEffect(() => {
    fetchRating();
  }, [itemId]);

  // POST rating
  const submitRating = async (value) => {
    try {
      await api.post("/rating", {
        itemId,
        stars: value,
      });

      setSelectedRating(0);   // reset UI
      fetchRating();          // refresh GET value
    } catch (error) {
      console.error("POST rating failed:", error);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {/* ⭐ GET VALUE */}
      
      <div style={{ display: "flex", gap: "5px" }}>
        {[...Array(5)].map((_, index) => {
          const value = index + 1;
          return (
            <FaStar
              key={index}
              size={24}
              color={value <= savedRating ? "#ffc107" : "#e4e5e9"}
            />
          );
        })}
      </div>
      <div>
          <h4>({ratingCount})</h4>
      </div>

    </div>
  );
}

export default StarRating;
