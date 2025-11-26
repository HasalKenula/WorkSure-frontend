import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function PlatformAnalyticsChart() {
  const data = [
    { name: "Jan", users: 120, workers: 150 },
    { name: "Feb", users: 140, workers: 180 },
    { name: "Mar", users: 130, workers: 170 },
    { name: "Apr", users: 160, workers: 190 },
    { name: "May", users: 200, workers: 250 },
    { name: "Jun", users: 180, workers: 210 },
    { name: "Jul", users: 190, workers: 230 },
    { name: "Aug", users: 220, workers: 260 },
    { name: "Sep", users: 210, workers: 255 },
    { name: "Oct", users: 205, workers: 250 }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 w-full">
      <h2 className="text-xl font-bold mb-2">Platform Analytics</h2>
      <p className="text-gray-500 mb-4">
        Key performance indicators and trends over time.
      </p>

      <ResponsiveContainer width="100%" height={380}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="users" fill="#C7C7C7" name="New user registrations" />
          <Bar dataKey="workers" fill="#f59e0b" name="New worker registrations" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
