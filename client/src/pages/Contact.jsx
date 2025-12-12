import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../api/contact";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isError, setIsError] = useState("");

  const { isPending, mutate } = useMutation({
    mutationFn: () => sendMessage(formData),
    onSuccess: () => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setSubmitted(true);
    },
    onError: (error) => {
      setIsError(error?.response?.data?.error || "something went wrong");
      setTimeout(() => {
        setIsError("");
      }, 10000);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
      <main className="min-h-screen bg-white cursor-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgOCA4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxjaXJjbGUgY3g9IjQiIGN5PSI0IiByPSIyIiBmaWxsPSIjMEIwQjBCIi8+PC9zdmc+'),_pointer]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-5 lg:pr-12">
              <div className="sticky top-24">
                <h1 className="text-[72px] font-black leading-[0.9] tracking-tight text-[#0A0A0A] mb-8">
                  Let's
                  <br />
                  Connect
                </h1>
                <p className="text-[18px] font-light leading-relaxed text-[#0A0A0A]/80 mb-12">
                  Have questions about antique pieces or the auction process?
                  We're here to help preserve history and connect you with timeless treasures.
                </p>

                <div className="relative w-32 h-32">
                  <div className="absolute top-0 left-0 w-24 h-24 border-2 border-[#8B5CF6] rotate-12"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#FFE5D9]"></div>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7">
              <div className="relative">
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-2xl"></div>

                <div className="relative p-12">
                  {submitted ? (
                      <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#F5F0E8] mb-8 transform transition-transform duration-500 hover:scale-105">
                          <svg
                              className="h-12 w-12 text-[#8B5CF6]"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1.5}
                          >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <h2 className="text-4xl font-black text-[#0A0A0A] mb-4">
                          Message Sent
                        </h2>
                        <p className="text-[18px] font-light leading-relaxed text-[#0A0A0A]/70 mb-8">
                          We'll get back to you within 24 hours.
                          Your inquiry helps us preserve history's most precious stories.
                        </p>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="group relative px-8 py-4 text-[#0A0A0A] font-medium transition-all duration-300 hover:translate-y-[-2px]"
                        >
                          <span className="relative z-10">Send Another Message</span>
                          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#8B5CF6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                        </button>
                      </div>
                  ) : (
                      <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-black uppercase tracking-wider text-[#0A0A0A]/60 mb-3"
                            >
                              Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-0 py-4 bg-transparent border-0 border-b border-[#0A0A0A]/10 focus:outline-none focus:border-[#8B5CF6] text-[18px] font-light placeholder:text-[#0A0A0A]/30 transition-all duration-300 hover:border-[#0A0A0A]/30"
                                placeholder="Your full name"
                            />
                          </div>

                          <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-black uppercase tracking-wider text-[#0A0A0A]/60 mb-3"
                            >
                              Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-0 py-4 bg-transparent border-0 border-b border-[#0A0A0A]/10 focus:outline-none focus:border-[#8B5CF6] text-[18px] font-light placeholder:text-[#0A0A0A]/30 transition-all duration-300 hover:border-[#0A0A0A]/30"
                                placeholder="your.email@example.com"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                              htmlFor="subject"
                              className="block text-sm font-black uppercase tracking-wider text-[#0A0A0A]/60 mb-3"
                          >
                            Subject
                          </label>
                          <input
                              type="text"
                              id="subject"
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              required
                              className="w-full px-0 py-4 bg-transparent border-0 border-b border-[#0A0A0A]/10 focus:outline-none focus:border-[#8B5CF6] text-[18px] font-light placeholder:text-[#0A0A0A]/30 transition-all duration-300 hover:border-[#0A0A0A]/30"
                              placeholder="What would you like to discuss?"
                          />
                        </div>

                        <div>
                          <label
                              htmlFor="message"
                              className="block text-sm font-black uppercase tracking-wider text-[#0A0A0A]/60 mb-3"
                          >
                            Message
                          </label>
                          <textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              required
                              rows={6}
                              className="w-full px-0 py-4 bg-transparent border-0 border-b border-[#0A0A0A]/10 focus:outline-none focus:border-[#8B5CF6] text-[18px] font-light placeholder:text-[#0A0A0A]/30 resize-none transition-all duration-300 hover:border-[#0A0A0A]/30"
                              placeholder="Tell us about your antique inquiries or share your story..."
                          ></textarea>
                        </div>

                        {isError && (
                            <div className="px-6 py-4 bg-[#FFE5D9] border-l-4 border-[#FF6B6B] text-[#0A0A0A] animate-pulse">
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-[#FF6B6B] rounded-full mr-3"></div>
                                {isError}
                              </div>
                            </div>
                        )}

                        <div className="flex justify-end pt-8">
                          <button
                              type="submit"
                              disabled={isPending}
                              className="group relative px-12 py-5 bg-[#0A0A0A] text-white rounded-full overflow-hidden transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                        <span className="relative z-10 flex items-center text-lg font-medium">
                          {isPending ? (
                              <>
                                <span className="animate-spin mr-3">⟳</span>
                                Sending...
                              </>
                          ) : (
                              <>
                                Send Message
                                <FiSend className="h-5 w-5 ml-3 transform group-hover:translate-x-2 transition-transform duration-300" />
                              </>
                          )}
                        </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] to-[#FFE5D9] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          </button>
                        </div>
                      </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed top-1/4 right-12 w-64 h-64 bg-[#F5F0E8] rounded-full mix-blend-multiply opacity-10 blur-3xl animate-pulse"></div>
        <div className="fixed bottom-1/3 left-8 w-48 h-48 bg-[#8B5CF6] rounded-full mix-blend-multiply opacity-5 blur-3xl"></div>
      </main>
  );
};