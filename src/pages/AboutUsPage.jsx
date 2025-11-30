export default function AboutUs() {
    return (
        <div className="flex items-center justify-center h-screen w-screen ">
            <h1 className="text-red-500 text-4xl font-bold text-center">
               <h1 className="about-title1 transition-all duration-700 ease-out transform hover:scale-110 hover:text-blue-600">
                    About <span className="about-title-sp1">WorkSure</span>
                </h1>

                <p className="item1-para1 transition-opacity duration-1000 hover:opacity-60">
                    Connecting businesses with top-tier talent, WorkSure is revolutionizing project collaboration <br />
                    and workforce management with innovative solutions.
                </p>
            </h1>
        </div>
    )
}