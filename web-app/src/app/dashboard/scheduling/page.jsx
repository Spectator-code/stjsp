"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Scheduling() {
  function showSchedToast(title, msg) {
    const toast = document.getElementById('schedToast');
    if (!toast) return;
    const tt = document.getElementById('schedToastTitle'); if (tt) tt.textContent = title;
    const tm = document.getElementById('schedToastMsg'); if (tm) tm.textContent = msg;
    toast.classList.remove('translate-y-32');
    setTimeout(() => { toast.classList.add('translate-y-32'); }, 4000);
  }

  function selectSlot(studentName, permit, instructor, vehicle, time, curriculum, objectives) {
    const sth = document.getElementById('slot-time-header'); if (sth) sth.textContent = time;
    const ss = document.getElementById('slot-student'); if (ss) ss.textContent = studentName;
    const sp = document.getElementById('slot-permit'); if (sp) sp.textContent = permit;
    const si = document.getElementById('slot-instructor'); if (si) si.textContent = instructor;
    const sv = document.getElementById('slot-vehicle'); if (sv) sv.textContent = vehicle;
    const sc = document.getElementById('slot-curriculum'); if (sc) sc.textContent = curriculum;
    const so = document.getElementById('slot-objectives'); if (so) so.textContent = objectives;

    const parts = (studentName || '').trim().split(' ');
    let initials = 'ST';
    if (parts.length >= 2) {
      initials = parts[0][0] + parts[1][0];
    } else if (parts.length === 1 && parts[0].length > 0) {
      initials = parts[0].substring(0, 2).toUpperCase();
    }
    const iniEl = document.getElementById('student-initial');
    if (iniEl) iniEl.textContent = initials;
  }

  function openDispatchModal(time, vehicle, instructor) {
    if (time) { const el = document.getElementById('modalTimeSlot'); if (el) el.value = time; }
    if (vehicle) { const el = document.getElementById('modalVehicleSelect'); if (el) el.value = vehicle; }
    if (instructor) { const el = document.getElementById('modalInstructorSelect'); if (el) el.value = instructor; }
    const dm = document.getElementById('dispatchModal');
    if (dm) dm.classList.remove('hidden');
  }

  function closeDispatchModal() {
    const dm = document.getElementById('dispatchModal');
    if (dm) dm.classList.add('hidden');
  }

  function handleDispatchSubmit(e) {
    e.preventDefault();
    closeDispatchModal();
    showSchedToast('Dispatch Scheduled', 'New session booked and assigned to instructor with dual-control telematics.');
  }

  function cancelCurrentSession() {
    const studentEl = document.getElementById('slot-student');
    const student = studentEl ? studentEl.textContent : 'Assigned Student';
    const timeEl = document.getElementById('slot-time-header');
    const time = timeEl ? timeEl.textContent : 'Scheduled Slot';
    const vehicleEl = document.getElementById('slot-vehicle');
    const vehicle = vehicleEl ? vehicleEl.textContent : 'Training Unit';

    if (typeof window !== 'undefined' && window.showConfirmDialog) {
      window.showConfirmDialog({
        title: 'Cancel Scheduled Practical Session',
        message: 'Are you sure you want to cancel the scheduled practical driving session for ' + student + '? This will open the time slot on the daily dispatch matrix.',
        badge: 'Session Cancellation',
        type: 'danger',
        confirmText: 'Cancel Session',
        details: [
          { label: 'Student', value: student },
          { label: 'Time Slot', value: time },
          { label: 'Allocated Unit', value: vehicle },
          { label: 'Action Warning', value: 'Instructor will be notified of cancellation' }
        ],
        onConfirm: () => {
          showSchedToast('Session Cancelled', 'Session for ' + student + ' removed from matrix. Slot now open.');
        }
      });
    } else {
      showSchedToast('Session Cancelled', 'Session for ' + student + ' removed from matrix. Slot now open.');
    }
  }

  function switchView(view, btn) {
    const buttons = document.querySelectorAll('#viewSwitcher button');
    buttons.forEach(b => {
      b.className = 'px-3 py-1 rounded-md text-slate-600 hover:text-slate-900 font-medium';
    });
    if (btn) btn.className = 'px-3 py-1 rounded-md bg-white text-slate-900 font-semibold shadow-xs';
    showSchedToast('View Changed', 'Switched calendar matrix to ' + view.toUpperCase() + ' mode.');
  }

  let dateOffset = 0;
  function shiftDate(offset) {
    dateOffset += offset;
    const d = new Date(2024, 9, 24 + dateOffset);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const el = document.getElementById('currentDateLabel');
    if (el) el.textContent = d.toLocaleDateString('en-US', options);
    showSchedToast('Date Changed', 'Viewing schedule for ' + d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }

  function resetToday() {
    dateOffset = 0;
    const el = document.getElementById('currentDateLabel');
    if (el) el.textContent = 'Thursday, October 24, 2024';
    showSchedToast('Date Reset', 'Viewing today schedule.');
  }

  function filterMatrixRows() {
    const cf = document.getElementById('courseFilter');
    const inf = document.getElementById('instructorFilter');
    const course = cf ? cf.value : 'all';
    const instructor = inf ? inf.value : 'all';
    const rows = document.querySelectorAll('.matrix-row');

    rows.forEach(r => {
      const rCourse = r.getAttribute('data-course');
      const rInstructor = r.getAttribute('data-instructor');

      const courseMatch = (course === 'all') || (rCourse === course);
      const instructorMatch = (instructor === 'all') || (rInstructor === instructor);

      r.style.display = (courseMatch && instructorMatch) ? '' : 'none';
    });
  }

  function filterMatrixByText(q) {
    const text = (q || '').toLowerCase().trim();
    const rows = document.querySelectorAll('.matrix-row');
    rows.forEach(r => {
      r.style.display = r.innerText.toLowerCase().includes(text) ? '' : 'none';
    });
  }

  let markScores = { Brake: 4, Steer: 5, Signs: 4 };
  function toggleMark(btn, type) {
    if (typeof btn === 'string') btn = document.getElementById(btn);
    if (!btn && type) btn = document.getElementById('mark' + type);
    if (!btn) return;
    markScores[type] = markScores[type] >= 5 ? 3 : markScores[type] + 1;
    btn.textContent = type + ': ' + markScores[type] + '/5';
    showSchedToast('Score Marked', type + ' score logged as ' + markScores[type] + '/5');
  }

  useEffect(() => {
    const handleAfterPrint = () => {
      document.body.removeAttribute('data-print-target');
    };
    window.addEventListener('afterprint', handleAfterPrint);

    window.showSchedToast = showSchedToast;
    window.selectSlot = selectSlot;
    window.openDispatchModal = openDispatchModal;
    window.closeDispatchModal = closeDispatchModal;
    window.handleDispatchSubmit = handleDispatchSubmit;
    window.cancelCurrentSession = cancelCurrentSession;
    window.switchView = switchView;
    window.shiftDate = shiftDate;
    window.resetToday = resetToday;
    window.filterMatrixRows = filterMatrixRows;
    window.filterMatrixByText = filterMatrixByText;
    window.toggleMark = toggleMark;

    return () => {
      window.removeEventListener('afterprint', handleAfterPrint);
    };
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
          <Link href="/dashboard/operations" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors font-medium">
            <span className="material-symbols-outlined text-base">dashboard</span>
            Operations Dashboard
          </Link>
          <Link href="/dashboard/scheduling" className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-900 text-white font-medium transition-colors shadow-xs">
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
          <span className="text-slate-600 font-medium">Matrix Synchronizer</span>
        </div>
        <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-bold">ACTIVE</span>
      </div>
    </div>
  </aside>

  {/* Top Header */}
  <header className="fixed top-0 left-64 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 z-40 px-6 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-xs">
        <span className="text-slate-400">Tagum Main Campus</span>
        <span className="text-slate-300">/</span>
        <span className="font-semibold text-slate-800">Scheduling & Dispatch Matrix</span>
      </div>

      <div className="relative hidden lg:block w-72">
        <span className="material-symbols-outlined absolute left-2.5 top-2 text-slate-400 text-sm">search</span>
        <input id="matrixSearch" onInput={(e) => window.filterMatrixByText(e.target.value)} type="text" placeholder="Search student or instructor..." className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all" />
      </div>
    </div>

    <div className="flex items-center gap-3">
      {/* Conflict Pill */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="font-medium">Conflict Detector: <strong>0 Overlaps</strong></span>
      </div>

      <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50/80 border border-emerald-200/60 text-xs text-emerald-800 font-medium">
        <span className="material-symbols-outlined text-sm text-emerald-600">shield_lock</span>
        <span>RA 10173 Protected</span>
      </div>

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
          <span className="text-[10px] text-slate-500">Registrar & Admin</span>
        </div>
      </div>
    </div>
  </header>

  {/* Main Content */}
  <main id="main-content" className="ml-64 pt-16 min-h-screen bg-slate-50 overflow-x-hidden">
    <div className="p-6 sm:p-8 pb-32 sm:pb-36 space-y-6 max-w-7xl mx-auto xl:max-w-none">

      {/* Action Ribbon & Navigation Toolbar */}
      <div className="action-toolbar no-print bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
        
        {/* Date Selector */}
        <div className="flex items-center gap-2">
          <button onClick={() => {window.shiftDate(-1)}} className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none" aria-label="Previous Day">
            <span className="material-symbols-outlined text-base">chevron_left</span>
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800">
            <span className="material-symbols-outlined text-base text-slate-500">calendar_today</span>
            <span id="currentDateLabel">Thursday, October 24, 2024</span>
          </div>
          <button onClick={() => {window.shiftDate(1)}} className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none" aria-label="Next Day">
            <span className="material-symbols-outlined text-base">chevron_right</span>
          </button>
          <button onClick={() => {window.resetToday()}} className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">
            Today
          </button>
        </div>

        {/* Filters Ribbon */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View switcher */}
          <div className="bg-slate-100 p-1 rounded-lg flex items-center text-xs" id="viewSwitcher">
            <button onClick={(e) => {window.switchView('day', e.currentTarget)}} className="px-3 py-1 rounded-md bg-white text-slate-900 font-semibold shadow-xs">Day</button>
            <button onClick={(e) => {window.switchView('week', e.currentTarget)}} className="px-3 py-1 rounded-md text-slate-600 hover:text-slate-900 font-medium">Week</button>
            <button onClick={(e) => {window.switchView('month', e.currentTarget)}} className="px-3 py-1 rounded-md text-slate-600 hover:text-slate-900 font-medium">Month</button>
          </div>

          {/* Course Type Filter */}
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <span className="material-symbols-outlined text-slate-400 text-sm">category</span>
            <select id="courseFilter" onChange={() => {filterMatrixRows()}} className="bg-transparent focus:outline-none cursor-pointer font-medium">
              <option value="all">All Courses</option>
              <option value="pdc-car">PDC Car (A/B)</option>
              <option value="pdc-mc">PDC Motorcycle (A1)</option>
              <option value="tdc">TDC Classroom</option>
            </select>
          </div>

          {/* Instructor Filter */}
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <span className="material-symbols-outlined text-slate-400 text-sm">badge</span>
            <select id="instructorFilter" onChange={() => {filterMatrixRows()}} className="bg-transparent focus:outline-none cursor-pointer font-medium">
              <option value="all">All Instructors</option>
              <option value="roberto">Inst. Roberto D.</option>
              <option value="danilo">Inst. Danilo Cruz</option>
              <option value="carlo">Inst. Carlo Mendoza</option>
              <option value="joel">Inst. Joel Santos</option>
              <option value="valderama">Atty. G. Valderama</option>
            </select>
          </div>

          {/* New Dispatch Button */}
          <button onClick={() => {window.openDispatchModal()}} className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-xs focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">
            <span className="material-symbols-outlined text-base">add_circle</span>
            New Dispatch
          </button>
        </div>

      </div>

      {/* Main Dual Area: Gantt Timeline + Interactive Detail Drawer */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Primary Gantt Dispatch Grid (9 cols) */}
        <div className="matrix-container xl:col-span-8 2xl:col-span-9 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          
          {/* Grid Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-700 text-lg">view_timeline</span>
              <h2 className="font-display text-sm font-bold text-slate-900">Daily Dispatch Schedule Matrix</h2>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">12 Active Units</span>
            </div>
            
            <div className="flex items-center gap-4 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-slate-200"></span><span>Scheduled</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-amber-400"></span><span>In Progress</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-emerald-500"></span><span>Done</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-rose-400"></span><span>Maintenance</span></div>
            </div>
          </div>

          {/* Horizontal Schedule Matrix */}
          <div className="overflow-x-auto w-full">
            <div className="min-w-[960px] flex flex-col divide-y divide-slate-100" id="matrixRowsContainer">
              
              {/* Matrix Hours Header */}
              <div className="grid grid-cols-10 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider py-2.5 px-3">
                <div className="col-span-2 text-slate-800 font-extrabold pl-2">VEHICLE & INSTRUCTOR</div>
                <div className="text-center">08:00 AM</div>
                <div className="text-center">09:00 AM</div>
                <div className="text-center">10:00 AM</div>
                <div className="text-center">11:00 AM</div>
                <div className="text-center">12:00 PM</div>
                <div className="text-center">01:00 PM</div>
                <div className="text-center">02:00 PM</div>
                <div className="text-center">03:00 - 05:00</div>
              </div>

              {/* ROW 1: Toyota Vios #01 (Manual) */}
              <div className="grid grid-cols-10 items-stretch py-3 px-3 hover:bg-slate-50/60 transition-colors matrix-row" data-course="pdc-car" data-instructor="roberto">
                <div className="col-span-2 flex flex-col justify-center pr-3 border-r border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-slate-500 text-sm">directions_car</span>
                    <span className="font-bold text-xs text-slate-900">Toyota Vios #01</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Manual Transmission</span>
                  <span className="text-[11px] text-slate-600 font-semibold mt-0.5">Inst. Roberto D.</span>
                </div>
                
                <div className="col-span-8 grid grid-cols-8 gap-2 pl-3">
                  {/* Block 1 */}
                  <div className="col-span-2 p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 cursor-pointer transition-all flex flex-col justify-between" onClick={() => {window.selectSlot('Joshua Tan', 'SP-2024-7740', 'Engr. Roberto D.', 'Toyota Vios #01 (Manual)', '08:00 AM - 10:00 AM', 'PDC-M Lesson 4: Highway Drive', 'Merge maneuvers, passing speeds, safe stopping distance on Tagum Bypass Road')}}>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white text-emerald-800 border border-emerald-200">08:00-10:00</span>
                      <span className="material-symbols-outlined text-xs text-emerald-600">check_circle</span>
                    </div>
                    <div className="min-w-0 mt-1">
                      <p className="font-bold text-xs text-slate-900 truncate">Joshua Tan</p>
                      <p className="text-[10px] text-slate-500 truncate">PDC-M L4: Highway Drive</p>
                    </div>
                  </div>

                  {/* Block 2 */}
                  <div className="col-span-2 p-2.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100/60 cursor-pointer transition-all flex flex-col justify-between" onClick={() => {window.selectSlot('Bea Ramos', 'SP-2024-8831', 'Engr. Roberto D.', 'Toyota Vios #01 (Manual)', '10:30 AM - 12:30 PM', 'PDC-M Lesson 2: Steering & Clutch', 'Reverse 90-degree parking, ramp hill start, blind spot mirror checks')}}>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white text-amber-800 border border-amber-300">10:30-12:30</span>
                      <span className="material-symbols-outlined text-xs text-amber-600 animate-spin">sync</span>
                    </div>
                    <div className="min-w-0 mt-1">
                      <p className="font-bold text-xs text-slate-900 truncate">Bea Ramos</p>
                      <p className="text-[10px] text-slate-600 truncate">PDC-M L2: Steering & Clutch</p>
                    </div>
                  </div>

                  <div className="col-span-1 rounded-lg bg-slate-100 flex items-center justify-center">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">QC / Rest</span>
                  </div>

                  {/* Block 3 */}
                  <div className="col-span-3 p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-all flex flex-col justify-between" onClick={() => {window.selectSlot('Michael Go', 'SP-2024-9102', 'Engr. Roberto D.', 'Toyota Vios #01 (Manual)', '01:30 PM - 04:30 PM', 'PDC-M Comprehensive Mock Evaluation', 'Pre-licensing assessment mock road test across Tagum municipal corridors')}}>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200">01:30-04:30</span>
                      <span className="text-[9px] font-bold text-slate-500">Assessment</span>
                    </div>
                    <div className="min-w-0 mt-1">
                      <p className="font-bold text-xs text-slate-900 truncate">Michael Go (Mock Exam Run)</p>
                      <p className="text-[10px] text-slate-500 truncate">Full Practical Assessment Prep • 3h</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ROW 2: Toyota Vios #03 (Automatic) */}
              <div className="grid grid-cols-10 items-stretch py-3 px-3 hover:bg-slate-50/60 transition-colors bg-slate-50/30 matrix-row" data-course="pdc-car" data-instructor="danilo">
                <div className="col-span-2 flex flex-col justify-center pr-3 border-r border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-slate-500 text-sm">directions_car</span>
                    <span className="font-bold text-xs text-slate-900">Toyota Vios #03</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Automatic Dual-Pedal</span>
                  <span className="text-[11px] text-slate-600 font-semibold mt-0.5">Inst. Danilo Cruz</span>
                </div>
                
                <div className="col-span-8 grid grid-cols-8 gap-2 pl-3">
                  {/* Morning */}
                  <div className="col-span-2 p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 cursor-pointer transition-all flex flex-col justify-between" onClick={() => {window.selectSlot('Kevin Arnaiz', 'SP-2024-6621', 'Danilo Cruz', 'Toyota Vios #03 (Automatic)', '08:00 AM - 10:00 AM', 'PDC-A Lesson 1: Basic Controls', 'Throttle regulation, gradual stops, turn signal etiquette')}}>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white text-emerald-800 border border-emerald-200">08:00-10:00</span>
                      <span className="material-symbols-outlined text-xs text-emerald-600">done</span>
                    </div>
                    <div className="min-w-0 mt-1">
                      <p className="font-bold text-xs text-slate-900 truncate">Kevin Arnaiz</p>
                      <p className="text-[10px] text-slate-500 truncate">PDC-A L1: Basic Controls</p>
                    </div>
                  </div>

                  {/* ACTIVE SLOT */}
                  <div className="col-span-2 p-2.5 rounded-lg border-2 border-slate-900 bg-slate-900 text-white cursor-pointer shadow-xs transition-all flex flex-col justify-between" id="active-slot-demo" onClick={() => {window.selectSlot('Bea Bianca Ramos', 'SP-2024-8831', 'Danilo Cruz', 'Toyota Vios #03 (Automatic - NAV-1928)', '10:30 AM - 12:30 PM', 'PDC-A Lesson 3: Parking & Manoeuvres', 'Reverse 90-degree parking, ramp hill start, blind spot mirror checks')}}>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-white border border-slate-700">10:30-12:30</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-slate-900 uppercase">ACTIVE</span>
                    </div>
                    <div className="min-w-0 mt-1">
                      <p className="font-bold text-xs text-white truncate">Bea Bianca Ramos</p>
                      <p className="text-[10px] text-slate-300 truncate">PDC-A L3: Parking & Ramp</p>
                    </div>
                  </div>

                  {/* Available Gap */}
                  <button onClick={() => {window.openDispatchModal('01:00 PM - 03:00 PM', 'Toyota Vios #03', 'Danilo Cruz')}} className="col-span-2 p-2.5 rounded-lg border border-dashed border-slate-300 hover:border-slate-500 hover:bg-slate-100 transition-all flex flex-col items-center justify-center text-center gap-1 group">
                    <div className="flex items-center gap-1 text-slate-700 font-bold text-xs">
                      <span className="material-symbols-outlined text-sm">add_circle</span>
                      <span>Available Slot</span>
                    </div>
                    <span className="text-[10px] text-slate-400">01:00 PM - 03:00 PM</span>
                  </button>

                  {/* Afternoon */}
                  <div className="col-span-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-all flex flex-col justify-between" onClick={() => {window.selectSlot('Camille Sison', 'SP-2024-9452', 'Danilo Cruz', 'Toyota Vios #03 (Automatic)', '03:00 PM - 05:00 PM', 'PDC-A Lesson 5: Low-Light/Rain', 'Hazard perception, heavy rain road adaptation, low-beam protocol')}}>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200">03:00-05:00</span>
                      <span className="text-[9px] font-bold text-slate-400">Ready</span>
                    </div>
                    <div className="min-w-0 mt-1">
                      <p className="font-bold text-xs text-slate-900 truncate">Camille Sison</p>
                      <p className="text-[10px] text-slate-500 truncate">PDC-A L5: Low-Light/Rain</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ROW 3: Toyota Wigo #02 (Automatic) */}
              <div className="grid grid-cols-10 items-stretch py-3 px-3 hover:bg-slate-50/60 transition-colors matrix-row" data-course="pdc-car" data-instructor="carlo">
                <div className="col-span-2 flex flex-col justify-center pr-3 border-r border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-slate-500 text-sm">directions_car</span>
                    <span className="font-bold text-xs text-slate-900">Toyota Wigo #02</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Compact Dual-Control</span>
                  <span className="text-[11px] text-slate-600 font-semibold mt-0.5">Inst. Carlo Mendoza</span>
                </div>
                
                <div className="col-span-8 grid grid-cols-8 gap-2 pl-3">
                  {/* Morning 4h */}
                  <div className="col-span-4 p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-all flex flex-col justify-between" onClick={() => {window.selectSlot('David Paulino', 'SP-2024-5110', 'Carlo Mendoza', 'Toyota Wigo #02 (Automatic)', '08:00 AM - 12:00 PM', 'PDC-A Intensive 4-Hour City Maneuvering', 'Complex traffic rounds, Tagum Pioneer Highway roundabout navigation')}}>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200">08:00-12:00</span>
                      <span className="text-[9px] font-bold text-slate-500">Intensive 4-Hr</span>
                    </div>
                    <div className="min-w-0 mt-1">
                      <p className="font-bold text-xs text-slate-900 truncate">David Paulino</p>
                      <p className="text-[10px] text-slate-500 truncate">PDC-A Intensive: City Traffic & Roundabouts</p>
                    </div>
                  </div>

                  {/* Maintenance Check */}
                  <div className="col-span-2 p-2.5 rounded-lg border border-rose-200 bg-rose-50 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white text-rose-800 border border-rose-200">13:00-15:00</span>
                      <span className="material-symbols-outlined text-xs text-rose-600">build</span>
                    </div>
                    <div className="min-w-0 mt-1">
                      <p className="font-bold text-xs text-rose-800">PMS Maintenance</p>
                      <p className="text-[10px] text-rose-600 truncate">Brake Pad & Dual-Pedal Cable QC</p>
                    </div>
                  </div>

                  {/* Late Afternoon */}
                  <div className="col-span-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-all flex flex-col justify-between" onClick={() => {window.selectSlot('Rina Dela Cruz', 'SP-2024-9844', 'Carlo Mendoza', 'Toyota Wigo #02 (Automatic)', '03:00 PM - 05:00 PM', 'PDC-A Lesson 2: Precision Braking', 'Emergency braking tests and pedestrian zone navigation')}}>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200">03:00-05:00</span>
                      <span className="material-symbols-outlined text-xs text-slate-400">schedule</span>
                    </div>
                    <div className="min-w-0 mt-1">
                      <p className="font-bold text-xs text-slate-900 truncate">Rina Dela Cruz</p>
                      <p className="text-[10px] text-slate-500 truncate">PDC-A L2: Precision Braking</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ROW 4: Honda Click 125i #01 (Motorcycle) */}
              <div className="grid grid-cols-10 items-stretch py-3 px-3 hover:bg-slate-50/60 transition-colors bg-slate-50/30 matrix-row" data-course="pdc-mc" data-instructor="joel">
                <div className="col-span-2 flex flex-col justify-center pr-3 border-r border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-slate-500 text-sm">two_wheeler</span>
                    <span className="font-bold text-xs text-slate-900">Honda Click 125i</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Scooter AT Circuit</span>
                  <span className="text-[11px] text-slate-600 font-semibold mt-0.5">Inst. Joel Santos</span>
                </div>
                
                <div className="col-span-8 grid grid-cols-8 gap-2 pl-3">
                  <div className="col-span-2 p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 cursor-pointer transition-all flex flex-col justify-between" onClick={() => {window.selectSlot('Angelo Morales', 'SP-2024-3420', 'Joel Santos', 'Honda Click 125i #01', '08:00 AM - 10:00 AM', 'PDC-MC Track Run 1', 'Slalom cone agility, balance board, slow-speed maneuvering')}}>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white text-emerald-800 border border-emerald-200">08:00-10:00</span>
                      <span className="material-symbols-outlined text-xs text-emerald-600">done</span>
                    </div>
                    <div className="min-w-0 mt-1">
                      <p className="font-bold text-xs text-slate-900 truncate">Angelo Morales</p>
                      <p className="text-[10px] text-slate-500 truncate">PDC-MC: Track Slalom</p>
                    </div>
                  </div>

                  <div className="col-span-2 p-2.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100/60 cursor-pointer transition-all flex flex-col justify-between" onClick={() => {window.selectSlot('Sarah Jane Lim', 'SP-2024-3499', 'Joel Santos', 'Honda Click 125i #01', '10:00 AM - 12:00 PM', 'PDC-MC Road Practical', 'Intersection navigation, safe road lane positioning, hand signals')}}>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white text-amber-800 border border-amber-300">10:00-12:00</span>
                      <span className="material-symbols-outlined text-xs text-amber-600 animate-spin">sync</span>
                    </div>
                    <div className="min-w-0 mt-1">
                      <p className="font-bold text-xs text-slate-900 truncate">Sarah Jane Lim</p>
                      <p className="text-[10px] text-slate-600 truncate">PDC-MC: Public Road</p>
                    </div>
                  </div>

                  <div className="col-span-1 rounded-lg bg-slate-100 flex items-center justify-center">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Track Rest</span>
                  </div>

                  <div className="col-span-3 p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-all flex flex-col justify-between" onClick={() => {window.selectSlot('Marc Bryan Tan', 'SP-2024-4112', 'Joel Santos', 'Honda Click 125i #01', '01:00 PM - 04:00 PM', 'PDC-MC Full Licensing Evaluation', 'LTO practical test simulator, emergency stops at 40kph, pillion balance rules')}}>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200">01:00-04:00</span>
                      <span className="text-[9px] font-bold text-slate-500">Exam Batch</span>
                    </div>
                    <div className="min-w-0 mt-1">
                      <p className="font-bold text-xs text-slate-900 truncate">Marc Bryan Tan & 2 Others</p>
                      <p className="text-[10px] text-slate-500 truncate">Full Motorcycle Practical Assessment</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ROW 5: Classroom A (TDC) */}
              <div className="grid grid-cols-10 items-stretch py-3 px-3 hover:bg-slate-50/60 transition-colors matrix-row" data-course="tdc" data-instructor="valderama">
                <div className="col-span-2 flex flex-col justify-center pr-3 border-r border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-slate-500 text-sm">meeting_room</span>
                    <span className="font-bold text-xs text-slate-900">Classroom A (TDC)</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Smart Seminar • Cap: 30</span>
                  <span className="text-[11px] text-slate-600 font-semibold mt-0.5">Atty. G. Valderama</span>
                </div>
                
                <div className="col-span-8 grid grid-cols-8 gap-2 pl-3">
                  <div className="col-span-1 rounded-lg bg-slate-100 flex items-center justify-center">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Prep</span>
                  </div>

                  <div className="col-span-3 p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-all flex flex-col justify-between" onClick={() => {window.selectSlot('TDC Batch 44 (24 Students)', 'LTO-TDC-2024-B44', 'Atty. G. Valderama', 'Classroom A Main Audio-Visual Room', '09:00 AM - 12:00 PM', 'TDC Module 1: Road Courtesy & Defensive Driving', 'LTO Traffic Regulations, RA 4136, Right of Way rules, Pedestrian Safety, Alcohol & Drug testing awareness')}}>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200">09:00-12:00</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">24 Students</span>
                    </div>
                    <div className="min-w-0 mt-1">
                      <p className="font-bold text-xs text-slate-900 truncate">TDC Batch 44 Module 1</p>
                      <p className="text-[10px] text-slate-500 truncate">Defensive Driving, RA 4136 & Road Etiquette</p>
                    </div>
                  </div>

                  <div className="col-span-1 rounded-lg bg-slate-100 flex items-center justify-center">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Noon</span>
                  </div>

                  <div className="col-span-3 p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-all flex flex-col justify-between" onClick={() => {window.selectSlot('TDC Batch 43 (19 Students)', 'LTO-TDC-2024-B43', 'Engr. L. Gomez', 'Classroom A Main Audio-Visual Room', '01:00 PM - 04:00 PM', 'TDC Module 3: Pre-Drive Inspection & Maintenance (BLOWBAGETS)', 'Battery, Lights, Oil, Water, Brakes, Air, Gas, Engine, Tire, Self inspection routine')}}>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200">01:00-04:00</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">19 Students</span>
                    </div>
                    <div className="min-w-0 mt-1">
                      <p className="font-bold text-xs text-slate-900 truncate">TDC Batch 43 Module 3</p>
                      <p className="text-[10px] text-slate-500 truncate">BLOWBAGETS Vehicle Familiarization & LTO Exam</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Matrix Footer */}
          <div className="timetable-section no-print p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4 text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Campus Dispatch: Active
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Dual-Brake Sensors: Calibrated
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => {window.showSchedToast('Timetable Exported', 'Full daily dispatch grid downloaded in PDF and CSV format.')}} className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 font-semibold text-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">Export Timetable</button>
              <button onClick={() => {window.showSchedToast('Mass Reschedule Activated', 'Selected batch sessions updated without conflict.')}} className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 font-semibold text-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">Mass Reschedule</button>
            </div>
          </div>

        </div>

        {/* Interactive Dispatch Drawer / Inspector Sidebar (3 cols) */}
        <div className="xl:col-span-4 2xl:col-span-3 flex flex-col gap-4">
          
          {/* Slot Inspector Card */}
          <div id="slotInspectorCard" className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4 sticky top-20">
            
            {/* Dedicated Print-Only Trip Ticket Header */}
            <div className="print-header hidden pb-3 border-b-2 border-slate-900 mb-3 text-center">
              <h2 className="text-base font-extrabold text-slate-900">ST. JOSEPH CUPERTINO DRIVING SCHOOL</h2>
              <p className="text-xs text-slate-600">Pioneer Ave Campus, Tagum City • LTO Accr: DS-R11-2021-089</p>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1">Official Daily In-Car Trip Ticket &amp; Evaluation Manifest</p>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-800 text-lg">tune</span>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Slot Inspector</span>
                  <h3 className="font-display text-sm font-bold text-slate-900" id="slot-time-header">10:30 AM - 12:30 PM</h3>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">Active Run</span>
            </div>

            {/* Student Card Block */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0" id="student-initial">
                BR
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Student Driver</span>
                <span className="font-bold text-xs text-slate-900 truncate" id="slot-student">Bea Bianca Ramos</span>
                <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mt-0.5 font-mono">
                  <span className="material-symbols-outlined text-xs text-amber-600">badge</span>
                  <span id="slot-permit">SP-2024-8831</span>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Designated Instructor</span>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="font-bold text-slate-900" id="slot-instructor">Danilo Cruz</span>
                  <span className="text-[10px] bg-white border border-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-semibold">LTO Certified</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Allocated Unit</span>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="font-bold text-slate-900 truncate" id="slot-vehicle">Toyota Vios AT (NAV-1928)</span>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <span className="material-symbols-outlined text-xs">check</span> Dual Brakes OK
                  </span>
                  <span>•</span>
                  <span>Fuel: 85%</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Module & Objectives</span>
                  <span className="material-symbols-outlined text-xs text-slate-400">checklist</span>
                </div>
                <span className="font-bold text-slate-900 block mt-0.5" id="slot-curriculum">PDC-A Lesson 3: Parking & Manoeuvres</span>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed" id="slot-objectives">
                  Reverse 90-degree parking, ramp hill start, blind spot mirror checks, and smooth low-speed pedal modulation.
                </p>
              </div>
            </div>

            {/* Quick Marks */}
            <div className="space-y-1.5 pt-1 no-print">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Instructor Rapid Marks (Click to toggle)</span>
              <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                <button id="markBrake" onClick={(e) => { if (typeof window !== 'undefined' && window.toggleMark) window.toggleMark(e.currentTarget, 'Brake'); }} className="py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-center transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">
                  Brake: 4/5
                </button>
                <button id="markSteer" onClick={(e) => { if (typeof window !== 'undefined' && window.toggleMark) window.toggleMark(e.currentTarget, 'Steer'); }} className="py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-center transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">
                  Steer: 5/5
                </button>
                <button id="markSigns" onClick={(e) => { if (typeof window !== 'undefined' && window.toggleMark) window.toggleMark(e.currentTarget, 'Signs'); }} className="py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-center transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">
                  Signs: 4/5
                </button>
              </div>
            </div>

            {/* Action Buttons Group */}
            <div className="space-y-2 pt-2 no-print">
              <button onClick={() => { document.body.setAttribute('data-print-target', 'trip-ticket'); window.print(); }} className="w-full py-2 px-3 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 shadow-xs focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">
                <span className="material-symbols-outlined text-sm">print</span>
                Print Daily Trip Ticket
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => showSchedToast('Reschedule Window Opened', 'Select new time slot on matrix to move session.')} className="py-1.5 px-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">
                  <span className="material-symbols-outlined text-xs">schedule</span>
                  Reschedule
                </button>
                <button onClick={() => showSchedToast('Unit Reassignment', 'Vehicle swap menu opened for current session.')} className="py-1.5 px-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">
                  <span className="material-symbols-outlined text-xs">swap_horiz</span>
                  Reassign Car
                </button>
              </div>
              <button onClick={() => cancelCurrentSession()} className="w-full py-1.5 px-2 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs flex items-center justify-center gap-1 transition-colors focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none">
                <span className="material-symbols-outlined text-xs">event_busy</span>
                Cancel Scheduled Session
              </button>
            </div>

            {/* Print Only Trip Ticket Signatures */}
            <div className="print-footer hidden pt-6 border-t border-slate-300 mt-4 text-xs text-slate-700 flex justify-between">
              <div>
                <p className="border-t border-slate-800 pt-1 font-semibold">Student Signature Over Printed Name</p>
                <p className="text-[10px] text-slate-500">Date &amp; Time Completed</p>
              </div>
              <div className="text-right">
                <p className="border-t border-slate-800 pt-1 font-semibold">Instructor Signature &amp; LTO ID</p>
                <p className="text-[10px] text-slate-500">Dual-Control Telematics Verified</p>
              </div>
            </div>

          </div>

          {/* Instructor Attendance Quick Panel */}
          <div className="attendance-panel bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3 no-print">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-display text-xs font-bold text-slate-900">Instructor Attendance</h4>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">4 / 4 Present</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-slate-800">Roberto D.</span>
                </div>
                <span className="text-[10px] text-slate-500">On Highway Route</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span className="font-semibold text-slate-800">Danilo Cruz</span>
                </div>
                <span className="text-[10px] text-slate-500">Ramp Test Field</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                  <span className="font-semibold text-slate-800">Carlo Mendoza</span>
                </div>
                <span className="text-[10px] text-slate-500">Maintenance Break</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  </main>

  {/* Modal: New Dispatch Session */}
  <div id="dispatchModal" role="dialog" aria-modal="true" aria-labelledby="dispatchModalTitle" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 id="dispatchModalTitle" className="font-display font-bold text-sm text-slate-900">Schedule New Dispatch Session</h3>
        <button onClick={() => closeDispatchModal()} aria-label="Close dispatch modal" className="text-slate-400 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none rounded">
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>

      <form onSubmit={(event) => handleDispatchSubmit(event)} className="space-y-3 text-xs">
        <div>
          <label htmlFor="modalStudentSelect" className="block font-bold text-slate-700 mb-1">Select Student</label>
          <select id="modalStudentSelect" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900">
            <option>Camille Sison (SP-2024-9452) — PDC-A</option>
            <option>Joshua Tan (SP-2024-7740) — PDC-M</option>
            <option>Bea Bianca Ramos (SP-2024-8831) — PDC-A</option>
            <option>Angelo Morales (SP-2024-3420) — PDC-MC</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="modalTimeSlot" className="block font-bold text-slate-700 mb-1">Time Slot</label>
            <input type="text" id="modalTimeSlot" defaultValue="01:00 PM - 03:00 PM" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900" />
          </div>
          <div>
            <label htmlFor="modalVehicleSelect" className="block font-bold text-slate-700 mb-1">Training Unit</label>
            <select id="modalVehicleSelect" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900">
              <option>Toyota Vios #03 (Automatic)</option>
              <option>Toyota Vios #01 (Manual)</option>
              <option>Toyota Wigo #02 (Automatic)</option>
              <option>Honda Click 125i #01</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="modalInstructorSelect" className="block font-bold text-slate-700 mb-1">Assigned Instructor</label>
          <select id="modalInstructorSelect" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900">
            <option>Inst. Danilo Cruz</option>
            <option>Engr. Roberto Dalisay</option>
            <option>Inst. Carlo Mendoza</option>
            <option>Inst. Joel Santos</option>
          </select>
        </div>
        <div>
          <label htmlFor="modalCurriculumFocus" className="block font-bold text-slate-700 mb-1">Module / Training Focus</label>
          <input type="text" id="modalCurriculumFocus" defaultValue="PDC Lesson 4: City Intersections & Highway Entry" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900" />
        </div>
        <div className="pt-2 flex justify-end gap-2">
          <button type="button" onClick={() => closeDispatchModal()} className="px-3 py-2 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 shadow-xs focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">Confirm Dispatch</button>
        </div>
      </form>
    </div>
  </div>

  {/* Toast Notification */}
  <div id="schedToast" role="status" aria-live="polite" className="fixed bottom-20 right-6 transform translate-y-32 transition-transform duration-300 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-xl">
    <span className="material-symbols-outlined text-emerald-400">task_alt</span>
    <div className="flex flex-col text-xs">
      <span className="font-bold" id="schedToastTitle">Schedule Updated</span>
      <span className="text-slate-300" id="schedToastMsg">Session slotted successfully</span>
    </div>
  </div>

    </>
  );
}