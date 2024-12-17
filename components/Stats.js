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
      <div className="mb-4 flex items-center gap-2 justify-center p-2 bg-red-100 border border-red-400 rounded shadow-md text-red-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-6"
          className="size-6"
        >
          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path
            fill-rule="evenodd"
            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
            clip-rule="evenodd"
          />
        </svg>
        <p className="text-md font-semibold text-red-600">
          {Math.floor(viewers)} people are viewing this product right now!
        </p>
      </div>

      {/* Add to Cart */}
      <div className="mb-4 flex items-center gap-2 justify-center p-2 bg-red-100 border border-red-400 rounded shadow-md  text-red-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-6"
          className="size-6"
        >
          <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
        </svg>

        <p className="text-md font-semibold text-red-600">
          {Math.floor(atc)} people have started their checkout right now!
        </p>
      </div>

      {/* Stock Available */}
      <div className="mb-4 flex items-center gap-2 justify-center p-2 bg-red-100 border border-red-400 rounded shadow-md  text-red-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-6"
          className="size-6"
        >
          <path
            fill-rule="evenodd"
            d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
            clip-rule="evenodd"
          />
          <path
            fill-rule="evenodd"
            d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
            clip-rule="evenodd"
          />
        </svg>

        <p className="text-md font-semibold text-red-600">
          Only {Math.floor(stock)} units left!
        </p>
      </div>
    </>
  );
};

export default Stats;
