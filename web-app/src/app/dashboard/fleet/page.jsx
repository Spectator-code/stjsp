"use client";
export default function Fleet() {
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
          <a href="/dashboard/tuition" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors font-medium">
            <span className="material-symbols-outlined text-base">receipt_long</span>
            Tuition & Payments
          </a>
          <a href="/dashboard/fleet" className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-900 text-white font-medium transition-colors shadow-xs">
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
          <span className="text-slate-600 font-medium">Database Sync</span>
        </div>
        <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-bold">14 SENSORS OK</span>
      </div>
    </div>
  </aside>

  {/* Top Header */}
  <header className="fixed top-0 left-64 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 z-40 px-6 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-xs">
        <span className="text-slate-400">Tagum Main Campus</span>
        <span className="text-slate-300">/</span>
        <span className="font-semibold text-slate-800">Fleet & Faculty Operations</span>
      </div>

      <div className="relative hidden lg:block w-72">
        <span className="material-symbols-outlined absolute left-2.5 top-2 text-slate-400 text-sm">search</span>
        <input id="fleetSearch" onInput={(e) => { window.filterFleetTable() }} type="text" placeholder="Search vehicle plate, model, instructor..." className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all" />
      </div>
    </div>

    <div className="flex items-center gap-3">
      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200/70 text-xs text-slate-600">
        <span className="material-symbols-outlined text-sm text-slate-700">commute</span>
        <span>Fleet: <strong className="text-slate-900">12/14</strong> Ready</span>
        <span className="text-slate-300">•</span>
        <span><strong className="text-slate-900">8</strong> Instructors Certified</span>
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

      {/* Action Banner */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">Logistics & Faculty</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-emerald-700 flex items-center gap-1 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              LTO Dual-Brake Safety Certification Active
            </span>
          </div>
          <h1 className="font-display text-2xl font-extrabold text-slate-900 tracking-tight">Academic Fleet & Instructor Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">Vehicle inspection logs, dual-control mechanisms, preventive maintenance schedule, and accredited instructor roster.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => {window.openVehicleModal()}} className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs">
            <span className="material-symbols-outlined text-sm">add_circle</span>
            + Add Vehicle
          </button>
          <button onClick={() => {window.openMaintenanceModal()}} className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs">
            <span className="material-symbols-outlined text-sm">print</span>
            Log Maintenance
          </button>
          <button onClick={() => {window.print()}} className="px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1 shadow-xs">
            <span className="material-symbols-outlined text-sm">print</span>
            Print Roster
          </button>
        </div>
      </section>

      {/* 4 Bento KPI Metric Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Dual-Control Units</span>
              <h3 className="text-xs font-bold text-slate-700 mt-0.5">Total Training Units</h3>
            </div>
            <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">directions_car</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">14</span>
            <span className="text-xs font-bold text-emerald-600">12 Active (86%)</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>9 Sedans/SUVs</span>
            <span className="text-slate-200">•</span>
            <span>5 Motorcycles</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Faculty Roster</span>
              <h3 className="text-xs font-bold text-slate-700 mt-0.5">Certified Instructors</h3>
            </div>
            <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">badge</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">8</span>
            <span className="text-xs font-bold text-emerald-600">100% Certified</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>6 On-Duty Today</span>
            <span className="text-slate-200">•</span>
            <span>2 Rest Day</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Safety & Inspection</span>
              <h3 className="text-xs font-bold text-slate-700 mt-0.5">Dual-Brake Integrity</h3>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <span className="material-symbols-outlined text-lg">verified</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">100%</span>
            <span className="text-xs font-bold text-emerald-600">Passed Audit</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Next LTO Inspection:</span>
            <span className="font-bold text-slate-900">Nov 15, 2024</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Maintenance Bay</span>
              <h3 className="text-xs font-bold text-slate-700 mt-0.5">Scheduled PMS Check</h3>
            </div>
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
              <span className="material-symbols-outlined text-lg">car_repair</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold text-amber-700 tracking-tight">2</span>
            <span className="text-xs text-slate-400">Units in Shop</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Toyota Wigo #02</span>
            <span className="text-slate-200">•</span>
            <span className="text-amber-700 font-bold">10k PMS Check</span>
          </div>
        </div>

      </section>

      {/* Vehicle Registration & Inventory Table */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-base font-bold text-slate-900">Active Vehicle Inventory & Dual-Control Status</h2>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">14 Units Registered</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">LTO Registration details, vehicle condition, and dual-control mechanisms.</p>
          </div>

          <div className="flex items-center gap-2">
            <select id="vehicleTypeFilter" onChange={() => {filterFleetTable()}} className="bg-slate-50 border border-slate-200 text-xs text-slate-700 py-1.5 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 font-medium">
              <option value="all">All Vehicle Types</option>
              <option value="sedan">Sedans / SUVs (Code B)</option>
              <option value="moto">Motorcycles (Code A)</option>
            </select>
            
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left text-xs">
            <thead className="bg-slate-50/75 border-b border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 whitespace-nowrap">Unit & Plate</th>
                <th className="py-3 px-4 whitespace-nowrap">Transmission</th>
                <th className="py-3 px-4 whitespace-nowrap">Dual-Control Mechanism</th>
                <th className="py-3 px-4 whitespace-nowrap">Primary Instructor</th>

              </tr>
            </thead>
            <tbody id="fleetTableBody" className="divide-y divide-slate-100">
              
              {/* Vehicle 1 */}
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-900">Toyota Vios #01 (Sedan)</div>
                  <div className="font-mono text-[11px] text-amber-700 font-semibold">ABC-4291</div>
                  <div className="text-[10px] text-slate-400 font-mono">Chassis: VN12-98401</div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px] font-semibold">5-Speed Manual (MT)</span>
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-900 flex items-center gap-1">
                    <span className="material-symbols-outlined text-emerald-600 text-xs">check_circle</span>
                    Dual Brake & Clutch
                  </div>
                  <div className="text-[10px] text-slate-400">Certified by LTO Regional Office</div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center">RD</div>
                    <div>
                      <div className="font-semibold text-slate-800">Engr. Roberto Dalisay</div>
                      <div className="text-[10px] text-slate-400">INST-9021</div>
                    </div>
                  </div>
                </td>

              </tr>

              {/* Vehicle 2 */}
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-900">Toyota Vios #02 (Sedan)</div>
                  <div className="font-mono text-[11px] text-amber-700 font-semibold">LAX-4192</div>
                  <div className="text-[10px] text-slate-400 font-mono">Chassis: VN12-98402</div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px] font-semibold">Automatic (CVT)</span>
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-900 flex items-center gap-1">
                    <span className="material-symbols-outlined text-emerald-600 text-xs">check_circle</span>
                    Auxiliary Brake Pedal
                  </div>
                  <div className="text-[10px] text-slate-400">Hydraulic auxiliary link</div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center">DR</div>
                    <div>
                      <div className="font-semibold text-slate-800">Danilo Reyes</div>
                      <div className="text-[10px] text-slate-400">INST-2019</div>
                    </div>
                  </div>
                </td>

              </tr>

              {/* Vehicle 3: Toyota Wigo (In PMS) */}
              <tr className="hover:bg-slate-50/80 transition-colors bg-amber-50/30">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-900">Toyota Wigo #02 (Hatchback)</div>
                  <div className="font-mono text-[11px] text-amber-700 font-semibold">ZAA-8120</div>
                  <div className="text-[10px] text-slate-400 font-mono">Chassis: TW98-10044</div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px] font-semibold">Automatic (AT)</span>
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-bold text-amber-700 flex items-center gap-1">
                    <span className="material-symbols-outlined text-amber-600 text-xs">build</span>
                    Brake Cable Inspection Due
                  </div>
                  <div className="text-[10px] text-slate-400">Tagum AutoCare Service Center</div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center">CM</div>
                    <div>
                      <div className="font-semibold text-slate-800">Carlo Mendoza</div>
                      <div className="text-[10px] text-slate-400">INST-1082</div>
                    </div>
                  </div>
                </td>

              </tr>

              {/* Vehicle 4: Honda Click Motorcycle */}
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-900">Honda Click 125i #01</div>
                  <div className="font-mono text-[11px] text-amber-700 font-semibold">MC-9941</div>
                  <div className="text-[10px] text-slate-400 font-mono">Chassis: HC12-0091</div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px] font-semibold">Automatic Scooter</span>
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-900 flex items-center gap-1">
                    <span className="material-symbols-outlined text-emerald-600 text-xs">check_circle</span>
                    LTO Safety Crash Guards
                  </div>
                  <div className="text-[10px] text-slate-400">Anti-lock balance bar equipped</div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center">AG</div>
                    <div>
                      <div className="font-semibold text-slate-800">Allan Garcia</div>
                      <div className="text-[10px] text-slate-400">INST-2022</div>
                    </div>
                  </div>
                </td>

              </tr>

            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-4">
          <span id="fleetPageLabel">Showing 4 of 14 dual-control training units • Tagum Campus</span>
          <div className="flex items-center gap-1">
            <button onClick={() => {window.shiftFleetPage(1)}} id="fleetPageBtn1" className="px-2 py-1 rounded bg-slate-900 text-white font-semibold">1</button>
            <button onClick={() => {window.shiftFleetPage(2)}} id="fleetPageBtn2" className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 transition-colors text-slate-700 font-semibold">2</button>
          </div>
        </div>
      </section>

      {/* Accredited Instructor Directory Cards */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-display text-sm font-bold text-slate-900">LTO-Accredited Instructor Directory &amp; Ratings</h3>
            <p className="text-xs text-slate-500 mt-0.5">Faculty qualifications, valid credentials, active students, and student feedback ratings.</p>
          </div>
          <button onClick={() => {window.openInstructorModal()}} className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors flex items-center gap-1 shadow-xs">
            <span className="material-symbols-outlined text-sm">person_add</span>
            + Add Instructor
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">ON FIELD</span>
              <span className="text-xs font-bold text-amber-600">★ 4.96</span>
            </div>
            <h4 className="font-display font-bold text-xs text-slate-900">Danilo Reyes</h4>
            <p className="text-[11px] text-slate-500">Chief Practical Instructor</p>
            <div className="text-[11px] text-slate-600 pt-2 border-t border-slate-200/60 space-y-1">
              <div><strong>LTO Cert:</strong> INST-2019-041</div>
              <div><strong>Valid Until:</strong> Oct 2026</div>
              <div><strong>Active Students:</strong> 18 Enrolled</div>
              <div><strong>Unit:</strong> Vios #02 (AT)</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800">CLASSROOM</span>
              <span className="text-xs font-bold text-amber-600">★ 4.98</span>
            </div>
            <h4 className="font-display font-bold text-xs text-slate-900">Grace Mendoza</h4>
            <p className="text-[11px] text-slate-500">Senior TDC Lecturer</p>
            <div className="text-[11px] text-slate-600 pt-2 border-t border-slate-200/60 space-y-1">
              <div><strong>LTO Cert:</strong> INST-2020-118</div>
              <div><strong>Valid Until:</strong> Jan 2027</div>
              <div><strong>Active Students:</strong> 42 in TDC</div>
              <div><strong>Room:</strong> Hall A Multimedia</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">ON FIELD</span>
              <span className="text-xs font-bold text-amber-600">★ 4.92</span>
            </div>
            <h4 className="font-display font-bold text-xs text-slate-900">Engr. Roberto Dalisay</h4>
            <p className="text-[11px] text-slate-500">Manual Trans Specialist</p>
            <div className="text-[11px] text-slate-600 pt-2 border-t border-slate-200/60 space-y-1">
              <div><strong>LTO Cert:</strong> INST-9021-088</div>
              <div><strong>Valid Until:</strong> Aug 2025</div>
              <div><strong>Active Students:</strong> 14 Enrolled</div>
              <div><strong>Unit:</strong> Vios #01 (MT)</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">TRACK</span>
              <span className="text-xs font-bold text-amber-600">★ 4.90</span>
            </div>
            <h4 className="font-display font-bold text-xs text-slate-900">Allan Garcia</h4>
            <p className="text-[11px] text-slate-500">Motorcycle Riding Coach</p>
            <div className="text-[11px] text-slate-600 pt-2 border-t border-slate-200/60 space-y-1">
              <div><strong>LTO Cert:</strong> INST-2022-204</div>
              <div><strong>Valid Until:</strong> Dec 2025</div>
              <div><strong>Active Students:</strong> 12 Riders</div>
              <div><strong>Unit:</strong> Click 125i #01</div>
            </div>
          </div>

        </div>
      </section>

    </div>
  </main>

  {/* Modal: Add New Vehicle */}
  <div id="vehicleModal" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="font-display font-bold text-sm text-slate-900">Register New Training Vehicle</h3>
        <button onClick={() => {window.closeVehicleModal()}} className="text-slate-400 hover:text-slate-900"><span className="material-symbols-outlined text-lg">close</span></button>
      </div>

      <form onSubmit={(event) => { window.handleNewVehicle(event) }} className="space-y-3 text-xs">
        <div>
          <label className="block font-bold mb-1 text-slate-700">Vehicle Make & Model</label>
          <input type="text" id="newModel" required placeholder="e.g. Toyota Vios 1.3 XE" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900" />
        </div>
        <div>
          <label className="block font-bold mb-1 text-slate-700">Plate Number</label>
          <input type="text" id="newPlate" required placeholder="e.g. NAK-1928" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-bold mb-1 text-slate-700">Transmission</label>
            <select id="newTrans" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900">
              <option>Manual (MT)</option>
              <option>Automatic (AT/CVT)</option>
            </select>
          </div>
          <div>
            <label className="block font-bold mb-1 text-slate-700">Dual Control</label>
            <select id="newDual" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900">
              <option>Dual Brake & Clutch</option>
              <option>Auxiliary Brake Pedal</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block font-bold mb-1 text-slate-700">Assign Instructor</label>
          <select className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900">
            <option>Engr. Roberto Dalisay</option>
            <option>Danilo Reyes</option>
            <option>Grace Mendoza</option>
            <option>Allan Garcia</option>
          </select>
        </div>
        <div className="pt-2 flex justify-end gap-2">
          <button type="button" onClick={() => {window.closeVehicleModal()}} className="px-3 py-2 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors shadow-xs">Save Vehicle</button>
        </div>
      </form>
    </div>
  </div>

  {/* Modal: Log Maintenance */}
  <div id="maintenanceModal" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="font-display font-bold text-sm text-slate-900">Log Preventive Maintenance (PMS)</h3>
        <button onClick={() => {window.closeMaintenanceModal()}} className="text-slate-400 hover:text-slate-900"><span className="material-symbols-outlined text-lg">close</span></button>
      </div>

      <form onSubmit={(event) => { window.handleMaintenanceSubmit(event) }} className="space-y-3 text-xs">
        <div>
          <label className="block font-bold mb-1 text-slate-700">Select Vehicle</label>
          <select id="pmsVehicle" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900">
            <option>Toyota Wigo #02 (ZAA-8120)</option>
            <option>Toyota Vios #01 (ABC-4291)</option>
            <option>Toyota Vios #02 (LAX-4192)</option>
            <option>Honda Click 125i #01 (MC-9941)</option>
          </select>
        </div>
        <div>
          <label className="block font-bold mb-1 text-slate-700">Service Type</label>
          <select className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900">
            <option>Dual Brake Tension & Cable Replacement</option>
            <option>10,000 km PMS Check (Oil, Filters, Brakes)</option>
            <option>Tire Alignment & Tread Depth Inspection</option>
          </select>
        </div>
        <div>
          <label className="block font-bold mb-1 text-slate-700">Service Bay / Center</label>
          <input type="text" defaultValue="Tagum AutoCare Service Center" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900" />
        </div>
        <div>
          <label className="block font-bold mb-1 text-slate-700">Technician Notes</label>
          <textarea rows="2" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900" placeholder="Brake pad replacement and cable check..."></textarea>
        </div>
        <div className="pt-2 flex justify-end gap-2">
          <button type="button" onClick={() => {window.closeMaintenanceModal()}} className="px-3 py-2 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors shadow-xs">Submit Order</button>
        </div>
      </form>
    </div>
  </div>

  {/* Modal: Register New Instructor */}
  <div id="instructorModal" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="font-display font-bold text-sm text-slate-900">Register LTO-Accredited Instructor</h3>
        <button onClick={() => {window.closeInstructorModal()}} className="text-slate-400 hover:text-slate-900"><span className="material-symbols-outlined text-lg">close</span></button>
      </div>

      <form onSubmit={(event) => { window.handleNewInstructor(event) }} className="space-y-3 text-xs">
        <div>
          <label className="block font-bold mb-1 text-slate-700">Instructor Full Name</label>
          <input type="text" id="instName" required placeholder="e.g. Manuel Roxas" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900" />
        </div>
        <div>
          <label className="block font-bold mb-1 text-slate-700">LTO Instructor Certificate ID</label>
          <input type="text" id="instCert" required placeholder="e.g. INST-2024-512" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-bold mb-1 text-slate-700">Instruction Field</label>
            <select id="instField" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900">
              <option>Practical (PDC Car)</option>
              <option>Practical (PDC Motorcycle)</option>
              <option>Theoretical (TDC Classroom)</option>
            </select>
          </div>
          <div>
            <label className="block font-bold mb-1 text-slate-700">Duty Assignment</label>
            <select id="instDuty" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900">
              <option>On Field (Highway)</option>
              <option>Classroom Multimedia</option>
              <option>Campus Closed Track</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block font-bold mb-1 text-slate-700">Assigned Primary Unit</label>
          <select id="instUnit" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900">
            <option>Toyota Vios #01 (MT - ABC-4291)</option>
            <option>Toyota Vios #02 (AT - LAX-4192)</option>
            <option>Toyota Wigo #02 (AT - ZAA-8120)</option>
            <option>Honda Click 125i #01 (MC - MC-9941)</option>
          </select>
        </div>
        <div className="pt-2 flex justify-end gap-2">
          <button type="button" onClick={() => {window.closeInstructorModal()}} className="px-3 py-2 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors shadow-xs">Accredit Faculty</button>
        </div>
      </form>
    </div>
  </div>

  {/* Toast Notification */}
  <div id="fleetToast" className="fixed bottom-6 right-6 transform translate-y-32 transition-transform duration-300 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-xl">
    <span className="material-symbols-outlined text-emerald-400">task_alt</span>
    <div className="flex flex-col text-xs">
      <span className="font-bold" id="fleetToastTitle">Fleet Updated</span>
      <span className="text-slate-300" id="fleetToastMsg">Details logged</span>
    </div>
  </div>

  <script dangerouslySetInnerHTML={{ __html: "\n    function showFleetToast(title, msg) {\n      const toast = document.getElementById('fleetToast');\n      document.getElementById('fleetToastTitle').textContent = title;\n      document.getElementById('fleetToastMsg').textContent = msg;\n      toast.classList.remove('translate-y-32');\n      setTimeout(() => { toast.classList.add('translate-y-32'); }, 4000);\n    }\n\n    function openVehicleModal() { document.getElementById('vehicleModal').classList.remove('hidden'); }\n    function closeVehicleModal() { document.getElementById('vehicleModal').classList.add('hidden'); }\n    \n    function openMaintenanceModal(plate) { \n      if (plate) document.getElementById('pmsVehicle').value = `Toyota Wigo #02 (${plate})`;\n      document.getElementById('maintenanceModal').classList.remove('hidden'); \n    }\n    function closeMaintenanceModal() { document.getElementById('maintenanceModal').classList.add('hidden'); }\n\n    function openInstructorModal() { document.getElementById('instructorModal').classList.remove('hidden'); }\n    function closeInstructorModal() { document.getElementById('instructorModal').classList.add('hidden'); }\n\n    function handleNewVehicle(e) {\n      e.preventDefault();\n      const model = document.getElementById('newModel').value;\n      const plate = document.getElementById('newPlate').value;\n      closeVehicleModal();\n      showFleetToast('Vehicle Registered', `${model} (${plate}) added to Tagum campus active inventory.`);\n    }\n\n    function handleMaintenanceSubmit(e) {\n      e.preventDefault();\n      const v = document.getElementById('pmsVehicle').value;\n      closeMaintenanceModal();\n      showFleetToast('PMS Order Dispatched', `Maintenance scheduled for ${v}. Flagged for technician check.`);\n    }\n\n    function handleNewInstructor(e) {\n      e.preventDefault();\n      const name = document.getElementById('instName').value;\n      const cert = document.getElementById('instCert').value;\n      closeInstructorModal();\n      showFleetToast('Faculty Accredited', `${name} (${cert}) successfully added to official LTO-accredited faculty.`);\n    }\n\n    function shiftFleetPage(page) {\n      document.getElementById('fleetPageBtn1').className = page === 1 ? 'px-2 py-1 rounded bg-slate-900 text-white font-semibold' : 'px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 transition-colors text-slate-700 font-semibold';\n      document.getElementById('fleetPageBtn2').className = page === 2 ? 'px-2 py-1 rounded bg-slate-900 text-white font-semibold' : 'px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 transition-colors text-slate-700 font-semibold';\n      document.getElementById('fleetPageLabel').textContent = `Showing ${page === 1 ? '4 of 14' : '10 of 14'} dual-control training units • Tagum Campus`;\n      showFleetToast('Fleet View Shifted', `Viewing training units page ${page}.`);\n    }\n\n    function filterFleetTable() {\n      const q = document.getElementById('fleetSearch').value.toLowerCase();\n      const rows = document.querySelectorAll('#fleetTableBody tr');\n      rows.forEach(r => {\n        const text = r.innerText.toLowerCase();\n        r.style.display = text.includes(q) ? '' : 'none';\n      });\n    }\n  " }} />


    </>
  );
}