import { Link } from "react-router";

export const Footer = () => {
  return (
      <footer className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#0A0A0A]">
              GoldenLot
            </h3>
            <p className="text-[#0A0A0A] text-sm md:text-base mt-2">
              An online antique auction where every piece comes to life
            </p>
          </div>

          <div className="flex space-x-8">
            <Link
                to="/about"
                className="text-[#8B5CF6] hover:text-[#0A0A0A] text-sm transition-all duration-300"
            >
              About
            </Link>
            <Link
                to="/legal"
                className="text-[#8B5CF6] hover:text-[#0A0A0A] text-sm transition-all duration-300"
            >
              Legal
            </Link>
            <Link
                to="/contact"
                className="text-[#8B5CF6] hover:text-[#0A0A0A] text-sm transition-all duration-300"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="border-t border-[#F5F0E8] mt-10 pt-6 text-center">
          <p className="text-[#0A0A0A] text-sm">
            Created 2025 © All rights reserved. Owner: Irena
          </p>
        </div>
      </footer>
  );
};
