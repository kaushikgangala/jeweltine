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
              it's a memorable anniversary or a special birthday, make sure to
              dazzle your special someone by gifting them this stunning
              necklace.
            </p>
            <Image
              src={
                "https://jeweltine.s3.us-east-1.amazonaws.com/misc/description_image_5.jpg"
              }
              alt={`Product Image 1`}
              width={400}
              height={400}
              // unoptimized
              loading="eager"
              className="w-400 h-auto rounded-lg shadow-lg"
            />
            <p>
              High quality polished surgical steel and rose gold finish or 18k
              yellow gold finish Pendant dimensions: 0.6" (1.5cm) height / 1.1"
              (2.8cm) width Adjustable length: 18" - 22" (45.72 cm - 55.88 cm)
              Lobster clasp
            </p>
            <Image
              src={
                "https://jeweltine.s3.us-east-1.amazonaws.com/misc/description_image_6.jpg"
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
              for easy gifting. Elevate your presentation by upgrading to the
              mahogany style luxury box, which features a brilliant LED
              spotlight.
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
                "https://jeweltine.s3.us-east-1.amazonaws.com/misc/description_image_3.jpeg"
              }
              alt={`Product Image 3`}
              width={400}
              height={400}
              // unoptimized
              loading="eager"
              className="w-400 h-auto rounded-lg shadow-lg"
            />
            <p>
              We believe that jewelry is not just an accessory—it's a reflection
              of your story, your personality, and your milestones. Whether
              you're celebrating a special occasion or looking for a timeless
              gift, Jeweltine is here to help you find the perfect piece that
              speaks to your heart.
            </p>
            <Image
              src={
                "https://jeweltine.s3.us-east-1.amazonaws.com/misc/description_image_4.png"
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
              delivering custom jewelry that exceeds your expectations. Thank
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
            <h3>1: Design & Production (1 Day):</h3>
            <p>
              Once your order is placed, our design team will get to work right
              away. (Note: To ensure the efficiency of production and shipping,
              please verify that your customized details are accurate.) We'll
              begin designing and customizing your order as soon as it's
              confirmed. The customization process typically takes 1 day,
              depending on the complexity of the product.
            </p>
            <p>
              Once the design is complete, we move into production, which
              typically takes 1 day.
            </p>
            <Image
              src={
                "https://jeweltine.s3.us-east-1.amazonaws.com/misc/description_image_1.jpg"
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
              and shipped. We’ll do our best to customize your order as quickly
              and as efficiently as possible!
            </p>
            <Image
              src={
                "https://jeweltine.s3.us-east-1.amazonaws.com/misc/description_image_2.jpg"
              }
              alt={`Product Image 1`}
              width={400}
              height={400}
              // unoptimized
              loading="eager"
              className="w-400 h-auto rounded-lg shadow-lg"
            />
            <h3>Return & Refund:</h3>
            <p>
              Custom orders are non-returnable and non-exchangeable due to their
              personalized nature. Once an order is placed, we begin the
              customization process right away. As a result, we are unable to
              accommodate changes to the customized details, such as size or
              color, after the order is confirmed.
            </p>
            <p>
              If there is an error on our part, we will promptly correct the
              issue and send you a replacement product. However, we are unable
              to offer refunds in this case. Please understand that customized
              products are unique to you and cannot be resold. We appreciate
              your understanding!
            </p>
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
              any assistance, please reach out to us at jeweltine@gmail.com.
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
