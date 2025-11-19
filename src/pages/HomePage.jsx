import Navbar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";
export default function HomePage() {
    const { logout } = useAuth()
    return (
        <div >
            <Navbar />
            <section className="w-full h-screen flex items-center justify-center bg-red-300">
                <div className="container mx-auto flex flex-col md:flex-row items-center p-6 gap-10 bg-red-700">


                    <div className="flex-1 space-y-8 bg-yellow-300">
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
                               <button type="button"  className="hover:text-primary cursor-pointer border-0 p-2 rounded-lg">Find Now</button>
                            </div >
                        </div>
                    </div>


                    <div className="flex-1 flex justify-center bg-blue-300">
                        <img src="https://via.placeholder.com/400"
                            alt="Example Image"
                            className="rounded-xl shadow-lg object-cover" />
                    </div>

                </div>
            </section>



        </div>
    )
}