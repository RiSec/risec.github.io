import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation
} from "@remix-run/react";
import { useEffect } from "react";
import stylesUrl from "./styles/app.css?url";
import { TopNav } from "./components/TopNav";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }
];

export const meta: MetaFunction = () => [
  { title: "RIST" },
  { name: "viewport", content: "width=device-width, initial-scale=1" }
];

function useScrollbarReveal() {
  const location = useLocation();

  useEffect(() => {
    // Only control scroll bar behavior on the main one-page layout.
    if (location.pathname !== "/") return;

    const root = document.documentElement;
    let raf = 0;

    const update = () => {
      raf = 0;
      const y = window.scrollY || 0;
      if (y < 90) root.classList.add("scrollbar-hidden");
      else root.classList.remove("scrollbar-hidden");
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
      root.classList.remove("scrollbar-hidden");
    };
  }, [location.pathname]);
}

export default function App() {
  useScrollbarReveal();

  return (
    <html lang="ja">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="bg-grid" aria-hidden="true" />
        <div className="bg-squares" aria-hidden="true" />

        <TopNav />

        <main className="pt-16">
          <Outlet />
        </main>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
