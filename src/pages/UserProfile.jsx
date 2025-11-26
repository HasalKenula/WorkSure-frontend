    import Navbar from "../components/NavBar"
    import MM from "../assets/MM.jpg";
    export default function UserProfile() {
    return (
    <>
        <Navbar></Navbar>
        < div className="mt-19 flex justify-center items-center min-h-screen font-outfit relative overflow-hidden border-2 border-pink-600 border-solid">{/*full page*/}
             <div className="shadow-2xl w-[85%] h-[200vh] flex flex-col  rounded-2xl mt-6  bg-white/10 backdrop-blur-xl border-2 border-pink-600 border-solid">{/*small page*/}
                {/*your name*/}
                <div className="border-2 border-pink-600 border-solid h-[10vh]">
                    <h1 className="mt-5 ml-5 w-100 text-4xl font-bold text-primary border-2 border-pink-600 border-solid">Your Profile</h1>
                </div>

                {/*details*/}
                <div className="border-2 border-pink-600 border-solid mt-5 h-[50vh] flex flex-row">
                    {/*photo*/}
                    <div className="border-2 border-pink-600 border-solid w-1/4 flex flex-col">
                        <div  className="border-2 border-pink-600 border-solid h-[40vh] justify-center items-center flex">
                            <div className="w-52 h-52 border-2 border-pink-600 border-solid rounded-full overflow-hidden ">
                                <img src={MM} className="w-full h-full object-cover " alt="mm" />
                            </div>

                        </div>

                        {/*button*/}
                        <div  className="border-2 border-pink-600 border-solid h-[10vh] flex justify-center items-center">
                            <button  className="  text-lg font-semibold  text-black rounded-xl shadow-md hover:bg-gray-300 hover:scale-105 hover:shadow-xl transition-all duration-300 w-1/3 h-1/2 border border-gray-400">Edit Image</button>
                        </div>
                    </div>

                    {/*right-details*/}
                    <div  className="border-2 border-red-600 border-solid w-3/4">
                        <form className="flex flex-col space-y-5 mt-6">
                            <div className="inline-flex  flex-row">
                            <label className="border-2 border-red-600 border-solid ml-20  font-semibold text-lg mt-5">User  Name </label>
                           <input type="text" placeholder="Ishini Shehara" className="ml-12 w-[50%] p-2 border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none"/>
                            </div>

                            <div className="inline-flex  flex-row">
                            <label className="border-2 border-red-600 border-solid ml-20  font-semibold text-lg mt-5">Email </label>
                           <input type="text" placeholder="Ishini Shehara" className="ml-24 w-[50%] p-2 border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none"/>
                            </div>

                            <div className="inline-flex  flex-row">
                            <label className="border-2 border-red-600 border-solid ml-20  font-semibold text-lg mt-5">Address</label>
                           <input type="text" placeholder="Ishini Shehara" className="ml-19 w-[50%] p-2 border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none"/>
                            </div>


                            <div className="inline-flex  flex-row">
                            <label className="border-2 border-red-600 border-solid ml-20  font-semibold text-lg mt-5">Contact  No </label>
                           <input type="text" placeholder="Ishini Shehara" className="ml-13 w-[50%] p-2 border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none"/>
                            </div>
                            
                        
                        </form>
                        
                        
                    </div>
                </div>

                {/*topic*/}
                <div className="border-2 border-pink-600 border-solid h-1/5"></div>

                {/*password*/}
                <div className="border-2 border-pink-600 border-solid h-1/5"></div>

                {/*button*/}
                <div className="border-2 border-pink-600 border-solid h-1/5"></div>
            </div>
           
        </div>
    </>
    )
}