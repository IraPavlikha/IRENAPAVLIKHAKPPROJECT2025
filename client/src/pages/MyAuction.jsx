import { useState } from "react";
import AuctionCard from "../components/AuctionCard";
import { useQuery } from "@tanstack/react-query";
import { getMyAuctions } from "../api/auction";
import LoadingScreen from "../components/LoadingScreen";

export const MyAuction = () => {
  const [filter, setFilter] = useState("all");
  const { data, isLoading } = useQuery({
    queryKey: ["myauctions"],
    queryFn: getMyAuctions,
    staleTime: 30 * 1000,
  });

  if (isLoading) return <LoadingScreen />;

  const categories = ["all", ...new Set(data?.map((a) => a.itemCategory))];
  const filteredAuctions =
      filter === "all"
          ? data
          : data?.filter((a) => a.itemCategory === filter);

  return (
      <div className="min-h-screen bg-white text-black">
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-6">Категорії</h2>
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                  <button
                      key={category}
                      onClick={() => setFilter(category)}
                      className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300
                  ${
                          filter === category
                              ? "bg-[#8B5CF6] text-white shadow-lg"
                              : "bg-[#F5F0E8] text-[#0A0A0A] hover:bg-[#FFE5D9] hover:scale-105"
                      }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
              ))}
            </div>
          </div>

          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl md:text-4xl font-extrabold">
              {filter === "all" ? "Мої аукціони" : `${filter} Аукціони`}
              <span className="text-sm font-light text-gray-500 ml-3">
              ({filteredAuctions.length})
            </span>
            </h2>
          </div>

          {filteredAuctions.length === 0 ? (
              <div className="text-center py-20 text-gray-400 text-lg">
                Немає аукціонів у цій категорії.
              </div>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 auto-rows-fr">
                {filteredAuctions.map((auction) => (
                    <div
                        key={auction._id}
                        className="transition-transform duration-300 hover:-translate-y-1"
                    >
                      <AuctionCard
                          auction={auction}
                          className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl"
                          style={{
                            borderRadius: "24px",
                            backdropFilter: "blur(12px)",
                            backgroundColor: "rgba(255, 245, 233, 0.7)",
                          }}
                      />
                    </div>
                ))}
              </div>
          )}
        </main>
      </div>
  );
};
