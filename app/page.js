"use client";



import DiscountCounter from "../components/Counter";
import Footer from "../components/Footer";
import ProductDescription from "../components/ProductDescription";
import ProductGrid from "../components/Products";
import Image from "next/image";
import { useRef } from "react";



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
    <div className="flex flex-col min-h-screen">
      <DiscountCounter />
      <div className="flex justify-center items-center space-x-6">
        <div className="w-full" style={{ backgroundColor: "#ff0084" }}>
          <Image
            src="/jeweltine_logo.png" // Change this to your image path
            alt="Special Tree Image"
            width={500} // Adjust image size if necessary
            height={500}
            className="m-auto py-3 w-24"
          />
        </div>
      </div>
      <main className="container mx-auto px-4 py-8">
        <ProductGrid />
      </main>

      <ProductDescription />
      <Footer />
    </div>
  );
}
