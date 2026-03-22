import { useState } from "react";
import { useNavigate } from "react-router-dom";
import uploadFile from "../../utils/meadiaUpload";
import toast from "react-hot-toast";
import api from '../../api/axios'

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    //  ADD IMAGE STATE
    const [image, setImage] = useState(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function submit(event) {
        event.preventDefault();

        setError("");

        // --- REQUIRED FIELDS ---
        if (!name || !username || !email || !contact || !address || !password || !confirmPassword) {
            setError("All fields are required");
            toast.error("All fields are required!");
            return;
        }

        // EMAIL VALIDATION
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            setError("Invalid email format");
            toast.error("Please enter a valid email!");
            return;
        }

        // --- CONTACT NUMBER VALIDATION (10 digits only) ---
        const contactRegex = /^[0-9]{10}$/;
        if (!contactRegex.test(contact)) {
            setError("Contact number must be exactly 10 digits");
            toast.error("Enter a valid 10-digit phone number!");
            return;
        }

        // --- PASSWORD LENGTH ---
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            toast.error("Password must be at least 6 characters!");
            return;
        }

        // --- PASSWORD MATCH ---
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            toast.error("Passwords do not match!");
            return;
        }

        // UPLOAD IMAGE TO SUPABASE
        let imageUrl = "";
        if (image) {
            try {
                imageUrl = await uploadFile(image); // Upload to Supabase storage
            } catch (err) {
                setError("Image upload failed");
                return;
            }
        }

        const data = {
            name: name,
            username: username,
            email: email,
            contact: contact,
            address: address,
            password: password,
            imageUrl: imageUrl     // NEW FIELD
        };

        try {
            await api.post("/user", data);

            setSuccess("User registered successfully!");
            setError("");         
            toast.success("Registration successful!");
            navigate("/auth/login");


        } catch (error) {
            if (error.response?.status === 400) {
                setError(error.response.data);
                toast.error("Something went wrong!");
            } else {
                setError("There was an error creating the account");
                toast.error("There was an error creating the account!");
            }
        }
    }

    return (
        <div className="w-full  p-10 flex items-center justify-center">
            <div className="w-[600px] p-8 shadow-xl rounded-lg mx-auto border border-slate-200">
                <div className="text-center mb-5">
                    <h1 
                        className="text-4xl font-semibold text-primary"
                    >
                        Register
                    </h1>
                </div>

                <form onSubmit={submit}>

                    {/* IMAGE UPLOAD */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Profile Image</label>

                        {/* NEW INPUT */}
                        <input
                            type="file"
                            accept="image/*"                           
                            className ="w-full p-2  border border-gray-300  rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
                            onChange={(e) => setImage(e.target.files[0])}
                        />

                        {/* Optional preview */}
                        {image && (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="preview"
                                className="w-24 h-24 mt-2 rounded-full object-cover border"  
                            />
                        )}
                    </div>

                    {/* NAME */}
                    <div className="mb-4">
                        <label className="block mb-1">Full Name</label>
                        <input type="text"                        
                            className ="w-full p-2  border border-gray-300  rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
                            placeholder="Enter your full name"
                            onChange={(e) => { setName(e.target.value); setError(""); setSuccess(""); }} />
                    </div>

                    {/* USERNAME */}
                    <div className="mb-4">
                        <label className="block mb-1">Username</label>
                        <input type="text"                          
                            className ="w-full p-2  border border-gray-300  rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
                            placeholder="Choose a username"
                            onChange={(e) => { setUsername(e.target.value); setError(""); setSuccess(""); }} />
                    </div>

                    {/* EMAIL */}
                    <div className="mb-4">
                        <label className="block mb-1">Email</label>
                        <input type="email"                          
                            className ="w-full p-2  border border-gray-300  rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
                            placeholder="Enter your email"
                            onChange={(e) => { setEmail(e.target.value); setError(""); setSuccess(""); }} />
                    </div>

                    {/* CONTACT */}
                    <div className="mb-4">
                        <label className="block mb-1">Contact Number</label>
                        <input type="text"                          
                            className ="w-full p-2  border border-gray-300  rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
                            placeholder="Enter your phone number"
                            onChange={(e) => { setContact(e.target.value); setError(""); setSuccess(""); }} />
                    </div>

                    {/* ADDRESS */}
                    <div className="mb-4">
                        <label className="block mb-1">Address</label>
                        <input type="text"                          
                            className ="w-full p-2  border border-gray-300  rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
                            placeholder="Enter your address"
                            onChange={(e) => { setAddress(e.target.value); setError(""); setSuccess(""); }} />
                    </div>

                    {/* PASSWORD */}
                    <div className="mb-4">
                        <label className="block mb-1">Password</label>
                        <input type="password"                          
                            className ="w-full p-2  border border-gray-300  rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
                            placeholder="Enter password"
                            onChange={(e) => { setPassword(e.target.value); setError(""); setSuccess(""); }} />
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div className="mb-4">
                        <label className="block mb-1">Confirm Password</label>
                        <input type="password"                          
                            className ="w-full p-2  border border-gray-300  rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all"
                            placeholder="Re-enter password"
                            onChange={(e) => { setConfirmPassword(e.target.value); setError(""); setSuccess(""); }} />
                    </div>

                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    {success && <div className="text-green-600 text-sm">{success}</div>}

                    <div className="mt-8">
                        <button type="submit"                           
                            className="px-4 py-2 rounded-lg w-full font-semibold bg-gradient-to-r from-amber-500 to-yellow-500 hover:shadow-lg hover:scale-105 transition-all duration-300 text-white"
                            >
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
