import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import {
  FaBuilding,
  FaUser,
  FaPlus,
  FaSave,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaCreditCard,
  FaMapMarkerAlt,
  FaPhone,
  FaIdCard,
  FaListUl,
  FaSearch,
  FaLandmark,
} from "react-icons/fa";

// Remove the inline style tag and create a CSS-in-JS solution
const styles = `
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
`;

// Inject styles on component mount
const injectStyles = () => {
  if (typeof document !== 'undefined') {
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
    return () => {
      document.head.removeChild(styleEl);
    };
  }
};

export default function WorkerBankDetailsPage() {
  const { jwtToken, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [bankDetailsList, setBankDetailsList] = useState([]);
  const [filteredBankDetails, setFilteredBankDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(null);
  const [currentWorker, setCurrentWorker] = useState(null);
  
  // Use refs to track if data is being fetched
  const isFetchingUser = useRef(false);
  const isFetchingWorker = useRef(false);
  const isFetchingBankDetails = useRef(false);
  
  // Memoize config to prevent unnecessary re-renders
  const config = useCallback(() => ({
    headers: {
      Authorization: `Bearer ${jwtToken}`
    },
  }), [jwtToken]);

  // Form state - Adjusted to match backend DTO
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    nic: "",
    bankName: "",
    accountNumber: "",
    holder: "",
    accountType: "savings",
    branch: "",
    branchCode: "",
    address: "",
    userId: null,
    workerId: ""
  });

  // Bank options
  const bankOptions = [
    "Commercial Bank",
    "Bank of Ceylon",
    "Hatton National Bank",
    "Sampath Bank",
    "DFCC Bank",
    "People's Bank",
    "National Savings Bank",
    "Seylan Bank",
    "Pan Asia Bank",
    "Union Bank",
    "Other"
  ];

  // Account type options
  const accountTypeOptions = [
    { value: "savings", label: "Savings Account" },
    { value: "current", label: "Current Account" },
    { value: "salary", label: "Salary Account" },
    { value: "fixed", label: "Fixed Deposit" },
  ];

  // Get user ID - Only fetch once
  useEffect(() => {
    if (!jwtToken || isFetchingUser.current) return;
    
    isFetchingUser.current = true;
    
    axios
      .get("http://localhost:8081/user", {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
      .then((res) => {
        setUserId(res.data.id);
        // Set userId in form data
        setFormData(prev => ({
          ...prev,
          userId: res.data.id
        }));
      })
      .catch((error) => {
        console.error("Error loading user:", error);
        toast.error("Failed to load user information");
      })
      .finally(() => {
        isFetchingUser.current = false;
      });
  }, [jwtToken]);

  // Fetch current worker details - Only when userId is available
  const getWorker = useCallback(async () => {
    if (!userId || !jwtToken || isFetchingWorker.current) return;
    
    isFetchingWorker.current = true;
    
    try {
      const response = await axios.get(
        `http://localhost:8081/worker/${userId}`,
        config()
      );
      const workerData = response.data;
      setCurrentWorker(workerData);
      
      // Set workerId in form data
      setFormData(prev => ({
        ...prev,
        workerId: workerData.id || ""
      }));
    } catch (error) {
      console.error("Error loading worker:", error);
      // Don't show error toast for worker - it might not exist yet
      if (error.response?.status !== 404) {
        toast.error("Failed to load worker information");
      }
    } finally {
      isFetchingWorker.current = false;
    }
  }, [userId, jwtToken, config]);

  // Load current worker when authenticated and userId is available
  useEffect(() => {
    if (isAuthenticated && userId) {
      getWorker();
    }
  }, [isAuthenticated, userId, getWorker]);

  // Fetch all bank details - Main function
  const fetchBankDetails = useCallback(async () => {
    if (!jwtToken || !userId || isFetchingBankDetails.current) return;
    
    isFetchingBankDetails.current = true;
    setListLoading(true);
    
    try {
      console.log("Fetching bank details for user ID:", userId);
      
      const response = await axios.get(
        `http://localhost:8081/bank/${userId}`,
        config()
      );
      const bankDetails = Array.isArray(response.data) ? response.data : [];
      console.log("Bank details response:", bankDetails);
      
      // Transform data for display
      const transformedData = bankDetails.map(item => ({
        id: item.id,
        name: item.fullName || "",
        email: item.email || "",
        bank: item.bankName || "",
        account: item.accountNumber || "",
        accountHolderName: item.holder || "",
        accountType: item.accountType || "savings",
        branch: item.branch || "",
        branchCode: item.branchCode || "",
        address: item.address || "",
        phone: item.contact || "",
        nic: item.nic || "",
        status: "active", // Default status
        userId: item.user?.id || userId,
        workerId: item.worker?.id || (currentWorker?.id || ""),
        rawData: item // Keep original data
      }));
      
      setBankDetailsList(transformedData);
      setFilteredBankDetails(transformedData);
      
      if (transformedData.length === 0) {
        toast.success("No bank details found for this user", { duration: 3000 });
      }
    } catch (error) {
      console.error("Error fetching bank details:", error);
      const errorMsg = error.response?.data?.message || error.response?.data || error.message;
     // toast.error(`Failed to load bank details: ${errorMsg}`);
      setBankDetailsList([]);
      setFilteredBankDetails([]);
    } finally {
      isFetchingBankDetails.current = false;
      setListLoading(false);
    }
  }, [jwtToken, userId, config, currentWorker]);

  // Load bank details when component mounts and jwtToken and userId are available
  useEffect(() => {
    if (jwtToken && userId) {
      fetchBankDetails();
    }
  }, [jwtToken, userId, fetchBankDetails]);

  // Filter bank details based on search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredBankDetails(bankDetailsList);
    } else {
      const filtered = bankDetailsList.filter(item =>
        (item.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (item.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (item.bank?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (item.account?.toString() || "").includes(searchTerm)
      );
      setFilteredBankDetails(filtered);
    }
  }, [searchTerm, bankDetailsList]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.bankName || !formData.accountNumber || !formData.holder) {
      toast.error("Please fill in all required fields (marked with *)");
      return;
    }

    // Validate userId and workerId are set
    if (!formData.userId) {
      toast.error("User information is missing. Please try refreshing the page.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        contact: formData.contact,
        nic: formData.nic,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        holder: formData.holder,
        accountType: formData.accountType,
        branch: formData.branch,
        branchCode: formData.branchCode,
        address: formData.address,
        userId: formData.userId,
        workerId: formData.workerId || null
      };

      console.log("Submitting payload:", payload);

      if (isEditing && editingRecord) {
        // Update existing bank details
        await axios.put(
          `http://localhost:8081/bank/${editingRecord.id}`,
          payload,
          config()
        );
        toast.success("Bank details updated successfully!");
      } else {
        // Add new bank details
        await axios.post(
          "http://localhost:8081/bank",
          payload,
          config()
        );
        toast.success("Bank details added successfully!");
      }

      // Reset form and refresh list
      resetForm();
      await fetchBankDetails(); // Wait for refresh
    } catch (error) {
      console.error("Submit error:", error);
      const errorMessage = error.response?.data?.message || error.response?.data || error.message || "Operation failed";
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Edit bank details
  const handleEdit = (record) => {
    setFormData({
      fullName: record.name || "",
      email: record.email || "",
      contact: record.phone || "",
      nic: record.nic || "",
      bankName: record.bank || "",
      accountNumber: record.account || "",
      holder: record.accountHolderName || record.name || "",
      accountType: record.accountType || "savings",
      branch: record.branch || "",
      branchCode: record.branchCode || "",
      address: record.address || "",
      userId: record.userId || userId,
      workerId: record.workerId || (currentWorker?.id || "")
    });
    setEditingRecord(record);
    setIsEditing(true);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete bank details
  const handleDelete = async (recordId) => {
    if (!window.confirm("Are you sure you want to delete these bank details?")) {
      return;
    }

    setLoading(true);
    try {
      await axios.delete(
        `http://localhost:8081/bank/${recordId}`,
        config()
      );
      toast.success("Bank details deleted successfully!");
      await fetchBankDetails();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete bank details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      contact: "",
      nic: "",
      bankName: "",
      accountNumber: "",
      holder: "",
      accountType: "savings",
      branch: "",
      branchCode: "",
      address: "",
      userId: userId,
      workerId: currentWorker?.id || ""
    });
    setEditingRecord(null);
    setIsEditing(false);
    setShowForm(false);
  };

  // Format account number for display
  const formatAccountNumber = (account) => {
    if (!account) return "****";
    const accountStr = account.toString();
    if (accountStr.length <= 4) return `****${accountStr}`;
    return `****${accountStr.slice(-4)}`;
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Function to manually refresh bank details
  const handleRefresh = () => {
    fetchBankDetails();
  };

  // Debug function to check current state
  const debugState = () => {
    console.log("Current State:", {
      userId,
      jwtToken: jwtToken ? "Present" : "Missing",
      bankDetailsListCount: bankDetailsList.length,
      formDataUserId: formData.userId,
      formDataWorkerId: formData.workerId,
      currentWorker
    });
  };

  // Inject CSS styles on component mount
  useEffect(() => {
    const cleanup = injectStyles();
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-3">
            <FaLandmark className="inline-block mr-3 mb-1" />
            Worker Bank Details
          </h1>
          <div className="text-amber-700 text-lg">
            <p>Manage bank account information for your workers</p>
            <div className="mt-2 text-sm text-gray-600 space-y-1 bg-amber-50 p-3 rounded-lg">
              {/* <p><strong>User ID:</strong> {userId ? userId : "Loading..."}</p> */}
              <p><strong>Worker ID:</strong> {currentWorker ? currentWorker.id : "Loading..."}</p>
              <p><strong>Bank Records:</strong> {bankDetailsList.length} found</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Bank Details List */}
          <div className="lg:col-span-2">
            {/* Search and Add Button */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500" />
                <input
                  type="text"
                  placeholder="Search by name, email, or bank..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleRefresh}
                  className="px-4 py-3 bg-amber-100 text-amber-800 font-medium rounded-xl hover:bg-amber-200 transition-all flex items-center gap-2 justify-center whitespace-nowrap"
                  disabled={listLoading}
                >
                  <FaCheckCircle className="w-5 h-5" />
                  Refresh
                </button>
                <button
                  onClick={() => {
                    resetForm();
                    setShowForm(true);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center whitespace-nowrap"
                >
                  <FaPlus className="w-5 h-5" />
                  Add Bank Details
                </button>
              </div>
            </div>

            {/* Bank Details List */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-amber-100">
              <div className="p-6 border-b border-amber-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-amber-900 flex items-center gap-2">
                  <FaListUl className="text-amber-500" />
                  Bank Accounts
                  <span className="text-sm font-normal text-amber-600 bg-amber-100 px-3 py-1 rounded-full ml-2">
                    {filteredBankDetails.length} records
                  </span>
                </h2>
                {listLoading && (
                  <div className="flex items-center text-amber-600">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-amber-500 mr-2"></div>
                    Loading...
                  </div>
                )}
              </div>

              {listLoading ? (
                <div className="p-12 text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mb-4"></div>
                  <p className="text-amber-600">Loading bank details...</p>
                </div>
              ) : filteredBankDetails.length === 0 ? (
                <div className="p-12 text-center">
                  <FaLandmark className="text-5xl text-amber-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-amber-800 mb-2">No bank details found</h3>
                  <p className="text-amber-600 mb-4">Add your first bank details to get started</p>
                  <button
                    onClick={handleRefresh}
                    className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-all"
                  >
                    Refresh List
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-amber-50">
                  {filteredBankDetails.map((record) => (
                    <div
                      key={record.id || Math.random()}
                      className="p-6 hover:bg-amber-50 transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Bank Details Info */}
                        <div className="flex-1">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <FaUser className="w-6 h-6 text-amber-600" />
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-lg font-bold text-amber-900">{record.name}</h3>
                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(record.status)}`}>
                                  {record.status?.charAt(0).toUpperCase() + record.status?.slice(1) || "Active"}
                                </span>
                              </div>
                              <p className="text-amber-700 text-sm mb-2">{record.email}</p>
                              {record.phone && (
                                <p className="text-amber-600 text-sm mb-2 flex items-center gap-1">
                                  <FaPhone className="w-3 h-3" /> {record.phone}
                                </p>
                              )}

                              {/* Bank Details */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                                <div className="flex items-center gap-2 text-sm text-amber-800">
                                  <FaBuilding className="w-4 h-4 text-amber-500" />
                                  <span className="font-medium">{record.bank || "Not specified"}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-amber-800">
                                  <FaCreditCard className="w-4 h-4 text-amber-500" />
                                  <span className="font-mono">{formatAccountNumber(record.account)}</span>
                                </div>
                                {record.branch && (
                                  <div className="flex items-center gap-2 text-sm text-amber-800">
                                    <FaMapMarkerAlt className="w-4 h-4 text-amber-500" />
                                    <span>{record.branch}</span>
                                  </div>
                                )}
                                {record.accountType && (
                                  <div className="flex items-center gap-2 text-sm text-amber-800">
                                    <FaLandmark className="w-4 h-4 text-amber-500" />
                                    <span>{record.accountType}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleEdit(record)}
                            className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-all flex items-center gap-2"
                            title="Edit"
                          >
                            <FaEdit className="w-4 h-4" />
                            <span className="hidden sm:inline">Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(record.id)}
                            className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-all flex items-center gap-2"
                            title="Delete"
                          >
                            <FaTrash className="w-4 h-4" />
                            <span className="hidden sm:inline">Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <div className={`bg-white rounded-3xl shadow-xl overflow-hidden border border-amber-100 sticky top-8 ${showForm ? 'block' : 'hidden lg:block'}`}>
              <div className="p-6 border-b border-amber-100">
                <h2 className="text-xl font-bold text-amber-900 flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <FaEdit className="text-amber-500" />
                      Edit Bank Details
                    </>
                  ) : (
                    <>
                      <FaPlus className="text-amber-500" />
                      Add Bank Details
                    </>
                  )}
                </h2>
                <p className="text-amber-600 text-sm mt-1">
                  {isEditing ? "Update bank information" : "Add new bank information"}
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  {/* <p>User ID: {formData.userId || "Not set"}</p> */}
                  <p>Worker ID: {formData.workerId || "Not set"}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-amber-800 uppercase tracking-wider flex items-center gap-2">
                      <FaUser className="w-4 h-4" />
                      Worker Information
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-amber-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
                        placeholder="Enter worker's full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-amber-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
                        placeholder="worker@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-amber-700 mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400" />
                        <input
                          type="tel"
                          name="contact"
                          value={formData.contact}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
                          placeholder="+94 77 123 4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-amber-700 mb-1">
                        NIC Number
                      </label>
                      <div className="relative">
                        <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400" />
                        <input
                          type="text"
                          name="nic"
                          value={formData.nic}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
                          placeholder="123456789V"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bank Information */}
                  <div className="space-y-4 pt-4 border-t border-amber-100">
                    <h3 className="text-sm font-semibold text-amber-800 uppercase tracking-wider flex items-center gap-2">
                      <FaLandmark className="w-4 h-4" />
                      Bank Information
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-amber-700 mb-1">
                        Bank Name *
                      </label>
                      <select
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
                      >
                        <option value="">Select Bank</option>
                        {bankOptions.map((bank) => (
                          <option key={bank} value={bank}>
                            {bank}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-amber-700 mb-1">
                        Account Number *
                      </label>
                      <div className="relative">
                        <FaCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400" />
                        <input
                          type="text"
                          name="accountNumber"
                          value={formData.accountNumber}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
                          placeholder="1234567890"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-amber-700 mb-1">
                        Account Holder Name *
                      </label>
                      <input
                        type="text"
                        name="holder"
                        value={formData.holder}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
                        placeholder="As it appears on bank account"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-amber-700 mb-1">
                        Account Type
                      </label>
                      <select
                        name="accountType"
                        value={formData.accountType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
                      >
                        {accountTypeOptions.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-amber-700 mb-1">
                          Branch
                        </label>
                        <input
                          type="text"
                          name="branch"
                          value={formData.branch}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
                          placeholder="Main Branch"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-amber-700 mb-1">
                          Branch Code
                        </label>
                        <input
                          type="text"
                          name="branchCode"
                          value={formData.branchCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
                          placeholder="123"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-amber-700 mb-1">
                        Address
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none resize-none transition-all"
                        placeholder="Bank branch address"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 mt-6 pt-6 border-t border-amber-100">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 px-4 py-3 bg-amber-100 text-amber-800 font-medium rounded-lg hover:bg-amber-200 transition-all flex items-center justify-center gap-2"
                  >
                    <FaTimesCircle />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {isEditing ? "Updating..." : "Adding..."}
                      </>
                    ) : (
                      <>
                        <FaSave />
                        {isEditing ? "Update Details" : "Save Details"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Show Form Button for Mobile */}
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="lg:hidden mt-4 w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaPlus className="w-5 h-5" />
                Show Add Form
              </button>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl p-6 border border-amber-200">
          <h3 className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
            <FaCheckCircle className="text-amber-500" />
            Important Information
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-amber-800">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Always verify account details with the worker before adding</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Keep bank information secure and confidential</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Update details immediately if a worker changes banks</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Verify IFSC/SWIFT codes for international transfers</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Debug Button */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={debugState}
          className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-lg text-xs z-50"
          title="Debug State"
        >
          Debug
        </button>
      )}
    </div>
  );
}