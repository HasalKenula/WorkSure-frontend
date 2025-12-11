import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import Navbar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import MM from "../assets/man.jpg";

export default function WorkerHire() {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState("");
    const [description, setDescription] = useState("");
    const [isBooked, setIsBooked] = useState(true);
    const [isPending, setIsPending] = useState(true);

    // Sample booked time slots for demo
    // const bookedSlots = [
    //     "09:00 AM - 02:00 PM",
    //     "04:00 PM - 06:00 PM",
    // ];

    const handleSubmit = () => {
        alert("Job Request Sent!");
    };

    const { jwtToken, isAuthenticated } = useAuth();

    const { workerId } = useParams();

    const [worker, setWorker] = useState(null);

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
    };

    async function getWorker() {
        try {
            const response = await axios.get(
                `http://localhost:8081/worker/id/${workerId}`,
                config
            );
            setWorker(response.data);
        } catch (error) {
            console.log("Error loading worker:", error);
        }
    }


    useEffect(() => {
        if (isAuthenticated && workerId) {
            getWorker();
        }
    }, [isAuthenticated, workerId]);


    const [user, setUser] = useState({
        name: "",
        email: "",
        contact: "",
        address: "",
        imageUrl: "",
    });


    useEffect(() => {
        if (!jwtToken) return;

        axios
            .get("http://localhost:8081/user", {
                headers: { Authorization: `Bearer ${jwtToken}` },
            })
            .then((res) => {
                setUser(res.data);

            })
            .catch(() => setLoading(false));
    }, [jwtToken]);




    async function createHire() {
        try {
            const response = await axios.post(
                "http://localhost:8081/hire", {
                workerId: workerId,
                userId: user.id,
                bookingDate: format(selectedDate, "yyyy-MM-dd"),
                bookingTime: selectedTime,
                description: description,
                isBooked: isBooked,
                isPending: isPending
            }, config
            );
            // setWorker(response.data);
            getHires();

            alert("Job Request Sent Successfully!");
        } catch (error) {
            console.log("Error loading worker:", error);
            alert("Failed to send hire request.");
        }
    }




    const [hires, setHires] = useState([]);
    const [hiresByDate, setHiresByDate] = useState({});

    async function getHires() {
        if (!workerId) return;

        try {
            const response = await axios.get(
                `http://localhost:8081/hire/${workerId}`,
                config
            );
            console.log("Fetched hires:", response.data);
            setHires(response.data);
        } catch (error) {
            console.log("Error loading hires:", error);
        }
    }

    useEffect(() => {
        if (worker) getHires();
    }, [worker]);

    useEffect(() => {
        const map = {};
        hires
            .filter(hire => !hire.isBooked)
            .forEach(hire => {
                const date = hire.bookingDate;
                if (!map[date]) map[date] = [];
                map[date].push(hire.bookingTime);
            });
        setHiresByDate(map);
    }, [hires]);



    const getBookedSlotsForDate = (date) => {
        const formattedDate = format(date, "yyyy-MM-dd");
        return hiresByDate[formattedDate] || [];
    };


    const [myHires, setMyHires] = useState([]);


    useEffect(() => {
        if (hires.length > 0 && user?.id) {
            const userHires = hires.filter(h => h.user?.id === user.id);

            setMyHires(userHires); // <-- Save ALL matching hires
        }
    }, [hires, user]);



    return (
        <div>
            <Navbar />
            <div className="min-h-screen p-4 mt-10 md:p-10">
                <div className="max-w-5xl mx-auto">

                    {/* Worker Header Card */}
                    <div className="p-6 mb-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">

                            <div className="flex items-center gap-8">
                                <div className="bg-gray-200 w-20 h-20 rounded-full flex justify-center items-center mx-auto overflow-hidden">
                                    <img
                                        src={worker?.user?.imageUrl || MM}
                                        alt={worker?.fullName || "Worker Image"}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold">{worker?.fullName}</h2>
                                    <p className="text-gray-600 font-semibold">{worker?.jobRole}</p>
                                    <p className="text-gray-600 font-semibold">{worker?.id}</p>
                                    <p className="text-gray-600 font-semibold">{user?.id}</p>
                                    <p className="text-gray-500">{worker?.preferredServiceLocation}</p>
                                    <div className="flex items-center text-yellow-500 mt-1">
                                        ⭐⭐⭐⭐⭐ <span className="text-gray-500 ml-1 text-sm">(75 Reviews)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Calendar + Booked Slots */}
                    <div className="p-6 mb-10">

                        <h3 className="text-xl font-semibold mb-4">Reserve Your Time</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Calendar */}
                            <div className="flex justify-center">
                                <Calendar
                                    onChange={setSelectedDate}
                                    value={selectedDate}
                                    className="rounded-lg shadow-sm p-2"
                                />
                            </div>

                            {/* Time Slots */}
                            {Object.keys(hiresByDate).length > 0 ? (
                                Object.entries(hiresByDate).map(([date, slots]) => (
                                    <div key={date} className="mb-4 p-2 border rounded-md">
                                        <h4 className="font-semibold mb-2">{format(new Date(date), "dd MMMM yyyy")}</h4>
                                        {slots.map((slot, i) => (
                                            <div
                                                key={i}
                                                className="flex justify-between border-b border-gray-300 py-1 text-sm"
                                            >
                                                <span>{slot}</span>
                                                <span className="text-red-500 font-semibold">Booked</span>
                                            </div>
                                        ))}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No bookings for this worker yet.</p>
                            )}


                        </div>
                    </div>

                    {/* Job Request Form */}
                    <div className="p-6 mb-10">

                        {/* Date */}
                        <div className="mb-4">
                            <label className="font-medium">Date :</label>
                            <input
                                type="text"
                                value={format(selectedDate, "dd MMMM yyyy")}
                                readOnly
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md  focus:outline-none"
                            />
                        </div>

                        {/* Time */}
                        <div className="mb-4">
                            <label className="font-medium">Time :</label>
                            <input
                                type="time"
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-1 focus:outline-primary"
                                onChange={(e) => setSelectedTime(e.target.value)}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="font-medium">Description :</label>
                            <textarea
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-1 focus:outline-primary"
                                rows="3"
                                placeholder="Describe the job..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col md:flex-row gap-4 mt-6">
                            <button
                                onClick={createHire}
                                className="w-full md:w-1/3 bg-primary text-white py-1 rounded-md  hover:outline-2 hover:outline-offset-1 hover:outline-primary"
                            >
                                Send Job Request
                            </button>

                            <button className="w-full md:w-1/3  border border-gray-500  hover:border-primary py-1 rounded-md hover:text-primary text-gray-800">
                                Cancel
                            </button>
                        </div>
                        {/* status */}
                        <div className="bg-gray-200 p-6 text-center rounded-lg mt-8">
                            <span className=" text-primary px-6 py-2 rounded-md font-medium">
                                Your Request is Pending.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {myHires.length > 0 && (
                <div className="bg-white border p-6 rounded-lg shadow-md mt-6">
                    <h3 className="text-xl font-semibold mb-4">Your Requests</h3>

                    {myHires.map((hire, index) => (
                        <div key={index} className="border-b border-gray-300 pb-4 mb-4">
                            <p><strong>User ID:</strong> {user?.id}</p>
                            <p><strong>Worker ID:</strong> {worker?.id}</p>
                            <p><strong>Date:</strong> {hire.bookingDate}</p>
                            <p><strong>Time:</strong> {hire.bookingTime}</p>

                            <p className="mt-2">
                                <strong>Description:</strong><br />
                                <span className="text-gray-700">{hire.description}</span>
                            </p>

                            <div className="mt-4">
                                <strong>Status:</strong>
                                {hire.isPending ? (
                                    <span className="text-yellow-500 ml-2 font-semibold">Pending</span>
                                ) : (
                                    <span className="text-green-600 ml-2 font-semibold">Accepted / Completed</span>
                                )}
                            </div>

                            <div className="mt-2">
                                <strong>Booking:</strong>
                                {hire.isBooked ? (
                                    <span className="text-red-600 ml-2 font-semibold">Blocked</span>
                                ) : (
                                    <span className="text-green-600 ml-2 font-semibold">Not Blocked</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}


        </div>
    );
}
