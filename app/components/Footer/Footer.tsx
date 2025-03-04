import React from "react";
import {
  AiOutlinePhone,
  AiOutlineFacebook,
  AiOutlineMail,
  AiOutlineTwitter,
  AiOutlineYoutube,
} from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full 800px:p-10 px-4 py-6 bg-background">
      <div className="800px:flex justify-between items-center my-2 ">
        <div>
          <h1 className="text-3xl text-foreground text-center font-bold cursor-pointer hover:text-foreground transition-colors duration-300">
            Squim&apos;s Hotel
          </h1>
        </div>
        <div className="my-2 800px:my-0">
          <p className=" text-foreground flex items-center gap-2 font-semibold">
            <FaMapMarkerAlt size={25} /> 2nd Floor, New Shamoli Shopping Centre,
            Zindabazar, Sylhet, Sylhet, Bangladesh{" "}
          </p>
          <p className="flex flex-wrap items-center text-foreground gap-2 800px:justify-center mt-2 font-medium">
            <AiOutlinePhone size={28} /> +254748143442{" "}
            <span className="flex items-center gap-2">
              <AiOutlineMail size={25} /> squimstech@gmail.com
            </span>
          </p>
          <p className="text-center text-foreground my-4 font-bold">
            SquimHotel &copy; 2025 All Rights Reserved
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="w-[50px] h-[50px] rounded-full cursor-pointer bg-foreground text-background flex justify-center items-center">
            <AiOutlineFacebook size={28} />
          </div>
          <div className="w-[50px] h-[50px] rounded-full cursor-pointer bg-foreground text-background flex justify-center items-center">
            <AiOutlineTwitter size={28} />
          </div>
          <div className="w-[50px] h-[50px] rounded-full cursor-pointer bg-foreground text-background flex justify-center items-center">
            <AiOutlineYoutube size={28} />
          </div>
        </div>
      </div>
      <div>
        <p className="text-center text-sm my-2 text-foreground">
          Created by Timothy. Developer at webwizardsmedia.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;
