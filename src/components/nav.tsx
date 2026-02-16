import { Link } from '@tanstack/react-router'
// import React from "react";

import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/nav";
import { useRef, useState } from 'react';

export function Nav({
  items,
  activeId,
  className,
}: {
  items: NavItem[];
  activeId?: string;
  className?: string;
}) {
  return (
    <nav
      data-active-id={activeId}
      className={cn("flex items-center gap-4", className)}
    >
      {items.map((item) => {
        if (item.href) {
          const { title, href } = item;
          const active =
            activeId === href ||
            (href === "/" // Home page
              ? ["/", "/index"].includes(activeId || "")
              : activeId?.startsWith(href));

          return (
            <NavItem key={href} href={href} active={active}>
              {title}
            </NavItem>
          );
        } else if (item.children) {
          // nav item with a dropdown menu
          return <NavItemWithDropdown key={item.title} title={item.title} children={item.children} />;
        }
      })}
    </nav>
  );
}

export function NavItemWithDropdown({ title, children }: {
  title: string;
  children: NavItem[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 800);
  };

  return (
    <div className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        className="font-mono text-sm font-medium text-muted-foreground cursor-pointer flex items-center gap-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </span>

      {isOpen && (
        <div className={cn("absolute top-full left-0 mt-2 w-max z-50 w-36 rounded-md bg-popover p-2 shadow-md z-50",
         "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out",
         "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
         "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
         "data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden")}>
          {children.map((child) => (
            <NavItem key={child.href} href={child.href} active={false}>
              {child.title}
            </NavItem>
          ))}
        </div>
      )}
    </div>
  );
}

export function NavItem({
  active,
  ...props
}: React.ComponentProps<typeof Link> & {
  active?: boolean;
}) {
  return (
    <Link
      className={cn(
        "font-mono text-sm font-medium text-muted-foreground transition-[color] duration-300 hover:text-foreground",
        active && "text-foreground"
      )}
      {...props}
    />
  );
}
