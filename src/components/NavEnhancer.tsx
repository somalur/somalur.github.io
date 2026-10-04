"use client";

import { useEffect } from "react";
import { animate, inView } from "motion";

export default function NavEnhancer() {
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const prefersReducedMotion = () => reducedMotionQuery.matches;

    const animations: ReturnType<typeof animate>[] = [];
    const stopReveals = inView("main > section", (element) => {
      if (prefersReducedMotion()) return;
      animations.push(animate(element, { opacity: [0.9, 1], y: [6, 0] }, { duration: 0.3, ease: "easeOut" }));
    });
    const onMotionChange = () => {
      if (prefersReducedMotion()) animations.forEach(animation => animation.complete());
    };
    reducedMotionQuery.addEventListener("change", onMotionChange);
    const cleanAnimations = () => {
      stopReveals();
      animations.forEach(animation => animation.stop());
      reducedMotionQuery.removeEventListener("change", onMotionChange);
    };

    const navLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("nav a[data-nav]")
    );

    const sections = [...new Set(navLinks
      .map((a) => {
        const id = a.getAttribute("data-nav");
        return id ? document.getElementById(id) : null;
      })
      .filter((x): x is HTMLElement => Boolean(x)))];

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

    let navigationTarget: string | null = null;
    const listeners = navLinks.map((a) => {
      const onClick = (e: MouseEvent) => {
        const href = a.getAttribute("href") || "";
        if (!href.startsWith("#")) return;

        const id = href.slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        navigationTarget = id;
        setActive(id);

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

    let frame = 0;
    let activeId: string | null = null;
    const updateActive = () => {
      frame = 0;
      // Use section positions rather than intersection ratios: long sections
      // may never cross a ratio threshold within a narrow observer region.
      const headerBottom = document.querySelector('header')?.getBoundingClientRect().bottom || 0;
      const readingLine = Math.max(headerBottom + 60, window.innerHeight * 0.4);
      let nextId = '';
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) nextId = section.id;
      }
      // The final section may be too short to reach the reading line.
      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        nextId = sections.at(-1)?.id || nextId;
      }
      // Short sections near the footer share a clamped scroll destination.
      // Preserve an explicit navigation choice until the visitor scrolls again.
      if (navigationTarget) nextId = navigationTarget;
      if (nextId !== activeId) {
        activeId = nextId;
        setActive(nextId);
      }
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateActive);
    };
    const resumeScrollTracking = () => { navigationTarget = null; activeId = null; scheduleUpdate(); };
    const onScrollKey = (event: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) resumeScrollTracking();
    };
    window.addEventListener('wheel', resumeScrollTracking, { passive: true });
    window.addEventListener('touchstart', resumeScrollTracking, { passive: true });
    window.addEventListener('pointerdown', resumeScrollTracking, { passive: true });
    window.addEventListener('keydown', onScrollKey);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('hashchange', scheduleUpdate);
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    const main = document.querySelector('main');
    if (main) resizeObserver.observe(main);
    updateActive();

    return () => {
      cleanAnimations();
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('hashchange', scheduleUpdate);
      window.removeEventListener('wheel', resumeScrollTracking);
      window.removeEventListener('touchstart', resumeScrollTracking);
      window.removeEventListener('pointerdown', resumeScrollTracking);
      window.removeEventListener('keydown', onScrollKey);
      for (const { a, onClick } of listeners) {
        a.removeEventListener("click", onClick);
      }
    };
  }, []);

  return null;
}
