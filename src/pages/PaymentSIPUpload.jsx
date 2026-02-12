import { useState, useEffect } from "react";
import uploadFile from "../utils/meadiaUpload";
import toast from "react-hot-toast";
import api from '../api/axios';
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PaymentSIPUpload() {
    const navigate = useNavigate();

    const [amount, setAmount] = useState("");

    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");

    const [paymentDate, setPaymentDate] = useState("");
    const [paymentSIP, setPaymentSIP] = useState(null);
    const [remarks, setRemarks] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { jwtToken, isAuthenticated } = useAuth();
    const { workerId } = useParams();

    const [worker, setWorker] = useState(null);
    const [user, setUser] = useState({ id: null, name: "", email: "", contact: "", address: "", imageUrl: "" });

    const config = {
        headers: { Authorization: `Bearer ${jwtToken}` },
    };

    // Fetch worker
    async function getWorker() {
        try {
            const response = await api.get(`/worker/id/${workerId}`, config);
            setWorker(response.data);
        } catch (error) {
            console.log("Error loading worker:", error);
        }
    }

    // Fetch logged-in user
    useEffect(() => {
        if (!jwtToken) return;
        api
            .get("/user", { headers: { Authorization: `Bearer ${jwtToken}` } })
            .then((res) => setUser(res.data))
            .catch((err) => console.log("Failed to load user", err));
    }, [jwtToken]);

    useEffect(() => {
        if (isAuthenticated && workerId) getWorker();
    }, [isAuthenticated, workerId]);

    async function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            setPaymentSIP(file);
            setError("");
        }
    }

    async function submit(event) {
        event.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess("");

        // --- VALIDATIONS ---
        if (!amount || !bankName || !accountNumber || !paymentDate || !paymentSIP) {
            setError("All fields are required");
            toast.error("All fields are required!");
            setIsLoading(false);
            return;
        }

        if (isNaN(amount) || parseFloat(amount) <= 0) {
            setError("Please enter a valid amount");
            toast.error("Please enter a valid amount!");
            setIsLoading(false);
            return;
        }

        if (accountNumber.length < 9) {
            setError("Please enter a valid account number");
            toast.error("Please enter a valid account number!");
            setIsLoading(false);
            return;
        }


        // UPLOAD SIP IMAGE TO SUPABASE
        let sipImageUrl = "";
        if (paymentSIP) {
            try {
                sipImageUrl = await uploadFile(paymentSIP);
            } catch (err) {
                setError("SIP image upload failed");
                toast.error("SIP image upload failed!");
                setIsLoading(false);
                return;
            }
        }

        const paymentData = {
            amount: parseFloat(amount),

            bankName: bankName,
            accountNumber: accountNumber,

            paymentDate: paymentDate,
            sipImageUrl: sipImageUrl,
            remarks: remarks || "",
            paymentStatus: "pending",
            paymentMethod: "bank_transfer",
            submittedAt: new Date().toISOString(),
            workerId: workerId,
            workerName: worker?.name || "",
            userId: user?.id || "",
            userName: user?.name || ""
        };

        try {
            await api.post("/payment/sip-upload", paymentData);

            setSuccess("Payment SIP uploaded successfully!");
            toast.success("Payment SIP uploaded successfully!");

            // Reset form
            setAmount("");
            setBankName("");
            setAccountNumber("");
            setPaymentDate("");
            setPaymentSIP(null);
            setRemarks("");

            // Reset file input
            document.getElementById("sip-upload").value = "";

            setIsLoading(false);

            // Navigate after success (optional)
            // navigate("/payment/history");

        } catch (error) {
            setIsLoading(false);
            if (error.response?.status === 400) {
                setError(error.response.data?.message || "Invalid payment details");
                toast.error("Something went wrong!");
            } else if (error.response?.status === 409) {
                setError("Transaction ID already exists");
                toast.error("Transaction ID already exists!");
            } else {
                setError("There was an error uploading payment SIP");
                toast.error("There was an error uploading payment SIP!");
            }
        }
    }

    function clearForm() {
        setAmount("");
        setTransactionId("");
        setBankName("");
        setAccountNumber("");
        setIfscCode("");
        setPaymentDate("");
        setPaymentSIP(null);
        setRemarks("");
        setError("");
        setSuccess("");
        document.getElementById("sip-upload").value = "";
    }

    return (
        <div className="w-full min-h-screen p-6 flex items-center justify-center bg-gray-50">
            <div className="w-[700px] p-8 shadow-xl rounded-2xl mx-auto border border-gray-200 bg-white">

                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-3">
                        <div className="p-3 bg-amber-100 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Upload Payment SIP
                    </h1>
                    <p className="text-gray-500 text-sm mt-2">
                        Submit your bank payment details and upload the transaction screenshot
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-5">

                    {/* NEW: Worker Name and User Name Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* WORKER NAME */}
                        <div>
                            <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                                Worker Name
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-2.5 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    className="w-full p-2.5 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 cursor-not-allowed focus:outline-none"
                                    placeholder="Loading worker..."
                                    value={worker?.fullName || "No worker selected"}
                                    readOnly
                                    disabled
                                />
                            </div>
                            {workerId && !worker && (
                                <p className="text-xs text-amber-600 mt-1">Loading worker details...</p>
                            )}
                        </div>

                        {/* USER NAME */}
                        <div>
                            <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                                User Name
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-2.5 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    className="w-full p-2.5 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 cursor-not-allowed focus:outline-none"
                                    placeholder="Loading user..."
                                    value={user?.name || "Not logged in"}
                                    readOnly
                                    disabled
                                />
                            </div>
                            {user?.email && (
                                <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                            )}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-2"></div>

                    {/* Amount and Transaction ID Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* AMOUNT */}
                        <div>
                            <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                                Amount Paid <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                                <input
                                    type="number"
                                    className="w-full p-2.5 pl-8 border border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={function (e) {
                                        setAmount(e.target.value);
                                        setError("");
                                        setSuccess("");
                                    }}
                                />
                            </div>
                        </div>

                        {/* PAYMENT DATE */}
                        <div>
                            <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                                Payment Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                className="w-full p-2.5 border border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all"
                                value={paymentDate}
                                onChange={function (e) {
                                    setPaymentDate(e.target.value);
                                    setError("");
                                    setSuccess("");
                                }}
                            />
                        </div>
                    </div>

                    {/* Bank Name and Account Number Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* BANK NAME */}
                        <div>
                            <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                                Bank Name <span className="text-red-500">*</span>
                            </label>
                            <select
                                className="w-full p-2.5 border border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all"
                                value={bankName}
                                onChange={function (e) {
                                    setBankName(e.target.value);
                                    setError("");
                                    setSuccess("");
                                }}
                            >
                                <option value="">Select Bank</option>
                                <option value="SBI">State Bank of India</option>
                                <option value="HDFC">HDFC Bank</option>
                                <option value="ICICI">ICICI Bank</option>
                                <option value="Axis">Axis Bank</option>
                                <option value="Kotak">Kotak Mahindra Bank</option>
                                <option value="Yes">Yes Bank</option>
                                <option value="PNB">Punjab National Bank</option>
                                <option value="BOB">Bank of Baroda</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* ACCOUNT NUMBER */}
                        <div>
                            <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                                Account Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full p-2.5 border border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all"
                                placeholder="Enter account number"
                                value={accountNumber}
                                maxLength="18"
                                onChange={function (e) {
                                    setAccountNumber(e.target.value);
                                    setError("");
                                    setSuccess("");
                                }}
                            />
                        </div>
                    </div>



                    {/* SIP UPLOAD SECTION */}
                    <div className="mb-2">
                        <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                            Upload Bank SIP/Transaction Screenshot <span className="text-red-500">*</span>
                        </label>

                        {/* File Upload Area */}
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-amber-500 transition-colors bg-gray-50">
                            <input
                                id="sip-upload"
                                type="file"
                                accept="image/*,.pdf"
                                className="hidden"
                                onChange={handleFileChange}
                            />

                            {!paymentSIP ? (
                                <label htmlFor="sip-upload" className="cursor-pointer block text-center">
                                    <div className="flex justify-center mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-600 font-medium">Click to upload or drag and drop</p>
                                    <p className="text-gray-400 text-sm mt-1">PNG, JPG, PDF (Max 5MB)</p>
                                </label>
                            ) : (
                                <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="p-2 bg-amber-100 rounded-lg mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-700 truncate max-w-[200px]">
                                                {paymentSIP.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {(paymentSIP.size / 1024).toFixed(2)} KB
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {paymentSIP.type.includes('image') && (
                                            <img
                                                src={URL.createObjectURL(paymentSIP)}
                                                alt="preview"
                                                className="w-10 h-10 rounded object-cover border"
                                            />
                                        )}
                                        <button
                                            type="button"
                                            onClick={function () {
                                                setPaymentSIP(null);
                                                document.getElementById("sip-upload").value = "";
                                            }}
                                            className="p-1 hover:bg-red-50 rounded-full"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Preview for image files */}
                        {paymentSIP && paymentSIP.type.includes('image') && (
                            <div className="mt-3">
                                <p className="text-xs text-gray-500 mb-1">Preview:</p>
                                <img
                                    src={URL.createObjectURL(paymentSIP)}
                                    alt="SIP preview"
                                    className="w-32 h-32 rounded-lg object-cover border-2 border-gray-200"
                                />
                            </div>
                        )}
                    </div>

                    {/* REMARKS */}
                    <div>
                        <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                            Remarks (Optional)
                        </label>
                        <textarea
                            rows="3"
                            className="w-full p-2.5 border border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all resize-none"
                            placeholder="Enter any additional remarks or notes..."
                            value={remarks}
                            onChange={function (e) {
                                setRemarks(e.target.value);
                            }}
                        ></textarea>
                    </div>

                    {/* Error and Success Messages */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
                            {success}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 px-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-amber-500 to-yellow-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Uploading...</span>
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                    <span>Upload Payment SIP</span>
                                </>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={clearForm}
                            className="px-6 py-3 rounded-xl font-semibold border border-gray-300 hover:bg-gray-50 transition-all duration-300 text-gray-700"
                        >
                            Clear
                        </button>
                    </div>
                </form>

                {/* Footer Links */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-between items-center text-sm">
                        <p className="text-gray-500">
                            Need help with payment?
                        </p>
                        <div className="flex gap-4">
                            <span
                                className="cursor-pointer text-amber-600 hover:text-amber-700 font-medium"
                                onClick={function () { navigate("/payment/instructions"); }}
                            >
                                Payment Instructions
                            </span>
                            <span
                                className="cursor-pointer text-amber-600 hover:text-amber-700 font-medium"
                                onClick={function () { navigate("/payment/history"); }}
                            >
                                View History
                            </span>
                        </div>
                    </div>
                </div>

                {/* Secure Payment Badge */}
                <div className="mt-4 flex justify-center items-center gap-2 text-xs text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Your payment information is secure and encrypted</span>
                </div>
            </div>
        </div>
    );
}

export default PaymentSIPUpload;