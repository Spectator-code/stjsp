"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Fleet() {
  const [vehicles, setVehicles] = require("react").useState([]);
  const [loading, setLoading] = require("react").useState(true);

  require("react").useEffect(() => {
    fetchVehicles();
  }, []);

  async function fetchVehicles() {
    setLoading(true);
    try {
      const res = await fetch('/api/vehicles');
      const data = await res.json();
      if (data.vehicles) {
        setVehicles(data.vehicles);
      }
    } catch(e) {}
    setLoading(false);
  }

  async function handleAddVehicle(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Adding...';
    }

    const formData = new FormData(e.target);
    const vName = formData.get('vName');
    const vPlate = formData.get('vPlate');
    const vType = formData.get('vType');

    try {
      const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicle_name: vName,
          plate_number: vPlate,
          vehicle_type: vType
        })
      });
      const data = await res.json();
      if (data.success) {
        setVehicles([data.vehicle, ...vehicles]);
        closeVehicleModal();
        showFleetToast('Vehicle Added', 'New vehicle registered to the fleet.');
        e.target.reset();
      } else {
        alert(data.error);
      }
    } catch(e) {}
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Register Vehicle';
    }
  }
  function showFleetToast(title, msg) {
    const toast = document.getElementById('fleetToast');
    if (!toast) return;
    const tt = document.getElementById('fleetToastTitle');
    if (tt) tt.textContent = title;
    const tm = document.getElementById('fleetToastMsg');
    if (tm) tm.textContent = msg;
    toast.classList.remove('translate-y-32');
    setTimeout(() => { toast.classList.add('translate-y-32'); }, 4000);
  }

  function openVehicleModal() {
    const vm = document.getElementById('vehicleModal');
    if (vm) vm.classList.remove('hidden');
  }
  function closeVehicleModal() {
    const vm = document.getElementById('vehicleModal');
    if (vm) vm.classList.add('hidden');
  }
  
  function openMaintenanceModal(plate) { 
    if (plate) {
      const sel = document.getElementById('pmsVehicle');
      if (sel) {
        for (let i = 0; i < sel.options.length; i++) {
          if (sel.options[i].text.includes(plate)) {
            sel.selectedIndex = i;
            break;
          }
        }
      }
    }
    const mm = document.getElementById('maintenanceModal');
    if (mm) mm.classList.remove('hidden'); 
  }
  function closeMaintenanceModal() {
    const mm = document.getElementById('maintenanceModal');
    if (mm) mm.classList.add('hidden');
  }

  function openInstructorModal() {
    const im = document.getElementById('instructorModal');
    if (im) im.classList.remove('hidden');
  }
  function closeInstructorModal() {
    const im = document.getElementById('instructorModal');
    if (im) im.classList.add('hidden');
  }

  function handleNewVehicle(e) {
    e.preventDefault();
    const mEl = document.getElementById('newModel');
    const pEl = document.getElementById('newPlate');
    const model = mEl ? mEl.value : '';
    const plate = pEl ? pEl.value : '';

    closeVehicleModal();
    showFleetToast('Vehicle Registered', model + ' (' + plate + ') added to Tagum campus active inventory.');
  }

  function handleMaintenanceSubmit(e) {
    e.preventDefault();
    const vEl = document.getElementById('pmsVehicle');
    const v = vEl ? vEl.value : '';

    closeMaintenanceModal();
    showFleetToast('PMS Order Dispatched', 'Maintenance scheduled for ' + v + '. Flagged for technician check.');
  }

  function handleNewInstructor(e) {
    e.preventDefault();
    const nEl = document.getElementById('instName');
    const cEl = document.getElementById('instCert');
    const name = nEl ? nEl.value : '';
    const cert = cEl ? cEl.value : '';

    closeInstructorModal();
    showFleetToast('Faculty Accredited', name + ' (' + cert + ') added to official Government-Accredited faculty.');
  }

  function decommissionVehicle(model, plate) {
    if (typeof window !== 'undefined' && window.showConfirmDialog) {
      window.showConfirmDialog({
        title: 'Decommission Training Vehicle',
        message: 'Are you sure you want to permanently decommission this vehicle? This will immediately remove it from dispatch availability and notify the Official regional office.',
        badge: 'Permanent Decommission',
        type: 'danger',
        confirmText: 'Decommission Unit',
        details: [
          { label: 'Vehicle Model', value: model },
          { label: 'Plate Number', value: plate },
          { label: 'Action Warning', value: 'Cannot be undone once archived' }
        ],
        onConfirm: () => {
          showFleetToast('Vehicle Decommissioned', model + ' (' + plate + ') has been retired from active training.');
        }
      });
    } else {
      showFleetToast('Vehicle Decommissioned', model + ' (' + plate + ') has been retired from active training.');
    }
  }

  function shiftFleetPage(page) {
    const b1 = document.getElementById('fleetPageBtn1');
    if (b1) b1.className = page === 1 ? 'px-2 py-1 rounded bg-slate-900 text-white font-semibold' : 'px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 transition-colors text-slate-700 font-semibold';
    const b2 = document.getElementById('fleetPageBtn2');
    if (b2) b2.className = page === 2 ? 'px-2 py-1 rounded bg-slate-900 text-white font-semibold' : 'px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 transition-colors text-slate-700 font-semibold';
    const fpl = document.getElementById('fleetPageLabel');
    if (fpl) fpl.textContent = 'Showing ' + (page === 1 ? '4 of 14' : '10 of 14') + ' dual-control training units • Tagum Campus';
    showFleetToast('Fleet View Shifted', 'Viewing training units page ' + page + '.');
  }

  function filterFleetTable() {
    const searchInput = document.getElementById('fleetSearch');
    const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const typeFilter = document.getElementById('vehicleTypeFilter');
    const selectedType = typeFilter ? typeFilter.value : 'all';

    const rows = document.querySelectorAll('#fleetTableBody tr');
    rows.forEach(r => {
      const text = r.innerText.toLowerCase();
      const matchesSearch = !q || text.includes(q);
      let matchesType = true;
      if (selectedType === 'sedan') {
        matchesType = text.includes('sedan') || text.includes('vios') || text.includes('wigo') || text.includes('accent') || text.includes('suv') || text.includes('avanza') || text.includes('hilux');
      } else if (selectedType === 'moto') {
        matchesType = text.includes('motorcycle') || text.includes('scooter') || text.includes('barako') || text.includes('click') || text.includes('honda') || text.includes('kawasaki');
      }
      r.style.display = matchesSearch && matchesType ? '' : 'none';
    });
  }

  useEffect(() => {
    const handleAfterPrint = () => {
      document.body.removeAttribute('data-print-target');
    };
    window.addEventListener('afterprint', handleAfterPrint);

    window.showFleetToast = showFleetToast;
    window.openVehicleModal = openVehicleModal;
    window.closeVehicleModal = closeVehicleModal;
    window.openMaintenanceModal = openMaintenanceModal;
    window.closeMaintenanceModal = closeMaintenanceModal;
    window.openInstructorModal = openInstructorModal;
    window.closeInstructorModal = closeInstructorModal;
    window.handleNewVehicle = handleNewVehicle;
    window.handleMaintenanceSubmit = handleMaintenanceSubmit;
    window.handleNewInstructor = handleNewInstructor;
    window.decommissionVehicle = decommissionVehicle;
    window.shiftFleetPage = shiftFleetPage;
    window.filterFleetTable = filterFleetTable;

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
          <Link href="/dashboard/fleet" className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-900 text-white font-medium transition-colors shadow-xs">
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
        <input id="fleetSearch" onInput={(e) => { if (typeof window !== 'undefined' && typeof window.filterFleetTable === 'function') window.filterFleetTable() }} type="text" placeholder="Search vehicle plate, model, instructor..." className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all" />
      </div>
    </div>

    <div className="flex items-center gap-3">
      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200/70 text-xs text-slate-600">
        <span className="material-symbols-outlined text-sm text-slate-700">commute</span>
        <span>Fleet: <strong className="text-slate-900">12/14</strong> Ready</span>
        <span className="text-slate-300">•</span>
        <span><strong className="text-slate-900">8</strong> Instructors Certified</span>
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
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">Logistics & Faculty</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-emerald-700 flex items-center gap-1 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 "></span>
              Official Dual-Brake Safety Certification Active
            </span>
          </div>
          <h1 className="font-display text-2xl font-extrabold text-slate-900 tracking-tight">Academic Fleet & Instructor Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">Vehicle inspection logs, dual-control mechanisms, preventive maintenance schedule, and accredited instructor roster.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 no-print">
          <button onClick={() => {window.openVehicleModal()}} className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">
            <span className="material-symbols-outlined text-sm">add_circle</span>
            + Add Vehicle
          </button>
          <button onClick={() => {window.openMaintenanceModal()}} className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">
            <span className="material-symbols-outlined text-sm">car_repair</span>
            Log Maintenance
          </button>
          <button
            type="button"
            onClick={() => {
              document.body.setAttribute('data-print-target', 'fleet');
              window.print();
            }}
            className="px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1 shadow-xs focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
            aria-label="Print training fleet roster"
          >
            <span className="material-symbols-outlined text-sm">print</span>
            Print Roster
          </button>
        </div>
      </section>

      {/* 4 Bento KPI Metric Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 kpi-cards">
        
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
            <span>Next Official Inspection:</span>
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
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden printable-records">
        {/* Printable Official Header */}
        <div className="print-header hidden pb-3 border-b-2 border-slate-900 mb-4 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-extrabold text-base text-slate-900">ST. JOSEPH CUPERTINO DRIVING SCHOOL</h2>
              <p className="text-xs text-slate-600">Tagum Main Campus • St. Pio Building, Purok Magsanoc, Mankilam, Tagum City • LTO Accreditation No. DS-2020-00019-11</p>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1">Official Training Fleet Inventory & Dual-Brake Registry</p>
            </div>
            <div className="text-right text-xs text-slate-500 font-mono">
              <p>Fleet Count: <strong>14 Units</strong></p>
              <p>Safety Audit: <strong>100% Passed</strong></p>
            </div>
          </div>
        </div>

        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 no-print">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-base font-bold text-slate-900">Active Vehicle Inventory & Dual-Control Status</h2>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">14 Units Registered</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Official Registration details, vehicle condition, and dual-control mechanisms.</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-2.5 top-2 text-slate-400 text-sm">search</span>
              <input
                id="fleetSearch"
                aria-label="Search fleet vehicles"
                onInput={() => { if (typeof window !== 'undefined' && window.filterFleetTable) window.filterFleetTable(); }}
                type="text"
                placeholder="Search plate, model..."
                className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
            <select id="vehicleTypeFilter" aria-label="Filter vehicle types" onChange={() => { if (typeof window !== 'undefined' && window.filterFleetTable) window.filterFleetTable(); }} className="bg-slate-50 border border-slate-200 text-xs text-slate-700 py-1.5 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 font-medium">
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
                <th className="py-3 px-4 text-right whitespace-nowrap no-print-col">Action</th>
              </tr>
            </thead>
            <tbody id="fleetTableBody" className="divide-y divide-slate-100">
              
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-500 font-medium">No vehicles registered in the fleet database.</td>
              </tr>

            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-4 no-print">
          <span id="fleetPageLabel">Showing 4 of 14 dual-control training units • Tagum Campus</span>
          <div className="flex items-center gap-1">
            <button onClick={() => {window.shiftFleetPage(1)}} id="fleetPageBtn1" className="px-2 py-1 rounded bg-slate-900 text-white font-semibold">1</button>
            <button onClick={() => {window.shiftFleetPage(2)}} id="fleetPageBtn2" className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 transition-colors text-slate-700 font-semibold">2</button>
          </div>
        </div>

        {/* Print Only Footer */}
        <div className="print-footer hidden pt-4 border-t border-slate-300 mt-4 px-4 text-xs text-slate-600">
          <div>
            <p>Fleet Inspection Certified by: <strong>Safety Officer Allan Garcia</strong></p>
            <p>Official Accreditation Certificate No. DS-R11-2021-089</p>
          </div>
          <div className="text-right">
            <p>Official Fleet & Instructor Compliance Roster</p>
            <p>St. Joseph Cupertino Driving School — Tagum Main Campus</p>
          </div>
        </div>
      </section>

      {/* Accredited Instructor Directory Cards */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-display text-sm font-bold text-slate-900">Government-Accredited Instructor Directory &amp; Ratings</h3>
            <p className="text-xs text-slate-500 mt-0.5">Faculty qualifications, valid credentials, active students, and student feedback ratings.</p>
          </div>
          <button onClick={() => {window.openInstructorModal()}} className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors flex items-center gap-1 shadow-xs">
            <span className="material-symbols-outlined text-sm">person_add</span>
            + Add Instructor
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="col-span-1 sm:col-span-2 lg:col-span-4 py-12 text-center text-slate-500 font-medium">
            No instructors registered.
          </div>

        </div>
      </section>

    </div>
  </main>

  {/* Modal: Add New Vehicle */}
  <div id="vehicleModal" role="dialog" aria-modal="true" aria-labelledby="vehicleModalTitle" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 id="vehicleModalTitle" className="font-display font-bold text-sm text-slate-900">Register New Training Vehicle</h3>
        <button onClick={() => {window.closeVehicleModal()}} aria-label="Close vehicle registration modal" className="text-slate-400 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none rounded"><span className="material-symbols-outlined text-lg">close</span></button>
      </div>

      <form onSubmit={handleAddVehicle} className="space-y-3 text-xs">
        <div>
          <label htmlFor="newModel" className="block font-bold mb-1 text-slate-700">Vehicle Make & Model</label>
          <input type="text" id="newModel" name="vName" required placeholder="e.g. Toyota Vios 1.3 XE" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900" />
        </div>
        <div>
          <label htmlFor="newPlate" className="block font-bold mb-1 text-slate-700">Plate Number</label>
          <input type="text" id="newPlate" name="vPlate" required placeholder="e.g. NAK-1928" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="newTrans" className="block font-bold mb-1 text-slate-700">Transmission</label>
            <select id="newTrans" name="vType" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900">
              <option>Manual (MT)</option>
              <option>Automatic (AT/CVT)</option>
            </select>
          </div>
          <div>
            <label htmlFor="newDual" className="block font-bold mb-1 text-slate-700">Dual Control</label>
            <select id="newDual" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900">
              <option>Dual Brake & Clutch</option>
              <option>Auxiliary Brake Pedal</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="newInstructorAssign" className="block font-bold mb-1 text-slate-700">Assign Instructor</label>
          <select id="newInstructorAssign" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900">
            <option>Engr. Roberto Dalisay</option>
            <option>Danilo Reyes</option>
            <option>Grace Mendoza</option>
            <option>Allan Garcia</option>
          </select>
        </div>
        <div className="pt-2 flex justify-end gap-2">
          <button type="button" onClick={() => {window.closeVehicleModal()}} className="px-3 py-2 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors shadow-xs focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">Save Vehicle</button>
        </div>
      </form>
    </div>
  </div>

  {/* Modal: Log Maintenance */}
  <div id="maintenanceModal" role="dialog" aria-modal="true" aria-labelledby="maintenanceModalTitle" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 id="maintenanceModalTitle" className="font-display font-bold text-sm text-slate-900">Log Preventive Maintenance (PMS)</h3>
        <button onClick={() => {window.closeMaintenanceModal()}} aria-label="Close PMS modal" className="text-slate-400 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none rounded"><span className="material-symbols-outlined text-lg">close</span></button>
      </div>

      <form onSubmit={(event) => { window.handleMaintenanceSubmit(event) }} className="space-y-3 text-xs">
        <div>
          <label htmlFor="pmsVehicle" className="block font-bold mb-1 text-slate-700">Select Vehicle</label>
          <select id="pmsVehicle" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900">
            <option>Toyota Wigo #02 (ZAA-8120)</option>
            <option>Toyota Vios #01 (ABC-4291)</option>
            <option>Toyota Vios #02 (LAX-4192)</option>
            <option>Honda Click 125i #01 (MC-9941)</option>
          </select>
        </div>
        <div>
          <label htmlFor="pmsServiceType" className="block font-bold mb-1 text-slate-700">Service Type</label>
          <select id="pmsServiceType" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900">
            <option>Dual Brake Tension & Cable Replacement</option>
            <option>10,000 km PMS Check (Oil, Filters, Brakes)</option>
            <option>Tire Alignment & Tread Depth Inspection</option>
          </select>
        </div>
        <div>
          <label htmlFor="pmsBay" className="block font-bold mb-1 text-slate-700">Service Bay / Center</label>
          <input type="text" id="pmsBay" defaultValue="Tagum AutoCare Service Center" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900" />
        </div>
        <div>
          <label htmlFor="pmsNotes" className="block font-bold mb-1 text-slate-700">Technician Notes</label>
          <textarea id="pmsNotes" rows="2" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900" placeholder="Brake pad replacement and cable check..."></textarea>
        </div>
        <div className="pt-2 flex justify-end gap-2">
          <button type="button" onClick={() => {window.closeMaintenanceModal()}} className="px-3 py-2 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors shadow-xs focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">Submit Order</button>
        </div>
      </form>
    </div>
  </div>

  {/* Modal: Register New Instructor */}
  <div id="instructorModal" role="dialog" aria-modal="true" aria-labelledby="instructorModalTitle" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 id="instructorModalTitle" className="font-display font-bold text-sm text-slate-900">Register Government-Accredited Instructor</h3>
        <button onClick={() => {window.closeInstructorModal()}} aria-label="Close instructor registration modal" className="text-slate-400 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none rounded"><span className="material-symbols-outlined text-lg">close</span></button>
      </div>

      <form onSubmit={(event) => { window.handleNewInstructor(event) }} className="space-y-3 text-xs">
        <div>
          <label htmlFor="instName" className="block font-bold mb-1 text-slate-700">Instructor Full Name</label>
          <input type="text" id="instName" required placeholder="e.g. Manuel Roxas" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900" />
        </div>
        <div>
          <label htmlFor="instCert" className="block font-bold mb-1 text-slate-700">Official Instructor Certificate ID</label>
          <input type="text" id="instCert" required placeholder="e.g. INST-2024-512" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="instField" className="block font-bold mb-1 text-slate-700">Instruction Field</label>
            <select id="instField" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900">
              <option>Practical (PDC Car)</option>
              <option>Practical (PDC Motorcycle)</option>
              <option>Theoretical (TDC Classroom)</option>
            </select>
          </div>
          <div>
            <label htmlFor="instDuty" className="block font-bold mb-1 text-slate-700">Duty Assignment</label>
            <select id="instDuty" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900">
              <option>On Field (Highway)</option>
              <option>Classroom Multimedia</option>
              <option>Campus Closed Track</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="instUnit" className="block font-bold mb-1 text-slate-700">Assigned Primary Unit</label>
          <select id="instUnit" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900">
            <option>Toyota Vios #01 (MT - ABC-4291)</option>
            <option>Toyota Vios #02 (AT - LAX-4192)</option>
            <option>Toyota Wigo #02 (AT - ZAA-8120)</option>
            <option>Honda Click 125i #01 (MC - MC-9941)</option>
          </select>
        </div>
        <div className="pt-2 flex justify-end gap-2">
          <button type="button" onClick={() => {window.closeInstructorModal()}} className="px-3 py-2 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors shadow-xs focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">Accredit Faculty</button>
        </div>
      </form>
    </div>
  </div>

  {/* Toast Notification */}
  <div id="fleetToast" role="status" aria-live="polite" className="fixed bottom-20 right-6 transform translate-y-32 transition-transform duration-300 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-xl">
    <span className="material-symbols-outlined text-emerald-400">task_alt</span>
    <div className="flex flex-col text-xs">
      <span className="font-bold" id="fleetToastTitle">Fleet Updated</span>
    </div>
  </div>
    </>
  );
}