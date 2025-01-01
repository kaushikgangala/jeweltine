"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { products } from "@/constants/products";
import PayPalButton from "./PaypalButton";
import { primaryFontColor, secondaryFontColor } from "@/utils/styles";
import Stats from "./Stats";

export default function OrderForm() {

  const pathname_regular = usePathname().split("/").join("");
  const pathname =
    usePathname().split("/").join("").charAt(0).toUpperCase() +
    usePathname().split("/").join("").substring(1);
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

  const [product, setProduct] = useState({
    name: `Funny ${pathname} Valentine's Day - Forever Love Necklace`,
    price: 59.95,
    quantity: 1,
  });

  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleCartAbandonment = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      const res = await fetch("/api/orders/cartAbandonment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          product,
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

    if (!customer.name || !customer.email) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          product,
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

    // shineon
    await fetch("https://api.shineon.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SHINEON_KEY}`,
      },
      body: JSON.stringify({
        order: {
          source_id: uuidv4(),
          email: customer.email,
          shipment_notification_url: "http://url.com/notification",
          line_items: [
            {
              store_line_item_id: uuidv4(),
              sku: products[pathname_regular].sku,
              quantity: product.quantity,
            },
          ],
          shipping_address: {
            name: customer.name,
            phone: customer.phone,
            address1: customer.street,
            city: customer.city,
            zip: customer.pin,
            province: customer.state,
            country_code: "US",
          },
        },
      }),
    });

    const currentDate = new Date();
    const deliveryDate = new Date(currentDate);
    deliveryDate.setDate(deliveryDate.getDate() + 6);

    const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    // thankyou email
    await fetch("/api/email/thankyou", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: customer.email,
        subject: 'Thank You for Your Purchase!',
        message: `Hey, ${customer.name},

Thank you for your purchase! Your order will be at your doorstep at around ${formattedDeliveryDate}.

Here are the details of your order:

    Product Name: ${product.name}
    Total: $${product.quantity === 2 ? 99.9 : product.price}
    Shipping Address: ${customer.street}, ${customer.city}, ${customer.pin}, ${customer.state}, ${customer.country}.

If you have any questions or concerns, feel free to reach out to us at contact.jeweltine@gmail.com.

Warm regards,
Jeweltine`
      })
    })

    // thankyou email
    await fetch("/api/email/thankyou", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: customer.email,
        subject: 'Important: Confirm Your Payment to Complete Your Order',
        message: `Hey, ${customer.name},

Thank you for your purchase! Since we are using PayPal for secure payments, we kindly ask for your assistance to ensure your order is processed without delays. 👇

💡 Here’s What You Need to Do:

    1. Log in to your PayPal account.
    2. Locate the transaction for your recent purchase with us in the "Activity" section.
    3. Click on the transaction and look for the option to "Confirm Receipt" or "Mark as Received" (this may be under transaction details).

Why This Is Important:
PayPal sometimes holds payments for new businesses to ensure a smooth transaction process. By confirming receipt of your order, you help release the funds so we can continue processing your purchase and deliver your product as quickly as possible.

If you have any questions or need help with the process, feel free to contact us at contact.jeweltine@gmail.com.`
      })
    })



    // Push to the Thank You page with query parameters
    localStorage.setItem("customer", JSON.stringify(customer));
    localStorage.setItem("product", JSON.stringify(product));
    router.push(`/thankyou`);
  };

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
        email: customer.email,
        phone: customer.phone,
        fbc: sessionStorage.getItem("_fbc"),
        fbp: sessionStorage.getItem("_fbp"),
      }),
    });
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1
        className="text-4xl font-extrabold mb-6 text-center "
        style={{ color: "#ff0084" }}
      >
        {`50% OFF - Funny `}
        {pathname} {` Outdoors Valentine's Day - Forever Love Necklace`}{" "}
      </h1>

      <Stats />

      {orderSuccess ? (
        <p className="text-green-600 text-lg text-center">
          Order placed successfully!
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div ref={section2Ref}></div>
          {step >= 1 && (
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
                      `💌 Upgrade Your Order 💌\n
Double the love, double the joy!`,
                    description: `Why stop at one when you can share the happiness?

No matter how far you are from each other, some things are meant to be shared. Ordering 2 units means staying connected in a truly special way.

Picture this: every time they use it, they’ll think of you. And the same from your side. A simple way to stay connected, no matter where life takes you both.

💖 Treat yourself and someone you care about. Order 2 units today and let the love multiply!`
                  },
                ].map((orderBump, index) => (
                  <div
                    key={index}
                    className="relative flex items-start space-x-4 p-4 border border-gray-300 rounded-lg shadow-md bg-red-50 hover:bg-red-100 transition"
                  >
                    {/* Animated Arrow */}
                    <div className="absolute left-0 top-8 transform -translate-y-1/2">
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
                        product.quantity === 1
                          ? setProduct((prev) => ({
                            ...prev,
                            price: 99.9,
                            quantity: 2,
                          }))
                          : setProduct((prev) => ({
                            ...prev,
                            price: 59.95,
                            quantity: 1,
                          }));
                      }}
                      className="h-5 w-5 flex-shrink-0 mt-2 border-gray-300 rounded"
                    />
                    <div className="flex flex-col md:flex-row items-start space-x-4">
                      <div className="text-md">
                        <h4 className="font-semibold">
                          {orderBump.title} At $20 OFF
                        </h4>
                        <p className="text-gray-600 mt-2">Why stop at one when you can share the happiness?
                          <br />
                          <br />
                          💖 Treat yourself and someone you care about. Order 2 units today and let the love multiply!

                          <br />
                          <br />

                          A simple way to stay connected, no matter where life takes you both.
                        </p>
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
                    {`Funny `}
                    {pathname}{" "}
                    {` Outdoors Valentine's Day - Forever Love Necklace`}{" "}
                  </span>
                  <span>${59.95}</span>
                </div>

                {/* Total Amount */}
                {
                  <div
                    className="flex justify-between text-xl font-bold "
                    style={{ color: primaryFontColor }}
                  >
                    <span>Quantity:</span>
                    <span>{product.quantity}</span>
                  </div>
                }

                {/* Total Amount */}
                <div
                  className="flex justify-between text-xl font-bold "
                  style={{ color: primaryFontColor }}
                >
                  <span>Total Amount:</span>
                  <span>{product.quantity === 2 ? <p className="line-through font-normal">$199.9</p> : ""} ${product.price}</span>
                </div>
                <div
                  className="flex justify-between text-xl font-bold "
                  style={{ color: primaryFontColor }}
                >
                  <span>{product.quantity === 2 ? <p className=" font-normal">You just saved $20.</p> : ""}</span>
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
                amount={product.price}
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
