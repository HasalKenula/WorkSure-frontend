

// import { useEffect, useState } from "react";
// import Modal from "react-modal";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";

// Modal.setAppElement('#root');

// export default function WorkerCardModal({ triggerButtonText = "Find Worker", buttonClass = "" }) {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const navigate = useNavigate();

//     const openModal = () => setIsModalOpen(true);
//     const closeModal = () => setIsModalOpen(false);

//     const { jwtToken, isAuthenticated } = useAuth();

//     const [userId, setUserId] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [worker, setWorker] = useState(null);

//     const config = {
//         headers: {
//             Authorization: `Bearer ${jwtToken}`
//         },
//     }


//     useEffect(() => {
//         if (!jwtToken) return;

//         axios
//             .get("http://localhost:8081/user", {
//                 headers: { Authorization: `Bearer ${jwtToken}` },
//             })
//             .then((res) => {

//                 setUserId(res.data.id);


//             })
//             .catch(() => setLoading(false));


//     }, [jwtToken]);

//     async function getWorkers() {
//         try {
//             const response = await axios.get(`http://localhost:8081/worker/${userId}`, config);
//             setWorker(response.data);
//         } catch (error) {
//             console.log("error to load the correct worker according to the id");
//             console.log("Error loading worker:", error);
//         }
//     }



//     useEffect(() => {
//         if (isAuthenticated && userId) {
//             getWorkers();
//         }
//     }, [isAuthenticated, userId]);


//     return (
//         <div>
//             {/* Trigger Button */}
//             <button
//                 onClick={openModal}
//                 className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${buttonClass}`}
//             >
//                 {triggerButtonText}
//             </button>

//             {/* Modal */}
//             <Modal
//                 isOpen={isModalOpen}
//                 onRequestClose={closeModal}
//                 contentLabel="Find Worker Options"
//                 className="bg-white p-6 rounded-lg shadow-lg w-[300px] mx-auto mt-40 relative z-50"
//                 overlayClassName="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-start z-40"
//             >
//                 <h2 className="text-xl font-bold mb-4">Choose Option</h2>
//                 <div className="flex flex-col gap-4">
//                     <button
//                         onClick={() => navigate("/worker-registration")}
//                         className="px-4 py-2 bg-green-500 text-white rounded-lg"
//                     >
//                         Worker Registration
//                     </button>
//                     <button
//                         onClick={() => navigate("/worker-profile")}
//                         className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//                     >
//                         Worker Profile
//                     </button>
//                 </div>
//                 <button
//                     onClick={closeModal}
//                     className="mt-4 px-4 py-2 bg-gray-300 rounded-lg"
//                 >
//                     Close
//                 </button>
//             </Modal>
//         </div>
//     );
// }


import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast"; // for messages

Modal.setAppElement('#root');

export default function WorkerCardModal({ triggerButtonText = "Find Worker", buttonClass = "" }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const { jwtToken, isAuthenticated } = useAuth();
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [worker, setWorker] = useState(null);

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        },
    };

    // Get logged-in user ID
    useEffect(() => {
        if (!jwtToken) return;

        setLoading(true);
        axios
            .get("http://localhost:8081/user", config)
            .then((res) => {
                setUserId(res.data.id);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [jwtToken]);

    // Get worker info if exists
    async function getWorkers() {
        try {
            const response = await axios.get(`http://localhost:8081/worker/${userId}`, config);
            setWorker(response.data); // If found, worker object, else null
        } catch (error) {
            console.log("Error loading worker:", error);
            setWorker(null); // User not in worker table
        }
    }

    useEffect(() => {
        if (isAuthenticated && userId) {
            getWorkers();
        }
    }, [isAuthenticated, userId]);

    // Handle Worker Registration button
    const handleRegisterClick = () => {
        if (worker) {
            toast.error("You are already registered as a worker.");
        } else {
            navigate("/workerRegistration");
        }
    };

    // Handle Worker Profile button
    const handleProfileClick = () => {
        if (!worker) {
            toast.error("Please register first to view your profile.");
            return;
        }

        if (worker.isBlocked) {
            toast.error("Your account is blocked. You cannot access your profile.");
            return;
        }

        navigate("/workerProfile");
    };

    return (
        <div>
            <button
                onClick={openModal}
                className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${buttonClass}`}
            >
                {triggerButtonText}
            </button>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Find Worker Options"
                className="bg-white p-6 rounded-lg shadow-lg w-[300px] mx-auto mt-40 relative z-50"
                overlayClassName="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-start z-40"
            >
                <h2 className="text-xl font-bold mb-4">Choose Option</h2>

                {loading && <p>Loading...</p>}

                <div className="flex flex-col gap-4">
                    <button
                        onClick={handleRegisterClick}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg"
                    >
                        Worker Registration
                    </button>
                    <button
                        onClick={handleProfileClick}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                        Worker Profile
                    </button>
                </div>

                <button
                    onClick={closeModal}
                    className="mt-4 px-4 py-2 bg-gray-300 rounded-lg"
                >
                    Close
                </button>
            </Modal>
        </div>
    );
}
