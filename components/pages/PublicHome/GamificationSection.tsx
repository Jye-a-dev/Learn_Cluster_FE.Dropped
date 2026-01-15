import { items } from "./Data";

export default function GamificationSection() {
  return (
    <div className="m-2 rounded-2xl overflow-hidden border border-white">
      <section
        className="relative px-8 py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/GamificationSection.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

        <div className="relative max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-white text-center mb-10">
            Gamification & Động lực học tập
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map(item => (
              <div
                key={item.title}
                className="rounded-2xl border border-emerald-200 bg-black/20 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:scale-[1.1]"
              >
                <h3 className="font-semibold text-lg text-emerald-300">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-emerald-100 text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
