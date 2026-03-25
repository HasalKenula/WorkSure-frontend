import Navbar from "../components/NavBar";
import { MdOutlineCall } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Contact from "../assets/contact.jpg"
import toast from "react-hot-toast";
import Footer from "../components/Footer";
import api from '../api/axios'

export default function ContactPage() {
  const { isAuthenticated, jwtToken } = useAuth();
  const [contact, setContact] = useState([]);

  const [name, setName] = useState("");
  const [contactNumber, setcontactNumber] = useState("");
  const [subject, setsubject] = useState("");
  const [message, setmessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(0);


  const [user, setUser] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (!jwtToken) return;

    api
      .get("/user", {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
      .then((res) => {
        setUser(res.data);
        setUserId(res.data.id);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [jwtToken]);


  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  }


  async function createContact() {

    if (!name || !contactNumber || !subject || !message) {
      toast.error("Please fill out all fields before submitting");
      return;
    }

    if (contactNumber.length < 10) {
      toast.error("Contact number must be at least 10 digits");
      return;
    }

    try {
      const response = await api.post("/contact", {
        name: name,
        contactNumber: contactNumber,
        subject: subject,
        message: message,
        userId: userId
      }, config);
      toast.success("Message sent successfully!");

      //clear input fields
      setName("");
      setcontactNumber("");
      setsubject("");
      setmessage("");

    } catch (error) {
      toast.error("Failed to send message. Try again!");
      console.log(error);
    }


  }

  function handelName(event) {
    setName(event.target.value);
  }

  function handelcontactNumber(event) {
    setcontactNumber(event.target.value);
  }

  function handelsubject(event) {
    setsubject(event.target.value);
  }

  function handelmessage(event) {
    setmessage(event.target.value);
  }

  return (
    <>
      <Navbar />

      <div className="mt-20 flex flex-col min-h-screen font-outfit px-4 md:px-10 mb-12">
        <div className="w-full relative flex flex-col gap-4 items-center justify-center h-[200px] bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${Contact})` }}>
          <div className="absolute inset-0 bg-black/40"></div>
          {/* Title */}
          <div className="relative flex justify-center items-center">
            <h1 className="text-5xl font-bold text-primary text-white">Contact</h1>
          </div>

          {/* Subtitle */}
          <div className="relative mt-2 flex justify-center items-center text-center">
            <p className="font-sans text-lg max-w-2xl text-white">
              We'd love to hear from you! Whether you have a question, feedback, or need support, our team is ready to help.
            </p>
          </div>
        </div>

        {/*  2-Column Box */}
        <div className="mt-10 flex flex-col lg:flex-row gap-8">

          {/* Left Box */}
          <div className="shadow-2xl w-full lg:w-1/2 rounded-2xl bg-white/10 backdrop-blur-xl p-6 border border-slate-300 rounded-xl">
            <h2 className="text-2xl font-semibold text-center">Send Us a Message</h2>
            <p className="text-center mt-1 text-sm">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <form className="flex flex-col space-y-4 mt-6">
              <div>
                <label className="font-bold">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={handelName}
                  placeholder="Hasal Kenula"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
                />
              </div>

              <div>
                <label className="font-bold">Contact Number</label>
                <input
                  type="text"
                  value={contactNumber}
                  onChange={handelcontactNumber}
                  placeholder="071-1234567"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
                />
              </div>

              <div>
                <label className="font-bold">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={handelsubject}
                  placeholder="Inquiry about"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
                />
              </div>

              <div>
                <label className="font-bold">Your Message</label>
                <textarea
                  placeholder="Type your message here"
                  value={message}
                  onChange={handelmessage}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm h-32"
                />
              </div>
            </form>

            <div className="flex justify-center mt-6">
              <button type="button" onClick={createContact} className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-lg font-semibold  rounded-xl bg-primary shadow-md  hover:scale-105 hover:shadow-xl transition-all duration-300 w-1/2 py-3 border ">
                Send Message
              </button>
            </div>
          </div>

          {/* Right Box */}
          <div className="shadow-2xl w-full lg:w-1/2 rounded-2xl bg-white/10 backdrop-blur-xl p-6  border border-slate-300 rounded-xl">
            <h2 className="text-2xl font-semibold text-center">Get in Touch Directly</h2>
            <p className="text-center mt-1 italic text-sm">
              Prefer a direct approach? Here's how you can reach us.
            </p>

            <div className="flex flex-col mt-8 space-y-8 ml-4">
              <div className="flex items-center space-x-6">
                <MdOutlineLocalPostOffice className="text-4xl text-primary" />
                <p className="font-sans font-semibold text-lg">info@worksure.com</p>
              </div>

              <div className="flex items-center space-x-6">
                <MdOutlineCall className="text-4xl text-primary" />
                <p className="font-sans font-semibold text-lg">071-1234567</p>
              </div>

              <div className="flex items-center space-x-6">
                <IoLocationOutline className="text-4xl text-primary" />
                <p className="font-sans font-semibold text-lg">Colombo, Sri Lanka</p>
              </div>

              <div class="mt-4 w-full rounded-xl overflow-hidden shadow-md">
                <iframe
                  src="https://www.google.com/maps?q=Colombo,Sri%20Lanka&output=embed"
                  class="w-full h-64 border-0"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}