
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function submit(event) {
        event.preventDefault();

        // --- VALIDATIONS ---
        if (!name || !username || !email || !contact || !address || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const data = {
            name: name,
            username: username,
            email: email,
            contact: contact,
            address: address,
            password: password
        };

        try {
            await axios.post("http://localhost:8081/user", data);

            setSuccess("User registered successfully!");
            setError("");

            setTimeout(() => navigate("/auth/login"), 1000);

        } catch (error) {
            if (error.response?.status === 400) {
                setError(error.response.data);
            } else {
                setError("There was an error creating the account");
            }
        }
    }

    return (
        <div className="w-full  p-10 flex items-center justify-center">
            <div className="w-[600px] p-8 shadow-xl rounded-lg mx-auto border border-slate-200">
                <div className="text-center mb-5">
                    <h1 className="text-4xl font-semibold text-primary">Register</h1>
                </div>

                <form onSubmit={submit}>

                    {/* NAME */}
                    <div className="mb-4">
                        <label className="block mb-1">Full Name</label>
                        <input type="text"
                            className="block w-full p-2 border border-gray-200 rounded-lg"
                            placeholder="Enter your full name"
                            onChange={(e) => { setName(e.target.value); setError(""); setSuccess(""); }} />
                    </div>

                    {/* USERNAME */}
                    <div className="mb-4">
                        <label className="block mb-1">Username</label>
                        <input type="text"
                            className="block w-full p-2 border border-gray-200 rounded-lg"
                            placeholder="Choose a username"
                            onChange={(e) => { setUsername(e.target.value); setError(""); setSuccess(""); }} />
                    </div>

                    {/* EMAIL */}
                    <div className="mb-4">
                        <label className="block mb-1">Email</label>
                        <input type="email"
                            className="block w-full p-2 border border-gray-200 rounded-lg"
                            placeholder="Enter your email"
                            onChange={(e) => { setEmail(e.target.value); setError(""); setSuccess(""); }} />
                    </div>

                    {/* CONTACT */}
                    <div className="mb-4">
                        <label className="block mb-1">Contact Number</label>
                        <input type="text"
                            className="block w-full p-2 border border-gray-200 rounded-lg"
                            placeholder="Enter your phone number"
                            onChange={(e) => { setContact(e.target.value); setError(""); setSuccess(""); }} />
                    </div>

                    {/* ADDRESS */}
                    <div className="mb-4">
                        <label className="block mb-1">Address</label>
                        <input type="text"
                            className="block w-full p-2 border border-gray-200 rounded-lg"
                            placeholder="Enter your address"
                            onChange={(e) => { setAddress(e.target.value); setError(""); setSuccess(""); }} />
                    </div>

                    {/* PASSWORD */}
                    <div className="mb-4">
                        <label className="block mb-1">Password</label>
                        <input type="password"
                            className="block w-full p-2 border border-gray-200 rounded-lg"
                            placeholder="Enter password"
                            onChange={(e) => { setPassword(e.target.value); setError(""); setSuccess(""); }} />
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div className="mb-4">
                        <label className="block mb-1">Confirm Password</label>
                        <input type="password"
                            className="block w-full p-2 border border-gray-200 rounded-lg"
                            placeholder="Re-enter password"
                            onChange={(e) => { setConfirmPassword(e.target.value); setError(""); setSuccess(""); }} />
                    </div>

                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    {success && <div className="text-green-600 text-sm">{success}</div>}

                    <div className="mt-8">
                        <button type="submit"
                            className="bg-primary text-white px-4 py-2 rounded-lg w-full hover:bg-white hover:text-primary border border-primary">
                            Register
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p>
                        Already have an account?
                        <span className="cursor-pointer ml-1 text-primary"
                            onClick={() => navigate("/auth/login")}>
                            Login
                        </span>
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Register;
