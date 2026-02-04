"use client";

export default function SidebarContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <aside className="fixed left-0 top-16 bottom-0 z-40 w-50 flex min-h-0">
      <div className="flex h-full w-full min-h-0">
        {children}
      </div>
    </aside>
  );
}
