"use client";

import Link from "next/link";
import type { NavItem } from "@/types";

type NavLinkProps = {
  item: NavItem;
  pathname: string;
  resolveHref: (href: string, pathname: string) => string;
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
};

export function NavLink({
  item,
  pathname,
  resolveHref,
  onNavigate,
  variant = "desktop",
}: NavLinkProps) {
  const isActive = pathname === item.href;
  const isResume = item.download;

  const desktopClass = isResume
    ? "nav-resume-btn"
    : isActive
      ? "bg-accent/10 font-medium text-accent"
      : "text-muted hover:bg-surface hover:text-foreground";

  const mobileClass = isResume
    ? "nav-resume-btn w-full justify-center"
    : `group flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-slate-300 
    transition-all duration-300 ${isActive
      ? "bg-cyan-500/10 text-cyan-400"
      : "text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 hover:translate-x-1"
    }
    `;

  const className =
    variant === "mobile"
      ? mobileClass
      : `inline-flex rounded-lg px-3 py-2 text-sm transition-all duration-200
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
         ${desktopClass}
         ${item.icon ? "items-center gap-2" : ""}`;

  if (item.download) {
    return (
      <a
        href={item.href}
        download
        className={className}
        onClick={onNavigate}
      >
        {item.icon && <item.icon size={item.iconSize ?? 16} />}
        {item.label}
      </a>
    );
  }

  return (
    <Link
      href={resolveHref(item.href, pathname)}
      className={className}
      onClick={onNavigate}
    >
      {item.icon && <item.icon size={item.iconSize ?? 16} />}
      {item.label}
    </Link>
  );
}
