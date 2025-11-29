import Navbar from "../components/NavBar";
import { MdOutlineCall } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineLocalPostOffice } from "react-icons/md";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <div className="mt-20 flex flex-col min-h-screen font-outfit px-4 md:px-10">
        
        {/* Title */}
        <div className="flex justify-center items-center">
          <h1 className="text-4xl font-bold text-primary">Contact</h1>
        </div>

        {/* Subtitle */}
        <div className="mt-2 flex justify-center items-center text-center">
          <p className="font-sans text-lg max-w-2xl">
            We'd love to hear from you! Whether you have a question, feedback, or need support, our team is ready to help.
          </p>
        </div>

        {/*  2-Column Box */}
        <div className="mt-10 flex flex-col lg:flex-row gap-8">

          {/* Left Box */}
          <div className="shadow-2xl w-full lg:w-1/2 rounded-2xl bg-white/10 backdrop-blur-xl p-6">
            <h2 className="text-2xl font-semibold text-center">Send Us a Message</h2>
            <p className="text-center mt-1 text-sm">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <form className="flex flex-col space-y-4 mt-6">
              <div>
                <label className="font-bold">Your Name</label>
                <input
                  type="text"
                  placeholder="Hasal Kenula"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
                />
              </div>

              <div>
                <label className="font-bold">Contact Number</label>
                <input
                  type="text"
                  placeholder="071-1234567"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
                />
              </div>

              <div>
                <label className="font-bold">Subject</label>
                <input
                  type="text"
                  placeholder="Inquiry about"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
                />
              </div>

              <div>
                <label className="font-bold">Your Message</label>
                <textarea
                  placeholder="Type your message here"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm h-32"
                />
              </div>
            </form>

            <div className="flex justify-center mt-6">
              <button className="text-lg font-semibold text-black rounded-xl bg-primary shadow-md hover:bg-gray-300 hover:scale-105 hover:shadow-xl transition-all duration-300 w-1/2 py-3 border border-gray-400">
                Send Message
              </button>
            </div>
          </div>

          {/* Right Box */}
          <div className="shadow-2xl w-full lg:w-1/2 rounded-2xl bg-white/10 backdrop-blur-xl p-6">
            <h2 className="text-2xl font-semibold text-center">Get in Touch Directly</h2>
            <p className="text-center mt-1 italic text-sm">
              Prefer a direct approach? Here’s how you can reach us.
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
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
