import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import {
    FaMoneyCheckAlt,
    FaUserTie,
    FaHashtag,
    FaCreditCard,
    FaUser,
    FaCheckCircle,
    FaTimesCircle
} from "react-icons/fa";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import api from "../api/axios";

export default function TransferDetailsPage() {
    const { workerId } = useParams();
    const { jwtToken } = useAuth();

    const [transfers, setTransfers] = useState([]);
    const [loading, setLoading] = useState(false);

    const config = {
        headers: { Authorization: `Bearer ${jwtToken}` },
    };

    useEffect(() => {
        if (!workerId) return;

        setLoading(true);
        api
            .get(`/transfe/${workerId}`, config)
            .then(res => setTransfers(res.data))
            .catch(() => toast.error("Transfer details not found"))
            .finally(() => setLoading(false));
    }, [workerId]);

    // Prepare chart data
    const chartData = transfers.reduce((acc, t) => {
        const date = new Date(t.createdAt).toLocaleDateString("en-GB");
        const found = acc.find(d => d.date === date);
        found ? (found.amount += t.amount) : acc.push({ date, amount: t.amount });
        return acc;
    }, []);

    // Calculate total transfer amount
    const totalAmount = transfers.reduce((sum, t) => sum + t.amount, 0);

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            {/* Header + Print Button */}
            <div className="flex justify-between items-center mb-6">
                <div className="bg-gradient-to-r from-amber-500 to-orange-400 rounded-2xl p-6 text-white flex flex-col gap-3 w-full md:w-auto">
                    <div className="flex items-center gap-3">
                        <FaMoneyCheckAlt size={28} />
                        <div>
                            <h1 className="text-3xl font-bold">Transfer Details</h1>

                        </div>
                    </div>

                </div>
                <div className="mt-2 text-lg md:text-xl font-semibold">
                    Total Amount: LKR {totalAmount.toFixed(2)}
                </div>
                <button
                    onClick={() => window.print()}
                    className="no-print px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow mt-4 md:mt-0 md:ml-4"
                >
                    Print
                </button>
            </div>

            {loading && (
                <p className="text-center text-gray-500">Loading transfer details...</p>
            )}

            {!loading && transfers.length === 0 && (
                <div className="text-center py-16">
                    <FaTimesCircle className="text-red-400 text-4xl mx-auto mb-3" />
                    <p className="font-semibold">No transfer records found</p>
                </div>
            )}

            {/* Chart */}
            {!loading && transfers.length > 0 && (
                <div className="bg-white border rounded-2xl p-6 mb-8 shadow">
                    <h2 className="font-semibold mb-4">Transfer Amount Over Time</h2>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="amount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.05} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="amount" stroke="#F59E0B" fill="url(#amount)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* Transfers List */}
            <div className="space-y-4">
                {transfers.map(t => (
                    <div key={t.transactionId} className="border rounded-xl p-4 shadow-sm">
                        <div className="flex justify-between">
                            <div className="font-semibold flex items-center gap-2">
                                <FaHashtag /> {t.transactionId}
                            </div>
                            <span className="text-green-600 flex items-center gap-1">
                                <FaCheckCircle /> Completed
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
                            <div className="flex items-center gap-2"><FaCreditCard /> {t.paymentMethod}</div>
                            <div className="font-bold">LKR {t.amount.toFixed(2)}</div>
                            <div className="flex items-center gap-2"><FaUser /> User ID: {t.user?.id}</div>
                            <div className="flex items-center gap-2"><FaUserTie /> Worker ID: {t.worker?.id}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Print-specific CSS */}
            <style>
                {`
                    @media print {
                        .no-print {
                            display: none;
                        }
                    }
                `}
            </style>
        </div>
    );
}
