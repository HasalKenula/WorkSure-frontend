import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import uploadFile from "../utils/meadiaUpload";
import api from '../api/axios'

export default function WorkerProfileUpdate() {
    const { jwtToken, isAuthenticated } = useAuth();

    const [userId, setUserId] = useState(null);
    const [worker, setWorker] = useState(null);
    const [loading, setLoading] = useState(true);

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
    };

    const fileInputRef = useRef(null);

    // --- Form states ---
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [NIC, setNIC] = useState("");
    const [address, setAddress] = useState("");
    const [job, setJob] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [location, setLocation] = useState("");
    const [days, setDays] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [pdf, setPdf] = useState(null);

    const options = ["PLUMBER", "ELECTRICIAN", "CARPENTER", "PAINTER", "CLEANER"];

    useEffect(() => {
        if (!jwtToken) return;

        api
            .get("/user", config)
            .then((res) => setUserId(res.data.id))
            .catch(() => setLoading(false));
    }, [jwtToken]);

    useEffect(() => {
        async function getWorkerByUserId() {
            if (!userId) return;

            try {
                const response = await api.get(`/worker/${userId}`, config);
                setWorker(response.data);
                populateForm(response.data);
                setLoading(false);
            } catch {
                setLoading(false);
            }
        }

        if (isAuthenticated && userId) {
            getWorkerByUserId();
        }
    }, [isAuthenticated, userId]);

    const populateForm = (data) => {
        setFullname(data.fullName || "");
        setEmail(data.email || "");
        setContact(data.phoneNumber || "");
        setNIC(data.nic || "");
        setAddress(data.address || "");
        setJob(data.jobRole || "");
        setStartTime(data.preferredStartTime || "");
        setEndTime(data.preferredEndTime || "");
        setLocation(data.preferredServiceLocation || "");
        setDays([
            data.mon && "Mon",
            data.tue && "Tue",
            data.wed && "Wed",
            data.thu && "Thu",
            data.fri && "Fri",
            data.sat && "Sat",
            data.sun && "Sun",
        ].filter(Boolean));

        setCertifications(
            data.certificates?.map(c => ({
                name: c.certificateName,
                body: c.issuingBody
            })) || [{ name: "", body: "" }]
        );

        setExperiences(
            data.jobExperiences?.map(e => ({
                title: e.jobTitle,
                company: e.companyName,
                years: e.years
            })) || [{ title: "", company: "", years: "" }]
        );

        if (data.pdfUrl) {
            setUploadedFiles([{ name: data.pdfUrl.split("/").pop() }]);
        }
    };

    const handleDayChange = (day) => {
        setDays(prev =>
            prev.includes(day)
                ? prev.filter(d => d !== day)
                : [...prev, day]
        );
    };

    const addCertification = () =>
        setCertifications(prev => [...prev, { name: "", body: "" }]);

    const removeCertification = (index) =>
        setCertifications(prev => prev.filter((_, i) => i !== index));

    const handleCertificationChange = (index, field, value) => {
        setCertifications(prev => {
            const copy = [...prev];
            copy[index][field] = value;
            return copy;
        });
    };

    const addExperience = () =>
        setExperiences(prev => [...prev, { title: "", company: "", years: "" }]);

    const removeExperience = (index) =>
        setExperiences(prev => prev.filter((_, i) => i !== index));

    const handleExperienceChange = (index, field, value) => {
        setExperiences(prev => {
            const copy = [...prev];
            copy[index][field] = value;
            return copy;
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploadedFiles([file]);
        setPdf(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (!file) return;
        setUploadedFiles([file]);
        setPdf(file);
    };

    const handleDragOver = (e) => e.preventDefault();
    const handleBrowseClick = () => fileInputRef.current.click();

    const handleSubmit = async () => {
        if (!jwtToken) {
            toast.error("You must log in first.");
            return;
        }

        let pdfUrl = worker?.pdfUrl || "";

        if (pdf) {
            try {
                pdfUrl = await uploadFile(pdf);
            } catch {
                toast.error("PDF upload failed.");
                return;
            }
        }

        try {
            await api.put(`/worker/${worker.id}`, {
                fullName: fullname,
                email,
                phoneNumber: contact,
                nic: NIC,
                address,
                jobRole: job,
                preferredStartTime: startTime,
                preferredEndTime: endTime,
                preferredServiceLocation: location,
                mon: days.includes("Mon"),
                tue: days.includes("Tue"),
                wed: days.includes("Wed"),
                thu: days.includes("Thu"),
                fri: days.includes("Fri"),
                sat: days.includes("Sat"),
                sun: days.includes("Sun"),
                pdfUrl,
                certificates: certifications.map(c => ({
                    certificateName: c.name,
                    issuingBody: c.body
                })),
                jobExperiences: experiences.map(e => ({
                    companyName: e.company,
                    jobTitle: e.title,
                    years: Number(e.years)
                }))
            }, config);

            toast.success("Profile updated successfully!");
        } catch {
            toast.error("Update failed!");
        }
    };

    if (loading) return <p className="mt-24 text-center">Loading...</p>;
    if (!worker) return <p className="mt-24 text-center">No worker profile found.</p>;

    return (
        <div>
            <Navbar />

            <div className="min-h-screen bg-gray-100 flex justify-center mt-20 px-4">
                <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-4 sm:p-6 space-y-6">

                    <h2 className="text-xl font-bold text-gray-800 text-center sm:text-left">
                        Update Worker Profile
                    </h2>

                    {/* Personal Info */}
                    <section>
                        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder="Full Name" className="border p-2 rounded w-full" />
                            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border p-2 rounded w-full" />
                            <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Phone No" className="border p-2 rounded w-full" />
                            <input value={NIC} onChange={(e) => setNIC(e.target.value)} placeholder="NIC" className="border p-2 rounded w-full" />
                            <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="border p-2 rounded w-full md:col-span-2" />

                            <select value={job} onChange={(e) => setJob(e.target.value)} className="border p-2 rounded w-full md:col-span-2">
                                <option value="">-- Choose Service --</option>
                                {options.map((opt, idx) => (
                                    <option key={idx} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                    </section>

                    {/* Certifications */}
                    <section>
                        <h3 className="text-lg font-semibold mb-4">Certifications</h3>

                        {certifications.map((c, i) => (
                            <div key={i} className="flex flex-col sm:flex-row gap-2 mb-2">
                                <input value={c.name} onChange={(e) => handleCertificationChange(i, "name", e.target.value)} placeholder="Name" className="border p-2 rounded flex-1" />
                                <input value={c.body} onChange={(e) => handleCertificationChange(i, "body", e.target.value)} placeholder="Issuing Body" className="border p-2 rounded flex-1" />
                                <button onClick={() => removeCertification(i)} className="bg-red-500 text-white px-3 py-2 rounded w-full sm:w-auto">Remove</button>
                            </div>
                        ))}

                        <button onClick={addCertification} className="bg-primary text-white px-4 py-2 rounded">
                            + Add Certification
                        </button>
                    </section>

                    {/* Experiences */}
                    <section>
                        <h3 className="text-lg font-semibold mb-4">Work Experience</h3>

                        {experiences.map((e, i) => (
                            <div key={i} className="flex flex-col sm:flex-row gap-2 mb-2">
                                <input value={e.title} onChange={(ev) => handleExperienceChange(i, "title", ev.target.value)} placeholder="Job Title" className="border p-2 rounded flex-1" />
                                <input value={e.company} onChange={(ev) => handleExperienceChange(i, "company", ev.target.value)} placeholder="Company" className="border p-2 rounded flex-1" />
                                <input value={e.years} onChange={(ev) => handleExperienceChange(i, "years", ev.target.value)} placeholder="Years" className="border p-2 rounded flex-1" />
                                <button onClick={() => removeExperience(i)} className="bg-red-500 text-white px-3 py-2 rounded w-full sm:w-auto">Remove</button>
                            </div>
                        ))}

                        <button onClick={addExperience} className="bg-primary text-white px-4 py-2 rounded">
                            + Add Experience
                        </button>
                    </section>

                    {/* Availability */}
                    <section>
                        <h3 className="text-lg font-semibold mb-4">Availability & Preferences</h3>

                        <div className="flex flex-wrap gap-3 mb-3">
                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                                <label key={day} className="flex items-center gap-1 text-sm">
                                    <input type="checkbox" checked={days.includes(day)} onChange={() => handleDayChange(day)} />
                                    {day}
                                </label>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="border p-2 rounded" />
                            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="border p-2 rounded" />
                            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Preferred Service Location" className="border p-2 rounded sm:col-span-2" />
                        </div>
                    </section>

                    {/* Documents */}
                    <section>
                        <h3 className="text-lg font-semibold mb-4">Documents</h3>

                        <div
                            className="border border-dashed p-6 text-center rounded cursor-pointer"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onClick={handleBrowseClick}
                        >
                            <p className="text-sm sm:text-base">Upload PDF or Images</p>

                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                                accept="application/pdf,image/*"
                            />

                            {uploadedFiles.length > 0 && (
                                <div className="mt-2 text-sm">
                                    <span>{uploadedFiles[0].name}</span>
                                    <button
                                        onClick={() => {
                                            setUploadedFiles([]);
                                            setPdf(null);
                                        }}
                                        className="ml-2 text-red-500"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-primary text-white p-3 rounded text-lg"
                    >
                        Update Profile
                    </button>

                </div>
            </div>
        </div>
    );
}