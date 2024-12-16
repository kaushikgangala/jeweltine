import React, { useState } from "react";

const ProductDescriptionDropdown = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(title === "Description");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full mx-auto">
      {/* Button */}
      <button
        className="w-full flex justify-center items-center gap-4 px-4 py-2 text-lg font-medium text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onClick={toggleDropdown}
      >
        {title}
        <svg
          className={`h-5 w-5 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Description */}
      {isOpen && description}
    </div>
  );
};

export default ProductDescriptionDropdown;
