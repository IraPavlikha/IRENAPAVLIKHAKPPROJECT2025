import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../api/user";
import { CiMail, CiUser, CiLock, CiCamera } from "react-icons/ci";
import { useSelector } from "react-redux";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [isError, setIsError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () => changePassword(formData),
    onSuccess: () => {
      setSuccessMessage("Password Changed Successfully");
      setTimeout(() => setSuccessMessage(""), 10000);
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    },
    onError: (error) => {
      setIsError(error?.response?.data?.error);
      setTimeout(() => setIsError(""), 10000);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;
    if (!currentPassword || !newPassword || !confirmPassword) {
      setIsError("Please enter all fields");
      setTimeout(() => setIsError(""), 10000);
      return;
    }
    if (newPassword !== confirmPassword) {
      setIsError("New password and confirm password do not match.");
      setTimeout(() => setIsError(""), 10000);
      return;
    }
    mutate(formData);
  };

  return (
      <div className="min-h-screen bg-[#FFFFFF] font-serif text-[#0A0A0A]">
        <div className="max-w-5xl mx-auto p-8">

          <div className="bg-[#F5F0E8]/60 backdrop-blur-md rounded-3xl shadow-lg overflow-hidden p-8 grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center md:items-start">
              <div className="relative mb-6">
                <img
                    src={user.user.avatar}
                    alt="User avatar"
                    className="h-32 w-32 rounded-full object-cover shadow-xl"
                />
                <button className="absolute bottom-0 right-0 bg-[#FFE5D9] p-2 rounded-full shadow-md hover:scale-110 transition-transform">
                  <CiCamera className="h-5 w-5 text-[#8B5CF6]" />
                </button>
              </div>
              <h3 className="text-2xl font-extrabold">{user.user.name}</h3>
              <p className="text-lg text-[#8B5CF6]">{user.user.email}</p>
            </div>

            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h4 className="text-xl font-extrabold mb-4">Особиста інформація</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <CiUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#8B5CF6]" />
                      <input
                          type="text"
                          value={user.user.name}
                          disabled
                          className="w-full pl-12 py-3 rounded-xl border border-[#FFE5D9] focus:ring-1 focus:ring-[#8B5CF6] placeholder-gray-400 text-[#0A0A0A]"
                          placeholder="Full Name"
                      />
                    </div>
                    <div className="relative">
                      <CiMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#8B5CF6]" />
                      <input
                          type="email"
                          value={user.user.email}
                          disabled
                          className="w-full pl-12 py-3 rounded-xl border border-[#FFE5D9] focus:ring-1 focus:ring-[#8B5CF6] placeholder-gray-400 text-[#0A0A0A]"
                          placeholder="Email Address"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-extrabold mb-4">Змінити пароль</h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    {["currentPassword", "newPassword", "confirmPassword"].map((field, idx) => (
                        <div key={idx} className="relative">
                          <CiLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#8B5CF6]" />
                          <input
                              type="password"
                              name={field}
                              value={formData[field]}
                              onChange={handleChange}
                              className="w-full pl-12 py-3 rounded-xl border border-[#FFE5D9] focus:ring-1 focus:ring-[#8B5CF6] placeholder-gray-400 text-[#0A0A0A]"
                              placeholder={
                                field === "currentPassword"
                                    ? "Поточний пароль"
                                    : field === "newPassword"
                                        ? "Новий пароль"
                                        : "Підтвердити новий"
                              }
                          />
                        </div>
                    ))}
                  </div>

                  {isError && (
                      <p className="mt-3 text-red-600 font-bold">{isError}</p>
                  )}
                  {successMessage && (
                      <p className="mt-3 text-green-600 font-bold">{successMessage}</p>
                  )}
                </div>

                <div className="flex justify-end gap-4">
                  <button
                      type="submit"
                      disabled={isPending}
                      className="px-6 py-3 bg-[#8B5CF6] text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPending ? "Збереження..." : "Зберегти зміни"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}
