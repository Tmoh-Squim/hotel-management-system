import CustomButton from "@/app/components/CustomButton";
import CustomTextField from "@/app/components/CustomTextInput";
import React, { useState } from "react";

const AdminCreateRoom = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [bedrooms, setBedrooms] = useState<number | "">("");
  const [loading,setLoading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedImages([...selectedImages, ...Array.from(event.target.files)]);
    }
  };

  return (
    <div className=" w-full  mx-auto  rounded-lg">
      <div>
        <h1 className="text-md mb-2 text-gray-400">
            dashboard/ create room
        </h1>
      </div>
      {/* Grid Layout for Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 800px:gap-4 gap-2">
        <CustomTextField placeholder="Enter Apartment/building name" type="text" onchange={() => {}} />
        <CustomTextField type="number" placeholder="Enter price per night" onchange={() => {}} />
        <CustomTextField type="number" placeholder="Enter size in sqft" onchange={() => {}} />
        <CustomTextField placeholder="Enter city" type="text" onchange={() => {}} />
        <CustomTextField placeholder="Enter address" type="text" onchange={() => {}} />
        <CustomTextField placeholder="Total number of rooms " type="text" onchange={() => {}} />
        <CustomTextField placeholder="Enter price per month" type="text" onchange={() => {}} />
        <CustomTextField placeholder="Enter restaurant distance" type="text" onchange={() => {}} />
      </div>
      <textarea  rows={5} placeholder="Enter description" className="w-full my-3 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400" />

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
          <option value="2">Bedsiter</option>
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
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-2 rounded w-full"
        />
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
        <CustomButton title="Create Room" onClick={() => setLoading(true)} loading={loading} />
    </div>
  );
};

export default AdminCreateRoom;
