import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";

export default function AuctionCard({ auction }) {
  const daysLeft = Math.ceil(auction.timeLeft / (1000 * 60 * 60 * 24));
  const cardRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  // Плавное появление при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => setIsVisible(entry.isIntersecting),
        { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
      <div
          ref={cardRef}
          className={`
        relative bg-white 
        p-6 rounded-xl shadow-lg 
        transform transition-all duration-500
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        cursor-pointer
      `}
          style={{
            border: "none",
            minWidth: "280px",
            maxWidth: "320px",
          }}
      >
        <div className="relative w-full h-64 overflow-hidden rounded-xl">
          <img
              src={auction.itemPhoto || "https://picsum.photos/400"}
              alt={auction.itemName}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 filter blur-[0.5px] hover:blur-0"
              style={{ borderRadius: "16px" }}
          />
          <div
              className="absolute top-4 right-4 px-3 py-1 rounded-lg text-xs font-semibold"
              style={{
                background: "rgba(139,92,246,0.15)", // акцент glassmorphism
                backdropFilter: "blur(10px)",
                color: "#8B5CF6",
              }}
          >
            {auction.itemCategory}
          </div>
        </div>

        <h3
            className="mt-4 mb-2 text-2xl"
            style={{
              fontFamily: "sans-serif",
              fontWeight: 900,
              color: "#0A0A0A",
              fontSize: "36px",
            }}
        >
          {auction.itemName}
        </h3>

        <p
            className="text-gray-700 mb-4"
            style={{
              fontFamily: "serif",
              fontWeight: 300,
              fontSize: "18px",
              lineHeight: 1.8,
              color: "#0A0A0A",
            }}
        >
          {auction.itemDescription}
        </p>

        <div className="space-y-2 mb-5">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Current Price:</span>
            <span className="font-semibold text-lg" style={{ color: "#8B5CF6" }}>
            ${auction.currentPrice || auction.startingPrice}
          </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Bids:</span>
            <span className="text-sm font-medium">{auction.bidsCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Time Left:</span>
            <span className="text-sm font-medium text-red-600">
            {daysLeft > 0 ? `${daysLeft} days` : "Ended"}
          </span>
          </div>
        </div>

        <div
            className="pt-3"
            style={{
              borderTop: "1px solid rgba(0,0,0,0.05)",
            }}
        >
          <p
              className="text-xs mb-3"
              style={{ color: "#0A0A0A", fontFamily: "serif", fontWeight: 300 }}
          >
            Seller: {auction?.sellerName || auction?.seller?.name}
          </p>
          <Link to={`/auction/${auction._id}`}>
            <button
                className="w-full py-2 px-4 rounded-xl font-semibold transition-transform duration-200 hover:-translate-y-1"
                style={{
                  background: "#8B5CF6",
                  color: "#FFFFFF",
                }}
            >
              View Details
            </button>
          </Link>
        </div>
      </div>
  );
}
