import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
export default function WorkerRegistration() {
    const { jwtToken, isAuthenticated } = useAuth();


    // Certifications state (starts with one empty row)
    const [certifications, setCertifications] = React.useState([
        { name: "", body: "" },
    ]);

    // Add a new empty certification row
    const addCertification = () => {
        setCertifications((prev) => [...prev, { name: "", body: "" }]);
    };

    // Update one field of a certification row
    const handleCertificationChange = (index, field, value) => {
        setCertifications((prev) => {
            const copy = [...prev];
            copy[index] = { ...copy[index], [field]: value };
            return copy;
        });
    };

    // Optional: remove a certification row
    const removeCertification = (index) => {
        setCertifications((prev) => prev.filter((_, i) => i !== index));
    };

    //
    const [experiences, setExperiences] = React.useState([
        { title: "", company: "", years: "" },
    ]);

    const addExperience = () => {
        setExperiences((prev) => [...prev, { title: "", company: "", years: "" }]);
    };

    const handleExperienceChange = (index, field, value) => {
        setExperiences((prev) => {
            const copy = [...prev];
            copy[index] = { ...copy[index], [field]: value };
            return copy;
        });
    };

    const removeExperience = (index) => {
        setExperiences((prev) => prev.filter((_, i) => i !== index));
    };

    //
    const [uploadedFiles, setUploadedFiles] = React.useState([]);

    const fileInputRef = React.useRef(null);

    const handleBrowseClick = () => {
        fileInputRef.current.click(); // Open the hidden input
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setUploadedFiles((prev) => [...prev, ...files]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        setUploadedFiles((prev) => [...prev, ...files]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const removeFile = (index) => {
        setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    //
    // const [startTime, setStartTime] = React.useState(null);
    // const [endTime, setEndTime] = React.useState(null);

    const [days, setDays] = useState([]);

    const handleDayChange = (day) => {
        setDays((prev) =>
            prev.includes(day)
                ? prev.filter((d) => d !== day)
                : [...prev, day]
        );
    };

    const options = ["PLUMBER", "ELECTRICIAN", "CARPENTER", "PAINTER", "CLEANER"];


    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [NIC, setNIC] = useState("");
    const [address, setAddress] = useState("")
    const [job, setJob] = useState("");

    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [location, setLocation] = useState("");

    function handleFullname(event) {
        setFullname(event.target.value);
    }

    function handleEmail(event) {
        setEmail(event.target.value);
    }

    function handleContact(event) {
        setContact(event.target.value);
    }

    function handleNIC(event) {
        setNIC(event.target.value);
    }

    function handleAddress(event) {
        setAddress(event.target.value);
    }

    function handleJob(event) {
        setJob(event.target.value);
    }

    function handleStartTime(event) {
        setStartTime(event.target.value);
    }

    function handleEndTime(event) {
        setEndTime(event.target.value);
    }

    function handleLocation(event) {
        setLocation(event.target.value);
    }

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    const [userId, setUserId] = useState(null);


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


    async function handleSubmit() {
        if (!jwtToken) {
            alert("You must log in first.");
            return;
        }


        try {
            const response = await axios.post("http://localhost:8081/worker", {
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

                userId: userId,  // ✔ Add user ID

                certificates: certifications.map(c => ({
                    certificateName: c.name,
                    issuingBody: c.body
                })),

                jobExperiences: experiences.map(e => ({
                    companyName: e.company,
                    jobTitle: e.title,
                    years: Number(e.years)
                }))
            }, config)
            alert("Worker registered successfully");

        } catch (error) {
            console.log(error)
            alert("Worker not registered");
        }
    }


    return (
        <div>
            <Navbar />
            <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center p-4 mt-18">
                <div className="w-full max-w-4xl bg-white shadow-md rounded p-6 space-y-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        Register as a Skilled Worker
                    </h2>

                    {/* Personal Information */}
                    <section className=" p-5 rounded shadow-sm">
                        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" className="border border-gray-300 p-1 rounded text-sm focus:outline-1 focus:outline-primary" value={fullname} onChange={handleFullname} placeholder="Full Name" />
                            <input type="text" className="border border-gray-300 p-1 rounded text-sm focus:outline-1 focus:outline-primary" value={email} onChange={handleEmail} placeholder="Email Address" />
                            <input type="text" className="border border-gray-300 p-1 rounded text-sm focus:outline-1 focus:outline-primary" value={contact} onChange={handleContact} placeholder="Phone No" />
                            {/* <input className="border border-gray-300 p-1 rounded text-sm focus:outline-1 focus:outline-primary" placeholder="Profession/Trade" /> */}
                            <select value={job} onChange={handleJob} className="border border-gray-300 p-1 rounded text-sm focus:outline-1 focus:outline-primary">
                                <option value="">-- Choose a service --</option>
                                {options.map((option, idx) => (
                                    <option key={idx} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <input type="text" className="border border-gray-300 p-1 rounded text-sm focus:outline-1 focus:outline-primary" value={NIC} onChange={handleNIC} placeholder="NIC No" />
                            <input type="text" className="border border-gray-300 p-1 rounded text-sm focus:outline-1 focus:outline-primary" value={address} onChange={handleAddress} placeholder="Address" />
                        </div>
                    </section>

                    {/* Certifications */}
                    <section className="p-5 rounded shadow-sm">
                        <div className="flex items-center justify-between ">
                            <h3 className="text-lg font-semibold mb-4">Certifications & Qualifications</h3>
                        </div>

                        <div className="space-y-3">
                            {certifications.map((item, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                    <input className="border border-gray-300 p-1 rounded text-sm focus:outline-1 focus:outline-primary" placeholder="Certification Name" value={item.name} onChange={(e) => handleCertificationChange(index, "name", e.target.value)} />
                                    <div className="flex gap-2">
                                        <input className="flex-1 border border-gray-300 p-1 rounded text-sm focus:outline-1 focus:outline-primary" placeholder="Issuing Body" value={item.body} onChange={(e) => handleCertificationChange(index, "body", e.target.value)} />
                                        {/* remove button */}
                                        <button onClick={() => removeCertification(index)} className="px-3 py-1 bg-gray-300 text-white rounded text-sm hover:bg-gray-400" aria-label={`Remove certification ${index + 1}`}>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                            }
                        </div>

                        <div>
                            <button
                                onClick={addCertification}
                                className="mt-3 px-3 py-1 bg-primary text-white rounded text-sm hover:outline-2 hover:outline-offset-1 hover:outline-primary"
                                aria-label="Add certification"
                            >
                                + Add Certification
                            </button>
                        </div>
                    </section>

                    {/* Work Experience */}
                    <section className="p-5 rounded shadow-sm">
                        <div className="flex items-center justify-between ">
                            <h3 className="text-lg font-semibold mb-4">Work Experience</h3>
                        </div>

                        <div className="space-y-3">
                            {experiences.map((item, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                    <input className="border border-gray-300 p-1 rounded text-sm focus:outline-1 focus:outline-primary" placeholder="Job Title" value={item.title} onChange={(e) => handleExperienceChange(index, "title", e.target.value)} />
                                    <input className="border border-gray-300 p-1 rounded text-sm focus:outline-1 focus:outline-primary" placeholder="Company" value={item.company} onChange={(e) => handleExperienceChange(index, "company", e.target.value)} />

                                    <div className="flex gap-2">
                                        <input className="flex-1 border border-gray-300 p-1 rounded text-sm focus:outline-1 focus:outline-primary" placeholder="Years" value={item.years} onChange={(e) => handleExperienceChange(index, "years", e.target.value)} />
                                        {/* remove button */}
                                        <button onClick={() => removeExperience(index)} className="px-3 py-1 bg-gray-300 text-white rounded text-sm hover:bg-gray-400" aria-label={`Remove experience ${index + 1}`}>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                            }
                        </div>

                        <div>
                            <button
                                onClick={addExperience}
                                className="mt-3 px-3 py-1 bg-primary text-white rounded text-sm hover:outline-2 hover:outline-offset-1 hover:outline-primary"
                                aria-label="Add Experience"
                            >
                                + Add Experience
                            </button>
                        </div>
                    </section>

                    {/* Availability & Preferences */}
                    <section className=" p-5 rounded shadow-sm">
                        <h3 className="text-lg font-semibold mb-4">Availability & Preferences</h3>
                        <div className="flex flex-wrap gap-4">
                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                                <label key={day} className="flex items-center space-x-2">
                                    <input type="checkbox" checked={days.includes(day)} onChange={() => handleDayChange(day)} className="accent-gray-500" />
                                    <span className="text-sm">{day}</span>
                                </label>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <input type="time" className="border border-gray-300 p-1 rounded text-sm focus:outline-1 focus:outline-primary" value={startTime} onChange={handleStartTime} placeholder="Preferred Start Time" />
                            <input type="time" className="border border-gray-300 p-1 rounded text-sm focus:outline-1 focus:outline-primary" value={endTime} onChange={handleEndTime} placeholder="Preferred End Time" />
                            {/* <div className="flex flex-col">
                            <label className="text-sm mb-1">Preferred Start Time</label>
                            <ReactTimePicker
                                onChange={setStartTime}
                                value={startTime}
                                clearIcon={null}
                                clockIcon={null}
                                className=" rounded p-2"
                                disableClock={true}
                            />
                        </div> */}

                            {/* <div className="flex flex-col">
                            <label className="text-sm mb-1">Preferred End Time</label>
                            <ReactTimePicker
                                onChange={setEndTime}
                                value={endTime}
                                clearIcon={null}
                                clockIcon={null}
                                className=" rounded p-2"
                                disableClock={true}
                            />
                        </div> */}
                            <input
                                type="text"
                                className="border border-gray-300 p-1 rounded col-span-1 md:col-span-2 text-sm focus:outline-1 focus:outline-primary"
                                value={location}
                                onChange={handleLocation}
                                placeholder="Preferred Service Location"
                            />
                        </div>
                    </section>

                    {/* Documents Upload */}
                    <section className=" p-5 rounded shadow-sm">
                        <h3 className="text-lg font-semibold mb-4">Documentation</h3>
                        <div className="border border-dashed border-gray-300 rounded p-6 text-center text-sm "
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}>
                            <p>Please upload your NIC copy, Gramaniladari Certificate, Police Report and Other necessary certifications and documents</p>
                            <p>Drag & drop your documents here, or click to upload.</p>
                            <button type="button" onClick={handleBrowseClick} className="mt-3 px-4 py-2 bg-gray-300 text-white rounded text-sm hover:bg-gray-400">
                                Browse Files
                            </button>
                            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />

                            {/* uploaded files display */}
                            {uploadedFiles.length > 0 && (
                                <div className="mt-4 text-left space-y-2">
                                    {uploadedFiles.map((file, index) => (
                                        <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                                            <span className="text-sm text-gray-500 truncate">{file.name}</span>
                                            <button onClick={(e) => {
                                                e.stopPropagation();
                                                removeFile(index);
                                            }}
                                                className="text-red-500 text-sm hover:underline"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* File Count */}
                        <p className="text-sm text-gray-600 mt-2">
                            {uploadedFiles.length === 0
                                ? "No files uploaded yet."
                                : `${uploadedFiles.length} file(s) uploaded`}
                        </p>
                    </section>

                    {/* Register Button */}
                    <button type="button" onClick={handleSubmit} className="w-full bg-primary text-white rounded py-1 text-md font-semibold hover:outline-2 hover:outline-offset-1 hover:outline-primary">
                        Register Account
                    </button>
                </div>
            </div>
        </div>
    );
}
