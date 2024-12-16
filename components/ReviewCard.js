import React from "react";
import Image from "next/image";

const ReviewCard = ({ name, review, imageUrl }) => {
  return (
    <div className="max-w-sm p-4 border-2 border-gray-300 rounded-lg shadow-lg">
      <div className="flex items-center space-x-4">
        <Image
          src={imageUrl}
          alt={`review`}
          width={400}
          height={400}
          loading="eager"
          className="w-full h-auto rounded-lg shadow-lg"
        />
        <br />
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500">Verified Customer</p>
        </div>
      </div>
      <div className="mt-4 text-gray-700">
        <p className="text-base">{review}</p>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">
          Verified Customer
        </span>
        <span className="text-gray-400">⭐️⭐️⭐️⭐️⭐️</span>{" "}
        {/* You can change star count */}
      </div>
    </div>
  );
};

export default ReviewCard;
