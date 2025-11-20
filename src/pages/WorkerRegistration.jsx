import React from "react";
import Navbar from "../components/NavBar";

export default function WorkerRegistration() {
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

  return (
    <div>
        <Navbar/>
        <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center p-4 mt-18">
            <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
            Register as a Skilled Worker
            </h2>

            {/* Personal Information */}
            <section className="bg-gray-50 p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="border p-2 rounded" placeholder="Full Name" />
                <input className="border p-2 rounded" placeholder="Email Address" />
                <input className="border p-2 rounded" placeholder="Phone No" />
                <input className="border p-2 rounded" placeholder="Profession/Trade" />
                <input className="border p-2 rounded" placeholder="NIC No" />
                <input className="border p-2 rounded" placeholder="City" />
            </div>
            </section>

            {/* Certifications */}
            <section className="bg-gray-50 p-5 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold mb-4">Certifications & Qualifications</h3>
                <button
                onClick={addCertification}
                className="mt-0 px-3 py-1 bg-blue-600 text-white rounded-lg text-sm"
                aria-label="Add certification"
                >
                + Add Certification
                </button>
            </div>

            <div className="space-y-3">
                {certifications.map((item, index) => (
                <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center"
                >
                    <input
                    className="border p-2 rounded"
                    placeholder="Certification Name"
                    value={item.name}
                    onChange={(e) =>
                        handleCertificationChange(index, "name", e.target.value)
                    }
                    />
                    <div className="flex gap-2">
                    <input
                        className="flex-1 border p-2 rounded"
                        placeholder="Issuing Body"
                        value={item.body}
                        onChange={(e) =>
                        handleCertificationChange(index, "body", e.target.value)
                        }
                    />
                    {/* remove button */}
                    <button
                        onClick={() => removeCertification(index)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
                        aria-label={`Remove certification ${index + 1}`}
                    >
                        Remove
                    </button>
                    </div>
                </div>
                ))}
            </div>
            </section>

            {/* Work Experience */}
            <section className="bg-gray-50 p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Work Experience</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="border p-2 rounded" placeholder="Job Title" />
                <input className="border p-2 rounded" placeholder="Company" />
            </div>
            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-xl">
                Add Experience
            </button>
            </section>

            {/* Availability & Preferences */}
            <section className="bg-gray-50 p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Availability & Preferences</h3>
            <div className="flex flex-wrap gap-4">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <label key={day} className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span className="text-sm">{day}</span>
                </label>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <input className="border p-2 rounded" placeholder="Preferred Start Time" />
                <input className="border p-2 rounded" placeholder="Preferred End Time" />
                <input
                className="border p-2 rounded col-span-1 md:col-span-2"
                placeholder="Preferred Service Location"
                />
            </div>
            </section>

            {/* Documents Upload */}
            <section className="bg-gray-50 p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Documentation</h3>
            <div className="border border-dashed rounded-xl p-6 text-center">
                <p>Drag & drop your documents here, or click to upload.</p>
                <button className="mt-3 px-4 py-2 bg-gray-700 text-white rounded-xl">
                Browse Files
                </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">No files uploaded yet.</p>
            </section>

            {/* Register Button */}
            <button className="w-full bg-blue-600 text-white rounded-lg py-3 text-lg font-semibold">
            Register Account
            </button>
        </div>
        </div>
    </div>
  );
}
