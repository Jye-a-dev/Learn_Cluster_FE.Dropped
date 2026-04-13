import { productProblems, productSolutions } from "./ProductContent";

export default function ProductProblems() {
  return (
    <section className="m-2 grid gap-6 rounded-2xl border border-white/25 bg-black/30 p-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-rose-200/20 bg-rose-950/35 p-7">
        <h2 className="text-2xl font-semibold text-white">Bài toán thị trường</h2>
        <ul className="mt-5 space-y-3 text-sm leading-7 text-rose-50/90">
          {productProblems.map((problem) => (
            <li key={problem} className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-rose-300" />
              <span>{problem}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-emerald-200/20 bg-emerald-950/35 p-7">
        <h2 className="text-2xl font-semibold text-white">Lời giải của LearnCluster</h2>
        <ul className="mt-5 space-y-3 text-sm leading-7 text-emerald-50/90">
          {productSolutions.map((solution) => (
            <li key={solution} className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-300" />
              <span>{solution}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
