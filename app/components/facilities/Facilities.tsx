import React from 'react'
import { FaConciergeBell, FaDumbbell, FaParking, FaSwimmingPool, FaUtensils, FaWifi, FaSpa, FaBriefcase, FaShuttleVan, FaCocktail, FaPaw, FaTshirt } from 'react-icons/fa';

const amenities = [
  { name: "Free Wi-Fi", icon: <FaWifi className="text-blue-500 text-3xl" /> },
  { name: "Swimming Pool", icon: <FaSwimmingPool className="text-cyan-500 text-3xl" /> },
  { name: "Restaurant", icon: <FaUtensils className="text-yellow-500 text-3xl" /> },
  { name: "Gym & Fitness", icon: <FaDumbbell className="text-red-500 text-3xl" /> },
  { name: "Free Parking", icon: <FaParking className="text-green-500 text-3xl" /> },
  { name: "24/7 Concierge", icon: <FaConciergeBell className="text-purple-500 text-3xl" /> },
  { name: "Spa & Wellness", icon: <FaSpa className="text-pink-500 text-3xl" /> },
  { name: "Business Center", icon: <FaBriefcase className="text-gray-700 text-3xl" /> },
  { name: "Airport Shuttle", icon: <FaShuttleVan className="text-orange-500 text-3xl" /> },
  { name: "Bar & Lounge", icon: <FaCocktail className="text-indigo-500 text-3xl" /> },
  { name: "Pet-Friendly", icon: <FaPaw className="text-gray-500 text-3xl" /> },
  { name: "Laundry Service", icon: <FaTshirt className="text-teal-500 text-3xl" /> },
];

const Facilities = () => {
  return (
    <div className='w-full flex flex-col min-h-screen bg-background text-foreground 800px:px-10 px-2 py-10'>
        <div className='flex flex-col justify-center items-center'>
            <h1 className='800px:text-5xl text-3xl font-bold'>Facilities/Amenities</h1>
            <p className='tracking-wider text-gray-500'>WHAT WE OFFER FOR FREE</p>
        </div>
        <div className="w-full flex-1 mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 800px:gap-8 gap-2 pb-4">
          {amenities.map((amenity, index) => (
            <div key={index} className="bg-white shadow-md rounded-2xl p-6 flex items-center space-x-4 hover:shadow-lg transition-all duration-300">
              {amenity.icon}
              <span className="text-lg font-medium text-gray-700">{amenity.name}</span>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Facilities
