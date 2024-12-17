import React, { useState, useEffect } from "react";

const Stats = () => {
  // State variables
  const [viewers, setViewers] = useState(50); // Initial viewers
  const maxViewers = 600; // Max viewers
  const minViewers = 30; // Minimum viewers

  const [atc, setAtc] = useState(10); // Initial add-to-cart
  const maxAtc = 40; // Max ATC
  const minAtc = 5; // Minimum ATC

  const [stock, setStock] = useState(76); // Initial stock count
  const minStock = 20; // Minimum stock
  const maxStock = 76; // Maximum stock

  // Function to randomly increment or decrement a value
  const getRandomChange = () =>
    (Math.random() < 0.5 ? 1 : -1) * (Math.random() * 3);

  useEffect(() => {
    const updateViewers = () => {
      setViewers((prev) => {
        const change = getRandomChange();
        const newValue = prev + change;
        return Math.min(Math.max(newValue, minViewers), maxViewers);
      });
    };

    const updateAtc = () => {
      setAtc((prev) => {
        const change = getRandomChange();
        const newValue = prev + change;
        return Math.min(Math.max(newValue, minAtc), maxAtc);
      });
    };

    const updateStock = () => {
      setStock((prev) => {
        const change = getRandomChange();
        const newValue = prev + change;
        return Math.min(Math.max(newValue, minStock), maxStock);
      });
    };

    const interval1 = setInterval(updateViewers, 2000); // Update viewers every 2 seconds
    const interval2 = setInterval(updateAtc, 3000); // Update ATC every 3 seconds
    const interval3 = setInterval(updateStock, 5000); // Update stock every 5 seconds

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, []);

  return (
    <>
      {/* Viewers */}
      <div className="mb-4 flex items-center justify-center p-4 bg-red-100 border border-red-400 rounded shadow-md">
        <p className="text-lg font-semibold text-red-600">
          {Math.floor(viewers)} people are viewing this product right now!
        </p>
      </div>

      {/* Add to Cart */}
      <div className="mb-4 flex items-center justify-center p-4 bg-red-100 border border-red-400 rounded shadow-md">
        <p className="text-lg font-semibold text-red-600">
          {Math.floor(atc)} people have started their checkout right now!
        </p>
      </div>

      {/* Stock Available */}
      <div className="flex items-center justify-center p-4 bg-red-100 border border-red-400 rounded shadow-md">
        <p className="text-lg font-semibold text-red-600">
          Only {Math.floor(stock)} units left!
        </p>
      </div>
    </>
  );
};

export default Stats;
