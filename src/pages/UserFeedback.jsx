import Navbar from "../components/NavBar";
import { FaUserCircle, FaStar } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

import React, { useState } from 'react'


export default function UserFeedback() {
    const location = useLocation();
    const navigate = useNavigate();
    const workerData = location.state || { name: "Unknown Worker" };

    const gotoprofile = () => {
        navigate("/workerProfile");
     };

     const colors={
        orange:"#FFBA5A",
        grey:"#a9a9a9"
     }

     const stars=Array(5).fill(0);
     const [currentValue,setCurrentValue]=React.useState(0);
      const [hoverValue,setHoverValue]=React.useState(undefined);

      const handleClick=value=>{
        setCurrentValue(value);
      }

      const handleMouseOver=value=>{
        setHoverValue(value)
      }

      const handleMouseLeave=()=>{
        setHoverValue(undefined)
      }

      
      
    const userRate=[
        {
        id: 1,
        name: "John Doe",
        date: "2023/10/26",
        rating: 1,
        message:
            "Excellent work on the project, delivered ahead of schedule and with great attention to detail. Highly recommended!"

        },

         {
        id: 2,
        name: "John Doe",
        date: "2023/10/26",
        rating: 2,
        message:
            "Excellent work on the project, delivered ahead of schedule and with great attention to detail. Highly recommended!"

        },

         {
        id: 3,
        name: "John Doe",
        date: "2023/10/26",
        rating: 3,
        message:
            "Excellent work on the project, delivered ahead of schedule and with great attention to detail. Highly recommended!"

        },
         {
        id: 4,
        name: "John Doe",
        date: "2023/10/26",
        rating: 4,
        message:
            "Excellent work on the project, delivered ahead of schedule and with great attention to detail. Highly recommended!"

        },
        

        
        
    ];
    const middle = Math.ceil(userRate.length / 2);

    const column2 = userRate.slice(0, middle);
    const column3 = userRate.slice(middle);


      

    return (
        
        <div className="mt-19 flex  items-center min-h-screen font-outfit  overflow-hidden bg-[#e5e5e5]   flex-col  ">{/*full page*/}
                    
            <Navbar />
            <h1 className="  justify-center items-start mr-190 w-150 text-4xl font-bold text-primary ">USER RATING & FEEDBACK</h1>
            {/*middle box*/}
           <div className="w-[90%] h-screen flex flex-row rounded-2xl mt-6 bg-white shadow-xl border border-gray-300 p-6 space-x-6">

                 {/*provide feedback*/}

                 
                <div className=" w-1/3 h-full flex flex-col ">
                    <div className=" h-1/7">
                        <p className="  mt-8 ml-5 mr-6 font-semibold text-3xl">Provide Feedback</p>
                    </div>

                    <div className=" h-1/7 flex flex-row  space-x-3">
                        <FaUserCircle className=" text-8xl mr-4 text-gray-700 ml-5  " ></FaUserCircle>
                         <p className=" w-1/2 font-semibold  text-2xl  h-1/2 translate-y-8 ">{workerData.name}</p>
                    </div>

                    <div  className=" h-1/9 flex flex-col">
                        <p className=" h-1/2 ml-5   mr-6   font-semibold  text-lg  text-gray-800 font-sans">Your Rating : </p>
                        <div className="h-1/2 ml-5  mr-6   font-semibold flex  items-center   ">
                             {
                                stars.map((_,index)=>{
                                    return (
                                        <FaStar key={index} size={30} className="mr-2 cursor-pointer" color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}  onClick={()=>handleClick(index + 1)} onMouseOver={()=>handleMouseOver(index + 1)} onMouseLeave={handleMouseLeave}></FaStar>
                                    )
                                })
                             }
                        </div>
                        
                       
                    </div>

                    <div  className=" h-1/3 flex flex-col space-y-1 ">
                        <p className="ml-5  mr-6  mt-8 font-semibold  text-lg  text-gray-800 font-sans ">Detailed Feedback :</p>
                        <textarea class=" ml-5   mr-6 h-32 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"placeholder="Write your feedback here..."></textarea>

                    </div>

                    <div  className=" h-1/5 flex flex-row space-x-6 ">
                         <button onClick={gotoprofile} className="ml-5  mt-9 text-lg font-semibold  text-black rounded-xl shadow-md hover:bg-gray-300 hover:scale-105 hover:shadow-xl transition-all duration-300 w-1/3 h-1/4 border border-gray-400">Cancel</button>
                          <button className=" px-1 py-1 mt-9 text-lg font-semibold bg-primary text-white rounded-xl shadow-md hover:bg-accent hover:scale-105 hover:shadow-xl transition-all duration-300 w-1/2 h-1/4">Submit Feedback</button>

                    </div>

                </div>

                 {/*past reviews 1*/}
             <div className=" w-1/3 space-y-8 h-full flex flex-col">

                {/* Header */}
                <div className=" h-24 flex items-center">
                     <h1 className="ml-6 font-semibold text-3xl">Your Past Reviews</h1>
                </div>

                {/* Reviews List */}
                <div className="flex flex-col h-full  overflow-y-auto space-y-10">

                    {column2.map((user) => (
                    <div key={user.id} className=" h-[25vh] flex flex-col p-4">

                 {/* User Name Row */}
                        <div className="flex flex-row items-center mb-2">

                             <FaUserCircle className="text-4xl mr-3" />

                            <p className="font-semibold text-lg flex-1">{user.name}</p>

                            <p className="text-sm text-gray-800">{user.date}</p>
                        </div>

                 {/* Rating Stars */}
                    <div className="flex items-center space-x-1 mb-2">
                        {[...Array(user.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-500 text-xl" />
                     ))}
                 </div>

                {/* Message + Line */}
                    <div className="text-lg text-gray-800 flex flex-col">
                        <p>{user.message}</p>
                        <div className="mt-2 h-px bg-gray-400 w-full"></div>
                    </div>
             </div>
            ))}
         </div>

  
    </div>


                 {/*past reviews 2*/}
                <div className="  w-1/3 h-full">
                    <div className="  h-full space-y-8 flex flex-col">

                {/* Header */}
                <div className=" h-24 flex items-center">
                     <h1 className="ml-6 font-semibold text-3xl"></h1>
                </div>

                {/* Reviews List */}
                <div className="flex flex-col h-full  overflow-y-auto space-y-10">

                    {column3.map((user) => (
                        
                    <div key={(user.id)} className=" h-[25vh] flex flex-col p-4">

                 {/* User Name Row */}
                        <div className="flex flex-row items-center mb-2">

                             <FaUserCircle className="text-4xl mr-3" />

                            <p className="font-semibold text-lg flex-1">{user.name}</p>

                            <p className="text-sm text-gray-800">{user.date}</p>
                        </div>

                 {/* Rating Stars */}
                    <div className="flex items-center space-x-1 mb-2">
                        {[...Array(user.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-500 text-xl" />
                     ))}
                 </div>

                {/* Message + Line */}
                    <div className="text-lg text-gray-800 flex flex-col">
                        <p>{user.message}</p>
                        <div className="mt-2 h-px bg-gray-400 w-full"></div>
                    </div>
             </div>
            ))}
         </div>

  
    </div>

                </div>
            </div>
           
        </div>
    )
}