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
    : "text-muted hover:bg-surface hover:text-accent";

  const className = `${
    variant === "mobile" && !isResume ? "block w-full" : "inline-flex"
  } rounded-lg px-3 py-2 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
    variant === "mobile" ? mobileClass : desktopClass
  } ${item.icon ? "items-center gap-2" : ""}`;

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
