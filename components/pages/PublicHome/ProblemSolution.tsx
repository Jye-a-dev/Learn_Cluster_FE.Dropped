'use client';

import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { PROBLEMS, SOLUTIONS } from './Data';

export default function ProblemSolution() {
  return (
    <section className="relative overflow-hidden m-2 mt-2 rounded-2xl border border-white/30 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
      {/* Background split */}
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-emerald-900" />
        <div className="bg-linear-to-br from-cyan-900 via-cyan-800 to-cyan-700" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent_60%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 px-10 py-24">
        {/* Problem */}
        <Transition
          as={Fragment}
          appear
          show
          enter="transition-all duration-700 ease-out"
          enterFrom="opacity-0 -translate-x-8 scale-95"
          enterTo="opacity-100 translate-x-0 scale-100"
        >
          <div className="group relative rounded-2xl bg-white/10 backdrop-blur-2xl p-8 border border-white/25 text-emerald-50 shadow-lg hover:shadow-[0_12px_48px_rgba(16,185,129,0.25)] transition">
            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none" />
            <h2 className="text-2xl font-semibold tracking-tight">Vấn đề</h2>
            <ul className="mt-5 space-y-3 list-disc ml-5 text-emerald-50/90">
              {PROBLEMS.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </Transition>

        {/* Solution */}
        <Transition
          as={Fragment}
          appear
          show
          enter="transition-all duration-700 ease-out delay-150"
          enterFrom="opacity-0 translate-x-8 scale-95"
          enterTo="opacity-100 translate-x-0 scale-100"
        >
          <div className="group relative rounded-2xl bg-white/10 backdrop-blur-2xl p-8 border border-white/25 text-cyan-50 shadow-lg hover:shadow-[0_12px_48px_rgba(34,211,238,0.25)] transition">
            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none" />
            <h2 className="text-2xl font-semibold tracking-tight">
              Giải pháp – Learn Cluster
            </h2>
            <ul className="mt-5 space-y-3 list-disc ml-5 text-cyan-50/90">
              {SOLUTIONS.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </Transition>
      </div>
    </section>
  );
}
