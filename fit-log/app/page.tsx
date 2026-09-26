import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <div>
      <Hero />
      
      {/* Library Section — placeholder for next part */}
      <section id="library" className="px-4 md:px-8 py-12">
        <h2 className="text-3xl font-bold uppercase">Library part Hold</h2>
        <p className="text-gray-400 mt-2">on hold </p>
      </section>
    </div>
  );
}