'use client';
import { Tab } from '@headlessui/react';


const roles = {
    Student: ['Theo dõi tiến độ', 'Tham gia study date', 'Nộp bài, nhận badge'],
    Teacher: ['Tạo course', 'Chấm điểm', 'Xem thống kê'],
    TA: ['Hỗ trợ lớp', 'Kiểm duyệt nội dung'],
    Admin: ['Quản lý user', 'Thống kê hệ thống'],
};


export default function RoleExperience() {
    return (
        <section className="px-8 py-20">
            <Tab.Group>
                <Tab.List className="flex gap-4">
                    {Object.keys(roles).map(role => (
                        <Tab key={role} className="px-4 py-2 rounded-lg border">{role}</Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-6">
                    {Object.values(roles).map((items, idx) => (
                        <Tab.Panel key={idx}>
                            <ul className="list-disc ml-5 space-y-2">
                                {items.map(i => <li key={i}>{i}</li>)}
                            </ul>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </section>
    );
}