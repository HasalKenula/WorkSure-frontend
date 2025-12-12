import React from 'react';
import Navbar from '../components/NavBar';
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from 'react-router-dom';
import toast from "react-hot-toast";
import MM from "../assets/man.jpg";
const WorkerRegistrationDetails = () => {

    const { workerId } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, jwtToken } = useAuth();


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



    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }
    const [workers, setWorkers] = useState({});
    async function loadWorkerDetails() {
        try {
            const response = await axios.get(
                `http://localhost:8081/worker/id/${workerId}`,
                config
            );
            setWorkers(response.data);
            toast.success("workers are loaded successfully");
        } catch (error) {
            toast.error("have error here not loaded workers");
        }
    }

    useEffect(function () {
        if (isAuthenticated) {

            loadWorkerDetails();
        }
    }, [isAuthenticated])

    function handleDownloadPDF(pdfUrl, fullName) {
        if (!pdfUrl) {
            toast.error("No PDF uploaded for this worker.");
            return;
        }

        // Create a temporary link element
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = `${fullName}_document.pdf`; // File name for download
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    async function handleToggleBlock(workerId) {
        try {
            await axios.put(`http://localhost:8081/worker/toggle-block/${workerId}`, {}, config);


            setWorkers(prev => ({
                ...prev,
                isBlocked: !prev.isBlocked
            }));

            toast.success("Worker status updated successfully");

        } catch (error) {

            toast.error("Failed to update worker status");
        }
    }

    return (
        <div className="bg-slate-100 min-h-screen">
            <Navbar />

            <div className="pt-20 p-4 flex justify-center">
                <div className="w-full max-w-5xl">

                    {/* Header Section */}
                    <div className="bg-white shadow-lg rounded-lg p-6 border-l-8 border-yellow-400">
                        <h1 className="text-3xl font-bold text-slate-900">
                            Worker Profile Overview
                        </h1>
                        <p className="text-slate-500 mt-1">
                            Review worker details before approval.
                        </p>
                    </div>

                    {/* Profile + Info Split */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

                        {/* Left Profile Card */}
                        <div className="bg-white shadow-xl rounded-xl p-6 border border-slate-200">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-62 h-62 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                                    <img src={workers.user?.imageUrl || MM} className="w-full h-full object-cover" alt="profile" />
                                </div>

                                <h2 className="text-xl font-bold text-slate-900">
                                    {workers.fullName}
                                </h2>
                                <p className="text-yellow-600 font-medium">
                                    {workers.jobRole}
                                </p>

                                <div className="mt-4 w-full">
                                    <div className="bg-slate-100 rounded-lg p-3 text-center">
                                        <span className="text-sm text-slate-600">NIC</span>
                                        <p className="font-semibold text-slate-900">{workers.nic}</p>
                                    </div>

                                    <div className="bg-slate-100 rounded-lg p-3 mt-3 text-center">
                                        <span className="text-sm text-slate-600">Phone</span>
                                        <p className="font-semibold text-slate-900">{workers.phoneNumber}</p>
                                    </div>

                                    <div className="bg-slate-100 rounded-lg p-3 mt-3 text-center">
                                        <span className="text-sm text-slate-600">Email</span>
                                        <p className="font-semibold text-slate-900">{workers.email}</p>
                                    </div>
                                </div>
                                <div className='mt-3 '>
                                    <button
                                        className="px-3 py-1 bg-white text-primary rounded-lg hover:bg-primary border border-primary hover:text-white"
                                        onClick={() => handleDownloadPDF(workers.pdfUrl, workers.fullName)}
                                    >
                                        Download PDF
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Details */}
                        <div className="md:col-span-2 space-y-6">

                            {/* Personal Info */}
                            <div className="bg-white shadow-xl rounded-xl p-6 border border-slate-200">
                                <h3 className="text-xl font-bold mb-3 text-slate-900 border-b pb-2 border-yellow-300">
                                    Personal Information
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-slate-500">Full Name</p>
                                        <p className="font-semibold">{workers.fullName}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500">Address</p>
                                        <p className="font-semibold">{workers.address}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500">Working Areas</p>
                                        <p className="font-semibold">{workers.preferredServiceLocation}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Working Schedule */}
                            <div className="bg-white shadow-xl rounded-xl p-6 border border-slate-200">
                                <h3 className="text-xl font-bold mb-3 text-slate-900 border-b pb-2 border-yellow-300">
                                    Working Schedule
                                </h3>

                                <ul className="list-disc ml-6 text-slate-800">
                                    {getWorkingDays(workers).map((day, i) => (
                                        <li key={i}>
                                            {day} — {workers.preferredStartTime} to {workers.preferredEndTime}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Certifications */}
                            <div className="bg-white shadow-xl rounded-xl p-6 border border-slate-200">
                                <h3 className="text-xl font-bold mb-3 text-slate-900 border-b pb-2 border-yellow-300">
                                    Certifications
                                </h3>

                                <ul className="space-y-3">
                                    {workers.certificates?.map((c, i) => (
                                        <li key={i} className="p-3 bg-slate-50 rounded border border-slate-200">
                                            <p className="font-semibold">{c.certificateName}</p>
                                            <p className="text-slate-600 text-sm">{c.issuingBody}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Experience */}
                            <div className="bg-white shadow-xl rounded-xl p-6 border border-slate-200">
                                <h3 className="text-xl font-bold mb-3 text-slate-900 border-b pb-2 border-yellow-300">
                                    Job Experiences
                                </h3>

                                <ul className="space-y-3">
                                    {workers.jobExperiences?.map((exp, i) => (
                                        <li key={i} className="p-3 bg-slate-50 rounded border border-slate-200">
                                            <p><b>Job Title:</b> {exp.jobTitle}</p>
                                            <p><b>Company:</b> {exp.companyName}</p>
                                            <p><b>Years:</b> {exp.years}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-8 justify-end">
                        <button type='button'
                            onClick={() => handleToggleBlock(workers.id)}
                            className={`px-3 py-1 rounded-lg border ${workers.isBlocked ? "bg-green-500 text-white" : "bg-red-500 text-white"}hover:opacity-80`}
                        >
                            {workers.isBlocked ? "Approve" : "Block"}
                        </button>

                        <button
                            className="px-6 py-2 border border-black text-black font-bold rounded-lg shadow hover:bg-slate-200"
                            onClick={() => navigate(-1)} 
                        >
                            Back
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerRegistrationDetails;

