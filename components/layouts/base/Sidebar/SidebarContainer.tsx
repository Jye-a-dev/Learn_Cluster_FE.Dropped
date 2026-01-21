// components/layouts/user/Sidebar/SidebarContainer.tsx
"use client";



export default function SidebarContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-64px)] w-50">
            {children}
        </aside>
    );
}
