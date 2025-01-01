"use client";

import Footer from "@/components/Footer";
import { primaryFontColor } from "@/utils/styles";
import { useEffect, useState } from "react";

const ThankYouPage = () => {
    const [customerData, setCustomerData] = useState(null);
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        async function metaPurchaseEvent() {
            const customer = JSON.parse(localStorage.getItem("customer"));
            const customization = JSON.parse(localStorage.getItem("customization"));

            if (customer) setCustomerData(customer);
            if (customization) setProductData(customization);

            await fetch("/api/meta/purchase", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    value: customization
                        ? (customization.Price * customization.quantity).toFixed(2)
                        : 0,
                    quantity: customization?.quantity || 0,
                    email: customer?.email || "",
                    phone: customer?.phone || "",
                    fbc: sessionStorage.getItem("_fbc"),
                    fbp: sessionStorage.getItem("_fbp"),
                    totalAmount: customization
                        ? (customization.Price * customization.quantity).toFixed(2)
                        : 0,
                    qty: customization?.quantity || 0,
                }),
            });
        }

        metaPurchaseEvent();
    }, []);

    const currentDate = new Date();
    const deliveryDate = new Date(currentDate);
    deliveryDate.setDate(deliveryDate.getDate() + 6);

    const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });

    return (
        <>
            <div className="thank-you-container bg-gray-50 min-h-screen flex items-center justify-center px-4">
                <div className="bg-white p-6 w-full max-w-3xl rounded-lg shadow-lg">
                    <h1
                        className="text-4xl font-bold text-center mb-6"
                        style={{ color: primaryFontColor || "#333" }}
                    >
                        Thank You for Your Order!
                    </h1>
                    <p className="text-lg text-center text-gray-600 mb-8">
                        Your order has been successfully placed. Here are your order
                        details:
                    </p>

                    {/* Delivery Date Section */}
                    <div className="mb-6">
                        <p className="text-lg font-medium text-gray-700">
                            Expected Delivery:
                            <span className="block text-2xl font-bold  mt-1">
                                {formattedDeliveryDate}
                            </span>
                        </p>
                    </div>

                    {/* Shipping Details */}
                    {customerData && (
                        <div className="bg-gray-100 p-4 rounded-lg mb-6">
                            <h2 className="text-xl font-semibold mb-3 text-gray-800">
                                Shipping Details
                            </h2>
                            <div className="space-y-2 text-gray-700">
                                <p>
                                    <strong>Name:</strong> {customerData.name}
                                </p>
                                <p>
                                    <strong>Email:</strong> {customerData.email}
                                </p>
                                <p>
                                    <strong>Phone:</strong> {customerData.phone}
                                </p>
                                <p>
                                    <strong>Address:</strong> {customerData.street},{" "}
                                    {customerData.city}, {customerData.state},{" "}
                                    {customerData.country} - {customerData.pin}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Product Details */}
                    {productData && (
                        <div className="bg-gray-100 p-4 rounded-lg mb-6">
                            <h2 className="text-xl font-semibold mb-3 text-gray-800">
                                Products Ordered
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-gray-300 pb-3">
                                    <div>
                                        <p className="text-gray-700">
                                            <strong>Product:</strong> {productData.Necklace}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Quantity:</strong> {productData.quantity}
                                        </p>
                                    </div>
                                    <p className="text-lg font-medium text-gray-800">
                                        ${productData.Price}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right mt-4">
                                <p className="text-xl font-bold ">
                                    Total: $
                                    {productData.quantity === 1
                                        ? productData.Price
                                        : (productData.Price * productData.quantity - 20).toFixed(
                                            2
                                        )}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Call to Action */}
                    <div className="text-center mt-6">
                        <p className="text-gray-600">Have questions about your order?</p>
                        <a
                            href="/contact"
                            className="mt-2 inline-block px-6 py-2 rounded-md  text-white font-semibold  transition duration-200"
                            style={{ backgroundColor: "#ff0084" }}
                        >
                            Contact Support
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ThankYouPage;