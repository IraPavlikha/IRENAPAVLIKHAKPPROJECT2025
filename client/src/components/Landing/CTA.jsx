import React from "react";
import { Link } from "react-router";

export const CTA = () => {
  return (
      <section className="relative py-24 md:py-32 bg-[#FFFFFF] overflow-hidden">
        <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-[#FFE5D9] rounded-full opacity-30 pointer-events-none"></div>
        <div className="absolute bottom-[-80px] right-[-80px] w-72 h-72 bg-[#F5F0E8] rounded-full opacity-40 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-[64px] font-extrabold text-[#0A0A0A] leading-tight mb-6">
            Почніть свою подорож у світі антикваріату
          </h2>
          <p className="text-lg md:text-xl font-serif text-[#0A0A0A] opacity-80 mb-10 leading-[1.8] max-w-2xl mx-auto">
            Приєднуйтесь до нашої спільноти та відкрийте для себе унікальні лоти або
            продайте свої речі з вигодою. Все швидко, просто і без зайвих клопотів.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/auction">
              <div className="relative bg-[#8B5CF6] text-white px-10 py-4 rounded-md font-extrabold text-lg cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                Переглянути аукціони
                <span className="absolute top-0 left-0 w-full h-full rounded-md opacity-0 hover:opacity-20 bg-gradient-to-r from-white via-white/30 to-white/0 transition-opacity duration-500 pointer-events-none"></span>
              </div>
            </Link>
          </div>
        </div>
      </section>
  );
};
