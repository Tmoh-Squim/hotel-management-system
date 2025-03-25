"use client";
import CustomButton from "@/app/components/CustomButton";
import CustomTextField from "@/app/components/CustomTextInput";
import { AppDispatch, RootState } from "@/app/redux/store";
import { getUser } from "@/app/redux/user/userReducer";
import { validRegex } from "@/app/types/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Page = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  useEffect(()=>{
    if(user !== null){
      router.replace("/")
    }
  },[user])
  //handle login functionality
  const handleLogin = async () => {
    try {
      setLoading(true);
      
      const email = formData.email.trim();
      const password = formData.password.trim();
  
      if (!email || !password) {
        return toast.info("All fields are required");
      }
      
      if (!email.match(validRegex)) {
        return toast.info("Invalid email address");
      }
  
      const user = { email, password };
      
      const response = await axios.post("/api/auth/Login", user);
  
      if (response.data.success && response.data.token) {
        localStorage.setItem("authorization_token", response.data.token);
        dispatch(getUser(response.data.token));
        toast.success(response.data.message);
  
          router.push("/");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      toast.error("Something went wrong! Try again later");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full h-screen flex bg-background justify-center items-center ">
      <form className="mx-auto 800px:px-6 px-2 py-8 bg-gray-100 w-full 800px:w-[40%] rounded-lg shadow-lg text-white">
        <h1 className="text-3xl text-center font-bold mb-6 text-blue-400">
          Welcome Back!
        </h1>

        <div className="space-y-4 my-8">
          <CustomTextField
            type="email"
            placeholder="Enter your email"
            onchange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
            required = {true}
            value={formData.email}
            icon={<AiOutlineMail size={23} />}
          />
          <CustomTextField
            type={visible == true ? "text" : "password"}
            placeholder="Enter your password"
            icon={
              visible !== true ? (
                <AiOutlineEye size={25} onClick={() => setVisible(true)} />
              ) : (
                <AiOutlineEyeInvisible
                  size={25}
                  onClick={() => setVisible(false)}
                />
              )
            }
            onchange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
            value={formData.password}
          />
        </div>

        <div className="mt-4 flex justify-between text-sm">
          <label className="flex items-center text-blue-400 space-x-2">
            <a href="/Register" className="hover:underline">
              Don&apos;t have an account?
            </a>
          </label>
          <a href="/" className="text-blue-400 hover:underline">
            Forgot Password
          </a>
        </div>

        <div className="mt-10">
          <CustomButton
            title={"Login"}
            onClick={() => {
              handleLogin();
            }}
            loading={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default Page;
