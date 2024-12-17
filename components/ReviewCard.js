import React from "react";
import Image from "next/image";

const ReviewCard = ({ name, review, imageUrl }) => {
  return (
    <div className="max-w-sm  border-2 border-pink-400 rounded-md shadow-lg">
      <div className="flex flex-col items-start ">
        <Image
          src={imageUrl}
          alt={`review`}
          width={800}
          height={800}
          unoptimized
          loading="eager"
          className="w-full h-auto rounded-sm shadow-lg"
        />
        {/* <br /> */}
      </div>
      <div className="p-4">
        <div className="mt-2">
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          <span className="text-gray-400">⭐️⭐️⭐️⭐️⭐️</span>{" "}
        </div>
        <div className="mt-4 text-gray-700">
          <p className="text-base">{review}</p>
        </div>
        <div className="mt-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 gap-2">
          <span className="px-4 py-1 bg-green-100 text-green-700 rounded text-center">
            Verified Customer
          </span>
          {/* You can change star count */}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
