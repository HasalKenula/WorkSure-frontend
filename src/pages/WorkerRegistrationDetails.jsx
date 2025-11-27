import React from 'react';
import Navbar from '../components/NavBar';

const WorkerRegistrationDetails = () => {
  const worker = {
    name: 'Shehan Fernando',
    email: 'shh@gmail.com',
    phone: '021-7658904',
    address: 'Colombo, Sri Lanka',
    job: 'Painter',
    nic: '12345676',
    
    certifications: [
      'Diploma - University of Kelaniya',
      'Degree - University of Pera',
    ],
    experiences: [
        'Professional painter at Cultural department'
    ],
    locations:[
        'Kottawa','Piliyandala','Gampaha'
    ],
    documents: ['images.jpeg', 'icons8-location-48.png'],
  };

  return (
    <div>
        <Navbar/>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 mt-12">
            <div className="w-full max-w-4xl bg-white rounded shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Worker Information</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 table-auto text-sm">
                        <tbody>
                            <tr className="bg-gray-50 hover:bg-gray-100 border-b border-gray-300">
                                <th className="p-3 text-gray-600 font-semibold text-left w-1/3">Name</th>
                                <td className="p-3">{worker.name}</td>
                            </tr>
                            <tr className="hover:bg-gray-100 border-b border-gray-300">
                                <th className="p-3 text-gray-600 font-semibold text-left">Email</th>
                                <td className="p-3">{worker.email}</td>
                            </tr>
                            <tr className="bg-gray-50 hover:bg-gray-100 border-b border-gray-300">
                                <th className="p-3 text-gray-600 font-semibold text-left">Phone</th>
                                <td className="p-3">{worker.phone}</td>
                            </tr>
                            <tr className="hover:bg-gray-100 border-b border-gray-300">
                                <th className="p-3 text-gray-600 font-semibold text-left">Address</th>
                                <td className="p-3">{worker.address}</td>
                            </tr>
                            <tr className="bg-gray-50 hover:bg-gray-100 border-b border-gray-300">
                                <th className="p-3 text-gray-600 font-semibold text-left">NIC</th>
                                <td className="p-3">{worker.nic}</td>
                            </tr>
                            <tr className="hover:bg-gray-100 border-b border-gray-300">
                                <th className="p-3 text-gray-600 font-semibold text-left">Profession</th>
                                <td className="p-3">{worker.job}</td>
                            </tr>
                            <tr className="bg-gray-50 hover:bg-gray-100 border-b border-gray-300">
                                <th className="p-3 text-gray-600 font-semibold text-left">Working Areas</th>
                                <td className="p-3">{worker.locations.toLocaleString()}</td>
                            </tr>
                            <tr className="hover:bg-gray-100 border-b border-gray-300">
                                <th className="p-3 text-gray-600 font-semibold text-left">Certifications</th>
                                <td className="p-3">
                                <ul className="list-disc ml-5">
                                    {worker.certifications.map((cert, index) => (
                                    <li key={index}>{cert}</li>
                                    ))}
                                </ul>
                                </td>
                            </tr>
                            <tr className="bg-gray-50 hover:bg-gray-100 border-b border-gray-300">
                                <th className="p-3 text-gray-600 font-semibold text-left">Documents</th>
                                <td className="p-3">
                                <ul className="list-disc ml-5">
                                    {worker.documents.map((doc, index) => (
                                    <li key={index}>
                                        <a
                                            href={`/${doc}`}
                                            target='_blank'
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            {doc}
                                        </a>
                                    </li>
                                    ))}
                                </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                <button className=" w-full md:w-1/3 bg-primary text-white px-4 py-1 rounded hover:outline-2 hover:outline-offset-1 hover:outline-primary">
                    Approve
                </button>
                <button className="w-full md:w-1/3  border border-gray-500  hover:border-primary py-1 rounded hover:text-primary text-gray-800">
                    Reject
                </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default WorkerRegistrationDetails;