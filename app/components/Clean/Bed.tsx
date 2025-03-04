import Link from "next/link";
import React from "react";

const Bed = () => {
  return (
    <div className="bg-transparent relative w-full h-screen flex items-center 800px:px-10 px-4 text-foreground">
    <div className="absolute h-screen inset-0 bg-black/40"></div>
      <div>
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
