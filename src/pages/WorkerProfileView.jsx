// import Navbar from "../components/NavBar";
// import MM from "../assets/man.jpg";
// import { IoLocationSharp } from "react-icons/io5";
// import { FaStar, FaUserCircle, FaBriefcase, FaCertificate } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import api from '../api/axios'

// export default function WorkerProfileView() {
//     const { jwtToken, isAuthenticated } = useAuth();
//     const navigate = useNavigate();

//     const [userId, setUserId] = useState(null);
//     const [worker, setWorker] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [reviews, setReviews] = useState([]);

//     const config = {
//         headers: { Authorization: `Bearer ${jwtToken}` }
//     };

//     /* ---------------- FETCH USER ---------------- */
//     useEffect(() => {
//         if (!jwtToken) return;
//         api
//             .get("/user", config)
//             .then(res => setUserId(res.data.id))
//             .catch(() => setLoading(false));
//     }, [jwtToken]);

//     /* ---------------- FETCH WORKER ---------------- */
//     useEffect(() => {
//         if (!isAuthenticated || !userId) return;

//         const fetchWorker = async () => {
//             setLoading(true);
//             try {
//                 const res = await api.get(
//                     `/worker/${userId}`,
//                     config
//                 );
//                 setWorker(res.data);
//             } catch (err) {
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchWorker();
//     }, [isAuthenticated, userId]);

//     const getWorkingDays = () => {
//         if (!worker) return [];
//         const days = [];
//         if (worker.mon) days.push("Mon");
//         if (worker.tue) days.push("Tue");
//         if (worker.wed) days.push("Wed");
//         if (worker.thu) days.push("Thu");
//         if (worker.fri) days.push("Fri");
//         if (worker.sat) days.push("Sat");
//         if (worker.sun) days.push("Sun");
//         return days;
//     };

//     useEffect(() => {
//         if (!jwtToken || !worker?.id) return;

//         api
//             .get(`/rating/${worker.id}`, config)
//             .then(res => setReviews(res.data.ratings || []))

//             .catch(err => console.error("Failed to load reviews", err));
//     }, [jwtToken, worker]);


//     if (loading) {
//         return (
//             <>
//                 <Navbar />
//                 <div className="mt-24 flex justify-center">
//                     <div className="animate-pulse w-3/4 space-y-4">
//                         <div className="h-8 bg-gray-300 rounded w-1/3"></div>
//                         <div className="h-48 bg-gray-300 rounded"></div>
//                     </div>
//                 </div>
//             </>
//         );
//     }

//     if (!worker) return null;

//     const totalReviews = reviews.length;

//     const averageRating =
//         totalReviews > 0
//             ? (
//                 reviews.reduce((sum, r) => sum + r.rating, 0) /
//                 totalReviews
//             )
//             : 0;


//     const renderAverageStars = (avg) => {
//         const roundedAvg = Math.round(avg); // ⭐ KEY FIX

//         return [...Array(5)].map((_, i) => {
//             const starValue = i + 1;

//             return (
//                 <FaStar
//                     key={i}
//                     className={
//                         starValue <= roundedAvg
//                             ? "text-yellow-500"
//                             : "text-gray-300"
//                     }
//                 />
//             );
//         });
//     };

//     return (
//         <>
//             <Navbar />

//             <div className="mt-24 flex justify-center font-outfit">
//                 <div className="w-[85%] max-w-7xl">

//                     {/* ================= HEADER ================= */}
//                     <div className="sticky top-20 bg-white/80 backdrop-blur-md rounded-xl shadow p-6 flex gap-6 z-10">

//                         <img
//                             src={worker.user?.imageUrl || MM}
//                             alt="profile"
//                             className="w-32 h-32 rounded-full object-cover border-4 border-primary"
//                         />

//                         <div className="flex-1 space-y-2">
//                             <h1 className="text-3xl font-bold">{worker.fullName}</h1>
//                             <p className="text-primary font-semibold">{worker.jobRole}</p>

//                             <div className="flex items-center gap-2">
//                                 <IoLocationSharp />
//                                 <span>{worker.address}</span>
//                             </div>

//                             <div className="flex items-center gap-1">
//                                 {renderAverageStars(averageRating)}

