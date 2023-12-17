import NavLink from "@/components/dashboard/nalink/NavLink";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full">
      <NavLink />
      <div className="px-3">{children}</div>
    </div>
  );
}
