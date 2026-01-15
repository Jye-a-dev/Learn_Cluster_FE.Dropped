'use client';

import { Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[90vh] m-2 p-6 px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center rounded-2xl overflow-hidden bg-cover bg-center border border-white/90"
      style={{ backgroundImage: "url('/assets/Hero.jpg')" }}
    >
      {/* Global blend overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-white/30 via-cyan-200/20 to-indigo-300/20 backdrop-blur-md" />

      {/* LEFT — Content */}
      <Transition as={Fragment} 
      appear show enter="transition-all duration-700 ease-out" 
      enterFrom="opacity-0 translate-y-8 scale-95" 
      enterTo="opacity-100 translate-y-0 scale-100">
        <div className="relative z-10 mx-auto max-w-xl">
          <div className="rounded-2xl bg-white/10 backdrop-blur-2xl p-8 border border-white/40 shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
            <h1 className="text-4xl font-extrabold animate-[swap-emerald-cyan_3s_ease-in-out_infinite] drop-shadow-[0_0_4px_rgba(16,185,129,0.4)] text-center leading-tight">
              <span className="px-2 py-1 rounded-2xl bg-white/70">Learn Cluster</span>
            </h1>

            <h2 className="mt-2 text-lg font-semibold text-white text-center">
              Hệ thống quản lý học tập & Study Date thông minh
            </h2>

            <p className="mt-4 text-base  text-white text-justify leading-relaxed">
              Quản lý khóa học, study date, theo dõi tiến độ và tương tác học tập trong một nền tảng duy nhất.
            </p>

            <div className="mt-8 flex gap-4 justify-center">
              <button className="px-6 py-3 rounded-xl font-semibold bg-emerald-600/90 text-white hover:bg-emerald-700 transition hover:scale-105 shadow-md">
                Bắt đầu ngay
              </button>

              <button className="px-6 py-3 rounded-xl font-semibold border border-slate-300 text-slate-700 bg-white/60 hover:bg-white/80 transition hover:scale-105">
                Xem demo
              </button>
            </div>
          </div>
        </div>
      </Transition>


      {/* RIGHT — Logo branding */}
      <Transition
        as={Fragment}
        appear
        show
        enter="transition-all duration-1200 ease-out delay-200"
        enterFrom="opacity-0 translate-x-10 scale-90"
        enterTo="opacity-100 translate-x-0 scale-100"
      >
        <div className="relative z-10 flex justify-center items-center">
          <div className="relative w-64 h-64 lg:w-96 lg:h-96">
            {/* Halo blend */}
            <div className="absolute inset-0 rounded-full bg-linear-to-br from-emerald-400/30 via-cyan-300/20 to-indigo-400/30 blur-2xl mix-blend-screen" />

            <Image
              src="/assets/LCLogo.png"
              alt="Learn Cluster Logo"
              fill
              priority
              sizes="(min-width: 1024px) 384px, 256px"
              className="relative object-contain rounded-full opacity-95 drop-shadow-[0_0_40px_rgba(56,189,248,0.45)] animate-[float_6s_ease-in-out_infinite]"
            />
          </div>
        </div>
      </Transition>
    </section>
  );
}
