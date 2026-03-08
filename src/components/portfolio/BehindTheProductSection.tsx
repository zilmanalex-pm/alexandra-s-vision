const BehindTheProductSection = () => {
  return (
    <section className="py-20 px-6" style={{ fontFamily: "'Lexend', sans-serif" }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">
          Behind the Product
        </h2>

        <div
          className="rounded-xl p-8 md:p-10"
          style={{
            background: "hsla(180, 30%, 12%, 0.6)",
            border: "1px solid hsla(180, 43%, 30%, 0.3)",
          }}
        >
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            This portfolio was built as a proof-of-concept in rapid product deployment. Using a
            modern AI-first stack—Lovable for frontend iteration and Supabase for real-time data
            management—I moved from concept to a fully functional, database-driven site in record
            time. It reflects my approach to product: prioritizing time-to-value without
            compromising on technical integrity or user experience.
          </p>

          <p className="mt-8 text-xs text-muted-foreground/50 leading-relaxed">
            Privacy Note: This site uses anonymous session tracking solely to measure page views and
            traffic sources. No personal data is collected or stored. All analytics data is
            aggregated and used only for portfolio performance insights.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BehindTheProductSection;
