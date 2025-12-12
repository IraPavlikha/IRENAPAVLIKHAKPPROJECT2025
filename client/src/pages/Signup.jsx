import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../store/auth/authSlice";
import { Link } from "react-router";
import LoadingScreen from "../components/LoadingScreen";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isError, setIsError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signup(formData)).unwrap();
      navigate("/");
    } catch (error) {
      setIsError(error || "Something went wrong");
      setTimeout(() => setIsError(""), 10000);
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  if (loading) return <LoadingScreen />;

  return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12 font-serif">
        <div className="relative w-full max-w-md">
          <div className="backdrop-blur-md bg-[rgba(255,240,232,0.6)] p-10 rounded-2xl shadow-2xl border border-[rgba(255,255,255,0.2)]">
            <h1 className="text-5xl font-extrabold text-[#0A0A0A] mb-10 text-center tracking-tight">
              Create Account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col">
                <label className="mb-2 text-[#0A0A0A] font-semibold text-sm">Full Name</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    required
                    className="px-4 py-3 rounded-xl border border-[#F5F0E8] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] text-[#0A0A0A] placeholder-[#AAA]"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 text-[#0A0A0A] font-semibold text-sm">Email</label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    required
                    className="px-4 py-3 rounded-xl border border-[#F5F0E8] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] text-[#0A0A0A] placeholder-[#AAA]"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 text-[#0A0A0A] font-semibold text-sm">Password</label>
                <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    required
                    minLength={8}
                    className="px-4 py-3 rounded-xl border border-[#F5F0E8] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] text-[#0A0A0A] placeholder-[#AAA]"
                />
                <p className="mt-1 text-xs text-[#0A0A0A]/50">
                  At least 8 characters
                </p>
              </div>

              {isError && (
                  <div className="bg-[#FFE5D9]/30 border border-[#FFB3A7] text-[#8B5CF6] px-4 py-3 rounded-lg">
                    {isError}
                  </div>
              )}

              <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 rounded-xl bg-[#8B5CF6] text-white font-bold text-lg hover:translate-y-[-2px] transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Sign Up"}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-[#0A0A0A]/70">
              Already have an account?{" "}
              <Link to="/login" className="text-[#8B5CF6] font-bold hover:underline">
                Login
              </Link>
            </div>
          </div>

          <div className="absolute -top-16 -left-16 w-32 h-32 bg-[#FFE5D9] rounded-full opacity-50 pointer-events-none"></div>
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-[#F5F0E8] rounded-3xl opacity-50 pointer-events-none"></div>
        </div>
      </div>
  );
};

export default Signup;
