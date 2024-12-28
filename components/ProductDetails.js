import Images from "./Images";
import { usePathname } from "next/navigation";
import React from "react";

import { products } from "@/constants/products";
import { primaryFontColor, secondaryFontColor } from "@/utils/styles";

const ProductDetails = ({ handleScrollToSection }) => {
  const pathname = usePathname().split("/").join("");
  const images = products[pathname].images;

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
            $119.9
          </span>
          <span
            className="text-4xl font-bold"
            style={{ color: primaryFontColor }}
          >
            $<span id="amount">59.95</span>
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
