import React from "react";
import { Link } from "react-router";

export const Hero = () => {
  return (
      <section className="relative bg-[#FFFFFF] pt-20 pb-32 overflow-visible">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FFE5D9] rounded-full opacity-20 -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F5F0E8] rounded-[50%_20%] opacity-30 -z-10" />

        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center lg:items-start relative">
          <div className="lg:w-1/2 text-left z-10">
            <h1 className="text-[72px] font-[900] leading-[1.1] text-[#0A0A0A] mb-6">
              Антикваріат, що оживає
              <span className="block text-[#8B5CF6]">в нових руках.</span>
            </h1>
            <p className="text-[18px] font-serif leading-[1.8] text-[#0A0A0A] mb-10 max-w-lg">
              Відкривайте унікальні предмети, робіть вигідні пропозиції та знаходьте скарби,
              які знайдуть своє нове життя у світі антикваріату.
            </p>
            <div className="flex gap-6">
              <Link to="/signup">
                <button className="bg-[#8B5CF6] text-white px-10 py-4 rounded-md text-lg font-semibold transition-transform transform hover:-translate-y-1 hover:shadow-lg">
                  Приєднатись
                </button>
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 relative flex justify-end">
            <div className="w-[300px] h-[300px] bg-[#8B5CF6] rounded-full opacity-40 filter transition-all duration-1000 ease-in-out hover:blur-[20px] hover:opacity-15" />
          </div>
        </div>
      </section>
  );
};
