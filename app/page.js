"use client";

import { Caveat } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });

import Image from "next/image";
import { useRef } from "react";

import DiscountCounter from "../components/counter";
import OrderForm from "../components/form";
import ProductDetails from "@/components/ProductDetails";
import ProductDescription from "@/components/ProductDescription";
import Footer from "@/components/Footer";
import { primaryFontColor, secondaryFontColor } from "@/utils/styles";
import Reviews from "@/components/Reviews";

export default function Home() {
  const sectionRef = useRef(null);
  const handleScrollToSection = () => {
    // Scroll to the section when the button is clicked
    sectionRef.current?.scrollIntoView({
      behavior: "smooth", // Smooth scroll effect
      block: "start", // Align to the top of the viewport
    });
  };

  return (
    <>
      <DiscountCounter />
      <div className="flex justify-center items-center space-x-6">
        <div className="w-full" style={{ backgroundColor: "#ff0084" }}>
          <p className="text-center pt-1 pb-1 text-white">Jeweltine</p>
          {/* <Image
            src="/logo.svg" // Change this to your image path
            alt="Special Tree Image"
            width={120} // Adjust image size if necessary
            height={120}
            className="m-auto pt-1 pb-2"
          /> */}
        </div>
      </div>

      <div className="container mx-auto p-6 mt-8">
        {/* Responsive Flex Container */}
        <div className="flex flex-col md:flex-row justify-center gap-10 mb-16">
          {/* Left Section */}
          <div className="flex-1 space-y-6  max-w-screen-sm">
            {/* Product Title */}
            <ProductDetails handleScrollToSection={handleScrollToSection} />
          </div>

          {/* Right Section */}
          <div className="flex-1 space-y-6   max-w-screen-sm" ref={sectionRef}>
            <OrderForm handleScrollToSection={handleScrollToSection} />
          </div>
        </div>
        <ProductDescription />
      </div>
      <Reviews />
      <Footer />
    </>
  );
}
