// import { useEffect, useState } from "react";
// import Modal from "react-modal";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useAuth } from "../context/AuthContext";

// Modal.setAppElement("#root");

// /* ----------------- Helper Functions ----------------- */

// function getPlanDurationInMonths(planName) {
//   switch (planName?.toLowerCase()) {
//     case "go":
//       return 3;
//     case "pro":
//       return 6;
//     case "plus":
//       return 12;
//     default:
//       return 0;
//   }
// }

// function calculateExpiry(createdAt, planName) {
//   const startDate = new Date(createdAt);
//   const months = getPlanDurationInMonths(planName);

//   const expiryDate = new Date(startDate);
//   expiryDate.setMonth(expiryDate.getMonth() + months);

//   const today = new Date();
//   const diffTime = expiryDate - today;
//   const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//   return {
//     expiryDate,
//     remainingDays,
//     isExpired: remainingDays < 0,
//   };
// }

// /* ----------------- Component ----------------- */

// export default function PaymentDetailsModal({
//   userId,
//   triggerButtonText = "Payment Details",
//   buttonClass = "",
// }) {
//   const { jwtToken } = useAuth();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [payment, setPayment] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const openModal = () => {
//     if (!userId) {
//       toast.error("User ID not found");
//       return;
//     }
//     setIsModalOpen(true);
//   };

//   const closeModal = () => setIsModalOpen(false);

//   const config = {
//     headers: {
//       Authorization: `Bearer ${jwtToken}`,
//     },
//   };

//   useEffect(() => {
//     if (!isModalOpen || !userId) return;

//     setLoading(true);
//     axios
//       .get(`http://localhost:8081/payment/${userId}`, config)
//       .then((res) => setPayment(res.data))
//       .catch(() => {
//         toast.error("Payment details not found");
//         setPayment(null);
//       })
//       .finally(() => setLoading(false));
//   }, [isModalOpen, userId]);

//   return (
//     <>
//       {/* Trigger Button */}
//       <button onClick={openModal} className={buttonClass}>
//         {triggerButtonText}
//       </button>

//       {/* Modal */}
//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={closeModal}
//         contentLabel="Payment Details"
//         className="bg-white p-0 rounded-2xl shadow-2xl w-[480px] mx-auto mt-32 relative z-50 overflow-hidden"
//         overlayClassName="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start z-40"
//       >
//         {/* Header */}
//         <div className="bg-primary to-blue-600 p-5">
//           <h2 className="text-xl font-bold text-white">
//             Payment Details
//           </h2>
//           <p className="text-sm text-white/80">
//             Worker subscription & billing information
//           </p>
//         </div>

//         {/* Body */}
//         <div className="p-6">
//           {loading && (
//             <p className="text-sm text-gray-500">
//               Loading payment details...
//             </p>
//           )}

//           {!loading && !payment && (
//             <p className="text-sm text-red-500">
//               No payment record found for this user.
//             </p>
//           )}

//           {!loading && payment && (() => {
//             const { expiryDate, remainingDays, isExpired } =
//               calculateExpiry(payment.createdAt, payment.planName);

//             return (
//               <div className="space-y-4">

//                 {/* Main Info */}
//                 <div className="bg-gray-50 rounded-xl p-4 border">
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div>
//                       <p className="text-gray-500">Name</p>
//                       <p className="font-semibold">{payment.name}</p>
//                     </div>

//                     <div>
//                       <p className="text-gray-500">Email</p>
//                       <p className="font-semibold">{payment.email}</p>
//                     </div>

//                     <div>
//                       <p className="text-gray-500">Plan</p>
//                       <span
//                         className={`inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full
//                         ${
//                           isExpired
//                             ? "bg-red-100 text-red-700"
//                             : "bg-green-100 text-green-700"
//                         }`}
//                       >
//                         {payment.planName.toUpperCase()}
//                       </span>
//                     </div>

//                     <div>
//                       <p className="text-gray-500">Amount</p>
//                       <p className="font-semibold text-primary">
//                         LKR {payment.amount}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Subscription Info */}
//                 <div className="bg-white border rounded-xl p-4 text-sm space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-500">Paid On</span>
//                     <span className="font-medium">
//                       {new Date(payment.createdAt).toLocaleDateString()}
//                     </span>
//                   </div>

