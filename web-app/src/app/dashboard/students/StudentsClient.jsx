"use client";
import HeaderAvatar from "../../../components/HeaderAvatar";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function StudentsClient({ students }) {
  const [activeStudent, setActiveStudent] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleVerify = async (enrollmentId, field, currentValue) => {
    try {
      const res = await fetch(`/api/enrollments/${enrollmentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: !currentValue })
      });
      if (res.ok) {
        // Optimistically update the active student state so UI refreshes immediately
        setActiveStudent(prev => {
          if (!prev) return prev;
          const updated = { ...prev };
          if (updated.enrollments && updated.enrollments[0]) {
            updated.enrollments[0][field] = !currentValue;
          }
          return updated;
        });
        router.refresh();
      }
    } catch(err) {
      console.error(err);
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Determine status from their first enrollment
    const enrollment = student.enrollments && student.enrollments[0];
    const status = enrollment ? enrollment.status : "pending";
    
    let matchesStatus = true;
    if (filterStatus === "training" && status !== "active") matchesStatus = false;
    if (filterStatus === "completed" && status !== "completed") matchesStatus = false;
    if (filterStatus === "pending" && status !== "pending") matchesStatus = false;

    return matchesSearch && matchesStatus;
  });

  const getInitials = (first, last) => {
    return `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();
  };

  return (
    <>
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 z-50 flex flex-col justify-between hidden md:flex">
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
              <Link href="/dashboard/scheduling" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors font-medium">
                <span className="material-symbols-outlined text-base">calendar_month</span>
                Scheduling & Dispatch
              </Link>
              <Link href="/dashboard/students" className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-900 text-white font-medium transition-colors shadow-xs">
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
      <header className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 z-40 px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 hidden sm:inline">Tagum Main Campus</span>
            <span className="text-slate-300 hidden sm:inline">/</span>
            <span className="font-semibold text-slate-800">Students & Progress</span>
          </div>

          {/* Quick Search Bar */}
          <div className="relative hidden lg:block w-72">
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-slate-400 text-sm">search</span>
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Search students..." className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Profile */}
          <HeaderAvatar fallbackName="Admin Account" fallbackRole="Registrar & Operations" />
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="md:ml-64 pt-16 h-screen flex flex-col bg-slate-50 overflow-hidden">
        
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          
          {/* MAIN ROSTER LIST */}
          <section className="flex-1 overflow-y-auto bg-white border-r border-slate-200 p-0 relative">
            <div className="sticky top-0 bg-white border-b border-slate-200 z-10 px-4 py-3 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-1 bg-slate-100/50 p-1 rounded-xl">
                <button 
                  onClick={() => setFilterStatus("all")} 
                  className={`px-3 py-1.5 rounded-lg font-medium text-xs whitespace-nowrap transition-colors ${filterStatus === 'all' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
                  All Records
                </button>
                <button 
                  onClick={() => setFilterStatus("training")} 
                  className={`px-3 py-1.5 rounded-lg font-medium text-xs whitespace-nowrap transition-colors ${filterStatus === 'training' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
                  Active (In-Training)
                </button>
                <button 
                  onClick={() => setFilterStatus("completed")} 
                  className={`px-3 py-1.5 rounded-lg font-medium text-xs whitespace-nowrap transition-colors ${filterStatus === 'completed' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
                  Certified
                </button>
              </div>
            </div>

            <div className="overflow-x-auto min-h-[500px]">
              {students.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                  <span className="material-symbols-outlined text-4xl mb-2 text-slate-300">group_off</span>
                  <p className="text-sm font-medium">No students enrolled yet.</p>
                  <p className="text-xs">Once students register and enroll in courses, they will appear here.</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Student Profile</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Package</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Hours Tracked</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.map((s) => {
                      const name = `${s.first_name} ${s.last_name}`;
                      const init = getInitials(s.first_name, s.last_name);
                      
                      const enrollment = s.enrollments?.[0];
                      const course = enrollment?.courses;
                      
                      const pkgName = course ? course.name : 'No active package';
                      const hoursDone = enrollment ? enrollment.hours_completed : 0;
                      const hoursReq = course ? course.required_hours : 0;
                      const pct = hoursReq > 0 ? Math.min(100, Math.round((hoursDone / hoursReq) * 100)) : 0;

                      const isSelected = activeStudent?.id === s.id;

                      return (
                        <tr 
                          key={s.id}
                          className={`hover:bg-slate-50 transition-colors cursor-pointer ${isSelected ? 'bg-slate-50 border-l-4 border-slate-900' : 'border-l-4 border-transparent'}`}
                          onClick={() => setActiveStudent(s)}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">{init}</div>
                              <div>
                                <span className="font-bold text-xs text-slate-900 truncate">{name}</span>
                                <div className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {s.id.substring(0,8).toUpperCase()}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-xs font-semibold text-slate-700">{pkgName}</div>
                            {enrollment && <div className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-widest">{enrollment.status}</div>}
                          </td>
                          <td className="px-6 py-4 hidden lg:table-cell">
                            {enrollment && course ? (
                              <div className="w-32">
                                <div className="flex justify-between text-[10px] font-bold mb-1">
                                  <span className="text-slate-900">{hoursDone}/{hoursReq} Hrs</span>
                                  <span className="text-slate-500">{pct}%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                  <div className={`h-1.5 rounded-full ${pct >= 100 ? 'bg-emerald-500' : 'bg-slate-900'}`} style={{ width: `${pct}%` }}></div>
                                </div>
                              </div>
                            ) : (
                              <span className="text-[10px] text-slate-400">N/A</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </section>

          {/* INSPECTOR PANEL (RIGHT SIDE) */}
          <aside className="w-full md:w-[380px] lg:w-[420px] bg-slate-50 overflow-y-auto border-l border-slate-200 flex-shrink-0 z-20 absolute md:static inset-0 transition-transform duration-300 md:translate-x-0 hidden md:block">
            {activeStudent ? (
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xl font-display font-bold shadow-md">
                      {getInitials(activeStudent.first_name, activeStudent.last_name)}
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-slate-900">{activeStudent.first_name} {activeStudent.last_name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold uppercase">
                          {activeStudent.enrollments?.[0]?.status || 'NO ACTIVE COURSE'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setActiveStudent(null)} className="md:hidden text-slate-400 hover:text-slate-900">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                {/* Progress Card */}
                {activeStudent.enrollments?.[0] ? (() => {
                  const enr = activeStudent.enrollments[0];
                  const course = enr.courses;
                  const hoursDone = enr.hours_completed || 0;
                  const hoursReq = course?.required_hours || 0;
                  const pct = hoursReq > 0 ? Math.min(100, Math.round((hoursDone / hoursReq) * 100)) : 0;
                  
                  return (
                    <>
                      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 shadow-xs">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Training Progress</div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-xs font-bold mb-1.5">
                            <span className="text-slate-700">{course?.name}</span>
                            <span className="text-slate-900">{hoursDone} / {hoursReq} hrs</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div className={`h-2 rounded-full ${pct >= 100 ? 'bg-emerald-500' : 'bg-slate-900'}`} style={{ width: `${pct}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Prerequisites Card */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 shadow-xs">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex justify-between items-center">
                        <span>Prerequisites Verification</span>
                        <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[9px]">CASHIER ONLY</span>
                      </div>
                      
                      <div className="space-y-3">
                        {/* PSA */}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                          <div className="flex items-center gap-3">
                            <span className={`material-symbols-outlined text-lg ${enr.psa_verified ? 'text-emerald-500' : 'text-slate-400'}`}>
                              {enr.psa_verified ? 'verified' : 'pending_actions'}
                            </span>
                            <span className="text-xs font-semibold text-slate-800">PSA Birth Certificate</span>
                          </div>
                          <button 
                            onClick={() => handleVerify(enr.id, 'psa_verified', enr.psa_verified)}
                            className={`text-[10px] font-bold px-3 py-1 rounded transition-colors ${enr.psa_verified ? 'bg-slate-200 text-slate-600 hover:bg-slate-300' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                          >
                            {enr.psa_verified ? 'UNVERIFY' : 'VERIFY'}
                          </button>
                        </div>
                        
                        {/* ID */}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                          <div className="flex items-center gap-3">
                            <span className={`material-symbols-outlined text-lg ${enr.id_verified ? 'text-emerald-500' : 'text-slate-400'}`}>
                              {enr.id_verified ? 'verified' : 'pending_actions'}
                            </span>
                            <span className="text-xs font-semibold text-slate-800">Valid ID</span>
                          </div>
                          <button 
                            onClick={() => handleVerify(enr.id, 'id_verified', enr.id_verified)}
                            className={`text-[10px] font-bold px-3 py-1 rounded transition-colors ${enr.id_verified ? 'bg-slate-200 text-slate-600 hover:bg-slate-300' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                          >
                            {enr.id_verified ? 'UNVERIFY' : 'VERIFY'}
                          </button>
                        </div>

                        {/* Medical */}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                          <div className="flex items-center gap-3">
                            <span className={`material-symbols-outlined text-lg ${enr.medical_verified ? 'text-emerald-500' : 'text-slate-400'}`}>
                              {enr.medical_verified ? 'verified' : 'pending_actions'}
                            </span>
                            <span className="text-xs font-semibold text-slate-800">Medical Certificate</span>
                          </div>
                          <button 
                            onClick={() => handleVerify(enr.id, 'medical_verified', enr.medical_verified)}
                            className={`text-[10px] font-bold px-3 py-1 rounded transition-colors ${enr.medical_verified ? 'bg-slate-200 text-slate-600 hover:bg-slate-300' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                          >
                            {enr.medical_verified ? 'UNVERIFY' : 'VERIFY'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                  );
                })() : (
                  <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 shadow-xs text-center text-sm text-slate-500">
                    No active enrollments for this student.
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-2xl text-slate-300">person_search</span>
                </div>
                <p className="text-sm font-medium text-slate-600">Select a student</p>
                <p className="text-xs mt-1">Click on a row in the roster to view full training progress, documents, and scheduling details.</p>
              </div>
            )}
          </aside>
        </div>
      </main>
    </>
  );
}
