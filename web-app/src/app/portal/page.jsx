"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Portal() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("enroll");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [flipKey, setFlipKey] = useState(0);
  const [flipDirection, setFlipDirection] = useState("login");
  const [selectedCourse, setSelectedCourse] = useState("TDC");
  const [isVoucherOpen, setIsVoucherOpen] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [voucherData, setVoucherData] = useState({
    refCode: "SJDS-2024-8842",
    name: "Christian Kyle Dizon",
    course: "Theoretical (TDC - 15 Hours)",
    batch: "Weekend Special (Saturday – Sunday)",
    payment: "Full Payment (Cashier)",
  });

  const handleTabChange = (targetTab) => {
    if (targetTab === activeTab) return;
    setFlipDirection(targetTab);
    setFlipKey((prev) => prev + 1);
    setActiveTab(targetTab);
  };

  useEffect(() => {
    // Expose functions to window for backwards compatibility if needed
    window.switchPortalTab = (tab) => handleTabChange(tab);
    window.closeVoucherModal = () => setIsVoucherOpen(false);
    window.quickLogin = (role) => {
      if (role === "registrar") router.push("/dashboard/operations");
      else if (role === "dispatcher") router.push("/dashboard/scheduling");
      else if (role === "fleet") router.push("/dashboard/fleet");
      else if (role === "cashier") router.push("/dashboard/tuition");
    };

    // Safely parse URL params after mounting to prevent SSR hydration mismatch
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get("tab");
    if (tabParam === "login") {
      setActiveTab("login");
      setFlipDirection("login");
    } else if (tabParam === "enroll") {
      setActiveTab("enroll");
      setFlipDirection("enroll");
    }

    const packageParam = urlParams.get("package");
    const courseParam = urlParams.get("course");
    if (packageParam === "bundle") {
      setSelectedCourse("BUNDLE");
    } else if (courseParam) {
      const c = courseParam.toUpperCase();
      if (c.includes("MT") || c.includes("MANUAL")) setSelectedCourse("PDC-Car-MT");
      else if (c.includes("AT") || c.includes("AUTO")) setSelectedCourse("PDC-Car-AT");
      else if (c.includes("MC") || c.includes("MOTO")) setSelectedCourse("PDC-MC");
      else if (c.includes("BUNDLE")) setSelectedCourse("BUNDLE");
      else if (c.includes("TDC")) setSelectedCourse("TDC");
    }

    const handleAfterPrint = () => {
      document.body.removeAttribute("data-print-target");
    };
    window.addEventListener("afterprint", handleAfterPrint);

    // Auto-redirect if already logged in
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        if (data.user) {
          const role = data.role;
          if (role === "admin" || role === "sysadmin" || role === "registrar" || role === "staff") {
            router.push("/dashboard/operations");
          } else if (role === "cashier") {
            router.push("/dashboard/tuition");
          } else if (role === "dispatcher") {
            router.push("/dashboard/scheduling");
          } else if (role === "fleet") {
            router.push("/dashboard/fleet");
          } else {
            router.push("/dashboard/student");
          }
        }
      } catch (err) {}
    };
    checkSession();

    return () => {
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, [router]);

  const handleEnrollmentSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const first = form.firstName?.value?.trim() || "Student";
    const last = form.lastName?.value?.trim() || "";
    const email = form.email?.value?.trim() || "";
    const password = form.password?.value || "";
    const batch = form.scheduleBatch?.value || "Weekday Regular (Monday – Wednesday)";
    const payment = form.paymentScheme?.value || "Full Payment";

    if (!email || !password) {
      alert("Please provide an email and password to create an account.");
      return;
    }

    const courseLabels = {
      TDC: "Theoretical (TDC - 15 Hours)",
      "PDC-Car-MT": "PDC Sedan - Manual (MT)",
      "PDC-Car-AT": "PDC Sedan - Automatic (AT)",
      "PDC-MC": "PDC Motorcycle (Code A)",
      BUNDLE: "Complete Bundle: TDC 15h + PDC Sedan MT 8h",
    };

    const courseName = courseLabels[selectedCourse] || selectedCourse;
    const applicantName = `${first} ${last}`.trim();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const refCode = `SJDS-2024-${randomNum}`;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstName: first, lastName: last, role: "student" }),
      });
      const data = await res.json();
      if (!data.success) {
        alert("Registration failed: " + data.error);
        return;
      }
    } catch (err) {
      alert("Registration error: " + err.message);
      return;
    }

    setVoucherData({
      refCode,
      name: applicantName,
      course: courseName,
      batch,
      payment,
    });
    setIsVoucherOpen(true);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.loginEmail?.value;
    const password = form.loginPassword?.value;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });
      const data = await res.json();
      
      if (data.success) {
        const role = data.role;
        if (role === "admin" || role === "sysadmin" || role === "registrar" || role === "staff") {
          router.push("/dashboard/operations");
        } else if (role === "cashier") {
          router.push("/dashboard/tuition");
        } else if (role === "dispatcher") {
          router.push("/dashboard/scheduling");
        } else if (role === "fleet") {
          router.push("/dashboard/fleet");
        } else if (role === "instructor") {
          router.push("/dashboard/instructor");
        } else {
          router.push("/dashboard/student");
        }
      } else {
        alert("Login failed: " + data.error);
      }
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  const quickLogin = (role) => {
    if (role === "registrar") router.push("/dashboard/operations");
    else if (role === "dispatcher") router.push("/dashboard/scheduling");
    else if (role === "fleet") router.push("/dashboard/fleet");
    else if (role === "cashier") router.push("/dashboard/tuition");
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 no-print">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-18 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/assets/images/logo.png" alt="St. Joseph Cupertino Logo" className="h-10 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm sm:text-base text-slate-900 leading-tight">
                ST. JOSEPH CUPERTINO
              </span>
              <span className="text-[10px] font-bold tracking-wider text-amber-600 uppercase">
                Online Admission & Management Portal
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Academy Website
            </Link>
            <Link
              href="/dashboard/operations"
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">dashboard</span>
              Staff Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full flex-1">
        {/* Segmented Tab Switcher with 3D Flip Activation */}
        <div className="max-w-xs sm:max-w-sm mx-auto mb-8 bg-slate-200/90 p-1.5 rounded-2xl flex items-center border border-slate-300/70 shadow-inner">
          <button
            id="tab-btn-enroll"
            type="button"
            onClick={() => handleTabChange("enroll")}
            className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs sm:text-sm text-center transition-all duration-200 flex items-center justify-center gap-1.5 ${activeTab === "enroll"
                ? "bg-white text-slate-900 shadow-sm font-extrabold"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
              }`}
          >
            <span className="material-symbols-outlined text-base sm:text-lg">edit_document</span>
            Student Fill-up Form
          </button>
          <button
            id="tab-btn-login"
            type="button"
            onClick={() => handleTabChange("login")}
            className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs sm:text-sm text-center transition-all duration-200 flex items-center justify-center gap-1.5 ${activeTab === "login"
                ? "bg-white text-slate-900 shadow-sm font-extrabold"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
              }`}
          >
            <span className="material-symbols-outlined text-base sm:text-lg text-slate-800">lock</span>
            Account Login
          </button>
        </div>

        {/* 3D Flip Viewport Container */}
        <div key={flipKey} className="portal-flip-viewport">
          {/* TAB 1: Student Admission Fill-up Form */}
          <div id="section-enroll" className={`space-y-6 ${activeTab === "enroll" ? "portal-flip-enroll" : "hidden"}`}>
            {/* Top Minimal Header */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">

                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider bg-slate-100 border border-slate-200 px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-amber-600">shield_lock</span> RA 10173 Data Privacy Protected
                  </span>
                </div>
                <h1 className="font-display text-2xl font-extrabold text-slate-900 mt-2">
                  Student Driver Admission Application
                </h1>
                <p className="text-xs text-slate-500 mt-1 max-w-xl">
                  Please fill out your official details accurately. All submissions are recorded in the St. Joseph Cupertino
                  academic roster and synchronized with Official requirements.
                </p>
              </div>
              <div className="hidden sm:flex flex-col items-end text-right shrink-0">
                <span className="text-[11px] text-slate-400">Current Cohort</span>
                <span className="text-xs font-bold text-slate-800">Batch 48 (Oct 2024)</span>
                <span className="text-[10px] text-emerald-600 font-semibold mt-0.5">● Slots Available</span>
                <button
                  type="button"
                  onClick={() => handleTabChange("login")}
                  className="mt-2 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition-colors inline-flex items-center gap-1 shadow-2xs"
                >
                  <span className="material-symbols-outlined text-xs">lock</span> Account Login →
                </button>
              </div>
            </div>

            {/* Admission Form */}
            <form
              id="enrollmentForm"
              onSubmit={handleEnrollmentSubmit}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-8 text-xs"
            >
              {/* Section 1: Personal Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                    1
                  </span>
                  <div>
                    <h2 className="font-display font-bold text-sm text-slate-900">Student Personal Information</h2>
                    <p className="text-[11px] text-slate-400">
                      Details must match your official PSA Birth Certificate or government ID.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      placeholder="e.g. Christian Kyle"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:border-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Middle Name</label>
                    <input
                      type="text"
                      id="middleName"
                      name="middleName"
                      placeholder="e.g. Santos"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:border-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      placeholder="e.g. Dizon"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:border-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      required
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:border-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      required
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:border-slate-900"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Civil Status</label>
                    <select
                      id="civilStatus"
                      name="civilStatus"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:border-slate-900"
                    >
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Mobile Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="mobileNumber"
                      name="mobileNumber"
                      required
                      placeholder="0917 123 4567"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:border-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="name@example.com"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:border-slate-900"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Create Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      placeholder="••••••••"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:border-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                      placeholder="••••••••"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:border-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Residential Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    placeholder="Purok, Barangay, Tagum City, Davao del Norte"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Emergency Contact Person & Relationship</label>
                    <input
                      type="text"
                      id="emergencyContact"
                      name="emergencyContact"
                      placeholder="e.g. Elena Dizon (Mother)"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:border-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Emergency Contact Number</label>
                    <input
                      type="tel"
                      id="emergencyPhone"
                      name="emergencyPhone"
                      placeholder="0928 987 6543"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:border-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Course Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                    2
                  </span>
                  <div>
                    <h2 className="font-display font-bold text-sm text-slate-900">Course Selection & Official License Goal</h2>
                    <p className="text-[11px] text-slate-400">
                      Select the theoretical or practical course package you are registering for.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${selectedCourse === "TDC" ? "border-slate-900 bg-white" : "border-slate-200 bg-slate-50 hover:border-slate-900"
                      }`}
                  >
                    <input
                      type="radio"
                      name="courseType"
                      value="TDC"
                      checked={selectedCourse === "TDC"}
                      onChange={() => setSelectedCourse("TDC")}
                      className="mt-1 text-slate-900 focus:ring-slate-900"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Theoretical (TDC - 15 Hours)</span>
                        <span className="font-bold text-slate-900">₱1,000</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Mandatory for Student Permit • Classroom / Online module
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${selectedCourse === "PDC-Car-MT" ? "border-slate-900 bg-white" : "border-slate-200 bg-slate-50 hover:border-slate-900"
                      }`}
                  >
                    <input
                      type="radio"
                      name="courseType"
                      value="PDC-Car-MT"
                      checked={selectedCourse === "PDC-Car-MT"}
                      onChange={() => setSelectedCourse("PDC-Car-MT")}
                      className="mt-1 text-slate-900 focus:ring-slate-900"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">PDC Sedan - Manual (MT)</span>
                        <span className="font-bold text-slate-900">₱4,500</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        8 Hours Practical • Dual-control car • Code B (Light Vehicle)
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${selectedCourse === "PDC-Car-AT" ? "border-slate-900 bg-white" : "border-slate-200 bg-slate-50 hover:border-slate-900"
                      }`}
                  >
                    <input
                      type="radio"
                      name="courseType"
                      value="PDC-Car-AT"
                      checked={selectedCourse === "PDC-Car-AT"}
                      onChange={() => setSelectedCourse("PDC-Car-AT")}
                      className="mt-1 text-slate-900 focus:ring-slate-900"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">PDC Sedan - Automatic (AT)</span>
                        <span className="font-bold text-slate-900">₱5,000</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        8 Hours Practical • Automatic sedan • Code B (Light Vehicle)
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${selectedCourse === "PDC-MC" ? "border-slate-900 bg-white" : "border-slate-200 bg-slate-50 hover:border-slate-900"
                      }`}
                  >
                    <input
                      type="radio"
                      name="courseType"
                      value="PDC-MC"
                      checked={selectedCourse === "PDC-MC"}
                      onChange={() => setSelectedCourse("PDC-MC")}
                      className="mt-1 text-slate-900 focus:ring-slate-900"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">PDC Motorcycle (Code A)</span>
                        <span className="font-bold text-slate-900">₱2,500</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">8 Hours Practical • Scooter or Manual Clutch</p>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer md:col-span-2 ${selectedCourse === "BUNDLE" ? "border-slate-900 bg-white" : "border-slate-200 bg-slate-50 hover:border-slate-900"
                      }`}
                  >
                    <input
                      type="radio"
                      name="courseType"
                      value="BUNDLE"
                      checked={selectedCourse === "BUNDLE"}
                      onChange={() => setSelectedCourse("BUNDLE")}
                      className="mt-1 text-slate-900 focus:ring-slate-900"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Complete Bundle: TDC 15h + PDC Sedan MT 8h</span>
                        <span className="font-bold text-amber-700">₱4,500 (SAVE ₱1,000)</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        All-in fast-track bundle from zero driving knowledge to Non-Pro driver's license.
                      </p>
                    </div>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Government Portal Client ID (Optional)</label>
                    <input
                      type="text"
                      id="ltmsId"
                      name="ltmsId"
                      placeholder="e.g. 24-00192841"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:border-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Student Permit Number (For PDC applicants)
                    </label>
                    <input
                      type="text"
                      id="spNumber"
                      name="spNumber"
                      placeholder="e.g. SP-D11-24-0982"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:border-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Schedule Preferences */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                    3
                  </span>
                  <div>
                    <h2 className="font-display font-bold text-sm text-slate-900">Schedule Batch & Time Window</h2>
                    <p className="text-[11px] text-slate-400">Choose your preferred training batch and availability.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Preferred Day Batch <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="scheduleBatch"
                      name="scheduleBatch"
                      required
                      defaultValue="Weekday Regular (Monday - Wednesday)"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:border-slate-900"
                    >
                      <option value="Weekday Regular (Monday - Wednesday)">Weekday Regular (Monday – Wednesday)</option>
                      <option value="Weekday Mid (Thursday - Friday)">Weekday Mid (Thursday – Friday)</option>
                      <option value="Weekend Special (Saturday - Sunday)">Weekend Special (Saturday – Sunday)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Preferred Time Window <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="scheduleTime"
                      name="scheduleTime"
                      required
                      defaultValue="Morning Session (08:00 AM - 12:00 PM)"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:border-slate-900"
                    >
                      <option value="Morning Session (08:00 AM - 12:00 PM)">Morning Session (08:00 AM – 12:00 PM)</option>
                      <option value="Afternoon Session (01:00 PM - 05:00 PM)">Afternoon Session (01:00 PM – 05:00 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 4: Document Checklist & Payment Terms */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                    4
                  </span>
                  <div>
                    <h2 className="font-display font-bold text-sm text-slate-900">Requirements Verification & Payment Terms</h2>
                    <p className="text-[11px] text-slate-400">
                      Please confirm document availability and your payment preference.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <p className="font-bold text-slate-800">
                    Required Documents Checklist (Bring original or photocopy on Day 1):
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-slate-600">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="text-slate-900 rounded focus:ring-slate-900" />
                      <span>PSA Birth Certificate</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="text-slate-900 rounded focus:ring-slate-900" />
                      <span>Valid Government ID</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="text-slate-900 rounded focus:ring-slate-900" />
                      <span>Official Medical Exam Slip</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Payment Scheme <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="paymentScheme"
                      name="paymentScheme"
                      required
                      defaultValue="Full Payment"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:border-slate-900"
                    >
                      <option value="Full Payment">Full Payment (Cashier)</option>
                      <option value="50% Downpayment">50% Downpayment (Balance before certificate release)</option>
                      <option value="Installment">Installment Scheme (Per-session billing arrangement)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">How did you hear about us?</label>
                    <select
                      id="referral"
                      name="referral"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:border-slate-900"
                    >
                      <option>Facebook Page / Online</option>
                      <option>Friend / Relative Referral</option>
                      <option>Official Tagum District Office recommendation</option>
                      <option>Campus Signboard / Walk-in</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[11px] text-slate-400 text-center sm:text-left">
                  By submitting, you certify that the information entered is accurate under Official regulations.
                </p>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-slate-900 text-white font-bold text-xs shadow-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-amber-400 text-base">task_alt</span>
                  Submit Online Admission
                </button>
              </div>
            </form>
          </div>

          {/* TAB 2: Staff & User Login Portal */}
          <div id="section-login" className={`max-w-md mx-auto space-y-6 ${activeTab === "login" ? "portal-flip-login" : "hidden"}`}>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 sm:p-8 space-y-6 relative overflow-hidden">
              {/* Subtle decorative security top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-slate-900 to-amber-500"></div>

              <div className="text-center space-y-2 pt-1">
                <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-slate-50 border border-slate-100 shadow-2xs mb-1">
                  <img src="/assets/images/logo.png" alt="St. Joseph Cupertino Logo" className="h-12 w-auto object-contain mx-auto" />
                </div>
                <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">
                  Portal Login
                </h2>
                <p className="text-xs text-slate-500 font-normal">
                  Sign in to access your dashboard
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">Email or Username</label>
                  <input
                    type="text"
                    id="loginEmail"
                    name="loginEmail"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/60 border border-slate-300 text-slate-900 focus:bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                    placeholder="name@example.com"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block font-semibold text-slate-700">Password</label>
                    <button
                      type="button"
                      onClick={() => {
                        setForgotSent(true);
                        setTimeout(() => setForgotSent(false), 5000);
                      }}
                      className="text-[11px] font-semibold text-amber-600 hover:text-amber-700 hover:underline"
                    >
                      Forgot?
                    </button>
                  </div>

                  {forgotSent && (
                    <div className="mb-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium flex items-center gap-1.5 animate-in fade-in">
                      <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
                      <span>Reset instructions dispatched to registered IT admin email.</span>
                    </div>
                  )}

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="loginPassword"
                      name="loginPassword"
                      required
                      value={passwordValue}
                      onChange={(e) => setPasswordValue(e.target.value)}
                      onCopy={(e) => {
                        e.preventDefault();
                        if (typeof window !== 'undefined' && window.showDataProtectionNotice) {
                          window.showDataProtectionNotice("Credential Protection", "Copying passwords or security credentials is blocked for account security.", "lock");
                        }
                      }}
                      className="w-full pl-3.5 pr-11 py-2.5 rounded-xl bg-slate-50/60 border border-slate-300 text-slate-900 focus:bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-slate-400"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-slate-600 pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer font-medium">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded text-slate-900 border-slate-300 focus:ring-slate-900 accent-slate-900"
                    />
                    <span>Remember login</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group mt-2"
                >
                  <span>Sign In to Dashboard</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                </button>
              </form>

              {/* Quick Switch to Student Admission */}
              <div className="text-center pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleTabChange("enroll")}
                  className="text-xs text-slate-500 hover:text-slate-900 font-medium inline-flex items-center gap-1.5 transition-colors py-1 group"
                >
                  <span className="material-symbols-outlined text-base text-slate-400 group-hover:text-slate-700">edit_document</span>
                  <span>Student applicant? Switch to Admission Fill-up Form</span>
                </button>
              </div>


            </div>
          </div>
        </div>
      </main>

      {/* Admission Voucher Confirmation Modal */}
      {isVoucherOpen && (
        <div
          id="voucherModal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="voucherModalTitle"
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="print-header hidden pb-3 border-b-2 border-slate-900 mb-3 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <img src="/assets/images/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
                <span className="font-display font-extrabold text-sm text-slate-900 tracking-tight">ST. JOSEPH CUPERTINO DRIVING SCHOOL</span>
              </div>
              <p className="text-[10px] text-slate-600 font-medium">Tagum City Main Campus • St. Pio Building, Purok Magsanoc, Mankilam • LTO Accreditation No. DS-2020-00019-11</p>
              <p className="text-[11px] font-bold text-slate-900 uppercase tracking-wider mt-1">Official Student Admission Voucher Slip</p>
            </div>

            <div className="flex items-start justify-between pb-3 border-b border-slate-100 no-print">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                </div>
                <div>
                  <h3 id="voucherModalTitle" className="font-display font-bold text-sm text-slate-900">Application Submitted</h3>
                  <p className="text-[11px] text-slate-500">St. Joseph Cupertino Driving School</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsVoucherOpen(false)}
                aria-label="Close admission voucher modal"
                className="text-slate-400 hover:text-slate-700 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none rounded no-print"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Application Reference:</span>
                <span id="voucherRef" className="font-mono font-bold text-slate-900">
                  {voucherData.refCode}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Student Name:</span>
                <span id="voucherName" className="font-bold text-slate-800">
                  {voucherData.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Course:</span>
                <span id="voucherCourse" className="font-semibold text-slate-900">
                  {voucherData.course}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Batch:</span>
                <span id="voucherSchedule" className="text-slate-800">
                  {voucherData.batch}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Payment Scheme:</span>
                <span id="voucherPayment" className="font-semibold text-slate-900">
                  {voucherData.payment}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <span className="text-slate-500">Status:</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  PENDING CASHIER / REGISTRAR
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Please present this voucher reference code upon arrival at the Tagum campus registrar.
            </p>

            <div className="print-footer hidden pt-3 border-t border-slate-200 text-[9px] text-slate-500 justify-between">
              <span>Presented to Registrar upon arrival</span>
              <span>Valid for 2024 Academic Term • St. Joseph Cupertino Driving School</span>
            </div>

            <div className="flex items-center gap-2 pt-2 no-print">
              <button
                type="button"
                onClick={() => {
                  document.body.setAttribute("data-print-target", "voucher");
                  window.print();
                }}
                className="flex-1 py-2 rounded-lg border border-slate-300 text-slate-800 font-semibold text-xs hover:bg-slate-100 flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">print</span>
                Print Voucher Slip
              </button>
              <Link
                href="/dashboard/students"
                className="flex-1 py-2 rounded-lg bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 text-center block"
              >
                View in Student Roster →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Minimal Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2024 St. Joseph Cupertino Driving School. Tagum City Campus.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-slate-900">
              Website Home
            </Link>
            <span>•</span>
            <Link href="/dashboard/operations" className="hover:text-slate-900">
              Operations Suite
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}