"use client";



import Image from "next/image";
import { useRef } from "react";

import DiscountCounter from "@/components/counter";
import ProductDetails from "@/components/ProductDetails";
import ProductDescription from "@/components/ProductDescription";
import Footer from "@/components/Footer";
import Reviews from "@/components/Reviews";
import CustomOrderForm from "@/components/customForm";

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
                    <Image
                        src="/jeweltine_logo.png" // Change this to your image path
                        alt="Special Tree Image"
                        width={500} // Adjust image size if necessary
                        height={500}
                        className="m-auto py-3 w-24"
                    />
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
                        <CustomOrderForm handleScrollToSection={handleScrollToSection} />
                    </div>
                </div>
                <ProductDescription />
            </div>
            <Reviews />
            <Footer />
        </>
    );
}