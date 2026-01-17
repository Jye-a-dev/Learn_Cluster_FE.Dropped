import PublicSetup from "@/components/layouts/public/PublicSetup";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicSetup>{children}</PublicSetup>;
}
