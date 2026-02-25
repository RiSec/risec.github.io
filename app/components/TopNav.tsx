import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { useLocation } from "@remix-run/react";

const navItems = [
  { label: "HOME", id: "home" },
  { label: "INFORMATION", id: "information" },
  { label: "MEMBER", id: "member" },
  { label: "SPONSOR", id: "sponsor" },
  { label: "FAQ", id: "faq" },
  { label: "CONTACT", id: "contact" }
] as const;

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

export function TopNav() {
  const location = useLocation();
  const isOnePage = location.pathname === "/";
  const [active, setActive] = useState<string>("home");

  const ids = useMemo(() => navItems.map((x) => x.id), []);

  useEffect(() => {
    if (!isOnePage) return;

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.05, 0.25, 0.5] }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [ids, isOnePage]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-black/10 bg-white/75 backdrop-blur">
      <div className="relative mx-auto flex h-full max-w-6xl items-center justify-end gap-6 px-6">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-70">
          <span className="inline-block h-6 w-6 rotate-45 border border-black/40" aria-hidden="true" />
        </div>

        <nav className="flex items-center gap-6 text-[13px] font-semibold tracking-wideish">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={isOnePage ? `#` : (item.id === "home" ? "/" : `/`)}
                className={clsx(
                  "transition-opacity hover:opacity-80",
                  isActive ? "opacity-100" : "opacity-60"
                )}
                onClick={(e) => {
                  if (!isOnePage) return;
                  e.preventDefault();
                  smoothScrollTo(item.id);
                }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* diagonal corner */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-20 opacity-60">
          <div className="corner-stripes h-full w-full" />
        </div>
      </div>
    </header>
  );
}
