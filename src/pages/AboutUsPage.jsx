import { AiOutlineSafety } from "react-icons/ai";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { AiFillContacts } from "react-icons/ai";
import { AiFillShopping } from "react-icons/ai";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Mission from "../assets/mission.jpg"
import { IoMdSearch } from "react-icons/io";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdOutlineMessage, MdOutlineVerified } from "react-icons/md";
import { FaCode, FaRegCreditCard, FaRegUser } from "react-icons/fa";
import { BsSuitcaseLg } from "react-icons/bs";


export default function AboutUs() {
  return (
  <div>

    <Navbar />

    <div className="text-black  min-h-screen w-full p-5 mt-20">

      {/* ----- Title & Intro ----- */}
      <h1 className="text-center text-6xl font-bold mt-[30px]">
        About <span className="text-[lch(74.93%_82.5_73.14)]">WorkSure</span><br />
      </h1>

      <p className="text-center text-xl mt-[50px]">
        Connecting businesses with top-tier talent, WorkSure is revolutionizing project collaboration
        <br />
        and workforce management with innovative solutions.
      </p>

      {/* ----- Mission Section ----- */}
      <div className="flex flex-wrap justify-center gap-30 mt-10">

        {/* Image box replaced with simple placeholder-div to match original structure */}
        <div className="relative p-[30px] rounded-[20px] shadow-lg w-[500px] max-w-full flex items-center justify-center  bg-cover" style={{ backgroundImage: `url(${Mission})` }}>
           <div className="absolute inset-0 bg-black/30 rounded-[20px]"></div>
         
        </div>

        {/* Mission box */}
        <div className="bg-white p-[30px] rounded-[20px] shadow-lg w-[500px] max-w-full border border-slate-300">
          <h2 className="text-center text-4xl font-bold fornt-[Courier New]">Our Mission</h2>
          <p className="mx-[30px] mb-[45px] mt-[20px] text-[20px] leading-relaxed text-gray-800 text-justify " text-justify text-center>
            At WorkSure, our mission is to empower businesses and independent professionals by providing
            a seamless, secure, and intuitive platform for project collaboration. We strive to bridge the
            gap between talent and opportunity, fostering a dynamic ecosystem where innovation thrives and
            work is redefined for the modern age.
          </p>
        </div>

      </div>

      {/* ----- Key Objectives ----- */}
      <h1 className="text-center text-6xl font-bold mt-[150px]">
        Our Key Objectives
      </h1>

      <div className="flex flex-wrap justify-center gap-10 mt-10">

        <div className="bg-white p-[30px] rounded-[20px] shadow-lg border border-slate-300 text-center w-[250px] max-w-full">
          <div className="flex justify-center w-full mb-6">
            <AiOutlineSafety className="text-8xl text-primary" />
          </div>
          <h2 className="font-bold text-lg">Accelerate Productivity</h2>
          <p className="text-sm mt-2 leading-relaxed text-gray-800">
            Streamline workflows and automate routine tasks to boost team efficiency.
          </p>
        </div>

        <div className="bg-white p-[30px] rounded-[20px] shadow-lg border border-slate-300 text-center w-[250px] max-w-full">
          <div className="flex justify-center w-full mb-6">
            {/*<AiTwotoneCheckCircle className="text-8xl text-blue-500 text-yellow-600" />*/}
            <AiFillContacts className="text-8xl text-primary" />
          </div>
          <h3 className="font-bold text-lg">Ensure Transparency</h3>
          <p className="text-sm mt-2 leading-relaxed text-gray-800">
            Provide clear communication and real-time project insight.
          </p>
        </div>

        <div className="bg-white p-[30px] rounded-[20px] shadow-lg border border-slate-300 text-center w-[250px] max-w-full">
          <div className="flex justify-center w-full mb-6">
            <AiFillShopping className="text-8xl text-primary" />
          </div>
          <h3 className="font-bold text-lg">Enhance Security</h3>
          <p className="text-sm mt-2 leading-relaxed text-gray-800">
            Enable reliable milestones and protected payments.
          </p>
        </div>

      </div>

      {/* ----- How It Works ----- */}
      <h1 className="text-center text-6xl font-bold mt-[150px]">
        How It Works
      </h1>

      <p className="text-center text-xl mt-6">
        A streamlined process designed for efficiency and clarity
        <br />
        connecting clients with the perfect talent and empowering workers.
      </p>

      <div className="flex flex-col lg:flex-row flex-wrap justify-center gap-15 mt-20">

        {/* Clients */}
        <div className="flex-1 flex-col bg-white p-[30px] rounded-[20px] shadow-lg   border border-slate-300">
          <h2 className="text-3xl font-bold text-center mb-8">For Clients</h2>

          <div className="flex gap-5 items-start mb-10">
            <span className="text-3xl" ><IoMdSearch  color="#f59e0b" size={40}/></span>
            <p className="text-2xl text-justify leading-relaxed text-gray-800">
              Discover top talent and specialized services tailored precisely to your project needs quickly and efficiently.
            </p>
          </div>

          <div className="flex gap-5 items-start mb-10">
            <span className="text-3xl"><IoNewspaperOutline color="#f59e0b" size={40} /></span>
            <p className="text-2xl text-justify leading-relaxed text-gray-800">
              Effortlessly share your project details and receive tailored proposals from skilled professionals.
            </p>
          </div>

          <div className="flex gap-5 items-start mb-10">
            <span className="text-3xl"><MdOutlineMessage color="#f59e0b" size={40}/></span>
            <p className="text-2xl text-justify leading-relaxed text-gray-800">
              Communicate directly with workers through integrated chat and manage project milestones effectively.
            </p>
          </div>

          <div className="flex gap-5 items-start">
            <span className="text-3xl"><MdOutlineVerified color="#f59e0b" size={40}/></span>
            <p className="text-2xl text-justify leading-relaxed text-gray-800">
              Approve deliverables confidently and process secure payments upon successful project completion.
            </p>
          </div>
        </div>

        {/* Workers */}
        <div className="flex-1 flex-col bg-white p-[30px] rounded-[20px] shadow-lg   border border-slate-300">
          <h2 className="text-3xl font-bold text-center mb-6">For Workers</h2>

          <div className="flex gap-5 items-start mb-10">
            <span className="text-3xl"><FaRegUser color="#f59e0b" size={40}/></span>
            <p className="text-2xl leading-relaxed text-gray-800">
              Create a compelling professional profile highlighting your unique skills and valuable experience to attract clients.
            </p>
          </div>

          <div className="flex gap-5 items-start mb-10">
            <span className="text-3xl"><BsSuitcaseLg color="#f59e0b" size={40}/></span>
            <p className="text-2xl leading-relaxed text-gray-800">
              Browse and apply for relevant projects that perfectly match your expertise and career aspirations.
            </p>
          </div>

          <div className="flex gap-5 items-start mb-10">
            <span className="text-3xl"><FaCode color="#f59e0b" size={40}/></span>
            <p className="text-2xl leading-relaxed text-gray-800">
              Collaborate seamlessly with clients using our integrated communication and comprehensive project management tools.
            </p>
          </div>

          <div className="flex gap-5 items-start">
            <span className="text-3xl"><FaRegCreditCard color="#f59e0b" size={40}/></span>
            <p className="text-2xl leading-relaxed text-gray-800">
              Receive timely and secure payments for your completed work, ensuring financial stability and peace of mind.
            </p>
          </div>
        </div>

      </div>

      {/* ----- CTA Section ----- */}
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

  </div>
  );
}
