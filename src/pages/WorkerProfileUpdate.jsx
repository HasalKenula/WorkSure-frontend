import React, { useState } from "react";
import Navbar from "../components/NavBar";

export default function WorkerRegistration() {
    //dummy data
    const worker = {
    name: 'Shehan Fernando',
    email: 'shh@gmail.com',
    phone: '021-7658904',
    address: 'Colombo, Sri Lanka',
    job: 'Painter',
    nic: '12345676',
    
    certifications: [
        {
            c_name: 'Diploma', body: 'University of Kelaniya'
        },
        {
            c_name : 'Degree', body: 'University of Pera'
        },
        {
            c_name : 'Certification', body: 'IIT'
        }
    ],

    experiences: [
        'Professional painter at Cultural department'
    ],
    locations:[
        'Kottawa','Piliyandala','Gampaha'
    ],
    documents: ['images.jpeg', 'icons8-location-48.png'],
    };

    const [name, setName] = useState(worker.name);
    const [email, setEmail] = useState(worker.email);
    const [no, setNo] = useState(worker.phone);
    const [job, setJob] = useState(worker.job);
    const [address, setAddres] = useState(worker.address);
    const [id, setId] = useState(worker.nic);

    // Certifications state (starts with one empty row)
    const [certs, setCerts] = React.useState(worker.certifications);

    // Add a new empty certification row
    const addCertification = () => {
        setCerts((prev) => [...prev, { c_name: "", body: "" }]);
    };

    // Update one field of a certification row
    const handleCertificationChange = (index, field, value) => {
        setCerts((prev) => {
            const copy = [...prev];
            copy[index] = { ...copy[index], [field]: value };
            return copy;
        });
    };

    // remove a certification row
    const removeCertification = (index) => {
        setCerts((prev) => prev.filter((_, i) => i !== index));
    };

    //
    const [experiences, setExperiences] = React.useState([
        { title: "", company: "" },
    ]);

    const addExperience = () => {
        setExperiences((prev) => [...prev, { title: "", company: "" }]);
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
    const [startTime, setStartTime] = React.useState(null);
    const [endTime, setEndTime] = React.useState(null);

    

  return (
    <div>
        <Navbar/>
        <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center p-4 mt-18">
            <div className="w-full max-w-4xl bg-white shadow-md rounded p-6 space-y-6">
                <h2 className="text-xl font-bold text-gray-800">
                Update Your Details
                </h2>

                {/* Personal Information */}
                <section className=" p-5 rounded shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input className="border border-gray-300 p-1 rounded text-sm focus:outline-1 focus:outline-primary" value={name}  onChange={(e) => setName(e.target.value)}/>
                        <input className="border border-gray-300 p-1 rounded text-sm focus:outline-1 focus:outline-primary" value={email}  onChange={(e) => setEmail(e.target.value)}/>
                        <input className="border border-gray-300 p-1 rounded text-sm focus:outline-1 focus:outline-primary" value={no}  onChange={(e) => setNo(e.target.value)}/>
                        <input className="border border-gray-300 p-1 rounded text-sm focus:outline-1 focus:outline-primary" value={address}  onChange={(e) => setAddres(e.target.value)}/>
                        <input className="border border-gray-300 p-1 rounded text-sm focus:outline-1 focus:outline-primary" value={job}  onChange={(e) => setJob(e.target.value)}/>
                        <input className="border border-gray-300 p-1 rounded text-sm focus:outline-1 focus:outline-primary" value={id}  onChange={(e) => setId(e.target.value)}/>
                    </div>
                </section>

                {/* Certifications */}
                <section className="p-5 rounded shadow-sm">
                    <div className="flex items-center justify-between ">
                        <h3 className="text-lg font-semibold mb-4">Certifications & Qualifications</h3>
                    </div>

                    <div className="space-y-3">
                        {certs.map((cert, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                <input className="border border-gray-300 p-1 rounded text-sm focus:outline-1 focus:outline-primary"  value={cert.c_name} onChange={(e) =>handleCertificationChange(index, "c_name", e.target.value)}/>
                                <div className="flex gap-2">
                                    <input className="flex-1 border border-gray-300 p-1 rounded text-sm focus:outline-1 focus:outline-primary"  value={cert.body} onChange={(e) =>handleCertificationChange(index, "body", e.target.value)}/>
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
                                <input className="border border-gray-300 p-1 rounded text-sm focus:outline-1 focus:outline-primary" placeholder="Job Title" value={item.title} onChange={(e) =>handleExperienceChange(index, "title", e.target.value)}/>
                                <div className="flex gap-2">
                                    <input className="flex-1 border border-gray-300 p-1 rounded text-sm focus:outline-1 focus:outline-primary" placeholder="Company" value={item.company} onChange={(e) =>handleExperienceChange(index, "company", e.target.value)}/>
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
                            <input type="checkbox" className="accent-gray-500"/>
                            <span className="text-sm">{day}</span>
                        </label>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <input  className="border border-gray-300 p-1 rounded text-sm focus:outline-1 focus:outline-primary" placeholder="Preferred Start Time" />
                        <input  className="border border-gray-300 p-1 rounded text-sm focus:outline-1 focus:outline-primary" placeholder="Preferred End Time" />
                        <input
                        className="border border-gray-300 p-1 rounded col-span-1 md:col-span-2 text-sm focus:outline-1 focus:outline-primary"
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
                        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange}/>

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
                <button className="w-full bg-primary text-white rounded py-1 text-md font-semibold hover:outline-2 hover:outline-offset-1 hover:outline-primary">
                    Register Account
                </button>
            </div>
        </div>
    </div>
  );
}
