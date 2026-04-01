"use client";

import { useState } from "react";
import {motion} from "framer-motion";

const courses = [
  "B.Tech - All Branches",
  "BCA - All Branches",
  "Polytechnic - Diploma",
  "B.Com (Hons.)",
  "BBA - All Branches",
  "BA LLB (Hons.)",
  "B.Sc B.Ed",
  "BA B.Ed",
  "ANM",
  "MPT",
  "BNYS",
  "B.Sc - Agriculture (Hons.)",
  "B.Sc - Hotel Management",
  "BA - Fashion",
  "Diploma in Fashion",
  "BA - Psychology (Hons.)",
  "MA - Psychology",
  "M.Tech - CSE",
  "MCA",
  "MBA - Dual",
  "MBA - Agri-Business",
  "M.Sc - Agriculture",
  "B.Sc - Biotech",
  "M.Sc - Biotech",
  "B.Sc - Forensic",
  "B.Com LLB (Hons.)",
  "B.El.Ed",
  "B.Pharma",
  "D.Pharma",
];

const cities = [
  "Delhi NCR","Mumbai","Bengaluru","Faridabad","Ghaziabad","Meerut",
  "Aligarh","Agra","Hyderabad","Chennai","Pune","Kolkata",
  "Ahmedabad","Jaipur","Lucknow","Gurugram","Noida",
  "Chandigarh","Bhopal","Indore",
];

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    course: "",
  });

  const [focused, setFocused] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-xl p-6 border-2 border-[#1e3a5f] text-center">
        <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">You're In 🎉</h3>
        <p className="text-sm text-gray-600">
          Our team will contact you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto bg-white rounded-xl p-3 mt-2
    border-2 border-[#1e3a5f]
    shadow-[0_20px_60px_rgba(0,0,0,0.25)]">

      <h2 className="text-2xl font-bold text-[#1e3a5f] text-center mb-2">
        Apply For Sanskriti University
      </h2>

      {/* Fields */}
      {[
        { name: "name", label: "Full Name", icon: "👤" },
        { name: "email", label: "Email", icon: "✉️" },
        { name: "phone", label: "10-digit Mobile For OTP", icon: "📞" },
      ].map((f) => (
        <div key={f.name} className="mb-2">
          <label className="text-sm font-semibold text-[#1e3a5f]">
            {f.label} <span className="text-red-500">*</span>
          </label>

          <div className={`flex items-center gap-3 mt-1 px-4 py-3 rounded-lg bg-[#f9fbfc] border-2
            ${focused === f.name ? "border-[#1e3a5f]" : "border-[#cbd5e1]"}`}>
            
            <span className="opacity-60">{f.icon}</span>

            <input
              name={f.name}
              value={(form as any)[f.name]}
              onChange={(e) => {
                if (f.name === "phone") {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 12);
                  setForm({ ...form, phone: value });
                } else handleChange(e);
              }}
              onFocus={() => setFocused(f.name)}
              onBlur={() => setFocused(null)}
              placeholder={`Enter ${f.label}`}
              className="w-full bg-transparent outline-none text-sm text-black placeholder:text-gray-400"
            />
          </div>
        </div>
      ))}

      {/* Course */}
      <div className="mb-4">
        <label className="text-sm font-semibold text-[#1e3a5f]">
          Course <span className="text-red-500">*</span>
        </label>

        <select
          name="course"
          value={form.course}
          onChange={handleChange}
          onFocus={() => setFocused("course")}
          onBlur={() => setFocused(null)}
          className={`w-full mt-1 px-4 py-3 rounded-lg bg-[#f9fbfc] border-2 text-sm text-black placeholder:text-gray-400
          ${focused === "course" ? "border-[#1e3a5f]" : "border-[#cbd5e1]"}`}
        >
          <option value="">Course Interested</option>
          {courses.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* City */}
      <div className="mb-5">
        <label className="text-sm font-semibold text-[#1e3a5f]">
          Enter City <span className="text-red-500">*</span>
        </label>

        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          onFocus={() => setFocused("city")}
          onBlur={() => setFocused(null)}
          placeholder="Your Current City"
          className={`w-full mt-1 px-4 py-3 rounded-lg bg-[#f9fbfc] border-2 text-sm text-black placeholder:text-gray-400
          ${focused === "city" ? "border-[#1e3a5f]" : "border-[#cbd5e1]"}`}
        />
      </div>

      {/* Trust */}
      <p className="text-xs text-gray-500 flex items-center gap-2 mb-4">
        🔒 Your personal information is secure with us
      </p>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full py-3 rounded-lg bg-[#1e3a5f] text-white font-semibold relative overflow-hidden
        hover:bg-[#16324f] transition disabled:opacity-40"
      >
        {loading ? "Submitting..." : "Submit"}

         <motion.div
            className="absolute inset-0 w-1/4 bg-linear-to-r from-transparent via-white to-transparent opacity-60"
            animate={{
              x: ["-100%", "400%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
              repeatDelay: 3,
            }}
          />
      </button>

      {error && (
        <p className="text-red-500 text-xs text-center mt-2">
          Something went wrong. Try again.
        </p>
      )}
    </div>
  );
}