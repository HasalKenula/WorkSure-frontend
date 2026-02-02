import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from '../api/axios'
export default function PlatformAnalyticsChart() {
  const { jwtToken } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/analytics/monthly-registrations", {
      headers: { Authorization: `Bearer ${jwtToken}` }
    }).then(res => setData(res.data));
  }, []);

  return (
    <div className="bg-white p-6 shadow-lg border rounded-lg">
      <h2 className="text-xl font-bold mb-2">Platform Analytics</h2>
      <p className="text-sm text-gray-500 mb-6">
        Key performance indicators and trends over time.
      </p>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="users" fill="#d1d5db" name="New user registrations" />
          <Bar dataKey="workers" fill="#f59e0b" name="New worker registrations" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
