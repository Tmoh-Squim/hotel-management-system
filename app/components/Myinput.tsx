import React from "react";

const CustomTextField = (props: { type: string; placeholder: string }) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      className="w-full h-[45px] rounded-lg px-2 text-black focus:outline-none border-blue-400 border-[2px] 800px:w-[45%]"
    />
  );
};

export default CustomTextField;
