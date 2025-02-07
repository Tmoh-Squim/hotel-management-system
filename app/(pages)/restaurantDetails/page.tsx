"use client";

import CustomButton from "@/app/components/CustomButton";
import { Product } from "@/app/types/types";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedItem = localStorage.getItem("selectedItem");
      if (storedItem) {
        const parsedProduct: Product = JSON.parse(storedItem);
        setProduct(parsedProduct);
        setImageUrl(parsedProduct.images?.[0]);
      }
    }
  }, []);

  if (!product)
    return (
      <p className="text-center text-lg font-semibold mt-10 text-gray-700">
        Loading...
      </p>
    );

  return (
    <div className=" mx-auto 800px:px-6 px-2 bg-background overflow-y-scroll  py-4 w-full h-screen ">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
        <div className="block lg:w-[40%] w-full ">
          <img
            src={imageUrl}
            alt={product.title}
            className="  object-cover 800px:h-[350px] h-[280px] w-full rounded-md shadow-md"
          />
          <div className="flex gap-4 my-4">
            {product.images.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => {
                  setImageUrl(item);
                }}
              >
                <img
                  src={item}
                  alt="smallpic"
                  className="w-[65px] rounded-md object-fill h-[66px]"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            {product.title}
          </h1>
          <p className="text-foreground text-lg leading-relaxed">
            {product.description}
          </p>
          <div className="space-y-2">
            <p className="text-xl font-semibold text-green-600">
              Ksh Price: Ksh{product.price}
            </p>
            <p className="text-md text-yellow-500">
              ⭐ Rating: {product.rating}/5
            </p>
            <p className="text-md text-blue-500">
              🏠 Capacity: {product.bedroom} Bedroom(s)
            </p>
          </div>
          <div className="my-4 w-full lg:w-[80%]">
            <CustomButton title={"Book reservation"} onClick={undefined} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
