import Navbar from "../components/NavBar";
import MM from "../assets/man.jpg";
import { IoLocationSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
export default function WorkerProfileView() {
    const { jwtToken, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [worker, setWorker] = useState(null);

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        },
    }


    useEffect(() => {
        if (!jwtToken) return;

        axios
            .get("http://localhost:8081/user", {
                headers: { Authorization: `Bearer ${jwtToken}` },
            })
            .then((res) => {

                setUserId(res.data.id);


            })
            .catch(() => setLoading(false));


    }, [jwtToken]);

    async function getWorkers() {
        try {
            const response = await axios.get(`http://localhost:8081/worker/${userId}`, config);
            setWorker(response.data);
        } catch (error) {
            console.log("error to load the correct worker according to the id");
            console.log("Error loading worker:", error);
        }
    }


    //  useEffect(function () {
    //     if (isAuthenticated) {
    //         getWorkers();

    //     }
    // }, [isAuthenticated])
    useEffect(() => {
        if (isAuthenticated && userId) {
            getWorkers();
        }
    }, [isAuthenticated, userId]);



    const p = {
        name: "Eva Adams",
    }
    const goToFeedback = () => {
        navigate("/feedback", { state: p });
    };


    const userRate = [
        {
            id: 1,
            name: "John Doe",
            date: "2023/10/26",
            rating: 5,
            message:
                "Excellent work on the project, delivered ahead of schedule and with great attention to detail. Highly recommended!"

        },

        {
            id: 2,
            name: "John Doe",
            date: "2023/10/26",
            rating: 5,
            message:
                "Excellent work on the project, delivered ahead of schedule and with great attention to detail. Highly recommended!"

        },
        {
            id: 3,
            name: "John Doe",
            date: "2023/10/26",
            rating: 5,
            message:
                "Excellent work on the project, delivered ahead of schedule and with great attention to detail. Highly recommended!"

        },

    ];



    const profile = worker ? [
        {

            // name: worker.fullName,
            // position: worker.jobRole,
            rating: 5,
            location: " Colombo",
            workingArea: [

                " Colombo",
                " Dehiwela",
                "MountLavinia",
                "Nugegoda",
            ],
            workingDays: [
                "Monday  -  Saturday",
                "8.00AM - 6.00PM"
            ],
            skills: [
                "Pipe installation and repair",
                "Leak detaction and fixing",
                "Water heater maintenance",
                "Bathroom and kitchen plumbing",
                "Drain cleanin and blokage removal",
                "PVC, PEX, and copper pipe fitting",

            ],

            certification: [
                "NVQ Level 4 in Plumbing Technology",
                "Certified Water System Installer - National Vocational Training Institute",
                "Occuptional Safety & Health (OSH) Certificate",


            ],

        }
    ] : [];

    // Converts boolean day fields into an array of strings
    const getWorkingDays = (worker) => {
        if (!worker) return [];
        const days = [];
        if (worker.mon) days.push("Monday");
        if (worker.tue) days.push("Tuesday");
        if (worker.wed) days.push("Wednesday");
        if (worker.thu) days.push("Thursday");
        if (worker.fri) days.push("Friday");
        if (worker.sat) days.push("Saturday");
        if (worker.sun) days.push("Sunday");
        return days;
    };


    return (

        <>
            {profile.map((prof) => (
                <div className="mt-20 flex justify-center items-center min-h-screen font-outfit relative overflow-hidden  ">{/*full page*/}

                    <Navbar />

                    {/*middle box*/}
                    <div className="shadow-2xl w-[85%] h-[200vh] flex flex-col gap-3.5 rounded-2xl mt-6  bg-white/10 backdrop-blur-xl">

                        {/*profile*/}
                        <div className=" h-[40vh] flex flex-row space-x-25">

                            {/*image*/}
                            <div className=" w-1/4  flex justify-center items-center ">
                                <div className="w-62 h-62 rounded-full  overflow-hidden border-4 border-primary shadow-lg">
                                    <img src={MM} className="w-full h-full object-cover " alt="mm" />
                                </div>
                            </div>


                            {/*image-details*/}
                            <div className=" w-3/4">
                                <div className="  h-full flex flex-col space-y-5 p-6 ">

                                    <div className="flex flex-col space-y-0.5 ">
                                        <p className="text-4xl font-bold">
                                            {worker.fullName}
                                        </p>
                                        <p className=" font-bold text-primary text-xl">
                                            {worker.jobRole}
                                        </p>
                                    </div>
                                    <div className="flex flex-row items-center space-x-1.5">
                                        <IoLocationSharp className="text-2xl " />
                                        <p className="text-lg font-medium ">
                                            {worker.address}
                                        </p>
                                    </div>


                                    <div className="flex flex-row space-x-1 items-center">
                                        {[...Array(prof.rating)].map((_, i) => (
                                            <FaStar className="text-yellow-500 text-xl" />
                                        ))}
                                        <p className="px-1.5 text-lg flex items-center">
                                            <span className="font-bold">5.0</span>
                                            <span className="text-gray-600 ml-1"> (75 Reviews)</span>
                                        </p>
                                    </div>
                                    <button className="px-6 py-3 text-lg font-semibold bg-primary text-white rounded shadow-md hover:bg-accent hover:scale-105 hover:shadow-xl transition-all duration-300 w-1/3">Hire Now</button>

                                </div>
                            </div>

                        </div>

                        {/*2 box*/}
                        <div className=" border-solid h-[160vh] flex flex-row">
                            {/*skills,work day,hour ,certification*/}
                            <div className="  w-[30%] flex flex-col space-x-8 gap-1.5">
                                {/* work area */}
                                <div className=" h-[40vh]">
                                    <div className=" h-[65%] p-6 flex flex-col space-y-3.5 ">
                                        <div className="flex items-center space-x-3 text-xl font-medium">
                                            <div className="flex-1 h-px bg-gray-400"></div>
                                            <p className="text-xl font-bold font-inter text-primary text-stroke  ">WORKING AREA</p>
                                            <div className="flex-1 h-px bg-gray-400"></div>
                                        </div>



                                        <ul className="list-disc pl-5 space-y-1 text-gray-800 text-lg font-sans">


                                            <li>{worker.preferredServiceLocation}</li>


                                        </ul>

                                    </div>
                                </div>

                                {/*work days*/}
                                {/* <div className=" h-[30vh]">
                                    <div className=" p-6 flex flex-col space-y-3.5">
                                        <div className="flex items-center space-x-3 text-xl font-medium">
                                            <div className="flex-1 h-px bg-gray-400"></div>
                                            <p className="text-xl font-bold font-inter text-primary text-stroke  ">WORKING DAYS</p>
                                            <div className="flex-1 h-px bg-gray-400"></div>
                                        </div>

                                        <ul className="list-disc pl-5 space-y-1 text-gray-800 text-lg font-sans">

                                            {prof.workingDays.map((day, index) => (
                                                <li key={index}>{day}</li>
                                            ))}
                                        </ul>

                                    </div>
                                </div> */}

                                {/*work days*/}
                                <div className="h-[30vh]">
                                    <div className="p-6 flex flex-col space-y-3.5">
                                        <div className="flex items-center space-x-3 text-xl font-medium">
                                            <div className="flex-1 h-px bg-gray-400"></div>
                                            <p className="text-xl font-bold font-inter text-primary text-stroke">WORKING DAYS</p>
                                            <div className="flex-1 h-px bg-gray-400"></div>
                                        </div>

                                        <ul className="list-disc pl-5 space-y-1 text-gray-800 text-lg font-sans">
                                            {worker &&
                                                getWorkingDays(worker).map((day, index) => (
                                                    <li key={index}>
                                                        {day} ({worker.preferredStartTime} - {worker.preferredEndTime})
                                                    </li>
                                                ))}
                                        </ul>

                                    </div>
                                </div>


                                {/*skills*/}
                                {/* <div className=" h-[60vh]">
                                    <div className=" p-6 flex flex-col space-y-3.5">
                                        <div className="flex items-center space-x-3 text-xl font-medium">
                                            <div className="flex-1 h-px bg-gray-400"></div>
                                            <p className="text-xl font-bold font-inter text-primary text-stroke  ">SKILLS</p>
                                            <div className="flex-1 h-px bg-gray-400"></div>
                                        </div>

                                        <ul className="list-disc pl-5 space-y-1 text-gray-800 text-lg font-sans">

                                            {worker.jobExperiences.map((skills, index) => (
                                                <li key={index}>
                                                    <strong>Job Title:</strong> {skills.jobTitle} <br />
                                                    <strong>Company:</strong> {skills.companyName} <br />
                                                    <strong>Years:</strong> {skills.years} <br /> <br />
                                                </li>
                                            ))}
                                        </ul>

                                    </div>

                                </div> */}

                                {/*Certification */}
                                <div className=" h-[60vh]">
                                    <div className=" p-6 flex flex-col space-y-3.5 ">
                                        <div className="flex items-center space-x-3 text-xl font-medium">
                                            <div className="flex-1 h-px bg-gray-400"></div>
                                            <p className="text-xl font-bold font-inter text-primary text-stroke  ">CERTIFICATIONS</p>
                                            <div className="flex-1 h-px bg-gray-400"></div>
                                        </div>

                                        <ul className="list-disc pl-5 space-y-1 text-gray-800 text-lg font-sans">

                                            {worker.certificates.map((certification, index) => (
                                                <li key={index}>
                                                    <strong>certificateName:</strong> {certification.certificateName} <br />

                                                    <strong>issuingBody:</strong> {certification.issuingBody} <br /> <br />
                                                </li>
                                            ))}

                                        </ul>

                                    </div>
                                </div>
                            </div>



                            {/*experoience user rating*/}
                            <div className=" w-[70%] flex flex-col gap-2.5 ">

                                {/*experience*/}
                                <div className=" h-[54vh]">
                                    <div className=" p-6 flex flex-col space-y-3.5  ">
                                        <div className="flex items-center space-x-3 text-xl font-medium mr-95.5 ">
                                            <div className="flex-1 h-px bg-gray-400"></div>
                                            <p className="text-xl font-bold font-inter text-primary text-stroke  ">EXPERIENCE</p>
                                            <div className="flex-1 h-px bg-gray-400"></div>
                                        </div>

                                        <div className=" pl-4  flex-1 flex-col space-y-5.5 ">
                                            <div>
                                                {worker.jobExperiences.map((skills, index) => (
                                                    <li key={index}>
                                                        <strong>Job Title:</strong> {skills.jobTitle} <br />
                                                        <strong>Company:</strong> {skills.companyName} <br />
                                                        <strong>Years:</strong> {skills.years} <br /> <br />
                                                    </li>
                                                ))}
                                            </div>

                                        </div>

                                    </div>
                                </div>

                                {/*rating*/}
                                <div className=" flex flex-col h-[150vh]">
                                    <div className=" p-6 flex flex-col space-y-3.5  ">
                                        <div className="flex items-center space-x-3 text-xl font-medium mr-95.5 ">
                                            <div className="flex-1 h-px bg-gray-400"></div>
                                            <p className="text-xl font-bold font-inter text-primary text-stroke  ">USER RATING</p>
                                            <div className="flex-1 h-px bg-gray-400 "></div>
                                        </div>

                                        <div className="  flex flex-col   h-full">
                                            {/*Jphn doe 1 */}
                                            {
                                                userRate.map((user) => (

                                                    <div key={user.id} className="   h-[25vh] flex flex-col">
                                                        <div className=" h-[8vh] flex flex-row justify-center items-center ">
                                                            <FaUserCircle className=" w-1/15 text-4xl " ></FaUserCircle>

                                                            <p className=" w-1/2 font-semibold  text-lg ">{user.name}</p>
                                                            <p className="b w-1/3 text-sm font-sans text-gray-800">{user.date}</p>
                                                        </div>
                                                        <div className=" h-[4vh]">
                                                            <div className="flex flex-row space-x-1 items-center pl-10">
                                                                {[...Array(user.rating)].map((_, i) => (
                                                                    <FaStar className="text-yellow-500 text-xl" />
                                                                ))}

                                                            </div>
                                                        </div>

                                                        <div className=" h-[13vh] pl-10  text-lg font-sans text-gray-800">
                                                            <p>{user.message}</p>
                                                            <div className="mt-2 flex-1 h-px bg-gray-400 "></div>
                                                        </div>


                                                    </div>

                                                ))}



                                        </div>

                                    </div>

                                </div>
                                <div className="h-[30vh] pl-80 ">
                                    <button onClick={goToFeedback} className=" px-1 py-1 text-lg font-semibold bg-primary text-white rounded-2xl shadow-md hover:bg-accent hover:scale-105 hover:shadow-xl transition-all duration-300 w-1/4">Add Feedback</button>
                                </div>

                            </div>

                        </div>


                    </div>


                </div>
            ))}

            <div className="h-[10vh] ">

            </div>
        </>
    );
}

