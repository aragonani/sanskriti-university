"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export const courses = [
  { label: "B.Tech", value: "B.Tech - All Branches" },
  { label: "BCA", value: "BCA - All Branches" },
  { label: "Polytechnic", value: "Polytechnic - Diploma" },
  { label: "B.Com", value: "B.Com (Hons.)" },
  { label: "BBA", value: "BBA - All Branches" },
  { label: "BA LLB", value: "BA LLB (Hons.)" },
  { label: "B.Sc B.Ed", value: "B.Sc B.Ed" },
  { label: "BA B.Ed", value: "BA B.Ed" },
  { label: "ANM", value: "ANM" },
  { label: "MPT", value: "MPT" },
  { label: "BNYS", value: "BNYS" },
  { label: "B.Sc Agriculture", value: "B.Sc - Agriculture (Hons.)" },
  { label: "Hotel Management", value: "B.Sc - Hotel Management" },
  { label: "Fashion", value: "BA - Fashion" },
  { label: "Diploma Fashion", value: "Diploma in Fashion" },
  { label: "Psychology", value: "BA - Psychology (Hons.)" },
  { label: "MA Psychology", value: "MA - Psychology" },
  { label: "M.Tech", value: "M.Tech - CSE" },
  { label: "MCA", value: "MCA" },
  { label: "MBA", value: "MBA - Dual" },
  { label: "MBA Agri", value: "MBA - Agri-Business" },
  { label: "M.Sc Agriculture", value: "M.Sc - Agriculture" },
  { label: "Biotech", value: "B.Sc - Biotech" },
  { label: "M.Sc Biotech", value: "M.Sc - Biotech" },
  { label: "Forensic", value: "B.Sc - Forensic" },
  { label: "B.Com LLB", value: "B.Com LLB (Hons.)" },
  { label: "B.El.Ed", value: "B.El.Ed" },
  { label: "B.Pharma", value: "B.Pharma" },
  { label: "D.Pharma", value: "D.Pharma" },
];

const cities = [
  "Delhi","Noida","Gurgaon","Ghaziabad","Faridabad",
  "Lucknow","Kanpur","Jaipur"
];

