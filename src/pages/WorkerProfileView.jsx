import Navbar from "../components/NavBar";
import MM from "../assets/man.jpg";
import { IoLocationSharp } from "react-icons/io5";
import { FaStar, FaUserCircle, FaBriefcase, FaCertificate } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function WorkerProfileView() {
    const { jwtToken, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [userId, setUserId] = useState(null);
    const [worker, setWorker] = useState(null);
    const [loading, setLoading] = useState(true);

    const config = {
        headers: { Authorization: `Bearer ${jwtToken}` }
    };

    /* ---------------- FETCH USER ---------------- */
    useEffect(() => {
        if (!jwtToken) return;
        axios
            .get("http://localhost:8081/user", config)
            .then(res => setUserId(res.data.id))
            .catch(() => setLoading(false));
    }, [jwtToken]);

    /* ---------------- FETCH WORKER ---------------- */
    useEffect(() => {
        if (!isAuthenticated || !userId) return;

        const fetchWorker = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    `http://localhost:8081/worker/${userId}`,
                    config
                );
                setWorker(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchWorker();
    }, [isAuthenticated, userId]);

    const getWorkingDays = () => {
        if (!worker) return [];
        const days = [];
        if (worker.mon) days.push("Mon");
        if (worker.tue) days.push("Tue");
        if (worker.wed) days.push("Wed");
        if (worker.thu) days.push("Thu");
        if (worker.fri) days.push("Fri");
        if (worker.sat) days.push("Sat");
        if (worker.sun) days.push("Sun");
        return days;
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="mt-24 flex justify-center">
                    <div className="animate-pulse w-3/4 space-y-4">
                        <div className="h-8 bg-gray-300 rounded w-1/3"></div>
                        <div className="h-48 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </>
        );
    }

    if (!worker) return null;

    return (
        <>
            <Navbar />

            <div className="mt-24 flex justify-center font-outfit">
                <div className="w-[85%] max-w-7xl">

                    {/* ================= HEADER ================= */}
                    <div className="sticky top-20 bg-white/80 backdrop-blur-md rounded-xl shadow p-6 flex gap-6 z-10">

                        <img
                            src={worker.user?.imageUrl || MM}
                            alt="profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-primary"
                        />

                        <div className="flex-1 space-y-2">
                            <h1 className="text-3xl font-bold">{worker.fullName}</h1>
                            <p className="text-primary font-semibold">{worker.jobRole}</p>

                            <div className="flex items-center gap-2">
                                <IoLocationSharp />
                                <span>{worker.address}</span>
                            </div>

                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className="text-yellow-500" />
                                ))}
                                <span className="ml-2 font-semibold">5.0 (75 reviews)</span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate("/workerDashboard")}
                            //className="h-fit px-6 py-3 bg-primary text-white rounded-lg hover:bg-accent transition"
                            className="h-fit px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-medium rounded-lg hover:shadow-lg hover:scale-102 transition-all duration-300 flex items-center gap-2 justify-center whitespace-nowrap"
                        >
                            Dashboard
                        </button>
                    </div>

                    {/* ================= CONTENT ================= */}
                    <div className="mt-6 grid grid-cols-12 gap-6">

                        {/* LEFT SIDEBAR */}
                        <aside className="col-span-4 space-y-6">

                            <InfoCard title="Working Area">
                                <p>{worker.preferredServiceLocation || "Not specified"}</p>
                            </InfoCard>

                            <InfoCard title="Availability">
                                <p>
                                    {getWorkingDays().join(", ") || "Not set"} <br />
                                    {worker.preferredStartTime} - {worker.preferredEndTime}
                                </p>
                            </InfoCard>

                            <InfoCard title="Certifications" icon={<FaCertificate />}>
                                {worker.certificates?.length ? (
                                    <ul className="list-disc pl-5 space-y-1">
                                        {worker.certificates.map((c, i) => (
                                            <li key={i}>{c.certificateName}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">No certifications</p>
                                )}
                            </InfoCard>
                        </aside>

                        {/* MAIN CONTENT */}
                        <main className="col-span-8 space-y-6">

                            <InfoCard title="Experience" icon={<FaBriefcase />}>
                                {worker.jobExperiences?.length ? (
                                    <ul className="space-y-4">
                                        {worker.jobExperiences.map((exp, i) => (
                                            <li key={i}>
                                                <p className="font-semibold">{exp.jobTitle}</p>
                                                <p className="text-gray-700">
                                                    {exp.companyName} · {exp.years} years
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">No experience added</p>
                                )}
                            </InfoCard>

                            <InfoCard title="Client Reviews">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="border-b pb-4 mb-4">
                                        <div className="flex items-center gap-3">
                                            <FaUserCircle className="text-3xl" />
                                            <span className="font-semibold">John Doe</span>
                                        </div>
                                        <div className="flex gap-1 ml-9">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} className="text-yellow-500" />
                                            ))}
                                        </div>
                                        <p className="ml-9 text-gray-700">
                                            Excellent service and very professional.
                                        </p>
                                    </div>
                                ))}
                            </InfoCard>

                           
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}

/* ================= REUSABLE CARD ================= */
function InfoCard({ title, icon, children }) {
    return (
        <div className="bg-white/90 backdrop-blur rounded-xl shadow p-5">
            <div className="flex items-center gap-2 mb-3">
                {icon}
                <h3 className="font-bold text-lg">{title}</h3>
            </div>
            {children}
        </div>
    );
}
