"use client";
import { RootState } from "@/app/redux/store";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import CustomTextField from "@/app/components/CustomTextInput";
import CustomButton from "@/app/components/CustomButton";

const UserProfile = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.put(`/api/user/update-profile`, {
        email,
        phoneNumber,
      });

      if (response.data.success) {
        toast.success("Profile updated successfully");

        // Dispatch updated user data (assuming you have a Redux action for this)
        dispatch({ type: "UPDATE_USER", payload: response.data.user });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto 800px:p-6 my-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Profile</h2>

      {user ? (
        <div className="flex flex-col items-center">
          <p className="text-lg font-medium text-gray-700">{user.fullName}</p>

          <div className="mt-4 w-full">
            <label className="text-gray-600 text-sm">Email</label>
            <CustomTextField
              type="email"
              value={email}
              onchange={(e) => setEmail(e.target.value)}
              placeholder={"Email"}
            />
          </div>

          <div className="mt-4 w-full">
            <label className="text-gray-600 text-sm">Phone Number</label>
            <CustomTextField
              type="text"
              value={phoneNumber}
              onchange={(e) => setPhoneNumber(e.target.value)}
              placeholder={"Phone number"}
            />
          </div>

          <div className="my-6  w-full">
            <CustomButton
              onClick={handleUpdateProfile}
              title={"Update Profile"}
              loading={loading}
            />
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No user data available</p>
      )}
    </div>
  );
};

export default UserProfile;
