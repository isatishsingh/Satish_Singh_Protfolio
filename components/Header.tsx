"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { navItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import { NavLink } from "@/components/NavLink";
import { AnimatePresence, motion } from "framer-motion";

function resolveHref(href: string, pathname: string) {
  if (href.startsWith("/")) return href;
  if (href.startsWith("#") && pathname !== "/") return `/${href}`;
  return href;
}

export function Header() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border/40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="interactive-link font-mono text-sm font-semibold tracking-tight text-foreground flex items-center gap-2"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            {profile.name.toLowerCase().replace(" ", "")}
          </Link>
        </div>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
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
            className="interactive-btn flex flex-col gap-1 rounded-lg border border-border/60 bg-surface/80 p-2 text-muted xl:hidden"
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

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />

            {/* Sidebar */}
            <motion.aside
              ref={sidebarRef}
              className=" fixed top-0 right-0 z-50 h-screen w-[82%] max-w-sm overflow-y-auto overscroll-contain bg-slate-950/90 
                          backdrop-blur-2xl border-l border-cyan-500/20 shadow-[-10px_0_40px_rgba(14,165,233,0.15)]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 28,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-full flex-col px-6 py-8">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-6">

                  <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10">

                      <span className="text-lg font-bold text-cyan-400">
                        S
                      </span>

                    </div>

                    <div>
                      <h3 className="font-semibold text-white">
                        Satish Singh
                      </h3>

                      <p className="text-sm text-slate-400">
                        Full Stack Developer
                      </p>
                    </div>

                  </div>

                  <button
                    onClick={closeMenu}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
                  >
                    ✕
                  </button>

                </div>

                {/* Navigation */}
                <nav className="mt-8 flex flex-1 flex-col gap-1">

                  {navItems
                    .filter((item) => !item.download)
                    .map((item) => (
                      <NavLink
                        key={item.href}
                        item={item}
                        pathname={pathname}
                        resolveHref={resolveHref}
                        onNavigate={closeMenu}
                        variant="mobile"
                      />
                    ))}

                </nav>

                {/* Resume */}
                <a
                  href="/resume/Satish_Singh_Resume.pdf"
                  download
                  className=" mt-6 flex items-center justify-center gap-2 rounded-xl  bg-gradient-to-r from-cyan-500 to-blue-500
                  px-5 py-3 font-semibold text-white transition hover:scale-[1.02]">
                  Resume
                </a>

              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
