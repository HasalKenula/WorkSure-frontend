import React from "react";

const workers = Array(10).fill({
  name: "Eve Adams",
  skill: "Carpenter",
  rating: 5.0,
  location: "Colombo",
  status: "Free",
});

export default function WorkersPage() {
  return (
    <div className="bg-[#fffdef] min-h-screen p-5">

      {/* Filters Section */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-8 w-[95%]">
        <h3 className="text-2xl font-bold mr-5">Filters</h3>

        <input
          type="text"
          placeholder="Search workers by skill, name, location"
          className="flex-1 min-w-[200px] px-4 py-3 rounded-full border border-gray-300 text-sm outline-none"
        />

        <select className="px-4 py-3 rounded-full border border-gray-300 text-sm bg-white cursor-pointer">
          <option>Sort by rating</option>
          <option>Highest rating</option>
          <option>Lowest rating</option>
        </select>

        <select className="px-4 py-3 rounded-full border border-gray-300 text-sm bg-white cursor-pointer">
          <option>Location</option>
          <option>Colombo</option>
          <option>Gampaha</option>
          <option>Kandy</option>
          <option>Kurunegala</option>
          <option>Galle</option>
          <option>Matara</option>
          <option>Kaluthara</option> 
          <option>Nugegoda</option> 
          <option>Anuradhapura</option> 
          <option>Trinco</option> 
          <option>Kadawatha</option> 
        </select>

        <div className="flex justify-end w-full mt-5">
          <span className="bg-[#e8f1ff] text-orange-500 px-5 py-2 rounded-full font-bold text-sm border border-[#c9dcff] shadow-md">
            9 Available Workers
          </span>
        </div>
      </div>

      
    </div>
  );
}
