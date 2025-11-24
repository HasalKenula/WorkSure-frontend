import { IoStarSharp } from "react-icons/io5";
import Navbar from "../components/NavBar";

export default function WorkerDashBoard() {

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
            ratingText: "3.5",
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

    return (
        <div>
            <Navbar />
            <div className="w-full h-[1000px] lg:h-screen flex items-center justify-center  lg:pt-24 my-auto">
                <div className="w-full mx-auto flex flex-col  text-slate-400 lg:flex-row items-center justify-center gap-6 p-6">
                    <div className="flex-1 flex flex-col items-center justify-center gap-6 ">
                        <div className="w-[75%] flex-1 flex items-center shadow-xl gap-6 border border-slate-200 py-4 px-8  justify-between">
                            <div className="text-xl font-bold text-slate-500">
                                <h1>Number of completed works</h1>
                            </div>
                            <div className="text-5xl font-bold">
                                <h1>08</h1>
                            </div>
                        </div>
                        <div className="w-[75%] flex-1 flex items-center gap-6  shadow-xl border border-slate-200 border py-4 px-8  justify-between">
                            <div className="text-xl font-bold text-slate-500">
                                <h1>Number of On Going works</h1>
                            </div>
                            <div className="text-5xl font-bold">
                                <h1>08</h1>
                            </div>
                        </div>
                        <div className="w-[75%] flex-1 flex items-center gap-6 shadow-xl border border-slate-200 border py-4 px-8  justify-between">
                            <div className="text-xl font-bold text-slate-500">
                                <h1>Number of Pending Request</h1>
                            </div>
                            <div className="text-5xl font-bold">
                                <h1>08</h1>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center gap-18 ">
                        <div className="w-[75%] flex-1 flex-col  shadow-xl items-center justify-center gap-6  border  border-slate-200  py-4 px-8">
                            <div className="flex items-center justify-center  text-4xl font-bold pb-4">
                                <h1 className="text-slate-500">Total Earning</h1>
                            </div>
                            <div className="flex items-center justify-center text-5xl font-bold">
                                <h1>Rs. 200,000</h1>
                            </div>
                        </div>
                        <div className="w-[75%] flex-1 flex-col  shadow-xl items-center justify-center gap-6  border  border-slate-200 py-4 px-8">
                            <div className="flex items-center justify-center text-4xl font-bold pb-4">
                                <h1 className="text-slate-500">Rating</h1>
                            </div>
                            <div className="flex items-center justify-center text-primary text-xl">
                                <IoStarSharp />
                                <IoStarSharp />
                                <IoStarSharp />
                                <IoStarSharp />
                                <IoStarSharp />
                                <h1 className="text-slate-500">3.5</h1>
                            </div>
                            <div className="flex items-center justify-center text-xl">
                                <h1>(75 Reviews)</h1>
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
                                    <th class="border px-6 py-3 border-gray-300 text-left font-semibold">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user) => {
                                    return (
                                        <tr class="hover:bg-gray-50">
                                            <td class="border  border-gray-300 px-6 py-3">{user.Id}</td>
                                            <td class="border  border-gray-300 px-6 py-3">{user.Client}</td>
                                            <td class="border border-gray-300 px-6 py-3">{user.Date}</td>
                                            <td class="border border-gray-300 px-6 py-3">{user.Time}</td>
                                            <td class="border  border-gray-300 px-6 py-3">{user.Description}</td>
                                            <td class="border border-gray-300 px-6 py-3"><div className="flex items-center gap-3">
                                                <button className="px-3 py-1 bg-primary text-white rounded-lg border hover:bg-white hover:text-primary">
                                                    Confirm
                                                </button>
                                                <button className="px-3 py-1 bg-white text-primary rounded-lg hover:bg-primary border border-primary hover:text-white">
                                                    Cancel
                                                </button>
                                            </div></td>

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
                                    <th class="border px-6 py-3 border-gray-300 text-left font-semibold">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user) => {
                                    return (
                                        <tr class="hover:bg-gray-50">
                                            <td class="border  border-gray-300 px-6 py-3">{user.Id}</td>
                                            <td class="border  border-gray-300 px-6 py-3">{user.Client}</td>
                                            <td class="border border-gray-300 px-6 py-3">{user.Date}</td>
                                            <td class="border border-gray-300 px-6 py-3">{user.Time}</td>
                                            <td class="border  border-gray-300 px-6 py-3">{user.Description}</td>
                                            <td class="border border-gray-300 px-6 py-3"><div className="flex items-center gap-3">
                                                <button className="px-3 py-1 bg-primary text-white rounded-lg border hover:bg-white hover:text-primary">
                                                    Completed Work
                                                </button>

                                            </div></td>

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

            <div className=" w-full   flex  my-auto ">
                <div className="w-full mx-auto flex flex-col  gap-3 p-6">
                    <div className="px-6">
                        <h1 className="text-2xl font-bold ">User Reviews</h1>
                    </div>

                    <div className="flex flex-col lg:flex-row  flex-wrap items-center justify-center gap-6 ">
                        {workerReviews.map((comment) => {
                            return (
                                <div className="border border-slate-200 shadow-xl w-full lg:w-[40%] p-8 gap-6">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center justify-between ">
                                            <div className="w-[50px] aspect-square rounded-full bg-red-300 ">

                                            </div>
                                            <h1 className="font-bold text-xl px-4">{comment.name}</h1>
                                        </div>
                                        <h1>{comment.label}</h1>
                                    </div>
                                    <div className="flex items-center py-4 text-lg">
                                        {renderStars(comment.rating)}
                                        <h1 className="text-slate-500 px-2">{comment.ratingText}</h1>
                                    </div>
                                    <div>
                                        <p>{comment.review}
                                        </p>
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