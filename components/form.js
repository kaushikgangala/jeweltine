"use client";

import Image from "next/image";
import { transformLink } from "@/utils/s3Link";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PayPalButton from "./PaypalButton";
import { primaryFontColor, secondaryFontColor } from "@/utils/styles";
import Stats from "./Stats";

export default function OrderForm({ handleScrollToSection }) {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  const router = useRouter();
  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    pin: "",
    state: "",
    country: "",
  });
  const [customization, setCustomization] = useState({
    "Name 1": "",
    "Name 2": "",
    "Custom Text":
      "I Loved You Then, I Love You Still. I Always Have, I Always Will.",
    Necklace: "Interlocked Hearts",
    Color: "Gold",
    Price: 49,
    quantity: 1,
  });

  const [customTextEnabled, setCustomTextEnabled] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [product, setProduct] = useState([
    { name: "Interlocked Hearts", price: 49, color: "gold" },
  ]);

  const handleOptionChange = (event) => {
    const value = event.target.value;

    if (value === "custom") {
      setCustomTextEnabled(true); // Enable custom input field
      setCustomization((prev) => ({ ...prev, "Custom Text": customInput })); // Use custom input value
    } else {
      setCustomTextEnabled(false); // Disable custom input field
      setCustomization((prev) => ({ ...prev, "Custom Text": value })); // Set predefined option
    }
  };

  const handleCustomInputChange = (event) => {
    const value = event.target.value;
    setCustomInput(value); // Update local custom input state
    setCustomization((prev) => ({ ...prev, "Custom Text": value })); // Update customization state
  };

  const handleCustomizationChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setCustomization((prev) => ({ ...prev, [name]: value }));
  };

  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);

    try {
      const uploadedImages = await Promise.all(
        files.map(async (file) => {
          const res = await fetch("/api/orders/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fileName: file.name,
              folder: `orders/${folderId}`, // Unique folder for the current order
            }),
          });

          if (!res.ok) throw new Error("Failed to get signed URL");

          const { uploadUrl, fileUrl } = await res.json();

          // Upload to S3
          await fetch(uploadUrl, {
            method: "PUT",
            headers: {
              "Content-Type": file.type,
            },
            body: file,
          });

          return fileUrl;
        })
      );

      setImages((prev) => [...prev, ...uploadedImages]);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  const handleCartAbandonment = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      const res = await fetch("/api/orders/cartAbandonment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customization,
          customer,
          product,
          imagesFolder: `orders/${folderId}`,
        }),
      });

      if (!res.ok) throw new Error("Failed to place order");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!customer.name || !customer.email || images.length === 0) {
      alert("Please fill in all required fields and upload images.");
      return;
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customization,
          customer,
          images,
          // imagesFolder: `orders/${folderId}`,
        }),
      });
      await fetch("/api/orders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: customer.email,
        }),
      });

      if (!res.ok) throw new Error("Failed to place order");

      setOrderSuccess(true);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }

    // Push to the Thank You page with query parameters
    localStorage.setItem("customer", JSON.stringify(customer));
    localStorage.setItem("customization", JSON.stringify(customization));
    localStorage.setItem("images", JSON.stringify(images));
    router.push(`/thankyou`);
  };

  const handleRemoveImage = async (index) => {
    const imageUrl = images[index];
    const fileName =
      imageUrl.split("/")[imageUrl.split("/").length - 2] +
      "/" +
      imageUrl.split("/")[imageUrl.split("/").length - 1]; // Extract the file name from the URL

    try {
      setImages((prev) => prev.filter((_, i) => i !== index)); // Remove from UI first

      // Send a request to the backend to delete the image from S3
      const res = await fetch("/api/orders/remove-image", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName }), // Send the file name to the backend
      });

      if (!res.ok) {
        throw new Error("Failed to remove image");
      }
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  function handleScrollToSection1() {
    section1Ref.current?.scrollIntoView({
      behavior: "smooth", // Smooth scroll effect
      block: "start", // Align to the top of the viewport
    });
  }
  function handleScrollToSection2() {
    section2Ref.current?.scrollIntoView({
      behavior: "smooth", // Smooth scroll effect
      block: "start", // Align to the top of the viewport
    });
  }
  function handleScrollToSection3() {
    section3Ref.current?.scrollIntoView({
      behavior: "smooth", // Smooth scroll effect
      block: "start", // Align to the top of the viewport
    });
  }

  // unique id
  function generateUniqueId() {
    return "id-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
  }

  const folderId = generateUniqueId(); // Example: id-1701077822434-9x8y2k7zq

  // meta events
  async function metaAddToCart() {
    await fetch("/api/meta/atc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: customization.Price,
        quantity: customization.quantity,
        email: customer.email,
        phone: customer.phone,
        fbc: sessionStorage.getItem("_fbc"),
        fbp: sessionStorage.getItem("_fbp"),
      }),
    });
  }

  async function metaCheckout() {
    await fetch("/api/meta/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        value: customization.Price,
        quantity: customization.quantity,
        email: customer.email,
        phone: customer.phone,
        fbc: sessionStorage.getItem("_fbc"),
        fbp: sessionStorage.getItem("_fbp"),
        totalAmount: customization.Price,
        qty: customization.quantity,
      }),
    });
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1
        className="text-4xl font-extrabold mb-6 text-center "
        style={{ color: "#ff0084" }}
      >
        50% OFF - Jeweltine Love Necklace - For Your Loved One
      </h1>

      <Stats />

      {orderSuccess ? (
        <p className="text-green-600 text-lg text-center">
          Order placed successfully!
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div ref={section1Ref}></div> {/* Step 1: Customer Details */}
          {step >= 1 && (
            <fieldset className="p-6 border-2 border-gray-300 rounded-lg shadow-lg bg-white max-w-4xl mx-auto overflow-hidden">
              <legend
                className="text-2xl font-semibold text-center mb-4"
                style={{ color: secondaryFontColor }}
              >
                Customization Details
              </legend>
              {Object.keys(customization).map(
                (field) =>
                  (field === "Name 1" || field === "Name 2") && (
                    <div key={field} className="mb-4">
                      <label
                        htmlFor={field}
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {field}
                      </label>
                      <input
                        type={"text"}
                        placeholder={""}
                        id={field}
                        name={field}
                        value={customer[field]}
                        onChange={handleCustomizationChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                      />
                    </div>
                  )
              )}
              <hr className="my-4 border-t border-gray-300" />
              <div className="flex flex-col gap-3 ">
                <label
                  htmlFor={"Custom Text"}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {"Text: "}
                </label>
                <label>
                  <input
                    type="radio"
                    name="Custom Text"
                    value="I Loved You Then, I Love You Still. I Always Have, I Always Will."
                    onChange={handleOptionChange}
                    defaultChecked
                  />
                  I Loved You Then, I Love You Still. I Always Have, I Always
                  Will.
                </label>
                <label>
                  <input
                    type="radio"
                    name="Custom Text"
                    value="Every Love Story Is Beautiful, but Ours Is My Favorite."
                    onChange={handleOptionChange}
                  />
                  Every Love Story Is Beautiful, but Ours Is My Favorite.
                </label>
                <label>
                  <input
                    type="radio"
                    name="Custom Text"
                    value="Forever Is a Long Time, but I Wouldn’t Mind Spending It by Your Side."
                    onChange={handleOptionChange}
                  />
                  Forever Is a Long Time, but I Wouldn’t Mind Spending It by
                  Your Side.
                </label>
                <label>
                  <input
                    type="radio"
                    name="Custom Text"
                    value="My Love for You Is a Journey: Starting at Forever and Ending at Never."
                    onChange={handleOptionChange}
                  />
                  My Love for You Is a Journey: Starting at Forever and Ending
                  at Never.
                </label>
                <label>
                  <input
                    type="radio"
                    name="Custom Text"
                    value="You Are the Light That Guides Me Through My Darkest Days."
                    onChange={handleOptionChange}
                  />
                  You Are the Light That Guides Me Through My Darkest Days.
                </label>
                <label>
                  <input
                    type="radio"
                    name="Custom Text"
                    value="custom"
                    onChange={handleOptionChange}
                  />
                  Custom Text
                </label>
              </div>
              {/* Show the custom input field if "Custom Text" is selected */}
              <div className="pb-10">
                {customTextEnabled && (
                  <input
                    className="w-full p-3 border border-gray-300 rounded-md"
                    type="text"
                    placeholder="Enter your custom message here"
                    value={customInput}
                    onChange={handleCustomInputChange}
                  />
                )}
              </div>
              <hr className="my-4 border-t border-gray-300" />

              <label
                htmlFor={"file"}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {"Upload image: "}
              </label>
              {/* <p className="text-lg text-gray-700 font-medium mt-2 text-center">
                Upload image
              </p> */}
              <div className="flex flex-row gap-2 justify-center ">
                <div className="relative w-24 h-24 rounded-md overflow-hidden">
                  <Image
                    src={
                      "https://images.pexels.com/photos/1464565/pexels-photo-1464565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    }
                    alt={`Image guide 1`}
                    className="object-cover w-full h-full"
                    width={400}
                    height={400}
                    unoptimized
                  />
                  <button
                    type="button"
                    className="absolute bottom-2 right-10 bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-md text-gray-500 font-medium mt-2 text-center mb-4">
                ** Please make sure that the subjects are at the center of the
                frame and away from the camera. **
              </p>
              <input
                id="file"
                type="file"
                disabled={images.length >= 1}
                accept="image/*"
                onChange={handleUpload}
                className="mb-10 p-2 bg-white border border-gray-300 rounded-md w-full"
              />
              {uploading && (
                <p className="text-blue-600 text-center">
                  Uploading images... Please wait
                </p>
              )}
              {images.length > 0 && (
                <p className="text-red-600 text-center mb-2">
                  {`image uploaded`}
                </p>
              )}
              {images.length > 0 && (
                <div className="mb-4">
                  <ul className="flex flex-wrap gap-4 overflow-x-auto">
                    {images.map((url, index) => (
                      <li
                        key={index}
                        className="relative w-24 h-24 rounded-md overflow-hidden"
                      >
                        <Image
                          src={transformLink(url)}
                          alt={`Uploaded Image ${index}`}
                          className="object-cover w-full h-full"
                          width={400}
                          height={400}
                          unoptimized
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          X
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {images.length > 1 && (
                <p className="text-red-600 text-sm text-center">
                  You have exceeded the limit of 1 images.
                </p>
              )}
              <hr className="my-4 border-t border-gray-300" />

              <label
                htmlFor={"Necklace"}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {"Necklace: "}
              </label>
              <div className="flex flex-row gap-4 mb-12">
                <div className="flex flex-col justify-center items-center ">
                  <label>
                    <input
                      type="radio"
                      name="Necklace"
                      value="Interlocked Hearts"
                      onChange={handleCustomizationChange}
                      defaultChecked
                    />
                    <Image
                      src={
                        "https://jeweltine.s3.us-east-1.amazonaws.com/misc/interlocked_hearts.jpg"
                      }
                      alt={`Interlocked Hearts Necklace Image`}
                      className="w-24 h-24 object-cover rounded-md"
                      width={400}
                      height={400}
                    />
                    Interlocked Hearts
                  </label>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <label>
                    <input
                      type="radio"
                      name="Necklace"
                      value="Forever Love"
                      onChange={handleCustomizationChange}
                    />
                    <Image
                      src={
                        "https://jeweltine.s3.us-east-1.amazonaws.com/misc/forever_love.jpeg"
                      }
                      alt={`Forever Love Necklace`}
                      className="w-24 h-24 object-cover rounded-md"
                      width={400}
                      height={400}
                    />
                    Forever Love
                  </label>
                </div>
              </div>
              <hr className="my-4 border-t border-gray-300" />

              <label
                htmlFor={"Color"}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {"Color: "}
              </label>
              <div className="flex flex-row gap-4 mb-8">
                <div className="flex flex-col justify-center items-center">
                  <label>
                    <input
                      type="radio"
                      name="Color"
                      value="Gold"
                      onChange={handleCustomizationChange}
                      defaultChecked
                    />
                    18K Gold
                  </label>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <label>
                    <input
                      type="radio"
                      name="Color"
                      value="Silver"
                      onChange={handleCustomizationChange}
                    />
                    14K Silver
                  </label>
                </div>
              </div>
              <hr className="my-4 border-t border-gray-300" />

              <label
                htmlFor={"Box"}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {"Box: "}
              </label>
              <div className="flex flex-row gap-4 mb-8">
                <div className="flex flex-col justify-center items-center">
                  <label>
                    <input
                      type="radio"
                      name="Box"
                      value="Standard Box"
                      onChange={(e) => {
                        handleCustomizationChange(e);
                        setCustomization((prev) => ({ ...prev, Price: 49 }));
                      }}
                      defaultChecked
                    />
                    <Image
                      src={
                        "https://jeweltine.s3.us-east-1.amazonaws.com/misc/standard_box.png"
                      }
                      alt={`Interlocked Hearts Necklace Image`}
                      className="w-24 h-24 object-cover rounded-md"
                      width={400}
                      height={400}
                    />
                    Standard Box
                  </label>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <label>
                    <input
                      type="radio"
                      name="Box"
                      value="Luxury Wooden Box"
                      onChange={(e) => {
                        handleCustomizationChange(e);
                        setCustomization((prev) => ({ ...prev, Price: 69 }));
                      }}
                    />
                    <Image
                      src={
                        "https://jeweltine.s3.us-east-1.amazonaws.com/misc/luxury_wooden_box.png"
                      }
                      alt={`Interlocked Hearts Necklace Image`}
                      className="w-24 h-24 object-cover rounded-md"
                      width={400}
                      height={400}
                    />
                    Luxury Wooden Box (+$20)
                  </label>
                </div>
              </div>
              <button
                id="form-btn-2"
                type="button"
                disabled={
                  images.length === 0 ||
                  images.length > 1 ||
                  !customization["Name 1"] ||
                  !customization["Name 2"] ||
                  !customization["Custom Text"] ||
                  !customization["Necklace"] ||
                  !customization["Color"]
                }
                onClick={() => {
                  setStep(2);
                  handleScrollToSection2();
                }}
                className="w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400"
              >
                Next: Shipping Details
              </button>
            </fieldset>
          )}
          {/* Step 2: Upload Images */}
          <div ref={section2Ref}></div>
          {step >= 2 && (
            <fieldset className="p-6 border-2 border-gray-300 rounded-lg shadow-lg bg-white">
              <legend
                className="text-2xl font-semibold text-center  mb-4"
                style={{ color: secondaryFontColor }}
              >
                Shipping Details
              </legend>
              {Object.keys(customer).map((field) => (
                <div key={field} className="mb-4">
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {field != "familyName"
                      ? field.charAt(0).toUpperCase() + field.slice(1)
                      : "Family Name"}{" "}
                    {field === "familyName" ? "(OPTIONAL)" : ""}{" "}
                  </label>
                  <input
                    type={field === "phone" || field === "pin" ? "tel" : "text"}
                    placeholder={
                      field === "familyName" ? "Williams' Family" : ""
                    }
                    id={field}
                    name={field}
                    value={customer[field]}
                    onChange={handleCustomerChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  handleScrollToSection1();
                }}
                className="w-full py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 mb-2"
              >
                Back: Upload Images
              </button>
              <button
                id="form-btn-1"
                type="button"
                disabled={
                  !customer.name ||
                  !customer.email ||
                  !customer.phone ||
                  !customer.street ||
                  !customer.city ||
                  !customer.pin ||
                  !customer.state ||
                  !customer.country
                }
                onClick={() => {
                  setStep(3);
                  handleCartAbandonment();
                  handleScrollToSection3();
                  metaAddToCart();
                }}
                className="w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400"
              >
                Next: Confirm Order
              </button>
            </fieldset>
          )}
          {/* Step 3: Products */}
          <div ref={section3Ref}></div>
          {step >= 3 && (
            <fieldset className="p-6 border-2 border-gray-300 rounded-lg shadow-lg bg-white">
              <legend
                className="text-2xl font-semibold text-center mb-4"
                style={{ color: secondaryFontColor }}
              >
                Confirm Order
              </legend>

              {/* Order Bumps with Animated Arrow */}
              <div className="space-y-6">
                {[
                  {
                    title:
                      "Upgrade Your Order: Order 2 units for both of you!❤️",
                  },
                ].map((orderBump, index) => (
                  <div
                    key={index}
                    className="relative flex items-center space-x-4 p-4 border border-gray-300 rounded-lg shadow-md bg-red-50 hover:bg-red-100 transition"
                  >
                    {/* Animated Arrow */}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                      <div className="animate-ping bg-yellow-500 rounded-full w-4 h-4">
                        <Image
                          src="/formArrow.svg" // Change this to your image path
                          alt="form arrow"
                          width={80} // Adjust image size if necessary
                          height={80}
                          className="m-auto "
                        />
                      </div>
                    </div>

                    <input
                      type="checkbox"
                      id={`order-bump-${index}`}
                      onChange={(e) => {
                        setCustomization((prev) => ({
                          ...prev,
                          quantity: prev.quantity === 1 ? 2 : 1,
                        }));
                      }}
                      className="h-5 w-5 flex-shrink-0 border-gray-300 rounded"
                    />
                    <div className="flex flex-col md:flex-row items-center space-x-4">
                      <div className="text-sm">
                        <h4 className="font-semibold">
                          {orderBump.title} At $20 OFF
                        </h4>
                        <p className="text-gray-600">{orderBump.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-6 space-y-4">
                {/* List each product */}
                <div key={1} className="flex justify-between text-lg">
                  <span>
                    {customization.Necklace}{" "}
                    {`(Qty: ${customization.quantity})`}
                  </span>
                  <span>${customization.Price}</span>
                </div>

                {/* Total Amount */}
                <div
                  className="flex justify-between text-xl font-bold "
                  style={{ color: primaryFontColor }}
                >
                  <span>Total Amount:</span>
                  <span>
                    $
                    {customization.Price * customization.quantity -
                      (customization.quantity === 2 ? 20 : 0)}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <button
                type="button"
                onClick={() => {
                  setStep(2);
                  handleScrollToSection2();
                }}
                className="w-full py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 mt-6 mb-2"
              >
                Back: Shipping Details
              </button>
              <PayPalButton
                amount={(
                  customization.Price * customization.quantity -
                  (customization.quantity === 2 ? 20 : 0)
                ).toFixed(2)}
                onFormSubmit={handleSubmit}
                metaCheckout={metaCheckout}
              />
            </fieldset>
          )}
        </form>
      )}
    </div>
  );
}
