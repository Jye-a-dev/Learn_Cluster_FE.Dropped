'use client';
import { Tab } from '@headlessui/react';
import { roles } from './Data';
import clsx from 'clsx';

export default function RoleExperience() {
    return (
        <section className="px-8 py-20 bg-black/30 m-2 border border-white rounded-2xl">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-semibold text-center mb-10 text-white">
                    Trải nghiệm theo vai trò
                </h2>

                <Tab.Group>
                    {/* TAB LIST */}
                    <Tab.List className="flex flex-wrap justify-center gap-3 mb-8">
                        {Object.keys(roles).map(role => (
                            <Tab
                                key={role}
                                className={({ selected }) =>
                                    clsx(
                                        'px-5 py-2 rounded-xl border transition-all duration-200 cursor-pointer',
                                        'focus:outline-none focus:ring-2 focus:ring-cyan-400',
                                        selected
                                            ? 'bg-emerald-500 text-white border-emerald-500 shadow-md scale-[1.03]'
                                            : 'bg-cyan-100/60 text-emerald-100 hover:text-emerald-700 border-emerald-200 hover:bg-emerald-50'
                                    )
                                }
                            >
                                {role}
                            </Tab>
                        ))}
                    </Tab.List>

                    {/* PANELS */}
                    <Tab.Panels>
                        {Object.values(roles).map((items, idx) => (
                            <Tab.Panel
                                key={idx}
                                className="rounded-2xl border border-cyan-200 bg-cyan-50/40 p-6 shadow-sm data-[headlessui-state=selected]:animate-fadeIn"
                            >
                                <ul className="space-y-3">
                                    {items.map(i => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-2 text-gray-100"
                                        >
                                            <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                                            {i}
                                        </li>
                                    ))}
                                </ul>
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </section>
    );
}
