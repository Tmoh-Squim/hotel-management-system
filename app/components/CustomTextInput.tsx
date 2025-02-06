import React from "react";

const CustomTextField = ({
  type,
  placeholder,
  onchange
}:TextInputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onchange}
      className="w-full h-[45px] px-2 text-foreground focus:outline-none border-gray-400 rounded-xl focus:border-blue-500 border-[2px] 800px:w-[45%]"
    />
  );
};

export default CustomTextField;
