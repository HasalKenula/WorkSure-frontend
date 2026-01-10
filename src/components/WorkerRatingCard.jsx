import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function WorkerRatingCard({ workerId }) {
  const [avg, setAvg] = useState(null);

 const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:8081/rating/${workerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setAvg(res.data.average);
      console.log(avg)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [workerId]);

  if (avg === null) return <span className="text-gray-400">No ratings</span>;

  const stars = Array.from({ length: 5 }, (_, i) => (
  <span key={i}>
    {i < Math.round(avg) ? (
      <FaStar className="text-yellow-400 text-2xl" />
    ) : (
      <FaRegStar className="text-gray-300 text-2xl" />
    )}
  </span>
));

  return (
    <div className="flex items-center gap-1">
      {stars}
      <span className="text-sm text-gray-600 ml-1">({avg.toFixed(1)})</span>
    </div>
  );
}
