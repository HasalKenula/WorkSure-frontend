import { AiOutlineSafety } from "react-icons/ai";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { AiFillContacts } from "react-icons/ai";
import { AiFillShopping } from "react-icons/ai";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Mission from "../assets/mission.jpg"
import { IoMdSearch } from "react-icons/io";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdOutlineMessage, MdOutlineVerified, MdVerifiedUser } from "react-icons/md";
import { FaCode, FaRegCreditCard, FaRegUser } from "react-icons/fa";
import { BsSuitcaseLg } from "react-icons/bs";
import about from "../assets/aboutUS.jpg"
import worker from "../assets/worker.png"
import AboutUsTopSection from "../components/AboutUsTopSection";

export default function AboutUs() {
  return (
    <div>
      <Navbar />
      <AboutUsTopSection/>

      <div className="text-black w-full p-5 mt-20">

        {/* ===== Mission Section ===== */}
        <div className="flex flex-wrap justify-center gap-10 mt-10">
          <div className="relative p-[30px] rounded-[20px] shadow-xl w-[500px] max-w-full flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${Mission})` }}>
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-black/20 rounded-[20px]"></div>
          </div>

          <div className="bg-white p-[30px] rounded-[20px] shadow-xl w-[500px] max-w-full border border-slate-300">
            <h2 className="text-center text-4xl font-bold">Our Mission</h2>
            <p className="mx-[30px] mb-[45px] mt-[20px] text-[20px] leading-relaxed text-gray-800 text-justify">
              At WorkSure, our mission is to empower businesses and independent professionals by providing
              a seamless, secure, and intuitive platform for project collaboration. We strive to bridge the
              gap between talent and opportunity, fostering a dynamic ecosystem where innovation thrives and
              work is redefined for the modern age.
            </p>
          </div>
        </div>

        {/* ===== Key Objectives ===== */}
        <div className="relative mt-20 w-full h-[1300px] md:h-[550px] bg-contain bg-no-repeat text-white bg-right flex flex-col justify-center items-center" style={{ backgroundImage: `url(${worker})` }}>
          <div className="absolute inset-0 bg-black/80"></div>
          <h1 className="relative text-center text-6xl font-bold mt-[150px]">
            Our Key Objectives
          </h1>

          <div className="relative flex flex-wrap justify-center gap-10 mt-10 pb-20">
            <div className="p-[30px] rounded-[20px] shadow-xl border border-slate-300 text-center w-[250px] max-w-full hover:scale-105 transition-transform duration-500 bg-gradient-to-t from-white/90 to-white/50">
              <div className="flex justify-center w-full mb-6">
                <MdVerifiedUser className="text-8xl text-primary" />
              </div>
              <h2 className="font-bold text-lg">Accelerate Productivity</h2>
              <p className="text-gray-800 text-sm mt-2 leading-relaxed">
                Streamline workflows and automate routine tasks to boost team efficiency.
              </p>
            </div>

            <div className="p-[30px] rounded-[20px] shadow-xl border border-slate-300 text-center w-[250px] max-w-full hover:scale-105 transition-transform duration-500 bg-gradient-to-t from-white/90 to-white/50">
              <div className="flex justify-center w-full mb-6">
                <AiFillContacts className="text-8xl text-primary" />
              </div>
              <h3 className="font-bold text-lg">Ensure Transparency</h3>
              <p className="text-gray-800 text-sm mt-2 leading-relaxed">
                Provide clear communication and real-time project insight.
              </p>
            </div>

            <div className="p-[30px] rounded-[20px] shadow-xl border border-slate-300 text-center w-[250px] max-w-full hover:scale-105 transition-transform duration-500 bg-gradient-to-t from-white/90 to-white/50">
              <div className="flex justify-center w-full mb-6">
                <AiFillShopping className="text-8xl text-primary" />
              </div>
              <h3 className="font-bold text-lg">Enhance Security</h3>
              <p className="text-gray-800 text-sm mt-2 leading-relaxed">
                Enable reliable milestones and protected payments.
              </p>
            </div>
          </div>
        </div>

        {/* ===== How It Works Premium Section ===== */}
        <section className="relative mt-[150px] text-center px-6 overflow-hidden">
          {/* Background blobs */}
          <div className="absolute top-0 left-1/4 w-40 h-40 bg-gradient-to-tr from-amber-400 to-pink-500 rounded-full mix-blend-multiply opacity-20 animate-blob"></div>
          <div className="absolute top-10 right-1/4 w-60 h-60 bg-gradient-to-br from-purple-500 to-blue-400 rounded-full mix-blend-multiply opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-10 left-1/3 w-52 h-52 bg-gradient-to-tl from-pink-400 to-yellow-300 rounded-full mix-blend-multiply opacity-20 animate-blob animation-delay-4000"></div>

          {/* Heading */}
          <h1 className="relative text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-500 drop-shadow-lg">
            How It Works
          </h1>

          {/* Paragraph */}
          <p className="relative mt-6 text-lg md:text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
            A streamlined process designed for efficiency and clarity,
            <br />
            connecting clients with the perfect talent and empowering workers.
          </p>

          {/* Gradient underline */}
          <div className="mx-auto mt-6 h-1 w-32 bg-gradient-to-r from-amber-400 to-pink-500 rounded-full"></div>
        </section>

        {/* ===== Clients & Workers Cards ===== */}
        <div className="flex flex-col lg:flex-row flex-wrap justify-center gap-10 mt-20">

          {/* Clients */}
          <div className="flex-1 flex-col bg-white p-[30px] rounded-[20px] shadow-xl border border-slate-300 hover:scale-105 transition-transform duration-500">
            <h2 className="text-3xl font-bold text-center mb-8">For Clients</h2>

            <div className="flex gap-5 items-start mb-10">
              <IoMdSearch color="#f59e0b" size={40} />
              <p className="text-lg text-gray-800 leading-relaxed">
                Discover top talent and specialized services tailored precisely to your project needs quickly and efficiently.
              </p>
            </div>

            <div className="flex gap-5 items-start mb-10">
              <IoNewspaperOutline color="#f59e0b" size={40} />
              <p className="text-lg text-gray-800 leading-relaxed">
                Effortlessly share your project details and receive tailored proposals from skilled professionals.
              </p>
            </div>

            <div className="flex gap-5 items-start mb-10">
              <MdOutlineMessage color="#f59e0b" size={40} />
              <p className="text-lg text-gray-800 leading-relaxed">
                Communicate directly with workers through integrated chat and manage project milestones effectively.
              </p>
            </div>

            <div className="flex gap-5 items-start">
              <MdOutlineVerified color="#f59e0b" size={40} />
              <p className="text-lg text-gray-800 leading-relaxed">
                Approve deliverables confidently and process secure payments upon successful project completion.
              </p>
            </div>
          </div>

          {/* Workers */}
          <div className="flex-1 flex-col bg-white p-[30px] rounded-[20px] shadow-xl border border-slate-300 hover:scale-105 transition-transform duration-500">
            <h2 className="text-3xl font-bold text-center mb-6">For Workers</h2>

            <div className="flex gap-5 items-start mb-10">
              <FaRegUser color="#f59e0b" size={40} />
              <p className="text-lg text-gray-800 leading-relaxed">
                Create a compelling professional profile highlighting your unique skills and valuable experience to attract clients.
              </p>
            </div>

            <div className="flex gap-5 items-start mb-10">
              <BsSuitcaseLg color="#f59e0b" size={40} />
              <p className="text-lg text-gray-800 leading-relaxed">
                Browse and apply for relevant projects that perfectly match your expertise and career aspirations.
              </p>
            </div>

            <div className="flex gap-5 items-start mb-10">
              <FaCode color="#f59e0b" size={40} />
              <p className="text-lg text-gray-800 leading-relaxed">
                Collaborate seamlessly with clients using our integrated communication and comprehensive project management tools.
              </p>
            </div>

            <div className="flex gap-5 items-start">
              <FaRegCreditCard color="#f59e0b" size={40} />
              <p className="text-lg text-gray-800 leading-relaxed">
                Receive timely and secure payments for your completed work, ensuring financial stability and peace of mind.
              </p>
            </div>
          </div>

        </div>

        {/* ===== CTA Section ===== */}
        <section className="bg-[lch(74.93%_82.5_73.14)] p-10 rounded-[15px] text-center text-white max-w-[1200px] mt-30 mx-auto">
          <h2 className="text-5xl font-bold">Ready to Experience WorkSure?</h2>
          <p className="mt-5 text-1xl leading-relaxed">
            Join our growing community of successful businesses and talented professionals.
            <br />
            Discover the future of work today!
          </p>

          <div className="flex flex-wrap justify-center gap-10 mt-12">
            <a
              href="#"
              className="bg-white text-black px-6 py-2 rounded-lg text-2xl font-medium border-2 border-transparent hover:bg-transparent hover:text-white hover:border-white transition"
            >
              Get Started as a Client
            </a>

            <a
              href="#"
              className="bg-white text-black px-6 py-2 rounded-lg text-2xl font-medium border-2 border-transparent hover:bg-transparent hover:text-white hover:border-white transition"
            >
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
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}
      </style>
    </div>
  );
}