//                   <div className="flex justify-between">
//                     <span className="text-gray-500">Expires On</span>
//                     <span className="font-medium">
//                       {expiryDate.toLocaleDateString()}
//                     </span>
//                   </div>

//                   <div className="flex justify-between">
//                     <span className="text-gray-500">Remaining</span>
//                     <span
//                       className={`font-semibold ${
//                         isExpired ? "text-red-600" : "text-green-600"
//                       }`}
//                     >
//                       {isExpired
//                         ? `Expired ${Math.abs(remainingDays)} days ago`
//                         : `${remainingDays} days left`}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Address */}
//                 <div className="bg-white border rounded-xl p-4 text-sm">
//                   <p className="text-gray-500 mb-1">Address</p>
//                   <p className="font-medium">{payment.address}</p>
//                 </div>
//               </div>
//             );
//           })()}

//           {/* Footer */}
//           <div className="mt-6 flex justify-end">
//             <button
//               onClick={closeModal}
//               className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-medium transition"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// }


import { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import {
    FaCalendarAlt,
    FaCreditCard,
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaUser,
    FaEnvelope,
    FaMapMarkerAlt,
    FaExternalLinkAlt,
    FaDownload,
    FaCalendarDay,
    FaCalendarCheck,
    FaHistory,
    FaChevronDown
} from "react-icons/fa";
import {
    FiCalendar,
    FiCreditCard,
    FiClock,
    FiCheckCircle,
    FiXCircle,
    FiUser,
    FiMail,
    FiMapPin,
    FiExternalLink,
    FiDownload,
    FiChevronDown
} from "react-icons/fi";

Modal.setAppElement("#root");

/* ----------------- Helper Functions ----------------- */

function getPlanDurationInMonths(planName) {
    switch (planName?.toLowerCase()) {
        case "go":
            return 3;
        case "pro":
            return 6;
        case "plus":
            return 12;
        default:
            return 0;
    }
}

function calculateExpiry(createdAt, planName) {
    const startDate = new Date(createdAt);
    const months = getPlanDurationInMonths(planName);

    const expiryDate = new Date(startDate);
    expiryDate.setMonth(expiryDate.getMonth() + months);

    const today = new Date();
    const diffTime = expiryDate - today;
    const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
        expiryDate,
        remainingDays,
        isExpired: remainingDays < 0,
    };
}

/* ----------------- Plan Configuration ----------------- */

const planConfig = {
    go: {
        name: "GO",
        color: "bg-blue-500",
        gradient: "from-blue-500 to-cyan-400",
        textColor: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-100",
        duration: "3 Months",
        price: "LKR 2,999"
    },
    pro: {
        name: "PRO",
        color: "bg-purple-500",
        gradient: "from-purple-500 to-pink-400",
        textColor: "text-purple-600",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-100",
        duration: "6 Months",
        price: "LKR 5,499"
    },
    plus: {
        name: "PLUS",
        color: "bg-amber-500",
        gradient: "from-amber-500 to-orange-400",
        textColor: "text-amber-600",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-100",
        duration: "12 Months",
        price: "LKR 9,999"
    }
};

/* ----------------- Component ----------------- */

