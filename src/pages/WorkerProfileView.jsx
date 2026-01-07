// import Navbar from "../components/NavBar";
// import MM from "../assets/man.jpg";
// import { IoLocationSharp } from "react-icons/io5";
// import { FaStar } from "react-icons/fa";
// import { FaUserCircle } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// export default function WorkerProfileView() {
//     const { jwtToken, isAuthenticated } = useAuth();
//     const navigate = useNavigate();
//     const [userId, setUserId] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [worker, setWorker] = useState(null);


//     const goToHirePage = () => {
//         navigate("/workerDashboard");
//     };



//     const config = {
//         headers: {
//             Authorization: `Bearer ${jwtToken}`
//         },
//     }


//     useEffect(() => {
//         if (!jwtToken) return;

//         axios
//             .get("http://localhost:8081/user", {
//                 headers: { Authorization: `Bearer ${jwtToken}` },
//             })
//             .then((res) => {

//                 setUserId(res.data.id);


//             })
//             .catch(() => setLoading(false));


//     }, [jwtToken]);

//     async function getWorkers() {
//         try {
//             const response = await axios.get(`http://localhost:8081/worker/${userId}`, config);
//             setWorker(response.data);
//         } catch (error) {
//             console.log("error to load the correct worker according to the id");
//             console.log("Error loading worker:", error);
//         }
//     }


//     useEffect(() => {
//         if (isAuthenticated && userId) {
//             getWorkers();
//         }
//     }, [isAuthenticated, userId]);



//     const p = {
//         name: "Eva Adams",
//     }
//     const goToFeedback = () => {
//         navigate("/feedback", { state: p });
//     };


//     const userRate = [
//         {
//             id: 1,
//             name: "John Doe",
//             date: "2023/10/26",
//             rating: 5,
//             message:
//                 "Excellent work on the project, delivered ahead of schedule and with great attention to detail. Highly recommended!"

//         },

//         {
//             id: 2,
//             name: "John Doe",
//             date: "2023/10/26",
//             rating: 5,
//             message:
//                 "Excellent work on the project, delivered ahead of schedule and with great attention to detail. Highly recommended!"

//         },
//         {
//             id: 3,
//             name: "John Doe",
//             date: "2023/10/26",
//             rating: 5,
//             message:
//                 "Excellent work on the project, delivered ahead of schedule and with great attention to detail. Highly recommended!"

//         },

//     ];



//     const profile = worker ? [
//         {

//             // name: worker.fullName,
//             // position: worker.jobRole,
//             rating: 5,
//             location: " Colombo",
//             workingArea: [

//                 " Colombo",
//                 " Dehiwela",
//                 "MountLavinia",
//                 "Nugegoda",
//             ],
//             workingDays: [
//                 "Monday  -  Saturday",
//                 "8.00AM - 6.00PM"
//             ],
//             skills: [
//                 "Pipe installation and repair",
//                 "Leak detaction and fixing",
//                 "Water heater maintenance",
//                 "Bathroom and kitchen plumbing",
//                 "Drain cleanin and blokage removal",
//                 "PVC, PEX, and copper pipe fitting",

//             ],

//             certification: [
//                 "NVQ Level 4 in Plumbing Technology",
//                 "Certified Water System Installer - National Vocational Training Institute",
//                 "Occuptional Safety & Health (OSH) Certificate",


//             ],

//         }
//     ] : [];

//     // Converts boolean day fields into an array of strings
//     const getWorkingDays = (worker) => {
//         if (!worker) return [];
//         const days = [];
//         if (worker.mon) days.push("Monday");
//         if (worker.tue) days.push("Tuesday");
//         if (worker.wed) days.push("Wednesday");
//         if (worker.thu) days.push("Thursday");
//         if (worker.fri) days.push("Friday");
//         if (worker.sat) days.push("Saturday");
//         if (worker.sun) days.push("Sunday");
//         return days;
//     };


//     return (

//         <>
//             {profile.map((prof) => (
//                 <div className="mt-20 flex justify-center items-center min-h-screen font-outfit relative overflow-hidden  ">{/*full page*/}

//                     <Navbar />

//                     {/*middle box*/}
//                     <div className="shadow-2xl w-[85%] h-[200vh] flex flex-col gap-3.5 rounded-2xl mt-6  bg-white/10 backdrop-blur-xl">

//                         {/*profile*/}
//                         <div className=" h-[40vh] flex flex-row space-x-25">

//                             {/*image*/}
//                             <div className=" w-1/4  flex justify-center items-center ">
//                                 <div className="w-62 h-62 rounded-full  overflow-hidden border-4 border-primary shadow-lg">
//                                     <img src={worker.user?.imageUrl || MM} className="w-full h-full object-cover " alt="mm" />
//                                 </div>
//                             </div>


//                             {/*image-details*/}
//                             <div className=" w-3/4">
//                                 <div className="  h-full flex flex-col space-y-5 p-6 ">

