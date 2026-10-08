"use client";
import { useState, useEffect, useRef } from "react";

export default function ConfirmDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({
    title: "Confirm Action",
    message: "Are you sure you want to proceed with this action?",
    badge: "Verification Required",
    type: "warning", // "danger", "warning", "primary", "success"
    confirmText: "Confirm",
    cancelText: "Cancel",
    details: [], // [{ label: "Student", value: "Joshua Tan" }]
  });

  const resolverRef = useRef(null);
  const confirmBtnRef = useRef(null);
  const cancelBtnRef = useRef(null);

  useEffect(() => {
    // Expose global helper on window for all dashboard & portal scripts
    window.showConfirmDialog = (options = {}) => {
      return new Promise((resolve) => {
        resolverRef.current = (result) => {
          if (result && typeof options.onConfirm === "function") {
            options.onConfirm();
          } else if (!result && typeof options.onCancel === "function") {
            options.onCancel();
          }
          resolve(result);
        };

        setConfig({
          title: options.title || "Confirm Action",
          message: options.message || "Are you sure you want to proceed?",
          badge: options.badge || (options.type === "danger" ? "Irreversible Action" : "Verification Required"),
          type: options.type || "warning",
          confirmText: options.confirmText || (options.type === "danger" ? "Delete / Revoke" : "Confirm & Proceed"),
          cancelText: options.cancelText || "Cancel",
          details: options.details || [],
        });

        setIsOpen(true);
      });
    };

    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        handleCancel();
      } else if (e.key === "Enter" && !e.shiftKey) {
        if (document.activeElement !== cancelBtnRef.current) {
          e.preventDefault();
          handleConfirm();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        if (config.type === "danger") {
          cancelBtnRef.current?.focus();
        } else {
          confirmBtnRef.current?.focus();
        }
      }, 50);
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, config.type]);

  const handleConfirm = () => {
    setIsOpen(false);
    if (resolverRef.current) resolverRef.current(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (resolverRef.current) resolverRef.current(false);
  };

  if (!isOpen) return null;

  const isDanger = config.type === "danger";
  const isPrimary = config.type === "primary";
  const isSuccess = config.type === "success";

  const iconName = isDanger
    ? "delete_forever"
    : isSuccess
    ? "check_circle"
    : isPrimary
    ? "fact_check"
    : "warning";

  const iconBg = isDanger
    ? "bg-rose-100 text-rose-700 border border-rose-200"
    : isSuccess
    ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
    : isPrimary
    ? "bg-slate-900 text-white"
    : "bg-amber-100 text-amber-700 border border-amber-200";

  const badgeClass = isDanger
    ? "bg-rose-50 text-rose-700 border-rose-200"
    : isSuccess
    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : isPrimary
    ? "bg-slate-100 text-slate-800 border-slate-200"
    : "bg-amber-50 text-amber-800 border-amber-200";

  const confirmBtnClass = isDanger
    ? "bg-rose-600 hover:bg-rose-700 focus-visible:ring-rose-500 text-white"
    : isSuccess
    ? "bg-emerald-600 hover:bg-emerald-700 focus-visible:ring-emerald-500 text-white"
    : "bg-slate-900 hover:bg-slate-800 focus-visible:ring-slate-900 text-white";

  return (
    <div
      id="globalConfirmModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmDialogTitle"
      aria-describedby="confirmDialogDesc"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleCancel();
      }}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150"
        role="document"
      >
        <div className="flex items-start gap-3.5">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">
              {iconName}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${badgeClass}`}>
                {config.badge}
              </span>
            </div>
            <h3 id="confirmDialogTitle" className="font-display font-extrabold text-base text-slate-900 tracking-tight">
              {config.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleCancel}
            aria-label="Close confirmation dialog"
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
          >
            <span className="material-symbols-outlined text-lg" aria-hidden="true">close</span>
          </button>
        </div>

        <p id="confirmDialogDesc" className="text-xs text-slate-600 leading-relaxed">
          {config.message}
        </p>

        {config.details && config.details.length > 0 && (
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 text-xs space-y-1.5 font-mono">
            {config.details.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-2 text-slate-700">
                <span className="text-slate-500 font-sans text-[11px] font-medium">{item.label}:</span>
                <span className="font-bold text-slate-900 truncate max-w-[220px]">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="pt-2 flex items-center justify-end gap-2.5">
          <button
            ref={cancelBtnRef}
            type="button"
            onClick={handleCancel}
            className="px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
          >
            {config.cancelText}
          </button>
          <button
            ref={confirmBtnRef}
            type="button"
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-lg font-semibold text-xs transition-all shadow-xs flex items-center gap-1.5 focus-visible:ring-2 focus-visible:outline-none ${confirmBtnClass}`}
          >
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              {isDanger ? "delete" : "check"}
            </span>
            {config.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
