"use client"
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const Bed = () => {
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 2.0,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <div className="bg-transparent relative w-full h-screen flex items-center 800px:px-10 px-4 text-foreground">
    <div className="absolute h-screen inset-0 bg-black/40"></div>
      <div ref={textRef}>
        <h1 className="800px:text-8xl text-6xl text-foreground font-serif leading-none">
          <span className="whitespace-nowrap">Bed &</span><br />
          <span className="block mt-0">Breakfast</span>
        </h1>
        <p className="text-lg mt-2 font-semibold">
          ORDER BREAKFAST JUST FOR <span className="text-green-600">Ksh 150.00</span> <br /> WITH YOUR BOOKING
        </p>
        <div className="mt-10">
          <Link href={"/contact"}>
            <div className="my-4 py-4 px-8 text-white rounded-md cursor-pointer font-semibold bg-amber-950 btn w-max">
              Book Now
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Bed;
