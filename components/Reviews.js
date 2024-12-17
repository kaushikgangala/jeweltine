import React, { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  const [reviews, setReviews] = useState([]); // Initialize as an empty array

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/reviews", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json(); // Parse the JSON response
        setReviews(data); // Set parsed data
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures it runs only once on component mount

  return (
    <div className="p-4">
      <h2
        className="text-2xl font-bold mb-6 text-center "
        style={{ color: "#ff0084" }}
      >
        See what our customers have to say...
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-6">
        {reviews.map((review, index) => (
          <ReviewCard
            key={index} // Use a unique key for each child
            name={review.name}
            review={review.review}
            imageUrl={review.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
