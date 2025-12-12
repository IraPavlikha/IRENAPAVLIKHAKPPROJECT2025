import AuctionCard from "../components/AuctionCard.jsx";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { dashboardStats } from "../api/auction.js";
import LoadingScreen from "../components/LoadingScreen.jsx";

const Dashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: () => dashboardStats(),
    staleTime: 30 * 1000,
  });

  if (isLoading) return <LoadingScreen />;

  return (
      <div className="bg-white min-h-screen text-[#0A0A0A]">
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-[#F5F0E8]/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#F5F0E8] transition-transform hover:-translate-y-1">
              <h3 className="text-sm font-semibold text-gray-500">Total Auctions</h3>
              <p className="text-3xl font-extrabold mt-2">{data.totalAuctions}</p>
            </div>
            <div className="bg-[#F5F0E8]/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#F5F0E8] transition-transform hover:-translate-y-1">
              <h3 className="text-sm font-semibold text-gray-500">Active Auctions</h3>
              <p className="text-3xl font-extrabold mt-2 text-[#8B5CF6]">{data.activeAuctions}</p>
            </div>
            <div className="bg-[#F5F0E8]/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#F5F0E8] transition-transform hover:-translate-y-1">
              <h3 className="text-sm font-semibold text-gray-500">Your Auctions</h3>
              <p className="text-3xl font-extrabold mt-2 text-[#FFE5D9]">{data.userAuctionCount}</p>
            </div>
          </div>

          <div className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-[48px] font-extrabold tracking-tight">All Auctions</h2>
              <Link
                  to="/auction"
                  className="text-[#8B5CF6] font-medium text-sm hover:underline transition-colors"
              >
                View More
              </Link>
            </div>

            {data.latestAuctions.length === 0 ? (
                <div className="text-center py-20 bg-[#F5F0E8]/30 rounded-2xl shadow-lg border border-[#F5F0E8]">
                  <p className="text-gray-500 text-lg">No auctions available at the moment.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
                  {data.latestAuctions.map((auction) => (
                      <AuctionCard
                          key={auction._id}
                          auction={auction}
                          className="transition-transform hover:-translate-y-1"
                      />
                  ))}
                </div>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-[48px] font-extrabold tracking-tight">Your Auctions</h2>
              <Link
                  to="/myauction"
                  className="text-[#8B5CF6] font-medium text-sm hover:underline transition-colors"
              >
                View More
              </Link>
            </div>

            {data.latestUserAuctions.length === 0 ? (
                <div className="text-center py-20 bg-[#F5F0E8]/30 rounded-2xl shadow-lg border border-[#F5F0E8]">
                  <p className="text-gray-500 text-lg">You haven't created any auctions yet.</p>
                  <Link to="/create">
                    <button className="mt-6 px-8 py-3 rounded-2xl font-bold bg-[#8B5CF6] text-white hover:bg-[#7C3AED] transition-colors">
                      Create Your First Auction
                    </button>
                  </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
                  {data.latestUserAuctions.map((auction) => (
                      <AuctionCard
                          key={auction._id}
                          auction={auction}
                          className="transition-transform hover:-translate-y-1"
                      />
                  ))}
                </div>
            )}
          </div>
        </main>
      </div>
  );
};

export default Dashboard;