//                                     <div className="flex flex-col space-y-0.5 ">
//                                         <p className="text-4xl font-bold">
//                                             {worker.fullName}
//                                         </p>
//                                         <p className=" font-bold text-primary text-xl">
//                                             {worker.jobRole}
//                                         </p>
//                                     </div>
//                                     <div className="flex flex-row items-center space-x-1.5">
//                                         <IoLocationSharp className="text-2xl " />
//                                         <p className="text-lg font-medium ">
//                                             {worker.address}
//                                         </p>
//                                     </div>


//                                     <div className="flex flex-row space-x-1 items-center">
//                                         {[...Array(prof.rating)].map((_, i) => (
//                                             <FaStar className="text-yellow-500 text-xl" />
//                                         ))}
//                                         <p className="px-1.5 text-lg flex items-center">
//                                             <span className="font-bold">5.0</span>
//                                             <span className="text-gray-600 ml-1"> (75 Reviews)</span>
//                                         </p>
//                                     </div>
//                                     <button onClick={goToHirePage} className="px-6 py-3 text-lg font-semibold bg-primary text-white rounded shadow-md hover:bg-accent hover:scale-105 hover:shadow-xl transition-all duration-300 w-1/3">Worker DashBoard</button>

//                                 </div>
//                             </div>

//                         </div>

//                         {/*2 box*/}
//                         <div className=" border-solid h-[160vh] flex flex-row">
//                             {/*skills,work day,hour ,certification*/}
//                             <div className="  w-[30%] flex flex-col space-x-8 gap-1.5">
//                                 {/* work area */}
//                                 <div className=" h-[40vh]">
//                                     <div className=" h-[65%] p-6 flex flex-col space-y-3.5 ">
//                                         <div className="flex items-center space-x-3 text-xl font-medium">
//                                             <div className="flex-1 h-px bg-gray-400"></div>
//                                             <p className="text-xl font-bold font-inter text-primary text-stroke  ">WORKING AREA</p>
//                                             <div className="flex-1 h-px bg-gray-400"></div>
//                                         </div>



//                                         <ul className="list-disc pl-5 space-y-1 text-gray-800 text-lg font-sans">


//                                             <li>{worker.preferredServiceLocation}</li>


//                                         </ul>

//                                     </div>
//                                 </div>

//                                 {/*work days*/}
//                                 {/* <div className=" h-[30vh]">
//                                     <div className=" p-6 flex flex-col space-y-3.5">
//                                         <div className="flex items-center space-x-3 text-xl font-medium">
//                                             <div className="flex-1 h-px bg-gray-400"></div>
//                                             <p className="text-xl font-bold font-inter text-primary text-stroke  ">WORKING DAYS</p>
//                                             <div className="flex-1 h-px bg-gray-400"></div>
//                                         </div>

//                                         <ul className="list-disc pl-5 space-y-1 text-gray-800 text-lg font-sans">

//                                             {prof.workingDays.map((day, index) => (
//                                                 <li key={index}>{day}</li>
//                                             ))}
//                                         </ul>

//                                     </div>
//                                 </div> */}

//                                 {/*work days*/}
//                                 <div className="h-[30vh]">
//                                     <div className="p-6 flex flex-col space-y-3.5">
//                                         <div className="flex items-center space-x-3 text-xl font-medium">
//                                             <div className="flex-1 h-px bg-gray-400"></div>
//                                             <p className="text-xl font-bold font-inter text-primary text-stroke">WORKING DAYS</p>
//                                             <div className="flex-1 h-px bg-gray-400"></div>
//                                         </div>

//                                         <ul className="list-disc pl-5 space-y-1 text-gray-800 text-lg font-sans">
//                                             {worker &&
//                                                 getWorkingDays(worker).map((day, index) => (
//                                                     <li key={index}>
//                                                         {day} ({worker.preferredStartTime} - {worker.preferredEndTime})
//                                                     </li>
//                                                 ))}
//                                         </ul>

//                                     </div>
//                                 </div>


//                                 {/*skills*/}
//                                 {/* <div className=" h-[60vh]">
//                                     <div className=" p-6 flex flex-col space-y-3.5">
//                                         <div className="flex items-center space-x-3 text-xl font-medium">
//                                             <div className="flex-1 h-px bg-gray-400"></div>
//                                             <p className="text-xl font-bold font-inter text-primary text-stroke  ">SKILLS</p>
//                                             <div className="flex-1 h-px bg-gray-400"></div>
//                                         </div>

//                                         <ul className="list-disc pl-5 space-y-1 text-gray-800 text-lg font-sans">

//                                             {worker.jobExperiences.map((skills, index) => (
//                                                 <li key={index}>
//                                                     <strong>Job Title:</strong> {skills.jobTitle} <br />
//                                                     <strong>Company:</strong> {skills.companyName} <br />
//                                                     <strong>Years:</strong> {skills.years} <br /> <br />
//                                                 </li>
//                                             ))}
//                                         </ul>

