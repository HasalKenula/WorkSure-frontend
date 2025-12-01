
import Navbar from "../components/NavBar";
import MM from "../assets/man.jpg";
import { IoLocationSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function WorkerProfileView() {
    const navigate = useNavigate();
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



    const profile = [
        {

            name: "Eva Adams",
            position: "Plumber",
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
    ]


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
                                            {prof.name}
                                        </p>
                                        <p className=" font-bold text-primary text-xl">
                                            {prof.position}
                                        </p>
                                    </div>
                                    <div className="flex flex-row items-center space-x-1.5">
                                        <IoLocationSharp className="text-2xl " />
                                        <p className="text-lg font-medium ">
                                            {prof.location}
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
                                {/* workk area */}
                                <div className=" h-[40vh]">
                                    <div className=" h-[65%] p-6 flex flex-col space-y-3.5 ">
                                        <div className="flex items-center space-x-3 text-xl font-medium">
                                            <div className="flex-1 h-px bg-gray-400"></div>
                                            <p className="text-xl font-bold font-inter text-primary text-stroke  ">WORKING AREA</p>
                                            <div className="flex-1 h-px bg-gray-400"></div>
                                        </div>



                                        <ul className="list-disc pl-5 space-y-1 text-gray-800 text-lg font-sans">

                                            {
                                                prof.workingArea.map((area, index) => (
                                                    <li key={index}>{area}</li>
                                                ))
                                            }
                                        </ul>

                                    </div>
                                </div>

                                {/*work days*/}
                                <div className=" h-[30vh]">
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
                                </div>

                                {/*skills*/}
                                <div className=" h-[60vh]">
                                    <div className=" p-6 flex flex-col space-y-3.5">
                                        <div className="flex items-center space-x-3 text-xl font-medium">
                                            <div className="flex-1 h-px bg-gray-400"></div>
                                            <p className="text-xl font-bold font-inter text-primary text-stroke  ">SKILLS</p>
                                            <div className="flex-1 h-px bg-gray-400"></div>
                                        </div>

                                        <ul className="list-disc pl-5 space-y-1 text-gray-800 text-lg font-sans">

                                            {prof.skills.map((skills, index) => (
                                                <li key={index}>{skills}</li>
                                            ))}
                                        </ul>

                                    </div>

                                </div>

                                {/*Certification */}
                                <div className=" h-[60vh]">
                                    <div className=" p-6 flex flex-col space-y-3.5 ">
                                        <div className="flex items-center space-x-3 text-xl font-medium">
                                            <div className="flex-1 h-px bg-gray-400"></div>
                                            <p className="text-xl font-bold font-inter text-primary text-stroke  ">CERTIFICATIONS</p>
                                            <div className="flex-1 h-px bg-gray-400"></div>
                                        </div>

                                        <ul className="list-disc pl-5 space-y-1 text-gray-800 text-lg font-sans">

                                            {prof.certification.map((certification, index) => (
                                                <li key={index}>{certification}</li>
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
                                                <p className="text-lg font-sans font-semibold">Senior Plumber - AquaFix Services (2020 - Present)</p>
                                                <ul className="list-disc pl-5 space-y-1 text-gray-800 text-lg font-sans">
                                                    <li>Handles Residential and Commercial Plumbing Projects</li>
                                                    <li>Leads a team of 3 junior plumbers</li>
                                                    <li>Completed over 250 service calls with 100% client satisfication</li>
                                                    <li>Successfully completed 250+ service calls with high customer satisfaction</li>


                                                </ul>
                                            </div>
                                            <div>
                                                <p className="text-lg font-sans font-semibold">Assistant Plumber - PipePro Lanka (2017 -2020)</p>
                                                <ul className="list-disc pl-5 space-y-1 text-gray-800 text-lg font-sans">
                                                    <li>Assisted in installation of water and drainge systems</li>
                                                    <li>Specialized in bathroom fitting and water pressure testing</li>
                                                    <li>Maintained job site cleanliness and ensured safety compliance</li>


                                                </ul>
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