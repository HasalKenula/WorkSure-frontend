import { AiFillContacts, AiFillShopping } from "react-icons/ai";
import { IoMdSearch } from "react-icons/io";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdOutlineMessage, MdOutlineVerified, MdVerifiedUser } from "react-icons/md";
import { FaCode, FaRegCreditCard, FaRegUser } from "react-icons/fa";
import { BsSuitcaseLg } from "react-icons/bs";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import AboutUsTopSection from "../components/AboutUsTopSection";
import Mission from "../assets/mission.jpg";
import worker from "../assets/worker.png";

export default function AboutUs() {
  return (
    <div>
      <Navbar />
      <AboutUsTopSection />

      <div className="text-black w-full px-4 md:px-6 mt-20">

        {/* ===== Mission Section ===== */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-10 mt-10">

          <div
            className="relative w-full max-w-md h-64 md:h-80 rounded-2xl shadow-2xl bg-cover bg-center"
            style={{ backgroundImage: `url(${Mission})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-black/20 rounded-2xl"></div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-300">
            <h2 className="text-center text-2xl md:text-3xl font-bold">Our Mission</h2>
            <p className="mt-4 text-sm md:text-base lg:text-lg leading-relaxed text-gray-800 text-justify">
              At WorkSure, our mission is to empower businesses and independent professionals by providing
              a seamless, secure, and intuitive platform for project collaboration. We strive to bridge the
              gap between talent and opportunity, fostering a dynamic ecosystem where innovation thrives and
              work is redefined for the modern age.
            </p>
          </div>
        </div>

        {/* ===== Key Objectives ===== */}
        <div
          className="relative mt-20 w-full min-h-[600px] md:min-h-[500px] bg-contain bg-no-repeat bg-right flex flex-col justify-center items-center text-white px-4"
          style={{ backgroundImage: `url(${worker})` }}
        >
          <div className="absolute inset-0 bg-black/70"></div>

          <h1 className="relative text-3xl md:text-5xl font-bold text-center mt-10 md:mt-20">
            Our Key Objectives
          </h1>

          <div className="relative flex flex-wrap justify-center gap-6 mt-10 pb-10">
            {[
              {
                icon: <MdVerifiedUser className="text-5xl md:text-7xl text-primary" />,
                title: "Accelerate Productivity",
                text: "Streamline workflows and automate routine tasks to boost team efficiency."
              },
              {
                icon: <AiFillContacts className="text-5xl md:text-7xl text-primary" />,
                title: "Ensure Transparency",
                text: "Provide clear communication and real-time project insight."
              },
              {
                icon: <AiFillShopping className="text-5xl md:text-7xl text-primary" />,
                title: "Enhance Security",
                text: "Enable reliable milestones and protected payments."
              }
            ].map((item, index) => (
              <div
                key={index}
                className="p-5 md:p-6 rounded-2xl shadow-xl border text-center w-full sm:w-[250px] hover:scale-105 transition-transform duration-500 bg-gradient-to-t from-white/90 to-white/60"
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg md:text-xl">{item.title}</h3>
                <p className="text-gray-800 text-sm mt-2">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== How It Works Section ===== */}
        <section className="relative mt-20 md:mt-36 text-center px-4 overflow-hidden">

          <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-500">
            How It Works
          </h1>

          <p className="mt-4 text-sm md:text-lg text-gray-800 max-w-2xl mx-auto">
            A streamlined process designed for efficiency and clarity,
            connecting clients with the perfect talent and empowering workers.
          </p>

          <div className="mx-auto mt-4 h-1 w-24 bg-gradient-to-r from-amber-400 to-pink-500 rounded-full"></div>
        </section>

        {/* ===== Clients & Workers ===== */}
        <div className="flex flex-col lg:flex-row justify-center gap-8 mt-16">

          {/* Clients */}
          <div className="flex-1 bg-white p-6 md:p-8 rounded-3xl shadow-2xl max-w-full lg:max-w-[400px] hover:scale-105 transition-transform">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-900">
              For Clients
            </h2>

            {[
              { icon: <IoMdSearch className="text-amber-500 w-6 h-6" />, text: "Discover top talent quickly." },
              { icon: <IoNewspaperOutline className="text-amber-500 w-6 h-6" />, text: "Post project details easily." },
              { icon: <MdOutlineMessage className="text-amber-500 w-6 h-6" />, text: "Communicate with workers." },
              { icon: <MdOutlineVerified className="text-amber-500 w-6 h-6" />, text: "Secure payments after completion." }
            ].map((item, index) => (
              <div key={index} className="flex gap-3 mb-4">
                {item.icon}
                <p className="text-sm md:text-base text-gray-800">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Workers */}
          <div className="flex-1 bg-white p-6 md:p-8 rounded-3xl shadow-2xl max-w-full lg:max-w-[400px] hover:scale-105 transition-transform">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-900">
              For Workers
            </h2>

            {[
              { icon: <FaRegUser className="text-purple-500 w-6 h-6" />, text: "Create your professional profile." },
              { icon: <BsSuitcaseLg className="text-purple-500 w-6 h-6" />, text: "Find suitable projects." },
              { icon: <FaCode className="text-purple-500 w-6 h-6" />, text: "Collaborate with clients." },
              { icon: <FaRegCreditCard className="text-purple-500 w-6 h-6" />, text: "Receive secure payments." }
            ].map((item, index) => (
              <div key={index} className="flex gap-3 mb-4">
                {item.icon}
                <p className="text-sm md:text-base text-gray-800">{item.text}</p>
              </div>
            ))}
          </div>

        </div>

        {/* ===== CTA Section ===== */}
        <section className="bg-[lch(74.93%_82.5_73.14)] p-6 md:p-10 rounded-2xl text-center text-white max-w-[1200px] mt-16 mx-auto">
          <h2 className="text-2xl md:text-5xl font-bold">Ready to Experience WorkSure?</h2>

          <p className="mt-4 text-sm md:text-lg">
            Join our growing community and discover the future of work today!
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <a className="bg-white text-black px-6 py-3 rounded-lg text-lg font-medium hover:bg-transparent hover:text-white border-2 border-white transition">
              Get Started as a Client
            </a>

            <a className="bg-white text-black px-6 py-3 rounded-lg text-lg font-medium hover:bg-transparent hover:text-white border-2 border-white transition">
              Become a Worker
            </a>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
}