import { productLayers, productSignals } from "./ProductContent";

export default function ProductArchitecture() {
  return (
    <section
      className="m-2 rounded-2xl border border-white bg-cover bg-center px-8 py-20"
      style={{ backgroundImage: "url('/assets/CoreFeatures.png')" }}
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-semibold text-white">Kiến trúc sản phẩm cốt lõi</h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {productLayers.map((layer) => (
            <div key={layer.title} className="rounded-2xl border border-white/15 bg-slate-950/55 p-6 backdrop-blur-md">
              <h3 className="text-lg font-semibold text-cyan-100">{layer.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/82">{layer.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {productSignals.map((item) => (
            <div key={item.title} className="rounded-2xl border border-emerald-300/20 bg-emerald-950/35 p-6">
              <h3 className="text-lg font-semibold text-emerald-200">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-emerald-50/88">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
