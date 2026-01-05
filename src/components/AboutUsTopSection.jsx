import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import about from "../assets/aboutUS.jpg";
import Mission from "../assets/mission.jpg"; // example 2nd image
import worker from "../assets/worker.png"; // example 3rd image

export default function AboutUsTopSection() {
  const images = [about, Mission, worker];
  const [current, setCurrent] = useState(0);

  // Simple slideshow every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[450px] md:h-[600px] w-full flex items-center justify-center overflow-hidden">

      {/* Slideshow Background */}
      {images.map((img, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${img})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === current ? 1 : 0 }}
          transition={{ duration: 1.5 }}
        />
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/50"></div>

      {/* Floating shapes */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400/30 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-amber-400/20 rounded-full blur-3xl animate-pulse-slow-reverse"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 text-center px-6 max-w-3xl"
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6">
          About <span className="text-[lch(74.93%_82.5_73.14)]">WorkSure</span>
        </h1>
        <p className="text-lg md:text-xl text-white leading-relaxed">
          Connecting businesses with top-tier talent, WorkSure is revolutionizing project collaboration
          <br />
          and workforce management with innovative solutions.
        </p>
      </motion.div>
    </section>
  );
}
