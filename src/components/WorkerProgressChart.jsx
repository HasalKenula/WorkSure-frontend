import {
    PieChart, Pie, Cell, Tooltip, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";

export default function WorkerCharts({ hire, isPDF }) {

    const active = hire.filter(h => !h.isBooked).length;
    const blocked = hire.filter(h => h.isBooked).length;
    const pending = hire.filter(h => h.isPending).length;
    const seen = hire.filter(h => !h.isPending).length;
    const ongoing = hire.filter(h => h.isOngoing).length;
    const completed = hire.filter(h => h.isComplete).length;
    const total = active + blocked;

    const COLORS = {
        Active: "#22c55e",
        Blocked: "#ef4444",
        Pending: "#eab308",
        Seen: "#3b82f6",
        Ongoing: "#8b5cf6",
        Completed: "#10b981",
        Total: "#6366f1",
    };

    const pie1 = [
        { name: "Active", value: active },
        { name: "Blocked", value: blocked },
    ];

    const pie2 = [
        { name: "Pending", value: pending },
        { name: "Seen", value: seen },
    ];

    const bar1 = [
        { name: "Ongoing", value: ongoing },
        { name: "Completed", value: completed },
        { name: "Active", value: active },
    ];

    const bar2 = [
        { name: "Active", value: active },
        { name: "Total", value: total },
    ];

    const ChartBox = ({ children }) => (
        <div
            style={{
                width: "100%",
                height: "300px",
                display: "flex",
                justifyContent: "center",
            }}
        >
            {children}
        </div>
    );

    return (
        <>
            <style>{`
        .pdf-grid2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }
      `}</style>

            <div className="pdf-grid2">

                {/* PIE 1 */}
                <div className="bg-white p-6 rounded-2xl border border-gray-300 ">
                    <h3 className="font-bold mb-4">Active vs Blocked</h3>
                    <ChartBox>
                        {isPDF ? (
                            <PieChart width={350} height={260}>
                                <Pie data={pie1} dataKey="value" cx="50%" cy="50%" outerRadius={90} label>
                                    {pie1.map((e, i) => (
                                        <Cell key={i} fill={COLORS[e.name]} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={pie1} dataKey="value" cx="50%" cy="50%" outerRadius={90} label>
                                        {pie1.map((e, i) => (
                                            <Cell key={i} fill={COLORS[e.name]} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </ChartBox>
                </div>

                {/* PIE 2 */}
                <div className="bg-white p-6 rounded-2xl border border-gray-300 ">
                    <h3 className="font-bold mb-4">Pending vs Seen</h3>
                    <ChartBox>
                        {isPDF ? (
                            <PieChart width={350} height={260}>
                                <Pie data={pie2} dataKey="value" cx="50%" cy="50%" outerRadius={90} label>
                                    {pie2.map((e, i) => (
                                        <Cell key={i} fill={COLORS[e.name]} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={pie2} dataKey="value" cx="50%" cy="50%" outerRadius={90} label>
                                        {pie2.map((e, i) => (
                                            <Cell key={i} fill={COLORS[e.name]} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </ChartBox>
                </div>

                {/* BAR 1 */}
                <div className="bg-white p-6 rounded-2xl border border-gray-300 ">
                    <h3 className="font-bold mb-4">Ongoing vs Completed</h3>
                    <BarChart width={400} height={260} data={bar1}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar dataKey="value">
                            {bar1.map((e, i) => (
                                <Cell key={i} fill={COLORS[e.name]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>

                {/* BAR 2 */}
                <div className="bg-white p-6 rounded-2xl border border-gray-300 ">
                    <h3 className="font-bold mb-4">Active vs Total Requests</h3>
                    <BarChart width={400} height={260} data={bar2}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar dataKey="value">
                            {bar2.map((e, i) => (
                                <Cell key={i} fill={COLORS[e.name]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>

            </div>
        </>
    );
}
