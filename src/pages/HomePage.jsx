import Navbar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";
import worker from "../assets/worker.png"
export default function HomePage() {
    const { logout } = useAuth()
    return (
        <div >
            <Navbar />
            <section className="w-full h-[1100px] md:h-screen flex items-center justify-center  my-auto pt-24 bg-red-300">
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

            <section className="w-full h-[1700px] md:h-[900px]  flex items-center justify-center bg-blue-300">
                <div className=" mx-auto flex flex-col md:flex-col items-center p-6 gap-10 ">
                    <h1 className="w-full text-center text-5xl font-bold">Browse All Services</h1>
                    <h3 className="w-full text-center text-xl"> Explore professional workers across multiple service categories</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10 w-full max-w-6xl">
                        <div className="flex flex-col gap-2 rounded-xl  items-center justify-center aspect-square border-2 p-4 border-slate-300">
                            <div className="bg-primary/20  flx item-center rounded-xl justify-center aspect-square border-0 p-4">logo</div>
                            <h1 className="font-bold text-xl">Electrician</h1>
                            <h3>450 professionals</h3>
                        </div>
                         <div className="flex flex-col gap-2 rounded-xl  items-center justify-center aspect-square border-2 p-4 border-slate-300">
                            <div className="bg-primary/20  flx item-center rounded-xl justify-center aspect-square border-0 p-4">logo</div>
                            <h1 className="font-bold text-xl">Electrician</h1>
                            <h3>450 professionals</h3>
                        </div>
                         <div className="flex flex-col gap-2 rounded-xl  items-center justify-center aspect-square border-2 p-4 border-slate-300">
                            <div className="bg-primary/20  flx item-center rounded-xl justify-center aspect-square border-0 p-4">logo</div>
                            <h1 className="font-bold text-xl">Electrician</h1>
                            <h3>450 professionals</h3>
                        </div>
                        <div className="flex flex-col gap-2 rounded-xl  items-center justify-center aspect-square border-2 p-4 border-slate-300">
                            <div className="bg-primary/20  flx item-center rounded-xl justify-center aspect-square border-0 p-4">logo</div>
                            <h1 className="font-bold text-xl">Electrician</h1>
                            <h3>450 professionals</h3>
                        </div>
                         <div className="flex flex-col gap-2 rounded-xl  items-center justify-center aspect-square border-2 p-4 border-slate-300">
                            <div className="bg-primary/20  flx item-center rounded-xl justify-center aspect-square border-0 p-4">logo</div>
                            <h1 className="font-bold text-xl">Electrician</h1>
                            <h3>450 professionals</h3>
                        </div>
                        <div className="flex flex-col gap-2 rounded-xl  items-center justify-center aspect-square border-2 p-4 border-slate-300">
                            <div className="bg-primary/20  flx item-center rounded-xl justify-center aspect-square border-0 p-4">logo</div>
                            <h1 className="font-bold text-xl">Electrician</h1>
                            <h3>450 professionals</h3>
                        </div>
                         <div className="flex flex-col gap-2 rounded-xl  items-center justify-center aspect-square border-2 p-4 border-slate-300">
                            <div className="bg-primary/20  flx item-center rounded-xl justify-center aspect-square border-0 p-4">logo</div>
                            <h1 className="font-bold text-xl">Electrician</h1>
                            <h3>450 professionals</h3>
                        </div>
                        <div className="flex flex-col gap-2 rounded-xl  items-center justify-center aspect-square border-2 p-4 border-slate-300">
                            <div className="bg-primary/20  flx item-center rounded-xl justify-center aspect-square border-0 p-4">logo</div>
                            <h1 className="font-bold text-xl">Electrician</h1>
                            <h3>450 professionals</h3>
                        </div>
                         <div className="flex flex-col gap-2 rounded-xl  items-center justify-center aspect-square border-2 p-4 border-slate-300">
                            <div className="bg-primary/20  flx item-center rounded-xl justify-center aspect-square border-0 p-4">logo</div>
                            <h1 className="font-bold text-xl">Electrician</h1>
                            <h3>450 professionals</h3>
                        </div>
                         <div className="flex flex-col gap-2 rounded-xl  items-center justify-center aspect-square border-2 p-4 border-slate-300">
                            <div className="bg-primary/20  flx item-center rounded-xl justify-center aspect-square border-0 p-4">logo</div>
                            <h1 className="font-bold text-xl">Electrician</h1>
                            <h3>450 professionals</h3>
                        </div>
                        <div className="flex flex-col gap-2 rounded-xl  items-center justify-center aspect-square border-2 p-4 border-slate-300">
                            <div className="bg-primary/20  flx item-center rounded-xl justify-center aspect-square border-0 p-4">logo</div>
                            <h1 className="font-bold text-xl">Electrician</h1>
                            <h3>450 professionals</h3>
                        </div>
                         <div className="flex flex-col gap-2 rounded-xl  items-center justify-center aspect-square border-2 p-4 border-slate-300">
                            <div className="bg-primary/20  flx item-center rounded-xl justify-center aspect-square border-0 p-4">logo</div>
                            <h1 className="font-bold text-xl">Electrician</h1>
                            <h3>450 professionals</h3>
                        </div>
                    </div>
                    <button type="button" className="hover:text-black hover:bg-white border-0 cursor-pointer text-2xl font-bold  bg-black text-white  py-2 px-4 rounded-lg">View All</button>


                </div>
            </section>



        </div>
    )
}