//                                     </div>

//                                 </div> */}

//                                 {/*Certification */}
//                                 <div className=" h-[60vh]">
//                                     <div className=" p-6 flex flex-col space-y-3.5 ">
//                                         <div className="flex items-center space-x-3 text-xl font-medium">
//                                             <div className="flex-1 h-px bg-gray-400"></div>
//                                             <p className="text-xl font-bold font-inter text-primary text-stroke  ">CERTIFICATIONS</p>
//                                             <div className="flex-1 h-px bg-gray-400"></div>
//                                         </div>

//                                         <ul className="list-disc pl-5 space-y-1 text-gray-800 text-lg font-sans">

//                                             {worker.certificates.map((certification, index) => (
//                                                 <li key={index}>
//                                                     <strong>certificateName:</strong> {certification.certificateName} <br />

//                                                     <strong>issuingBody:</strong> {certification.issuingBody} <br /> <br />
//                                                 </li>
//                                             ))}

//                                         </ul>

//                                     </div>
//                                 </div>
//                             </div>



//                             {/*experoience user rating*/}
//                             <div className=" w-[70%] flex flex-col gap-2.5 ">

//                                 {/*experience*/}
//                                 <div className=" h-[54vh]">
//                                     <div className=" p-6 flex flex-col space-y-3.5  ">
//                                         <div className="flex items-center space-x-3 text-xl font-medium mr-95.5 ">
//                                             <div className="flex-1 h-px bg-gray-400"></div>
//                                             <p className="text-xl font-bold font-inter text-primary text-stroke  ">EXPERIENCE</p>
//                                             <div className="flex-1 h-px bg-gray-400"></div>
//                                         </div>

//                                         <div className=" pl-4  flex-1 flex-col space-y-5.5 ">
//                                             <div>
//                                                 {worker.jobExperiences.map((skills, index) => (
//                                                     <li key={index}>
//                                                         <strong>Job Title:</strong> {skills.jobTitle} <br />
//                                                         <strong>Company:</strong> {skills.companyName} <br />
//                                                         <strong>Years:</strong> {skills.years} <br /> <br />
//                                                     </li>
//                                                 ))}
//                                             </div>

//                                         </div>

//                                     </div>
//                                 </div>

//                                 {/*rating*/}
//                                 <div className=" flex flex-col h-[150vh]">
//                                     <div className=" p-6 flex flex-col space-y-3.5  ">
//                                         <div className="flex items-center space-x-3 text-xl font-medium mr-95.5 ">
//                                             <div className="flex-1 h-px bg-gray-400"></div>
//                                             <p className="text-xl font-bold font-inter text-primary text-stroke  ">USER RATING</p>
//                                             <div className="flex-1 h-px bg-gray-400 "></div>
//                                         </div>

//                                         <div className="  flex flex-col   h-full">
//                                             {/*Jphn doe 1 */}
//                                             {
//                                                 userRate.map((user) => (

//                                                     <div key={user.id} className="   h-[25vh] flex flex-col">
//                                                         <div className=" h-[8vh] flex flex-row justify-center items-center ">
//                                                             <FaUserCircle className=" w-1/15 text-4xl " ></FaUserCircle>

//                                                             <p className=" w-1/2 font-semibold  text-lg ">{user.name}</p>
//                                                             <p className="b w-1/3 text-sm font-sans text-gray-800">{user.date}</p>
//                                                         </div>
//                                                         <div className=" h-[4vh]">
//                                                             <div className="flex flex-row space-x-1 items-center pl-10">
//                                                                 {[...Array(user.rating)].map((_, i) => (
//                                                                     <FaStar className="text-yellow-500 text-xl" />
//                                                                 ))}

//                                                             </div>
//                                                         </div>

//                                                         <div className=" h-[13vh] pl-10  text-lg font-sans text-gray-800">
//                                                             <p>{user.message}</p>
//                                                             <div className="mt-2 flex-1 h-px bg-gray-400 "></div>
//                                                         </div>


//                                                     </div>

//                                                 ))}



//                                         </div>

//                                     </div>

//                                 </div>
//                                 <div className="h-[30vh] pl-80 ">
//                                     <button onClick={goToFeedback} className=" px-1 py-1 text-lg font-semibold bg-primary text-white rounded-2xl shadow-md hover:bg-accent hover:scale-105 hover:shadow-xl transition-all duration-300 w-1/4">Add Feedback</button>
//                                 </div>

//                             </div>

//                         </div>


//                     </div>


//                 </div>
//             ))}

//             <div className="h-[10vh] ">

//             </div>
//         </>
//     );
// }

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

                            <button
                                onClick={() => navigate("/feedback")}
                                //className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-accent transition"
                                className=" px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-medium rounded-lg hover:shadow-lg hover:scale-102 transition-all duration-300 flex items-center gap-2 justify-center whitespace-nowrap"

                            >
                                Add Feedback
                            </button>
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
