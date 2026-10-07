"use client";
export default function Tuition() {
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
          <a href="/dashboard/students" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors font-medium">
            <span className="material-symbols-outlined text-base">school</span>
            Students & Progress
          </a>
          <a href="/dashboard/tuition" className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-900 text-white font-medium transition-colors shadow-xs">
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
          <span className="text-slate-600 font-medium">Cashier Till #1</span>
        </div>
        <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-bold">RECONCILED</span>
      </div>
    </div>
  </aside>

  {/* Top Header */}
  <header className="fixed top-0 left-64 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 z-40 px-6 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-xs">
        <span className="text-slate-400">Tagum Main Campus</span>
        <span className="text-slate-300">/</span>
        <span className="font-semibold text-slate-800">Tuition, Cashier & Official Ledger</span>
      </div>

      <div className="relative hidden lg:block w-72">
        <span className="material-symbols-outlined absolute left-2.5 top-2 text-slate-400 text-sm">search</span>
        <input id="topTuitionSearch" onInput={(e) => { window.document.getElementById('searchInput').value = this.value; filterTable(); }} type="text" placeholder="Search receipt OR#, student..." className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all" />
      </div>
    </div>

    <div className="flex items-center gap-3">
      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200/70 text-xs text-slate-600">
        <span className="material-symbols-outlined text-sm text-slate-700">payments</span>
        <span>Today's Intake: <strong className="text-slate-900">₱46,500</strong></span>
        <span className="text-slate-300">•</span>
        <span><strong className="text-emerald-700">14</strong> Settled</span>
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

      {/* Header & Financial KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        
        {/* Metric 1: Monthly Collections */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Collections</span>
              <div className="text-xs font-semibold text-slate-500 mt-0.5">Current Month</div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <span className="material-symbols-outlined text-lg">payments</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-display text-2xl font-extrabold text-slate-900 tracking-tight">₱482,000</span>
            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
              <span className="material-symbols-outlined text-xs">trending_up</span> +15%
            </span>
          </div>
          <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '82%' }}></div>
          </div>
        </div>

        {/* Metric 2: Receivables */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Student Receivables</span>
              <div className="text-xs font-semibold text-slate-500 mt-0.5">Installment Accounts</div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
              <span className="material-symbols-outlined text-lg">account_balance_wallet</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-display text-2xl font-extrabold text-slate-900 tracking-tight">₱64,500</span>
            <span className="text-[11px] font-semibold text-amber-700">26 Accounts</span>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Target Clearance: End of Term</span>
            <span className="font-semibold text-slate-800">87% on track</span>
          </div>
        </div>

        {/* Metric 3: Packages Billed */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Packages Billed</span>
              <div className="text-xs font-semibold text-slate-500 mt-0.5">This Week</div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">badge</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl font-extrabold text-slate-900 tracking-tight">42</span>
              <span className="text-xs text-slate-400 font-medium">enrolled</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">TDC + PDC</span>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>68% Bundled Course Enrollments</span>
          </div>
        </div>

        {/* Metric 4: Verified Today */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verified Today</span>
              <div className="text-xs font-semibold text-slate-500 mt-0.5">Cashier Intake Log</div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">verified</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-display text-2xl font-extrabold text-slate-900 tracking-tight">₱46,500</span>
            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
              <span className="material-symbols-outlined text-xs">done_all</span> 14 Settled
            </span>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Shift: M. Elena</span>
            <span className="font-semibold text-slate-800">Till Balanced</span>
          </div>
        </div>

      </div>

      {/* Active Course Package Rates Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-base">sell</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Official Tuition Schedule</span>
            <h3 className="font-display text-sm font-bold text-slate-900">Standard Accredited Rates (Tagum Campus)</h3>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 xl:flex items-center gap-2.5 w-full xl:w-auto">
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 min-w-[130px]">
            <span className="text-[10px] text-slate-400 block font-medium">PDC Sedan Manual</span>
            <div className="flex items-baseline justify-between mt-0.5">
              <span className="font-bold text-xs text-slate-900">₱8,000</span>
              <span className="text-[10px] text-slate-500">15 hrs</span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 min-w-[130px]">
            <span className="text-[10px] text-slate-400 block font-medium">PDC Sedan Auto</span>
            <div className="flex items-baseline justify-between mt-0.5">
              <span className="font-bold text-xs text-slate-900">₱9,000</span>
              <span className="text-[10px] text-slate-500">15 hrs</span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 min-w-[130px]">
            <span className="text-[10px] text-slate-400 block font-medium">PDC Motorcycle</span>
            <div className="flex items-baseline justify-between mt-0.5">
              <span className="font-bold text-xs text-slate-900">₱3,500</span>
              <span className="text-[10px] text-slate-500">8 hrs</span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 min-w-[130px]">
            <span className="text-[10px] text-slate-400 block font-medium">TDC Theoretical</span>
            <div className="flex items-baseline justify-between mt-0.5">
              <span className="font-bold text-xs text-slate-900">₱2,000</span>
              <span className="text-[10px] text-slate-500">15 hrs</span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900 text-white min-w-[140px] shadow-xs">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-amber-400 font-bold uppercase">PROMO COMBO</span>
              <span className="bg-amber-500 text-slate-900 px-1 rounded font-bold">SAVE ₱500</span>
            </div>
            <div className="flex items-baseline justify-between mt-0.5">
              <span className="font-bold text-xs text-white">₱9,500</span>
              <span className="text-[10px] text-slate-300">TDC + PDC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace: Split Grid with Action Toolbar, Ledger, and Fast Intake Drawer */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Left: Collections Ledger (8 cols) */}
        <div className="xl:col-span-8 space-y-4">
          
          {/* Filter Toolbar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <select id="channelFilter" onChange={() => {filterTable()}} className="bg-slate-50 border border-slate-200 text-xs text-slate-700 py-1.5 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 font-medium">
                <option value="all">All Payment Channels</option>
                <option value="Cash">Cash at Counter</option>
                <option value="GCash">GCash E-Wallet</option>
                <option value="Bank">Bank Deposit</option>
                <option value="Card">Debit / POS</option>
              </select>

              <div className="relative flex-1 min-w-[200px]">
                <span className="material-symbols-outlined absolute left-2.5 top-2 text-slate-400 text-sm">search</span>
                <input id="searchInput" onKeyUp="filterTable()" type="text" placeholder="Search OR#, student, cashier..." className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900" />
              </div>
            </div>

            <div className="flex items-center gap-2 justify-end">
              <button onClick={() => {window.triggerExportNotice()}} className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors">
                <span className="material-symbols-outlined text-sm">file_download</span>
                Export CSV / PDF
              </button>
            </div>
          </div>

          {/* Official Collections Ledger Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm font-bold text-slate-900">Official Collections Ledger</h3>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">Series 2024-Nov-A</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">14 Transactions Today</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto text-left text-xs" id="ledgerTable">
                <thead className="bg-slate-50/75 border-b border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4 whitespace-nowrap">OR Number</th>
                    <th className="py-3 px-3">Date & Time</th>
                    <th className="py-3 px-4 whitespace-nowrap">Student Driver</th>
                    <th className="py-3 px-3">Course</th>
                    <th className="py-3 px-3">Stage</th>
                    <th className="py-3 px-4 whitespace-nowrap">Method & Ref</th>
                    <th className="py-3 px-4 text-right whitespace-nowrap">Amount Paid</th>
                    <th className="py-3 px-4 text-right whitespace-nowrap">Balance</th>
                    <th className="py-3 px-3 text-center">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  
                  {/* Row 1 */}
                  <tr className="hover:bg-slate-50/80 transition-colors table-row-item" data-method="GCash" data-search="OR-2024-1082 Angelica Morales SJ-24-0982">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">OR-2024-1082</td>
                    <td className="py-3 px-3 text-slate-500">
                      <div>Nov 22, 2024</div>
                      <div className="text-[10px] text-slate-400">02:15 PM</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">Angelica Morales</div>
                      <div className="text-[10px] text-slate-400 font-mono">SJ-24-0982</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-[11px] font-medium text-slate-800">Dual Executive</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">2nd Installment</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">GCash</div>
                      <div className="text-[10px] text-slate-400 font-mono">#88410294</div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">₱4,000.00</td>
                    <td className="py-3 px-4 text-right font-mono text-amber-700 font-medium">₱1,500.00</td>
                    <td className="py-3 px-3 text-center">
                      <button onClick={() => {window.printReceipt('OR-2024-1082', 'Angelica Morales', '₱4,000.00')}} className="p-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors" title="Print Receipt">
                        <span className="material-symbols-outlined text-sm">print</span>
                      </button>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="hover:bg-slate-50/80 transition-colors table-row-item" data-method="Cash" data-search="OR-2024-1081 Roberto Tan SJ-24-1044">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">OR-2024-1081</td>
                    <td className="py-3 px-3 text-slate-500">
                      <div>Nov 22, 2024</div>
                      <div className="text-[10px] text-slate-400">11:40 AM</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">Roberto Tan</div>
                      <div className="text-[10px] text-slate-400 font-mono">SJ-24-1044</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-[11px] font-medium text-slate-800">PDC Auto 15h</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">Full Settlement</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">Cash</div>
                      <div className="text-[10px] text-slate-400">Counter Till 1</div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">₱9,000.00</td>
                    <td className="py-3 px-4 text-right font-mono text-emerald-700 font-semibold">₱0.00</td>
                    <td className="py-3 px-3 text-center">
                      <button onClick={() => {window.printReceipt('OR-2024-1081', 'Roberto Tan', '₱9,000.00')}} className="p-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors" title="Print Receipt">
                        <span className="material-symbols-outlined text-sm">print</span>
                      </button>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="hover:bg-slate-50/80 transition-colors table-row-item" data-method="Bank" data-search="OR-2024-1080 Jasmine Claridad SJ-24-1090">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">OR-2024-1080</td>
                    <td className="py-3 px-3 text-slate-500">
                      <div>Nov 22, 2024</div>
                      <div className="text-[10px] text-slate-400">09:15 AM</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">Jasmine Claridad</div>
                      <div className="text-[10px] text-slate-400 font-mono">SJ-24-1090</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-[11px] font-medium text-slate-800">TDC Theoretical</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">Full Settlement</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">BDO Online</div>
                      <div className="text-[10px] text-slate-400 font-mono">#BDO-99210</div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">₱2,000.00</td>
                    <td className="py-3 px-4 text-right font-mono text-emerald-700 font-semibold">₱0.00</td>
                    <td className="py-3 px-3 text-center">
                      <button onClick={() => {window.printReceipt('OR-2024-1080', 'Jasmine Claridad', '₱2,000.00')}} className="p-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors" title="Print Receipt">
                        <span className="material-symbols-outlined text-sm">print</span>
                      </button>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr className="hover:bg-slate-50/80 transition-colors table-row-item" data-method="Cash" data-search="OR-2024-1079 Joshua De Jesus SJ-24-1102">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">OR-2024-1079</td>
                    <td className="py-3 px-3 text-slate-500">
                      <div>Nov 21, 2024</div>
                      <div className="text-[10px] text-slate-400">04:30 PM</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">Joshua De Jesus</div>
                      <div className="text-[10px] text-slate-400 font-mono">SJ-24-1102</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-[11px] font-medium text-slate-800">PDC Manual 15h</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">Deposit</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">Cash</div>
                      <div className="text-[10px] text-slate-400">Counter Till 1</div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">₱4,000.00</td>
                    <td className="py-3 px-4 text-right font-mono text-amber-700 font-medium">₱4,000.00</td>
                    <td className="py-3 px-3 text-center">
                      <button onClick={() => {window.printReceipt('OR-2024-1079', 'Joshua De Jesus', '₱4,000.00')}} className="p-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors" title="Print Receipt">
                        <span className="material-symbols-outlined text-sm">print</span>
                      </button>
                    </td>
                  </tr>

                  {/* Row 5 */}
                  <tr className="hover:bg-slate-50/80 transition-colors table-row-item" data-method="Card" data-search="OR-2024-1078 Kristina Alcantara SJ-24-0994">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">OR-2024-1078</td>
                    <td className="py-3 px-3 text-slate-500">
                      <div>Nov 21, 2024</div>
                      <div className="text-[10px] text-slate-400">01:10 PM</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">Kristina Alcantara</div>
                      <div className="text-[10px] text-slate-400 font-mono">SJ-24-0994</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-[11px] font-medium text-slate-800">PDC Motorcycle</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">Full Settlement</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">Maya POS</div>
                      <div className="text-[10px] text-slate-400 font-mono">#MY-43091</div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">₱3,500.00</td>
                    <td className="py-3 px-4 text-right font-mono text-emerald-700 font-semibold">₱0.00</td>
                    <td className="py-3 px-3 text-center">
                      <button onClick={() => {window.printReceipt('OR-2024-1078', 'Kristina Alcantara', '₱3,500.00')}} className="p-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors" title="Print Receipt">
                        <span className="material-symbols-outlined text-sm">print</span>
                      </button>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span id="tuitionPageLabel">Showing 5 of 14 Transactions Logged Today • Tagum Main Campus</span>
              <div className="flex items-center gap-1">
                <button onClick={() => {window.shiftTuitionPage(1)}} className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 transition-colors text-slate-700 font-semibold">Previous</button>
                <button onClick={() => {window.shiftTuitionPage(1)}} id="tPageBtn1" className="px-2 py-1 rounded bg-slate-900 text-white font-semibold">1</button>
                <button onClick={() => {window.shiftTuitionPage(2)}} id="tPageBtn2" className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 transition-colors text-slate-700 font-semibold">2</button>
                <button onClick={() => {window.shiftTuitionPage(2)}} className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 transition-colors text-slate-700 font-semibold">Next</button>
              </div>
            </div>
          </div>

        </div>

        {/* Right: Fast Intake Cashiering Drawer (4 cols) */}
        <div className="xl:col-span-4" id="quickIntakePanel">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sticky top-20 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-base">point_of_sale</span>
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-slate-900">Quick Payment Intake</h3>
                  <span className="text-[10px] text-slate-400">Counter Till Cashiering</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">READY</span>
            </div>

            <form id="paymentForm" onSubmit={(event) => { window.handlePaymentSubmit(event) }} className="space-y-4 text-xs">
              
              {/* Student Selection */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Enrolled Student Driver</label>
                <select id="studentSelect" onChange={() => {updateStudentBalance()}} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 font-medium">
                  <option value="1">Angelica Morales — Dual Exec (ID: SJ-24-0982)</option>
                  <option value="2">Joshua De Jesus — PDC Manual (ID: SJ-24-1102)</option>
                  <option value="3">Danilo Santos Jr. — TDC Classroom (ID: SJ-24-1150)</option>
                  <option value="4">Bea Patricia Lim — PDC Auto (ID: SJ-24-1065)</option>
                </select>
              </div>

              {/* Balance Pill */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Pending Balance</span>
                  <div className="font-bold text-slate-900" id="activeStudentLabel">Angelica Morales</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-base font-bold text-amber-700" id="activeStudentBalance">₱1,500.00</div>
                  <span className="text-[10px] text-slate-400">Course: Dual Promo</span>
                </div>
              </div>

              {/* Auto Receipt # */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700">Official Receipt #</label>
                  <span className="text-[10px] text-slate-400 font-mono">Book Series 10</span>
                </div>
                <div className="flex items-center bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg font-mono font-bold text-slate-800">
                  <span className="material-symbols-outlined text-sm text-slate-400 mr-2">receipt</span>
                  <span id="autoOrNumber">OR-2024-1083</span>
                  <span className="ml-auto text-[10px] bg-slate-200/80 text-slate-700 px-1.5 py-0.5 rounded font-sans font-semibold">Auto</span>
                </div>
              </div>

              {/* Amount Tendered */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Amount Tendered (PHP)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 font-bold text-slate-400">₱</span>
                  <input id="amountInput" type="number" step="50" min="100" max="25000" defaultValue="1500" required className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-7 pr-3 py-2 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900" />
                </div>
                <div className="grid grid-cols-3 gap-1.5 mt-1.5 text-[11px]">
                  <button type="button" onClick={() => {window.setQuickAmount(1500)}} className="py-1 rounded border border-slate-200 hover:bg-slate-50 font-semibold text-slate-700">Full</button>
                  <button type="button" onClick={() => {window.setQuickAmount(1000)}} className="py-1 rounded border border-slate-200 hover:bg-slate-50 font-semibold text-slate-700">₱1,000</button>
                  <button type="button" onClick={() => {window.setQuickAmount(500)}} className="py-1 rounded border border-slate-200 hover:bg-slate-50 font-semibold text-slate-700">₱500</button>
                </div>
              </div>

              {/* Channel Radio Buttons */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">Payment Method</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer hover:bg-white transition-colors">
                    <input type="radio" name="payChannel" defaultValue="Cash" defaultChecked className="text-slate-900 focus:ring-0" />
                    <span className="font-medium text-slate-800">Cash Till</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer hover:bg-white transition-colors">
                    <input type="radio" name="payChannel" defaultValue="GCash" className="text-slate-900 focus:ring-0" />
                    <span className="font-medium text-slate-800">GCash QR</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer hover:bg-white transition-colors">
                    <input type="radio" name="payChannel" defaultValue="Bank" className="text-slate-900 focus:ring-0" />
                    <span className="font-medium text-slate-800">Bank Transfer</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer hover:bg-white transition-colors">
                    <input type="radio" name="payChannel" defaultValue="Card" className="text-slate-900 focus:ring-0" />
                    <span className="font-medium text-slate-800">POS / Card</span>
                  </label>
                </div>
              </div>

              {/* Reference Notes */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Reference / Till Note</label>
                <input id="refNotes" type="text" placeholder="e.g. GCash Ref #, Bank Auth Code" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900" />
              </div>

              {/* Submit */}
              <button type="submit" className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs">
                <span className="material-symbols-outlined text-base">check_circle</span>
                Issue Official Receipt & Update Clearance
              </button>

              <p className="text-center text-[10px] text-slate-400 leading-tight">
                Automatically syncs internal accounting & releases graduation clearance upon full settlement.
              </p>
            </form>

          </div>
        </div>

      </div>

    </div>
  </main>

  {/* Official Receipt Preview Modal */}
  <div id="receiptModal" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl max-w-sm w-full border border-slate-200 shadow-2xl p-6 space-y-4 font-mono text-xs">
      
      <div className="text-center pb-3 border-b border-dashed border-slate-300 space-y-1 font-sans">
        <img src="../assets/images/logo.png" alt="Logo" className="h-10 w-auto object-contain mx-auto" />
        <h4 className="font-display font-extrabold text-sm text-slate-900">ST. JOSEPH CUPERTINO</h4>
        <p className="text-[10px] text-slate-500">Driving School • Tagum Main Campus</p>
        <p className="text-[9px] text-slate-400">LTO Accreditation No. DS-R11-2021-089</p>
      </div>

      <div className="space-y-1.5 py-1 text-slate-700">
        <div className="flex justify-between">
          <span className="text-slate-500 font-sans">Official Receipt:</span>
          <span id="recOrNum" className="font-bold text-slate-900">OR-2024-1082</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500 font-sans">Date & Time:</span>
          <span id="recDate">Oct 24, 2024 • 02:15 PM</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500 font-sans">Student Driver:</span>
          <span id="recStudent" className="font-bold text-slate-900">Angelica Morales</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500 font-sans">Payment Channel:</span>
          <span id="recMethod">GCash E-Wallet</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-dashed border-slate-300 font-sans">
          <span className="font-bold text-slate-900">Total Tendered:</span>
          <span id="recAmount" className="font-display font-extrabold text-sm text-slate-900">₱4,000.00</span>
        </div>
      </div>

      <div className="pt-2 border-t border-dashed border-slate-300 text-center font-sans space-y-1">
        <p className="text-[10px] text-slate-500">Cashier: Maria Elena Santos</p>
        <p className="text-[9px] text-emerald-700 font-bold">✔ VALID OFFICIAL RECEIPT FOR LTO GRADUATION</p>
      </div>

      <div className="flex items-center gap-2 pt-2 font-sans">
        <button onClick={() => {window.print()}} className="flex-1 py-2 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 shadow-xs">
          <span className="material-symbols-outlined text-sm">print</span>
          Print Slip
        </button>
        <button onClick={() => {window.closeReceiptModal()}} className="px-3 py-2 rounded-lg border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors">
          Close
        </button>
      </div>

    </div>
  </div>

  {/* Notification Toast Modal */}
  <div id="toastNotification" className="fixed bottom-6 right-6 transform translate-y-32 transition-transform duration-300 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-xl">
    <span className="material-symbols-outlined text-emerald-400">task_alt</span>
    <div className="flex flex-col text-xs">
      <span className="font-bold" id="toastTitle">Official Receipt Issued</span>
      <span className="text-slate-300" id="toastSub">OR-2024-1083 registered and printed</span>
    </div>
  </div>

  <script dangerouslySetInnerHTML={{ __html: "\n    const studentData = {\n      \"1\": { name: \"Angelica Morales\", balance: \"₱1,500.00\", rawVal: 1500, package: \"Dual Promo\" },\n      \"2\": { name: \"Joshua De Jesus\", balance: \"₱4,000.00\", rawVal: 4000, package: \"PDC Manual\" },\n      \"3\": { name: \"Danilo Santos Jr.\", balance: \"₱2,000.00\", rawVal: 2000, package: \"TDC Classroom\" },\n      \"4\": { name: \"Bea Patricia Lim\", balance: \"₱4,500.00\", rawVal: 4500, package: \"PDC Auto\" }\n    };\n\n    function updateStudentBalance() {\n      const select = document.getElementById('studentSelect');\n      const val = select.value;\n      const data = studentData[val];\n      if (data) {\n        document.getElementById('activeStudentLabel').textContent = data.name;\n        document.getElementById('activeStudentBalance').textContent = data.balance;\n        document.getElementById('amountInput').value = data.rawVal;\n      }\n    }\n\n    function setQuickAmount(amt) {\n      document.getElementById('amountInput').value = amt;\n    }\n\n    function filterTable() {\n      const channelVal = document.getElementById('channelFilter').value;\n      const query = document.getElementById('searchInput').value.toLowerCase().trim();\n      const rows = document.querySelectorAll('.table-row-item');\n\n      rows.forEach(row => {\n        const method = row.getAttribute('data-method');\n        const searchable = row.getAttribute('data-search').toLowerCase();\n\n        const channelMatch = (channelVal === 'all') || (method === channelVal);\n        const searchMatch = !query || searchable.includes(query);\n\n        if (channelMatch && searchMatch) {\n          row.style.display = '';\n        } else {\n          row.style.display = 'none';\n        }\n      });\n    }\n\n    function showToast(title, subtitle) {\n      const toast = document.getElementById('toastNotification');\n      document.getElementById('toastTitle').textContent = title;\n      document.getElementById('toastSub').textContent = subtitle;\n      toast.classList.remove('translate-y-32');\n      setTimeout(() => {\n        toast.classList.add('translate-y-32');\n      }, 4000);\n    }\n\n    function handlePaymentSubmit(e) {\n      e.preventDefault();\n      const select = document.getElementById('studentSelect');\n      const student = studentData[select.value];\n      const amount = document.getElementById('amountInput').value;\n      const orNum = document.getElementById('autoOrNumber').textContent;\n      const payChannel = document.querySelector('input[name=\"payChannel\"]:checked').value;\n\n      printReceipt(orNum, student.name, \"₱\" + Number(amount).toLocaleString(), payChannel);\n      \n      const currentSerial = parseInt(orNum.split('-')[2]);\n      document.getElementById('autoOrNumber').textContent = \"OR-2024-\" + (currentSerial + 1);\n      document.getElementById('refNotes').value = \"\";\n    }\n\n    function printReceipt(orNum, studentName, amount, channel = 'Cash Counter') {\n      document.getElementById('recOrNum').textContent = orNum;\n      document.getElementById('recStudent').textContent = studentName;\n      document.getElementById('recAmount').textContent = amount;\n      document.getElementById('recMethod').textContent = channel;\n      document.getElementById('receiptModal').classList.remove('hidden');\n      showToast(\"Official Receipt Preview\", `${orNum} slip prepared for ${studentName} (${amount}).`);\n    }\n\n    function closeReceiptModal() {\n      document.getElementById('receiptModal').classList.add('hidden');\n    }\n\n    function shiftTuitionPage(page) {\n      document.getElementById('tPageBtn1').className = page === 1 ? 'px-2 py-1 rounded bg-slate-900 text-white font-semibold' : 'px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 transition-colors text-slate-700 font-semibold';\n      document.getElementById('tPageBtn2').className = page === 2 ? 'px-2 py-1 rounded bg-slate-900 text-white font-semibold' : 'px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 transition-colors text-slate-700 font-semibold';\n      document.getElementById('tuitionPageLabel').textContent = `Showing 5 of 14 Transactions Logged Today (Page ${page}) • Tagum Main Campus`;\n      showToast(\"Pagination Switched\", `Viewing cashier transactions batch ${page}.`);\n    }\n\n    function triggerExportNotice() {\n      showToast(\"Generating Export Ledger\", \"Compiling Tagum Campus Official Ledger to CSV & PDF format...\");\n    }\n  " }} />


    </>
  );
}