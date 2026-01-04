import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import {
  FaBuilding, // Changed from FaBank to FaBuilding
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
  FaLandmark, // Alternative bank icon
} from "react-icons/fa";

export default function WorkerBankDetailsPage() {
  const { jwtToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingWorker, setEditingWorker] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    workerId: "",
    name: "",
    email: "",
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
    branch: "",
    branchCode: "",
    accountType: "savings", // savings, current, salary
    ifscCode: "",
    swiftCode: "",
    address: "",
    phone: "",
    nic: "",
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

  // Load workers on component mount
  useEffect(() => {
    fetchWorkers();
  }, []);

  // Filter workers based on search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredWorkers(workers);
    } else {
      const filtered = workers.filter(worker =>
        worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.bank?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.account?.includes(searchTerm)
      );
      setFilteredWorkers(filtered);
    }
  }, [searchTerm, workers]);

  // Fetch workers from API
  const fetchWorkers = async () => {
    try {
      setLoading(true);
      // This would be your actual API call
      // const response = await axios.get("http://localhost:8081/api/workers/bank-details", {
      //   headers: { Authorization: `Bearer ${jwtToken}` }
      // });
      
      // Mock data for demo
      const mockWorkers = [
        { id: "WRK001", name: "John Doe", email: "john@example.com", bank: "Commercial Bank", account: "1234567890", branch: "Colombo Main", status: "active" },
        { id: "WRK002", name: "Jane Smith", email: "jane@example.com", bank: "Bank of Ceylon", account: "0987654321", branch: "Kandy", status: "active" },
        { id: "WRK003", name: "Robert Johnson", email: "robert@example.com", bank: "Hatton National Bank", account: "5678901234", branch: "Galle", status: "pending" },
        { id: "WRK004", name: "Sarah Wilson", email: "sarah@example.com", bank: "Sampath Bank", account: "4321098765", branch: "Negombo", status: "active" },
      ];
      
      setWorkers(mockWorkers);
      setFilteredWorkers(mockWorkers);
    } catch (error) {
      toast.error("Failed to load workers");
    } finally {
      setLoading(false);
    }
  };

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
    
    if (!formData.name || !formData.email || !formData.bankName || !formData.accountNumber) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      if (isEditing) {
        // Update existing worker
        await axios.put(
          `http://localhost:8081/api/workers/bank-details/${editingWorker.id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${jwtToken}` }
          }
        );
        toast.success("Bank details updated successfully!");
      } else {
        // Add new worker
        await axios.post(
          "http://localhost:8081/api/workers/bank-details",
          formData,
          {
            headers: { Authorization: `Bearer ${jwtToken}` }
          }
        );
        toast.success("Bank details added successfully!");
      }

      // Reset form and refresh list
      resetForm();
      fetchWorkers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  // Edit worker
  const handleEdit = (worker) => {
    setFormData({
      workerId: worker.id,
      name: worker.name,
      email: worker.email,
      bankName: worker.bank || "",
      accountNumber: worker.account || "",
      accountHolderName: worker.accountHolderName || worker.name,
      branch: worker.branch || "",
      branchCode: worker.branchCode || "",
      accountType: worker.accountType || "savings",
      ifscCode: worker.ifscCode || "",
      swiftCode: worker.swiftCode || "",
      address: worker.address || "",
      phone: worker.phone || "",
      nic: worker.nic || "",
    });
    setEditingWorker(worker);
    setIsEditing(true);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete worker
  const handleDelete = async (workerId) => {
    if (!window.confirm("Are you sure you want to delete these bank details?")) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:8081/api/workers/bank-details/${workerId}`,
        {
          headers: { Authorization: `Bearer ${jwtToken}` }
        }
      );
      toast.success("Bank details deleted successfully!");
      fetchWorkers();
    } catch (error) {
      toast.error("Failed to delete bank details");
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      workerId: "",
      name: "",
      email: "",
      bankName: "",
      accountNumber: "",
      accountHolderName: "",
      branch: "",
      branchCode: "",
      accountType: "savings",
      ifscCode: "",
      swiftCode: "",
      address: "",
      phone: "",
      nic: "",
    });
    setEditingWorker(null);
    setIsEditing(false);
    setShowForm(false);
  };

  // Format account number for display
  const formatAccountNumber = (account) => {
    if (!account) return "";
    return `****${account.slice(-4)}`;
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

  return (
    <div className="min-h-screen  p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-3">
            <FaLandmark className="inline-block mr-3 mb-1" /> {/* Changed from FaBank */}
            Worker Bank Details
          </h1>
          <p className="text-amber-700 text-lg">
            Manage bank account information for your workers
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Worker List */}
          <div className="lg:col-span-2">
            {/* Search and Add Button */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500" />
                <input
                  type="text"
                  placeholder="Search workers by name, email, or bank..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
                />
              </div>
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

            {/* Workers List */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-amber-100">
              <div className="p-6 border-b border-amber-100">
                <h2 className="text-xl font-bold text-amber-900 flex items-center gap-2">
                  <FaListUl className="text-amber-500" />
                  Worker Bank Accounts
                  <span className="text-sm font-normal text-amber-600 bg-amber-100 px-3 py-1 rounded-full ml-2">
                    {filteredWorkers.length} workers
                  </span>
                </h2>
              </div>

              {loading ? (
                <div className="p-12 text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mb-4"></div>
                  <p className="text-amber-600">Loading workers...</p>
                </div>
              ) : filteredWorkers.length === 0 ? (
                <div className="p-12 text-center">
                  <FaLandmark className="text-5xl text-amber-300 mx-auto mb-4" /> {/* Changed from FaBank */}
                  <h3 className="text-lg font-semibold text-amber-800 mb-2">No workers found</h3>
                  <p className="text-amber-600">Add your first worker bank details to get started</p>
                </div>
              ) : (
                <div className="divide-y divide-amber-50">
                  {filteredWorkers.map((worker) => (
                    <div
                      key={worker.id}
                      className="p-6 hover:bg-amber-50 transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Worker Info */}
                        <div className="flex-1">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <FaUser className="w-6 h-6 text-amber-600" />
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-lg font-bold text-amber-900">{worker.name}</h3>
                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(worker.status)}`}>
                                  {worker.status?.charAt(0).toUpperCase() + worker.status?.slice(1)}
                                </span>
                              </div>
                              <p className="text-amber-700 text-sm mb-2">{worker.email}</p>
                              
                              {/* Bank Details */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                                <div className="flex items-center gap-2 text-sm text-amber-800">
                                  <FaBuilding className="w-4 h-4 text-amber-500" /> {/* Changed from FaBank */}
                                  <span className="font-medium">{worker.bank}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-amber-800">
                                  <FaCreditCard className="w-4 h-4 text-amber-500" />
                                  <span className="font-mono">{formatAccountNumber(worker.account)}</span>
                                </div>
                                {worker.branch && (
                                  <div className="flex items-center gap-2 text-sm text-amber-800">
                                    <FaMapMarkerAlt className="w-4 h-4 text-amber-500" />
                                    <span>{worker.branch}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleEdit(worker)}
                            className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-all flex items-center gap-2"
                            title="Edit"
                          >
                            <FaEdit className="w-4 h-4" />
                            <span className="hidden sm:inline">Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(worker.id)}
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
                  {isEditing ? "Update worker's bank information" : "Add new worker bank information"}
                </p>
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
                        name="name"
                        value={formData.name}
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
                        Phone Number
                      </label>
                      <div className="relative">
                        <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
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
                      <FaLandmark className="w-4 h-4" /> {/* Changed from FaBank */}
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

                    {formData.bankName === "Other" && (
                      <div className="animate-slideDown">
                        <label className="block text-sm font-medium text-amber-700 mb-1">
                          Custom Bank Name
                        </label>
                        <input
                          type="text"
                          name="customBankName"
                          value={formData.customBankName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
                          placeholder="Enter bank name"
                        />
                      </div>
                    )}

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
                        name="accountHolderName"
                        value={formData.accountHolderName}
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

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-amber-700 mb-1">
                          IFSC Code
                        </label>
                        <input
                          type="text"
                          name="ifscCode"
                          value={formData.ifscCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
                          placeholder="CBKYLKXXXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-amber-700 mb-1">
                          SWIFT Code
                        </label>
                        <input
                          type="text"
                          name="swiftCode"
                          value={formData.swiftCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
                          placeholder="CBCELKLXXXX"
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