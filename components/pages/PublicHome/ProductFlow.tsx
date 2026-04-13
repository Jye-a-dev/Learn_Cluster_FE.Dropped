import { productFlow } from "./ProductContent";

export default function ProductFlow() {
  return (
    <section className="m-2 rounded-2xl border border-white bg-cyan-900/70 px-8 py-14">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-semibold text-cyan-50">Luồng trải nghiệm từ mục tiêu đến phản hồi</h2>

        <ol className="mt-12 space-y-5">
          {productFlow.map((step, index) => (
            <li key={step} className="flex gap-4 rounded-2xl border border-cyan-200/12 bg-cyan-950/45 p-5 text-cyan-50">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-100 font-semibold text-cyan-950">
                {index + 1}
              </div>
              <p className="pt-1 text-sm leading-7 text-cyan-50/92">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
