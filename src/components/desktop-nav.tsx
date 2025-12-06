import { useLocation } from "@tanstack/react-router";
import { Nav } from "@/components/nav";
import type { NavItem } from "@/types/nav";

export function DesktopNav({ items }: { items: NavItem[] }) {
  const { pathname } = useLocation();

  return <Nav className="max-md:hidden" items={items} activeId={pathname} />;
}
