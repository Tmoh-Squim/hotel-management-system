"use client"
import React, { useEffect, useRef } from 'react'
import { FaConciergeBell, FaDumbbell, FaParking, FaSwimmingPool, FaUtensils, FaWifi, FaSpa, FaBriefcase, FaShuttleVan, FaCocktail, FaPaw, FaTshirt } from 'react-icons/fa';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const amenities = [
  { name: "Free Wi-Fi", icon: <FaWifi size={30} className="text-blue-500 text-3xl" /> },
  { name: "Swimming Pool", icon: <FaSwimmingPool size={30} className="text-cyan-500 text-3xl" /> },
  { name: "Restaurant", icon: <FaUtensils size={30} className="text-yellow-500 text-3xl" /> },
  { name: "Gym & Fitness", icon: <FaDumbbell size={30} className="text-red-500 text-3xl" /> },
  { name: "Free Parking", icon: <FaParking size={30} className="text-green-500 text-3xl" /> },
  { name: "24/7 Concierge", icon: <FaConciergeBell size={30} className="text-purple-500 text-3xl" /> },
  { name: "Spa & Wellness", icon: <FaSpa size={30} className="text-pink-500 text-3xl" /> },
  { name: "Business Center", icon: <FaBriefcase size={30} className="text-gray-700 text-3xl" /> },
  { name: "Airport Shuttle", icon: <FaShuttleVan size={30} className="text-orange-500 text-3xl" /> },
  { name: "Bar & Lounge", icon: <FaCocktail size={30} className="text-indigo-500 text-3xl" /> },
  { name: "Pet-Friendly", icon: <FaPaw size={30} className="text-gray-500 text-3xl" /> },
  { name: "Laundry Service", icon: <FaTshirt size={30} className="text-teal-500 text-3xl" /> },
];

gsap.registerPlugin(ScrollTrigger);
const Facilities = () => {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.6,
          stagger: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);
  return (
    <div className='w-full flex flex-col min-h-screen bg-background text-foreground 800px:px-10 px-2 py-10'>
        <div className='flex flex-col justify-center items-center' ref={titleRef}>
            <h1 className='800px:text-5xl text-3xl font-bold'>Facilities/Amenities</h1>
            <p className='tracking-wider text-gray-500'>WHAT WE OFFER FOR FREE</p>
        </div>
        <div className="w-full flex-1 mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 800px:gap-8 gap-2 pb-4" ref={containerRef}>
          {amenities.map((amenity, index) => (
            <div key={index} className="bg-background text-foreground shadow-md rounded-lg p-6 flex items-center space-x-4 hover:shadow-lg transition-all duration-300">
              {amenity.icon}
              <span className="text-lg font-medium">{amenity.name}</span>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Facilities
