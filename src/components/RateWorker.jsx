import { useState } from "react";
import axios from "axios";

export default function RateWorker({ workerId, userId }) {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");

  const send = async () => {
    await axios.post("http://localhost:8080/rating", {
      rating,
      feedback,
      workerId,
      userId
    });
    alert("Feedback submitted!");
  };

  return (
    <div>
      <h3>Rate Worker</h3>
      <select value={rating} onChange={e => setRating(e.target.value)}>
        {[1,2,3,4,5].map(n => <option key={n}>{n}</option>)}
      </select>

      <textarea
        placeholder="Write feedback"
        value={feedback}
        onChange={e => setFeedback(e.target.value)}
      />

      <button onClick={send}>Submit</button>
    </div>
  );
}
