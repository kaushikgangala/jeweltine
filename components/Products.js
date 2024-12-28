import React from "react";
import { useRouter } from "next/navigation";
import { products } from "@/constants/products";

const ProductGrid = () => {
    const router = useRouter();

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Explore Our Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Object.entries(products).map(([key, product]) => (
                    <div
                        key={key}
                        onClick={() => router.push(product.path)}
                        className="cursor-pointer rounded-lg shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300"
                    >
                        <img
                            src={product.images[0]}
                            alt={key}
                            className="rounded-t-lg w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold mb-2 capitalize">Funny {key} Jewelry</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
