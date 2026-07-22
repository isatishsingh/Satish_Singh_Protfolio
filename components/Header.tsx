"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { navItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import { NavLink } from "@/components/NavLink";

function resolveHref(href: string, pathname: string) {
  if (href.startsWith("/")) return href;
  if (href.startsWith("#") && pathname !== "/") return `/${href}`;
  return href;
}

export function Header() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored ? stored === "dark" : prefersDark;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const isDsaPage = pathname === "/dsa";
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          {/* {isDsaPage && (
            <Link
              href="/"
              className="interactive-link inline-flex items-center gap-1.5 text-sm text-muted"
            >
              <ArrowLeft size={16} />
              Portfolio
            </Link>
          )} */}
          <Link
            href="/"
            className="interactive-link font-mono text-sm font-semibold tracking-tight text-foreground"
          >
            {profile.name.split(" ")[0].toLowerCase()}.
          </Link>
        </div>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              pathname={pathname}
              resolveHref={resolveHref}
            />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="interactive-btn rounded-lg border border-border/60 bg-surface/80 p-2 text-muted"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            type="button"
            className="interactive-btn flex flex-col gap-1 rounded-lg border border-border/60 bg-surface/80 p-2 text-muted md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="px-6 pb-4 md:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  item={item}
                  pathname={pathname}
                  resolveHref={resolveHref}
                  onNavigate={closeMenu}
                  variant="mobile"
                />
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
