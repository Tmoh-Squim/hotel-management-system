import React from "react";
import { TextInputProps } from "../types/types";

const CustomTextField = ({
  type,
  placeholder,
  onchange,
  icon,
  required,
  name,
  value
}: TextInputProps) => {
  return (
    <div className="relative w-full">
      {icon && <span className="absolute inset-y-0 right-3 cursor-pointer flex items-center text-gray-500">{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        onChange={onchange}
        required={required}
        name={name}
        value={value}
        className={`w-full p-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400`}
      />
    </div>
  );
};

export default CustomTextField;
