import { useEffect, useState } from "react";
import Modal from "react-modal";
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

Modal.setAppElement("#root");

export default function TransferDetailsModal({
    workerId,
    triggerButtonText = "Transfer Details",
    buttonClass = "px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg font-medium hover:shadow-lg transition"
}) {
    const { jwtToken } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transfers, setTransfers] = useState([]);
    const [loading, setLoading] = useState(false);

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
    };

    const openModal = () => {
        if (!workerId) {
            toast.error("Worker ID not found");
            return;
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        if (!isModalOpen || !workerId) return;

        setLoading(true);
        api
            .get(`/transfe/${workerId}`, config)
            .then((res) => setTransfers(res.data))
            .catch(() => {
                toast.error("Transfer details not found");
                setTransfers([]);
            })
            .finally(() => setLoading(false));
    }, [isModalOpen, workerId]);

    /* ---------------- Chart Data (Amount by Date) ---------------- */
    const chartData = transfers.reduce((acc, t) => {
        const date = new Date(t.createdAt).toLocaleDateString("en-GB");

        const existing = acc.find(item => item.date === date);
        if (existing) {
            existing.amount += t.amount;
        } else {
            acc.push({
                date,
                amount: t.amount
            });
        }
        return acc;
    }, []);

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
                className="bg-white rounded-3xl shadow-2xl w-[700px] mx-auto my-10 overflow-hidden border border-gray-100"
                overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-start z-40 py-8"
                style={{
                    content: {
                        maxHeight: 'calc(100vh - 160px)', // More space overall
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        top: '80px', // Position from top
                        bottom: '20px', // Position from bottom
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
                            <h2 className="text-2xl font-bold">Transfer Details</h2>
                            <p className="text-sm text-white/90">
                                Worker payment transactions
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[480px] overflow-y-auto">
                    {loading && (
                        <p className="text-center text-gray-500 font-medium">
                            Loading transfer details...
                        </p>
                    )}

                    {!loading && transfers.length === 0 && (
                        <div className="text-center py-10">
                            <FaTimesCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
                            <p className="font-semibold text-gray-700">
                                No Transfer Records Found
                            </p>
                        </div>
                    )}

                    {/* ----------- Area Chart ----------- */}
                    {!loading && transfers.length > 0 && (
                        <div className="mb-6 bg-white border border-gray-100 rounded-2xl p-4">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                Transfer Amount Over Time
                            </h3>

                            <div className="h-[220px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                                                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.05} />
                                            </linearGradient>
                                        </defs>

                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
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

                    {/* ----------- Transfer Cards ----------- */}
                    {!loading && transfers.length > 0 && (
                        <div className="space-y-4">
                            {transfers.map((t, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-100 rounded-2xl p-4 bg-gradient-to-br from-gray-50 to-white shadow-sm"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2 text-gray-700 font-semibold">
                                            <FaHashtag />
                                            {t.transactionId}
                                        </div>
                                        <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                                            <FaCheckCircle />
                                            Completed
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FaCreditCard />
                                            {t.paymentMethod}
                                        </div>

                                        <div className="flex items-center gap-2 font-bold text-gray-800">
                                            LKR {t.amount.toFixed(2)}
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FaUser />
                                            User ID: {t.user?.id}
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FaUserTie />
                                            Worker ID: {t.worker?.id}
                                        </div>
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
        </>
    );
}
