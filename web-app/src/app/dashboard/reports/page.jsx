"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Reports() {
  function showReportToast(title, msg) {
    const toast = document.getElementById('reportToast');
    if (!toast) return;
    const tt = document.getElementById('reportToastTitle');
    if (tt) tt.textContent = title;
    const tm = document.getElementById('reportToastMsg');
    if (tm) tm.textContent = msg;
    toast.classList.remove('translate-y-32');
    setTimeout(() => { toast.classList.add('translate-y-32'); }, 4000);
  }

  function previewCert(student, course, serial, grade) {
    const ms = document.getElementById('modalStudent'); if (ms) ms.textContent = student;
    const mc = document.getElementById('modalCourse'); if (mc) mc.textContent = course;
    const mser = document.getElementById('modalSerial'); if (mser) mser.textContent = serial;
    const mg = document.getElementById('modalGrade'); if (mg) mg.textContent = grade;
    const cm = document.getElementById('certModal'); if (cm) cm.classList.remove('hidden');
  }

  function closeCertModal() {
    const cm = document.getElementById('certModal');
    if (cm) cm.classList.add('hidden');
  }

  function syncLTMS() {
    showReportToast('Government Portal Direct Gateway', 'Connected to regional server. All 124 records validated and synchronized with zero errors.');
  }

  function revokeCertificate(student, serial) {
    if (typeof window !== 'undefined' && window.showConfirmDialog) {
      window.showConfirmDialog({
        title: 'Revoke Course Certificate',
        message: 'Are you sure you want to permanently revoke certificate ' + serial + ' for ' + student + '? This will void the credential in the central LTMS database.',
        badge: 'Certificate Revocation',
        type: 'danger',
        confirmText: 'Revoke Certificate',
        details: [
          { label: 'Student Name', value: student },
          { label: 'Certificate Serial', value: serial },
          { label: 'Action Warning', value: 'Government portal revocation is logged permanently' }
        ],
        onConfirm: () => {
          showReportToast('Certificate Revoked', serial + ' has been revoked from official academy records.');
        }
      });
    } else {
      showReportToast('Certificate Revoked', serial + ' has been revoked from official academy records.');
    }
  }

  function filterCertTable() {
    const cs = document.getElementById('certSearch');
    const q = cs ? cs.value.toLowerCase() : '';
    const rows = document.querySelectorAll('#certTableBody tr');
    rows.forEach(r => {
      const text = r.innerText.toLowerCase();
      r.style.display = text.includes(q) ? '' : 'none';
    });
  }

  function shiftReportPage(page) {
    const b1 = document.getElementById('repPageBtn1');
    if (b1) b1.className = page === 1 ? 'px-2 py-1 rounded bg-slate-900 text-white font-semibold' : 'px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 transition-colors text-slate-700 font-semibold';
    const b2 = document.getElementById('repPageBtn2');
    if (b2) b2.className = page === 2 ? 'px-2 py-1 rounded bg-slate-900 text-white font-semibold' : 'px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 transition-colors text-slate-700 font-semibold';
    const rpl = document.getElementById('reportPageLabel');
    if (rpl) rpl.textContent = 'Showing ' + (page === 1 ? '3 of 124' : '6 of 124') + ' Accredited Certificates • Tagum Campus';
    showReportToast('Registry Page Switched', 'Viewing certificate registry batch ' + page + '.');
  }

  useEffect(() => {
    const handleAfterPrint = () => {
      document.body.removeAttribute('data-print-target');
    };
    window.addEventListener('afterprint', handleAfterPrint);

    window.showReportToast = showReportToast;
    window.previewCert = previewCert;
    window.closeCertModal = closeCertModal;
    window.syncLTMS = syncLTMS;
    window.revokeCertificate = revokeCertificate;
    window.filterCertTable = filterCertTable;
    window.shiftReportPage = shiftReportPage;

    const params = new URLSearchParams(window.location.search);
    const studentParam = params.get('student');
    if (studentParam) {
      previewCert(studentParam, 'Practical Driving Course - Manual (PDC-MT)', 'PDC-2024-0498', '97/100');
      showReportToast('Certificate Loaded', `Generated official completion certificate for ${studentParam}.`);
    }

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
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="material-symbols-outlined text-sm text-amber-600">location_on</span>
            <span className="font-medium truncate">St. Pio Building, Purok Magsanoc, Mankilam Campus</span>
          </div>
          <span className="text-[10px] bg-white border border-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-semibold">Official 11-04</span>
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
          <Link href="/dashboard/reports" className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-900 text-white font-medium transition-colors shadow-xs">
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
          <span className="text-slate-600 font-medium">Government Portal Direct</span>
        </div>
        <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-bold">API OK</span>
      </div>
    </div>
  </aside>

  {/* Top Header */}
  <header className="fixed top-0 left-64 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 z-40 px-6 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-xs">
        <span className="text-slate-400">Tagum Main Campus</span>
        <span className="text-slate-300">/</span>
        <span className="font-semibold text-slate-800">Official Compliance, Certifications & Audit Reports</span>
      </div>

      <div className="relative hidden lg:block w-72">
        <span className="material-symbols-outlined absolute left-2.5 top-2 text-slate-400 text-sm">search</span>
        <input id="topCertSearch" onInput={(e) => { const cs = document.getElementById('certSearch'); if (cs) cs.value = e.target.value; if (typeof window !== 'undefined' && typeof window.filterCertTable === 'function') window.filterCertTable(); }} type="text" placeholder="Search student or cert #..." className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all" />
      </div>
    </div>

    <div className="flex items-center gap-3">
      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200/70 text-xs text-slate-600">
        <span className="material-symbols-outlined text-sm text-slate-700">verified</span>
        <span>Accreditation: <strong className="text-slate-900">Valid to 2027</strong></span>
        <span className="text-slate-300">•</span>
        <span>Sync: <strong className="text-emerald-700">100%</strong></span>
      </div>

      <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50/80 border border-emerald-200/60 text-xs text-emerald-800 font-medium">
        <span className="material-symbols-outlined text-sm text-emerald-600">shield_lock</span>
        <span>RA 10173 Protected</span>
      </div>

      

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

      {/* Action Banner */}
      <section className="action-toolbar no-print bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">Compliance & Accreditation</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500">Memorandum Circular 2021-2287 Standards</span>
          </div>
          <h1 className="font-display text-2xl font-extrabold text-slate-900 tracking-tight">Official Compliance, Certifications & Audit Reports</h1>
          <p className="text-xs text-slate-500 mt-0.5">Automated student course completion certificates, direct LTMS electronic transmissions, and regulatory audit records.</p>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => {window.syncLTMS()}} className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">
            <span className="material-symbols-outlined text-sm">cloud_sync</span>
            Sync LTMS Gateway
          </button>
          <button onClick={() => { document.body.setAttribute('data-print-target', 'compliance'); window.print(); }} className="px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">
            <span className="material-symbols-outlined text-sm">print</span>
            Print Compliance Report
          </button>
        </div>
      </section>

      {/* KPI Summary Cards */}
      <section className="kpi-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Certificates Issued</span>
              <h3 className="text-xs font-bold text-slate-700 mt-0.5">Academic Month</h3>
            </div>
            <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">workspace_premium</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">124</span>
            <span className="text-xs font-semibold text-emerald-600">This Month</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>82 TDC Certificates</span>
            <span className="text-slate-200">•</span>
            <span>42 PDC Practical</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">LTMS Integration</span>
              <h3 className="text-xs font-bold text-slate-700 mt-0.5">Uploaded Records</h3>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <span className="material-symbols-outlined text-lg">cloud_done</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">124<span className="text-sm font-normal text-slate-400">/124</span></span>
            <span className="text-xs font-bold text-emerald-600">100% Synced</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-emerald-600 font-semibold">
            Zero Pending Transmissions
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Exam Performance</span>
              <h3 className="text-xs font-bold text-slate-700 mt-0.5">Passing Rate</h3>
            </div>
            <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">trending_up</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">99.4%</span>
            <span className="text-xs font-semibold text-slate-500">Official Tagum</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            Top 1 Driving Academy in Davao del Norte
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">School Accreditation</span>
              <h3 className="text-xs font-bold text-slate-700 mt-0.5">Official License Status</h3>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <span className="material-symbols-outlined text-lg">verified_user</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="font-display text-lg font-bold text-emerald-700">VALID & CURRENT</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Accreditation No:</span>
            <span className="font-mono font-bold text-slate-900">DS-R11-2021-089</span>
          </div>
        </div>

      </section>

      {/* Course Completion Certificates Registry */}
      <section className="printable-records bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        
        {/* Dedicated Print Only Header */}
        <div className="print-header hidden pb-3 border-b-2 border-slate-900 mb-3 px-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-extrabold text-base text-slate-900">ST. JOSEPH CUPERTINO DRIVING SCHOOL</h2>
              <p className="text-xs text-slate-600">Tagum Main Campus • St. Pio Building, Purok Magsanoc, Mankilam, Tagum City • LTO Accreditation No. DS-2020-00019-11</p>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1">Official Official Compliance &amp; Graduate Certificate Audit Roster</p>
            </div>
            <div className="text-right text-xs text-slate-500 font-mono">
              <p>Audit Period: <strong>Academic Year 2024</strong></p>
              <p>Gateway Status: <strong>100% LTMS Synced</strong></p>
            </div>
          </div>
        </div>

        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 no-print">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-base font-bold text-slate-900">Recent Student Certificates of Completion (Official Direct)</h2>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">Official Endorsements</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Certificates generated upon successful completion of required hours and passing marks.</p>
          </div>

          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-slate-400 text-sm">search</span>
            <input id="certSearch" onInput={(e) => { window.filterCertTable() }} type="text" placeholder="Search student or cert #..." className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left text-xs">
            <thead className="bg-slate-50/75 border-b border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 whitespace-nowrap">Certificate Serial</th>
                <th className="py-3 px-4 whitespace-nowrap">Student Driver & Official ID</th>
                <th className="py-3 px-4 whitespace-nowrap">Completed Course</th>
                <th className="py-3 px-4 whitespace-nowrap">Certified Instructor</th>
                <th className="py-3 px-4 whitespace-nowrap">Grade</th>
                <th className="py-3 px-4 text-center whitespace-nowrap">LTMS Status</th>
                <th className="py-3 px-4 text-right whitespace-nowrap no-print-col">Action</th>
              </tr>
            </thead>
            <tbody id="certTableBody" className="divide-y divide-slate-100">
              
              <tr>
                <td colSpan="7" className="py-12 text-center text-slate-500 font-medium">No certificate records found for this period.</td>
              </tr>

            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-4 no-print">
          <span id="reportPageLabel">Showing 3 of 124 Accredited Certificates • Tagum Campus</span>
          <div className="flex items-center gap-1">
            <button onClick={() => {window.shiftReportPage(1)}} id="repPageBtn1" className="px-2 py-1 rounded bg-slate-900 text-white font-semibold">1</button>
            <button onClick={() => {window.shiftReportPage(2)}} id="repPageBtn2" className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 transition-colors text-slate-700 font-semibold">2</button>
          </div>
        </div>

        {/* Dedicated Print Only Footer */}
        <div className="print-footer hidden pt-4 border-t border-slate-300 mt-4 px-4 text-xs text-slate-600">
          <div>
            <p>Compliance Roster Certified by: <strong>Maria Elena Santos (Registrar)</strong></p>
            <p>Memorandum Circular 2021-2287 Standards</p>
          </div>
          <div className="text-right">
            <p>Official Official Regional Office Copy • Region XI</p>
            <p>St. Joseph Cupertino Driving School — Tagum Main Campus</p>
          </div>
        </div>

      </section>

    </div>
  </main>

  {/* Certificate Preview Modal */}
  <div id="certModal" role="dialog" aria-modal="true" aria-labelledby="certModalTitle" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
      
      <div className="flex items-start justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <img src="/assets/images/logo.png" className="h-10 w-auto object-contain" alt="Logo" />
          <div>
            <h3 id="certModalTitle" className="font-display font-extrabold text-sm text-slate-900">St. Joseph Cupertino Driving School</h3>
            <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">Official Certificate of Course Completion</p>
          </div>
        </div>
        <button onClick={() => {window.closeCertModal()}} aria-label="Close certificate modal" className="text-slate-400 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none rounded"><span className="material-symbols-outlined text-lg">close</span></button>
      </div>

      <div className="border-2 border-dashed border-slate-200 p-6 rounded-xl text-center space-y-3 bg-slate-50/50">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Republic of the Philippines • Government Regulatory Office Accredited</span>
        <h2 className="font-display font-extrabold text-lg text-slate-900">CERTIFICATE OF COMPLETION</h2>
        <p className="text-xs text-slate-500">This is to certify that</p>
        <p id="modalStudent" className="font-display font-extrabold text-xl text-slate-900 underline decoration-amber-500">Joshua Tan</p>
        <p className="text-xs text-slate-500">has satisfactorily fulfilled all academic and practical driving requirements for</p>
        <p id="modalCourse" className="font-bold text-sm text-slate-800">Practical Driving Course - Manual (PDC-MT)</p>
        <div className="pt-3 flex items-center justify-center gap-6 text-xs text-slate-600">
          <span>Serial: <strong id="modalSerial" className="font-mono text-slate-900">PDC-2024-0413</strong></span>
          <span>•</span>
          <span>Grade: <strong id="modalGrade" className="text-emerald-700">98/100</strong></span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs">
        <span className="text-[10px] text-slate-400">Verified and signed by Registrar Maria Elena Santos</span>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button onClick={() => { document.body.setAttribute('data-print-target', 'certificate'); window.print(); }} className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 flex items-center justify-center gap-1.5 shadow-xs focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">
            <span className="material-symbols-outlined text-sm">print</span>
            Print Certificate
          </button>
          <button onClick={() => {window.closeCertModal()}} className="px-3 py-2 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">
            Close
          </button>
        </div>
      </div>

    </div>
  </div>

  {/* Toast Notification */}
  <div id="reportToast" role="status" aria-live="polite" className="fixed bottom-20 right-6 transform translate-y-32 transition-transform duration-300 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-xl">
    <span className="material-symbols-outlined text-emerald-400">task_alt</span>
    <div className="flex flex-col text-xs">
      <span className="font-bold" id="reportToastTitle">Compliance Updated</span>
    </div>
  </div>
    </>
  );
}