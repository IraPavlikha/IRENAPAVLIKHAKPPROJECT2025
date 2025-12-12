import { FaClock, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router";

export const Auction = () => {
  return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-black">
              Live Auctions
            </h2>
            <Link
                to="/signup"
                className="text-indigo-500 hover:text-indigo-600 flex items-center font-medium transition-colors"
            >
              View all <FaChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: "Vintage Film Camera - Excellent Condition",
                img: "https://res.cloudinary.com/dhv8qx1qy/image/upload/v1750644725/miekytfqgwnlj4jqai5k.png",
                bid: "$245.00",
                bids: 12,
                time: "2h 15m",
              },
              {
                title: "Luxury Swiss Watch - Gold Plated",
                img: "https://res.cloudinary.com/dhv8qx1qy/image/upload/v1750644637/lk7l3ar3sptniptieyo3.png",
                bid: "$1,250.00",
                bids: 28,
                time: "5h 42m",
              },
              {
                title: "Original Oil Painting - Abstract Art",
                img: "https://res.cloudinary.com/dhv8qx1qy/image/upload/v1750644675/tatznfsoekfp3vsoeswd.png",
                bid: "$890.00",
                bids: 7,
                time: "1d 3h",
              },
            ].map((item, index) => (
                <div
                    key={index}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="relative">
                    <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-64 object-contain transition-transform duration-500 group-hover:scale-105"
                        style={{ filter: "blur(0px)" }}
                    />
                    <div className="absolute top-3 right-3 text-black/70 px-3 py-1 rounded-full text-xs font-semibold bg-white/50 backdrop-blur-sm flex items-center">
                      <FaClock className="inline h-3 w-3 mr-1" />
                      {item.time}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col justify-between h-[250px]">
                    <h3 className="font-serif font-light text-lg text-black mb-4 line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-sm text-gray-400">Current Bid</p>
                        <p className="text-xl font-extrabold text-black">{item.bid}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Bids</p>
                        <p className="text-sm font-medium text-black">{item.bids}</p>
                      </div>
                    </div>
                    <Link to="/signup">
                      <button className="w-full py-3 px-6 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition-all shadow-sm hover:shadow-md">
                        Place Bid
                      </button>
                    </Link>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
};
