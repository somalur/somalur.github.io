"use client";

import { useEffect } from "react";

export default function NavEnhancer() {
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const prefersReducedMotion = () => reducedMotionQuery.matches;

    const navLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("nav a[data-nav]")
    );

    const sections = navLinks
      .map((a) => {
        const id = a.getAttribute("data-nav");
        return id ? document.getElementById(id) : null;
      })
      .filter((x): x is HTMLElement => Boolean(x));

    const clearActive = () => {
      for (const a of navLinks) {
        a.removeAttribute("data-active");
        a.removeAttribute("aria-current");
      }
    };

    const setActive = (id: string) => {
      clearActive();
      const matches = navLinks.filter((x) => x.getAttribute("data-nav") === id);
      for (const a of matches) {
        a.setAttribute("data-active", "true");
        a.setAttribute("aria-current", "location");
      }
    };

    const listeners = navLinks.map((a) => {
      const onClick = (e: MouseEvent) => {
        const href = a.getAttribute("href") || "";
        if (!href.startsWith("#")) return;

        const id = href.slice(1);
        const target = document.getElementById(id);
        if (!target) return;

        const details = a.closest("details");
        if (details && details.hasAttribute("open")) {
          details.removeAttribute("open");
        }

        if (prefersReducedMotion()) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, "", href);
      };

      a.addEventListener("click", onClick);
      return { a, onClick };
    });

    if (typeof IntersectionObserver === "undefined") {
      return () => {
        for (const { a, onClick } of listeners) {
          a.removeEventListener("click", onClick);
        }
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (b.intersectionRatio || 0) - (a.intersectionRatio || 0)
          );

        if (visible.length === 0) return;
        const id = (visible[0].target as HTMLElement).id;
        if (id) setActive(id);
      },
      {
        root: null,
        threshold: [0.1, 0.2, 0.35, 0.5],
        rootMargin: "-20% 0px -70% 0px",
      }
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => {
      observer.disconnect();
      for (const { a, onClick } of listeners) {
        a.removeEventListener("click", onClick);
      }
    };
  }, []);

  return null;
}
