import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
//import { format } from "date-fns";
import Navbar from "../components/NavBar";

export default function WorkerHire() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  // Sample booked time slots for demo
  const bookedSlots = [
    "09:00 AM - 02:00 PM",
    "04:00 PM - 06:00 PM",
  ];

  const handleSubmit = () => {
    alert("Job Request Sent!");
  };

  return (
    <div>
        <Navbar/>
        <div className="min-h-screen p-4 mt-10 md:p-10">
            <div className="max-w-5xl mx-auto">

                {/* Worker Header Card */}
                <div className="p-6 mb-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">

                        <div className="flex items-center gap-8">
                            <img
                                src="profile_img.jpeg"
                                className="w-30 h-30 rounded-full object-cover"
                                alt="profile"
                            />
                            <div>
                                <h2 className="text-2xl font-semibold">Eva Adams</h2>
                                <p className="text-gray-600 font-semibold">Plumber</p>
                                <p className="text-gray-500">Colombo</p>
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
                        <div className="p-4">
                            <h4 className="font-semibold mb-2">
                                {(selectedDate, "dd MMMM yyyy")}
                            </h4>

                            {bookedSlots.map((slot, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between border-b border-gray-300 py-2 text-sm"
                                >
                                    <span>{slot}</span>
                                    <span className="text-red-500 font-semibold">Booked</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Job Request Form */}
                <div className="p-6 mb-10">

                    {/* Date */}
                    <div className="mb-4">
                        <label className="font-medium">Date :</label>
                        <input
                            type="text"
                            value={(selectedDate, "dd MMMM yyyy")}
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
                        ></textarea>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col md:flex-row gap-4 mt-6">
                        <button
                            onClick={handleSubmit}
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
    </div>
  );
}
