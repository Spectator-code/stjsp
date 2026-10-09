"use client";
import HeaderAvatar from "../../../components/HeaderAvatar";

import { useEffect } from "react";
import Link from "next/link";

export default function SchedulingClient({ sessions, activeEnrollments, activeStudents, pendingBalancesCount }) {

  const getGridStyle = (startTimeStr, endTimeStr) => {
    let startHour = 8;
    let endHour = 10;
    try {
      if (startTimeStr && startTimeStr.includes('T')) {
        startHour = new Date(startTimeStr).getHours();
        endHour = new Date(endTimeStr).getHours();
      } else if (startTimeStr) {
        startHour = parseInt(startTimeStr.split(':')[0]);
        endHour = parseInt(endTimeStr.split(':')[0]);
        if (startTimeStr.includes('PM') && startHour !== 12) startHour += 12;
        if (endTimeStr.includes('PM') && endHour !== 12) endHour += 12;
      }
    } catch(e) {}
    
    let startCol = Math.max(1, startHour - 8 + 1);
    let span = Math.max(1, endHour - startHour);
    
    return { gridColumnStart: startCol, gridColumnEnd: 'span ' + span };
  };

  function showSchedToast(title, msg) {
    const toast = document.getElementById('schedToast');
    if (!toast) return;
    const tt = document.getElementById('schedToastTitle'); if (tt) tt.textContent = title;
    const tm = document.getElementById('schedToastMsg'); if (tm) tm.textContent = msg;
    toast.classList.remove('translate-y-32');
    setTimeout(() => { toast.classList.add('translate-y-32'); }, 4000);
  }

  function selectSlot(sessionId, studentName, permit, instructor, vehicle, time, curriculum, objectives) {
    if (typeof window !== 'undefined') window.currentSelectedSessionId = sessionId;
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

  async function handleDispatchSubmit(e) {
    e.preventDefault();
    
    const selectEl = document.getElementById('modalStudentSelect');
    const enrollment_ids = Array.from(selectEl.selectedOptions).map(o => o.value);
    const timeSlot = document.getElementById('modalTimeSlot').value; // e.g., "01:00 PM - 03:00 PM"
    const vehicle_id = document.getElementById('modalVehicleSelect').value;
    const instructor_id = document.getElementById('modalInstructorSelect').value;
    const notes = document.getElementById('modalCurriculumFocus').value;
    
    // Parse times
    let start_time = "13:00";
    let end_time = "15:00";
    try {
       const [start, end] = timeSlot.split(' - ');
       start_time = start;
       end_time = end;
    } catch(e) {}
    
    const isoDate = new Date().toISOString().split('T')[0];

    try {
      const res = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enrollment_ids,
          date: isoDate,
          start_time,
          end_time,
          instructor_id,
          vehicle_id,
          notes,
          status: 'pending'
        })
      });
      if (!res.ok) throw new Error('Failed to create session');
      
      closeDispatchModal();
      showSchedToast('Dispatch Scheduled', 'New session booked and assigned to instructor with dual-control telematics.');
      setTimeout(() => window.location.reload(), 1500);
    } catch(err) {
      alert("Error scheduling session: " + err.message);
    }
  }

  
  async function reassignCar() {
    const sessionId = window.currentSelectedSessionId;
    if (!sessionId) { alert('Please select a session on the grid first.'); return; }
    
    const newCar = prompt('Enter the name of the new vehicle to reassign:');
    if (!newCar) return;
    
    try {
      const res = await fetch('/api/sessions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: sessionId, vehicle_info: newCar })
      });
      if (!res.ok) throw new Error('Failed to update vehicle');
      showSchedToast('Unit Reassigned', 'Successfully updated the training unit.');
      setTimeout(() => window.location.reload(), 1500);
    } catch(e) {
      alert('Error updating session: ' + e.message);
    }
  }

  async function reassignInstructor() {
    const sessionId = window.currentSelectedSessionId;
    if (!sessionId) { alert('Please select a session on the grid first.'); return; }
    
    const newInstructor = prompt('Enter the name of the new instructor to reassign:');
    if (!newInstructor) return;
    
    try {
      const res = await fetch('/api/sessions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: sessionId, instructor_name: newInstructor })
      });
      if (!res.ok) throw new Error('Failed to update instructor');
      showSchedToast('Instructor Reassigned', 'Successfully updated the designated instructor.');
      setTimeout(() => window.location.reload(), 1500);
    } catch(e) {
      alert('Error updating session: ' + e.message);
    }
  }

  async function rescheduleSession() {
    const sessionId = window.currentSelectedSessionId;
    if (!sessionId) { alert('Please select a session on the grid first.'); return; }
    
    const newStart = prompt('Enter new start time (e.g. 01:00 PM):');
    if (!newStart) return;
    const newEnd = prompt('Enter new end time (e.g. 03:00 PM):');
    if (!newEnd) return;
    
    let startTimestamp = new Date();
    let endTimestamp = new Date();
    
    try {
        const timeParts = newStart.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (timeParts) {
            let hours = parseInt(timeParts[1]);
            const mins = parseInt(timeParts[2]);
            if (timeParts[3].toUpperCase() === 'PM' && hours < 12) hours += 12;
            if (timeParts[3].toUpperCase() === 'AM' && hours === 12) hours = 0;
            startTimestamp.setHours(hours, mins, 0, 0);
        }
        
        const endTimeParts = newEnd.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (endTimeParts) {
            let hours = parseInt(endTimeParts[1]);
            const mins = parseInt(endTimeParts[2]);
            if (endTimeParts[3].toUpperCase() === 'PM' && hours < 12) hours += 12;
            if (endTimeParts[3].toUpperCase() === 'AM' && hours === 12) hours = 0;
            endTimestamp.setHours(hours, mins, 0, 0);
        }
    } catch(e) {}

    try {
      const res = await fetch('/api/sessions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: sessionId, start_time: startTimestamp.toISOString(), end_time: endTimestamp.toISOString() })
      });
      if (!res.ok) throw new Error('Failed to update time');
      showSchedToast('Session Rescheduled', 'Successfully moved to ' + newStart);
      setTimeout(() => window.location.reload(), 1500);
    } catch(e) {
      alert('Error updating session: ' + e.message);
    }
  }

  async function cancelCurrentSession() {
    const studentEl = document.getElementById('slot-student');
    const student = studentEl ? studentEl.textContent : 'Assigned Student';
    const sessionId = window.currentSelectedSessionId;
    if (!sessionId) {
      alert('Please select a session on the grid first.');
      return;
    }
    
    if (confirm('Are you sure you want to cancel the scheduled practical driving session for ' + student + '? This will open the time slot on the daily dispatch matrix.')) {
      try {
        const res = await fetch('/api/sessions', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: sessionId, status: 'cancelled' })
        });
        if (!res.ok) throw new Error('Failed to cancel session');
        showSchedToast('Session Cancelled', 'Session for ' + student + ' removed from matrix. Slot now open.');
        setTimeout(() => window.location.reload(), 1500);
      } catch(e) {
        alert('Error cancelling session: ' + e.message);
      }
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

  function broadcastSmsReminders() {
    showSchedToast("SMS Reminders Dispatched", "Official session reminders transmitted to all 36 students scheduled for today's sessions.");
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
    window.reassignCar = reassignCar;
    window.rescheduleSession = rescheduleSession;
    window.switchView = switchView;
    window.shiftDate = shiftDate;
    window.resetToday = resetToday;
    window.filterMatrixRows = filterMatrixRows;
    window.filterMatrixByText = filterMatrixByText;
    window.toggleMark = toggleMark;
    window.broadcastSmsReminders = broadcastSmsReminders;

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
        <span className="w-2 h-2 rounded-full bg-emerald-500 "></span>
        <span className="font-medium">Conflict Detector: <strong>0 Overlaps</strong></span>
      </div>

      <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50/80 border border-emerald-200/60 text-xs text-emerald-800 font-medium">
        <span className="material-symbols-outlined text-sm text-emerald-600">shield_lock</span>
        <span>RA 10173 Protected</span>
      </div>

      

      {/* Profile */}
      <HeaderAvatar fallbackName="Maria Elena Santos" fallbackRole="Registrar & Admin" />
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

                            {sessions && sessions.length > 0 ? sessions.map((session, idx) => (
                <div key={session.id || idx} onClick={() => window.selectSlot(
    session.id,
    (session.enrollments?.profiles?.first_name || '') + ' ' + (session.enrollments?.profiles?.last_name || ''),
    'SP-2024-' + (session.enrollments?.profiles?.mobile_number || '8831').slice(-4),
    session.instructor_name || 'Assigned Instructor',
    session.vehicle_info || 'Training Unit',
    
    (session.start_time.includes('T') ? new Date(session.start_time).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}) : session.start_time) + ' - ' + (session.end_time.includes('T') ? new Date(session.end_time).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}) : session.end_time),
    session.notes || 'Practical Lesson',
    'Follow strictly to the practical curriculum focus selected.'

  )} className="grid grid-cols-10 hover:bg-slate-50 cursor-pointer group border-b border-slate-100">
                  <div className="col-span-2 py-3 px-3 flex flex-col justify-center border-r border-slate-100 relative">
                    <span className="font-bold text-xs text-slate-900 group-hover:text-amber-600 transition-colors truncate">{session.instructor_name || 'Instructor'}</span>
                    <span className="text-[10px] text-slate-500 truncate">{session.vehicle_info || 'Unit'}</span>
                  </div>
                  <div className="col-span-8 p-1.5 grid grid-cols-8 gap-1.5 relative min-h-[50px]">
                    <div className="relative p-1.5 rounded-lg border border-slate-200 bg-emerald-50 shadow-xs flex flex-col hover:border-emerald-300 transition-colors h-full" style={getGridStyle(session.start_time, session.end_time)}>
                       <span className="text-[10px] font-bold text-emerald-900 truncate block">{session.enrollments?.profiles?.first_name} {session.enrollments?.profiles?.last_name}</span>
                       <span className="text-[9px] text-emerald-700 flex items-center gap-1 mt-0.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{session.start_time.includes('T') ? new Date(session.start_time).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}) : session.start_time} - {session.end_time.includes('T') ? new Date(session.end_time).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}) : session.end_time}</span>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="py-12 text-center text-slate-500 font-medium">
                  No scheduled training slots found.
                </div>
              )}

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
              <p className="text-xs text-slate-600">St. Pio Building, Purok Magsanoc, Mankilam Campus, Tagum City • Official Accr: DS-R11-2021-089</p>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1">Official Daily In-Car Trip Ticket &amp; Evaluation Manifest</p>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-800 text-lg">tune</span>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Slot Inspector</span>
                  <h3 className="font-display text-sm font-bold text-slate-900" id="slot-time-header">--:--</h3>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">Active Run</span>
            </div>

            {/* Student Card Block */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0" id="student-initial">
                ?
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Student Driver</span>
                <span className="font-bold text-xs text-slate-900 truncate" id="slot-student">No Student Selected</span>
                <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mt-0.5 font-mono">
                  <span className="material-symbols-outlined text-xs text-amber-600">badge</span>
                  <span id="slot-permit">SP-XXXX-XXXX</span>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Designated Instructor</span>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="font-bold text-slate-900" id="slot-instructor">-</span>
                  <span className="text-[10px] bg-white border border-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-semibold">Official Certified</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Allocated Unit</span>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="font-bold text-slate-900 truncate" id="slot-vehicle">-</span>
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
                <span className="font-bold text-slate-900 block mt-0.5" id="slot-curriculum">-</span>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed" id="slot-objectives">Select a schedule block on the left to view training objectives and details.</p>
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
                <button onClick={() => window.rescheduleSession()} className="py-1.5 px-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">
                  <span className="material-symbols-outlined text-xs">schedule</span>
                  Reschedule
                </button>
                <button onClick={() => window.reassignCar()} className="py-1.5 px-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">
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
                <p className="border-t border-slate-800 pt-1 font-semibold">Instructor Signature &amp; Official ID</p>
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
          <select id="modalStudentSelect" required defaultValue="" onChange={(e) => {
              const selectedId = e.target.value;
              const enrollment = activeEnrollments.find(en => en.id === selectedId);
              const courseName = enrollment?.courses?.name || '';
              const focusInput = document.getElementById('modalCurriculumFocus');
              if (focusInput) {
                if (courseName.includes('TDC')) {
                  focusInput.value = 'Theoretical Driving Course';
                } else if (courseName.includes('Manual')) {
                  focusInput.value = 'PDC Lesson: Manual Driving & Clutch Control';
                } else if (courseName.includes('Automatic')) {
                  focusInput.value = 'PDC Lesson: Automatic Driving Basics';
                } else if (courseName.includes('Motorcycle')) {
                  focusInput.value = 'PDC Lesson: Motorcycle Handling & Balance';
                } else {
                  focusInput.value = 'PDC Lesson: Practical Driving Assessment';
                }
              }
            }} className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900">
            <option value="" disabled>-- Select an Active Student --</option>
            {activeEnrollments && activeEnrollments.map(e => (
              <option key={e.id} value={e.id}>
                {e.profiles?.first_name} {e.profiles?.last_name} (SP-{(e.profiles?.mobile_number || '0000').slice(-4)}) — {e.courses?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="modalTimeSlot" className="block font-bold text-slate-700 mb-1">Time Slot</label>
            <input type="text" id="modalTimeSlot" placeholder="e.g. 01:00 PM - 03:00 PM" required className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900" />
          </div>
          <div>
            <label htmlFor="modalVehicleSelect" className="block font-bold text-slate-700 mb-1">Training Unit</label>
            <select id="modalVehicleSelect" required defaultValue="" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900">
              <option value="" disabled>-- Select Unit --</option>
              <option value="Classroom / Simulator">Classroom / Simulator</option>
              <option value="Toyota Vios #03 (Automatic)">Toyota Vios #03 (Automatic)</option>
              <option value="Toyota Vios #01 (Manual)">Toyota Vios #01 (Manual)</option>
              <option value="Toyota Wigo #02 (Automatic)">Toyota Wigo #02 (Automatic)</option>
              <option value="Honda Click 125i #01">Honda Click 125i #01</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="modalInstructorSelect" className="block font-bold text-slate-700 mb-1">Assigned Instructor</label>
          <select id="modalInstructorSelect" required defaultValue="" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900">
            <option value="" disabled>-- Select Instructor --</option>
            <option value="Inst. Danilo Cruz">Inst. Danilo Cruz</option>
            <option value="Engr. Roberto Dalisay">Engr. Roberto Dalisay</option>
            <option value="Inst. Carlo Mendoza">Inst. Carlo Mendoza</option>
            <option value="Inst. Joel Santos">Inst. Joel Santos</option>
          </select>
        </div>
        <div>
          <label htmlFor="modalCurriculumFocus" className="block font-bold text-slate-700 mb-1">Module / Training Focus</label>
          <input type="text" id="modalCurriculumFocus" placeholder="e.g. PDC Lesson 1: Basics" required className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900" />
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