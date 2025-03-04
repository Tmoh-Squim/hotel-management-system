"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { gsap } from "gsap";
const Hero = () => {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".title",
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 2, ease: "power3.out" }
    );
    tl.fromTo(
      ".title1",
      {
        opacity: 0,
      },
      { opacity: 1, ease: "power3.out" }
    );

    tl.fromTo(
      ".btn",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "bounce.out", delay: 0.2 }
    );
  }, []);
  return (
    <div
      className="800px:h-[75vh] h-[70vh] w-full bg-white bg-center object-center bg-cover px-10 flex items-center"
      style={{ backgroundImage: `url(/bg1.jpeg)` }}
    >
      <div className="absolute hidden 800px:block 800px:h-[86vh] h-[78vh] inset-0 bg-black/40"></div>
      <div className="text-start flex flex-col justify-start 800px:max-w-[38%] ">
        <h1 className="title 800px:text-5xl text-2xl text-white font-bold">
          EXPERIENCE HOSPITALITY AT IT&apos;S FINEST
        </h1>
        <h1 className="title1 text-2xl font-bold my-3 text-white text-start">
          FROM KSH 1500 PER NIGHT
        </h1>
        <Link href={"/restaurant"}>
          <div className="my-4 py-4 px-6 text-white rounded-md cursor-pointer font-semibold  bg-blue-500 btn w-max ">
            Book Today!
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
