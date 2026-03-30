"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, ArrowRight, Star, TrendingUp, Trophy, Medal } from "lucide-react";

const awards = [
  {
    rank: "AAA",
    sup: "+",
    description: "Rated B-School in U.P. by Business India Magazine 2023-24",
    source: "Business India Magazine",
    sourceStyle: "careers",
    icon: <Star className="w-4 h-4" />,
    accent: "#ff8400",
  },
  {
    rank: "3",
    sup: "rd",
    description: "Among Private Universities in UP by Outlook ICARE Ranking 2024",
    source: "Outlook ICARE",
    sourceStyle: "Outlook ICARE",
    icon: <Trophy className="w-4 h-4" />,
    accent: "#ff8400",
  },
  {
    rank: "1",
    sup: "st",
    description: "In Top Emerging Institutes in India by Times B School 2024",
    source: "TIMES B School",
    sourceStyle: "times",
    icon: <Award className="w-4 h-4" />,
    accent: "#ff8400",
  },
  {
    rank: "1",
    sup: "st",
    description: "School of Tourism & Hospitality in Private Colleges by India Today",
    source: "India Today",
    sourceStyle: "indiatoday",
    icon: <TrendingUp className="w-4 h-4" />,
    accent: "#ff8400",
  },
  {
    rank: "6",
    sup: "th",
    description: "For Filling the Highest Number of Patents Applicatons in India by Ministry of Commerce & Industry",
    source: "MoCI",
    sourceStyle: "MoCI",
    icon: <Medal className="w-4 h-4" />,
    accent: "#ff8400",
  },
  {
    rank: "ET",
    sup: "",
    description: "ET Young Industry Leaders 2025 Award by The Economic Times",
    source: "Economic Times",
    sourceStyle: "economic times",
    icon: <Trophy className="w-4 h-4" />,
    accent: "#ff8400",
  },
  {
    rank: "BEST",
    sup: "",
    description: "Best B Schools for Employability",
    source: "The Times Group",
    sourceStyle: "bw",
    icon: <TrendingUp className="w-4 h-4" />,
    accent: "#ff8400",
  },
  {
    rank: "★",
    sup: "",
    description: "Awarded Promising B-School for Strong Industry Connect by Indian Institutional Ranking Framework (IIRF)",
    source: "IIRF",
    sourceStyle: "iirf",
    icon: <Award className="w-4 h-4" />,
    accent: "#ff8400",
  },
];

const sourceStyles: Record<string, string> = {
  careers:  "text-[#263d81] font-black tracking-tight text-sm border border-[#263d81]/30 px-3 py-1 rounded",
  ghrdc:    "text-[#263d81] font-black tracking-widest text-base",
  times:    "text-gray-700 font-bold text-xs border border-gray-300 px-3 py-1 rounded",
  outlook:  "text-red-600 font-black italic text-base border border-red-200 px-3 py-1 rounded",
  eminence: "text-[#263d81] font-bold text-xs tracking-widest",
  theweek:  "text-white font-black text-sm bg-red-600 px-3 py-1 rounded",
  bw:       "text-[#263d81] font-black text-xs tracking-wide",
  iirf:     "text-gray-600 font-bold text-xs border border-gray-200 px-3 py-1 rounded",
};

// SVG laurel wreath
function LaurelWreath({ rank, sup }: { rank: string; sup: string }) {
  return (
    <div className="relative flex items-center justify-center w-30 h-30 mx-auto">
      <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full" fill="none">
        {/* Left branch */}
        <g opacity="0.9">
          <ellipse cx="22" cy="60" rx="6" ry="11" fill="#fcc423" transform="rotate(-30 22 60)" />
          <ellipse cx="16" cy="48" rx="5" ry="10" fill="#f5a800" transform="rotate(-50 16 48)" />
          <ellipse cx="18" cy="72" rx="5" ry="10" fill="#fcc423" transform="rotate(-10 18 72)" />
          <ellipse cx="28" cy="40" rx="4" ry="9" fill="#f5a800" transform="rotate(-65 28 40)" />
          <ellipse cx="26" cy="82" rx="4" ry="9" fill="#fcc423" transform="rotate(10 26 82)" />
          <ellipse cx="36" cy="33" rx="4" ry="8" fill="#f5a800" transform="rotate(-78 36 33)" />
          <ellipse cx="36" cy="90" rx="4" ry="8" fill="#fcc423" transform="rotate(25 36 90)" />
          <ellipse cx="46" cy="28" rx="3" ry="7" fill="#f5a800" transform="rotate(-88 46 28)" />
          <ellipse cx="47" cy="96" rx="3" ry="7" fill="#fcc423" transform="rotate(38 47 96)" />
        </g>
        {/* Right branch (mirror) */}
        <g opacity="0.9" transform="scale(-1,1) translate(-120,0)">
          <ellipse cx="22" cy="60" rx="6" ry="11" fill="#fcc423" transform="rotate(-30 22 60)" />
          <ellipse cx="16" cy="48" rx="5" ry="10" fill="#f5a800" transform="rotate(-50 16 48)" />
          <ellipse cx="18" cy="72" rx="5" ry="10" fill="#fcc423" transform="rotate(-10 18 72)" />
          <ellipse cx="28" cy="40" rx="4" ry="9" fill="#f5a800" transform="rotate(-65 28 40)" />
          <ellipse cx="26" cy="82" rx="4" ry="9" fill="#fcc423" transform="rotate(10 26 82)" />
          <ellipse cx="36" cy="33" rx="4" ry="8" fill="#f5a800" transform="rotate(-78 36 33)" />
          <ellipse cx="36" cy="90" rx="4" ry="8" fill="#fcc423" transform="rotate(25 36 90)" />
          <ellipse cx="46" cy="28" rx="3" ry="7" fill="#f5a800" transform="rotate(-88 46 28)" />
          <ellipse cx="47" cy="96" rx="3" ry="7" fill="#fcc423" transform="rotate(38 47 96)" />
        </g>
        {/* Bottom tie */}
        <ellipse cx="60" cy="104" rx="6" ry="3" fill="#f5a800" />
      </svg>

      {/* Rank text */}
      <div className="relative z-10 text-center">
        <span
          className="font-black text-[#263d81] leading-none"
          style={{
            fontSize: rank.length > 3 ? "18px" : rank === "★" ? "30px" : "28px",
            letterSpacing: "-0.03em",
          }}
        >
          {rank}
          {sup && (
            <sup className="text-[13px] font-black align-super ml-0.5">{sup}</sup>
          )}
        </span>
      </div>
    </div>
  );
}

