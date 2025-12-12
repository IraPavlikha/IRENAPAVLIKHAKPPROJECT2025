import React from 'react'
import { FaClock, FaGavel, FaShieldAlt } from 'react-icons/fa'

export const Features = () => {
  return (
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[72px] font-[900] text-[#0A0A0A] leading-tight">
              Why Choose Our Platform?
            </h2>
            <p className="mt-4 text-[18px] font-serif text-[#0A0A0A]/70 max-w-3xl mx-auto leading-[1.8]">
              We provide a secure, user-friendly environment for all your
              auction needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="relative p-8 bg-[#F5F0E8] rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
              <div className="w-20 h-20 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaGavel className="text-[#0A0A0A]/50 text-3xl" /> {/* приглушённый цвет */}
              </div>
              <h3 className="text-2xl font-[900] text-[#0A0A0A] mb-3 text-center">
                Easy Bidding
              </h3>
              <p className="text-[18px] font-serif text-[#0A0A0A]/70 leading-[1.8] text-center">
                Place bids with confidence using our intuitive interface. Track
                your bids and get real-time updates on auction status.
              </p>
            </div>

            <div className="relative p-8 bg-[#F5F0E8] rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
              <div className="w-20 h-20 bg-[#FFE5D9]/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaShieldAlt className="text-[#0A0A0A]/50 text-3xl" /> {/* приглушённый цвет */}
              </div>
              <h3 className="text-2xl font-[900] text-[#0A0A0A] mb-3 text-center">
                Secure Transactions
              </h3>
              <p className="text-[18px] font-serif text-[#0A0A0A]/70 leading-[1.8] text-center">
                Your transactions are protected with industry-standard security
                measures. Buy and sell with complete peace of mind.
              </p>
            </div>

            <div className="relative p-8 bg-[#F5F0E8] rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
              <div className="w-20 h-20 bg-[#FFE5D9]/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaClock className="text-[#0A0A0A]/50 text-3xl" /> {/* приглушённый цвет */}
              </div>
              <h3 className="text-2xl font-[900] text-[#0A0A0A] mb-3 text-center">
                24/7 Auctions
              </h3>
              <p className="text-[18px] font-serif text-[#0A0A0A]/70 leading-[1.8] text-center">
                Never miss an opportunity. Our platform runs around the clock,
                so you can bid and sell whenever it's convenient for you.
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}
