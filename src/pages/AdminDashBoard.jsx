import { RiDeleteBin6Line, RiPassPendingLine } from "react-icons/ri";
import Navbar from "../components/NavBar";
import PlatformAnalyticsChart from "../components/PlatformAnalyticsChart";
import Man from "../assets/man.jpg"
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import CountUp from "react-countup";
import { SlUserFollow } from "react-icons/sl";
import { LiaUserSecretSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import PaymentDetailsModal from "../components/PaymentDetailsModal";
import { FiMoreVertical } from "react-icons/fi";
import { FiTrendingUp, FiDownload, FiEye, FiCreditCard } from "react-icons/fi";



export default function AdminDashBoard() {
    const { isAuthenticated, jwtToken } = useAuth();
    const [payments, setPayments] = useState({});

    const navigate = useNavigate();

    const [openMenuId, setOpenMenuId] = useState(null);

    const toggleMenu = (id) => {
        setOpenMenuId(prev => (prev === id ? null : id));
    };

    const [contact, setContact] = useState([]);
    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }


    async function loadContact() {
        const response = await axios.get("http://localhost:8081/contact", config);
        setContact(response.data);

    }

    const [workers, setWorkers] = useState([]);
    const [user, setUsers] = useState([]);
    const [hires, setHires] = useState([]);

    async function loadWorkerDetails() {
        try {
            const workers = await axios.get("http://localhost:8081/worker", config);
            setWorkers(workers.data);
            toast.success("workers are loaded successfully");
        } catch (error) {
            toast.error("have error here not loaded workers");
        }
    }

    async function loadUserDetails() {
        try {
            const user = await axios.get("http://localhost:8081/user/count", config);
            setUsers(user.data);

        } catch (error) {
            toast.error("have error here not loaded users");
        }
    }

    async function loadHireDetails() {
        try {
            const hires = await axios.get("http://localhost:8081/hire", config);
            setHires(hires.data);

        } catch (error) {
            toast.error("have error here not loaded hires");
        }
    }


    async function deleteContact(contactId) {
        try {
            await axios.delete(`http://localhost:8081/contact/${contactId}`, config);
            loadContact();
            toast.success("contact message status deleted successfully");
        } catch (error) {
            toast.error("Failed to delete contact message status");
        }
    }

    async function loadPayments() {
        try {
            const res = await axios.get(
                "http://localhost:8081/payment",
                config
            );

            const paymentMap = {};
            res.data.forEach(p => {
                if (p.user && p.user.id) {
                    paymentMap[p.user.id] = p;
                }
            });

            setPayments(paymentMap);

        } catch (error) {
            console.error("Failed to load payments", error);
        }
    }


    useEffect(function () {
        if (isAuthenticated) {
            loadContact();
            loadWorkerDetails();
            loadUserDetails();
            loadHireDetails();
            loadPayments();
        }
    }, [isAuthenticated])

    // async function handleToggleBlock(workerId) {
    //     try {
    //         await axios.put(`http://localhost:8081/worker/toggle-block/${workerId}`, {}, config);


    //         setWorkers(prev =>
    //             prev.map(worker =>
    //                 worker.id === workerId ? { ...worker, isBlocked: !worker.isBlocked } : worker
    //             )
    //         );
    //         toast.success("Worker status updated successfully");

    //     } catch (error) {

    //         toast.error("Failed to update worker status");
    //     }
    // }

    async function handleToggleBlock(worker) {
        try {
            // Toggle block / approve
            await axios.put(
                `http://localhost:8081/worker/toggle-block/${worker.id}`,
                {},
                config
            );

            const isNowApproved = worker.isBlocked;
            // because before click it was blocked, after toggle → approved

            // Update UI state
            setWorkers(prev =>
                prev.map(w =>
                    w.id === worker.id
                        ? { ...w, isBlocked: !w.isBlocked }
                        : w
                )
            );

            // -----------------------
            // SEND EMAIL
            // -----------------------
            if (isNowApproved) {
                // APPROVE EMAIL
                await axios.post(
                    "http://localhost:8081/api/email/send",
                    {
                        to: worker.email,
                        subject: "Request Approved",
                        body: `Your request has been approved.\nYour Worker ID is ${worker.id}`
                    },
                    config
                );

                toast.success("Worker approved & email sent");
            } else {
                // BLOCK EMAIL
                await axios.post(
                    "http://localhost:8081/api/email/send",
                    {
                        to: worker.email,
                        subject: "Request Not Approved",
                        body: "Unfortunately, your worker request has been blocked. Please contact support for more details."
                    },
                    config
                );

                toast.success("Worker blocked & email sent");
            }

        } catch (error) {
            console.error(error);
            toast.error("Failed to update worker status or send email");
        }
    }


    function handleDownloadPDF(pdfUrl, fullName) {
        if (!pdfUrl) {
            toast.error("No PDF uploaded for this worker.");
            return;
        }

        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = `${fullName}_document.pdf`;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function formatDate(dateString) {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString();
    }

    //searching part
    const [jobRoles, setJobRoles] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [allJobRoles, setAllJobRoles] = useState([]);

    //fetch job roles 
    useEffect(() => {
        if (isAuthenticated) {
            axios
                .get("http://localhost:8081/worker/job-roles", config)
                .then(res => {
                    setAllJobRoles(res.data);
                    setJobRoles(res.data); // initially show all
                });
        }
    }, [isAuthenticated]);


    const selectRole = (jobRole) => {
        setSelectedRole(jobRole);
        axios.get("http://localhost:8081/worker/searchbylocandskill", {
            params: { jobRole },
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        }).then(res => setEmployees(res.data));
    };

    const capitalizeFirst = (text) => {
        if (!text) return "";
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };

    const handleSearch = (text) => {
        setSearchText(text);

        if (!text.trim()) {
            setJobRoles(allJobRoles);
            return;
        }

        const filtered = allJobRoles.filter(role =>
            role.jobRole.toLowerCase().includes(text.toLowerCase())
        );

        setJobRoles(filtered);
    };

    useEffect(() => {
        if (jobRoles.length > 0 && !selectedRole) {
            selectRole(jobRoles[0].jobRole);
        }
    }, [jobRoles]);



    return (
        <div>
            <Navbar />
            <div className="w-full flex flex-col pt-24 my-auto  ">
                <div className="px-6 my-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-3 ">Admin DashBoard</h1>
                </div>
                <div className=" w-full mx-auto flex flex-col lg:flex-row text-slate-400  items-center justify-center gap-6 p-6 lg:pt-0">

                    <div className="bg-white  w-full lg:w-[25%] flex-1 flex flex-col items-center shadow-xl gap-6 border border-slate-200 py-8 px-8  justify-between">
                        <div className="flex items-center justify-center ">
                            <SlUserFollow color="#f59e0b" size={80} />
                        </div>
                        <div className="text-xl font-bold text-slate-500">
                            <h1>Total Number of Users</h1>
                        </div>
                        <div className="text-5xl font-bold">
                            <CountUp key={`users-${user.length}`} start={0} end={user.length} duration={2} enableScrollSpy scrollSpyOnce />
                        </div>
                    </div>
                    <div className="bg-white w-full lg:w-[25%] flex-1 flex flex-col items-center gap-6  shadow-xl border border-slate-200 border py-8 px-8  justify-between">
                        <div className="flex items-center justify-center ">
                            <LiaUserSecretSolid color="#f59e0b" size={80} />
                        </div>
                        <div className="text-xl font-bold text-slate-500">
                            <h1>Total Number of Workers</h1>
                        </div>
                        <div className="text-5xl font-bold">
                            <CountUp key={`workers-${workers.length}`} start={0} end={workers.length} duration={2} enableScrollSpy scrollSpyOnce />
                        </div>
                    </div>
                    <div className="bg-white w-full lg:w-[25%] flex-1 flex flex-col items-center gap-6 shadow-xl border border-slate-200 border py-8 px-8  justify-between">
                        <div className="flex items-center justify-center ">
                            <RiPassPendingLine color="#f59e0b" size={80} />
                        </div>
                        <div className="text-xl font-bold text-slate-500">
                            <h1>Number of All Request</h1>
                        </div>
                        <div className="text-5xl font-bold">
                            <CountUp key={`hires-${hires.length}`} start={0} end={hires.length} duration={2} enableScrollSpy scrollSpyOnce />
                        </div>
                    </div>

                </div>


                <div className="w-full h-[50vh] mx-auto flex flex-col  text-slate-400 lg:flex-row items-center justify-center gap-6 p-6">
                    <div className="bg-white  w-full h-full lg:flex-2 flex flex-col items-center justify-center pb-4 shadow-lg border rounded-lg border-slate-200">
                        {/* search fixed */}
                        <div className="w-full p-4">
                            <input
                                type="text"
                                placeholder="Search by service name"
                                className="w-full border px-2 py-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                value={searchText}
                                onChange={(e) => handleSearch(e.target.value)} />
                        </div>

                        {/* Scrollable list */}
                        <div className="w-full  flex-1 overflow-y-auto flex-col items-center justify-center">
                            <div className="w-full flex flex-col justify-between items-center px-4 text-lg">

                                {
                                    jobRoles.map(
                                        role => {
                                            return (
                                                <div
                                                    key={role.jobRole}
                                                    className={`w-full flex justify-between items-center px-4 py-3 cursor-pointer rounded-lg text-gray-600
                                                    ${selectedRole === role.jobRole
                                                            ? "bg-primary text-white"
                                                            : "hover:bg-gray-100"
                                                        }`}
                                                    onClick={() => selectRole(role.jobRole)}
                                                >
                                                    <span>{capitalizeFirst(role.jobRole)}</span>
                                                    <span>{role.count}</span>
                                                </div>)
                                        }
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="bg-white w-full h-full lg:flex-3 flex flex-col py-4 shadow-lg border rounded-lg border-slate-200">
                        {/* Title (fixed) */}
                        <div className="px-6 py-4">
                            <h1 className="text-xl font-bold text-center lg:text-center">{capitalizeFirst(selectedRole)}s</h1>
                        </div>
                        {/* Scrollable employees */}
                        <div className="w-full flex-1 overflow-y-auto px-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {employees.map((emp) => (
                                    <div
                                        key={emp.id}
                                        className="flex items-center gap-4 p-3  rounded-lg shadow-sm hover:shadow-primary"
                                        onClick={() => navigate(`/workerCard/${emp.id}`)}
                                    >
                                        <img
                                            src={emp.user?.imageUrl || Man}
                                            alt="profile"
                                            className="w-[50px] h-[50px] rounded-full object-cover"
                                        />
                                        <h1 className="font-bold text-lg">{emp.fullName}</h1>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="w-full flex  my-auto ">
                <div className="w-full mx-auto flex flex-col  gap-3 p-6">
                    <div className="px-6">
                        <h1 className="text-2xl font-bold ">User Verification</h1>
                    </div>
                    <div className="px-6">
                        <h1 className="text-sm">Manage and review pending user verification requests</h1>
                    </div>
                    <div className="p-6">
                        <table class="min-w-full border border-gray-100 rounded-lg hidden md:table">
                            <thead class="bg-gray-200">
                                <tr>
                                    <th class="border px-6 py-3  border-gray-300 text-left font-semibold">Id</th>
                                    <th class="border px-6 py-3  border-gray-300 text-left font-semibold">Worker Name</th>
                                    <th class="border px-6 py-3  border-gray-300 text-left font-semibold">Payment</th>
                                    <th class="border px-6 py-3  border-gray-300 text-left font-semibold">Contact Numaber</th>
                                    <th class="border px-6 py-3 border-gray-300 text-left font-semibold">Status</th>
                                    <th class="border px-6 py-3 border-gray-300 text-left font-semibold">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {workers.map((user) => {
                                    return (
                                        <tr class="hover:bg-gray-50">
                                            <td class="border  border-gray-300 px-6 py-3">{user.id}</td>
                                            <td class="border  border-gray-300 px-6 py-3">{user.fullName}</td>
                                            <td class="border border-gray-300 px-6 py-3">   {payments[user.user?.id] ? "Paid" : "Not yet"}</td>
                                            <td class="border border-gray-300 px-6 py-3">{user.phoneNumber}</td>
                                            <td className="border border-gray-300 px-6 py-3">
                                                {Boolean(user.isBlocked) ? (
                                                    <span className="bg-red-100 text-red-700 font-semibold px-3 py-1 rounded-full">Blocked</span>
                                                ) : (
                                                    <span className="bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full">Active</span>
                                                )}


                                            </td>

                                            <td class="border border-gray-300 px-6 py-3 relative">
                                                <div className="flex items-center gap-2">


                                                    {/* <button
                                                        onClick={() => {
                                                            handleToggleBlock(user.id);
                                                            setOpenMenuId(null);
                                                        }}
                                                        className={`w-full text-left px-4 py-2 font-semibold ${user.isBlocked
                                                            ? "text-green-600 hover:bg-green-50"
                                                            : "text-red-600 hover:bg-red-50"
                                                            }`}
                                                    >
                                                        {user.isBlocked ? "Approve Worker" : "Block Worker"}
                                                    </button> */}

                                                    <button
                                                        onClick={() => {
                                                            handleToggleBlock(user);
                                                            setOpenMenuId(null);
                                                        }}
                                                        className={`w-full text-left px-4 py-2 font-semibold ${user.isBlocked
                                                            ? "text-green-600 hover:bg-green-50"
                                                            : "text-red-600 hover:bg-red-50"
                                                            }`}
                                                    >
                                                        {user.isBlocked ? "Approve Worker" : "Block Worker"}
                                                    </button>

                                                    <div className="relative group">
                                                        <button
                                                            className="p-2 rounded-lg hover:bg-gray-100"
                                                            onClick={() => toggleMenu(user.id)}
                                                        >
                                                            <FiMoreVertical size={18} />
                                                        </button>

                                                        {/* Tooltip */}
                                                        <span className="
                                                        absolute -top-8 left-1/2 -translate-x-1/2
                                                        bg-gray-800 text-white text-xs
                                                        px-2 py-1 rounded
                                                        opacity-0 group-hover:opacity-100
                                                        transition duration-200
                                                        whitespace-nowrap
                                                    ">
                                                            {openMenuId === user.id ? "Show less" : "Show more"}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* dropdown menu */}
                                                {openMenuId === user.id && (
                                                    <div className="absolute right-6 top-14 z-50 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                                                        <button
                                                            onClick={() => {
                                                                navigate(`/WorkerProgress/${user.id}`);
                                                                setOpenMenuId(null);
                                                            }}
                                                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                                                        >
                                                            <FiTrendingUp className="text-gray-600" />
                                                            <span>Progress</span>
                                                        </button>

                                                        <button
                                                            onClick={() => {
                                                                handleDownloadPDF(user.pdfUrl, user.fullName);
                                                                setOpenMenuId(null);
                                                            }}
                                                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                                                        >
                                                            <FiDownload className="text-gray-600" />
                                                            <span>Download PDF</span>
                                                        </button>

                                                        <button
                                                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                                                            onClick={() => navigate(`/workerRegistrationDetails/${user.id}`)}
                                                        >
                                                            <FiEye className="text-gray-600" />
                                                            <span>Review Details</span>
                                                        </button>

                                                        <PaymentDetailsModal
                                                            userId={user.user?.id}
                                                            triggerButtonText={
                                                                <div className="flex items-center gap-3">
                                                                    <FiCreditCard className="text-gray-600" />
                                                                    <span>Payment Details</span>
                                                                </div>
                                                            }
                                                            buttonClass="w-full flex items-center px-4 py-2 hover:bg-gray-100"
                                                        />
                                                    </div>
                                                )}


                                            </td>



                                        </tr>
                                    )
                                })}


                            </tbody>
                        </table>
                        {/* Mobile Cards */}
                        <div className="md:hidden flex flex-col gap-4">
                            {workers.map((user) => (
                                <div className="border border-gray-300 bg-white rounded-lg p-4 shadow-sm">
                                    <p><span className="font-semibold">Id:</span> {user.Id}</p>
                                    <p><span className="font-semibold">Client:</span> {user.Client}</p>
                                    <p><span className="font-semibold">Date:</span> {user.Date}</p>
                                    <p><span className="font-semibold">Time:</span> {user.Time}</p>



                                    <div className="flex gap-3 mt-4">
                                        <button className="w-full px-3 py-2 bg-primary text-white rounded-lg border hover:bg-white hover:text-primary">
                                            Approve
                                        </button>
                                        <button className="w-full px-3 py-2 bg-white text-primary rounded-lg hover:bg-primary border border-primary hover:text-white">
                                            Reject
                                        </button>
                                        <button className="w-full px-3 py-2 bg-white text-primary rounded-lg hover:bg-primary border border-primary hover:text-white">
                                            Review Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </div>

            <div className="p-8">
                <PlatformAnalyticsChart />
            </div>

            <div className=" w-full   flex  my-auto ">
                <div className="w-full mx-auto flex flex-col  gap-3 p-6">
                    <div className="px-6">
                        <h1 className="text-2xl font-bold ">User Complaints and Suggesions</h1>
                    </div>

                    <div className="flex flex-col lg:flex-row  flex-wrap items-center justify-center gap-6 ">
                        {contact.map((comment) => {
                            return (
                                <div className="border border-slate-200 shadow-xl w-full lg:w-[40%] p-8 gap-6">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center justify-between ">
                                            <img

                                                src={comment.user?.imageUrl || Man}
                                                alt="profile"
                                                className="w-[50px] aspect-square rounded-full object-cover"
                                            />
                                            <h1 className="font-bold text-xl px-4">{comment.name}</h1>
                                        </div>
                                        <div className="flex items-center gap-3">


                                            <h1>{comment.contactNumber}</h1>


                                            <button
                                                onClick={() => deleteContact(comment.id)}
                                                className="text-primary hover:text-red-700 transition"
                                            >
                                                <RiDeleteBin6Line size={24} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center py-4 text-lg">

                                        <h1 className="text-slate-500 px-2">{comment.subject}</h1>

                                    </div>
                                    <div className="flex items-center ">
                                        <p className="px-2">{comment.message}
                                        </p>
                                    </div>
                                    <div className="flex py-4 text-lg w-full">
                                        <h1 className="text-slate-500 px-2 w-full text-right">
                                            {formatDate(comment.createdAt)}
                                        </h1>
                                    </div>

                                </div>

                            )
                        })}

                    </div>


                </div>
            </div>

        </div>
    )
}