//                                 <span className="ml-2 font-semibold text-slate-600">
//                                     {averageRating.toFixed(1)} ({totalReviews} reviews)
//                                 </span>
//                             </div>

//                         </div>

//                         <button
//                             onClick={() => navigate("/workerDashboard")}
//                             className="h-fit px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-medium rounded-lg hover:shadow-lg hover:scale-102 transition-all duration-300 flex items-center gap-2 justify-center whitespace-nowrap"
//                         >
//                             Dashboard
//                         </button>
//                     </div>

//                     {/* ================= CONTENT ================= */}
//                     <div className="mt-6 grid grid-cols-12 gap-6">

//                         {/* LEFT SIDEBAR */}
//                         <aside className="col-span-4 space-y-6">

//                             <InfoCard title="Working Area">
//                                 <p>{worker.preferredServiceLocation || "Not specified"}</p>
//                             </InfoCard>

//                             <InfoCard title="Availability">
//                                 <p>
//                                     {getWorkingDays().join(", ") || "Not set"} <br />
//                                     {worker.preferredStartTime} - {worker.preferredEndTime}
//                                 </p>
//                             </InfoCard>

//                             <InfoCard title="Certifications" icon={<FaCertificate />}>
//                                 {worker.certificates?.length ? (
//                                     <ul className="list-disc pl-5 space-y-1">
//                                         {worker.certificates.map((c, i) => (
//                                             <li key={i}>{c.certificateName}</li>
//                                         ))}
//                                     </ul>
//                                 ) : (
//                                     <p className="text-gray-500">No certifications</p>
//                                 )}
//                             </InfoCard>
//                         </aside>

//                         {/* MAIN CONTENT */}
//                         <main className="col-span-8 space-y-6">

//                             <InfoCard title="Experience" icon={<FaBriefcase />}>
//                                 {worker.jobExperiences?.length ? (
//                                     <ul className="space-y-4">
//                                         {worker.jobExperiences.map((exp, i) => (
//                                             <li key={i}>
//                                                 <p className="font-semibold">{exp.jobTitle}</p>
//                                                 <p className="text-gray-700">
//                                                     {exp.companyName} · {exp.years} years
//                                                 </p>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 ) : (
//                                     <p className="text-gray-500">No experience added</p>
//                                 )}
//                             </InfoCard>

//                             <InfoCard title="Client Reviews">
//                                 {reviews.length > 0 ? (
//                                     reviews.map((review) => (
//                                         <div key={review.id} className="border-b pb-4 mb-4">
//                                             <div className="flex items-center gap-3">
//                                                 {review.user?.imageUrl ? (
//                                                     <img
//                                                         src={review.user.imageUrl}
//                                                         alt={review.user.name}
//                                                         className="w-10 h-10 rounded-full object-cover"
//                                                     />
//                                                 ) : (
//                                                     <FaUserCircle className="text-3xl text-gray-600" />
//                                                 )}
//                                                 <span className="font-semibold">
//                                                     {review.user?.name || "Anonymous"}
//                                                 </span>
//                                             </div>

//                                             <div className="flex gap-1 ml-9 mt-1">
//                                                 {[...Array(review.rating)].map((_, i) => (
//                                                     <FaStar key={i} className="text-yellow-500" />
//                                                 ))}
//                                             </div>

//                                             <p className="ml-9 mt-2 text-gray-700">{review.feedback}</p>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p className="mt-2 text-gray-500">No reviews yet.</p>
//                                 )}
//                             </InfoCard>

//                         </main>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// /* ================= REUSABLE CARD ================= */
// function InfoCard({ title, icon, children }) {
//     return (
//         <div className="bg-white/90 backdrop-blur rounded-xl shadow p-5">
//             <div className="flex items-center gap-2 mb-3">
//                 {icon}
//                 <h3 className="font-bold text-lg">{title}</h3>
//             </div>
//             {children}
//         </div>
//     );
// }

