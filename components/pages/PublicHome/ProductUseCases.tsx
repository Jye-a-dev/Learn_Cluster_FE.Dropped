import { productUseCases } from "./ProductContent";

export default function ProductUseCases() {
  return (
    <section
      className="relative m-2 overflow-hidden rounded-2xl border border-white bg-cover bg-center px-8 py-20"
      style={{ backgroundImage: "url('/assets/UseCases.jpg')" }}
    >
      <div className="absolute inset-0 bg-cyan-950/72" />
      <div className="relative mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-semibold text-cyan-50">Định vị phù hợp với nhiều mô hình</h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {productUseCases.map((item) => (
            <div key={item} className="rounded-2xl border border-emerald-300/20 bg-cyan-900/60 p-6 text-sm leading-7 text-cyan-50">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
