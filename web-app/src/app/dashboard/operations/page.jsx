"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Operations() {
  function showToast(title, msg) {
    const toast = document.getElementById('opToast');
    if (!toast) return;
    const tt = document.getElementById('opToastTitle'); if (tt) tt.textContent = title;
    const tm = document.getElementById('opToastMsg'); if (tm) tm.textContent = msg;
    toast.classList.remove('translate-y-32');
    setTimeout(() => { toast.classList.add('translate-y-32'); }, 4000);
  }

  function showSessionLog(student = 'Joshua Tan', unit = 'Toyota Vios #03 (MT)', loc = 'Tagum Bypass Road Circuit', speed = '38 km/h', sensors = 'Dual Brakes Active') {
    const sEl = document.getElementById('tStudent');
    if (sEl) sEl.textContent = student;
    const uEl = document.getElementById('tUnit');
    if (uEl) uEl.textContent = unit;
    const lEl = document.getElementById('tLoc');
    if (lEl) lEl.textContent = loc;
    const spEl = document.getElementById('tSpeed');
    if (spEl) spEl.textContent = speed;
    const senEl = document.getElementById('tSensors');
    if (senEl) senEl.textContent = sensors;
    const m = document.getElementById('sessionModal');
    if (m) m.classList.remove('hidden');
  }

  function showChecklistModal(student, unit) {
    showToast("Pre-Trip Inspection Verified", "Dual-control pedals and BLOWBAGETS routine passed for " + student + " on " + unit);
  }

  function dispatchCar(unit, student) {
    showToast("Unit Dispatched", unit + " cleared for " + student + ". Road timer started.");
  }

  function showAssessmentModal(student, score, instructor) {
    showToast("Assessment Record", student + " scored " + score + " under " + instructor + ". Eligible for graduation.");
  }

  function openSmsModal(students = 'E. Ramos, J. Beltran, A. Solis', phones = '0917-554-9021, 0928-112-4820, 0995-882-1940') {
    const rEl = document.getElementById('smsRecipients');
    if (rEl) rEl.value = `${students} (${phones})`;
    const cEl = document.getElementById('smsContent');
    if (cEl) cEl.value = `[ST. JOSEPH CUPERTINO DRIVING SCHOOL] Reminder for ${students}: Your scheduled practical driving lesson requires mandatory PSA Birth Certificate & Student Permit verification at the registrar before road dispatch. Please visit Pioneer Ave campus or call (084) 216-8942.`;
    const m = document.getElementById('smsModal');
    if (m) m.classList.remove('hidden');
  }

  function dispatchSmsBroadcast() {
    closeModal('smsModal');
    showToast("SMS Broadcast Transmitted", "3 SMS dispatches delivered via LTO-SMS Gateway 11. Carrier timestamps logged.");
  }

  function sendSmsAlert(students) {
    openSmsModal(students);
  }

  function triggerExport(name) {
    showToast("Exporting File", "Generating " + name + " in PDF and CSV format...");
  }

  function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  }

  function filterRunsTable(val) {
    const q = (val || '').toLowerCase().trim();
    const rows = document.querySelectorAll('#runsTableBody tr');
    rows.forEach(r => {
      r.style.display = r.innerText.toLowerCase().includes(q) ? '' : 'none';
    });
  }

  useEffect(() => {
    window.showToast = showToast;
    window.showSessionLog = showSessionLog;
    window.showChecklistModal = showChecklistModal;
    window.dispatchCar = dispatchCar;
    window.showAssessmentModal = showAssessmentModal;
    window.sendSmsAlert = sendSmsAlert;
    window.openSmsModal = openSmsModal;
    window.dispatchSmsBroadcast = dispatchSmsBroadcast;
    window.triggerExport = triggerExport;
    window.closeModal = closeModal;
    window.filterRunsTable = filterRunsTable;
  }, []);

  return (
    <>


      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 z-50 flex flex-col justify-between">
        <div className="flex flex-col">
          {/* Logo Header */}
          <div className="h-16 px-5 border-b border-slate-100 flex items-center gap-3">
            <img src="/assets/images/logo.png" alt="St. Joseph Cupertino Logo" className="h-9 w-9 aspect-square rounded-lg object-cover mix-blend-multiply" />
            <div className="flex flex-col min-w-0">
              <span className="font-display text-xs font-extrabold text-slate-900 tracking-tight truncate">ST. JOSEPH CUPERTINO</span>
              <span className="text-[10px] text-amber-600 font-bold uppercase tracking-wider truncate">Driving School • Tagum</span>
            </div>
          </div>

          {/* Campus Tag */}
          <div className="px-4 py-3">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="material-symbols-outlined text-sm text-amber-600">location_on</span>
                <span className="font-medium truncate">Pioneer Ave Campus</span>
              </div>
              <span className="text-[10px] bg-white border border-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-semibold">LTO 11-04</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="px-3 pt-1">
            <div className="px-3 pb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Core Management</span>
            </div>
            <nav className="space-y-1 text-xs">
              <Link href="/dashboard/operations" className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-900 text-white font-medium transition-colors shadow-xs">
                <span className="material-symbols-outlined text-base">dashboard</span>
                Operations Dashboard
              </Link>
              <Link href="/dashboard/scheduling" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors font-medium">
                <span className="material-symbols-outlined text-base">calendar_month</span>
                Scheduling & Dispatch
              </Link>
              <Link href="/dashboard/students" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors font-medium">
                <span className="material-symbols-outlined text-base">school</span>
                Students & Progress
              </Link>
              <Link href="/dashboard/tuition" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors font-medium">
                <span className="material-symbols-outlined text-base">receipt_long</span>
                Tuition & Payments
              </Link>
              <Link href="/dashboard/fleet" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors font-medium">
                <span className="material-symbols-outlined text-base">directions_car</span>
                Fleet & Instructors
              </Link>
              <Link href="/dashboard/reports" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors font-medium">
                <span className="material-symbols-outlined text-base">verified_user</span>
                Reports & Compliance
              </Link>

              <div className="pt-3 my-2 border-t border-slate-100"></div>

              <Link href="/" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors font-medium">
                <span className="material-symbols-outlined text-base">public</span>
                Public Website
              </Link>
              <Link href="/portal?tab=login" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors font-medium">
                <span className="material-symbols-outlined text-base">logout</span>
                Sign Out
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom System Status */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-600 font-medium">LTO Cloud Sync</span>
            </div>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-bold">ONLINE</span>
          </div>
        </div>
      </aside>

      {/* Top Header */}
      <header className="fixed top-0 left-64 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 z-40 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Tagum Main Campus</span>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-slate-800">Operations Dashboard</span>
          </div>

          {/* Quick Search Bar */}
          <div className="relative hidden lg:block w-72">
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-slate-400 text-sm">search</span>
            <input id="topSearch" onInput={(e) => window.filterRunsTable(e.target.value)} type="text" placeholder="Search student, plate, instructor..." className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Sync Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200/70 text-xs text-slate-600">
            <span className="material-symbols-outlined text-sm text-slate-700">commute</span>
            <span>Fleet: <strong className="text-slate-900">12/14</strong> Ready</span>
            <span className="text-slate-300">•</span>
            <span><strong className="text-slate-900">8</strong> Active Runs</span>
          </div>

          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50/80 border border-emerald-200/60 text-xs text-emerald-800 font-medium">
            <span className="material-symbols-outlined text-sm text-emerald-600">shield_lock</span>
            <span>RA 10173 Protected</span>
          </div>

          {/* Website Link */}
          <a href="/" className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors hidden sm:inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Public Site
          </a>

          {/* Profile */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
              ME
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-900 leading-tight">Maria Elena Santos</span>
              <span className="text-[10px] text-slate-500">Registrar & Operations Admin</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="ml-64 pt-16 min-h-screen bg-slate-50 overflow-x-hidden">
        <div className="p-6 sm:p-8 pb-32 sm:pb-36 space-y-6 max-w-7xl mx-auto xl:max-w-none">

          {/* Welcome Banner */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">Tagum Campus Terminal</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-emerald-700 flex items-center gap-1 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Real-Time Fleet & Dispatch Feeds
                </span>
              </div>
              <h1 className="font-display text-2xl font-extrabold text-slate-900 tracking-tight">Welcome back, Maria Elena</h1>
              <p className="text-xs text-slate-500 mt-0.5">Thursday, October 24, 2024 • Tagum Training Ground & Highway Hub Overview</p>
            </div>

            <div className="flex items-center gap-2">
              <a href="/dashboard/scheduling" className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs">
                <span className="material-symbols-outlined text-sm">add_circle</span>
                Dispatch Session
              </a>
              <a href="/dashboard/students" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs">
                <span className="material-symbols-outlined text-sm">person_add</span>
                New Student
              </a>
            </div>
          </section>

          {/* 4 Bento KPI Metric Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Metric 1: Active Enrolled Students */}
            <a href="/dashboard/students" className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-colors flex flex-col justify-between group">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Enrollment Cadence</span>
                  <h3 className="text-xs font-bold text-slate-700 mt-0.5 group-hover:text-slate-900">Active Students</h3>
                </div>
                <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">groups</span>
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">148</span>
                <span className="text-xs font-bold text-emerald-600 flex items-center">
                  <span className="material-symbols-outlined text-sm">trending_up</span> +12%
                </span>
                <span className="text-[11px] text-slate-400">vs last mo.</span>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span><strong className="text-slate-900">82</strong> PDC Car</span>
                <span className="text-slate-200">•</span>
                <span><strong className="text-slate-900">38</strong> PDC Moto</span>
                <span className="text-slate-200">•</span>
                <span><strong className="text-slate-900">28</strong> TDC</span>
              </div>
            </a>

            {/* Metric 2: Scheduled Sessions Today */}
            <a href="/dashboard/scheduling" className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-colors flex flex-col justify-between group">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Today's Schedule</span>
                  <h3 className="text-xs font-bold text-slate-700 mt-0.5 group-hover:text-slate-900">Sessions Slotted</h3>
                </div>
                <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">calendar_today</span>
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">36</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  94% Utilized
                </span>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span><strong className="text-slate-900">34</strong> Road Runs</span>
                <span className="text-slate-200">•</span>
                <span><strong className="text-slate-900">2</strong> TDC Classroom</span>
              </div>
            </a>

            {/* Metric 3: Fleet Deployment */}
            <a href="/dashboard/fleet" className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-colors flex flex-col justify-between group">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dual-Control Fleet</span>
                  <h3 className="text-xs font-bold text-slate-700 mt-0.5 group-hover:text-slate-900">Vehicles Active</h3>
                </div>
                <div className="w-9 h-9 rounded-lg bg-slate-100 text-amber-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">speed</span>
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">12</span>
                <span className="text-base text-slate-400 font-medium">/ 14</span>
                <span className="text-xs font-medium text-slate-500 ml-1">Road-Ready</span>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>12 Dispatched</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-600">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>2 In Routine PMS</span>
                </div>
              </div>
            </a>

            {/* Metric 4: Daily Tuition Collections */}
            <a href="/dashboard/tuition" className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-colors flex flex-col justify-between group">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Billing & Cashier</span>
                  <h3 className="text-xs font-bold text-slate-700 mt-0.5 group-hover:text-slate-900">Daily Collections</h3>
                </div>
                <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">receipt_long</span>
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">₱46,500</span>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span><strong className="text-slate-900">8</strong> Settled Today</span>
                <span className="text-slate-200">•</span>
                <span className="text-amber-600 font-semibold">8 Pending Balances</span>
              </div>
            </a>

          </section>

          {/* Real-Time Telematics & GPS Speed Telemetry Radar */}
          <section className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <span className="material-symbols-outlined text-xl">satellite_alt</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-base font-bold text-white tracking-tight">Tagum Highway & Bypass Training Corridor Telematics</h2>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      LIVE TELEMETRY
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">Dual-control pedal telematics, corridor geofence compliance, and live GPS speed telemetry.</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">Corridor Speed Limit: <strong className="text-amber-400 font-bold">40 km/h</strong></span>
              </div>
            </div>

            {/* Active Telemetry Stream Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 relative z-10">
              {/* Telemetry Car 1 */}
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-white">Toyota Vios #03 (MT)</span>
                    <div className="text-[10px] font-mono text-slate-400">Plate: ABC-4291 • Joshua Tan</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Normal</span>
                </div>
                <div className="flex items-baseline justify-between pt-1">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-3xl font-extrabold text-amber-400">38</span>
                    <span className="text-xs text-slate-400 font-mono">km/h</span>
                  </div>
                  <div className="text-right text-[10px] text-slate-400">
                    <div>RPM: <strong className="text-slate-200 font-mono">2,150</strong></div>
                    <div>Brake: <strong className="text-emerald-400">Dual Active</strong></div>
                  </div>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-400 to-amber-400 h-1.5 rounded-full" style={{ width: "76%" }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 pt-0.5">
                  <span>Tagum Bypass km 4.2</span>
                  <span className="text-emerald-400 flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-xs">gps_fixed</span> GPS Locked
                  </span>
                </div>
              </div>

              {/* Telemetry Car 2 */}
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-white">Mitsubishi Mirage #05 (AT)</span>
                    <div className="text-[10px] font-mono text-slate-400">Plate: NDB-7712 • Katherine Yap</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Normal</span>
                </div>
                <div className="flex items-baseline justify-between pt-1">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-3xl font-extrabold text-amber-400">26</span>
                    <span className="text-xs text-slate-400 font-mono">km/h</span>
                  </div>
                  <div className="text-right text-[10px] text-slate-400">
                    <div>RPM: <strong className="text-slate-200 font-mono">1,600</strong></div>
                    <div>Brake: <strong className="text-emerald-400">Dual Active</strong></div>
                  </div>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-400 to-amber-400 h-1.5 rounded-full" style={{ width: "52%" }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 pt-0.5">
                  <span>South National Highway</span>
                  <span className="text-emerald-400 flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-xs">gps_fixed</span> GPS Locked
                  </span>
                </div>
              </div>

              {/* Telemetry Car 3 */}
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-white">Toyota Vios #01 (MT)</span>
                    <div className="text-[10px] font-mono text-slate-400">Plate: ZAA-1982 • Bay 1 Circuit</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">Maneuvering</span>
                </div>
                <div className="flex items-baseline justify-between pt-1">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-3xl font-extrabold text-amber-400">12</span>
                    <span className="text-xs text-slate-400 font-mono">km/h</span>
                  </div>
                  <div className="text-right text-[10px] text-slate-400">
                    <div>RPM: <strong className="text-slate-200 font-mono">1,100</strong></div>
                    <div>Reverse: <strong className="text-amber-400">Engaged</strong></div>
                  </div>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-400 to-amber-400 h-1.5 rounded-full" style={{ width: "24%" }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 pt-0.5">
                  <span>Campus Parking Bay A</span>
                  <span className="text-emerald-400 flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-xs">gps_fixed</span> GPS Locked
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Operational Flight Deck Table / Active Practical Runs */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-base font-bold text-slate-900">Daily Training Schedule</h2>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider">Live Runs</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Overview of scheduled practical driving sessions, instructor assignments, and training routes.</p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-60">
                  <span className="material-symbols-outlined absolute left-2.5 top-2 text-slate-400 text-sm">filter_list</span>
                  <input id="runsSearch" onInput={(e) => window.filterRunsTable(e.target.value)} type="text" placeholder="Filter vehicle, student..." className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900" />
                </div>
                <button onClick={() => { window.triggerExport('Daily Dispatch Matrix') }} className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors" title="Export Daily Matrix">
                  <span className="material-symbols-outlined text-lg">download</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto text-left text-xs">
                <thead className="bg-slate-50/75 border-b border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4 whitespace-nowrap">Time Slot</th>
                    <th className="py-3 px-4 whitespace-nowrap">Student & Target</th>
                    <th className="py-3 px-4 whitespace-nowrap">Instructor</th>
                    <th className="py-3 px-4 whitespace-nowrap">Vehicle Unit</th>
                    <th className="py-3 px-4 whitespace-nowrap">Training Route / Module</th>
                    <th className="py-3 px-4 text-center whitespace-nowrap">Status</th>
                    <th className="py-3 px-4 text-right whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody id="runsTableBody" className="divide-y divide-slate-100">

                  {/* Row 1: In-Transit */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-mono font-bold text-slate-900 text-xs">08:00 - 10:00</div>
                      <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                        Session Ongoing
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">Joshua Tan</div>
                      <div className="text-slate-500 text-[11px]">PDC Sedan (Manual)</div>
                      <div className="text-[10px] text-slate-400 font-mono">SP: D02-23-019842</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center">RD</div>
                        <div>
                          <div className="font-semibold text-slate-800">Engr. Roberto Dalisay</div>
                          <div className="text-[10px] text-slate-400">INST-9021</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-900 flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-slate-400">directions_car</span>
                        Toyota Vios #03 (MT)
                      </div>
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono font-medium">ABC-4291</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">Tagum Bypass Road Circuit</div>
                      <div className="text-[10px] text-slate-400">Parallel Maneuvers & Hill Start Stage 3</div>
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold inline-flex items-center gap-1">
                        In Progress
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button onClick={() => { if (typeof window !== 'undefined' && window.showSessionLog) window.showSessionLog('Joshua Tan', 'Toyota Vios #03 (MT)', 'Tagum Bypass Road Circuit', '38 km/h', 'Dual Brakes Active'); }} className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors" title="View Record">
                        <span className="material-symbols-outlined text-sm">description</span>
                      </button>
                    </td>
                  </tr>

                  {/* Row 2: Pre-Trip Inspection */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-mono font-bold text-slate-900 text-xs">10:00 - 12:00</div>
                      <div className="text-[10px] text-amber-600 font-semibold mt-0.5">Upcoming</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">Katherine Mae Yap</div>
                      <div className="text-slate-500 text-[11px]">PDC Sedan (Automatic)</div>
                      <div className="text-[10px] text-slate-400 font-mono">SP: D02-24-002194</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center">CM</div>
                        <div>
                          <div className="font-semibold text-slate-800">Cynthia Morales</div>
                          <div className="text-[10px] text-slate-400">INST-8841</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-900 flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-slate-400">directions_car</span>
                        Mitsubishi Mirage #05 (AT)
                      </div>
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono font-medium">NDB-7712</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">South National Highway Corridor</div>
                      <div className="text-[10px] text-slate-400">Defensive Spacing & Roundabout Entry</div>
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Pre-Trip Check
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button onClick={() => { window.showChecklistModal('Katherine Mae Yap', 'Mitsubishi Mirage #05') }} className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors" title="Review Checklist">
                        <span className="material-symbols-outlined text-sm">checklist</span>
                      </button>
                    </td>
                  </tr>

                  {/* Row 3: Pending Dispatch */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-mono font-bold text-slate-900 text-xs">13:00 - 15:00</div>
                      <div className="text-[10px] text-slate-400 font-semibold mt-0.5">Afternoon Queue</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">Mark Vincent Alonto</div>
                      <div className="text-slate-500 text-[11px]">PDC Motorcycle (Manual - DL A)</div>
                      <div className="text-[10px] text-slate-400 font-mono">SP: D02-24-001004</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center">GA</div>
                        <div>
                          <div className="font-semibold text-slate-800">Gabriel Aquino</div>
                          <div className="text-[10px] text-slate-400">INST-6733</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-900 flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-slate-400">two_wheeler</span>
                        Honda TMX 125 #01
                      </div>
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono font-medium">MC-9941</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">Campus Slalom & Balance Track</div>
                      <div className="text-[10px] text-slate-400">Balance, Emergency Braking & Cones</div>
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Queued
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button onClick={() => { window.dispatchCar('Honda TMX 125 #01', 'Mark Vincent Alonto') }} className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors" title="Dispatch Car & Unit">
                        <span className="material-symbols-outlined text-sm">directions_car</span>
                      </button>
                    </td>
                  </tr>

                  {/* Row 4: Completed */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-mono font-bold text-slate-500 text-xs">06:00 - 08:00</div>
                      <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Done • Score 96/100</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">Lorena Grace Villanueva</div>
                      <div className="text-slate-500 text-[11px]">PDC Sedan (Manual)</div>
                      <div className="text-[10px] text-slate-400 font-mono">SP: D02-23-018593</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center">RD</div>
                        <div>
                          <div className="font-semibold text-slate-800">Engr. Roberto Dalisay</div>
                          <div className="text-[10px] text-slate-400">INST-9021</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-900 flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-slate-400">directions_car</span>
                        Toyota Vios #03 (MT)
                      </div>
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono font-medium">ABC-4291</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">Night & Dawn Highway Assessment</div>
                      <div className="text-[10px] text-slate-400">Overtaking Protocols & High-Beam Etiquette</div>
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold inline-flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">check_circle</span> Completed
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button onClick={() => { window.showAssessmentModal('Lorena Grace Villanueva', '96/100', 'Engr. Roberto Dalisay') }} className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors" title="View Assessment Card">
                        <span className="material-symbols-outlined text-sm">assignment_turned_in</span>
                      </button>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-4">
              <span>Showing 4 of 34 scheduled road lessons today</span>
              <a href="/dashboard/scheduling" className="font-semibold text-slate-900 hover:underline flex items-center gap-1">
                Open Full Scheduling Matrix
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </a>
            </div>
          </section>

          {/* Split Section: Dispatch & Room Schedule vs Action Alerts & Compliance */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* Left Column: Synchronized Facilities & Circuits */}
            <section className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-display text-sm font-bold text-slate-900">Today's Dispatch & Room Schedule</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Theoretical Lecture Hall vs Specialized Track Circuits</p>
                </div>
                <span className="text-[10px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">Tagum Pioneer Ave</span>
              </div>

              <div className="space-y-3">
                {/* Item 1: Room A TDC */}
                <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex flex-col items-center justify-center shrink-0">
                      <span className="text-[9px] font-bold">RM A</span>
                      <span className="material-symbols-outlined text-sm">meeting_room</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">TDC Batch 44 (Day 2 of 3)</span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-200/60 text-slate-700 text-[10px] font-semibold">24 Enrolled</span>
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">Theoretical Driving Course • Atty. Valderama</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">Focus: Traffic Signs, RA 4136, Right-of-Way Rules</div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end shrink-0">
                    <span className="font-mono text-xs font-bold text-slate-900">09:00 - 14:00</span>
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> In Progress
                    </span>
                  </div>
                </div>

                {/* Item 2: Bay 1 Maneuvering Bay */}
                <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-600 text-white flex flex-col items-center justify-center shrink-0">
                      <span className="text-[9px] font-bold">BAY 1</span>
                      <span className="material-symbols-outlined text-sm">local_parking</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">Track Circuit A: Maneuvering Bay</span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-200/60 text-slate-700 text-[10px] font-semibold">3 Active Cars</span>
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">90-Degree Box Parking, Reverse S-Curve, Parallel Cones</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">Vehicles: Vios #01, Vios #04, Mirage #06</div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end shrink-0">
                    <span className="font-mono text-xs font-bold text-slate-900">10:30 - 12:30</span>
                    <span className="text-[10px] text-amber-600 font-semibold mt-0.5">Next Switch 12:30</span>
                  </div>
                </div>

                {/* Item 3: Pad 2 Motorcycle */}
                <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 text-white flex flex-col items-center justify-center shrink-0">
                      <span className="text-[9px] font-bold">PAD 2</span>
                      <span className="material-symbols-outlined text-sm">sports_motorsports</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">Motorcycle Slalom & Balance Beam</span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-200/60 text-slate-700 text-[10px] font-semibold">5 Riders</span>
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">Clutch friction control, tight pivot turns & obstacle evasions</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">Units: Honda TMX #01, Yamaha Sight #03</div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end shrink-0">
                    <span className="font-mono text-xs font-bold text-slate-900">14:00 - 17:00</span>
                    <span className="text-[10px] text-slate-400 font-semibold mt-0.5">Afternoon Slot</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Dual-camera circuit surveillance online & recording
                </span>
                <a href="/dashboard/fleet" className="font-semibold text-slate-900 hover:underline flex items-center gap-1">
                  View All Facilities
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </a>
              </div>
            </section>

            {/* Right Column: Action Alerts & Compliance Notices */}
            <section className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-display text-sm font-bold text-slate-900">Action Alerts & Compliance</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">High-priority items requiring admin clearance</p>
                </div>
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-[10px]">3</span>
              </div>

              <div className="space-y-3">
                {/* Alert 1 */}
                <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">3 Incomplete Student Requirements</span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">Action Needed</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Medical Certificate or Student Permit records verification pending before tomorrow's road modules for: <strong className="text-slate-900">E. Ramos, J. Beltran, A. Solis</strong>.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <a href="/dashboard/students" className="px-2.5 py-1 rounded-md bg-slate-900 text-white font-semibold text-[10px] hover:bg-slate-800 transition-colors">
                      Review Records
                    </a>
                    <button onClick={() => { window.sendSmsAlert('E. Ramos, J. Beltran, A. Solis') }} className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 font-medium text-[10px] hover:bg-slate-50 transition-colors inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-amber-600">sms</span>
                      Send SMS Reminder
                    </button>
                  </div>
                </div>

                {/* Alert 2 */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">Preventive Maintenance Scheduled</span>
                    <span className="text-[10px] font-bold text-slate-700 bg-slate-200 px-1.5 py-0.5 rounded">Due Tomorrow</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Dual-control <strong className="text-slate-900">Toyota Wigo #02</strong> (Plate: ZAA-8120) hits 10,000km milestone. Brake pad replacement set for 08:00 AM.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <a href="/dashboard/fleet" className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold text-[10px] hover:bg-slate-50 transition-colors">
                      Open Fleet Bay Log
                    </a>
                  </div>
                </div>

                {/* Alert 3 */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">4 Students Ready for Mock Exam</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">This Weekend</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Completed 15/15 mandatory hours. Pre-registered for Saturday LTO-certified assessor evaluation for Non-Professional Driver's License endorsement.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <a href="/dashboard/reports" className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold text-[10px] hover:bg-slate-50 transition-colors">
                      Assign Senior Evaluators
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Instructor Readiness Badge */}
              <div className="p-3 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-slate-600">badge</span>
                  <div>
                    <span className="font-bold text-slate-800">Faculty On-Duty:</span>
                    <span className="text-slate-500 ml-1">6 on road, 2 in TDC</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">100% READY</span>
              </div>
            </section>

          </div>

        </div>
      </main>

      {/* Interactive Log Modal */}
      <div id="sessionModal" role="dialog" aria-modal="true" aria-labelledby="sessionModalTitle" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-900">pin_drop</span>
              <h3 id="sessionModalTitle" className="font-display font-bold text-sm text-slate-900">Training Session Log</h3>
            </div>
            <button onClick={() => { window.closeModal('sessionModal') }} aria-label="Close session log modal" className="text-slate-400 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none rounded">
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="flex justify-between"><span className="text-slate-500">Student:</span> <strong id="tStudent" className="text-slate-900">Joshua Tan</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Unit:</span> <strong id="tUnit" className="text-slate-900">Toyota Vios #03</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Live Speed:</span> <strong id="tSpeed" className="text-emerald-700 font-bold">38 km/h</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Location:</span> <span id="tLoc" className="text-slate-700">Tagum Bypass Road Circuit</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Sensors:</span> <span id="tSensors" className="text-emerald-700 font-medium">Dual Brakes Active</span></div>
            </div>
          </div>
          <div className="pt-2 flex justify-end">
            <button onClick={() => { window.closeModal('sessionModal') }} className="px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">Close Log</button>
          </div>
        </div>
      </div>

      {/* SMS Gateway Dispatch Modal */}
      <div id="smsModal" role="dialog" aria-modal="true" aria-labelledby="smsModalTitle" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">sms</span>
              </div>
              <div>
                <h3 id="smsModalTitle" className="font-display font-bold text-sm text-slate-900">LTO SMS Notification Gateway</h3>
                <p className="text-[10px] text-slate-400">Direct carrier transmission via LTO-SMS Regional Gateway 11</p>
              </div>
            </div>
            <button onClick={() => { window.closeModal('smsModal') }} aria-label="Close SMS modal" className="text-slate-400 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none rounded">
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Recipients (Mobile Numbers)</label>
              <input id="smsRecipients" type="text" readOnly className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs" />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">SMS Message Content (Pre-Formatted LTO Reminder)</label>
              <textarea id="smsContent" rows={4} readOnly className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-sans text-xs leading-relaxed"></textarea>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-base shrink-0">verified_user</span>
              <span>Gateway verification: Telco carrier whitelist active for SMART / GLOBE / DITO subscribers.</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button onClick={() => { window.closeModal('smsModal') }} className="px-3 py-2 rounded-lg border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button onClick={() => { window.dispatchSmsBroadcast() }} className="px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-sm">send</span>
              Transmit SMS Broadcast
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Toast Notification */}
      <div id="opToast" role="status" aria-live="polite" className="fixed bottom-20 right-6 transform translate-y-32 transition-transform duration-300 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-xl">
        <span className="material-symbols-outlined text-emerald-400">task_alt</span>
        <div className="flex flex-col text-xs">
          <span className="font-bold" id="opToastTitle">Action Processed</span>
        </div>
      </div>
    </>
  );
}