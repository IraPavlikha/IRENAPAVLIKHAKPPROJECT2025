import { useState } from "react";
import AuctionCard from "../components/AuctionCard";
import { useQuery } from "@tanstack/react-query";
import { getAuctions } from "../api/auction";
import LoadingScreen from "../components/LoadingScreen";

export const AuctionList = () => {
  const [filter, setFilter] = useState("all");
  const { data, isLoading } = useQuery({
    queryKey: ["allAuction"],
    queryFn: getAuctions,
    staleTime: 30 * 1000,
  });

  if (isLoading) return <LoadingScreen />;

  const categories = [
    "all",
    ...new Set(data?.map((auction) => auction.itemCategory)),
  ];
  const filteredAuctions =
      filter === "all"
          ? data
          : data?.filter((auction) => auction.itemCategory === filter);

  return (
      <div className="min-h-screen bg-[#FFFFFF] text-[#0A0A0A]">
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-12 backdrop-blur-md bg-white/30 rounded-xl p-6 flex flex-wrap gap-3 shadow-md">
            <h2 className="w-full text-2xl md:text-3xl font-serif font-semibold mb-4">
              Категорії
            </h2>
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                        filter === category
                            ? "bg-[#8B5CF6] text-white shadow-lg"
                            : "bg-[#F5F0E8] text-[#0A0A0A] hover:bg-[#FFE5D9]"
                    }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
            ))}
          </div>

          <div className="mb-10">
            <h2 className="text-4xl md:text-5xl font-sans font-extrabold mb-2">
              {filter === "all" ? "Всі аукціони" : `${filter} Аукціони`}
            </h2>
            <span className="text-lg font-serif text-gray-500">
            ({filteredAuctions.length} предметів)
          </span>
          </div>

          {filteredAuctions.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg font-serif text-gray-400">
                  Аукціони в цій категорії відсутні.
                </p>
              </div>
          ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-8 auto-rows-fr">
                {filteredAuctions.map((auction) => (
                    <div
                        key={auction._id}
                        className="transition-transform duration-300 hover:-translate-y-1"
                    >
                      <AuctionCard auction={auction} />
                    </div>
                ))}
              </div>
          )}
        </main>
      </div>
  );
};
