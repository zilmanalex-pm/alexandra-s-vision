import { motion } from "framer-motion";

const font = { fontFamily: "'Lexend', sans-serif" } as const;
const slow = { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const };

const BehindTheProductSection = () => {
  return (
    <section className="py-20 px-6" style={{ background: "#1A1A1B" }}>
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={slow}
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8 text-center" style={font}>
          Behind the <span className="text-accent">Product</span>
        </h2>

        <div
          className="rounded-xl p-8 md:p-10"
          style={{
            background: "hsla(180, 30%, 12%, 0.6)",
            border: "1px solid hsla(180, 43%, 30%, 0.3)",
          }}
        >
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg" style={font}>
            This portfolio was built as a proof-of-concept in rapid product deployment. Using a
            modern AI-first stack—Lovable for frontend iteration and Supabase for real-time data
            management—I moved from concept to a fully functional, database-driven site in record
            time. It reflects my approach to product: prioritizing time-to-value without
            compromising on technical integrity or user experience.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default BehindTheProductSection;
