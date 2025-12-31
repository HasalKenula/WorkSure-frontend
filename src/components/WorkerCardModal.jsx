import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

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
    const [payment, setPayment] = useState(null);

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        },
    };


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


    async function getWorkers() {
        try {
            const response = await axios.get(`http://localhost:8081/worker/${userId}`, config);
            setWorker(response.data);
        } catch (error) {
            console.log("Error loading worker:", error);
            setWorker(null);
        }
    }

    async function getPayment() {
        try {
            const response = await axios.get(`http://localhost:8081/payment/${userId}`, config);
            setPayment(response.data);
        } catch (error) {
            console.log("Error loading paymentDetails:", error);
            setPayment(null);
        }
    }


    useEffect(() => {
        if (isAuthenticated && userId) {
            getWorkers();
            getPayment();
        }
    }, [isAuthenticated, userId]);


    const handleRegisterClick = () => {
        if (worker && payment) {
            toast.error("You are already registered as a worker.");
        } else if (worker) {
            navigate("/planUpgradePage");
        }
        else {
            navigate("/workerRegistration");
        }
    };


    const handleProfileClick = () => {
        if (!worker && !payment) {
            toast.error("Please register first to view your profile.");
            return;
        }

        if (worker.isBlocked) {
            toast.error("Your account is blocked. You cannot access your profile.");
            return;
        }

        navigate("/workerProfile");
    };

    const handleProfileUpdateClick = () => {
        if (!worker && !payment) {
            toast.error("Please register first to view your profile.");
            return;
        }

        if (worker.isBlocked) {
            toast.error("Your account is blocked. You cannot update your profile.");
            return;
        }

        navigate("/workerProfileUpdate");
    };


    return (
        <div>
            <button
                onClick={openModal}
                className={`px-4 py-2 bg-primary text-white rounded-lg ${buttonClass}`}
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

                    <button
                        onClick={handleProfileUpdateClick}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                    >
                        Worker Profile Update
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