interface Props {
     handleOpenForm: () => void;
}

function AwardCard({ award, index }: { award: typeof awards[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
      className="group relative bg-white rounded-2xl p-6 flex flex-col items-center text-center gap-4
        border border-[#e8f4f8] shadow-[0_4px_24px_rgba(0,100,143,0.07)]
        hover:shadow-[0_16px_48px_rgba(0,100,143,0.16)] hover:border-[#263d81]/20
        transition-shadow transition-border duration-300 cursor-default"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-b-full bg-linear-to-r from-[#ff8400] to-[#f5a800] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icon chip */}
      <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#263d81]/8 flex items-center justify-center text-[#263d81] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {award.icon}
      </div>

      {/* Wreath */}
      <motion.div
        animate={inView ? { rotateY: [0, 8, -8, 0] } : {}}
        transition={{ duration: 1.2, delay: index * 0.07 + 0.3 }}
      >
        <LaurelWreath rank={award.rank} sup={award.sup} />
      </motion.div>

      {/* Description */}
      <p className="text-[13.5px] text-gray-600 leading-relaxed font-medium flex-1">
        {award.description}
      </p>

      {/* Source badge */}
      <div className="mt-auto pt-2 border-t border-gray-100 w-full flex justify-center">
        <span className={sourceStyles[award.sourceStyle] || "text-gray-500 font-bold text-sm"}>
          {award.source}
        </span>
      </div>
    </motion.div>
  );
}

export default function AwardsSection({handleOpenForm}: Props) {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-40px" });

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-linear-to-b from-[#f0fafb] via-white to-[#f0fafb]">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-0.5 bg-linear-to-r from-transparent via-[#ff8400]/40 to-transparent" />
        <div className="absolute -top-40 -right-40 w-125 h-125 rounded-full bg-radial-linear opacity-30"
          style={{ background: "radial-gradient(circle, rgba(0,100,143,0.06) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-20 -left-20 w-100 h-100 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(252,196,35,0.08) 0%, transparent 70%)" }} />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* ── Heading ── */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-[#263d81]/8 text-[#263d81] text-xs font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-full mb-5 border border-[#263d81]/15">
            <Trophy className="w-3.5 h-3.5 text-[#ff8400]" />
            National Rankings & Awards
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-[#001f2d] tracking-tight leading-none mb-3">
            SU{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#263d81]">Awards</span>
              <span className="absolute -bottom-1 left-0 w-full h-2 bg-[#ff8400]/40 rounded-full z-0" />
            </span>
            {" "}&amp;{" "}
            <span className="text-[#263d81]">Recognitions</span>
          </h2>

          <p className="text-gray-500 text-base mt-4 max-w-xl mx-auto leading-relaxed">
            Consistently ranked among India's finest business schools by the country's most credible rating bodies.
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 bg-linear-to-r from-transparent to-[#ff8400]" />
            <div className="w-2 h-2 rounded-full bg-[#ff8400]" />
            <div className="h-px w-16 bg-linear-to-l from-transparent to-[#ff8400]" />
          </div>
        </motion.div>

        {/* ── Award Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {awards.map((award, i) => (
            <AwardCard key={i} award={award} index={i} />
          ))}
        </div>

        {/* ── CTA Banner ── */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-linear-to-r from-[#263d81] via-[#2747a6] to-[#003d57]" />
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle at 20% 50%, #ff8400 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)",
            }}
          />
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 px-8 sm:px-12 py-10">
            {/* Left */}
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
                <Award className="w-5 h-5 text-[#ff8400]" />
                <span className="text-[#ff8400] text-sm font-bold uppercase tracking-widest">
                  MBA / PGDM Admissions 2026
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">
                Be Part of an Award-Winning Legacy
              </h3>
              <p className="text-white/65 text-sm leading-relaxed max-w-md">
                Join thousands of graduates who built their careers at one of India's most decorated B-Schools. Applications are open — secure your seat today.
              </p>
            </div>

            {/* Right — dual CTAs */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <motion.a
                href="#apply"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleOpenForm()}
                className="inline-flex items-center justify-center gap-2 bg-[#ff8400] hover:bg-[#c26605] text-[#001f2d] font-black text-sm px-8 py-4 rounded-xl shadow-[0_8px_28px_rgba(252,196,35,0.4)] hover:shadow-[0_12px_36px_rgba(252,196,35,0.55)] transition-all duration-200 whitespace-nowrap"
              >
                Apply Now — 2026 Batch
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              <motion.a
                href="#brochure"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleOpenForm()}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/18 text-white font-bold text-sm px-8 py-4 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-200 whitespace-nowrap backdrop-blur-sm"
              >
                Download Brochure
              </motion.a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}