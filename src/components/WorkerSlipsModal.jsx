import { useEffect, useState } from "react";
import Modal from "react-modal";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import {
    FaMoneyCheckAlt,
    FaUserTie,
    FaCreditCard,
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

Modal.setAppElement("#root");

export default function WorkerSlipsModal({
    workerId,
    triggerButtonText = "View Payment Slips",
    buttonClass = "px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg font-medium hover:shadow-lg transition"
}) {
    const { jwtToken } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [slips, setSlips] = useState([]);
    const [worker, setWorker] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const config = {
        headers: { Authorization: `Bearer ${jwtToken}` },
    };

    const openModal = () => {
        if (!workerId) {
            toast.error("Worker ID not found");
            return;
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    // Fetch worker details
    async function getWorker() {
        try {
            const response = await api.get(`/worker/id/${workerId}`, config);
            setWorker(response.data);
        } catch (error) {
            console.log("Error loading worker:", error);
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
        if (isModalOpen && workerId) {
            getWorker();
            getWorkerSlips();
        }
    }, [isModalOpen, workerId]);

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
        <>
            {/* Trigger Button */}
            <button onClick={openModal} className={buttonClass}>
                {triggerButtonText}
            </button>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="bg-white rounded-3xl shadow-2xl w-[800px] mx-auto my-10 overflow-hidden border border-gray-100"
                overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-start z-40 py-8"
                style={{
                    content: {
                        maxHeight: 'calc(100vh - 160px)',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        top: '80px',
                        bottom: '20px',
                        left: 'auto',
                        right: 'auto',
                        position: 'absolute'
                    }
                }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-400 p-6 text-white">
                    <div className="flex items-center gap-3">
                        <FaMoneyCheckAlt className="w-7 h-7" />
                        <div>
                            <h2 className="text-2xl font-bold">Payment Slips</h2>
                            <p className="text-sm text-white/90">
                                {worker?.fullName || 'Worker'} • {slips.length} slips • Total {formatCurrency(totalAmount)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content - Scrollable Area */}
                <div className="p-6 max-h-[480px] overflow-y-auto">
                    {/* Loading State */}
                    {loading && (
                        <p className="text-center text-gray-500 font-medium">
                            Loading payment slips...
                        </p>
                    )}

                    {/* No Data State */}
                    {!loading && slips.length === 0 && (
                        <div className="text-center py-10">
                            <FaTimesCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
                            <p className="font-semibold text-gray-700">
                                No Payment Slips Found
                            </p>
                        </div>
                    )}

                    {/* Chart Section */}
                    {!loading && slips.length > 0 && (
                        <div className="mb-6 bg-white border border-gray-100 rounded-2xl p-4">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                Payment History Overview
                            </h3>

                            <div className="h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                                                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.05} />
                                            </linearGradient>
                                        </defs>

                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                                        <YAxis tick={{ fontSize: 12 }} />
                                        <Tooltip />
                                        <Area
                                            type="monotone"
                                            dataKey="amount"
                                            stroke="#F59E0B"
                                            fillOpacity={1}
                                            fill="url(#colorAmount)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}

                    {/* Slips List */}
                    {!loading && slips.length > 0 && (
                        <div className="space-y-4">
                            {slips.map((slip) => (
                                <div
                                    key={slip._id || slip.id}
                                    className="border border-gray-100 rounded-2xl p-4 bg-gradient-to-br from-gray-50 to-white shadow-sm"
                                >
                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-2">
                                            {slip.sipImageUrl?.includes('.pdf') ? (
                                                <FaFilePdf className="text-red-500" size={16} />
                                            ) : (
                                                <FaFileImage className="text-amber-600" size={16} />
                                            )}
                                            <span className="text-sm font-medium text-gray-700">
                                                {formatDate(slip.paymentDate || slip.createdAt)}
                                            </span>
                                        </div>
                                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                            <FaCheckCircle size={10} />
                                            Completed
                                        </span>
                                    </div>

                                    {/* Details Grid */}
                                    <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FaCreditCard className="text-gray-400" />
                                            {formatCurrency(slip.amount)}
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FaUniversity className="text-gray-400" />
                                            {slip.bankName}
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FaUser className="text-gray-400" />
                                            User: {slip.userId?.name || slip.userName || 'N/A'}
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FaUserTie className="text-gray-400" />
                                            Acc: •••• {slip.accountNumber?.slice(-4)}
                                        </div>
                                    </div>

                                    {/* Remarks */}
                                    {slip.remarks && (
                                        <div className="mb-3 p-2 bg-gray-100 rounded-lg text-xs text-gray-600">
                                            {slip.remarks}
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 border-t pt-3">
                                        <button
                                            onClick={() => window.open(slip.sipImageUrl, '_blank')}
                                            className="flex-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 text-xs font-medium transition-colors flex items-center justify-center gap-1"
                                        >
                                            <FaEye size={12} />
                                            View
                                        </button>
                                        <button
                                            onClick={() => {
                                                const fileName = `slip-${slip.bankName}-${formatDate(slip.paymentDate)}.jpg`;
                                                downloadImage(slip.sipImageUrl, fileName);
                                            }}
                                            className="flex-1 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 rounded-lg text-white text-xs font-medium transition-colors flex items-center justify-center gap-1"
                                        >
                                            <FaDownload size={12} />
                                            Download
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 p-4 flex justify-end bg-white">
                    <button
                        onClick={closeModal}
                        className="px-5 py-2 rounded-lg bg-gray-900 text-white font-medium hover:shadow-lg transition"
                    >
                        Close
                    </button>
                </div>
            </Modal>

            {/* Image Preview Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-4xl max-h-[90vh]">
                        <button
                            onClick={() => setSelectedImage(null)}
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
        </>
    );
}