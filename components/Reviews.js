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
        console.log("data", data);
        setReviews(data); // Set parsed data
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures it runs only once on component mount

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <h2>See what our customers have to say...</h2>
      {reviews.map((review, index) => (
        <ReviewCard
          key={index} // Use a unique key for each child
          name={review.name}
          review={review.review}
          imageUrl={review.imageUrl}
        />
      ))}
    </div>
  );
};

export default Reviews;
