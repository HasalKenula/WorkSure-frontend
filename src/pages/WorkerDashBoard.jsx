import { IoCheckmarkDoneCircleOutline, IoCloudDoneOutline, IoStarSharp } from "react-icons/io5";
import Navbar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, } from "react";
import { useAuth } from "../context/AuthContext";
import CountUp from "react-countup";
import { FiPhoneOutgoing } from "react-icons/fi";
import { MdOutlineGeneratingTokens, MdOutlinePendingActions } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoEyeOutline, IoCloseCircleOutline } from "react-icons/io5";
import { MdOutlinePlayCircle, MdOutlineDoneAll } from "react-icons/md";
import api from "../api/axios"
import toast from "react-hot-toast";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { HiDocumentText } from "react-icons/hi";

export default function WorkerDashBoard() {
    const { jwtToken, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [worker, setWorker] = useState(null);
    const [reviews, setReviews] = useState([]);



    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        },
    }


    useEffect(() => {
        if (!jwtToken) return;

        api
            .get("/user", {
                headers: { Authorization: `Bearer ${jwtToken}` },
            })
            .then((res) => {

                setUserId(res.data.id);


            })
            .catch(() => setLoading(false));


    }, [jwtToken]);



    async function getWorkers() {
        try {
            const response = await api.get(`/worker/${userId}`, config);
            setWorker(response.data);
        } catch (error) {
            console.log("error to load the correct worker according to the id");
            console.log("Error loading worker:", error);
        }
    }

    const [hire, setHire] = useState([]);

    async function getHires() {
        if (!worker || !worker.id) return;
        try {
            const response = await api.get(`/hire/${worker.id}`, config);
            setHire(response.data);
        } catch (error) {
            console.log("error to load the correct worker according to the id");
            console.log("Error loading worker:", error);
        }
    }


    useEffect(() => {
        if (isAuthenticated && userId) {
            getWorkers();

        }
    }, [isAuthenticated, userId]);


    useEffect(() => {
        if (worker?.id) {
            getHires();
        }
    }, [worker?.id]);

    useEffect(() => {
        if (!worker?.id) return;

        const fetchReviews = async () => {
            try {
                const res = await api.get(`/rating/${worker.id}`, config);
                console.log("Reviews from API:", res.data);
                setReviews(res.data.ratings); // assuming your API returns { ratings: [...] }
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            }
        };

        fetchReviews();
    }, [worker?.id]);

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <IoStarSharp
                key={i}
                className={i < rating ? "text-yellow-500" : "text-slate-200"}
            />
        ));
    };

    async function handleToggleBlock(hire) {
        try {
            await api.put(
                `/hire/toggle-block/${hire.id}`,
                {},
                config
            );

            const isNowApproved = hire.isBooked;

            setHire(prev =>
                prev.map(h =>
                    h.id === hire.id
                        ? { ...h, isBooked: !h.isBooked }
                        : h
                )
            );

            getHires();


            if (isNowApproved) {
                // APPROVED MAIL
                await api.post(
                    "/api/email/send",
                    {
                        to: hire.user.email,
                        subject: "Job Request Approved",
                        body: `Dear ${hire.user.name},

                        Good news! Your job request has been approved by the worker.

                        Job Details:
                        - Job ID: ${hire.id}
                        - Worker: ${worker.fullName}
                        - Date: ${hire.bookingDate}
                        - Time: ${hire.bookingTime}

                        The worker will contact you shortly.

                        Thank you for using our platform.
                        Service Management Team`
                    },
                    config
                );

                toast.success("Job approved & email sent ");

            } else {
                // BLOCKED MAIL
                await api.post(
                    "/api/email/send",
                    {
                        to: hire.user.email,
                        subject: "Job Request Not Approved",
                        body: `Dear ${hire.user.name},

                        We regret to inform you that your job request could not be approved.

                        Job ID: ${hire.id}

                        Please try requesting another worker or contact support.

                        Service Management Team`
                    },
                    config
                );

                toast.error("Job blocked & email sent ");
            }

        } catch (error) {
            console.error(error);
            toast.error("Failed to update job status or send email");
        }
    }



    async function handleTogglePending(hireId) {
        try {
            await api.put(`/hire/toggle-pending/${hireId}`, {}, config);

            setHire(prev =>
                prev.map(hire =>
                    hire.id === hireId ? { ...hire, isPending: !hire.isPending } : hire
                )
            );
            getHires();

            toast.success("Hire status updated successfully");
        } catch (error) {
            toast.error("Failed to update hire status");
        }
    }

    async function handleToggleOngoing(hireId) {
        try {
            await api.put(`/hire/toggle-ongoging/${hireId}`, {}, config);

            setHire(prev =>
                prev.map(hire =>
                    hire.id === hireId ? { ...hire, isOngoing: !hire.isOngoing } : hire
                )
            );
            getHires();

            toast.success("Hire status updated successfully");
        } catch (error) {
            toast.error("Failed to update hire status");
        }
    }


    async function handleToggleComplete(hireId) {
        try {
            await api.put(`/hire/toggle-complete/${hireId}`, {}, config);

            setHire(prev =>
                prev.map(hire =>
                    hire.id === hireId ? { ...hire, isComplete: !hire.isComplete } : hire
                )
            );
            getHires();

            toast.success("Hire status updated successfully");
        } catch (error) {
            toast.error("Failed to update hire status");
        }
    }

    const visibleWorkers = hire.filter(w => !w.isBooked);


    const pendingCount = hire.filter(h => h.isPending && !h.isComplete).length;
    const ongoingCount = hire.filter(h => h.isOngoing && !h.isComplete).length;
    const completedCount = hire.filter(h => h.isComplete).length;

    const totalReviews = reviews.length;

    const averageRating =
        totalReviews > 0
            ? (
                reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
            ).toFixed(1)
            : 0;

    const renderAverageStars = (avg) => {
        return [...Array(5)].map((_, i) => {
            if (avg >= i + 1) {
                // full star
                return <IoStarSharp key={i} className="text-yellow-500" />;
            } else if (avg >= i + 0.5) {
                // half-like effect (lighter star)
                return <IoStarSharp key={i} className="text-yellow-300" />;
            } else {
                // empty star
                return <IoStarSharp key={i} className="text-slate-300" />;
            }
        });
    };


    return (
        <div>
            <Navbar />
            <div className="w-full lg:h-[1000px] h-[1400px] lg:h-screen flex flex-col items-center justify-center  lg:pt-24 my-auto">
                <div className="px-6 mt-10 ">
                    <h1 className="text-3xl md:text-4xl font-bold text-amber-900 ">Worker DashBoard</h1>
                </div>
                <div className="w-full mx-auto flex flex-col  text-slate-400 lg:flex-row items-center justify-center gap-6 p-6 mt-3">

                    <div className="flex-1 flex flex-col items-center justify-center gap-6 ">
                        <div className="w-[75%] flex-1 flex items-center shadow-xl gap-6 border border-slate-200 py-4 px-8  justify-between">
                            <IoCloudDoneOutline color="#f59e0b" size={40} />
                            <div className="text-xl font-bold text-slate-500">
                                <h1>Number of completed works</h1>
                            </div>
                            <div className="text-5xl font-bold">
                                <CountUp key={`completed-${completedCount}`} start={0} end={completedCount} duration={2} enableScrollSpy scrollSpyOnce />
                            </div>
                        </div>
                        <div className="w-[75%] flex-1 flex items-center gap-6  shadow-xl border border-slate-200 border py-4 px-8  justify-between">
                            <FiPhoneOutgoing color="#f59e0b" size={40} />
                            <div className="text-xl font-bold text-slate-500">
                                <h1>Number of On Going works</h1>
                            </div>
                            <div className="text-5xl font-bold">
                                <CountUp key={`ongoing-${ongoingCount}`} start={0} end={ongoingCount} duration={2} enableScrollSpy scrollSpyOnce />
                            </div>
                        </div>
                        <div className="w-[75%] flex-1 flex items-center gap-6 shadow-xl border border-slate-200 border py-4 px-8  justify-between">
                            <MdOutlinePendingActions color="#f59e0b" size={40} />
                            <div className="text-xl font-bold text-slate-500">
                                <h1>Number of Pending Request</h1>
                            </div>
                            <div className="text-5xl font-bold">
                                <CountUp key={`pending-${pendingCount}`} start={0} end={pendingCount} duration={2} enableScrollSpy scrollSpyOnce />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center gap-18 ">
                        <div

                            className="w-[75%] flex-1 flex-col shadow-xl items-center justify-center gap-6 border border-slate-200 py-4 px-8 cursor-pointer hover:scale-[1.02] transition"
                        >
                            <div className="flex items-center justify-center">
                                <GiTakeMyMoney color="#f59e0b" size={80} />
                            </div>

                            <div className="flex items-center justify-center text-4xl font-bold pb-4">
                                <h1 className="text-slate-500">Earning Progress</h1>
                            </div>

                            <div className="flex flex-row items-center justify-center gap-6 pb-6">

                                {/* Transfer Progress Button */}
                                <button
                                    onClick={() => navigate(`/workerTransfers/${worker?.id}`)}
                                    className="group flex items-center lg:gap-3 lg:px-8 px-2 lg:py-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-400 text-white lg:text-lg text-sm font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                                >
                                    <FaMoneyBillTransfer className="text-2xl group-hover:rotate-6 transition-transform duration-300" />
                                    Transfer Details
                                </button>

                                {/* Slip Progress Button */}
                                <button
                                    onClick={() => navigate(`/workerSlip/${worker?.id}`)}
                                    className="group flex items-center lg:gap-3 lg:px-8 px-2 lg:py-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-400 text-white lg:text-lg text-sm font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                                >
                                    <HiDocumentText className="text-2xl group-hover:-rotate-6 transition-transform duration-300" />
                                    Slip Details
                                </button>

                            </div>
                        </div>

                        <div className="w-[75%] flex-1 flex-col shadow-xl items-center justify-center gap-6 border border-slate-200 py-4 px-8">
                            <div className="flex items-center justify-center">
                                <MdOutlineGeneratingTokens color="#f59e0b" size={80} />
                            </div>

                            <div className="flex items-center justify-center text-4xl font-bold pb-4">
                                <h1 className="text-slate-500">Rating</h1>
                            </div>

                            {/* Stars + Average */}
                            <div className="flex items-center justify-center gap-2 text-2xl">
                                {renderAverageStars(averageRating)}
                                <span className="ml-2 font-semibold text-slate-600">
                                    <CountUp
                                        start={0}
                                        end={averageRating}
                                        decimals={1}
                                        duration={2}
                                        enableScrollSpy
                                        scrollSpyOnce
                                    />
                                </span>
                            </div>

                            {/* Review count */}
                            <div className="flex items-center flex-col justify-center text-lg mt-2 text-slate-500">
                                <h1>({totalReviews} Reviews)</h1>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="w-full   flex  my-auto ">
                <div className="w-full mx-auto flex flex-col  gap-3 p-6">
                    <div className="px-6">
                        <h1 className="text-2xl font-bold ">New Job Requests</h1>
                    </div>
                    <div className="px-6">
                        <h1 className="text-sm">Manage and review pending user verification requests</h1>
                    </div>
                    <div className="p-6">
                        <table class="min-w-full border border-gray-100 rounded-lg hidden md:table">
                            <thead class="bg-gray-200">
                                <tr>
                                    <th class="border px-6 py-3  border-gray-300 text-left font-semibold">Id</th>
                                    <th class="border px-6 py-3  border-gray-300 text-left font-semibold">Client</th>
                                    <th class="border px-6 py-3  border-gray-300 text-left font-semibold">Date</th>
                                    <th class="border px-6 py-3  border-gray-300 text-left font-semibold">Time</th>
                                    <th class="border px-6 py-3  border-gray-300 text-left font-semibold">Description</th>
                                    <th class="border px-6 py-3 border-gray-300 text-left font-semibold">Status</th>
                                    <th class="border px-6 py-3 border-gray-300 text-left font-semibold">Pending</th>
                                    <th class="border px-6 py-3 border-gray-300 text-left font-semibold">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {hire.map((user, index) => {
                                    return (
                                        <tr class="hover:bg-gray-50" key={user.id}>
                                            <td class="border  border-gray-300 px-6 py-3">{index + 1}</td>
                                            <td class="border  border-gray-300 px-6 py-3">{user.user.name}</td>
                                            <td class="border border-gray-300 px-6 py-3">{user.bookingDate}</td>
                                            <td class="border border-gray-300 px-6 py-3">{user.bookingTime}</td>
                                            <td class="border  border-gray-300 px-6 py-3">{user.description}</td>
                                            <td className="border border-gray-300 px-6 py-3">
                                                {Boolean(user.isBooked) ? (
                                                    <span className="bg-red-100 text-red-700 font-semibold">Blocked</span>
                                                ) : (
                                                    <span className="bg-green-100 text-green-700 font-semibold">Active</span>
                                                )}


                                            </td>
                                            <td className="border border-gray-300 px-6 py-3">
                                                {Boolean(user.isPending) ? (
                                                    <span className="bg-yellow-100 text-yellow-700 font-semibold">Pending</span>
                                                ) : (
                                                    <span className="bg-blue-100 text-blue-700 font-semibold">Seen</span>
                                                )}
                                            </td>
                                            <td className="border border-gray-300 px-6 py-3">
                                                <div className="flex items-center gap-2">
                                                    {/* Approve / Block */}
                                                    <button
                                                        onClick={() => handleToggleBlock(user)}
                                                        title={user.isBooked ? "Approve Job" : "Block Job"}
                                                        className={`p-2 rounded-full border ${user.isBooked
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"} hover:opacity-80`}
                                                    >
                                                        {user.isBooked ? (
                                                            <IoCheckmarkDoneCircleOutline size={18} />
                                                        ) : (
                                                            <IoCloseCircleOutline size={18} />
                                                        )}
                                                    </button>

                                                    {/* Pending / Seen */}
                                                    <button
                                                        onClick={() => handleTogglePending(user.id)}
                                                        title={user.isPending ? "Mark as Seen" : "Mark as Pending"}
                                                        className={`p-2 rounded-full border ${user.isPending ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"} hover:opacity-80`}
                                                    >
                                                        <IoEyeOutline size={18} />
                                                    </button>

                                                    {/* Profile */}
                                                    <button
                                                        title="View Profile"
                                                        className="p-2 rounded-full border bg-white text-primary hover:bg-primary hover:text-white"
                                                        onClick={() => navigate(`/workerView/${user.user.id}`)}
                                                    >
                                                        <IoEyeOutline size={18} />
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                        {/* Mobile Cards */}
                        <div className="md:hidden flex flex-col gap-4">
                            {hire.map((user, index) => (
                                <div
                                    key={user.id}
                                    className="border border-gray-300 bg-white rounded-lg p-4 shadow-sm"
                                >
                                    <p><span className="font-semibold">Id:</span> {index + 1}</p>
                                    <p><span className="font-semibold">Client:</span> {user.user.name}</p>
                                    <p><span className="font-semibold">Date:</span> {user.bookingDate}</p>
                                    <p><span className="font-semibold">Time:</span> {user.bookingTime}</p>
                                    <p><span className="font-semibold">Description:</span> {user.description}</p>

                                    <p className="mt-2">
                                        <span className="font-semibold">Status:</span>{" "}
                                        {Boolean(user.isBooked) ? (
                                            <span className="bg-red-100 text-red-700 font-semibold px-2 py-1 rounded">Blocked</span>
                                        ) : (
                                            <span className="bg-green-100 text-green-700 font-semibold px-2 py-1 rounded">Active</span>
                                        )}
                                    </p>

                                    <p className="mt-2">
                                        <span className="font-semibold">Pending:</span>{" "}
                                        {Boolean(user.isPending) ? (
                                            <span className="bg-yellow-100 text-yellow-700 font-semibold px-2 py-1 rounded">Pending</span>
                                        ) : (
                                            <span className="bg-blue-100 text-blue-700 font-semibold px-2 py-1 rounded">Seen</span>
                                        )}
                                    </p>

                                    {/* Actions */}
                                    <div className="flex gap-2 mt-4 flex-wrap">
                                        <button
                                            onClick={() => handleToggleBlock(user)}
                                            title={user.isBooked ? "Approve Job" : "Block Job"}
                                            className={`flex-1 p-2 rounded-lg border flex justify-center items-center gap-2 ${user.isBooked
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                } hover:opacity-80`}
                                        >
                                            {user.isBooked ? <IoCheckmarkDoneCircleOutline size={18} /> : <IoCloseCircleOutline size={18} />}
                                            <span className="text-sm font-medium">{user.isBooked ? "Approve" : "Block"}</span>
                                        </button>

                                        <button
                                            onClick={() => handleTogglePending(user.id)}
                                            title={user.isPending ? "Mark as Seen" : "Mark as Pending"}
                                            className={`flex-1 p-2 rounded-lg border flex justify-center items-center gap-2 ${user.isPending
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-blue-100 text-blue-700"
                                                } hover:opacity-80`}
                                        >
                                            <IoEyeOutline size={18} />
                                            <span className="text-sm font-medium">{user.isPending ? "Pending" : "Seen"}</span>
                                        </button>

                                        <button
                                            onClick={() => navigate(`/workerView/${user.user.id}`)}
                                            title="View Profile"
                                            className="flex-1 p-2 rounded-lg border bg-white text-primary hover:bg-primary hover:text-white flex justify-center items-center gap-2"
                                        >
                                            <IoEyeOutline size={18} />
                                            <span className="text-sm font-medium">Profile</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </div>
            <div className=" w-full   flex  my-auto ">
                <div className="w-full mx-auto flex flex-col  gap-3 p-6">
                    <div className="px-6">
                        <h1 className="text-2xl font-bold ">On Going Works</h1>
                    </div>
                    <div className="px-6">
                        <h1 className="text-sm">Manage and review pending user verification requests</h1>
                    </div>
                    <div className="p-6">
                        <table class="min-w-full border border-gray-100 rounded-lg hidden md:table">
                            <thead class="bg-gray-200">
                                <tr>
                                    <th class="border px-6 py-3  border-gray-300 text-left font-semibold">Id</th>
                                    <th class="border px-6 py-3  border-gray-300 text-left font-semibold">Client</th>
                                    <th class="border px-6 py-3  border-gray-300 text-left font-semibold">Date</th>
                                    <th class="border px-6 py-3  border-gray-300 text-left font-semibold">Time</th>
                                    <th class="border px-6 py-3  border-gray-300 text-left font-semibold">Description</th>
                                    <th class="border px-6 py-3 border-gray-300 text-left font-semibold">Status</th>
                                    <th class="border px-6 py-3 border-gray-300 text-left font-semibold">Ongoing</th>
                                    <th class="border px-6 py-3 border-gray-300 text-left font-semibold">Complete</th>
                                    <th class="border px-6 py-3 border-gray-300 text-left font-semibold">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {visibleWorkers.map((user, index) => {
                                    return (
                                        <tr class="hover:bg-gray-50" key={user.id}>
                                            <td class="border  border-gray-300 px-6 py-3">{index + 1}</td>
                                            <td class="border  border-gray-300 px-6 py-3">{user.user.name}</td>
                                            <td class="border border-gray-300 px-6 py-3">{user.bookingDate}</td>
                                            <td class="border border-gray-300 px-6 py-3">{user.bookingTime}</td>
                                            <td class="border  border-gray-300 px-6 py-3">{user.description}</td>
                                            <td className="border border-gray-300 px-6 py-3">
                                                {Boolean(user.isBooked) ? (
                                                    <span className="bg-red-100 text-red-700 font-semibold">Blocked</span>
                                                ) : (
                                                    <span className="bg-green-100 text-green-700 font-semibold">Active</span>
                                                )}


                                            </td>

                                            <td className="border border-gray-300 px-6 py-3">
                                                {Boolean(user.isOngoing) ? (
                                                    <span className="bg-yellow-100 text-yellow-700 font-semibold">Ongoing</span>
                                                ) : (
                                                    <span className="bg-blue-100 text-blue-700 font-semibold">Not Ongoing</span>
                                                )}


                                            </td>
                                            <td className="border border-gray-300 px-6 py-3">
                                                {Boolean(user.isComplete) ? (
                                                    <span className="bg-yellow-100 text-yellow-700 font-semibold">Complete</span>
                                                ) : (
                                                    <span className="bg-blue-100 text-blue-700 font-semibold">InComplete</span>
                                                )}


                                            </td>

                                            <td className="border border-gray-300 px-6 py-3">
                                                <div className="flex items-center gap-2">

                                                    {/* Block / Approve */}
                                                    <button
                                                        onClick={() => handleToggleBlock(user.id)}
                                                        title={user.isBooked ? "Approve" : "Block"}
                                                        className={`p-2 rounded-full border ${user.isBooked ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} hover:opacity-80`}
                                                    >
                                                        {user.isBooked ? (
                                                            <IoCheckmarkDoneCircleOutline size={18} />
                                                        ) : (
                                                            <IoCloseCircleOutline size={18} />
                                                        )}
                                                    </button>

                                                    {/* Ongoing / Free */}
                                                    <button
                                                        onClick={() => handleToggleOngoing(user.id)}
                                                        title={user.isOngoing ? "Ongoing" : "Start Work"}
                                                        className={`p-2 rounded-full border ${user.isOngoing ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"} hover:opacity-80`}
                                                    >
                                                        <MdOutlinePlayCircle size={18} />
                                                    </button>

                                                    {/* Complete */}
                                                    <button
                                                        onClick={() => handleToggleComplete(user.id)}
                                                        title="Mark as Complete"
                                                        className={`p-2 rounded-full border ${user.isComplete ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"} hover:opacity-80`}
                                                    >
                                                        <MdOutlineDoneAll size={18} />
                                                    </button>

                                                    {/* Profile */}
                                                    <button
                                                        title="View Profile"
                                                        className="p-2 rounded-full border bg-white text-primary hover:bg-primary hover:text-white"
                                                        onClick={() => navigate(`/workerView/${user.user.id}`)}
                                                    >
                                                        <IoEyeOutline size={18} />
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden flex flex-col gap-4">
                        {visibleWorkers.map((user, index) => (
                            <div
                                key={user.id}
                                className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
                            >
                                <p><span className="font-semibold">Id:</span> {index + 1}</p>
                                <p><span className="font-semibold">Client:</span> {user.user.name}</p>
                                <p><span className="font-semibold">Date:</span> {user.bookingDate}</p>
                                <p><span className="font-semibold">Time:</span> {user.bookingTime}</p>
                                <p><span className="font-semibold">Description:</span> {user.description}</p>

                                <div className="mt-2">
                                    <p>
                                        <span className="font-semibold">Status:</span>{" "}
                                        {user.isBooked ? (
                                            <span className="bg-red-100 text-red-700 font-semibold px-2 py-1 rounded">Blocked</span>
                                        ) : (
                                            <span className="bg-green-100 text-green-700 font-semibold px-2 py-1 rounded">Active</span>
                                        )}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Ongoing:</span>{" "}
                                        {user.isOngoing ? (
                                            <span className="bg-yellow-100 text-yellow-700 font-semibold px-2 py-1 rounded">Ongoing</span>
                                        ) : (
                                            <span className="bg-blue-100 text-blue-700 font-semibold px-2 py-1 rounded">Not Ongoing</span>
                                        )}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Complete:</span>{" "}
                                        {user.isComplete ? (
                                            <span className="bg-green-100 text-green-700 font-semibold px-2 py-1 rounded">Complete</span>
                                        ) : (
                                            <span className="bg-slate-100 text-slate-600 font-semibold px-2 py-1 rounded">Incomplete</span>
                                        )}
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 mt-4 flex-wrap">
                                    <button
                                        onClick={() => handleToggleBlock(user.id)}
                                        title={user.isBooked ? "Approve" : "Block"}
                                        className={`flex-1 p-2 rounded-lg border flex justify-center items-center gap-2 ${user.isBooked ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                            } hover:opacity-80`}
                                    >
                                        {user.isBooked ? <IoCheckmarkDoneCircleOutline size={18} /> : <IoCloseCircleOutline size={18} />}
                                        <span className="text-sm font-medium">{user.isBooked ? "Approve" : "Block"}</span>
                                    </button>

                                    <button
                                        onClick={() => handleToggleOngoing(user.id)}
                                        title={user.isOngoing ? "Ongoing" : "Start Work"}
                                        className={`flex-1 p-2 rounded-lg border flex justify-center items-center gap-2 ${user.isOngoing ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"
                                            } hover:opacity-80`}
                                    >
                                        <MdOutlinePlayCircle size={18} />
                                        <span className="text-sm font-medium">{user.isOngoing ? "Ongoing" : "Start"}</span>
                                    </button>

                                    <button
                                        onClick={() => handleToggleComplete(user.id)}
                                        title="Mark as Complete"
                                        className={`flex-1 p-2 rounded-lg border flex justify-center items-center gap-2 ${user.isComplete ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"
                                            } hover:opacity-80`}
                                    >
                                        <MdOutlineDoneAll size={18} />
                                        <span className="text-sm font-medium">{user.isComplete ? "Complete" : "Incomplete"}</span>
                                    </button>

                                    <button
                                        onClick={() => navigate(`/workerView/${user.user.id}`)}
                                        title="View Profile"
                                        className="flex-1 p-2 rounded-lg border bg-white text-primary hover:bg-primary hover:text-white flex justify-center items-center gap-2"
                                    >
                                        <IoEyeOutline size={18} />
                                        <span className="text-sm font-medium">Profile</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row flex-wrap items-center justify-center gap-6 py-4">
                {reviews && reviews.length > 0 ? (
                    reviews.map((comment) => (
                        <div key={comment.id} className="border border-slate-200 shadow-xl w-full lg:w-[40%] p-8 gap-6">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center justify-between">
                                    {comment.user?.imageUrl ? (
                                        <img
                                            src={comment.user.imageUrl}
                                            alt={comment.user.name}
                                            className="w-[50px] aspect-square rounded-full object-cover"
                                        />
                                    ) : (
                                        <FaUserCircle className="text-4xl text-gray-500" />
                                    )}
                                    <h1 className="font-bold text-xl px-4">
                                        {comment.user?.name || "Anonymous"}
                                    </h1>
                                </div>
                                <h1>{new Date(comment.createdAT).toLocaleDateString()}</h1>
                            </div>

                            <div className="flex items-center py-4 text-lg">
                                {[...Array(comment.rating)].map((_, i) => (
                                    <IoStarSharp key={i} className="text-yellow-500" />
                                ))}
                                <h1 className="text-slate-500 px-2">{comment.rating}</h1>
                            </div>
                            <div>
                                <p>{comment.feedback}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No reviews yet.</p>
                )}
            </div>


        </div>
    )
}
