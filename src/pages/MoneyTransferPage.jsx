import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import api from '../api/axios'

import {
    FaCreditCard,
    FaMoneyBillWave,
    FaBuilding,
    FaUser,
    FaExchangeAlt,
    FaLock,
    FaShieldAlt,
    FaCalendarAlt,
    FaCheckCircle,
    FaArrowRight,
    FaQrcode,
    FaCopy,
    FaMobileAlt,
} from "react-icons/fa";

export default function MoneyTransferPage() {

    const { jwtToken, isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [selectedMethod, setSelectedMethod] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [workers, setWorkers] = useState([]);

    // Form state
    const [formData, setFormData] = useState({
        amount: "",
        workerId: "",
        workerName: "",
        workerEmail: "",
        paymentMethod: "",
        cardNumber: "",
        cardHolder: "",
        expiryDate: "",
        cvv: "",
        bankAccountNumber: "",
        bankName: "",
        branch: "",
        notes: "",
        transferType: "instant", // instant or scheduled
        scheduleDate: "",
    });


    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }
    useEffect(() => {
        if (!jwtToken) return;

        api
            .get("/bank", config)
            .then((res) => {

                setWorkers(res.data);

            })
            .catch((error) => {
                console.error("Failed to load user:", error);

            });
    }, [jwtToken]);

    const [user, setUser] = useState({
        name: "",
        email: "",
        contact: "",
        address: "",
        imageUrl: "",
    });


    useEffect(() => {
        if (!jwtToken) return;

        api
            .get("/user", {
                headers: { Authorization: `Bearer ${jwtToken}` },
            })
            .then((res) => {
                setUser(res.data);

            })
            .catch(() => setLoading(false));
    }, [jwtToken]);


    const paymentMethods = [
        { id: "card", name: "Credit/Debit Card", icon: FaCreditCard, color: "from-amber-500 to-orange-500" },
        { id: "bank", name: "Bank Transfer", icon: FaBuilding, color: "from-yellow-500 to-amber-500" },
        { id: "digital", name: "Digital Wallet", icon: FaMoneyBillWave, color: "from-amber-400 to-yellow-400" },
    ];

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle worker selection
    const handleWorkerSelect = (worker) => {
        setFormData((prev) => ({
            ...prev,
            workerId: worker.worker.id,
            workerName: worker.fullName,
            workerEmail: worker.email,
        }));
    };

    // Handle payment method selection
    const handleMethodSelect = (methodId) => {
        setSelectedMethod(methodId);
        setFormData((prev) => ({
            ...prev,
            paymentMethod: methodId,
        }));
    };


    const validateForm = () => {
        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            toast.error("Please enter a valid amount");
            return false;
        }

        if (!formData.workerId) {
            toast.error("Please select a worker");
            return false;
        }

        if (!formData.paymentMethod) {
            toast.error("Please select a payment method");
            return false;
        }

        // 🔹 Card validation
        if (formData.paymentMethod === "card") {
            if (
                !formData.cardNumber ||
                !formData.cardHolder ||
                !formData.expiryDate ||
                !formData.cvv
            ) {
                toast.error("Please fill all card details");
                return false;
            }
        }

        // 🔹 Bank transfer validation
        if (formData.paymentMethod === "bank") {
            if (
                !formData.bankName ||
                !formData.bankAccountNumber ||
                !formData.branch
            ) {
                toast.error("Please fill all bank transfer details");
                return false;
            }
        }

        // 🔹 Digital wallet validation
        if (formData.paymentMethod === "digital") {
            toast.error("Please complete the digital wallet payment");
            return false;
        }

        // 🔹 Scheduled transfer validation
        if (formData.transferType === "scheduled" && !formData.scheduleDate) {
            toast.error("Please select a schedule date");
            return false;
        }

        return true;
    };



    const [transaction, setTransaction] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        const transactionId = `TX${Date.now()}`; // frontend ID (can be overridden by backend)

        try {
            const res = await api.post("/transfer", {
                transactionId,
                paymentMethod: formData.paymentMethod,
                fullName: formData.workerName,
                amount: parseFloat(formData.amount),
                //  createdAt: new Date().toISOString(),
                userId: user?.id,
                workerId: formData.workerId,
            }, config);

            // save backend response
            setTransaction(res.data);

            toast.success("Payment transferred successfully!");
            setShowConfirmation(true);
            setStep(3);
        } catch (error) {
            console.error(error);
            toast.error("Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    // Reset form
    const handleReset = () => {
        setFormData({
            amount: "",
            workerId: "",
            workerName: "",
            workerEmail: "",
            paymentMethod: "",
            cardNumber: "",
            cardHolder: "",
            expiryDate: "",
            cvv: "",
            bankAccountNumber: "",
            bankName: "",
            branch: "",
            notes: "",
            transferType: "instant",
            scheduleDate: "",
        });
        setSelectedMethod("");
        setStep(1);
        setShowConfirmation(false);
    };

    // Format card number
    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || "";
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(" ");
        } else {
            return value;
        }
    };

    // Format expiry date
    const formatExpiryDate = (value) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        if (v.length >= 2) {
            return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
        }
        return v;
    };



    return (

        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-3">
                        <FaExchangeAlt className="inline-block mr-3 mb-1" />
                        Send Payment to Worker
                    </h1>
                    <p className="text-amber-700 text-lg">
                        Secure and instant money transfer to your workers
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="mb-8 md:mb-12">
                    <div className="flex justify-center items-center">
                        {[1, 2, 3].map((stepNum) => (
                            <div key={stepNum} className="flex items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${step >= stepNum
                                        ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg"
                                        : "bg-amber-100 text-amber-600"
                                        }`}
                                >
                                    {step > stepNum ? <FaCheckCircle /> : stepNum}
                                </div>
                                {stepNum < 3 && (
                                    <div
                                        className={`w-16 md:w-24 h-1 ${step > stepNum
                                            ? "bg-gradient-to-r from-amber-500 to-yellow-500"
                                            : "bg-amber-200"
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-sm font-medium text-amber-800">
                        <span className={`${step >= 1 ? "text-amber-900 font-bold" : ""}`}>
                            Select Worker
                        </span>
                        <span className={`${step >= 2 ? "text-amber-900 font-bold" : ""}`}>
                            Payment Details
                        </span>
                        <span className={`${step >= 3 ? "text-amber-900 font-bold" : ""}`}>
                            Confirmation
                        </span>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-100">
                    <div className="p-6 md:p-8">
                        {/* STEP 1: Select Worker */}
                        {step === 1 && (
                            <div className="animate-fadeIn">
                                <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center">
                                    <FaUser className="mr-3" />
                                    Select Worker
                                </h2>

                                {/* Amount Input */}
                                <div className="mb-8">
                                    <label className="block text-amber-800 font-medium mb-3">
                                        Enter Amount (LKR)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 text-xl font-bold">
                                            LKR
                                        </span>
                                        <input
                                            type="number"
                                            name="amount"
                                            value={formData.amount}
                                            onChange={handleInputChange}
                                            placeholder="0.00"
                                            className="w-full pl-16 pr-6 py-4 text-2xl font-bold text-amber-900 bg-amber-50 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Workers Grid */}
                                <div className="mb-8">
                                    <label className="block text-amber-800 font-medium mb-4">
                                        Select Worker to Pay
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {workers.map((worker) => (
                                            <div
                                                key={worker.id}
                                                onClick={() => handleWorkerSelect(worker)}
                                                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${formData.workerId === worker.id
                                                    ? "border-amber-500 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-lg transform scale-[1.02]"
                                                    : "border-amber-100 hover:border-amber-300 hover:shadow-md"
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <div>
                                                        <h3 className="font-bold text-amber-900">{worker.fullName}</h3>
                                                        <p className="text-sm text-amber-600">{worker.email}</p>
                                                    </div>
                                                    {formData.workerId === worker.id && (
                                                        <FaCheckCircle className="text-amber-500 text-xl" />
                                                    )}
                                                </div>
                                                <div className="text-sm text-amber-700 mt-3">
                                                    <div className="flex items-center gap-2">
                                                        <FaBuilding className="text-amber-500" />
                                                        <span>{worker.bankName}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <FaCreditCard className="text-amber-500" />
                                                        <span>Account: {worker.accountNumber}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Navigation */}
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => formData.workerId && formData.amount && setStep(2)}
                                        disabled={!formData.workerId || !formData.amount}
                                        className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Continue
                                        <FaArrowRight />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: Payment Method */}
                        {step === 2 && (
                            <div className="animate-fadeIn">
                                <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center">
                                    <FaCreditCard className="mr-3" />
                                    Payment Method
                                </h2>

                                {/* Payment Methods */}
                                <div className="mb-8">
                                    <label className="block text-amber-800 font-medium mb-4">
                                        Choose Payment Method
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {paymentMethods.map((method) => {
                                            const Icon = method.icon;
                                            return (
                                                <div
                                                    key={method.id}
                                                    onClick={() => handleMethodSelect(method.id)}
                                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${selectedMethod === method.id
                                                        ? `border-amber-500 bg-gradient-to-r ${method.color} text-white shadow-lg transform scale-[1.02]`
                                                        : "border-amber-100 hover:border-amber-300 hover:shadow-md"
                                                        }`}
                                                >
                                                    <Icon className="text-3xl mb-3" />
                                                    <h3 className="font-bold">{method.name}</h3>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Payment Form */}
                                {selectedMethod && (
                                    <div className="mb-8 animate-slideDown">
                                        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200">
                                            {selectedMethod === "card" && (
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-amber-800 font-medium mb-2">
                                                            Card Number
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="cardNumber"
                                                            value={formData.cardNumber}
                                                            onChange={(e) => {
                                                                setFormData((prev) => ({
                                                                    ...prev,
                                                                    cardNumber: formatCardNumber(e.target.value),
                                                                }));
                                                            }}
                                                            placeholder="1234 5678 9012 3456"
                                                            maxLength="19"
                                                            className="w-full px-4 py-3 text-amber-900 bg-white border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-amber-800 font-medium mb-2">
                                                                Card Holder
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="cardHolder"
                                                                value={formData.cardHolder}
                                                                onChange={handleInputChange}
                                                                placeholder="John Doe"
                                                                className="w-full px-4 py-3 text-amber-900 bg-white border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-amber-800 font-medium mb-2">
                                                                Expiry Date
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="expiryDate"
                                                                value={formData.expiryDate}
                                                                onChange={(e) => {
                                                                    setFormData((prev) => ({
                                                                        ...prev,
                                                                        expiryDate: formatExpiryDate(e.target.value),
                                                                    }));
                                                                }}
                                                                placeholder="MM/YY"
                                                                maxLength="5"
                                                                className="w-full px-4 py-3 text-amber-900 bg-white border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-amber-800 font-medium mb-2">
                                                                CVV
                                                            </label>
                                                            <div className="relative">
                                                                <input
                                                                    type="password"
                                                                    name="cvv"
                                                                    value={formData.cvv}
                                                                    onChange={handleInputChange}
                                                                    placeholder="123"
                                                                    maxLength="3"
                                                                    className="w-full px-4 py-3 text-amber-900 bg-white border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none"
                                                                />
                                                                <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400" />
                                                            </div>
                                                        </div>
                                                        <div className="flex items-end">
                                                            <div className="flex items-center gap-2 text-amber-600">
                                                                <FaShieldAlt className="text-xl" />
                                                                <span className="text-sm">Secure Payment</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {selectedMethod === "bank" && (
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-amber-800 font-medium mb-2">
                                                            Bank Name
                                                        </label>
                                                        <select
                                                            name="bankName"
                                                            value={formData.bankName}
                                                            onChange={handleInputChange}
                                                            className="w-full px-4 py-3 text-amber-900 bg-white border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none"
                                                        >
                                                            <option value="">Select Bank</option>
                                                            <option value="Commercial Bank">Commercial Bank</option>
                                                            <option value="Bank of Ceylon">Bank of Ceylon</option>
                                                            <option value="Hatton National Bank">Hatton National Bank</option>
                                                            <option value="Sampath Bank">Sampath Bank</option>
                                                            <option value="DFCC Bank">DFCC Bank</option>
                                                        </select>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-amber-800 font-medium mb-2">
                                                                Account Number
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="bankAccountNumber"
                                                                value={formData.bankAccountNumber}
                                                                onChange={handleInputChange}
                                                                placeholder="1234567890"
                                                                className="w-full px-4 py-3 text-amber-900 bg-white border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-amber-800 font-medium mb-2">
                                                                Branch
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="branch"
                                                                value={formData.branch}
                                                                onChange={handleInputChange}
                                                                placeholder="Main Branch"
                                                                className="w-full px-4 py-3 text-amber-900 bg-white border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {selectedMethod === "digital" && (
                                                <div className="text-center p-6">
                                                    <div className="inline-block p-6 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl mb-4">
                                                        <FaMobileAlt className="text-5xl text-amber-500" />
                                                    </div>
                                                    <h3 className="text-xl font-bold text-amber-900 mb-2">
                                                        Digital Wallet
                                                    </h3>
                                                    <p className="text-amber-700 mb-6">
                                                        Scan QR code or use mobile banking apps
                                                    </p>
                                                    <div className="bg-white p-4 rounded-xl inline-block border-2 border-amber-200">
                                                        <FaQrcode className="text-4xl text-amber-500" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Transfer Options */}
                                <div className="mb-8">
                                    <label className="block text-amber-800 font-medium mb-4">
                                        Transfer Options
                                    </label>
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setFormData((prev) => ({ ...prev, transferType: "instant" }))
                                            }
                                            className={`px-6 py-3 rounded-xl font-medium transition-all ${formData.transferType === "instant"
                                                ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg"
                                                : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                                                }`}
                                        >
                                            Instant Transfer
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setFormData((prev) => ({ ...prev, transferType: "scheduled" }))
                                            }
                                            className={`px-6 py-3 rounded-xl font-medium transition-all ${formData.transferType === "scheduled"
                                                ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg"
                                                : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                                                }`}
                                        >
                                            <FaCalendarAlt className="inline-block mr-2" />
                                            Schedule Transfer
                                        </button>
                                    </div>

                                    {formData.transferType === "scheduled" && (
                                        <div className="mt-4 animate-slideDown">
                                            <label className="block text-amber-800 font-medium mb-2">
                                                Schedule Date
                                            </label>
                                            <input
                                                type="date"
                                                name="scheduleDate"
                                                value={formData.scheduleDate}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 text-amber-900 bg-white border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Notes */}
                                <div className="mb-8">
                                    <label className="block text-amber-800 font-medium mb-2">
                                        Additional Notes (Optional)
                                    </label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                        placeholder="Add any notes about this payment..."
                                        rows="3"
                                        className="w-full px-4 py-3 text-amber-900 bg-white border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none resize-none"
                                    />
                                </div>

                                {/* Navigation */}
                                <div className="flex justify-between">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="px-6 py-3 bg-amber-100 text-amber-800 font-medium rounded-xl hover:bg-amber-200 transition-all"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading || !selectedMethod}
                                        className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                Confirm Payment
                                                <FaArrowRight />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: Confirmation */}
                        {step === 3 && showConfirmation && (
                            <div className="text-center py-8 animate-fadeIn">
                                <div className="inline-block p-6 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-full mb-6">
                                    <FaCheckCircle className="text-6xl text-amber-500" />
                                </div>
                                <h2 className="text-3xl font-bold text-amber-900 mb-4">
                                    Payment Successful!
                                </h2>
                                <p className="text-amber-700 text-lg mb-2">
                                    LKR {formData.amount} has been transferred to
                                </p>
                                <p className="text-xl font-bold text-amber-900 mb-8">
                                    {formData.workerName}
                                </p>

                                {/* Transaction Details */}
                                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 max-w-md mx-auto mb-8 border border-amber-200">
                                    <div className="grid grid-cols-2 gap-4 text-left">
                                        <div>
                                            <p className="text-amber-600 text-sm">Transaction ID</p>
                                            {transaction?.transactionId || "TX0000"}
                                        </div>
                                        <div>
                                            <p className="text-amber-600 text-sm">Date & Time</p>
                                            <p className="font-bold text-amber-900">
                                                {new Date().toLocaleString()}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-amber-600 text-sm">Payment Method</p>
                                            <p className="font-bold text-amber-900">
                                                {formData.paymentMethod === "card"
                                                    ? "Credit Card"
                                                    : formData.paymentMethod === "bank"
                                                        ? "Bank Transfer"
                                                        : "Digital Wallet"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-amber-600 text-sm">Status</p>
                                            <p className="font-bold text-green-600">Completed</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button
                                        onClick={handleReset}
                                        className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-medium rounded-xl hover:shadow-lg hover:scale-105 transition-all"
                                    >
                                        Make Another Payment
                                    </button>
                                    <button
                                        onClick={() => window.print()}
                                        className="px-6 py-3 bg-white border-2 border-amber-300 text-amber-800 font-medium rounded-xl hover:bg-amber-50 transition-all flex items-center gap-2 justify-center"
                                    >
                                        <FaCopy />
                                        Print Receipt
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Security Badges */}
                <div className="flex flex-wrap justify-center gap-6 mt-8 text-amber-700">
                    <div className="flex items-center gap-2">
                        <FaLock className="text-amber-500" />
                        <span className="text-sm">256-bit SSL Encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaShieldAlt className="text-amber-500" />
                        <span className="text-sm">PCI DSS Compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaCheckCircle className="text-amber-500" />
                        <span className="text-sm">Secure Transactions</span>
                    </div>
                </div>
            </div>

            {/* Add animations */}
            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
        </div>
    );
}