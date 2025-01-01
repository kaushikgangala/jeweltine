"use client"; // Ensure this runs client-side
import { useReducer, useEffect } from "react";

// Initial timer state
const initialState = {
  hours: 0,
  minutes: 15,
  seconds: 9,
};

// Reducer function to handle timer logic
function timerReducer(state, action) {
  switch (action.type) {
    case "TICK":
      if (state.seconds > 0) {
        return { ...state, seconds: state.seconds - 1 };
      } else if (state.minutes > 0) {
        return { ...state, minutes: state.minutes - 1, seconds: 59 };
      } else if (state.hours > 0) {
        return { hours: state.hours - 1, minutes: 59, seconds: 59 };
      } else {
        // Reset timer when it reaches 0:0:0
        return { hours: 0, minutes: 29, seconds: 53 };
      }
    default:
      return state;
  }
}

export default function DiscountCounter() {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  // Load timer state from localStorage or set defaults
  useEffect(() => {
    const storedHours = localStorage.getItem("hours");
    const storedMinutes = localStorage.getItem("minutes");
    const storedSeconds = localStorage.getItem("seconds");

    if (storedHours || storedMinutes || storedSeconds) {
      dispatch({
        type: "LOAD",
        payload: {
          hours: Number(storedHours) || 0,
          minutes: Number(storedMinutes) || 29,
          seconds: Number(storedSeconds) || 53,
        },
      });
    }
  }, []);

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Save timer state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("hours", state.hours);
    localStorage.setItem("minutes", state.minutes);
    localStorage.setItem("seconds", state.seconds);
  }, [state]);

  // Format time for display
  const formatTime = (value) => (value < 10 ? `0${value}` : value);

  return (
    <div
      className="bg-white text-center pt-2 sticky top-0 z-10 pb-2 pl-8 pr-8 w-full"
      style={{ color: "#ff0084" }}
    >
      {state.hours === 0 && state.minutes === 0 && state.seconds === 0 ? (
        <h1 id="counter1" className="text-xl font-semibold">
          COUPON RE-APPLIED
        </h1>
      ) : (
        <h1 id="counter1" className="text-sm font-medium">
          50% OFF - DISCOUNT ENDS IN:{" "}
          <span className="text-xl font-semibold">
            {formatTime(state.hours)}:{formatTime(state.minutes)}:
            {formatTime(state.seconds)}
          </span>
        </h1>
      )}
    </div>
  );
}
