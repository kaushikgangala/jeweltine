import React, { useState, useEffect } from "react";

const Stats = () => {
  const [viewers, setViewers] = useState(50); // Start from 10
  const maxViewers = 600; // Maximum viewers
  const [atc, setAtc] = useState(1); // Start from 10
  const maxAtc = 600; // Maximum viewers

  useEffect(() => {
    const incrementViewers = () => {
      setViewers((prev) => {
        if (prev >= maxViewers) return prev; // Stop incrementing at max viewers
        const increment = Math.random() * 2 + 1; // Increment by a small random amount (1 to 3)
        return Math.min(prev + increment, maxViewers); // Ensure it doesn't exceed max viewers
      });
    };
    const incrementAtc = () => {
      setAtc((prev) => {
        if (prev >= maxAtc) return prev; // Stop incrementing at max viewers
        const increment = Math.random() * 2 + 1; // Increment by a small random amount (1 to 3)
        return Math.min(prev + increment, maxAtc); // Ensure it doesn't exceed max viewers
      });
    };

    const interval1 = setInterval(incrementViewers, 2500); // Increment every second
    const interval2 = setInterval(incrementAtc, 4000); // Increment every second

    return () => clearInterval(interval1, interval2); // Cleanup interval on component unmount
  }, []);
  return (
    <>
      <div className="mb-4 flex items-center justify-center p-4 bg-red-100 border border-red-400 rounded shadow-md">
        <p className="text-lg font-semibold text-red-600">
          {Math.floor(viewers)} people are viewing this product right now!
        </p>
      </div>

      <div className="mb-4 flex items-center justify-center p-4 bg-red-100 border border-red-400 rounded shadow-md">
        <p className="text-lg font-semibold text-red-600">
          {Math.floor(atc)} people have started their checkout right now!
        </p>
      </div>

      <div className="flex items-center justify-center p-4 bg-red-100 border border-red-400 rounded shadow-md">
        <p className="text-lg font-semibold text-red-600">
          Only {76} units left!
        </p>
      </div>
    </>
  );
};

export default Stats;
