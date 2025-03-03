import Link from "next/link";
import React from "react";

const Bed = () => {
  return (
    <div className="bg-transparent w-full h-screen flex items-center px-10 text-foreground">
      <div>
        <h1 className="text-8xl text-foreground font-serif leading-none">
          <span className="whitespace-nowrap">Bed &</span><br />
          <span className="block mt-0">Breakfast</span>
        </h1>
        <p className="text-lg mt-2 font-semibold">
          ORDER BREAKFAST JUST FOR <span className="text-green-600">Ksh 150.00</span> <br /> WITH YOUR BOOKING
        </p>
        <div className="mt-10">
          <Link href={"/restaurant"}>
            <div className="my-4 py-4 px-8 text-white rounded-md cursor-pointer font-semibold bg-amber-950 btn w-max">
              More About Us!
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Bed;
