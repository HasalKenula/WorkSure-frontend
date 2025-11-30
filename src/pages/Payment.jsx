
import React, { useState } from "react";
//import img1 from "../assets/img1.png"

const Payment = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="container">

        <style>
          {`
              .container{
  color: black;
  background-color: rgb(254, 255, 241);
  
}

.about-title1,.about-title2,.about-title3{
  text-align: center;
  color: black;
  margin-top: 55px;
}

.about-title-sp1{
  color: lch(74.93% 82.5 73.14);
}

.item1-para1,.item3-para1{
  text-align: center;
}

.item1,.item2,.item3{
  display: flex;
  gap: 40px;
  justify-content: center;
}

.item1-left{
  width: 500px;
  margin-top: 50px;
  background: #ffffff;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);

}

.item1-img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
}

.item1-right{
  width: 500px;
  margin-top: 50px;
  background: #ffffff;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);


}

.mission-title{
  text-align: center;
}

.mission-container{
  justify-content: baseline;
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 50px;
}

.item2-left,.item2-center,.item2-right{
  width: 250px;
  background: #ffffff;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  text-align: center;
  
}

.item3-left,.item3-right{
  width: 340px;
  background: #ffffff;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}


.item3 h2 {
  margin-bottom: 25px;
  font-size: 24px;
  font-weight: 700;
}

.item {
  display: flex;
  gap: 15px;
  align-items: flex-start;
  margin-bottom: 20px;
}

.icon {
  font-size: 22px;
  margin-top: 4px;
}

.item p {
  margin: 0;
  font-size: 15px;
  line-height: 1.5;
  color: #333;
}


/* CTA Section */
.cta-section {
  background: lch(74.93% 82.5 73.14);;
  padding: 40px 20px;
  border-radius: 15px;
  text-align: center;
  color: #ffffff;
  max-width: 1000px;
  margin: 30px auto;
}

.cta-section h2 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
}

.cta-subtext {
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 25px;
}

/* Buttons */
.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.cta-btn {
  padding: 10px 22px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: 0.3s ease;
}

.cta-btn.white {
  background: #ffffff;
  color: #000;
  border: 2px solid transparent;
}

.cta-btn.white:hover {
  background: transparent;
  color: #ffffff;
  border: 2px solid #ffffff;
}

/* Mobile Responsive */
@media (max-width: 600px) {
  .cta-buttons {
    flex-direction: column;
    gap: 12px;
  }
}
`}
        </style>


        {/*}
        <h1 className="about-title1">About <span className="about-title-sp1">WorkSure</span></h1>

        <p className="item1-para1">Connecting businesses with top-tier talent, WorkSure is revolutionizing project collaboration <br></br> and workforce management with innovative solutions.</p>
        */}

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
        
        {/*-----item 3-----*/}
        <div className="item3">
          <div className="item3-left">
            <h2>For Clients</h2>

            <div className="item">
              <span className="icon">🔍</span>
              <p>Discover top talent and specialized services tailored precisely to your project needs quickly and efficiently.</p>
            </div>

          <div className="item">
            <span className="icon">📄</span>
            <p>Easily post detailed project requirements and receive tailored proposals from qualified professionals.</p>
          </div>

          <div className="item">
            <span className="icon">💬</span>
            <p>Communicate directly with workers through integrated chat and manage project milestones effectively.</p>
          </div>

          <div className="item">
            <span className="icon">✔️</span>
            <p>Approve deliverables confidently and process secure payments upon successful project completion.</p>
          </div>

          </div>
          <div className="item3-right">
            <h2>For Workers</h2>

            <div className="item">
              <span className="icon">👤</span>
              <p>Create a compelling professional profile highlighting your unique skills and valuable experience to attract clients.</p>
            </div>

            <div className="item">
              <span className="icon">💼</span>
              <p>Browse and apply for relevant projects that perfectly match your expertise and career aspirations.</p>
            </div>

            <div className="item">
              <span className="icon">💻</span>
              <p>Collaborate seamlessly with clients using our integrated communication and comprehensive project management tools.</p>
            </div>

            <div className="item">
              <span className="icon">📦</span>
              <p>Receive timely and secure payments for your completed work, ensuring financial stability and peace of mind.</p>
            </div>

          </div>
        </div>

        <section className="cta-section">
  <h2>Ready to Experience WorkSure?</h2>
  <p className="cta-subtext">
    Join our growing community of successful businesses and talented professionals.<br/>
    Discover the future of work today!
  </p>

  <div className="cta-buttons">
    <a href="#" className="cta-btn white">Get Started as a Client</a>
    <a href="#" className="cta-btn white">Become a Worker</a>
  </div>
</section>




    
    
    
    
    
    
    
    
    </div>
    
  );
};

export default Payment;




/*

<div className="flex items-center justify-center h-screen w-screen ">
            <h1 className="text-red-500 text-4xl font-bold text-center"></h1>*/
