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

      <div className="text-black w-full p-5 mt-20">

        {/* ===== Mission Section ===== */}
        <div className="flex flex-wrap justify-center gap-10 mt-10">
          <div className="relative p-[30px] rounded-2xl shadow-2xl w-[450px] max-w-full flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${Mission})` }}>
            <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-black/20 rounded-2xl"></div>
          </div>

          <div className="bg-white p-[25px] rounded-2xl shadow-2xl w-[450px] max-w-full border border-slate-300">
            <h2 className="text-center text-3xl font-bold">Our Mission</h2>
            <p className="mx-6 mb-10 mt-4 text-[18px] leading-relaxed text-gray-800 text-justify">
              At WorkSure, our mission is to empower businesses and independent professionals by providing
              a seamless, secure, and intuitive platform for project collaboration. We strive to bridge the
              gap between talent and opportunity, fostering a dynamic ecosystem where innovation thrives and
              work is redefined for the modern age.
            </p>
          </div>
        </div>

        {/* ===== Key Objectives ===== */}
        <div className="relative mt-20 w-full h-[1200px] md:h-[500px] bg-contain bg-no-repeat text-white bg-right flex flex-col justify-center items-center" style={{ backgroundImage: `url(${worker})` }}>
          <div className="absolute inset-0 bg-black/70"></div>
          <h1 className="relative text-center text-5xl md:text-6xl font-bold mt-36">
            Our Key Objectives
          </h1>

          <div className="relative flex flex-wrap justify-center gap-8 mt-10 pb-16">
            {[
              { icon: <MdVerifiedUser className="text-7xl text-primary" />, title: "Accelerate Productivity", text: "Streamline workflows and automate routine tasks to boost team efficiency." },
              { icon: <AiFillContacts className="text-7xl text-primary" />, title: "Ensure Transparency", text: "Provide clear communication and real-time project insight." },
              { icon: <AiFillShopping className="text-7xl text-primary" />, title: "Enhance Security", text: "Enable reliable milestones and protected payments." }
            ].map((item, index) => (
              <div key={index} className="p-6 md:p-8 rounded-2xl shadow-xl border border-slate-200 text-center w-[220px] md:w-[250px] hover:scale-105 transition-transform duration-500 bg-gradient-to-t from-white/90 to-white/60">
                <div className="flex justify-center w-full mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg md:text-xl">{item.title}</h3>
                <p className="text-gray-800 text-sm mt-2 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== How It Works Section ===== */}
        <section className="relative mt-36 text-center px-6 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-36 h-36 bg-gradient-to-tr from-amber-300 to-pink-400 rounded-full mix-blend-multiply opacity-25 animate-blob"></div>
          <div className="absolute top-10 right-1/4 w-52 h-52 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full mix-blend-multiply opacity-25 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-10 left-1/3 w-44 h-44 bg-gradient-to-tl from-pink-300 to-yellow-300 rounded-full mix-blend-multiply opacity-25 animate-blob animation-delay-4000"></div>

          <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-500 drop-shadow-md">
            How It Works
          </h1>

          <p className="relative mt-4 md:mt-6 text-base md:text-lg text-gray-800 max-w-2xl mx-auto leading-relaxed">
            A streamlined process designed for efficiency and clarity,<br />
            connecting clients with the perfect talent and empowering workers.
          </p>

          <div className="mx-auto mt-4 md:mt-6 h-1 w-24 md:w-32 bg-gradient-to-r from-amber-400 to-pink-500 rounded-full"></div>
        </section>

        {/* ===== Premium Clients & Workers Cards ===== */}
        <div className="flex flex-col lg:flex-row flex-wrap justify-center gap-8 mt-16">

          {/* Clients */}
          <div className="relative flex-1 bg-white p-6 md:p-8 rounded-3xl shadow-2xl border border-transparent overflow-hidden hover:scale-105 transition-transform duration-500 group max-w-[400px]">
            <div className="absolute top-[-25px] right-[-25px] w-28 h-28 bg-gradient-to-tr from-amber-300 to-pink-400 rounded-full opacity-20 blur-2xl animate-blob"></div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-6 text-gray-900 group-hover:text-amber-500 transition-colors duration-500">
              For Clients
            </h2>
            {[
              { icon: <IoMdSearch className="text-amber-500 w-8 h-8 animate-bounce" />, text: "Discover top talent and specialized services tailored precisely to your project needs quickly and efficiently." },
              { icon: <IoNewspaperOutline className="text-amber-500 w-8 h-8 animate-bounce" />, text: "Effortlessly share your project details and receive tailored proposals from skilled professionals." },
              { icon: <MdOutlineMessage className="text-amber-500 w-8 h-8 animate-bounce" />, text: "Communicate directly with workers through integrated chat and manage project milestones effectively." },
              { icon: <MdOutlineVerified className="text-amber-500 w-8 h-8 animate-bounce" />, text: "Approve deliverables confidently and process secure payments upon successful project completion." }
            ].map((item, index) => (
              <div key={index} className={`flex gap-4 items-start mb-6 last:mb-0 opacity-0 animate-fadeInUp delay-[${index*200}ms]`}>
                {item.icon}
                <p className="text-gray-800 text-base md:text-lg leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Workers */}
          <div className="relative flex-1 bg-white p-6 md:p-8 rounded-3xl shadow-2xl border border-transparent overflow-hidden hover:scale-105 transition-transform duration-500 group max-w-[400px]">
            <div className="absolute bottom-[-25px] left-[-25px] w-28 h-28 bg-gradient-to-tr from-purple-400 to-blue-400 rounded-full opacity-20 blur-2xl animate-blob animation-delay-2000"></div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-6 text-gray-900 group-hover:text-purple-500 transition-colors duration-500">
              For Workers
            </h2>
            {[
              { icon: <FaRegUser className="text-purple-500 w-8 h-8 animate-bounce" />, text: "Create a compelling professional profile highlighting your unique skills and valuable experience to attract clients." },
              { icon: <BsSuitcaseLg className="text-purple-500 w-8 h-8 animate-bounce" />, text: "Browse and apply for relevant projects that perfectly match your expertise and career aspirations." },
              { icon: <FaCode className="text-purple-500 w-8 h-8 animate-bounce" />, text: "Collaborate seamlessly with clients using our integrated communication and comprehensive project management tools." },
              { icon: <FaRegCreditCard className="text-purple-500 w-8 h-8 animate-bounce" />, text: "Receive timely and secure payments for your completed work, ensuring financial stability and peace of mind." }
            ].map((item, index) => (
              <div key={index} className={`flex gap-4 items-start mb-6 last:mb-0 opacity-0 animate-fadeInUp delay-[${index*200}ms]`}>
                {item.icon}
                <p className="text-gray-800 text-base md:text-lg leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

        </div>

        {/* ===== CTA Section ===== */}
        <section className="bg-[lch(74.93%_82.5_73.14)] p-8 md:p-10 rounded-2xl text-center text-white max-w-[1200px] mt-16 mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to Experience WorkSure?</h2>
          <p className="mt-4 md:mt-5 text-base md:text-lg leading-relaxed">
            Join our growing community of successful businesses and talented professionals.
            <br />
            Discover the future of work today!
          </p>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-8 md:mt-12">
            <a href="#" className="bg-white text-black px-5 md:px-6 py-2 md:py-3 rounded-lg text-lg md:text-2xl font-medium border-2 border-transparent hover:bg-transparent hover:text-white hover:border-white transition">
              Get Started as a Client
            </a>
            <a href="#" className="bg-white text-black px-5 md:px-6 py-2 md:py-3 rounded-lg text-lg md:text-2xl font-medium border-2 border-transparent hover:bg-transparent hover:text-white hover:border-white transition">
              Become a Worker
            </a>
          </div>
        </section>

      </div>

      <Footer />

      {/* ===== Tailwind Custom Animations ===== */}
      <style>
        {`
          @keyframes blob {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob { animation: blob 8s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }

          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp { animation: fadeInUp 0.8s ease forwards; }
        `}
      </style>
    </div>
  );
}
