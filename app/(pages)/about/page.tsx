"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import {  Autoplay, Pagination  } from "swiper/modules";
import { teamMembers } from "@/app/static/static";

const Page = () => {
  useEffect(() => {
    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1 }
    );
    gsap.fromTo(
      ".mission-text",
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, delay: 0.5 }
    );
    gsap.fromTo(
      ".team-member",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.2, delay: 1 }
    );
  }, []);

  return (
    <div className="w-full bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="relative w-full 800px:h-[60vh] h-[40vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dvsmxvdtr/image/upload/v1739901412/roee3w3j2bq2vjoa9vtm.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="hero-text relative text-4xl font-bold text-white z-10">
          About Us
        </h1>
      </section>

      {/* Mission & Values */}
      <section className="max-w-5xl mx-auto 800px:py-12 py-5 800px:px-4 px-2">
        <h2 className="mission-text text-3xl font-semibold text-center mb-6">
          Our Mission & Values
        </h2>
        <p className="text-lg text-gray-500 leading-relaxed text-start">
          At Squim’s Hotel, we believe in delivering the highest standard of luxury and comfort.
          Our mission is to provide guests with an unforgettable experience through personalized service and world-class hospitality.
        </p>
      </section>

      {/* Meet The Team */}
      <section className="bg-background 800px:py-12 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="team-heading text-3xl font-semibold text-center mb-6">
            Meet Our Team
          </h2>
          
          {/* Grid Layout for Larger Screens */}
          <div className="hidden 800px:grid sm:grid-cols-2 md:grid-cols-3 800px:gap-6 gap-2">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="team-member bg-background shadow-md rounded-lg p-6 flex flex-col items-center"
              >
                <img
                  src={member.avatar}
                  alt="Team Member"
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-gray-500 text-sm">{member.occupation}</p>
              </div>
            ))}
          </div>

          {/* Swiper Slider for Small Screens */}
         <div className="800px:hidden">
         <Swiper
            spaceBetween={10}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            pagination={{ clickable: true }}
            modules={[Autoplay,Pagination]}
            loop={true}
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={index}>
                <div className="team-member bg-background shadow-md rounded-lg 800px:p-6 -2 flex flex-col items-center">
                  <img
                    src={member.avatar}
                    alt="Team Member"
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-gray-500 text-sm">{member.occupation}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
         </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
