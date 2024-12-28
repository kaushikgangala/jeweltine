import React from "react";
import Image from "next/image";

import Dropdown from "./Dropdown";

const ProductDescription = () => {
  const items = [
    {
      title: "Description",
      description: (
        <div className="mt-2 p-4 text-gray-700 bg-white border border-gray-200 rounded-md shadow-sm flex flex-col justify-center items-center gap-4">
          <div className="max-w-xl flex flex-col justify-center items-center gap-4">
            <p>
              Give your partner the gift that symbolizes your never-ending love.
              This necklace is the perfect accessory for everyday wear. Whether
              it&lsquo;s a memorable anniversary or a special birthday, make
              sure to dazzle your special someone by gifting them this stunning
              necklace. The dazzling Forever Love Necklace is sure to make her heart melt! This necklace features a stunning 6.5mm CZ crystal surrounded by a polished heart pendant embellished with smaller crystals to add extra sparkle and shine. Beautifully crafted with either a yellow gold finish, be sure to give her a classic gift she can enjoy everyday.
            </p>
            <Image
              src={
                "https://cdn.shineon.com/long-form-description-images/forever-love-no-mc-placeholder.jpg"
              }
              alt={`Product Image 1`}
              width={400}
              height={400}
              // unoptimized
              loading="eager"
              className="w-400 h-auto rounded-lg shadow-lg"
            />
            <p>
              High quality polished surgical steel and 18k
              yellow gold finish Pendant dimensions: 0.8&ldquo; (2.2cm) height /
              0.7&ldquo; (1.8cm) width Adjustable length: 18&ldquo; - 22&ldquo;
              (45.72 cm - 55.88 cm) Lobster clasp
            </p>
            <Image
              src={
                "https://prod-rendering-engine.s3.amazonaws.com/transformation-13983-53a0e3ff-8bfc-4196-a685-2483cb7f54a2.jpeg"
              }
              alt={`Product Image 1`}
              width={400}
              height={400}
              // unoptimized
              loading="eager"
              className="w-400 h-auto rounded-lg shadow-lg"
            />
            <p>
              Your piece is lovingly packaged in a complimentary soft touch box
              for easy gifting.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "About Jeweltine",
      description: (
        <div className="mt-2 p-4 text-gray-700 bg-white border border-gray-200 rounded-md shadow-sm flex flex-col justify-center items-center gap-4">
          <div className="max-w-xl flex flex-col justify-center items-center gap-4">
            <p>
              At Jeweltine, we are dedicated to creating beautiful, high-quality
              personalized jewelry that adds a unique touch to your style. Our
              mission is to offer custom-made pieces that reflect your
              individual taste and make every moment memorable. From elegant
              necklaces to stunning bracelets, each piece is carefully crafted
              with precision and attention to detail.
            </p>
            <Image
              src={
                "https://prod-rendering-engine.s3.amazonaws.com/transformation-13981-f4aea58b-aa9e-4eab-9bca-bc211ce30624.jpeg"
              }
              alt={`Product Image 3`}
              width={400}
              height={400}
              // unoptimized
              loading="eager"
              className="w-400 h-auto rounded-lg shadow-lg"
            />
            <p>
              We believe that jewelry is not just an accessory—it&lsquo;s a
              reflection of your story, your personality, and your milestones.
              Whether you&lsquo;re celebrating a special occasion or looking for
              a timeless gift, Jeweltine is here to help you find the perfect
              piece that speaks to your heart.
            </p>
            <Image
              src={
                "https://prod-rendering-engine.s3.amazonaws.com/transformation-13978-012a0dfb-a6c6-47e9-9787-644182e8a6d2.jpeg"
              }
              alt={`Product Image 4`}
              width={400}
              height={400}
              // unoptimized
              loading="eager"
              className="w-400 h-auto rounded-lg shadow-lg"
            />
            <p>
              We take pride in offering exceptional customer service, ensuring
              your experience with us is seamless and enjoyable. Your
              satisfaction is our top priority, and we are committed to
              delivering jewelry that exceeds your expectations. Thank
              you for choosing Jeweltine to be a part of your journey.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Shipping & Return",
      description: (
        <div className="mt-2 p-4 text-gray-700 bg-white border border-gray-200 rounded-md shadow-sm flex flex-col justify-center items-center gap-4">
          <div className="max-w-xl flex flex-col justify-center items-center gap-4">
            <h3>1: Production (1 Day):</h3>
            <p>
              Once your order is placed, our team will get to work right
              away.
              The Production process typically takes 1
              day, depending on the complexity of the product.
            </p>
            <p>
              Once the design is complete, we move into production, which
              typically takes 1 day.
            </p>
            <Image
              src={
                "https://prod-rendering-engine.s3.amazonaws.com/transformation-13750-88cb5f3e-7bf9-4b8a-ac5f-9b1a43979149.jpeg"
              }
              alt={`Product Image 1`}
              width={400}
              height={400}
              // unoptimized
              loading="eager"
              className="w-400 h-auto rounded-lg shadow-lg"
            />
            <h3>2: Shipping (2-5 Days or Faster):</h3>
            <p>
              Once production is complete, your product is carefully packaged
              and shipped.
            </p>
            <Image
              src={
                "https://prod-rendering-engine.s3.amazonaws.com/transformation-1732-dbd0e1d3-c2d8-40ec-9b1d-579a05d52baa.jpeg"
              }
              alt={`Product Image 1`}
              width={400}
              height={400}
              // unoptimized
              loading="eager"
              className="w-400 h-auto rounded-lg shadow-lg"
            />
            <h3 className="mt-10">Return & Refund:</h3>
            <p> Our return and refund policy applies only in cases where there is a fault with the necklace or the packaging box. If you receive a defective or damaged product, please contact us within 1 day of receiving your order, and we will gladly provide a replacement or issue a refund if the replacement is not possible. </p>
            <p> Please note that returns or refunds are not accepted for reasons such as change of mind or personal preference. The necklace must be returned in its original condition and packaging for a refund to be processed. Thank you for your understanding and support!</p>
          </div>
        </div>
      ),
    },
    {
      title: "Satisfaction Guarantee",
      description: (
        <div className="mt-2 p-4 text-gray-700 bg-white border border-gray-200 rounded-md shadow-sm flex flex-col justify-center items-center gap-4">
          <div className="max-w-xl flex flex-col justify-center items-center gap-4">
            <p>
              We want you to be completely satisfied with your purchase. Our
              customer support is available 24/7, 365 days a year. If you need
              any assistance, please reach out to us at contact.jeweltine@gmail.com.
            </p>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="flex flex-col gap-8">
      {items.map((item, index) => (
        <Dropdown
          key={index}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default ProductDescription;
