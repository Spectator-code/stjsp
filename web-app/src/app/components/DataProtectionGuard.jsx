"use client";

import { useState, useEffect, useRef } from "react";

export default function DataProtectionGuard() {
  const [alertInfo, setAlertInfo] = useState({
    visible: false,
    title: "Data Protection Active",
    message: "Copying student records and academy data is restricted under Republic Act 10173 (Data Privacy Act).",
    icon: "shield_lock",
  });
  const timeoutRef = useRef(null);

  const showProtectionNotice = (title, message, icon = "shield_lock") => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setAlertInfo({ visible: true, title, message, icon });
    timeoutRef.current = setTimeout(() => {
      setAlertInfo((prev) => ({ ...prev, visible: false }));
    }, 3800);
  };

  useEffect(() => {
    // Expose manual protection notification for any component
    window.showDataProtectionNotice = showProtectionNotice;

    // 1. Intercept Copy events
    const handleCopy = (e) => {
      const activeEl = document.activeElement;
      const isInput =
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.isContentEditable);

      // Block copying page text/records, or copying password fields
      if (!isInput || activeEl.type === "password") {
        e.preventDefault();
        if (e.clipboardData) {
          e.clipboardData.setData(
            "text/plain",
            "PROTECTED RECORD: St. Joseph Cupertino Driving School records are confidential and protected under Republic Act 10173 (Data Privacy Act of 2012). Unauthorized duplication or distribution is strictly prohibited."
          );
        }
        showProtectionNotice(
          "Data Protection Active",
          "Copying student records, financial ledgers, and academy data is restricted under Republic Act 10173.",
          "shield_lock"
        );
      }
    };

    // 2. Intercept Cut events
    const handleCut = (e) => {
      const activeEl = document.activeElement;
      const isInput =
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.isContentEditable);

      if (!isInput) {
        e.preventDefault();
        showProtectionNotice(
          "Action Prohibited",
          "Cutting or extracting confidential records is disabled for institutional data integrity.",
          "content_cut"
        );
      }
    };

    // 3. Intercept Context Menu (Right Click) on non-input elements
    const handleContextMenu = (e) => {
      const target = e.target;
      const isInput =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if (!isInput) {
        e.preventDefault();
        showProtectionNotice(
          "Content Protected",
          "Right-click context copying is disabled to protect student PII and official academy records.",
          "lock"
        );
      }
    };

    // 4. Intercept Keyboard Shortcuts (Ctrl+C, Ctrl+A, Ctrl+X, Ctrl+S)
    const handleKeyDown = (e) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      if (!isCtrlOrCmd) return;

      const activeEl = document.activeElement;
      const isInput =
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.isContentEditable);

      const key = e.key.toLowerCase();

      // Prevent Ctrl + A (Select All) outside of form fields
      if (key === "a" && !isInput) {
        e.preventDefault();
        showProtectionNotice(
          "Bulk Selection Restricted",
          "Select-All is disabled across records to prevent unauthorized bulk data scraping.",
          "security"
        );
        return;
      }

      // Prevent Ctrl + C (Copy) outside of form fields
      if (key === "c" && !isInput) {
        e.preventDefault();
        showProtectionNotice(
          "Clipboard Copy Restricted",
          "Direct copying is restricted under Philippine Data Privacy compliance (RA 10173).",
          "content_paste_off"
        );
        return;
      }

      // Prevent Ctrl + X (Cut) outside of form fields
      if (key === "x" && !isInput) {
        e.preventDefault();
        showProtectionNotice(
          "Action Prohibited",
          "Extracting data is disabled for institutional records protection.",
          "content_cut"
        );
        return;
      }

      // Prevent Ctrl + S (Save Page Offline)
      if (key === "s") {
        e.preventDefault();
        showProtectionNotice(
          "Offline Saving Restricted",
          "Saving webpage snapshots offline is prohibited to protect student privacy.",
          "save"
        );
        return;
      }
    };

    // 5. Intercept Drag & Drop selection
    const handleDragStart = (e) => {
      const target = e.target;
      const isInput =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA");
      if (!isInput) {
        e.preventDefault();
      }
    };

    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCut);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("dragstart", handleDragStart);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      id="dataProtectionAlert"
      role="status"
      aria-live="polite"
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-[999999] transition-all duration-300 pointer-events-none select-none no-print ${
        alertInfo.visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 -translate-y-4 scale-95"
      }`}
    >
      <div className="flex items-center gap-3 px-4 py-3 bg-slate-950/95 text-white rounded-xl shadow-2xl border border-amber-500/30 backdrop-blur-md max-w-md pointer-events-auto">
        <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
          <span className="material-symbols-outlined text-lg">
            {alertInfo.icon}
          </span>
        </div>
        <div className="flex flex-col text-left">
          <span className="font-display font-bold text-xs text-amber-300">
            {alertInfo.title}
          </span>
          <p className="text-[11px] text-slate-300 leading-tight mt-0.5">
            {alertInfo.message}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setAlertInfo((prev) => ({ ...prev, visible: false }))}
          className="ml-2 text-slate-400 hover:text-white p-1 rounded-md transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
          aria-label="Dismiss security notice"
        >
          <span className="material-symbols-outlined text-base">close</span>
        </button>
      </div>
    </div>
  );
}
