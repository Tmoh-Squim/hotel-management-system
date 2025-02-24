"use client"
import React, { useEffect } from "react";
import { FaWifi, FaSwimmingPool, FaUtensils, FaDumbbell, FaParking, FaConciergeBell } from "react-icons/fa";
import {gsap} from "gsap";
const amenities = [
  { name: "Free Wi-Fi", icon: <FaWifi className="text-blue-500 text-3xl" /> },
  { name: "Swimming Pool", icon: <FaSwimmingPool className="text-cyan-500 text-3xl" /> },
  { name: "Restaurant", icon: <FaUtensils className="text-yellow-500 text-3xl" /> },
  { name: "Gym & Fitness", icon: <FaDumbbell className="text-red-500 text-3xl" /> },
  { name: "Free Parking", icon: <FaParking className="text-green-500 text-3xl" /> },
  { name: "24/7 Concierge", icon: <FaConciergeBell className="text-purple-500 text-3xl" /> },
];

const Amenities = () => {
    useEffect(() => {
        // Contact Form Section Animation
        gsap.fromTo(
          ".contact-title",
          { opacity: 0, y: -50 },
          { opacity: 1, y: 0, duration: 1 }
        );
      }, []);
  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
        <section
        className="w-full 800px:h-[60vh] h-[40vh] flex items-center justify-center text-center bg-cover bg-center relative"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dvsmxvdtr/image/upload/v1739901412/roee3w3j2bq2vjoa9vtm.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <h1 className="contact-title relative text-4xl font-bold text-white z-10">
          Available Amenities
        </h1>
      </section>
      <h2 className="text-3xl font-bold text-foreground my-6">Hotel Amenities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl pb-4">
        {amenities.map((amenity, index) => (
          <div key={index} className="bg-white shadow-md rounded-2xl p-6 flex items-center space-x-4 hover:shadow-lg transition-all duration-300">
            {amenity.icon}
            <span className="text-lg font-medium text-gray-700">{amenity.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Amenities;
