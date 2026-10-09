"use client";
import HeaderAvatar from "../../components/HeaderAvatar";

import { useEffect } from "react";
import Link from "next/link";

export default function OperationsClient({ activeStudents, todayIntake, sessions, todaySettledCount, pendingBalancesCount }) {
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
    if (cEl) cEl.value = `[ST. JOSEPH CUPERTINO DRIVING SCHOOL] Reminder for ${students}: Your scheduled practical driving lesson requires mandatory PSA Birth Certificate & Student Permit verification at the registrar before road dispatch. Please visit St. Pio Building, Purok Magsanoc, Mankilam campus or call (084) 216-8942.`;
    const m = document.getElementById('smsModal');
    if (m) m.classList.remove('hidden');
  }

  function dispatchSmsBroadcast() {
    closeModal('smsModal');
    showToast("SMS Broadcast Transmitted", "3 SMS dispatches delivered via Official-SMS Gateway 11. Carrier timestamps logged.");
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
            <img src="/assets/images/logo.png" alt="St. Joseph Cupertino Logo" className="h-9 w-auto object-contain" />
            <div className="flex flex-col min-w-0">
              <span className="font-display text-xs font-extrabold text-slate-900 tracking-tight truncate">ST. JOSEPH CUPERTINO</span>
              <span className="text-[10px] text-amber-600 font-bold uppercase tracking-wider truncate">Driving School • Tagum</span>
            </div>
          </div>

          {/* Campus Tag */}
          <div className="px-4 py-3">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-1.5 text-slate-600 min-w-0">
            <span className="material-symbols-outlined text-sm text-amber-600 shrink-0">location_on</span>
            <span className="font-medium truncate">Tagum Main Campus</span>
          </div>
          <span className="text-[10px] shrink-0 bg-white border border-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-semibold">Official 11-04</span>
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

              
              <form action="/api/auth/logout" method="POST">
                <button type="submit" className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors font-medium">
                  <span className="material-symbols-outlined text-base">logout</span>
                  Sign Out
                </button>
              </form>
            </nav>
          </div>
        </div>

        {/* Bottom System Status */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 "></span>
              <span className="text-slate-600 font-medium">Official Cloud Sync</span>
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

          {/* Profile */}
          <HeaderAvatar fallbackName="Maria Elena Santos" fallbackRole="Registrar & Operations Admin" />
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
                  <span className="w-2 h-2 rounded-full bg-emerald-500 "></span>
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
                <span className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">{activeStudents || 0}</span>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Total Active Profiles in System</span>
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
                <span className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">{sessions?.length || 0}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Total Dispatches
                </span>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>View Scheduling & Dispatch</span>
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
                <span className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">₱{(todayIntake || 0).toLocaleString()}</span>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span><strong className="text-slate-900">{todaySettledCount || 0}</strong> Settled Today</span>
                <span className="text-slate-200">•</span>
                <span className="text-amber-600 font-semibold">{pendingBalancesCount || 0} Pending Balances</span>
              </div>
            </a>

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
                <tbody id="runsTableBody">
                  {sessions && sessions.length > 0 ? sessions.map((session, idx) => (
                    <tr key={session.id || idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-900 font-bold">{session.start_time} - {session.end_time}</td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{session.enrollments?.profiles?.first_name} {session.enrollments?.profiles?.last_name}</div>
                        <div className="text-[10px] text-slate-500">{session.enrollments?.profiles?.mobile_number}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-700">{session.instructor_id || 'Assigned Instructor'}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-slate-600 font-medium">{session.vehicle_id || 'Training Unit'}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-semibold">{session.notes || 'Practical Route'}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={session.status === 'completed' ? 'px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold' : 'px-2 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold'}>
                          {session.status || 'pending'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button onClick={() => window.showSessionLog(session.enrollments?.profiles?.first_name, 'Training Unit', 'Practical Route', 'Pending', 'Active')} className="px-3 py-1.5 rounded bg-slate-900 text-white text-[10px] font-bold hover:bg-slate-800 transition-colors">Log Info</button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="7" className="py-12 text-center text-slate-500 font-medium">No active scheduled runs logged today.</td>
                    </tr>
                  )}
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
                <span className="text-[10px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">Tagum St. Pio Building, Purok Magsanoc, Mankilam</span>
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
                    Completed 15/15 mandatory hours. Pre-registered for Saturday Official-certified assessor evaluation for Non-Professional Driver's License endorsement.
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
                <h3 id="smsModalTitle" className="font-display font-bold text-sm text-slate-900">Official SMS Notification Gateway</h3>
                <p className="text-[10px] text-slate-400">Direct carrier transmission via Official-SMS Regional Gateway 11</p>
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
              <label className="block font-semibold text-slate-700 mb-1">SMS Message Content (Pre-Formatted Official Reminder)</label>
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