"use client";
import { useState } from "react";
import Image from "next/image";
import Images from "./Images";
import React from "react";
import { primaryFontColor, secondaryFontColor } from "@/utils/styles";

const ProductDetails = ({ handleScrollToSection }) => {
  const [currentImage, setCurrentImage] = useState(0);

  // Sample images for the carousel
  const images = [
    "https://s3.us-east-1.amazonaws.com/jeweltine/site-assets/product-main-images/pi-1.png",
    "https://s3.us-east-1.amazonaws.com/jeweltine/site-assets/product-main-images/pi0.png",
    "https://s3.us-east-1.amazonaws.com/jeweltine/site-assets/product-main-images/pi1.png",
    "https://s3.us-east-1.amazonaws.com/jeweltine/site-assets/product-main-images/pi2.png",
    "https://s3.us-east-1.amazonaws.com/jeweltine/site-assets/product-main-images/pi3.png",
    "https://s3.us-east-1.amazonaws.com/jeweltine/site-assets/product-main-images/pi4.jpeg",
    "https://s3.us-east-1.amazonaws.com/jeweltine/site-assets/product-main-images/pi5.jpeg",
    "https://s3.us-east-1.amazonaws.com/jeweltine/site-assets/product-main-images/pi6.jpeg",
    "https://s3.us-east-1.amazonaws.com/jeweltine/site-assets/product-main-images/pi7.png",
    "https://s3.us-east-1.amazonaws.com/jeweltine/site-assets/product-main-images/pi8.png",
    "https://s3.us-east-1.amazonaws.com/jeweltine/site-assets/product-main-images/pi9.png",
    "https://s3.us-east-1.amazonaws.com/jeweltine/site-assets/product-main-images/pi10.png",
    "https://s3.us-east-1.amazonaws.com/jeweltine/site-assets/product-main-images/pi11.png",
    "https://s3.us-east-1.amazonaws.com/jeweltine/site-assets/product-main-images/pi12.png",
    "https://s3.us-east-1.amazonaws.com/jeweltine/site-assets/product-main-images/pi13.jpeg",
    "https://s3.us-east-1.amazonaws.com/jeweltine/site-assets/product-main-images/pi14.jpeg",
    "https://s3.us-east-1.amazonaws.com/jeweltine/site-assets/product-main-images/pi15.jpeg",
    "https://s3.us-east-1.amazonaws.com/jeweltine/site-assets/product-main-images/pi16.jpeg",
  ];

  function getImage(currentImage) {
    return images[currentImage];
  }

  const currentDate = new Date();
  const deliveryDate = new Date(currentDate);
  deliveryDate.setDate(deliveryDate.getDate() + 6);

  const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* Image Carousel */}
      <div className="relative mb-6">
        <Images images={images} />
      </div>
      <div className="bg-white  max-w-md mx-auto p-6 rounded-lg shadow-lg border border-red-600">
        <h1
          className="text-3xl font-extrabold text-center mb-4"
          style={{ color: primaryFontColor }}
        >
          Limited-Time Offer!
        </h1>

        <p
          className="text-center  font-medium mb-4"
          style={{ color: "#FF477E" }}
        >
          **Grab this deal while stocks last!**
        </p>
        <div className="flex justify-center items-center gap-2">
          <span
            className="line-through text-lg"
            style={{ color: secondaryFontColor }}
          >
            $98
          </span>
          <span
            className="text-4xl font-bold"
            style={{ color: primaryFontColor }}
          >
            $<span id="amount">49</span>
          </span>
        </div>

        <div className="mt-6">
          <p className="text-lg font-medium">
            Expected Delivery:
            <span
              className="block text-2xl font-bold"
              style={{ color: "#FF477E" }}
            >
              {formattedDeliveryDate}
            </span>
          </p>
        </div>

        <div className="mt-6 text-center">
          <button
            className=" text-white px-6 py-3 rounded-md shadow-lg  transition duration-300 transform hover:scale-105"
            style={{ backgroundColor: "#FF477E" }}
            onClick={handleScrollToSection}
          >
            Customize Yours Now
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
