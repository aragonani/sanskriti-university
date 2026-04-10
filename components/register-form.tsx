
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";


export const courses = [
  { label: "B.Tech", value: "B.Tech - All Branches", eligibility: "10+2 with PCM, 50–60%" },
  { label: "BCA", value: "BCA - All Branches", eligibility: "10+2 (any stream) with 45–50%" },
  { label: "Polytechnic", value: "Polytechnic - Diploma", eligibility: "10th pass, 45–50%" },
  { label: "B.Com", value: "B.Com (Hons.)", eligibility: "10+2 45–50%" },
  { label: "BBA", value: "BBA - All Branches", eligibility: "10+2 (any stream), 45–50%" },
  { label: "BA LLB", value: "BA LLB (Hons.)", eligibility: "10+2 (any stream), 45–50%" },
  { label: "B.Sc B.Ed", value: "B.Sc B.Ed", eligibility: "10+2 with Science, 50%" },
  { label: "BA B.Ed", value: "BA B.Ed", eligibility: "10+2 (any stream), 50%" },
  { label: "ANM", value: "ANM", eligibility: "10+2 with Science, 40–45%" },
  { label: "MPT", value: "MPT", eligibility: "Bachelor in Physiotherapy (BPT), 50–55%" },
  { label: "BNYS", value: "BNYS", eligibility: "10+2 with PCB, 50%" },
  { label: "B.Sc Agriculture", value: "B.Sc - Agriculture (Hons.)", eligibility: "10+2 with 50%" },
  { label: "Hotel Management", value: "B.Sc - Hotel Management", eligibility: "10+2 (any stream), 45–50%" },
  { label: "Fashion", value: "BA - Fashion", eligibility: "10+2 (any stream), 45–50%" },
  { label: "Diploma Fashion", value: "Diploma in Fashion", eligibility: "10th or 10+2, 45%" },
  { label: "Psychology", value: "BA - Psychology (Hons.)", eligibility: "10+2 (any stream), 45–50%" },
  { label: "MA Psychology", value: "MA - Psychology", eligibility: "Bachelor’s in Psychology/related field, 50%" },
  { label: "M.Tech", value: "M.Tech - CSE", eligibility: "B.Tech/B.E in relevant field, 50–60%" },
  { label: "MCA", value: "MCA", eligibility: "Graduation with Mathematics/Computer, 50%" },
  { label: "MBA", value: "MBA - Dual", eligibility: "Graduation (any stream), 50%" },
  { label: "MBA Agri", value: "MBA - Agri-Business", eligibility: "Graduation in Agriculture field, 50%" },
  { label: "M.Sc Agriculture", value: "M.Sc - Agriculture", eligibility: "B.Sc Agriculture, 50%" },
  { label: "Biotech", value: "B.Sc - Biotech", eligibility: "10+2 with PCB, 50%" },
  { label: "M.Sc Biotech", value: "M.Sc - Biotech", eligibility: "B.Sc in Biotech/Life Sciences, 50%" },
  { label: "Forensic", value: "B.Sc - Forensic", eligibility: "10+2 with Science (PCB/PCM), 50%" },
  { label: "B.Com LLB", value: "B.Com LLB (Hons.)", eligibility: "10+2 (any stream), 45–50%" },
  { label: "B.El.Ed", value: "B.El.Ed", eligibility: "10+2 (any stream), 50%" },
  { label: "B.Pharma", value: "B.Pharma", eligibility: "10+2 with PCB/PCM, 50%" },
  { label: "D.Pharma", value: "D.Pharma", eligibility: "10+2 with PCB/PCM, 50%" },
];

const cities = [
  "Delhi NCR",
  "Mumbai",
  "Bengaluru",
  "Faridabad",
  "Ghaziabad",
  "Meerut",
  "Aligarh",
  "Agra",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Gurugram",
  "Noida",
  "Chandigarh",
  "Bhopal",
  "Indore",
];


export default function RegisterForm({ formHeading, selectedCourse = "" }: { formHeading?: string; selectedCourse?: string }) {
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
    <div className="w-full max-w-sm mx-auto md:mx-0 bg-white rounded-xl p-3 mt-2
    border-2 border-[#1e3a5f]
    shadow-[0_20px_60px_rgba(0,0,0,0.25)]">

      <h2 className="text-2xl font-bold text-[#1e3a5f] text-center">
        {formHeading || "Apply For Sanskriti University"}
      </h2>

        <h2 className="text-small font-bold text-[#1e3a5f] text-center mb-2">
         Admission Open 2026
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
