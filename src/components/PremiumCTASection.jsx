import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="relative w-full bg-primary py-24 flex items-center justify-center overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute -top-40 -left-40 w-[450px] h-[450px] bg-white/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-[450px] h-[450px] bg-black/20 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative w-full max-w-5xl mx-auto px-6"
      >
        {/* Main content container */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-14 text-center shadow-2xl">
          
          {/* Heading (UNCHANGED TEXT) */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-10 leading-snug">
            Ready to Simplify Your Service Search?
          </h1>

          {/* Buttons row (UNCHANGED BUTTONS & TEXT) */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-black text-white font-semibold px-10 py-4 rounded-full shadow-xl hover:bg-gray-900 transition-all duration-300"
            >
              Join WorkSure Today!
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white text-black font-semibold px-10 py-4 rounded-full shadow-xl hover:bg-gray-100 transition-all duration-300"
            >
              Learn More
            </motion.button>

          </div>
        </div>
      </motion.div>
    </section>
  );
}
