// app/footer.js
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      className=" text-white py-2 mt-12 px-6"
      style={{ backgroundColor: "#ff0084" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm font-medium" style={{ color: "white" }}>
          <Image
            src="/jeweltine_logo.png" // Change this to your image path
            alt="Special Tree Image"
            width={120} // Adjust image size if necessary
            height={120}
            className="m-auto pt-1 pb-2"
          />
        </div>
        Copyright &copy; {new Date().getFullYear()} Jeweltine. All rights
        reserved.
        <div className="space-x-4 flex flex-col md:flex-row gap-2  pb-2">
          <Link href="/terms" className="text-sm ">
            Terms & Conditions
          </Link>
          <Link href="/contact" className="text-sm ">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
