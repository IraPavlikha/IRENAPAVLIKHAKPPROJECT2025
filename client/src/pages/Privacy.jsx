import { useState } from "react";
import { Link } from "react-router";
import {
  CiCalendar,
  CiGlobe,
  CiMapPin,
  CiServer,
  CiMonitor,
} from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import { loginHistory } from "../api/user";
import LoadingScreen from "../components/LoadingScreen";
import clsx from "clsx";

export default function Privacy() {
  const { data, isLoading } = useQuery({
    queryFn: loginHistory,
    queryKey: ["userLogins"],
    staleTime: 60 * 1000 * 5,
  });

  if (isLoading) return <LoadingScreen />;

  return (
      <div className="min-h-screen bg-white text-[#0A0A0A] font-serif">
        <main className="p-6 lg:p-12 max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-[48px] lg:text-[72px] font-[900] leading-tight mb-4">
              Privacy & Security
            </h1>
            <p className="text-lg text-gray-600">
              Перегляньте історію входів та налаштування безпеки вашого акаунта
            </p>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-[700] mb-6">Login History</h2>
            {data && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {data.map((entry) => (
                      <div
                          key={entry.id}
                          className="bg-[#F5F0E8] rounded-2xl p-6 shadow-lg hover:translate-y-[-2px] transition-transform duration-300 cursor-pointer"
                      >
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-2">
                            <CiCalendar className="text-[#8B5CF6] w-6 h-6" />
                            <span className="font-semibold">Date & Time:</span>
                            <span className="text-gray-700">{entry.dateTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CiGlobe className="text-[#8B5CF6] w-6 h-6" />
                            <span className="font-semibold">IP Address:</span>
                            <span className="text-gray-700">{entry.ipAddress}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CiMapPin className="text-[#8B5CF6] w-6 h-6" />
                            <span className="font-semibold">Location:</span>
                            <span className="text-gray-700">{entry.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CiServer className="text-[#8B5CF6] w-6 h-6" />
                            <span className="font-semibold">ISP:</span>
                            <span className="text-gray-700">{entry.isp}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CiMonitor className="text-[#8B5CF6] w-6 h-6" />
                            <span className="font-semibold">Device:</span>
                            <span className="text-gray-700">{entry.device}</span>
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
            )}
          </section>
          <section>
            <h2 className="text-2xl font-[700] mb-6">Security Settings</h2>
            <div className="grid gap-8">
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg flex justify-between items-center hover:translate-y-[-2px] transition-transform duration-300">
                <div>
                  <h3 className="text-lg font-[600] mb-1">Two-Factor Authentication</h3>
                  <p className="text-gray-600">
                    Додайте додатковий рівень безпеки до свого акаунту.
                  </p>
                </div>
                <button
                    disabled
                    className="px-5 py-2 rounded-full bg-[#8B5CF6] text-white font-semibold disabled:opacity-50 cursor-not-allowed"
                >
                  Enable
                </button>
              </div>
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg flex justify-between items-center hover:translate-y-[-2px] transition-transform duration-300">
                <div>
                  <h3 className="text-lg font-[600] mb-1">Password</h3>
                  <p className="text-gray-600">Змініть ваш пароль</p>
                </div>
                <Link
                    to="/profile"
                    className="px-5 py-2 rounded-full border border-[#8B5CF6] text-[#8B5CF6] font-semibold hover:bg-[#8B5CF6]/10 transition"
                >
                  Change
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
  );
}
