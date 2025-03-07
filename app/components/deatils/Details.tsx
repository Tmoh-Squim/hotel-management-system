"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Details = () => {
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.6,
          stagger: 0.5,
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
    <div className="w-full">
      <div
        className="800px:flex justify-center w-full bg-background shadow-lg text-foreground px-4 items-center 800px:py-[60px] py-8"
      >
        <div className="flex-1 flex flex-col items-center">
          <h1 className="text-3xl font-bold">
            8.1<span className="text-sm font-semibold">/10</span>
          </h1>
          <p className="800px:text-4xl text-2xl text-blue-950 font-bold">
            Booking.com
          </p>
        </div>
        <div className="flex-1 flex my-4 800px:my-0 flex-col items-center">
          <h1 className="text-3xl font-bold">
            4.5<span className="text-sm font-semibold">/5</span>
          </h1>
          <p className="800px:text-4xl text-2xl text-blue-500 font-bold">
            Facebook
          </p>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <h1 className="text-3xl font-bold">
            4.4<span className="text-sm font-semibold">/5</span>
          </h1>
          <p className="800px:text-4xl text-2xl text-blue-950 font-bold">
            Google
          </p>
        </div>
      </div>

      <div className="800px:flex">
        <div className="800px:w-1/2 w-full h-full">
          <img
            src="https://png.pngtree.com/background/20230425/original/pngtree-two-beds-are-in-a-hotel-room-picture-image_2471633.jpg"
            alt="Hotel Room"
          />
        </div>
        <div
          ref={textRef}
          className="flex-1 px-4 bg-background mx-auto flex justify-between items-center"
        >
          <div>
            <h1 className="800px:text-4xl text-3xl text-center text-foreground font-semibold my-4">
              Your Home Away From Home!
            </h1>
            <p className="text-center text-foreground">
              Experience the essence of Sylhet at our welcoming hostel, where
              travelers find comfort and community beneath the tea-covered hills
              and by the Surma River.
            </p>
            <div className="flex justify-center items-center mt-6">
              <Link href={"/about"}>
                <div className="my-4 py-4 px-8 text-white rounded-md cursor-pointer font-semibold bg-amber-950 btn w-max">
                  More About Us!
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
