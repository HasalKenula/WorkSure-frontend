import Navbar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";
import worker from "../assets/worker.png"
import service from "../assets/service.jpg"
import { IoIosHammer, IoIosHome, IoIosSearch } from "react-icons/io";
import { MdCarpenter, MdElectricBolt, MdMiscellaneousServices, MdOutlinePlumbing, MdVerifiedUser } from "react-icons/md";
import { GiAutoRepair, GiFireTail, GiLargePaintBrush, GiVacuumCleaner } from "react-icons/gi";
import { FaBuilding, FaLock, FaWind } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { VscGraphLine } from "react-icons/vsc";
import { TbCircleNumber1Filled, TbCircleNumber2Filled, TbCircleNumber3Filled } from "react-icons/tb";
import LoadingAnimation from "../components/LoadingAnimation";
import { useEffect, useState } from "react";
import LogoAnimation from "../components/LogoAnimation";
import Footer from "../components/Footer";
import PremiumHeroSection from "../components/PremiumHeroSection";
import HowItWorksSection from "../components/HowItWorksSection";
export default function HomePage() {
    const { logout } = useAuth()
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => setLoading(false), 2000);
    }, []);
    return (
        <div >
            {loading ? <LoadingAnimation /> : (<>
                <Navbar />
                <section className="w-full h-[100vh] flex items-center justify-center  bg-cover bg-center relative pt-12" style={{ backgroundImage: `url(${service})` }}>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40"></div>

                    <div className="container mx-auto flex flex-col items-center gap-6 relative z-10 px-6 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-white">
                            Your Trusted Partner for Every Service Need.
                        </h1>
                        <p className="text-gray-700 text-lg md:text-xl max-w-2xl text-white">
                            Discover, Book, and Manage professional and personal services with ease.
                            Quality assured, every time.
                        </p>

                        <div className=" p-8 rounded-lg flex flex-col items-center gap-6 w-full md:w-auto">

                            {/* Search Input */}
                            <div className="flex items-center border border-yellow-400 rounded-full px-4 py-2 w-full md:w-[500px] bg-white/80">
                                <IoIosSearch className="text-gray-500 mr-2 text-xl" />
                                <input
                                    type="text"
                                    placeholder="Search for services, e.g., 'plumber', 'Electrician', 'carpenter'"
                                    className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
                                />
                            </div>

                            {/* Buttons - now BELOW the search input */}
                            <div className="flex gap-4 flex-wrap justify-center">
                                <button className="bg-primary text-black font-semibold px-6 py-2 rounded-full hover:bg-yellow-500 transition">
                                    Get Started - It's Free!
                                </button>
                                <button className="border border-yellow-400 text-yellow-400 font-semibold px-6 py-2 rounded-full hover:bg-yellow-50 transition">
                                    Already a Member? Sign In
                                </button>
                            </div>
                        </div>

                    </div>
                </section>
                

                <section className="w-full h-[1700px] md:h-[1100px]  flex items-center justify-center">
                    <div className=" mx-auto flex flex-col md:flex-col items-center p-6 gap-10 ">
                        <h1 className="w-full text-center text-5xl font-bold">Browse All Services</h1>
                        <h3 className="w-full text-center text-xl"> Explore professional workers across multiple service categories</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10 w-full max-w-6xl">


                           <div className="group relative flex flex-col items-center justify-center gap-4 w-64 h-64 rounded-[32px] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-6 transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
                                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-100 via-amber-100 to-yellow-200 shadow-inner transition-all duration-300 group-hover:scale-[1.1]"> <MdElectricBolt size={36} className="text-amber-500" /></div>
                                <h1 className="mt-4 text-2xl font-bold text-slate-900 tracking-wide">Electrician</h1>
                                <p className="mt-1 text-sm text-slate-500"> 450 Verified Professionals</p>
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-amber-100/20 blur-3xl pointer-events-none" />
                                <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-yellow-100/15 blur-2xl pointer-events-none" />
                            </div>

                           <div className="group relative flex flex-col items-center justify-center gap-4 w-64 h-64 rounded-[32px] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-6 transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
                                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-100 via-amber-100 to-yellow-200 shadow-inner transition-all duration-300 group-hover:scale-[1.1]"><MdOutlinePlumbing size={36} className="text-amber-500" /></div>
                                <h1 className="mt-4 text-2xl font-bold text-slate-900 tracking-wide">Plumbers</h1>
                                <p className="mt-1 text-sm text-slate-500"> 450 Verified Professionals</p>
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-amber-100/20 blur-3xl pointer-events-none" />
                                <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-yellow-100/15 blur-2xl pointer-events-none" />
                            </div>

                           <div className="group relative flex flex-col items-center justify-center gap-4 w-64 h-64 rounded-[32px] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-6 transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
                                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-100 via-amber-100 to-yellow-200 shadow-inner transition-all duration-300 group-hover:scale-[1.1]"><IoIosHammer size={36} className="text-amber-500" /></div>
                                <h1 className="mt-4 text-2xl font-bold text-slate-900 tracking-wide">Carpenters</h1>
                                <p className="mt-1 text-sm text-slate-500"> 450 Verified Professionals</p>
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-amber-100/20 blur-3xl pointer-events-none" />
                                <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-yellow-100/15 blur-2xl pointer-events-none" />
                            </div>

                            <div className="group relative flex flex-col items-center justify-center gap-4 w-64 h-64 rounded-[32px] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-6 transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
                                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-100 via-amber-100 to-yellow-200 shadow-inner transition-all duration-300 group-hover:scale-[1.1]"><GiLargePaintBrush size={36} className="text-amber-500" /></div>
                                <h1 className="mt-4 text-2xl font-bold text-slate-900 tracking-wide">Painters</h1>
                                <p className="mt-1 text-sm text-slate-500"> 450 Verified Professionals</p>
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-amber-100/20 blur-3xl pointer-events-none" />
                                <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-yellow-100/15 blur-2xl pointer-events-none" />
                            </div>

                            <div className="group relative flex flex-col items-center justify-center gap-4 w-64 h-64 rounded-[32px] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-6 transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
                                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-100 via-amber-100 to-yellow-200 shadow-inner transition-all duration-300 group-hover:scale-[1.1]"><MdCarpenter size={36} className="text-amber-500" /></div>
                                <h1 className="mt-4 text-2xl font-bold text-slate-900 tracking-wide">Masons</h1>
                                <p className="mt-1 text-sm text-slate-500"> 450 Verified Professionals</p>
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-amber-100/20 blur-3xl pointer-events-none" />
                                <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-yellow-100/15 blur-2xl pointer-events-none" />
                            </div>

                            <div className="group relative flex flex-col items-center justify-center gap-4 w-64 h-64 rounded-[32px] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-6 transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
                                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-100 via-amber-100 to-yellow-200 shadow-inner transition-all duration-300 group-hover:scale-[1.1]"><GiFireTail size={36} className="text-amber-500" /></div>
                                <h1 className="mt-4 text-2xl font-bold text-slate-900 tracking-wide">Welders</h1>
                                <p className="mt-1 text-sm text-slate-500"> 450 Verified Professionals</p>
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-amber-100/20 blur-3xl pointer-events-none" />
                                <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-yellow-100/15 blur-2xl pointer-events-none" />
                            </div>

                            <div className="group relative flex flex-col items-center justify-center gap-4 w-64 h-64 rounded-[32px] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-6 transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
                                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-100 via-amber-100 to-yellow-200 shadow-inner transition-all duration-300 group-hover:scale-[1.1]"><FaWind size={36} className="text-amber-500" /></div>
                                <h1 className="mt-4 text-2xl font-bold text-slate-900 tracking-wide">HVAC</h1>
                                <p className="mt-1 text-sm text-slate-500"> 450 Verified Professionals</p>
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-amber-100/20 blur-3xl pointer-events-none" />
                                <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-yellow-100/15 blur-2xl pointer-events-none" />
                            </div>

                            <div className="group relative flex flex-col items-center justify-center gap-4 w-64 h-64 rounded-[32px] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-6 transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
                                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-100 via-amber-100 to-yellow-200 shadow-inner transition-all duration-300 group-hover:scale-[1.1]"><IoIosHome size={36} className="text-amber-500" /></div>
                                <h1 className="mt-4 text-2xl font-bold text-slate-900 tracking-wide">Landscapers</h1>
                                <p className="mt-1 text-sm text-slate-500"> 450 Verified Professionals</p>
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-amber-100/20 blur-3xl pointer-events-none" />
                                <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-yellow-100/15 blur-2xl pointer-events-none" />
                            </div>

                            <div className="group relative flex flex-col items-center justify-center gap-4 w-64 h-64 rounded-[32px] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-6 transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
                                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-100 via-amber-100 to-yellow-200 shadow-inner transition-all duration-300 group-hover:scale-[1.1]"><FaBuilding size={36} className="text-amber-500" /></div>
                                <h1 className="mt-4 text-2xl font-bold text-slate-900 tracking-wide">Contractors</h1>
                                <p className="mt-1 text-sm text-slate-500"> 450 Verified Professionals</p>
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-amber-100/20 blur-3xl pointer-events-none" />
                                <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-yellow-100/15 blur-2xl pointer-events-none" />
                            </div>

                            <div className="group relative flex flex-col items-center justify-center gap-4 w-64 h-64 rounded-[32px] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-6 transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
                                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-100 via-amber-100 to-yellow-200 shadow-inner transition-all duration-300 group-hover:scale-[1.1]"><GiVacuumCleaner size={36} className="text-amber-500" /></div>
                                <h1 className="mt-4 text-2xl font-bold text-slate-900 tracking-wide">Cleaners</h1>
                                <p className="mt-1 text-sm text-slate-500"> 450 Verified Professionals</p>
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-amber-100/20 blur-3xl pointer-events-none" />
                                <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-yellow-100/15 blur-2xl pointer-events-none" />
                            </div>

                            <div className="group relative flex flex-col items-center justify-center gap-4 w-64 h-64 rounded-[32px] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-6 transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
                                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-100 via-amber-100 to-yellow-200 shadow-inner transition-all duration-300 group-hover:scale-[1.1]"><GiAutoRepair size={36} className="text-amber-500" /></div>
                                <h1 className="mt-4 text-2xl font-bold text-slate-900 tracking-wide">Aequipment Repair</h1>
                                <p className="mt-1 text-sm text-slate-500"> 450 Verified Professionals</p>
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-amber-100/20 blur-3xl pointer-events-none" />
                                <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-yellow-100/15 blur-2xl pointer-events-none" />
                            </div>

                            <div className="group relative flex flex-col items-center justify-center gap-4 w-64 h-64 rounded-[32px] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-6 transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
                                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-100 via-amber-100 to-yellow-200 shadow-inner transition-all duration-300 group-hover:scale-[1.1]"><MdMiscellaneousServices size={36} className="text-amber-500" /></div>
                                <h1 className="mt-4 text-2xl font-bold text-slate-900 tracking-wide">General Services</h1>
                                <p className="mt-1 text-sm text-slate-500"> 450 Verified Professionals</p>
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-amber-100/20 blur-3xl pointer-events-none" />
                                <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-yellow-100/15 blur-2xl pointer-events-none" />
                            </div>
                        </div>
                        <button type="button" className="hover:text-black hover:bg-white border-0 cursor-pointer text-2xl font-bold  bg-black text-white  py-2 px-4 rounded-lg">View All</button>


                    </div>
                </section>

                <section>
                    <div className="relative w-full h-[1300px] md:h-[550px] bg-contain  bg-no-repeat text-white bg-right flex justify-center items-center " style={{ backgroundImage: `url(${worker})` }}>
                        <div className="absolute inset-0 bg-black/80"></div>
                        <div className="relative mx-auto flex flex-col items-center justify-center gap-10">
                            <h1 className="w-full text-center text-5xl font-bold">Why Choose WorkSure?</h1>
                            <h3 className="w-full text-center text-xl"> We ensure quality, trust, and professional service in every transaction</h3>
                            <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-4 w-full gap-6  max-w-6xl items-center justify-center">
                                <div className="flex flex-col items-center justify-center gap-4 aspect-square  w-52 sm:w-52 md:w-48 lg:w-52 xl:w-56 p-4 border-2 border-white/30 rounded-xl hover:shadow-lg transition-shadow duration-300">
                                    <div className="bg-primary/20  flx items-center rounded-xl justify-center aspect-square border-0 p-4"><MdVerifiedUser color="#f59e0b" size={40} /></div>
                                    <h1 className="font-bold text-xl">Verified Workers</h1>
                                    <h3 className="text-center">All professionals thoroughly vetted and background-checked.</h3>
                                </div>
                                <div className="flex flex-col items-center justify-center gap-4 aspect-square  w-52 sm:w-52 md:w-48 lg:w-52 xl:w-56 p-4 border-2 border-white/30 rounded-xl hover:shadow-lg transition-shadow duration-300">
                                    <div className="bg-primary/20  flx items-center rounded-xl justify-center aspect-square border-0 p-4"><FaLock color="#f59e0b" size={40} /></div>
                                    <h1 className="font-bold text-xl">Secure Payments</h1>
                                    <h3 className="text-center">Safe transactions protecting clients and workers.</h3>
                                </div>
                                <div className="flex flex-col items-center justify-center gap-4 aspect-square  w-52 sm:w-52 md:w-48 lg:w-52 xl:w-56 p-4 border-2 border-white/30 rounded-xl hover:shadow-lg transition-shadow duration-300">
                                    <div className="bg-primary/20  flx items-center rounded-xl justify-center aspect-square border-0 p-4"><IoTime color="#f59e0b" size={40} /></div>
                                    <h1 className="font-bold text-xl">Fast Response</h1>
                                    <h3 className="text-center">Quick booking and scheduling for your convenience.</h3>
                                </div>
                                <div className="flex flex-col items-center justify-center gap-4 w-52 sm:w-52 md:w-48 lg:w-52 xl:w-56 p-4 border-2 aspect-square  border-white/30 rounded-xl hover:shadow-lg transition-shadow duration-300">
                                    <div className="bg-primary/20  flx items-center rounded-xl justify-center aspect-square border-0 p-4"><VscGraphLine color="#f59e0b" size={40} /></div>
                                    <h1 className="font-bold text-xl text-center">Transparent <br />Reviews</h1>
                                    <h3 className="text-center">Real ratings and feedback from actual clients.</h3>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                {/*
                <section>
                    <div className="w-full h-[1300px] md:h-[550px]  flex justify-center items-center ">
                        <div className="mx-auto flex flex-col items-center justify-center gap-10">
                            <h1 className="w-full text-center text-5xl font-bold">How WorkSure Works</h1>
                            <h3 className="w-full text-center text-xl">Get professional work done in 3 simple steps</h3>
                            <div className="grid grid-cols sm:grid-cols-3 md:grid-cols-3 w-full gap-24  max-w-6xl items-center justify-center">
                                <div className="flex flex-col items-center justify-center gap-4 aspect-square  w-52 sm:w-52 md:w-48 lg:w-52 xl:w-56 p-4 border-2 border-black/30 rounded-xl hover:shadow-lg transition-shadow duration-300">
                                    <div className="bg-primary/20  flx items-center rounded-xl justify-center aspect-square border-0 p-4"><TbCircleNumber1Filled color="#f59e0b" size={40} /></div>
                                    <h1 className="font-bold text-xl">Search & Browse</h1>
                                    <h3 className="text-center">Find workers by skill, location, and ratings. View detailed profiles and experience.</h3>
                                </div>
                                <div className="flex flex-col items-center justify-center gap-4 aspect-square  w-52 sm:w-52 md:w-48 lg:w-52 xl:w-56 p-4 border-2 border-black/30 rounded-xl hover:shadow-lg transition-shadow duration-300">
                                    <div className="bg-primary/20  flx items-center rounded-xl justify-center aspect-square border-0 p-4"><TbCircleNumber2Filled color="#f59e0b" size={40} /></div>
                                    <h1 className="font-bold text-xl">Book Service</h1>
                                    <h3 className="text-center">Choose your preferred professional and book the service directly through our platform.</h3>
                                </div>
                                <div className="flex flex-col items-center justify-center gap-4 aspect-square  w-52 sm:w-52 md:w-48 lg:w-52 xl:w-56 p-4 border-2 border-black/30 rounded-xl hover:shadow-lg transition-shadow duration-300">
                                    <div className="bg-primary/20  flx items-center rounded-xl justify-center aspect-square border-0 p-4"><TbCircleNumber3Filled color="#f59e0b" size={40} /></div>
                                    <h1 className="font-bold text-xl">Secure Payment</h1>
                                    <h3 className="text-center">Pay securely through WorkSure. Release payment only after work completion.</h3>
                                </div>


                            </div>
                        </div>
                    </div>
                </section> */}
                {/*<PremiumHeroSection/>*/}
                <HowItWorksSection/>

                {/*< LogoAnimation />*/}

                <section className="relative w-full py-24 flex items-center justify-center bg-[#FFF8ED] overflow-hidden">

                 {/* Soft Decorative Elements */}
                    <div className="absolute top-12 left-12 w-40 h-40 bg-yellow-300/30 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-12 right-12 w-56 h-56 bg-yellow-400/20 rounded-full blur-3xl"></div>

                    <div className="relative z-10 text-center px-6 max-w-3xl">
        
                    <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-tight mb-6"> Ready to Simplify Your  <span className="block text-yellow-500"> Service Search?</span></h1>

                    <p className="text-black/70 text-lg md:text-xl mb-10">Find reliable professionals, book with confidence, and get things done without stress.</p>

                {/* BUTTONS */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">

                <button className="bg-black text-white font-semibold px-10 py-4 rounded-full shadow-lg transition transform hover:scale-105 hover:bg-gray-900">Join WorkSure Today</button>
                <button className="bg-yellow-400 text-black font-semibold px-10 py-4 rounded-full shadow-lg transition transform hover:scale-105 hover:bg-yellow-500">Learn More</button>
            </div>
        </div>
    </section>


                {/*<PremiumHeroSection/>*/}
                <Footer/>

            </>)}

        </div>
    )
}