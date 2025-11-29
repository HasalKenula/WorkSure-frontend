import Navbar from "../components/NavBar";
import { FaUserCircle, FaStar } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import React from 'react';

export default function UserFeedback() {
    const location = useLocation();
    const navigate = useNavigate();
    const workerData = location.state || { name: "Unknown Worker" };

    const gotoprofile = () => {
        navigate("/workerProfile");
    };

    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9",
    };

    const stars = Array(5).fill(0);
    const [currentValue, setCurrentValue] = React.useState(0);
    const [hoverValue, setHoverValue] = React.useState(undefined);

    const handleClick = (value) => setCurrentValue(value);
    const handleMouseOver = (value) => setHoverValue(value);
    const handleMouseLeave = () => setHoverValue(undefined);

    const userRate = [
        {
            id: 1,
            name: "John Doe",
            date: "2023/10/26",
            rating: 1,
            message:
                "Excellent work on the project, delivered ahead of schedule and with great attention to detail. Highly recommended!",
        },
        {
            id: 2,
            name: "John Doe",
            date: "2023/10/26",
            rating: 2,
            message:
                "Excellent work on the project, delivered ahead of schedule and with great attention to detail. Highly recommended!",
        },
        {
            id: 3,
            name: "John Doe",
            date: "2023/10/26",
            rating: 3,
            message:
                "Excellent work on the project, delivered ahead of schedule and with great attention to detail. Highly recommended!",
        },
        {
            id: 4,
            name: "John Doe",
            date: "2023/10/26",
            rating: 4,
            message:
                "Excellent work on the project, delivered ahead of schedule and with great attention to detail. Highly recommended!",
        },
    ];

    const middle = Math.ceil(userRate.length / 2);
    const column2 = userRate.slice(0, middle);
    const column3 = userRate.slice(middle);

    return (
        <div className="mt-19 flex flex-col items-center min-h-screen bg-[#e5e5e5] font-outfit">
            <Navbar />

            <h1 className="text-4xl font-bold text-primary mt-6 mb-4">
                USER RATING & FEEDBACK
            </h1>

            {/* MAIN BOX - RESPONSIVE */}
            <div className="w-[90%] min-h-screen flex flex-col lg:flex-row bg-white shadow-xl border border-gray-300 p-6 rounded-2xl gap-6">

                {/* PROVIDE FEEDBACK */}
                <div className="w-full lg:w-1/3 flex flex-col">
                    <p className="text-3xl font-semibold mt-4 ml-5">Provide Feedback</p>

                    <div className="flex flex-row items-center space-x-3 mt-6 ml-5">
                        <FaUserCircle className="text-8xl text-gray-700" />
                        <p className="text-2xl font-semibold">{workerData.name}</p>
                    </div>

                    <div className="flex flex-col mt-6 ml-5">
                        <p className="text-lg font-semibold text-gray-800">Your Rating :</p>
                        <div className="flex items-center mt-2 shrink-0">
                            {stars.map((_, index) => (
                                <FaStar
                                    key={index}
                                    size={30}
                                    className="mr-2 cursor-pointer"
                                    color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                                    onClick={() => handleClick(index + 1)}
                                    onMouseOver={() => handleMouseOver(index + 1)}
                                    onMouseLeave={handleMouseLeave}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col mt-8 ml-5 mr-6">
                        <p className="text-lg font-semibold text-gray-800">Detailed Feedback :</p>
                        <textarea
                            className="h-32 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mt-2"
                            placeholder="Write your feedback here..."
                        ></textarea>
                    </div>

                    <div className="flex flex-row space-x-6 mt-10 ml-5">
                        <button
                            onClick={gotoprofile}
                            className="text-lg font-semibold text-black border border-gray-400 rounded-xl shadow-md w-1/3 py-2 hover:bg-gray-200 transition-all duration-300"
                        >
                            Cancel
                        </button>

                        <button className="text-lg font-semibold bg-primary text-white rounded-xl shadow-md w-1/2 py-2 hover:bg-accent transition-all duration-300">
                            Submit Feedback
                        </button>
                    </div>
                </div>

                {/* PAST REVIEWS COLUMN 1 */}
                <div className="w-full lg:w-1/3 flex flex-col space-y-8">
                    <h1 className="font-semibold text-3xl ml-6 mt-2">Your Past Reviews</h1>

                    <div className="flex flex-col overflow-y-auto space-y-10 pr-2">
                        {column2.map((user) => (
                            <div key={user.id} className="flex flex-col p-4 border rounded-xl shadow-sm">
                                <div className="flex flex-row items-center mb-2">
                                    <FaUserCircle className="text-4xl mr-3" />
                                    <p className="font-semibold text-lg flex-1">{user.name}</p>
                                    <p className="text-sm text-gray-800">{user.date}</p>
                                </div>

                                <div className="flex items-center space-x-1 mb-2">
                                    {[...Array(user.rating)].map((_, i) => (
                                        <FaStar key={i} className="text-yellow-500 text-xl" />
                                    ))}
                                </div>

                                <p className="text-lg text-gray-800">{user.message}</p>
                                <div className="mt-2 h-px bg-gray-400 w-full"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* PAST REVIEWS COLUMN 2 */}
                <div className="w-full lg:w-1/3 flex flex-col space-y-8">
                    <h1 className="font-semibold text-3xl ml-6 mt-2"></h1>

                    <div className="flex flex-col overflow-y-auto space-y-10 pr-2">
                        {column3.map((user) => (
                            <div key={user.id} className="flex flex-col p-4 border rounded-xl shadow-sm">
                                <div className="flex flex-row items-center mb-2">
                                    <FaUserCircle className="text-4xl mr-3" />
                                    <p className="font-semibold text-lg flex-1">{user.name}</p>
                                    <p className="text-sm text-gray-800">{user.date}</p>
                                </div>

                                <div className="flex items-center space-x-1 mb-2">
                                    {[...Array(user.rating)].map((_, i) => (
                                        <FaStar key={i} className="text-yellow-500 text-xl" />
                                    ))}
                                </div>

                                <p className="text-lg text-gray-800">{user.message}</p>
                                <div className="mt-2 h-px bg-gray-400 w-full"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}