import Navbar from "../components/NavBar";
import MM from "../assets/man.jpg";
import { IoLocationSharp } from "react-icons/io5";
import { FaStar, FaUserCircle, FaBriefcase, FaCertificate } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function WorkerProfileView() {
    const { jwtToken, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [userId, setUserId] = useState(null);
    const [worker, setWorker] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);

    const config = {
        headers: { Authorization: `Bearer ${jwtToken}` }
    };

    /* ---------------- FETCH USER ---------------- */
    useEffect(() => {
        if (!jwtToken) return;
        api
            .get("/user", config)
            .then(res => setUserId(res.data.id))
            .catch(() => setLoading(false));
    }, [jwtToken]);

    /* ---------------- FETCH WORKER ---------------- */
    useEffect(() => {
        if (!isAuthenticated || !userId) return;

        const fetchWorker = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/worker/${userId}`, config);
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

    useEffect(() => {
        if (!jwtToken || !worker?.id) return;

        api
            .get(`/rating/${worker.id}`, config)
            .then(res => setReviews(res.data.ratings || []))
            .catch(err => console.error("Failed to load reviews", err));
    }, [jwtToken, worker]);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="mt-24 flex justify-center px-4">
                    <div className="animate-pulse w-full max-w-lg space-y-4">
                        <div className="h-8 bg-gray-300 rounded w-1/3"></div>
                        <div className="h-48 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </>
        );
    }

    if (!worker) return null;

    const totalReviews = reviews.length;

    const averageRating =
        totalReviews > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
            : 0;

    const renderAverageStars = (avg) => {
        const roundedAvg = Math.round(avg);

        return [...Array(5)].map((_, i) => {
            const starValue = i + 1;

            return (
                <FaStar
                    key={i}
                    className={
                        starValue <= roundedAvg
                            ? "text-yellow-500"
                            : "text-gray-300"
                    }
                />
            );
        });
    };

    return (
        <>
            <Navbar />

            <div className="mt-24 flex justify-center font-outfit px-4">
                <div className="w-full max-w-7xl">

                    {/* ================= HEADER ================= */}
                    <div className="sticky top-20 bg-white/80 backdrop-blur rounded-xl shadow p-6 flex flex-col md:flex-row gap-6 z-10 items-center md:items-start text-center md:text-left">

                        <img
                            src={worker.user?.imageUrl || MM}
                            alt="profile"
                            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-primary"
                        />

                        <div className="flex-1 space-y-2">
                            <h1 className="text-2xl md:text-3xl font-bold">{worker.fullName}</h1>
                            <p className="text-primary font-semibold">{worker.jobRole}</p>

                            <div className="flex items-center justify-center md:justify-start gap-2">
                                <IoLocationSharp />
                                <span className="text-sm md:text-base">{worker.address}</span>
                            </div>

                            <div className="flex items-center justify-center md:justify-start gap-1 flex-wrap">
                                {renderAverageStars(averageRating)}
                                <span className="ml-2 font-semibold text-slate-600 text-sm">
                                    {averageRating.toFixed(1)} ({totalReviews} reviews)
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate("/workerDashboard")}
                            className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
                        >
                            Dashboard
                        </button>
                    </div>

                    {/* ================= CONTENT ================= */}
                    <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

                        {/* LEFT SIDEBAR */}
                        <aside className="lg:col-span-4 space-y-6">
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
                        <main className="lg:col-span-8 space-y-6">

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
                                {reviews.length > 0 ? (
                                    reviews.map((review) => (
                                        <div key={review.id} className="border-b pb-4 mb-4">
                                            <div className="flex items-center gap-3">
                                                {review.user?.imageUrl ? (
                                                    <img
                                                        src={review.user.imageUrl}
                                                        alt={review.user.name}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <FaUserCircle className="text-3xl text-gray-600" />
                                                )}
                                                <span className="font-semibold text-sm md:text-base">
                                                    {review.user?.name || "Anonymous"}
                                                </span>
                                            </div>

                                            <div className="flex gap-1 ml-9 mt-1">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <FaStar key={i} className="text-yellow-500" />
                                                ))}
                                            </div>

                                            <p className="ml-9 mt-2 text-gray-700 text-sm md:text-base">
                                                {review.feedback}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="mt-2 text-gray-500">No reviews yet.</p>
                                )}
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
                <h3 className="font-bold text-base md:text-lg">{title}</h3>
            </div>
            {children}
        </div>
    );
}