export default function RegisterForm({ selectedCourse = "" }: { selectedCourse?: string }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    course: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [focused, setFocused] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

    
//   useEffect(() => {
//   if (selectedCourse) {
//     setForm((prev) => ({
//       ...prev,
//       course: selectedCourse,
//     }));
//   } else {
//     // reset when modal reopens without selection
//     setForm((prev) => ({
//       ...prev,
//       course: "",
//     }));
//   }
// }, [selectedCourse]);

useEffect(() => {
  setForm((prev) => ({
    ...prev,
    course: selectedCourse || "",
  }));
}, [selectedCourse]);

  const router = useRouter();

  // ✅ Validation
  const validate = () => {
    const newErrors: any = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

  if (!form.phone.trim()) {
  newErrors.phone = "Phone is required";
} else if (!/^[6-9]\d{9}$/.test(form.phone)) {
  newErrors.phone = "Enter a valid 10-digit mobile number starting with 6-9";
}

    if (!form.course) newErrors.course = "Select a course";
    if (!form.city) newErrors.city = "Select a city";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // ✅ Submit
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      const firstName = form.name.split(" ")[0];

      router.push(`/sanskriti-university/thankyou?name=${firstName}`);

    } catch {
      setErrors({ submit: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto bg-white rounded-xl p-3 mt-2
    border-2 border-[#1e3a5f]
    shadow-[0_20px_60px_rgba(0,0,0,0.25)]">

      <h2 className="text-2xl font-bold text-[#1e3a5f] text-center mb-2">
        Apply For Sanskriti University
      </h2>

      {/* NAME */}
      <div className="mb-2">
        <label className="text-sm font-semibold text-[#1e3a5f]">
          Full Name <span className="text-red-500">*</span>
        </label>

        <div className={`flex items-center gap-3 mt-1 px-4 py-3 rounded-lg bg-[#f9fbfc] border-2
        ${focused === "name" ? "border-[#1e3a5f]" : "border-[#cbd5e1]"}`}>

          <span className="opacity-60">👤</span>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
            placeholder="Enter Full Name"
            className="w-full bg-transparent outline-none text-sm text-black"
          />
        </div>

        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* EMAIL */}
      <div className="mb-2">
        <label className="text-sm font-semibold text-[#1e3a5f]">
          Email <span className="text-red-500">*</span>
        </label>

        <div className={`flex items-center gap-3 mt-1 px-4 py-3 rounded-lg bg-[#f9fbfc] border-2
        ${focused === "email" ? "border-[#1e3a5f]" : "border-[#cbd5e1]"}`}>

          <span className="opacity-60">✉️</span>

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            placeholder="Enter Email"
            className="w-full bg-transparent outline-none text-sm text-black"
          />
        </div>

        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* PHONE */}
      <div className="mb-2">
        <label className="text-sm font-semibold text-[#1e3a5f]">
          Mobile Number <span className="text-red-500">*</span>
        </label>

        <div className={`flex items-center mt-1 rounded-lg bg-[#f9fbfc] border-2
        ${focused === "phone" ? "border-[#1e3a5f]" : "border-[#cbd5e1]"}`}>

          <span className="pl-3 opacity-60">📞</span>

          <div className="px-1 py-3 text-sm text-gray-600 border-r border-[#cbd5e1]">
            +91
          </div>

          <input
            name="phone"
            value={form.phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 10);
              // ❌ prevent numbers starting < 6
              if (value.length === 1 && Number(value) < 6) return;
              setForm({ ...form, phone: value });
            }}
            onFocus={() => setFocused("phone")}
            onBlur={() => setFocused(null)}
            placeholder="Enter Mobile Number"
            className="w-full px-3 py-3 bg-transparent outline-none text-sm text-black"
          />
        </div>

        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>

      {/* COURSE */}
      <div className="mb-4">
        <label className="text-sm font-semibold text-[#1e3a5f]">
          Course <span className="text-red-500">*</span>
        </label>

        <select
          name="course"
          value={form.course}
          onChange={handleChange}
          className={`w-full mt-1 px-4 py-3 rounded-lg bg-[#f9fbfc] border-2
          ${form.course ? "text-black" : "text-gray-400"}
          border-[#cbd5e1]`}
        >
          <option value="" disabled hidden>
            Select Course Interested
          </option>

          {courses.map((c) => (
            <option key={c.value} value={c.value} className="text-black">
              {c.label}
            </option>
          ))}
        </select>

        {errors.course && (
          <p className="text-red-500 text-xs mt-1">{errors.course}</p>
        )}
      </div>

      {/* CITY */}
      <div className="mb-5">
        <label className="text-sm font-semibold text-[#1e3a5f]">
          City <span className="text-red-500">*</span>
        </label>

        <select
          name="city"
          value={form.city}
          onChange={handleChange}
          className={`w-full mt-1 px-4 py-3 rounded-lg bg-[#f9fbfc] border-2
          ${form.city ? "text-black" : "text-gray-400"}
          border-[#cbd5e1]`}
        >
          <option value="" disabled hidden>
            Select Your City
          </option>

          {cities.map((city) => (
            <option key={city} value={city} className="text-black">
              {city}
            </option>
          ))}
        </select>

        {errors.city && (
          <p className="text-red-500 text-xs mt-1">{errors.city}</p>
        )}
      </div>

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        className="w-full py-3 rounded-lg bg-[#1e3a5f] text-white font-semibold relative overflow-hidden"
      >
        {loading ? "Submitting..." : "Submit"}

        <motion.div
          className="absolute inset-0 w-1/4 bg-linear-to-r from-transparent via-white to-transparent opacity-60"
          animate={{ x: ["-100%", "400%"] }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
            repeatDelay: 3,
          }}
        />
      </button>

      {errors.submit && (
        <p className="text-red-500 text-xs text-center mt-2">
          {errors.submit}
        </p>
      )}
    </div>
  );
}