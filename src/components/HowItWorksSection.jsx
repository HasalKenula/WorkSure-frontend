import { motion } from "framer-motion";
import {
  TbCircleNumber1Filled,
  TbCircleNumber2Filled,
  TbCircleNumber3Filled,
} from "react-icons/tb";

export default function HowItWorksSection() {
  return (
    <section className="relative w-full py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      
      {/* Decorative Blur */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold tracking-tight">
            How <span className="text-primary">WorkSure</span> Works
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Get professional work done in 3 simple steps
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-white/70 backdrop-blur-xl border border-black/10 rounded-2xl p-8 text-center shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            <div className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/20 group-hover:scale-110 transition-transform duration-300">
              <TbCircleNumber1Filled size={44} className="text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Search & Browse</h2>
            <p className="text-gray-600">
              Find workers by skill, location, and ratings. View detailed profiles and experience.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="group relative bg-white/70 backdrop-blur-xl border border-black/10 rounded-2xl p-8 text-center shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            <div className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/20 group-hover:scale-110 transition-transform duration-300">
              <TbCircleNumber2Filled size={44} className="text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Book Service</h2>
            <p className="text-gray-600">
              Choose your preferred professional and book the service directly through our platform.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="group relative bg-white/70 backdrop-blur-xl border border-black/10 rounded-2xl p-8 text-center shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            <div className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/20 group-hover:scale-110 transition-transform duration-300">
              <TbCircleNumber3Filled size={44} className="text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Secure Payment</h2>
            <p className="text-gray-600">
              Pay securely through WorkSure. Release payment only after work completion.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
