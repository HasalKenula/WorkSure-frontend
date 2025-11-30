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

                {/*-----item 1-----*/}
                <div className="item1">
                    <div className="item1-left">
                        <img src="" alt="Team meeting" />
                    </div>
                    <div className="item1-right">
                        <h2 className="mission-title">Our Mission</h2>
                        <p className="mission-container">At WorkSure, our mission is to empower businesses and independent professionals by providing a seamless, secure, and intuitive platform for project collaboration. We strive to bridge the gap between talent and opportunity, fostering a dynamic ecosystem where innovation thrives and work is redefined for the modern age. We are committed to transparency, efficiency, and fostering meaningful connections that drive success for everyone.</p>
                    </div>
                </div>

                <h1 className="about-title2">Our Key Objectives</h1>

                {/*-----item 2-----*/}
                <div className="item2">
                    <div className="item2-left">
                        <h3>Accelerate Productivity</h3>
                        <p>Streamline workflows and automate routine tasks to boost team efficiency for all users.</p>
                    </div>
                    <div className="item2-center">
                        <h3>Accelerate Productivity</h3>
                            <p>Streamline workflows and automate routine tasks to boost team efficiency for all users.</p>
                        </div>
                    <div className="item2-right">
                        <h3>Accelerate Productivity</h3>
                        <p>Streamline workflows and automate routine tasks to boost team efficiency for all users.</p>
                    </div>
                </div>

                <h1 className="about-title3">Our Key Objectives</h1>
                <p className="item3-para1">A streamlined process designed for efficiency and clarity, connecting clients with the perfect<br/> talent and empowering workers with new opportunities.</p>














































            </h1>
        </div>
    )
}