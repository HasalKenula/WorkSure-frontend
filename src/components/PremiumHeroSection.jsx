import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function PremiumHeroSection() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="relative pt-40 px-6 overflow-hidden">

  {/* Background Effects */}
  <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0f0f1a] to-black -z-10" />
  <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-400/20 blur-[120px] rounded-full animate-pulse" />
  <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full animate-pulse" />

  {/* Glass Container */}
  <div className="max-w-5xl mx-auto p-10 rounded-3xl
                  backdrop-blur-xl bg-white/10
                  border border-white/20 shadow-2xl
                  hover:shadow-yellow-400/20 transition">

    <h1 className="text-4xl md:text-5xl font-extrabold text-white">
      Find Workers Near You
    </h1>

    <p className="mt-4 text-gray-300 text-lg">
      Hire skilled professionals easily.
    </p>

    <button
      className="mt-6 px-6 py-3 rounded-xl font-bold
                 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500
                 text-purple-900 shadow-lg
                 hover:scale-105 transition"
    >
      Find Workers
    </button>

  </div>
</section>

  );
}
