"use client";
import { RootState } from "@/app/redux/store";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import CustomTextField from "@/app/components/CustomTextInput";
import CustomButton from "@/app/components/CustomButton";
import { getUser } from "@/app/redux/user/userReducer";
import { AnyAction } from "redux";

const AdminProfile = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");

  // Handle profile update (Email & Phone)
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

  // Handle Avatar Upload
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleUploadAvatar = async () => {
    if (!avatar) return toast.info("Please select an image");
    const token = localStorage.getItem("authorization_token");

    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      setAvatarLoading(true);
      const response = await axios.put(`/api/auth/updateAvatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success("Avatar updated successfully");
        if (token) {
          dispatch(getUser(token) as unknown as AnyAction);
        }
        // Dispatch updated avatar to Redux
        setAvatarPreview(response.data.avatar);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error uploading avatar");
    } finally {
      setAvatarLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px:p-6 my-auto">
      <h2 className="800px:text-xl font-semibold text-gray-800 mb-4">
        Hey {user?.fullName.toUpperCase()}, Welcome to your profile
      </h2>

      {user ? (
        <div className="flex flex-col items-center">
          {/* Avatar Section */}
          <div className="relative w-32 h-32 mb-4">
            <img
              src={
                avatarPreview ||
                "https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"
              }
              alt="Avatar"
              className="w-full h-full rounded-full object-cover border-2 border-gray-300"
            />
          </div>

          {/* Upload Avatar */}
          <input
            type="file"
            accept="image/*"
            name="file"
            id="file"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <label
            htmlFor="file"
            className="px-4 mb-2 py-2 bg-blue-600 text-white font-medium rounded-lg cursor-pointer hover:bg-blue-700 transition duration-300 shadow-md"
          >
            Choose image
          </label>

          <div className="w-full">
            <CustomButton
              onClick={handleUploadAvatar}
              title="Update Avatar"
              loading={avatarLoading}
            />
          </div>

          {/* Profile Fields */}
          <div className="mt-4 w-full">
            <label className="text-gray-600 text-sm">Email</label>
            <CustomTextField
              type="email"
              value={email}
              onchange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>

          <div className="mt-4 w-full">
            <label className="text-gray-600 text-sm">Phone Number</label>
            <CustomTextField
              type="text"
              value={phoneNumber}
              onchange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone number"
            />
          </div>

          {/* Update Profile Button */}
          <div className="my-6 w-full">
            <CustomButton
              onClick={handleUpdateProfile}
              title="Update Profile"
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

export default AdminProfile;
