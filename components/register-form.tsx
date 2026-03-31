"use client";

import { useState } from "react";

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

interface Props {
  formHeading?: string;
}

export default function RegisterForm({ formHeading }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    course: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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

      if (!res.ok) throw new Error("Failed to submit form");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-30 text-center px-6
      w-full rounded-[18px] p-6
      bg-[linear-gradient(160deg,#ffffff_0%,#f7f9fa_60%,#f0f4f6_100%)]
      shadow-[0_32px_64px_rgba(0,64,100,0.12),inset_0_0_0_1px_rgba(0,100,143,0.08)]">

        <div className="mb-6 animate-[pop-in_0.5s_ease_forwards]">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="32" fill="#fcc423" fillOpacity="0.15" />
            <circle cx="32" cy="32" r="24" fill="#fcc423" fillOpacity="0.25" />
            <path
              d="M20 33l9 9 15-18"
              stroke="#fcc423"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h3 className="text-2xl font-bold text-[#001f2d] mb-2">
          You're In!
        </h3>

        <p className="text-[#4a6570] text-sm leading-relaxed">
          Our admissions team will reach out to you within 24 hours.
        </p>

        <button
          onClick={() => {
            setSubmitted(false);
            setForm({
              name: "",
              email: "",
              phone: "",
              city: "",
              course: "",
            });
          }}
          className="mt-8 text-xs text-[#ff8400] underline underline-offset-4 opacity-70 hover:opacity-100"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  const fields = [
    { name: "name", placeholder: "Full Name", type: "text", icon: "👤" },
    { name: "email", placeholder: "Email Address", type: "email", icon: "✉️" },
    { name: "phone", placeholder: "Phone Number", type: "tel", icon: "📞" },
  ];

  return (
    <div className="w-full max-w-full rounded-[18px] p-6
    bg-[linear-gradient(160deg,#ffffff_0%,#f7f9fa_60%,#f0f4f6_100%)]
    shadow-[0_32px_64px_rgba(0,64,100,0.12),inset_0_0_0_1px_rgba(0,100,143,0.08)]
    relative overflow-hidden">

      {/* Header */}
      <div>
        <div className="inline-block bg-[rgba(0,100,143,0.08)] border border-[rgba(0,100,143,0.2)]
        text-[#263d81] text-[11px] font-semibold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-3">
          {formHeading
            ? `${formHeading} Admissions 2026`
            : "UG / PG Admissions 2026"}
        </div>

        <h2 className="text-[26px] font-extrabold text-[#001f2d] text-center leading-tight tracking-[-0.02em] mb-1">
          Apply For Sanskriti University
        </h2>

        <p className="text-[13px] text-center text-[#051218] font-semibold mb-6">
          Fill in the details — we'll take it from here.
        </p>
      </div>

      {/* Fields */}
      <div className="flex flex-col gap-[14px]">
        {fields.map((f) => (
          
          <div
            key={f.name}
            className={`flex items-center gap-[10px] w-full px-4 rounded-xl border-[1.5px] bg-white transition-all
            ${
              focused === f.name
                ? "border-[#263d81] bg-[#f0f8fc] shadow-[0_0_0_3px_rgba(0,100,143,0.08)]"
                : "border-[rgba(0,100,143,0.15)] hover:border-[rgba(0,100,143,0.3)]"
            }`}
          >
            
            <span className="text-[15px] opacity-50">{f.icon}</span>
            
            <input
              name={f.name}
              type={f.type}
              placeholder={f.placeholder}
              value={(form as any)[f.name]}
              onChange={(e) => {
                if (f.name === "phone") {
                  const value = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);
                  setForm({ ...form, phone: value });
                } else {
                  handleChange(e);
                }
              }}
              onFocus={() => setFocused(f.name)}
              onBlur={() => setFocused(null)}
              autoComplete="off"
              className="flex-1 bg-transparent outline-none text-[#001f2d] text-[14px] py-[13px] placeholder:text-[#9db5be]"
            />
          </div>
        ))}

        {/* City */}
        <div
          className={`flex items-center gap-[10px] w-full px-4 rounded-xl border-[1.5px] bg-white transition-all
          ${
            focused === "city"
              ? "border-[#263d81] bg-[#f0f8fc] shadow-[0_0_0_3px_rgba(0,100,143,0.08)]"
              : "border-[rgba(0,100,143,0.15)]"
          }`}
        >
          <span className="text-[15px] opacity-50">📍</span>

          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            onFocus={() => setFocused("city")}
            onBlur={() => setFocused(null)}
            className="flex-1 bg-transparent outline-none text-[#001f2d] text-[14px] py-[13px]"
          >
            <option value="" disabled>
              Select City
            </option>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Course */}
        <div
          className={`flex items-center gap-[10px] w-full px-4 rounded-xl border-[1.5px] bg-white transition-all
          ${
            focused === "course"
              ? "border-[#263d81] bg-[#f0f8fc] shadow-[0_0_0_3px_rgba(0,100,143,0.08)]"
              : "border-[rgba(0,100,143,0.15)]"
          }`}
        >
          <span className="text-[15px] opacity-50">🎓</span>

          <select
            name="course"
            value={form.course}
            onChange={handleChange}
            onFocus={() => setFocused("course")}
            onBlur={() => setFocused(null)}
            className="flex-1 bg-transparent outline-none text-[#001f2d] text-[14px] py-[13px]"
          >
            <option value="" disabled>
              Select Course
            </option>
            {courses.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={
          !form.name ||
          !form.email ||
          form.phone.length !== 10 ||
          !form.city ||
          !form.course
        }
        className="flex items-center justify-center gap-2 w-full mt-5 p-[15px]
        rounded-xl text-white font-extrabold text-[15px]
        bg-[linear-gradient(135deg,#ff8400_0%,#ed7a00_100%)]
        shadow-[0_8px_24px_rgba(252,196,35,0.35)]
        hover:shadow-[0_12px_32px_rgba(252,196,35,0.5)]
        hover:-translate-y-[2px]
        active:translate-y-0
        transition-all
        disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span>{loading ? "Sending..." : "Apply Now"}</span>

        {!loading && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12h14M12 5l7 7-7 7"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <p className="text-[10px] text-[#9db5be] text-center mt-4">
        By applying, you consent to be contacted via SMS, Email & WhatsApp.
      </p>

      {error && (
        <p className="text-red-400 text-xs text-center mt-2">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}