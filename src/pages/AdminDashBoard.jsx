import Navbar from "../components/NavBar";

export default function AdminDashBoard() {

    const roles = [
        {
            job: "plumber",
            amount: 12
        },
        {
            job: "plumber",
            amount: 12
        },
        {
            job: "plumber",
            amount: 12
        },
        {
            job: "plumber",
            amount: 12
        },
         {
            job: "plumber",
            amount: 12
        },
        {
            job: "plumber",
            amount: 12
        },
        {
            job: "plumber",
            amount: 12
        },
        {
            job: "plumber",
            amount: 12
        },
    ]

    const details = [
        {
            name: "kamal"
        },
        {
            name: "kamal"
        },
        {
            name: "kamal"
        },
        {
            name: "kamal"
        },
          {
            name: "kamal"
        },
        {
            name: "kamal"
        },
        {
            name: "kamal"
        },
        {
            name: "kamal"
        },
    ]
    return (
        <div className="bg-slate-100">
            <Navbar />
            <div className="w-full flex flex-col pt-24 my-auto  ">
                <div className="px-6">
                    <h1 className="text-2xl font-bold ">Admin DashBoard</h1>
                </div>
                <div className=" w-full mx-auto flex flex-col lg:flex-row text-slate-400 lg:flex-row items-center justify-center gap-6 p-6 lg:pt-0">

                    <div className="bg-white  w-full lg:w-[25%] flex-1 flex flex-col items-center shadow-xl gap-6 border border-slate-200 py-8 px-8  justify-between">
                        <div className="text-xl font-bold text-slate-500">
                            <h1>Number of completed works</h1>
                        </div>
                        <div className="text-5xl font-bold">
                            <h1>2500</h1>
                        </div>
                    </div>
                    <div className="bg-white w-full lg:w-[25%] flex-1 flex flex-col items-center gap-6  shadow-xl border border-slate-200 border py-8 px-8  justify-between">
                        <div className="text-xl font-bold text-slate-500">
                            <h1>Number of On Going works</h1>
                        </div>
                        <div className="text-5xl font-bold">
                            <h1>1500</h1>
                        </div>
                    </div>
                    <div className="bg-white w-full lg:w-[25%] flex-1 flex flex-col items-center gap-6 shadow-xl border border-slate-200 border py-8 px-8  justify-between">
                        <div className="text-xl font-bold text-slate-500">
                            <h1>Number of Pending Request</h1>
                        </div>
                        <div className="text-5xl font-bold">
                            <h1>103</h1>
                        </div>
                    </div>

                </div>

                <div className="w-full mx-auto flex flex-col  text-slate-400 lg:flex-row items-center justify-center gap-6 p-6">
                    <div className="bg-white  w-full lg:flex-2 flex flex-col items-center justify-center pb-4 shadow-lg border rounded-lg border-slate-200">
                        <div className="w-full p-4">
                            <input type="text" placeholder="Search by service name" className="w-full border px-2 py-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                        <div className="w-full  flex flex-col items-center justify-center">
                            <div className="w-full flex flex-col justify-between items-center px-4 text-lg">
                                {roles.map((role) => {
                                    return (
                                        <div className="w-full flex flex justify-between items-center px-4 text-lg">
                                            <h1 className="mx-4">{role.job}</h1>
                                            <h1 className="mx-4">{role.amount}</h1>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="bg-white w-full lg:flex-3 flex flex-col py-4 shadow-lg border rounded-lg border-slate-200">
                        <div className="px-6">
                            <h1 className="text-xl font-bold text-center lg:text-left">Plumbers</h1>
                        </div>
                        <div className="w-full flex flex-col lg:flex-row justify-center items-center lg:flex-wrap gap-4">
                            {details.map((detail) => {
                                return (
                                    <div className="w-[40%] flex justify-center items-center lg:gap-2 lg:p-2">
                                        <div className="w-[50px] aspect-square rounded-full bg-yellow-300 ">

                                        </div>
                                        <h1 className="font-bold text-xl px-4">{detail.name}</h1>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}