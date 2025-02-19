"use client";
import CustomButton from "@/app/components/CustomButton";
import CustomTextField from "@/app/components/CustomTextInput";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AdminCreateRoom = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [bedrooms, setBedrooms] = useState<number | "">("");
  const [formData, setFormData] = useState({
    title: "",
    pricePerNight: "",
    size: "",
    city: "",
    address: "",
    totalRooms: "",
    pricePerMonth: "",
    restaurantDistance: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file uploads
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedImages([...selectedImages, ...Array.from(event.target.files)]);
    }
  };

  // Submit function
  const handleSubmit = async () => {
    if (!formData.title || !formData.city || !formData.address) {
      toast.info("Please fill all required fields!");
      return;
    }

    setLoading(true);
    const form = new FormData();
    form.append("title", formData.title);
    form.append("pricePerNight", formData.pricePerNight);
    form.append("size", formData.size);
    form.append("city", formData.city);
    form.append("address", formData.address);
    form.append("totalRooms", formData.totalRooms);
    form.append("pricePerMonth", formData.pricePerMonth);
    form.append("restaurantDistance", formData.restaurantDistance);
    form.append("description", formData.description);
    form.append("bedrooms", String(bedrooms));

    selectedImages.forEach((file) => {
      form.append("images", file);
    });

    try {
      const token = localStorage.getItem("authorization_token");
      const response = await axios.post(
        "/api/restaurant/createRestaurant",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setFormData({
          title: "",
          pricePerNight: "",
          size: "",
          city: "",
          address: "",
          totalRooms: "",
          pricePerMonth: "",
          restaurantDistance: "",
          description: "",
        });
        setBedrooms("");
        setSelectedImages([]);
        return toast.success(response.data.message);
      }
      return toast.error(response.data.message);
    } catch (error) {
      toast.error("Failed to create room. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto rounded-lg">
      <div>
        <h1 className="text-md mb-2 text-gray-400">dashboard/ create room</h1>
      </div>

      {/* Grid Layout for Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 800px:gap-4 gap-2">
        <CustomTextField
          name="title"
          placeholder="Enter Apartment/building name"
          type="text"
          onchange={handleInputChange}
        />
        <CustomTextField
          name="pricePerNight"
          type="number"
          placeholder="Enter price per night"
          onchange={handleInputChange}
        />
        <CustomTextField
          name="size"
          type="number"
          placeholder="Enter size in sqft"
          onchange={handleInputChange}
        />
        <CustomTextField
          name="city"
          placeholder="Enter city"
          type="text"
          onchange={handleInputChange}
        />
        <CustomTextField
          name="address"
          placeholder="Enter address"
          type="text"
          onchange={handleInputChange}
        />
        <CustomTextField
          name="totalRooms"
          placeholder="Total number of rooms"
          type="text"
          onchange={handleInputChange}
        />
        <CustomTextField
          name="pricePerMonth"
          placeholder="Enter price per month"
          type="text"
          onchange={handleInputChange}
        />
        <CustomTextField
          name="restaurantDistance"
          placeholder="Enter restaurant distance"
          type="text"
          onchange={handleInputChange}
        />
      </div>

      <textarea
        name="description"
        rows={5}
        placeholder="Enter description"
        className="w-full my-3 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
        onChange={handleInputChange}
        value={formData.description}
      />

      {/* Dropdown for Bedrooms */}
      <div className="mt-4">
        <label className="block text-sm font-medium">Select Bedrooms</label>
        <select
          className="w-full p-3 border rounded"
          value={bedrooms}
          onChange={(e) => setBedrooms(Number(e.target.value))}
        >
          <option value="">Select...</option>
          <option value="1">Single room</option>
          <option value="2">Bedsitter</option>
          <option value="3">1 Bedroom</option>
          <option value="4">2 Bedrooms</option>
          <option value="5">3 Bedrooms</option>
          <option value="6">4 Bedrooms</option>
          <option value="7">5 Bedrooms</option>
          <option value="8">6 Bedrooms</option>
        </select>
      </div>

      {/* Image Upload Section */}
      <div className="my-3">
        <h3 className="text-lg font-medium mb-2">Upload Images</h3>
        <input
          type="file"
          id="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-2 hidden rounded w-full"
        />
        <label
          htmlFor="file"
          className="px-4 mb-2 py-2 bg-blue-400 text-white font-medium rounded-lg cursor-pointer hover:bg-blue-700 transition duration-300 shadow-md"
        >
          Choose image
        </label>
      </div>

      {/* Preview Uploaded Images */}
      {selectedImages.length > 0 && (
        <div className="flex gap-6 my-4">
          {selectedImages.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              className="w-24 h-24 object-cover rounded-lg"
            />
          ))}
        </div>
      )}

      {/* Create Room Button */}
      <CustomButton
        title="Create Room"
        onClick={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default AdminCreateRoom;
