import React from "react";
import { TextInputProps } from "../types/types";

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
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
};

export default CustomTextField;
