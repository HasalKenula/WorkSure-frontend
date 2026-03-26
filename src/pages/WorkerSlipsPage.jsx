import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import {
    FaMoneyCheckAlt,
    FaUserTie,
    FaUser,
    FaCheckCircle,
    FaTimesCircle,
    FaDownload,
    FaCalendarAlt,
    FaUniversity,
    FaFileImage,
    FaFilePdf,
    FaEye
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

function WorkerSlipsPage() {
    const { workerId } = useParams();
    const { jwtToken } = useAuth();

    const [slips, setSlips] = useState([]);
    const [worker, setWorker] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const config = {
        headers: { Authorization: `Bearer ${jwtToken}` },
    };

    // Fetch worker details
    async function getWorker() {
        try {
            const response = await api.get(`/worker/id/${workerId}`, config);
            setWorker(response.data);
        } catch (error) {
            console.log("Error loading worker:", error);
            toast.error("Failed to load worker details");
        }
    }

    // Fetch all slips for this worker
    async function getWorkerSlips() {
        if (!workerId) return;

        setLoading(true);
        try {
            const response = await api.get(`/slip/${workerId}`, config);
            setSlips(response.data);
        } catch (error) {
            console.log("Error loading slips:", error);
            toast.error("Failed to load payment slips");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (workerId) {
            getWorker();
            getWorkerSlips();
        }
    }, [workerId]);

    // Download image function
    async function downloadImage(imageUrl, fileName) {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName || 'payment-slip.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Download started!");
        } catch (error) {
            console.error("Download error:", error);
            toast.error("Failed to download image");
        }
    }

    // Prepare chart data
    const chartData = slips.reduce((acc, slip) => {
        const date = new Date(slip.paymentDate || slip.createdAt).toLocaleDateString("en-GB");
        const found = acc.find(d => d.date === date);
        found ? (found.amount += slip.amount) : acc.push({ date, amount: slip.amount });
        return acc;
    }, []);

    // Calculate total amount
    const totalAmount = slips.reduce((sum, slip) => sum + slip.amount, 0);

    // Format currency
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 2
        }).format(amount);
    }

    // Format date
    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
            {/* Header Section - Worker Info + Stats */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="bg-gradient-to-r from-amber-500 to-orange-400 rounded-2xl p-6 text-white w-full md:w-auto">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-full">
                            <FaMoneyCheckAlt size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold">Payment Slips</h1>
                            {worker && (
                                <div className="flex items-center gap-2 mt-1">
                                    <FaUserTie size={16} />
                                    <p className="text-sm opacity-90">{worker.fullName}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <div className="bg-white border rounded-xl p-4 shadow-sm flex items-center gap-3">
                        <div className="p-2 bg-amber-100 rounded-lg">
                            <FaMoneyCheckAlt className="text-amber-600" size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Total Amount</p>
                            <p className="text-xl font-bold text-gray-800">{formatCurrency(totalAmount)}</p>
                        </div>
                    </div>

                    <div className="bg-white border rounded-xl p-4 shadow-sm flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <FaFileImage className="text-blue-600" size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Total Slips</p>
                            <p className="text-xl font-bold text-gray-800">{slips.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
                </div>
            )}

            {/* No Data State */}
            {!loading && slips.length === 0 && (
                <div className="bg-white border rounded-2xl p-12 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-4 bg-gray-100 rounded-full">
                            <FaTimesCircle className="text-gray-400 text-4xl" />
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Payment Slips Found</h3>
                    <p className="text-gray-500">You haven't uploaded any payment slips yet.</p>
                </div>
            )}

            {/* Chart Section - Only show if there are slips */}
            {!loading && slips.length > 0 && (
                <div className="bg-white border rounded-2xl p-6 mb-8 shadow-sm">
                    <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <FaCalendarAlt className="text-amber-500" />
                        Payment History Overview
                    </h2>
                    <div className="h-[250px] sm:h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="amountGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.05} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fontSize: 12 }}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `LKR ${value}`}
                                />
                                <Tooltip
                                    formatter={(value) => [`LKR ${value.toFixed(2)}`, 'Amount']}
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '8px',
                                        padding: '8px 12px'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="amount"
                                    stroke="#F59E0B"
                                    strokeWidth={2}
                                    fill="url(#amountGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* Slips Grid */}
            {!loading && slips.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">All Payment Slips</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {slips.map((slip) => (
                            <div
                                key={slip._id || slip.id}
                                className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                            >
                                {/* Header */}
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 bg-amber-100 rounded-lg">
                                            {slip.sipImageUrl?.includes('.pdf') ? (
                                                <FaFilePdf className="text-red-500" size={18} />
                                            ) : (
                                                <FaFileImage className="text-amber-600" size={18} />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Payment Date</p>
                                            <p className="font-medium text-gray-800">
                                                {formatDate(slip.paymentDate || slip.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                        <FaCheckCircle size={12} />
                                        Completed
                                    </span>
                                </div>

                                {/* Payment Details */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Amount</p>
                                        <p className="text-lg font-bold text-gray-800">
                                            {formatCurrency(slip.amount)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Bank</p>
                                        <div className="flex items-center gap-1">
                                            <FaUniversity className="text-gray-400 text-xs" />
                                            <p className="text-sm font-medium text-gray-700 truncate">
                                                {slip.bankName}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Account Number</p>
                                        <p className="text-sm font-mono text-gray-700">
                                            •••• {slip.accountNumber?.slice(-4)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Submitted By</p>
                                        <div className="flex items-center gap-1">
                                            <FaUser className="text-gray-400 text-xs" />
                                            <p className="text-sm text-gray-700 truncate">
                                                {slip.userId?.name || slip.userName || 'User'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Remarks (if any) */}
                                {slip.remarks && (
                                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                        <p className="text-xs text-gray-500 mb-1">Remarks</p>
                                        <p className="text-sm text-gray-700">{slip.remarks}</p>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex gap-2 border-t pt-4">
                                    <button
                                        onClick={function () {
                                            window.open(slip.sipImageUrl, '_blank');
                                        }}
                                        className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                    >
                                        <FaEye size={14} />
                                        View
                                    </button>
                                    <button
                                        onClick={function () {
                                            const fileName = `payment-slip-${slip.bankName}-${formatDate(slip.paymentDate)}.jpg`;
                                            downloadImage(slip.sipImageUrl, fileName);
                                        }}
                                        className="flex-1 px-3 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                    >
                                        <FaDownload size={14} />
                                        Download
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Image Preview Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    onClick={function () { setSelectedImage(null); }}
                >
                    <div className="relative max-w-4xl max-h-[90vh]">
                        <button
                            onClick={function () { setSelectedImage(null); }}
                            className="absolute -top-10 right-0 text-white hover:text-gray-300"
                        >
                            <FaTimesCircle size={24} />
                        </button>
                        <img
                            src={selectedImage}
                            alt="Payment slip preview"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg"
                        />
                    </div>
                </div>
            )}

            {/* Print-specific CSS */}
            <style>
                {`
                    @media print {
                        .no-print {
                            display: none !important;
                        }
                        body {
                            background: white;
                        }
                    }
                `}
            </style>
        </div>
    );
}

export default WorkerSlipsPage;