import Navbar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";
import worker from "../assets/worker.png"
import { IoIosHammer, IoIosHome } from "react-icons/io";
import { MdCarpenter, MdElectricBolt, MdMiscellaneousServices, MdOutlinePlumbing, MdVerifiedUser } from "react-icons/md";
import { GiAutoRepair, GiFireTail, GiLargePaintBrush, GiVacuumCleaner } from "react-icons/gi";
import { FaBuilding, FaLock, FaWind } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { VscGraphLine } from "react-icons/vsc";
import { TbCircleNumber1Filled, TbCircleNumber2Filled, TbCircleNumber3Filled } from "react-icons/tb";
export default function HomePage() {
    const { logout } = useAuth()
    return (
        <div >
            <Navbar />
            <section className="w-full h-[1100px] md:h-screen flex items-center justify-center  my-auto pt-24">
                <div className="container mx-auto flex flex-col md:flex-row items-center p-6 gap-10 ">


                    <div className="flex-1 space-y-8 ">
                        <h3 className="bg-primary/20 border border-primary rounded-lg w-[200px] text-center">Trusted by 50,000+ Users</h3>
                        <h1 className="text-6xl font-bold">Find Verified <br /> <span className="text-primary">Skilled Workers</span> <br />Instantly</h1>
                        <p className="text-xl text-gray-600">
                            The largest collection of verified professionals for <br />  electrical, plumbing,
                            carpentry, and 100+ other  <br /> services.
                            Secure payments, real reviews,  <br /> professional service every time.
                        </p>
                        <div className="flex gap-4 items-center justify-between">
                            <div className="flex-[3]">
                                <input type="text" placeholder="Search by service name" className="w-full border px-4 py-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                            </div >
                            <div className="flex-[1]">
                                <button type="button" className="hover:text-primary cursor-pointer border-0 p-2 rounded-lg bg-primary">Find Now</button>
                            </div >
                        </div>
                    </div>


                    <div className="flex-1 flex justify-center ">
                        <img src={worker}
                            alt="Example Image"
                            className="object-cover" />
                    </div>

                </div>
            </section>

            <section className="w-full h-[1700px] md:h-[1100px]  flex items-center justify-center">
                <div className=" mx-auto flex flex-col md:flex-col items-center p-6 gap-10 ">
                    <h1 className="w-full text-center text-5xl font-bold">Browse All Services</h1>
                    <h3 className="w-full text-center text-xl"> Explore professional workers across multiple service categories</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10 w-full max-w-6xl">
                        <div className="flex flex-col gap-2 rounded-xl  items-center justify-center aspect-square border-2 p-4 border-slate-300">
                            <div className="bg-primary/20  flx items-center rounded-xl justify-center aspect-square border-0 p-4"><MdElectricBolt color="#f59e0b" size={40}/></div>
                            <h1 className="font-bold text-xl">Electrician</h1>
                            <h3>450 professionals</h3>
                        </div>
                        <div className="flex flex-col gap-2 rounded-xl  items-center justify-center aspect-square border-2 p-4 border-slate-300">
                            <div className="bg-primary/20  flx items-center rounded-xl justify-center aspect-square border-0 p-4"><MdOutlinePlumbing color="#f59e0b" size={40}/></div>
                            <h1 className="font-bold text-xl">Plumbers</h1>
                            <h3>450 professionals</h3>
                        </div>
                        <div className="flex flex-col gap-2 rounded-xl  items-center justify-center aspect-square border-2 p-4 border-slate-300">
                            <div className="bg-primary/20  flx items-center rounded-xl justify-center aspect-square border-0 p-4"><IoIosHammer color="#f59e0b" size={40}/></div>
                            <h1 className="font-bold text-xl">Capenters</h1>
                            <h3>450 professionals</h3>
                        </div>
                        <div className="flex flex-col gap-2 rounded-xl  items-center justify-center aspect-square border-2 p-4 border-slate-300">
                            <div className="bg-primary/20  flx items-center rounded-xl justify-center aspect-square border-0 p-4"><GiLargePaintBrush color="#f59e0b" size={40}/></div>
                            <h1 className="font-bold text-xl">Painters</h1>
                            <h3>450 professionals</h3>
                        </div>
                        <div className="flex flex-col gap-2 rounded-xl  items-center justify-center aspect-square border-2 p-4 border-slate-300">
                            <div className="bg-primary/20  flx items-center rounded-xl justify-center aspect-square border-0 p-4"><MdCarpenter color="#f59e0b" size={40}/></div>
                            <h1 className="font-bold text-xl">Masons</h1>
                            <h3>450 professionals</h3>
                        </div>
                        <div className="flex flex-col gap-2 rounded-xl  items-center justify-center aspect-square border-2 p-4 border-slate-300">
                            <div className="bg-primary/20  flx items-center rounded-xl justify-center aspect-square border-0 p-4"><GiFireTail color="#f59e0b" size={40}/></div>
                            <h1 className="font-bold text-xl">Welders</h1>
                            <h3>450 professionals</h3>
                        </div>
                        <div className="flex flex-col gap-2 rounded-xl  items-center justify-center aspect-square border-2 p-4 border-slate-300">
                            <div className="bg-primary/20  flx items-center rounded-xl justify-center aspect-square border-0 p-4"><FaWind color="#f59e0b" size={40}/></div>
                            <h1 className="font-bold text-xl">HVAC</h1>
                            <h3>450 professionals</h3>
                        </div>
                        <div className="flex flex-col gap-2 rounded-xl  items-center justify-center aspect-square border-2 p-4 border-slate-300">
                            <div className="bg-primary/20  flx items-center rounded-xl justify-center aspect-square border-0 p-4"><IoIosHome color="#f59e0b" size={40}/></div>
                            <h1 className="font-bold text-xl">Landscapers</h1>
                            <h3>450 professionals</h3>
                        </div>
                        <div className="flex flex-col gap-2 rounded-xl  items-center justify-center aspect-square border-2 p-4 border-slate-300">
                            <div className="bg-primary/20  flx items-center rounded-xl justify-center aspect-square border-0 p-4"><FaBuilding color="#f59e0b" size={40}/></div>
                            <h1 className="font-bold text-xl">Contractors</h1>
                            <h3>450 professionals</h3>
                        </div>
                        <div className="flex flex-col gap-2 rounded-xl  items-center justify-center aspect-square border-2 p-4 border-slate-300">
                            <div className="bg-primary/20  flx items-center rounded-xl justify-center aspect-square border-0 p-4"><GiVacuumCleaner color="#f59e0b" size={40}/></div>
                            <h1 className="font-bold text-xl">Cleaners</h1>
                            <h3>450 professionals</h3>
                        </div>
                        <div className="flex flex-col gap-2 rounded-xl  items-center justify-center aspect-square border-2 p-4 border-slate-300">
                            <div className="bg-primary/20  flx items-center rounded-xl justify-center aspect-square border-0 p-4"><GiAutoRepair color="#f59e0b" size={40}/></div>
                            <h1 className="font-bold text-xl">Equipment Repair</h1>
                            <h3>450 professionals</h3>
                        </div>
                        <div className="flex flex-col gap-2 rounded-xl  items-center justify-center aspect-square border-2 p-4 border-slate-300">
                            <div className="bg-primary/20  flx items-center rounded-xl justify-center aspect-square border-0 p-4"><MdMiscellaneousServices color="#f59e0b" size={40}/></div>
                            <h1 className="font-bold text-xl">General Services</h1>
                            <h3>450 professionals</h3>
                        </div>
                    </div>
                    <button type="button" className="hover:text-black hover:bg-white border-0 cursor-pointer text-2xl font-bold  bg-black text-white  py-2 px-4 rounded-lg">View All</button>


                </div>
            </section>

            <section>
                <div className="w-full h-[1300px] md:h-[550px]  flex justify-center items-center ">
                    <div className="mx-auto flex flex-col items-center justify-center gap-10">
                        <h1 className="w-full text-center text-5xl font-bold">Why Choose WorkSure?</h1>
                        <h3 className="w-full text-center text-xl"> We ensure quality, trust, and professional service in every transaction</h3>
                        <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-4 w-full gap-6  max-w-6xl items-center justify-center">
                            <div className="flex flex-col items-center justify-center gap-4 aspect-square  w-52 sm:w-52 md:w-48 lg:w-52 xl:w-56 p-4 border-2 border-black/30 rounded-xl hover:shadow-lg transition-shadow duration-300">
                                <div className="bg-primary/20  flx items-center rounded-xl justify-center aspect-square border-0 p-4"><MdVerifiedUser color="#f59e0b" size={40}/></div>
                                <h1 className="font-bold text-xl">Verified Workers</h1>
                                <h3 className="text-center">All professionals thoroughly vetted and background-checked.</h3>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-4 aspect-square  w-52 sm:w-52 md:w-48 lg:w-52 xl:w-56 p-4 border-2 border-black/30 rounded-xl hover:shadow-lg transition-shadow duration-300">
                                <div className="bg-primary/20  flx items-center rounded-xl justify-center aspect-square border-0 p-4"><FaLock color="#f59e0b" size={40}/></div>
                                <h1 className="font-bold text-xl">Secure Payments</h1>
                                <h3 className="text-center">Safe transactions protecting clients and workers.</h3>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-4 aspect-square  w-52 sm:w-52 md:w-48 lg:w-52 xl:w-56 p-4 border-2 border-black/30 rounded-xl hover:shadow-lg transition-shadow duration-300">
                                <div className="bg-primary/20  flx items-center rounded-xl justify-center aspect-square border-0 p-4"><IoTime color="#f59e0b" size={40}/></div>
                                <h1 className="font-bold text-xl">Fast Response</h1>
                                <h3 className="text-center">Quick booking and scheduling for your convenience.</h3>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-4 w-52 sm:w-52 md:w-48 lg:w-52 xl:w-56 p-4 border-2 aspect-square  border-black/30 rounded-xl hover:shadow-lg transition-shadow duration-300">
                                <div className="bg-primary/20  flx items-center rounded-xl justify-center aspect-square border-0 p-4"><VscGraphLine color="#f59e0b" size={40}/></div>
                                <h1 className="font-bold text-xl text-center">Transparent <br/>Reviews</h1>
                                <h3 className="text-center">Real ratings and feedback from actual clients.</h3>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            
            <section>
                <div className="w-full h-[1300px] md:h-[550px]  flex justify-center items-center ">
                    <div className="mx-auto flex flex-col items-center justify-center gap-10">
                        <h1 className="w-full text-center text-5xl font-bold">How WorkSure Works</h1>
                        <h3 className="w-full text-center text-xl">Get professional work done in 3 simple steps</h3>
                        <div className="grid grid-cols sm:grid-cols-3 md:grid-cols-3 w-full gap-24  max-w-6xl items-center justify-center">
                            <div className="flex flex-col items-center justify-center gap-4 aspect-square  w-52 sm:w-52 md:w-48 lg:w-52 xl:w-56 p-4 border-2 border-black/30 rounded-xl hover:shadow-lg transition-shadow duration-300">
                                <div className="bg-primary/20  flx items-center rounded-xl justify-center aspect-square border-0 p-4"><TbCircleNumber1Filled color="#f59e0b" size={40}/></div>
                                <h1 className="font-bold text-xl">Search & Browse</h1>
                                <h3 className="text-center">Find workers by skill, location, and ratings. View detailed profiles and experience.</h3>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-4 aspect-square  w-52 sm:w-52 md:w-48 lg:w-52 xl:w-56 p-4 border-2 border-black/30 rounded-xl hover:shadow-lg transition-shadow duration-300">
                                <div className="bg-primary/20  flx items-center rounded-xl justify-center aspect-square border-0 p-4"><TbCircleNumber2Filled color="#f59e0b" size={40}/></div>
                                <h1 className="font-bold text-xl">Book Service</h1>
                                <h3 className="text-center">Choose your preferred professional and book the service directly through our platform.</h3>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-4 aspect-square  w-52 sm:w-52 md:w-48 lg:w-52 xl:w-56 p-4 border-2 border-black/30 rounded-xl hover:shadow-lg transition-shadow duration-300">
                                <div className="bg-primary/20  flx items-center rounded-xl justify-center aspect-square border-0 p-4"><TbCircleNumber3Filled color="#f59e0b" size={40}/></div>
                                <h1 className="font-bold text-xl">Secure Payment</h1>
                                <h3 className="text-center">Pay securely through WorkSure. Release payment only after work completion.</h3>
                            </div>
                           

                        </div>
                    </div>
                </div>
            </section>



        </div>
    )
}