export default function PaymentDetailsModal({
    userId,
    triggerButtonText = "Payment Details",
    buttonClass = "px-4 py-2.5 bg-gradient-to-r from-primary to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center gap-2",
}) {
    const { jwtToken } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [payment, setPayment] = useState(null);
    const [loading, setLoading] = useState(false);

    const openModal = () => {
        if (!userId) {
            toast.error("User ID not found");
            return;
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
    };

    useEffect(() => {
        if (!isModalOpen || !userId) return;

        setLoading(true);
        axios
            .get(`http://localhost:8081/payment/${userId}`, config)
            .then((res) => setPayment(res.data))
            .catch(() => {
                toast.error("Payment details not found");
                setPayment(null);
            })
            .finally(() => setLoading(false));
    }, [isModalOpen, userId]);

    const getPlanConfig = (planName) => {
        const key = planName?.toLowerCase();
        return planConfig[key] || planConfig.go;
    };

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={openModal}
                className={`${buttonClass} group`}
            >
                {/* <FaCreditCard className="w-4 h-4" /> */}
                <span>{triggerButtonText}</span>
                {/* <FiExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> */}
            </button>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Payment Details"
                className="bg-white p-0 rounded-3xl shadow-2xl w-[700px] mx-auto my-8 relative z-50 overflow-hidden border border-gray-100"
                overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-start overflow-y-auto z-40 py-8"
                closeTimeoutMS={300}
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
                {/* Header with Gradient - Fixed */}
                <div className={`relative overflow-hidden bg-gradient-to-r ${payment ? getPlanConfig(payment.planName).gradient : "from-primary to-blue-600"} p-6 flex-shrink-0`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -translate-x-12 translate-y-12"></div>

                    <div className="relative z-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                    <FaCreditCard className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">
                                        Payment Details
                                    </h2>
                                    <p className="text-white/90 text-sm mt-1">
                                        Subscription & billing information
                                    </p>
                                </div>
                            </div>
                            {payment && (
                                <div className={`px-4 py-2 rounded-full ${getPlanConfig(payment.planName).bgColor} backdrop-blur-sm border ${getPlanConfig(payment.planName).borderColor}`}>
                                    <span className={`font-bold ${getPlanConfig(payment.planName).textColor} flex items-center gap-2`}>
                                        <FiCalendar className="w-3 h-3" />
                                        {payment.planName.toUpperCase()}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto px-6 py-4" style={{ maxHeight: 'calc(100vh - 300px)' }}>
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-8">
                            <div className="relative">
                                <div className="w-12 h-12 border-4 border-primary/20 rounded-full"></div>
                                <div className="absolute top-0 left-0 w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <p className="text-gray-500 font-medium mt-4">Loading payment details...</p>
                            <p className="text-sm text-gray-400 mt-1">Please wait a moment</p>
                        </div>
                    )}

                    {!loading && !payment && (
                        <div className="text-center py-8">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
                                <FaTimesCircle className="w-10 h-10 text-red-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Payment Record</h3>
                            <p className="text-gray-500 max-w-sm mx-auto">
                                No payment details found for this user.
                            </p>
                        </div>
                    )}

                    {!loading && payment && (() => {
                        const { expiryDate, remainingDays, isExpired } =
                            calculateExpiry(payment.createdAt, payment.planName);
                        const plan = getPlanConfig(payment.planName);

                        return (
                            <div className="space-y-5">
                                {/* User Info Card */}
                                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 ${plan.bgColor} rounded-xl flex items-center justify-center`}>
                                            <FaUser className={`w-6 h-6 ${plan.textColor}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-lg text-gray-800 truncate">{payment.name}</h3>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
                                                <div className="flex items-center gap-1 text-gray-600 text-sm">
                                                    <FaEnvelope className="w-3.5 h-3.5 flex-shrink-0" />
                                                    <span className="truncate">{payment.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Summary Grid */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100">
                                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                                            <FiCreditCard className="w-4 h-4 flex-shrink-0" />
                                            <span className="text-sm font-medium truncate">Amount Paid</span>
                                        </div>
                                        <p className="text-xl font-bold text-gray-800 truncate">LKR {payment.amount}</p>
                                        <div className="mt-2">
                                            <span className={`px-2 py-1 text-xs rounded-full ${plan.bgColor} ${plan.textColor} font-medium`}>
                                                {plan.duration}
                                            </span>
                                        </div>
                                    </div>

                                    <div className={`rounded-xl p-4 border ${isExpired ? 'bg-gradient-to-br from-red-50 to-white border-red-100' : 'bg-gradient-to-br from-green-50 to-white border-green-100'}`}>
                                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                                            <FiClock className="w-4 h-4 flex-shrink-0" />
                                            <span className="text-sm font-medium">Status</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {isExpired ? (
                                                <>
                                                    <FaTimesCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                                    <span className="text-lg font-bold text-red-600">Expired</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                    <span className="text-lg font-bold text-green-600">Active</span>
                                                </>
                                            )}
                                        </div>
                                        <p className={`text-xs mt-2 font-medium ${isExpired ? "text-red-600" : "text-green-600"}`}>
                                            {isExpired
                                                ? `Expired ${Math.abs(remainingDays)} days ago`
                                                : `${remainingDays} days remaining`}
                                        </p>
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div className="bg-white border border-gray-100 rounded-2xl p-4">
                                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                        <FaCalendarAlt className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                        Subscription Timeline
                                    </h4>
                                    <div className="relative">
                                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                                        <div className="space-y-5 relative">
                                            {/* Start Date */}
                                            <div className="flex items-start gap-3">
                                                <div className={`w-7 h-7 rounded-full ${plan.bgColor} border-2 border-white shadow-sm flex items-center justify-center z-10 flex-shrink-0`}>
                                                    <FaCalendarDay className={`w-3 h-3 ${plan.textColor}`} />
                                                </div>
                                                <div className="flex-1 pt-0.5">
                                                    <p className="font-medium text-gray-800 text-sm">Subscription Started</p>
                                                    <p className="text-sm text-gray-600">
                                                        {new Date(payment.createdAt).toLocaleDateString('en-US', {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Plan: {payment.planName}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Expiry Date */}
                                            <div className="flex items-start gap-3">
                                                <div className={`w-7 h-7 rounded-full ${isExpired ? 'bg-red-100' : 'bg-amber-100'} border-2 border-white shadow-sm flex items-center justify-center z-10 flex-shrink-0`}>
                                                    {isExpired ? (
                                                        <FaHistory className="w-3 h-3 text-red-500" />
                                                    ) : (
                                                        <FaCalendarCheck className="w-3 h-3 text-amber-500" />
                                                    )}
                                                </div>
                                                <div className="flex-1 pt-0.5">
                                                    <p className={`font-medium ${isExpired ? 'text-red-700' : 'text-amber-700'} text-sm`}>
                                                        {isExpired ? 'Subscription Expired' : 'Expiry Date'}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {expiryDate.toLocaleDateString('en-US', {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                    <p className={`text-xs mt-1 ${isExpired ? 'text-red-600' : 'text-amber-600'}`}>
                                                        {isExpired ? 'Renewal required' : 'Auto-renewal disabled'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Address Card */}
                                <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-4 border border-gray-100">
                                    <div className="flex items-start gap-3">
                                        <div className={`p-2 ${plan.bgColor} rounded-lg flex-shrink-0`}>
                                            <FaMapMarkerAlt className={`w-3.5 h-3.5 ${plan.textColor}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-600 mb-1">Billing Address</p>
                                            <p className="text-gray-800 text-sm break-words">{payment.address}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Bar - Only show if not expired */}
                                {!isExpired && remainingDays > 0 && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600 flex items-center gap-1">
                                                <FiClock className="w-3.5 h-3.5" />
                                                Subscription Progress
                                            </span>
                                            <span className="font-medium text-gray-800 text-sm">{remainingDays} days left</span>
                                        </div>
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${plan.gradient.replace('from-', 'bg-gradient-to-r from-')} transition-all duration-1000 ease-out`}
                                                style={{
                                                    width: `${Math.max(5, Math.min(100, (remainingDays / (getPlanDurationInMonths(payment.planName) * 30)) * 100))}%`
                                                }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500">
                                            <span>Start</span>
                                            <span>Expiry</span>
                                        </div>
                                    </div>
                                )}

                                {/* Scroll indicator */}
                                <div className="text-center pt-2">
                                    <div className="inline-flex items-center gap-1 text-xs text-gray-400">
                                        <FiChevronDown className="w-3 h-3 animate-bounce" />
                                        <span>Scroll for more</span>
                                        <FiChevronDown className="w-3 h-3 animate-bounce" />
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>

                {/* Footer - Fixed at bottom */}
                <div className="border-t border-gray-100 p-4 flex-shrink-0 bg-white">
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => {
                                toast.success("Receipt download started");
                                // Add actual download logic here
                            }}
                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 hover:shadow-sm hover:border-gray-400 text-sm"
                        >
                            <FiDownload className="w-4 h-4" />
                            Download Receipt
                        </button>
                        <button
                            onClick={closeModal}
                            className="px-5 py-2 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 text-white font-medium hover:shadow-lg transition-all duration-300 hover:scale-[1.02] text-sm"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
