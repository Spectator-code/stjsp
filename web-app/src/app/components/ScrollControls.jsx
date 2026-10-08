"use client";

import { useState, useEffect } from "react";

export default function ScrollControls() {
  const [isScrollable, setIsScrollable] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check saved theme
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add("dark");
        setIsDark(true);
      }
    }

    // Expose global scroll helpers on window
    window.scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.scrollToBottom = () => {
      window.scrollTo({
        top: Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight
        ),
        behavior: "smooth",
      });
    };

    const checkScrollState = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      const clientHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const maxScroll = scrollHeight - clientHeight;

      // Has more than 80px of scrollable room
      const scrollable = maxScroll > 80;
      setIsScrollable(scrollable);

      setIsAtTop(scrollTop <= 40);
      setIsAtBottom(!scrollable || scrollTop >= maxScroll - 40);
    };

    checkScrollState();
    window.addEventListener("scroll", checkScrollState, { passive: true });
    window.addEventListener("resize", checkScrollState, { passive: true });

    // Observe dynamic height mutations
    const observer = new MutationObserver(checkScrollState);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    return () => {
      window.removeEventListener("scroll", checkScrollState);
      window.removeEventListener("resize", checkScrollState);
      observer.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      setIsDark(false);
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      setIsDark(true);
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <aside
      id="scrollControls"
      aria-label="Floating tools and navigation"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-center gap-2 transition-all duration-300 no-print select-none opacity-90 hover:opacity-100"
    >
      {/* Theme Toggle Button */}
      <button
        id="themeToggleBtn"
        type="button"
        onClick={toggleTheme}
        title={isDark ? "Switch to Institutional Light Theme" : "Switch to Obsidian Dark Theme"}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/90 dark:bg-slate-800/90 hover:bg-slate-950 dark:hover:bg-slate-700 text-amber-400 shadow-lg shadow-slate-950/25 border border-slate-700/60 dark:border-slate-600/60 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group"
      >
        <span className="material-symbols-outlined text-xl transition-transform group-hover:rotate-45">
          {isDark ? "light_mode" : "dark_mode"}
        </span>
      </button>

      {/* Scroll Navigation Capsule */}
      {isScrollable && (
        <>
          {/* If at bottom, show only Scroll to Top */}
          {isAtBottom && !isAtTop && (
            <button
              id="scrollUpBtn"
              type="button"
              onClick={() => window.scrollToTop()}
              title="Scroll to Top"
              aria-label="Scroll to Top"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/90 dark:bg-slate-800/90 hover:bg-slate-950 dark:hover:bg-slate-700 text-white shadow-lg shadow-slate-950/25 border border-slate-700/60 dark:border-slate-600/60 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group"
            >
              <span className="material-symbols-outlined text-2xl transition-transform group-hover:-translate-y-0.5">
                keyboard_arrow_up
              </span>
            </button>
          )}

          {/* If at top, show only Scroll to Bottom */}
          {isAtTop && !isAtBottom && (
            <button
              id="scrollDownBtn"
              type="button"
              onClick={() => window.scrollToBottom()}
              title="Scroll to Bottom"
              aria-label="Scroll to Bottom"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/90 dark:bg-slate-800/90 hover:bg-slate-950 dark:hover:bg-slate-700 text-white shadow-lg shadow-slate-950/25 border border-slate-700/60 dark:border-slate-600/60 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group"
            >
              <span className="material-symbols-outlined text-2xl transition-transform group-hover:translate-y-0.5">
                keyboard_arrow_down
              </span>
            </button>
          )}

          {/* In the middle, show both in a unified sleek pill dock */}
          {!isAtTop && !isAtBottom && (
            <div className="flex flex-col items-center bg-slate-900/90 dark:bg-slate-800/90 hover:bg-slate-950 dark:hover:bg-slate-700 backdrop-blur-md rounded-full border border-slate-700/60 dark:border-slate-600/60 shadow-lg shadow-slate-950/25 p-1 transition-all duration-200">
              <button
                id="scrollUpBtn"
                type="button"
                onClick={() => window.scrollToTop()}
                title="Scroll to Top"
                aria-label="Scroll to Top"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-slate-200 hover:text-white hover:bg-white/10 transition-all duration-150 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group"
              >
                <span className="material-symbols-outlined text-xl transition-transform group-hover:-translate-y-0.5">
                  keyboard_arrow_up
                </span>
              </button>

              <div className="w-3.5 h-px bg-slate-700/70 dark:bg-slate-600/70 my-0.5" />

              <button
                id="scrollDownBtn"
                type="button"
                onClick={() => window.scrollToBottom()}
                title="Scroll to Bottom"
                aria-label="Scroll to Bottom"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-slate-200 hover:text-white hover:bg-white/10 transition-all duration-150 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group"
              >
                <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-y-0.5">
                  keyboard_arrow_down
                </span>
              </button>
            </div>
          )}
        </>
      )}
    </aside>
  );
}
