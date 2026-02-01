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


    const users = [

        {
            Id: "001",
            Client: "Sunil",
            Date: "2025-11-04",
            Time: "10:30 AM",
            Description: "Fix kitchen sink leakage",
            Action: "Completed"
        },
        {
            Id: "002",
            Client: "Kamal",
            Date: "2025-11-05",
            Time: "02:15 PM",
            Description: "Electrical wiring check",
            Action: "On Going"
        },
        {
            Id: "003",
            Client: "Nadeesha",
            Date: "2025-11-06",
            Time: "09:00 AM",
            Description: "Painting living room",
            Action: "Pending"
        },
        {
            Id: "003",
            Client: "Nadeesha",
            Date: "2025-11-06",
            Time: "09:00 AM",
            Description: "Painting living room",
            Action: "Pending"
        },
        {
            Id: "003",
            Client: "Nadeesha",
            Date: "2025-11-06",
            Time: "09:00 AM",
            Description: "Painting living room",
            Action: "Pending"
        },
        {
            Id: "003",
            Client: "Nadeesha",
            Date: "2025-11-06",
            Time: "09:00 AM",
            Description: "Painting living room",
            Action: "Pending"
        },

    ]

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <IoStarSharp
                key={i}
                className={i < rating ? "text-yellow-500" : "text-slate-200"}
            />
        ));
    };

    const workerReviews = [
        {
            id: 1,
            name: "John Doe",
            label: new Date().toLocaleDateString(),
            profileColor: "bg-red-300",
            rating: 3,
            ratingText: "3.0",
            review:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            id: 2,
            name: "Michael Silva",
            label: new Date().toLocaleDateString(),
            profileColor: "bg-blue-300",
            rating: 4,
            ratingText: "4.0",
            review:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non sem vel odio tempor viverra."
        },
        {
            id: 3,
            name: "Kamal Perera",
            label: new Date().toLocaleDateString(),
            profileColor: "bg-green-300",
            rating: 5,
            ratingText: "5.0",
            review:
                "Praesent aliquet, leo non facilisis malesuada, velit lorem malesuada orci, et facilisis neque odio at sapien."
        },
        {
            id: 4,
            name: "Amal Perera",
            label: new Date().toLocaleDateString(),
            profileColor: "bg-green-300",
            rating: 2,
            ratingText: "2.0",
            review:
                "Praesent aliquet, leo non facilisis malesuada, velit lorem malesuada orci, et facilisis neque odio at sapien."
        }
    ];

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

    return (
        <div>
            <Navbar />
            <div className="w-full h-[1000px] lg:h-screen flex flex-col items-center justify-center  lg:pt-24 my-auto">
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
                            onClick={() => navigate(`/workerTransfers/${worker?.id}`)}
                            className="w-[75%] flex-1 flex-col shadow-xl items-center justify-center gap-6 border border-slate-200 py-4 px-8 cursor-pointer hover:scale-[1.02] transition"
                        >
                            <div className="flex items-center justify-center">
                                <GiTakeMyMoney color="#f59e0b" size={80} />
                            </div>

                            <div className="flex items-center justify-center text-4xl font-bold pb-4">
                                <h1 className="text-slate-500">Earning Progress</h1>
                            </div>


                        </div>

                        <div className="w-[75%] flex-1 flex-col  shadow-xl items-center justify-center gap-6  border  border-slate-200 py-4 px-8">
                            <div className="flex items-center justify-center ">
                                <MdOutlineGeneratingTokens color="#f59e0b" size={80} />
                            </div>
                            <div className="flex items-center justify-center text-4xl font-bold pb-4">
                                <h1 className="text-slate-500">Rating</h1>
                            </div>
                            <div className="flex items-center justify-center text-primary text-xl">
                                <IoStarSharp />
                                <IoStarSharp />
                                <IoStarSharp />
                                <IoStarSharp />
                                <IoStarSharp />
                                <CountUp start={0} end={0} duration={2} decimals={1} enableScrollSpy scrollSpyOnce />
                            </div>
                            <div className="flex items-center flex-col justify-center text-xl">
                                <h1>(0 Reviews)</h1>
                                <h1>{hire?.worker?.id}</h1>
                                <h1>{hire?.user?.id}</h1>
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
                            {users.map((user) => (
                                <div className="border border-gray-300 bg-white rounded-lg p-4 shadow-sm">
                                    <p><span className="font-semibold">Id:</span> {user.Id}</p>
                                    <p><span className="font-semibold">Client:</span> {user.Client}</p>
                                    <p><span className="font-semibold">Date:</span> {user.Date}</p>
                                    <p><span className="font-semibold">Time:</span> {user.Time}</p>
                                    <p><span className="font-semibold">Description:</span> {user.Description}</p>

                                    <div className="flex gap-3 mt-4">
                                        <button className="w-full px-3 py-2 bg-primary text-white rounded-lg border hover:bg-white hover:text-primary">
                                            Confirm
                                        </button>
                                        <button className="w-full px-3 py-2 bg-white text-primary rounded-lg hover:bg-primary border border-primary hover:text-white">
                                            Cancel
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

                    <div className="md:hidden flex flex-col gap-4">
                        {users.map((user) => (
                            <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                                <p><span className="font-semibold">Id:</span> {user.Id}</p>
                                <p><span className="font-semibold">Client:</span> {user.Client}</p>
                                <p><span className="font-semibold">Date:</span> {user.Date}</p>
                                <p><span className="font-semibold">Time:</span> {user.Time}</p>
                                <p><span className="font-semibold">Description:</span> {user.Description}</p>

                                <div className="mt-3">
                                    <button className="px-3 py-1 w-full bg-primary text-white rounded-lg border hover:bg-white hover:text-primary">
                                        Completed Work
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
