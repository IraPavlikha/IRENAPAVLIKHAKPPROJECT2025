import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAuction } from "../api/auction.js";
import { useNavigate } from "react-router";

export const CreateAuction = () => {
  const fileInputRef = useRef();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    itemName: "",
    itemDescription: "",
    itemCategory: "",
    startingPrice: "",
    itemStartDate: "",
    itemEndDate: "",
    itemPhoto: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createAuction,
    onSuccess: (data) => {
      setFormData({
        itemName: "",
        itemDescription: "",
        itemCategory: "",
        startingPrice: "",
        itemStartDate: "",
        itemEndDate: "",
        itemPhoto: "",
      });
      setError("");
      queryClient.invalidateQueries({ queryKey: ["viewAuctions"] });
      queryClient.invalidateQueries({ queryKey: ["allAuction"] });
      queryClient.invalidateQueries({ queryKey: ["myauctions"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      navigate(`/auction/${data.newAuction._id}`);
    },
    onError: (error) =>
        setError(error?.response?.data?.message || "Something went wrong"),
  });

  const categories = [
    "Electronics", "Antiques", "Art", "Books", "Clothing", "Collectibles",
    "Home & Garden", "Jewelry", "Musical Instruments", "Sports", "Toys", "Vehicles", "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (!file.type.startsWith("image/")) return alert("Only image files are allowed.");
      if (fileSizeMB > 5) return setError("File size must be less than 5 MB.");
      setFormData((prev) => ({ ...prev, itemPhoto: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.itemPhoto) return setError("Please upload an image.");
    const start = new Date(formData.itemStartDate);
    const end = new Date(formData.itemEndDate);
    if (end <= start) return setError("End date must be after start date.");
    mutate(formData);
  };

  const today = new Date().toISOString().split("T")[0];
  const maxStart = new Date(); maxStart.setDate(maxStart.getDate() + 15);
  const maxStartDate = maxStart.toISOString().split("T")[0];
  let maxEndDate = formData.itemStartDate
      ? new Date(new Date(formData.itemStartDate).setDate(new Date(formData.itemStartDate).getDate() + 15)).toISOString().split("T")[0]
      : "";

  return (
      <div className="min-h-screen bg-[#FFFFFF] text-[#0A0A0A] font-serif">
        <main className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-[rgba(255,255,255,0.6)] backdrop-blur-lg rounded-2xl shadow-lg p-8 space-y-8 transition-all duration-500">
            <h1 className="text-5xl md:text-[72px] font-extrabold mb-6">Створити аукціон</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block font-semibold text-lg">Назва предмету *</label>
                <input
                    type="text" name="itemName" value={formData.itemName}
                    onChange={handleInputChange} placeholder="Назва антикваріату"
                    className="w-full px-4 py-3 rounded-xl border border-[#F5F0E8] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-all duration-300 shadow-sm hover:shadow-md"
                    required
                />
              </div>

              <div className="space-y-2">
                <label className="block font-semibold text-lg">Опис *</label>
                <textarea
                    name="itemDescription" value={formData.itemDescription} onChange={handleInputChange}
                    rows={4} placeholder="Детальний опис предмету"
                    className="w-full px-4 py-3 rounded-xl border border-[#F5F0E8] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] resize-none transition-all duration-300 shadow-sm hover:shadow-md"
                    required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-semibold text-lg">Категорія *</label>
                  <select
                      name="itemCategory" value={formData.itemCategory} onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#F5F0E8] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-all duration-300 shadow-sm hover:shadow-md"
                      required
                  >
                    <option value="">Оберіть категорію</option>
                    {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block font-semibold text-lg">Стартова ціна ($) *</label>
                  <input
                      type="number" name="startingPrice" value={formData.startingPrice} onChange={handleInputChange}
                      min="1" step="1" placeholder="0.0"
                      className="w-full px-4 py-3 rounded-xl border border-[#F5F0E8] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-all duration-300 shadow-sm hover:shadow-md"
                      required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-semibold text-lg">Дата початку *</label>
                  <input type="date" name="itemStartDate" value={formData.itemStartDate}
                         min={today} max={maxStartDate} onChange={handleInputChange}
                         className="w-full px-4 py-3 rounded-xl border border-[#F5F0E8] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-all duration-300 shadow-sm hover:shadow-md"
                         required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-semibold text-lg">Дата закінчення *</label>
                  <input type="date" name="itemEndDate" value={formData.itemEndDate}
                         min={formData.itemStartDate} max={maxEndDate} onChange={handleInputChange}
                         className="w-full px-4 py-3 rounded-xl border border-[#F5F0E8] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-all duration-300 shadow-sm hover:shadow-md"
                         required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-semibold text-lg">Фото *</label>
                <input
                    type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange}
                    className="w-full file:px-4 file:py-2 file:rounded-xl file:border-0 file:bg-[#FFE5D9] file:text-[#8B5CF6] hover:file:bg-[#F5F0E8] transition-all duration-300"
                />
                {formData.itemPhoto && (
                    <div className="mt-3 flex flex-col items-start gap-3">
                      <img src={URL.createObjectURL(formData.itemPhoto)} alt="Preview" className="w-32 h-32 object-cover rounded-xl shadow-md"/>
                      <button type="button" onClick={() => {setFormData(prev => ({...prev, itemPhoto: ""})); fileInputRef.current.value=""}}
                              className="text-[#8B5CF6] hover:underline font-semibold"
                      >Remove Image</button>
                    </div>
                )}
              </div>

              {error && <div className="text-red-600 font-medium">{error}</div>}

              <button type="submit"
                      className="w-full md:w-auto bg-[#8B5CF6] text-white py-3 px-8 rounded-xl font-bold hover:scale-[1.02] transition-transform duration-200 shadow-lg"
                      disabled={isPending}
              >
                {isPending ? "Створюємо..." : "Створити аукціон"}
              </button>
            </form>
          </div>
          <HelpSection />
        </main>
      </div>
  );
};

export const HelpSection = () => (
    <div className="mt-12 p-8 rounded-2xl bg-[rgba(139,92,246,0.05)] backdrop-blur-lg">
      <h3 className="text-xl font-bold mb-4 text-[#8B5CF6]">Поради для успішного аукціону</h3>
      <ul className="space-y-2 text-[#0A0A0A] font-light">
        <li>• Використовуйте чіткі фото високої якості</li>
        <li>• Детальний опис з усіма особливостями предмету</li>
        <li>• Розумна стартова ціна для приваблення учасників</li>
        <li>• Тривалість аукціону 3-7 днів оптимальна</li>
        <li>• Оберіть точну категорію для кращого пошуку</li>
      </ul>
    </div>
);
