import React from 'react'
import Navbar from '../components/NavBar'
import { FaUserCircle } from "react-icons/fa";


export default function WorkerView(){
  return (
    <>
      <Navbar/>
  
        <div className="mt-19  h-[90vh] font-outfit px-4  items-center flex justify-center ">{/*full page*/}
           <div className="shadow-2xl w-[85%] h-[71vh] flex flex-col rounded-2xl  bg-white/10 backdrop-blur-xl p-4 justify-center ">{/*second box*/}
            {/*title*/ }
              <div className=' h-[10vh] flex items-center '>
                <h1 className=' text-3xl font-bold font-sans text-primary ml-8 mb-11'>Ishini  Sheahra</h1>
              </div>
              {/*image and details*/}
              <div className=' h-[40vh] flex flex-row space-x-20'>
                {/*image*/}
                <div className=' w-1/4 items-center justify-center flex'>
                  <div className="w-62 h-62 rounded-full overflow-hidden  shadow-lg">
                        <FaUserCircle className="w-full h-full object-cover" />
                  </div>
                
                {/*details*/}
                </div>
                <div className=' w-3/4 flex flex-row'>
                  <div className=' w-1/4 flex flex-col justify-center'>
                      <p className=' h-[8vh] font-semibold text-lg'>User  Name</p>
                       <p className=' h-[8vh] font-semibold text-lg'>Email</p>
                        <p className=' h-[8vh] font-semibold text-lg'>Address</p>
                         <p className=' h-[8vh] font-semibold text-lg'>Contact  Number</p>
                  </div>
                  <div className=' '></div>
                    <div className='  flex flex-col justify-center'>
                      <p className=' h-[8vh] font-semibold text-lg text-gray-600'>Ishini  Shehara</p>
                       <p className=' h-[8vh] font-semibold text-lg text-gray-600'>ishini@gmail.com</p>
                        <p className=' h-[8vh] font-semibold text-lg text-gray-600'>336, Piliyandala, Colombo</p>
                         <p className=' h-[8vh] font-semibold text-lg text-gray-600'>071 1234567</p>
                  </div>
                   

                </div>  


                
              </div>
           </div>
      </div>
    </>
  )
}