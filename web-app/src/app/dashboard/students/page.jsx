"use client";
export default function Students() {
  return (
    <>
      

  {/* Sidebar */}
  <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 z-50 flex flex-col justify-between">
    <div className="flex flex-col">
      {/* Logo Header */}
      <div className="h-16 px-5 border-b border-slate-100 flex items-center gap-3">
        <img src="../assets/images/logo.png" alt="St. Joseph Cupertino Logo" className="h-9 w-9 aspect-square rounded-lg object-cover mix-blend-multiply" />
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
          <a href="/dashboard/operations" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors font-medium">
            <span className="material-symbols-outlined text-base">dashboard</span>
            Operations Dashboard
          </a>
          <a href="/dashboard/scheduling" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors font-medium">
            <span className="material-symbols-outlined text-base">calendar_month</span>
            Scheduling & Dispatch
          </a>
          <a href="/dashboard/students" className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-900 text-white font-medium transition-colors shadow-xs">
            <span className="material-symbols-outlined text-base">school</span>
            Students & Progress
          </a>
          <a href="/dashboard/tuition" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors font-medium">
            <span className="material-symbols-outlined text-base">receipt_long</span>
            Tuition & Payments
          </a>
          <a href="/dashboard/fleet" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors font-medium">
            <span className="material-symbols-outlined text-base">directions_car</span>
            Fleet & Instructors
          </a>
          <a href="/dashboard/reports" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors font-medium">
            <span className="material-symbols-outlined text-base">verified_user</span>
            Reports & Compliance
          </a>

          <div className="pt-3 my-2 border-t border-slate-100"></div>

          <a href="/" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors font-medium">
            <span className="material-symbols-outlined text-base">public</span>
            Public Website
          </a>
          <a href="/portal?tab=login" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors font-medium">
            <span className="material-symbols-outlined text-base">logout</span>
            Sign Out
          </a>
        </nav>
      </div>
    </div>

    {/* Bottom System Status */}
    <div className="p-3 border-t border-slate-100 bg-slate-50/50">
      <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-slate-600 font-medium">LTO LTMS Registry</span>
        </div>
        <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-bold">SYNCED</span>
      </div>
    </div>
  </aside>

  {/* Top Header */}
  <header className="fixed top-0 left-64 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 z-40 px-6 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-xs">
        <span className="text-slate-400">Tagum Main Campus</span>
        <span className="text-slate-300">/</span>
        <span className="font-semibold text-slate-800">Students & Academic Progress</span>
      </div>

      <div className="relative hidden lg:block w-72">
        <span className="material-symbols-outlined absolute left-2.5 top-2 text-slate-400 text-sm">search</span>
        <input id="topStudentSearch" onInput={(e) => window.filterStudents(e.target.value)} type="text" placeholder="Search by student name or permit #..." className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all" />
      </div>
    </div>

    <div className="flex items-center gap-3">
      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200/70 text-xs text-slate-600">
        <span className="material-symbols-outlined text-sm text-slate-700">school</span>
        <span>Active Roster: <strong className="text-slate-900">148</strong></span>
        <span className="text-slate-300">•</span>
        <span><strong className="text-emerald-700">22</strong> LTO Certified</span>
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
  <main className="ml-64 pt-16 min-h-screen bg-slate-50 overflow-x-hidden">
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto xl:max-w-none">

      {/* Header & Top Summary Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">Academic Records</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500">Tagum City Pioneer Campus</span>
          </div>
          <h1 className="font-display text-2xl font-extrabold text-slate-900 tracking-tight">Student Directory & Training Progress</h1>
          <p className="text-xs text-slate-500 mt-0.5">Real-time competency tracking for Theoretical Driving (TDC) and Practical Driving (PDC) courses.</p>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => {window.syncLTMSGateway()}} className="px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs">
            <span className="material-symbols-outlined text-sm">sync</span>
            Sync LTMS
          </button>
          <a href="/../portal?tab=enroll" className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs">
            <span className="material-symbols-outlined text-sm">person_add</span>
            + Register Student
          </a>
        </div>
      </div>

      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Roster</span>
            <div className="font-display text-2xl font-extrabold text-slate-900 mt-0.5">148</div>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
              <span className="material-symbols-outlined text-xs">arrow_upward</span> +14 this week
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
            <span className="material-symbols-outlined text-lg">groups</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">In Practical (PDC)</span>
            <div className="font-display text-2xl font-extrabold text-slate-900 mt-0.5">94</div>
            <span className="text-[11px] text-slate-500 mt-0.5">Dual-control fleet active</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-slate-100 text-amber-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-lg">directions_car</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Awaiting Mock Exam</span>
            <div className="font-display text-2xl font-extrabold text-slate-900 mt-0.5">32</div>
            <span className="text-[11px] text-amber-600 font-semibold mt-0.5">8 slotted today</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
            <span className="material-symbols-outlined text-lg">fact_check</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">LTO Certified / Grad</span>
            <div className="font-display text-2xl font-extrabold text-slate-900 mt-0.5">22</div>
            <span className="text-[11px] text-emerald-600 font-semibold mt-0.5">Ready for License</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
            <span className="material-symbols-outlined text-lg">verified</span>
          </div>
        </div>
      </div>

      {/* Filters & Global Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0" id="statusFilterGroup">
          <button onClick={() => {window.filterStatus('all', this)}} className="filter-btn px-3 py-1.5 rounded-lg bg-slate-900 text-white font-semibold text-xs whitespace-nowrap shadow-xs">
            All Students (148)
          </button>
          <button onClick={() => {window.filterStatus('training', this)}} className="filter-btn px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 font-medium text-xs whitespace-nowrap transition-colors">
            In Training (94)
          </button>
          <button onClick={() => {window.filterStatus('completed', this)}} className="filter-btn px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 font-medium text-xs whitespace-nowrap transition-colors">
            Completed (32)
          </button>
          <button onClick={() => {window.filterStatus('certified', this)}} className="filter-btn px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 font-medium text-xs whitespace-nowrap transition-colors">
            Certified (22)
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-slate-400 text-sm">search</span>
            <input id="studentTableSearch" onInput={(e) => window.filterStudents(e.target.value)} type="text" placeholder="Filter SP number, name..." className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900" />
          </div>
          <button onClick={() => {window.clearStudentFilters()}} className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1 transition-colors">
            <span className="material-symbols-outlined text-sm">refresh</span>
            Reset
          </button>
        </div>
      </div>

      {/* Master-Detail Workstation Layout */}
      <div className="grid grid-cols-1 2xl:grid-cols-12 gap-6 items-start">
        
        {/* Left Master Roster (7 cols) */}
        <div className="2xl:col-span-7 flex flex-col rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-sm font-bold text-slate-900">Student Registry Roster</h2>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">Active Cohort</span>
            </div>
            <span className="text-xs text-slate-400">Showing 5 of 148</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left text-xs">
              <thead className="bg-slate-50/75 border-b border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 whitespace-nowrap">Student Profile</th>
                  <th className="py-3 px-4 whitespace-nowrap">Package</th>
                  <th className="py-3 px-4 whitespace-nowrap">Student Permit</th>
                  <th className="py-3 px-4 whitespace-nowrap">Hours Tracked</th>
                  <th className="py-3 px-4 whitespace-nowrap">Instructor</th>
                  <th className="py-3 px-4 whitespace-nowrap">Tuition Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100" id="studentsTableBody">
                
                {/* Student 1 (Active Selected) */}
                <tr className="student-row bg-slate-50 hover:bg-slate-100/70 transition-colors cursor-pointer border-l-4 border-slate-900" data-status="training" onClick={() => {window.showStudentDetail('Gabriel Santos', 'SJD-2024-089', 'SP-11-2024-009284', 'PDC Manual 15-Hour Deluxe', '12 / 15 hrs', 80, '96%', '100%', 'Roberto Aquino', 'Fully Paid', 'Receipt #8921', 'GS')}}>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        GS
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-xs text-slate-900 truncate">Gabriel Santos</span>
                        <span className="text-[10px] text-slate-400 font-mono">ID: SJD-2024-089</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-800">PDC Sedan MT</div>
                    <div className="text-[10px] text-slate-400">15-Hour Deluxe</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-mono text-slate-700 font-medium">SP-11-2024-009284</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">Valid: Nov 2025</div>
                  </td>
                  <td className="py-3.5 px-4 min-w-[130px]">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold text-slate-900">12/15 Hrs</span>
                      <span className="text-slate-500 font-semibold">80%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-slate-900 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-medium text-slate-800">R. Aquino</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">Paid</span>
                    <div className="text-[10px] text-slate-400 mt-0.5">#8921</div>
                  </td>
                </tr>

                {/* Student 2 */}
                <tr className="student-row hover:bg-slate-50 transition-colors cursor-pointer" data-status="training" onClick={() => {window.showStudentDetail('Bea Nicole Reyes', 'SJD-2024-114', 'SP-11-2024-012903', 'PDC Automatic Sedan 8-Hour', '6 / 8 hrs', 75, '92%', '100%', 'Carlo Dalisay', '₱2,500 Bal.', 'Due Oct 30', 'BR')}}>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        BR
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-xs text-slate-900 truncate">Bea Nicole Reyes</span>
                        <span className="text-[10px] text-slate-400 font-mono">ID: SJD-2024-114</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-800">PDC Sedan AT</div>
                    <div className="text-[10px] text-slate-400">8-Hour Standard</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-mono text-slate-700 font-medium">SP-11-2024-012903</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">Valid: Aug 2025</div>
                  </td>
                  <td className="py-3.5 px-4 min-w-[130px]">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold text-slate-900">6/8 Hrs</span>
                      <span className="text-slate-500 font-semibold">75%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-slate-900 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-medium text-slate-800">C. Dalisay</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">₱2,500 Bal</span>
                    <div className="text-[10px] text-slate-400 mt-0.5">Due Oct 30</div>
                  </td>
                </tr>

                {/* Student 3 */}
                <tr className="student-row hover:bg-slate-50 transition-colors cursor-pointer" data-status="completed" onClick={() => {window.showStudentDetail('Joshua Mendoza', 'SJD-2024-041', 'SP-11-2024-004319', 'PDC Motorcycle Manual 8-Hour', '8 / 8 hrs', 100, '98%', '100%', 'E. Laureano', 'Fully Paid', 'Receipt #8740', 'JM')}}>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        JM
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-xs text-slate-900 truncate">Joshua Mendoza</span>
                        <span className="text-[10px] text-slate-400 font-mono">ID: SJD-2024-041</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-800">PDC Motorcycle MT</div>
                    <div className="text-[10px] text-slate-400">8-Hour Class A</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-mono text-slate-700 font-medium">SP-11-2024-004319</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">Valid: Jan 2026</div>
                  </td>
                  <td className="py-3.5 px-4 min-w-[130px]">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold text-slate-900">8/8 Hrs</span>
                      <span className="text-emerald-600 font-semibold">100%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-medium text-slate-800">E. Laureano</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">Paid</span>
                    <div className="text-[10px] text-slate-400 mt-0.5">#8740</div>
                  </td>
                </tr>

                {/* Student 4 */}
                <tr className="student-row hover:bg-slate-50 transition-colors cursor-pointer" data-status="training" onClick={() => {window.showStudentDetail('Maria Clarissa Ramos', 'SJD-2024-072', 'SP-11-2024-008119', 'PDC Light SUV Automatic 10-Hour', '4 / 10 hrs', 40, '94%', '100%', 'Roberto Aquino', '₱1,800 Bal.', 'Due Nov 05', 'MR')}}>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        MR
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-xs text-slate-900 truncate">Maria Clarissa Ramos</span>
                        <span className="text-[10px] text-slate-400 font-mono">ID: SJD-2024-072</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-800">PDC SUV AT</div>
                    <div className="text-[10px] text-slate-400">10-Hour Executive</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-mono text-slate-700 font-medium">SP-11-2024-008119</div>
                    <div className="text-[10px] text-amber-600 font-semibold">Exp: 22 Days</div>
                  </td>
                  <td className="py-3.5 px-4 min-w-[130px]">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold text-slate-900">4/10 Hrs</span>
                      <span className="text-slate-500 font-semibold">40%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-slate-900 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-medium text-slate-800">R. Aquino</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">₱1,800 Bal</span>
                    <div className="text-[10px] text-slate-400 mt-0.5">Due Nov 05</div>
                  </td>
                </tr>

                {/* Student 5 */}
                <tr className="student-row hover:bg-slate-50 transition-colors cursor-pointer" data-status="training" onClick={() => {window.showStudentDetail('John Patrick Lim', 'SJD-2024-101', 'SP-11-2024-009981', 'PDC Light Manual 15-Hour Deluxe', '1 / 15 hrs', 7, '90%', '100%', 'V. Torres', 'Fully Paid', 'Receipt #8902', 'JL')}}>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        JL
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-xs text-slate-900 truncate">John Patrick Lim</span>
                        <span className="text-[10px] text-slate-400 font-mono">ID: SJD-2024-101</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-800">PDC Sedan MT</div>
                    <div className="text-[10px] text-slate-400">15-Hour Deluxe</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-mono text-slate-700 font-medium">SP-11-2024-009981</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">Valid: Oct 2025</div>
                  </td>
                  <td className="py-3.5 px-4 min-w-[130px]">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold text-slate-900">1/15 Hrs</span>
                      <span className="text-slate-500 font-semibold">7%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-slate-900 rounded-full" style={{ width: '7%' }}></div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-medium text-slate-800">V. Torres</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">Paid</span>
                    <div className="text-[10px] text-slate-400 mt-0.5">#8902</div>
                  </td>
                </tr>

                {/* Student 6 (Certified Graduate) */}
                <tr className="student-row hover:bg-slate-50 transition-colors cursor-pointer" data-status="certified" onClick={() => {window.showStudentDetail('Lorena Grace Villanueva', 'SJD-2024-012', 'SP-11-2023-018593', 'Theoretical (TDC) + PDC Manual 15h', '15 / 15 hrs', 100, '96%', '100%', 'Grace Mendoza', 'Fully Paid', 'Receipt #8550', 'LV')}}>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        LV
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-xs text-slate-900 truncate">Lorena Grace Villanueva</span>
                        <span className="text-[10px] text-slate-400 font-mono">ID: SJD-2024-012</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-800">TDC + PDC Bundle</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">Cert: TDC-2024-0981</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-mono text-slate-700 font-medium">SP-11-2023-018593</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">LTMS Synced</div>
                  </td>
                  <td className="py-3.5 px-4 min-w-[130px]">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold text-emerald-700">15/15 Hrs</span>
                      <span className="text-emerald-700 font-bold">100%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-medium text-slate-800">G. Mendoza</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold">Certified</span>
                    <div className="text-[10px] text-slate-400 mt-0.5">#8550</div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-4">
            <span id="pageCountLabel">Page 1 of 2 • 6 Students Listed</span>
            <div className="flex items-center gap-1">
              <button onClick={() => {window.shiftStudentPage(1)}} className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 transition-colors text-slate-700 font-semibold">Previous</button>
              <button onClick={() => {window.shiftStudentPage(1)}} id="pageBtn1" className="px-2 py-1 rounded bg-slate-900 text-white font-semibold">1</button>
              <button onClick={() => {window.shiftStudentPage(2)}} id="pageBtn2" className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 transition-colors text-slate-700 font-semibold">2</button>
              <button onClick={() => {window.shiftStudentPage(2)}} className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 transition-colors text-slate-700 font-semibold">Next</button>
            </div>
          </div>
        </div>

        {/* Right Student Detail Dossier (5 cols) */}
        <div className="2xl:col-span-5 flex flex-col gap-4 sticky top-20">
          
          {/* Focus Student Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
            
            {/* Student Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white font-display font-extrabold text-xl flex items-center justify-center shrink-0 shadow-xs" id="detail-initial">
                  GS
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-base font-bold text-slate-900" id="detail-name">Gabriel Santos</h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold" id="detail-status-pill">Active</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5" id="detail-package">PDC Manual 15-Hour Deluxe Package</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5" id="detail-permit">Permit: SP-11-2024-009284</div>
                </div>
              </div>

              <button onClick={() => {window.editStudent()}} className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors" title="Edit Student Profile">
                <span className="material-symbols-outlined text-base">edit</span>
              </button>
            </div>

            {/* Core Progress Metrics Strip */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Practical</span>
                <div className="font-display text-base font-bold text-slate-900 mt-0.5" id="detail-hours">12 / 15 hrs</div>
                <span className="text-[10px] text-emerald-600 font-semibold" id="detail-hours-pct">80% Done</span>
              </div>
              <div className="border-x border-slate-200/80 px-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">TDC Exam</span>
                <div className="font-display text-base font-bold text-slate-900 mt-0.5" id="detail-tdc">96%</div>
                <span className="text-[10px] text-emerald-600 font-semibold">Passed</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Attendance</span>
                <div className="font-display text-base font-bold text-slate-900 mt-0.5" id="detail-attendance">100%</div>
                <span className="text-[10px] text-slate-500 font-medium">4/4 Sessions</span>
              </div>
            </div>

            {/* LTO Regulatory Compliance Checklist */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-amber-600 text-sm">verified_user</span>
                  LTO Compliance Document Checklist
                </h4>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">100% Cleared</span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                    <div>
                      <div className="font-semibold text-slate-800">Valid LTO Student Permit</div>
                      <div className="text-[10px] text-slate-400 font-mono" id="docPermit">SP-11-2024-009284 • Verified Online</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-white border border-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-semibold">Verified</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                    <div>
                      <div className="font-semibold text-slate-800">Medical Certificate (LTO Clinic)</div>
                      <div className="text-[10px] text-slate-400">Clinica San Jose Tagum • Fit to Drive</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-white border border-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-semibold">Approved</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                    <div>
                      <div className="font-semibold text-slate-800">TDC Certificate of Completion</div>
                      <div className="text-[10px] text-slate-400" id="docTdc">TDC-2024-08910 Issued Oct 12, 2024</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-white border border-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-semibold">Issued</span>
                </div>
              </div>
            </div>

            {/* Instructor In-Car Feedback */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-slate-600">edit_note</span>
                  Instructor In-Car Feedback
                </span>
                <span className="text-[10px] text-slate-500" id="detail-instructor-lead">Lead: Roberto Aquino</span>
              </div>
              <p className="text-[11px] text-slate-600 italic leading-relaxed" id="detail-feedback">
                “Gabriel demonstrates steady steering balance and prompt hazard recognition during multi-lane roundabouts. Clutch bite control has significantly stabilized since session 2.”
              </p>
              <div className="text-[10px] text-slate-400 font-mono">Logged: Oct 21, 2024 • Evaluation Logged via In-Car Dual Pad #04</div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button onClick={() => {window.issueCertificate()}} className="py-2 px-3 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 shadow-xs">
                <span className="material-symbols-outlined text-sm">workspace_premium</span>
                Issue Certificate
              </button>
              <button onClick={() => {window.logStudentScore()}} className="py-2 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors">
                <span className="material-symbols-outlined text-sm">assignment_add</span>
                Log Score
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  </main>

  {/* Modal: Edit Student Profile */}
  <div id="editStudentModal" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="font-display font-bold text-sm text-slate-900">Edit Student Record</h3>
        <button onClick={() => {window.closeStudentModal('editStudentModal')}} className="text-slate-400 hover:text-slate-900">
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>

      <form onSubmit={(event) => { window.saveStudentEdit(event) }} className="space-y-3 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Student Full Name</label>
          <input type="text" id="editNameInput" required className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900" />
        </div>
        <div>
          <label className="block font-bold text-slate-700 mb-1">Permit Number</label>
          <input type="text" id="editPermitInput" required className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900" />
        </div>
        <div>
          <label className="block font-bold text-slate-700 mb-1">Assigned Course Package</label>
          <select id="editPkgInput" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900">
            <option>PDC Manual 15-Hour Deluxe</option>
            <option>PDC Automatic Sedan 8-Hour</option>
            <option>PDC Motorcycle Manual 8-Hour</option>
            <option>PDC Light SUV Automatic 10-Hour</option>
            <option>Theoretical (TDC) + PDC Bundle</option>
          </select>
        </div>
        <div className="pt-2 flex justify-end gap-2">
          <button type="button" onClick={() => {window.closeStudentModal('editStudentModal')}} className="px-3 py-2 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 shadow-xs">Save Changes</button>
        </div>
      </form>
    </div>
  </div>

  {/* Modal: Log Competency Score */}
  <div id="scoreModal" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="font-display font-bold text-sm text-slate-900">Log In-Car Practical Evaluation</h3>
        <button onClick={() => {window.closeStudentModal('scoreModal')}} className="text-slate-400 hover:text-slate-900">
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>

      <form onSubmit={(event) => { window.saveStudentScore(event) }} className="space-y-3 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Student</label>
          <input type="text" id="scoreStudentName" readonly className="w-full px-3 py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-600" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Practical Hours (+)</label>
            <input type="number" id="addHoursInput" min="1" max="5" defaultValue="2" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Score (out of 100)</label>
            <input type="number" id="evalScoreInput" min="50" max="100" defaultValue="95" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900" />
          </div>
        </div>
        <div>
          <label className="block font-bold text-slate-700 mb-1">Instructor Comments</label>
          <textarea id="evalCommentInput" rows="3" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900" placeholder="Smooth clutch control, accurate hand-over-hand turning..."></textarea>
        </div>
        <div className="pt-2 flex justify-end gap-2">
          <button type="button" onClick={() => {window.closeStudentModal('scoreModal')}} className="px-3 py-2 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 shadow-xs">Post Evaluation</button>
        </div>
      </form>
    </div>
  </div>

  {/* Toast Notification */}
  <div id="studentToast" className="fixed bottom-6 right-6 transform translate-y-32 transition-transform duration-300 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-xl">
    <span className="material-symbols-outlined text-emerald-400">task_alt</span>
    <div className="flex flex-col text-xs">
      <span className="font-bold" id="studentToastTitle">Record Synchronized</span>
      <span className="text-slate-300" id="studentToastMsg">Notification details</span>
    </div>
  </div>

  <script dangerouslySetInnerHTML={{ __html: "\n    let activeStudent = {\n      name: 'Gabriel Santos',\n      id: 'SJD-2024-089',\n      permit: 'SP-11-2024-009284',\n      pkg: 'PDC Manual 15-Hour Deluxe',\n      hours: '12 / 15 hrs',\n      hoursPct: 80,\n      tdcScore: '96%',\n      attendance: '100%',\n      instructor: 'Roberto Aquino'\n    };\n\n    function showStudentToast(title, msg) {\n      const toast = document.getElementById('studentToast');\n      document.getElementById('studentToastTitle').textContent = title;\n      document.getElementById('studentToastMsg').textContent = msg;\n      toast.classList.remove('translate-y-32');\n      setTimeout(() => { toast.classList.add('translate-y-32'); }, 4000);\n    }\n\n    function showStudentDetail(name, id, permit, pkg, hours, hoursPct, tdcScore, attendance, instructor, paymentStatus, receiptNo, initial) {\n      activeStudent = { name, id, permit, pkg, hours, hoursPct, tdcScore, attendance, instructor };\n      document.getElementById('detail-name').textContent = name;\n      document.getElementById('detail-initial').textContent = initial;\n      document.getElementById('detail-package').textContent = pkg;\n      document.getElementById('detail-permit').textContent = 'Permit: ' + permit;\n      document.getElementById('detail-hours').textContent = hours;\n      document.getElementById('detail-hours-pct').textContent = hoursPct + '% Done';\n      document.getElementById('detail-tdc').textContent = tdcScore;\n      document.getElementById('detail-attendance').textContent = attendance;\n      document.getElementById('detail-instructor-lead').textContent = 'Lead: ' + instructor;\n      document.getElementById('docPermit').textContent = permit + ' • Verified Online';\n\n      const statusPill = document.getElementById('detail-status-pill');\n      if (hoursPct >= 100) {\n        statusPill.textContent = 'Certified / Completed';\n        statusPill.className = 'px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold';\n      } else {\n        statusPill.textContent = 'Active In-Training';\n        statusPill.className = 'px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold';\n      }\n\n      // Highlight active row\n      const rows = document.querySelectorAll('.student-row');\n      rows.forEach(r => {\n        r.classList.remove('bg-slate-50', 'border-l-4', 'border-slate-900');\n        if (r.innerText.includes(name)) {\n          r.classList.add('bg-slate-50', 'border-l-4', 'border-slate-900');\n        }\n      });\n    }\n\n    function filterStatus(status, btn) {\n      const buttons = document.querySelectorAll('#statusFilterGroup .filter-btn');\n      buttons.forEach(b => {\n        b.className = 'filter-btn px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 font-medium text-xs whitespace-nowrap transition-colors';\n      });\n      btn.className = 'filter-btn px-3 py-1.5 rounded-lg bg-slate-900 text-white font-semibold text-xs whitespace-nowrap shadow-xs';\n\n      const rows = document.querySelectorAll('.student-row');\n      rows.forEach(r => {\n        const rowStatus = r.getAttribute('data-status');\n        if (status === 'all' || rowStatus === status) {\n          r.style.display = '';\n        } else {\n          r.style.display = 'none';\n        }\n      });\n\n      showStudentToast('Roster Filtered', `Showing ${status.toUpperCase()} records in St. Joseph database.`);\n    }\n\n    function filterStudents(val) {\n      const q = val.toLowerCase().trim();\n      const rows = document.querySelectorAll('.student-row');\n      rows.forEach(r => {\n        r.style.display = r.innerText.toLowerCase().includes(q) ? '' : 'none';\n      });\n    }\n\n    function clearStudentFilters() {\n      document.getElementById('topStudentSearch').value = '';\n      document.getElementById('studentTableSearch').value = '';\n      const firstBtn = document.querySelector('#statusFilterGroup .filter-btn');\n      if (firstBtn) filterStatus('all', firstBtn);\n      filterStudents('');\n    }\n\n    function syncLTMSGateway() {\n      showStudentToast('LTO Gateway Synchronized', 'All 148 student driver records verified against regional LTMS database.');\n    }\n\n    function editStudent() {\n      document.getElementById('editNameInput').value = activeStudent.name;\n      document.getElementById('editPermitInput').value = activeStudent.permit;\n      document.getElementById('editStudentModal').classList.remove('hidden');\n    }\n\n    function saveStudentEdit(e) {\n      e.preventDefault();\n      const newName = document.getElementById('editNameInput').value;\n      const newPermit = document.getElementById('editPermitInput').value;\n      const newPkg = document.getElementById('editPkgInput').value;\n      \n      activeStudent.name = newName;\n      activeStudent.permit = newPermit;\n      activeStudent.pkg = newPkg;\n\n      document.getElementById('detail-name').textContent = newName;\n      document.getElementById('detail-permit').textContent = 'Permit: ' + newPermit;\n      document.getElementById('detail-package').textContent = newPkg;\n\n      closeStudentModal('editStudentModal');\n      showStudentToast('Profile Updated', `${newName}'s records saved to registrar database.`);\n    }\n\n    function logStudentScore() {\n      document.getElementById('scoreStudentName').value = activeStudent.name;\n      document.getElementById('scoreModal').classList.remove('hidden');\n    }\n\n    function saveStudentScore(e) {\n      e.preventDefault();\n      const addHours = document.getElementById('addHoursInput').value;\n      const score = document.getElementById('evalScoreInput').value;\n      const comment = document.getElementById('evalCommentInput').value;\n\n      if (comment) {\n        document.getElementById('detail-feedback').textContent = `“${comment}”`;\n      }\n\n      closeStudentModal('scoreModal');\n      showStudentToast('Evaluation Posted', `Logged +${addHours} practical hours (Score: ${score}/100) for ${activeStudent.name}.`);\n    }\n\n    function issueCertificate() {\n      window.location.href = `/dashboard/reports?student=${encodeURIComponent(activeStudent.name)}`;\n    }\n\n    function shiftStudentPage(page) {\n      document.getElementById('pageBtn1').className = page === 1 ? 'px-2 py-1 rounded bg-slate-900 text-white font-semibold' : 'px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 transition-colors text-slate-700 font-semibold';\n      document.getElementById('pageBtn2').className = page === 2 ? 'px-2 py-1 rounded bg-slate-900 text-white font-semibold' : 'px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 transition-colors text-slate-700 font-semibold';\n      document.getElementById('pageCountLabel').textContent = `Page ${page} of 2 • 6 Students Listed`;\n      showStudentToast('Pagination Switched', `Now viewing student roster batch ${page}.`);\n    }\n\n    function closeStudentModal(id) {\n      document.getElementById(id).classList.add('hidden');\n    }\n  " }} />


    </>
  );
}