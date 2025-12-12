import { useRef } from "react";
import { useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { placeBid, viewAuction } from "../api/auction.js";
import { useSelector } from "react-redux";
import LoadingScreen from "../components/LoadingScreen.jsx";

export const ViewAuction = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();
  const inputRef = useRef();

  const { data, isLoading } = useQuery({
    queryKey: ["viewAuctions", id],
    queryFn: () => viewAuction(id),
    staleTime: 30 * 1000,
    placeholderData: () => undefined,
  });

  const placeBidMutate = useMutation({
    mutationFn: ({ bidAmount, id }) => placeBid({ bidAmount, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["viewAuctions"] });
      if (inputRef.current) inputRef.current.value = "";
    },
    onError: (error) => console.log("Error: ", error.message),
  });

  if (isLoading) return <LoadingScreen />;

  const handleBidSubmit = (e) => {
    e.preventDefault();
    let bidAmount = e.target.bidAmount.value.trim();
    placeBidMutate.mutate({ bidAmount, id });
  };

  const daysLeft = Math.ceil(
      Math.max(0, new Date(data.itemEndDate) - new Date()) / (1000 * 60 * 60 * 24)
  );
  const isActive = Math.max(0, new Date(data.itemEndDate) - new Date()) > 0;

  return (
      <div className="min-h-screen bg-white text-black font-serif">
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="relative">
              <div className="aspect-square rounded-xl overflow-hidden shadow-xl bg-[#F5F0E8] hover:scale-[1.02] transition-transform duration-300">
                <img
                    src={data.itemPhoto || "https://picsum.photos/601"}
                    alt={data.itemName}
                    className="w-full h-full object-cover blur-[0.5px]"
                />
              </div>

              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#FFE5D9] rounded-lg opacity-50"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-[#8B5CF6] rounded-xl opacity-30"></div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                <span className="bg-[#F5F0E8] text-[#0A0A0A] px-3 py-1 rounded-full text-sm font-semibold">
                  {data.itemCategory}
                </span>
                  <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                      }`}
                  >
                  {isActive ? "Active" : "Ended"}
                </span>
                </div>

                <h1 className="text-[72px] font-extrabold leading-tight">
                  {data.itemName}
                </h1>

                <p className="text-lg leading-relaxed text-gray-800">
                  {data.itemDescription}
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20 grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-light text-gray-600">Starting Price</p>
                  <p className="text-2xl font-bold">${data.startingPrice}</p>
                </div>
                <div>
                  <p className="text-sm font-light text-gray-600">Current Price</p>
                  <p className="text-3xl font-extrabold text-[#8B5CF6]">
                    ${data.currentPrice}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-light text-gray-600">Total Bids</p>
                  <p className="text-xl font-semibold">{data.bids.length}</p>
                </div>
                <div>
                  <p className="text-sm font-light text-gray-600">Time Left</p>
                  <p
                      className={`text-lg font-semibold ${
                          isActive ? "text-red-600" : "text-gray-400"
                      }`}
                  >
                    {isActive ? `${daysLeft} days` : "Ended"}
                  </p>
                </div>
              </div>

              {data.seller._id != user.user._id && isActive && (
                  <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20">
                    <h3 className="text-xl font-extrabold mb-4">Place Your Bid</h3>
                    <form onSubmit={handleBidSubmit} className="space-y-4">
                      <div>
                        <label
                            htmlFor="bidAmount"
                            className="block text-sm font-semibold mb-1 text-gray-800"
                        >
                          Bid Amount (min: ${data.currentPrice + 1}, max: $
                          {data.currentPrice + 10})
                        </label>
                        <input
                            type="number"
                            name="bidAmount"
                            id="bidAmount"
                            ref={inputRef}
                            min={data.currentPrice + 1}
                            max={data.currentPrice + 10}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                            placeholder="Enter your bid amount"
                            required
                        />
                      </div>
                      <button
                          type="submit"
                          className="w-full py-3 bg-[#8B5CF6] text-white rounded-lg font-bold hover:scale-[1.02] transition-transform"
                      >
                        Place Bid
                      </button>
                    </form>
                  </div>
              )}

              <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20">
                <h3 className="text-xl font-extrabold mb-2">Seller Information</h3>
                <p className="text-gray-900 font-semibold">{data.seller.name}</p>
              </div>
            </div>
          </div>

          <div className="mt-16 space-y-6">
            <h2 className="text-4xl font-extrabold text-[#0A0A0A]">
              Bid History
            </h2>
            <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              {data.bids.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No bids yet. Be the first to bid!
                  </div>
              ) : (
                  <div className="divide-y divide-gray-200">
                    {data.bids.map((bid, index) => (
                        <div
                            key={index}
                            className="p-4 flex justify-between items-center hover:bg-[#F5F0E8]/50 transition-colors"
                        >
                          <div>
                            <p className="font-semibold">{bid.bidder?.name}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(bid.bidTime).toLocaleDateString()} at{" "}
                              {new Date(bid.bidTime).toLocaleTimeString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-extrabold text-[#8B5CF6]">
                              ${bid.bidAmount}
                            </p>
                          </div>
                        </div>
                    ))}
                  </div>
              )}
            </div>
          </div>
        </main>
      </div>
  );
};
