"use client";
import { useEffect, useState } from "react";

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch('/api/auth/session').then(res => res.json()).then(data => {
      if (data.user) setIsLoggedIn(true);
    }).catch(() => {});
  }, []);

  const galleryItems = [
    {
      src: '/assets/images/photo_2026-10-07_16-32-47.jpg',
      category: 'fleet',
      tag: 'Official Fleet',
      title: 'Official Dual-Control Training Fleet & Campus',
      desc: 'Our fleet of dual-control sedans (Toyota Vios & Hyundai Accent) stationed at the St. Joseph Cupertino Driving School campus. Accredited by the Government Regulatory Office. Open daily Monday to Sunday, 8:00 AM – 5:00 PM.'
    },
    {
      src: '/assets/images/photo_2026-10-07_16-32-40.jpg',
      category: 'pdc',
      tag: 'Practical PDC',
      title: 'BLOWBAGETS Engine Diagnostics & Under-The-Hood Training',
      desc: 'Students receive 1-on-1 practical mechanical orientation covering battery maintenance, fluid levels, engine belts, emergency tool kits, and daily pre-departure safety routines.'
    },
    {
      src: '/assets/images/photo_2026-10-07_16-32-43.jpg',
      category: 'mc',
      tag: 'Motorcycle PDC-MC',
      title: 'Two-Wheel Defensive Riding & Road Confidence',
      desc: 'Government-Accredited practical motorcycle instruction. Students master balance drills, helmet & safety gear compliance, hesitation-free overtaking, proper parking, and defensive navigation.'
    },
    {
      src: '/assets/images/photo_2026-10-07_16-32-50.jpg',
      category: 'pdc',
      tag: '1-on-1 Mentorship',
      title: 'Personalized Battery & Automotive Electrical Care',
      desc: 'Close-up instruction with accredited mentors focusing on vehicle electricals, battery terminal inspection, alternator checks, and preventive maintenance.'
    },
    {
      src: '/assets/images/photo_2026-10-07_16-32-57.jpg',
      category: 'pdc',
      tag: 'Practical Driving',
      title: 'Driving The Right Way — Hands-On Mechanical Familiarization',
      desc: 'Practical driving instruction that empowers students with true mechanical confidence and safety awareness before undertaking actual road driving.'
    }
  ];

  let currentLightboxIndex = 0;

  function updateLightboxContent() {
    const item = galleryItems[currentLightboxIndex];
    if (!item) return;
    const img = document.getElementById('lightboxImage'); if (img) img.src = item.src;
    const title = document.getElementById('lightboxTitle'); if (title) title.textContent = item.title;
    const desc = document.getElementById('lightboxDesc'); if (desc) desc.textContent = item.desc;
    const tag = document.getElementById('lightboxTag'); if (tag) tag.textContent = item.tag;
    const counter = document.getElementById('lightboxCounter'); if (counter) counter.textContent = 'Photo ' + (currentLightboxIndex + 1) + ' of ' + galleryItems.length;
  }

  function openLightboxByIndex(index) {
    currentLightboxIndex = index;
    updateLightboxContent();
    const modal = document.getElementById('lightboxModal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      modal.classList.add('opacity-100');
    }, 10);
    document.body.classList.add('overflow-hidden');
  }

  function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    if (!modal) return;
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0');
    setTimeout(() => {
      modal.classList.remove('flex');
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }, 300);
  }

  function prevLightboxImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightboxContent();
  }

  function nextLightboxImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryItems.length;
    updateLightboxContent();
  }

  function filterGallery(category) {
    const buttons = document.querySelectorAll('.gallery-filter-btn');
    buttons.forEach(btn => {
      if (btn.dataset.filter === category) {
        btn.classList.add('bg-amber-500', 'text-slate-950');
        btn.classList.remove('bg-slate-800', 'text-slate-300');
      } else {
        btn.classList.remove('bg-amber-500', 'text-slate-950');
        btn.classList.add('bg-slate-800', 'text-slate-300');
      }
    });

    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
      if (category === 'all' || item.dataset.category === category) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      const modal = document.getElementById('lightboxModal');
      if (!modal || modal.classList.contains('hidden')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevLightboxImage();
      if (e.key === 'ArrowRight') nextLightboxImage();
    };
    window.addEventListener('keydown', handleKeyDown);

    window.openLightboxByIndex = openLightboxByIndex;
    window.closeLightbox = closeLightbox;
    window.prevLightboxImage = prevLightboxImage;
    window.nextLightboxImage = nextLightboxImage;
    window.filterGallery = filterGallery;

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <>


      {/* Minimal Top Announcement Ribbon */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">ST. JOSEPH APPROVED</span>
            <span className="text-slate-300">St. Joseph Cupertino Driving School • Tagum City Campus</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5"><span
              className="material-symbols-outlined text-sm text-amber-400">call</span> (084) 216-8942 / 0917 554 9021</span>
            <span className="hidden md:inline text-slate-600">•</span>
            <span className="hidden md:flex items-center gap-1.5"><span
              className="material-symbols-outlined text-sm text-emerald-400"></span></span>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 glass-header border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 py-3 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <img src="/assets/images/logo.png" alt="St. Joseph Cupertino Logo"
              className="h-10 sm:h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-200" />
            <div className="hidden sm:flex flex-col">
              <span className="font-display font-extrabold text-[11px] sm:text-xs xl:text-sm text-slate-900 tracking-tight leading-tight whitespace-nowrap">ST.
                JOSEPH CUPERTINO</span>
              <span className="text-[8px] sm:text-[9px] font-bold tracking-wider text-amber-600 uppercase whitespace-nowrap">DRIVING SCHOOL • TAGUM</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-3 lg:gap-4 xl:gap-6 text-[11px] font-semibold text-slate-600 whitespace-nowrap overflow-hidden">
            <a href="#courses" className="hover:text-slate-900 transition-colors">Courses & Fees</a>
            <a href="#fleet" className="hover:text-slate-900 transition-colors hidden xl:block">Safety Fleet</a>
            <a href="#gallery" className="hover:text-amber-600 text-slate-800 font-bold transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-amber-500">photo_library</span>
              Training Gallery
            </a>
            <a href="#process" className="hover:text-slate-900 transition-colors hidden xl:block">Admission Steps</a>
            <a href="#instructors" className="hover:text-slate-900 transition-colors">Faculty</a>
            <a href="#contact" className="hover:text-slate-900 transition-colors">Our Location</a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {isLoggedIn ? (
              <a href="/portal?tab=login"
                className="px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold text-xs shadow-sm hover:bg-slate-800 transition-colors flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-emerald-400">dashboard</span>
                Return to Dashboard
              </a>
            ) : (
              <>
                <a href="/portal?tab=login"
                  className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors hidden sm:inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">login</span>
                  Staff Login
                </a>
                <a href="/portal?tab=enroll"
                  className="px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold text-xs shadow-sm hover:bg-slate-800 transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-amber-400">edit_note</span>
                  Enroll Online
                </a>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Landmark for Accessibility Skip-Link */}
      <main id="main-content">

        {/* Hero Section */}
        <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-24 border-b border-slate-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              <div className="lg:col-span-7 space-y-6">
                <h1
                  className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                  Learn Safe Driving with Confidence & Certified Integrity.
                </h1>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                  St. Joseph Cupertino Driving School in Tagum City offers authorized Theoretical (TDC) and Practical (PDC)
                  Driving Courses equipped with certified dual-control vehicles, private maneuvers track, and seasoned
                  accredited mentors.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a href="/portal?tab=enroll"
                    className="px-5 py-3 rounded-lg bg-slate-900 text-white font-bold text-xs shadow-sm hover:bg-slate-800 transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-400 text-base">how_to_reg</span>
                    Online Student Application
                  </a>
                  <a href="/dashboard/operations"
                    className="px-5 py-3 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-all flex items-center gap-2 shadow-xs">
                    <span className="material-symbols-outlined text-base">dashboard</span>
                    Management Dashboard
                  </a>
                </div>

                {/* Feature checkmarks */}
                <div
                  className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                    <span>1-on-1 Dual-Brake Instruction</span>
                  </div>
                  <div className="flex items-center gap-1.5">

                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                    <span>Flexible Weekday & Weekend Slots</span>
                  </div>
                </div>
              </div>

              {/* Hero Card */}
              <div className="lg:col-span-5 space-y-4">
                {/* Featured Live Campus Banner (Photo 3) */}
                <div className="group relative rounded-2xl overflow-hidden border border-slate-200 shadow-md cursor-pointer bg-slate-950 transition-all hover:shadow-xl" onClick={() => { window.openLightboxByIndex(0) }}>
                  <img src="/assets/images/photo_2026-10-07_16-32-47.jpg" alt="St. Joseph Cupertino Driving School Campus & Fleet" className="w-full h-48 sm:h-52 object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent flex flex-col justify-end p-4">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full shadow-xs">
                        <span className="material-symbols-outlined text-xs">verified</span> Official Safety Fleet
                      </span>
                      <span className="text-[10px] font-semibold bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-white flex items-center gap-1">
                        Open 8AM – 5PM
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-xs sm:text-sm text-white leading-tight">Official Tagum Safety Fleet & Campus</h4>
                    <p className="text-[11px] text-slate-300 flex items-center justify-between mt-1">
                      <span>NBI Compound, Mankilam, Tagum City</span>
                      <span className="text-[11px] text-amber-300 font-semibold group-hover:underline flex items-center gap-0.5">Explore Gallery <span className="material-symbols-outlined text-xs">arrow_forward</span></span>
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm relative space-y-4">

                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2.5">
                      <img src="/assets/images/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
                      <div>
                        <h3 className="font-display font-bold text-xs text-slate-900">Current Enrollment Intake</h3>
                        <p className="text-[11px] text-slate-500">Batch 48 • Tagum Campus</p>
                      </div>
                    </div>
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">OPEN</span>
                  </div>

                  <div className="space-y-2.5 text-xs">

                    <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                          <span className="material-symbols-outlined text-base">menu_book</span>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">Theoretical (TDC)</p>
                          <p className="text-[11px] text-slate-500">15 Hours • Mandatory for Student Permit</p>
                        </div>
                      </div>
                      <span className="font-display font-bold text-slate-900">₱1,000</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                          <span className="material-symbols-outlined text-base">directions_car</span>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">PDC Sedan (MT / AT)</p>
                          <p className="text-[11px] text-slate-500">8 Hours • Light Vehicles (Code B)</p>
                        </div>
                      </div>
                      <span className="font-display font-bold text-slate-900">₱4,500</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                          <span className="material-symbols-outlined text-base">two_wheeler</span>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">PDC Motorcycle</p>
                          <p className="text-[11px] text-slate-500">8 Hours • Scooter & Manual (Code A)</p>
                        </div>
                      </div>
                      <span className="font-display font-bold text-slate-900">₱2,500</span>
                    </div>

                  </div>

                  <div className="pt-2">
                    <a href="/portal?tab=enroll"
                      className="w-full py-2.5 rounded-lg bg-slate-900 text-white font-bold text-xs text-center block hover:bg-slate-800 transition-colors shadow-xs">
                      Complete Online Admission Form →
                    </a>
                    <p className="text-[10px] text-center text-slate-400 mt-2">Instant reservation voucher with reference code</p>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Live Stats Strip */}
        <section className="py-8 bg-slate-100/60 border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">99.4%</span>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Official Exam Pass Rate</p>
              </div>
              <div>
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">5,200+</span>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Graduates Licensed</p>
              </div>
              <div>
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">14 Units</span>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Dual-Control Fleet</p>
              </div>
              <div>
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">8 Mentors</span>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Official Certified Faculty</p>
              </div>
            </div>
          </div>
        </section>

        {/* Courses & Pricing */}
        <section id="courses" className="py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            <div className="text-center max-w-2xl mx-auto mb-14">
              <span
                className="text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">Accredited
                Curricula</span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                Comprehensive Driving Courses & Clear Tuition Fees
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Strictly compliant with Official Memorandum Circulars. Includes classroom theory, closed-circuit maneuvers, and
                defensive road navigation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Course 1: TDC */}
              <div
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">PREREQUISITE</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1"><span
                      className="material-symbols-outlined text-sm">schedule</span> 15 Hours</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-900">Theoretical Driving Course (TDC)</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Required by the Official before applying for a Student Permit. Covers road courtesy, traffic rules, signs,
                    vehicle safety checks, and defensive driving.
                  </p>
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <span className="text-2xl font-display font-extrabold text-slate-900">₱1,000</span>
                    <span className="text-xs text-slate-400"> / 2-day session</span>
                  </div>
                  <ul className="mt-4 space-y-2 text-xs text-slate-600">
                    <li className="flex items-center gap-2"><span
                      className="material-symbols-outlined text-emerald-600 text-sm">check</span> Air-conditioned classroom &
                      online options</li>
                    <li className="flex items-center gap-2"><span
                      className="material-symbols-outlined text-emerald-600 text-sm">check</span> Official TDC Certificate of
                      Completion</li>
                    <li className="flex items-center gap-2"><span
                      className="material-symbols-outlined text-emerald-600 text-sm">check</span> Direct electronic sync to Official
                      LTMS</li>
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <a href="/portal?tab=enroll&course=tdc"
                    className="w-full py-2 rounded-lg bg-slate-100 text-slate-900 hover:bg-slate-900 hover:text-white font-bold text-xs text-center block transition-colors">
                    Enroll in TDC →
                  </a>
                </div>
              </div>

              {/* Course 2: PDC Car (Featured) */}
              <div
                className="bg-white rounded-2xl p-6 border-2 border-slate-900 shadow-sm flex flex-col justify-between relative">
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-slate-900 text-amber-400 text-[10px] font-extrabold uppercase tracking-wider">
                  RECOMMENDED
                </div>
                <div>
                  {/* Real Practical Training Visual (Photo 1) */}
                  <div className="relative rounded-xl overflow-hidden mb-4 h-44 bg-slate-900 group cursor-pointer border border-slate-200" onClick={() => { window.openLightboxByIndex(1) }} title="Click to view full photo">
                    <img src="/assets/images/photo_2026-10-07_16-32-40.jpg" alt="Practical Driving Course" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex items-end justify-between p-3">
                      <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm text-amber-400">build</span>
                        BLOWBAGETS Engine Drills
                      </span>
                      <span className="text-[10px] bg-white/20 backdrop-blur-md text-white px-2 py-0.5 rounded flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-xs">zoom_in</span> Expand
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800">CODE B / B1</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1"><span
                      className="material-symbols-outlined text-sm">schedule</span> 8 Hours</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-900">Practical Driving - Light Vehicles (Sedan)</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    1-on-1 practical driving instruction on dual-control safety sedans. Available in Manual Transmission (MT)
                    and Automatic Transmission (AT).
                  </p>
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <span className="text-2xl font-display font-extrabold text-slate-900">₱4,500</span>
                    <span className="text-xs text-slate-400"> (MT) / ₱5,000 (AT)</span>
                  </div>
                  <ul className="mt-4 space-y-2 text-xs text-slate-600">
                    <li className="flex items-center gap-2"><span
                      className="material-symbols-outlined text-emerald-600 text-sm">check</span> Dual-control safety brake
                      overrides</li>
                    <li className="flex items-center gap-2"><span
                      className="material-symbols-outlined text-emerald-600 text-sm">check</span> Parallel, diagonal & vertical
                      parking drills</li>
                    <li className="flex items-center gap-2"><span
                      className="material-symbols-outlined text-emerald-600 text-sm">check</span> Actual road driving on Tagum
                      bypass corridor</li>
                    <li className="flex items-center gap-2"><span
                      className="material-symbols-outlined text-emerald-600 text-sm">check</span> Official PDC assessment &
                      certificate</li>
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <a href="/portal?tab=enroll&course=pdc-car"
                    className="w-full py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs text-center block transition-colors">
                    Enroll in PDC Car →
                  </a>
                </div>
              </div>

              {/* Course 3: PDC Motorcycle */}
              <div
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  {/* Real Motorcycle Training Visual (Photo 2) */}
                  <div className="relative rounded-xl overflow-hidden mb-4 h-44 bg-slate-900 group cursor-pointer border border-slate-200" onClick={() => { window.openLightboxByIndex(2) }} title="Click to view full photo">
                    <img src="/assets/images/photo_2026-10-07_16-32-43.jpg" alt="Practical Motorcycle Driving Course" className="w-full h-full object-cover object-[center_18%] group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex items-end justify-between p-3">
                      <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm text-amber-400">two_wheeler</span>
                        Confidence & Highway Riding
                      </span>
                      <span className="text-[10px] bg-white/20 backdrop-blur-md text-white px-2 py-0.5 rounded flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-xs">zoom_in</span> Expand
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">CODE A / A1</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1"><span
                      className="material-symbols-outlined text-sm">schedule</span> 8 Hours</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-900">Practical Driving - Motorcycle (PDC-MC)</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Hands-on motorcycle training covering balance, emergency maneuvers, curve leaning, and defensive road
                    positioning for 2-wheel vehicles.
                  </p>
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <span className="text-2xl font-display font-extrabold text-slate-900">₱2,500</span>
                    <span className="text-xs text-slate-400"> / 8-hour module</span>
                  </div>
                  <ul className="mt-4 space-y-2 text-xs text-slate-600">
                    <li className="flex items-center gap-2"><span
                      className="material-symbols-outlined text-emerald-600 text-sm">check</span> Automatic Scooter or Manual
                      Clutch option</li>
                    <li className="flex items-center gap-2"><span
                      className="material-symbols-outlined text-emerald-600 text-sm">check</span> Campus slalom track &
                      emergency braking drills</li>
                    <li className="flex items-center gap-2"><span
                      className="material-symbols-outlined text-emerald-600 text-sm">check</span> Safety helmet and protective
                      gear provided</li>
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <a href="/portal?tab=enroll&course=pdc-mc"
                    className="w-full py-2 rounded-lg bg-slate-100 text-slate-900 hover:bg-slate-900 hover:text-white font-bold text-xs text-center block transition-colors">
                    Enroll in Motorcycle PDC →
                  </a>
                </div>
              </div>

            </div>

            {/* Combo Deal Banner */}
            <div
              className="mt-10 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
              <div>
                <span
                  className="text-[10px] font-bold text-amber-700 uppercase tracking-wider bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded">PACKAGE
                  BUNDLE OFFER</span>
                <h3 className="font-display font-bold text-xl text-slate-900 mt-2">All-in-One: TDC + PDC Car (Sedan) Complete
                  Bundle</h3>
                <p className="text-xs text-slate-600 mt-1 max-w-xl">Save ₱1,000 when registering your Theoretical and Practical
                  Driving courses together. Includes full Government Portal integration.</p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <span className="text-xs text-slate-400 line-through">₱5,500</span>
                  <div className="text-2xl font-display font-extrabold text-slate-900">₱4,500</div>
                </div>
                <a href="/portal?tab=enroll&package=bundle"
                  className="px-5 py-2.5 rounded-lg bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors">
                  Get Bundle Deal
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* Safety Fleet Showcase */}
        <section id="fleet" className="py-20 bg-white border-y border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              <div className="lg:col-span-5 space-y-4">
                <span
                  className="text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">Safety
                  Standard</span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Dual-Control Safety Vehicles Inspected Daily
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every training car at St. Joseph Cupertino features secondary brake and clutch overrides on the instructor
                  side, providing immediate safety intervention whenever required.
                </p>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-amber-600 text-lg shrink-0">shield</span>
                    <div>
                      <strong className="text-slate-900 block">Auxiliary Instructor Overrides</strong>
                      <span className="text-slate-500">Certified dual-pedal assemblies calibrated for instant response.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-amber-600 text-lg shrink-0">speed</span>
                    <div>
                      <strong className="text-slate-900 block">Certified Safety Vehicles</strong>
                      <span className="text-slate-500">Real-time corridor speed tracking along Tagum bypass road.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-amber-600 text-lg shrink-0">checklist</span>
                    <div>
                      <strong className="text-slate-900 block">24-Point Daily Pre-Trip Check</strong>
                      <span className="text-slate-500">Rigorous inspection of tires, brakes, lights, and fluids before
                        dispatch.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                {/* Real Fleet Photo Card (Photo 3) */}
                <div className="group relative rounded-2xl overflow-hidden border border-slate-200 shadow-md cursor-pointer mb-5 bg-slate-950 transition-all hover:shadow-xl" onClick={() => { window.openLightboxByIndex(0) }}>
                  <img src="/assets/images/photo_2026-10-07_16-32-47.jpg" alt="St. Joseph Cupertino Training Fleet" className="w-full h-56 sm:h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent flex flex-col justify-end p-5 text-white">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-500 text-slate-950 px-3 py-1 rounded-full shadow-xs">
                        <span className="material-symbols-outlined text-sm">verified</span> Official Safety Fleet
                      </span>
                      <span className="text-xs font-semibold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white">
                        Campus Hours: Mon–Sun 8:00 AM – 5:00 PM
                      </span>
                    </div>
                    <p className="font-display font-bold text-base mt-2 text-white">Official St. Joseph Cupertino & St. Vincent Training Units</p>
                    <p className="text-xs text-slate-300">Stationed at NBI Compound, Mankilam, Tagum City • Click to expand full image</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs text-slate-900">Toyota Vios #01 (Sedan)</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">INSPECTION
                        OK</span>
                    </div>
                    <div className="text-[11px] text-slate-600 space-y-1">
                      <p><strong>Plate:</strong> ABC-4291</p>
                      <p><strong>Transmission:</strong> 5-Speed Manual (MT)</p>
                      <p><strong>Dual Controls:</strong> Brake & Clutch Cables</p>
                      <p><strong>Instructor:</strong> Engr. Roberto Dalisay</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs text-slate-900">Toyota Vios #02 (Sedan)</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">INSPECTION
                        OK</span>
                    </div>
                    <div className="text-[11px] text-slate-600 space-y-1">
                      <p><strong>Plate:</strong> LAX-4192</p>
                      <p><strong>Transmission:</strong> Automatic (CVT)</p>
                      <p><strong>Dual Controls:</strong> Auxiliary Brake Pedal</p>
                      <p><strong>Instructor:</strong> Danilo Reyes</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs text-slate-900">Mitsubishi Mirage G4 #05</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">INSPECTION
                        OK</span>
                    </div>
                    <div className="text-[11px] text-slate-600 space-y-1">
                      <p><strong>Plate:</strong> NDB-7712</p>
                      <p><strong>Transmission:</strong> Manual (MT)</p>
                      <p><strong>Dual Controls:</strong> Certified Dual Controls</p>
                      <p><strong>Instructor:</strong> Cynthia Morales</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs text-slate-900">Honda Click 125i #01</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">INSPECTION
                        OK</span>
                    </div>
                    <div className="text-[11px] text-slate-600 space-y-1">
                      <p><strong>Plate:</strong> 1204-MC</p>
                      <p><strong>Transmission:</strong> Automatic Scooter</p>
                      <p><strong>Safety:</strong> Track sliders & safety helmet</p>
                      <p><strong>Instructor:</strong> Allan Garcia</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Real Training & Campus Gallery Section */}
        <section id="gallery" className="py-20 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
          {/* Subtle background accent glows */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/20 border border-amber-500/30 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5">
                <span className="material-symbols-outlined text-xs">photo_camera</span> Authentic Academy Experience
              </span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-3">
                Real Students. Real Practice. Driving The Right Way.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                See firsthand what learning at St. Joseph Cupertino Driving School looks like—from under-the-hood engine diagnostics and dual-control sedans to confidence-building motorcycle road instruction.
              </p>

              {/* Category Filter Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-8" id="galleryFilters">
                <button onClick={() => { window.filterGallery('all') }} className="gallery-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-amber-500 text-slate-950 transition-all shadow-xs" data-filter="all">
                  All Photos (5)
                </button>
                <button onClick={() => { window.filterGallery('pdc') }} className="gallery-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all" data-filter="pdc">
                  Practical Driving & Mechanics
                </button>
                <button onClick={() => { window.filterGallery('mc') }} className="gallery-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all" data-filter="mc">
                  Motorcycle Training (PDC-MC)
                </button>
                <button onClick={() => { window.filterGallery('fleet') }} className="gallery-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all" data-filter="fleet">
                  Academy Fleet & Campus
                </button>
              </div>
            </div>

            {/* Gallery Grid (Featuring all 5 user photos) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="galleryGrid">

              {/* Photo 1: Fleet & Campus (Photo 3) */}
              <div className="gallery-item group relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 shadow-lg cursor-pointer md:col-span-2 lg:col-span-2" data-category="fleet" onClick={() => { window.openLightboxByIndex(0) }}>
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img src="/assets/images/photo_2026-10-07_16-32-47.jpg" alt="St. Joseph Cupertino Fleet" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold tracking-wider uppercase bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full">Campus & Fleet</span>
                    <span className="text-[10px] font-medium text-slate-300 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded">Daily 8AM–5PM</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-amber-400 transition-colors flex items-center justify-between">
                    <span>Official Dual-Control Training Fleet & Campus</span>
                    <span className="material-symbols-outlined text-lg opacity-80 group-hover:translate-x-1 group-hover:opacity-100 transition-all">zoom_in</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    Our fleet of Hyundai Accent and Toyota Vios dual-control training sedans parked in front of the Tagum campus. Open Monday to Sunday from 8:00 AM to 5:00 PM for all registered students.
                  </p>
                </div>
              </div>

              {/* Photo 2: Practical Driving Course - Under Hood (Photo 1) */}
              <div className="gallery-item group relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 shadow-lg cursor-pointer" data-category="pdc" onClick={() => { window.openLightboxByIndex(1) }}>
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img src="/assets/images/photo_2026-10-07_16-32-40.jpg" alt="BLOWBAGETS Engine Bay Diagnostic" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent flex flex-col justify-end p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold tracking-wider uppercase bg-emerald-500 text-slate-950 px-2.5 py-0.5 rounded-full">Practical Course (PDC)</span>
                  </div>
                  <h3 className="font-display font-bold text-base text-white group-hover:text-amber-400 transition-colors flex items-center justify-between">
                    <span>BLOWBAGETS Engine Diagnostics</span>
                    <span className="material-symbols-outlined text-lg opacity-80 group-hover:translate-x-1 transition-all">zoom_in</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    Hands-on pre-trip vehicle orientation covering battery check, oil, fluids, and tool kit operations before driving.
                  </p>
                </div>
              </div>

              {/* Photo 3: Motorcycle Training & Road Confidence (Photo 2) */}
              <div className="gallery-item group relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 shadow-lg cursor-pointer" data-category="mc" onClick={() => { window.openLightboxByIndex(2) }}>
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img src="/assets/images/photo_2026-10-07_16-32-43.jpg" alt="Motorcycle Defensive Riding" className="w-full h-full object-cover object-[center_18%] group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent flex flex-col justify-end p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold tracking-wider uppercase bg-cyan-500 text-slate-950 px-2.5 py-0.5 rounded-full">Motorcycle (PDC-MC)</span>
                  </div>
                  <h3 className="font-display font-bold text-base text-white group-hover:text-amber-400 transition-colors flex items-center justify-between">
                    <span>Defensive Riding & Road Confidence</span>
                    <span className="material-symbols-outlined text-lg opacity-80 group-hover:translate-x-1 transition-all">zoom_in</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    Learn zero-hesitation overtaking, smooth parking, motorcycle balance drills, and confident city road maneuvering.
                  </p>
                </div>
              </div>

              {/* Photo 4: 1-on-1 Engine Maintenance Close-Up (Photo 4) */}
              <div className="gallery-item group relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 shadow-lg cursor-pointer" data-category="pdc" onClick={() => { window.openLightboxByIndex(3) }}>
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img src="/assets/images/photo_2026-10-07_16-32-50.jpg" alt="1-on-1 Mechanical Instruction" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent flex flex-col justify-end p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold tracking-wider uppercase bg-emerald-500 text-slate-950 px-2.5 py-0.5 rounded-full">1-on-1 Instruction</span>
                  </div>
                  <h3 className="font-display font-bold text-base text-white group-hover:text-amber-400 transition-colors flex items-center justify-between">
                    <span>Personalized Battery & Maintenance Care</span>
                    <span className="material-symbols-outlined text-lg opacity-80 group-hover:translate-x-1 transition-all">zoom_in</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    Instructor guiding student through battery terminal inspection, electrical system checks, and emergency roadside preparedness.
                  </p>
                </div>
              </div>

              {/* Photo 5: Full Practical Driving Orientation (Photo 5) */}
              <div className="gallery-item group relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 shadow-lg cursor-pointer" data-category="pdc" onClick={() => { window.openLightboxByIndex(4) }}>
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img src="/assets/images/photo_2026-10-07_16-32-57.jpg" alt="Driving The Right Way Mentorship" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent flex flex-col justify-end p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold tracking-wider uppercase bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full">Practical Mentorship</span>
                  </div>
                  <h3 className="font-display font-bold text-base text-white group-hover:text-amber-400 transition-colors flex items-center justify-between">
                    <span>Driving The Right Way Mentorship</span>
                    <span className="material-symbols-outlined text-lg opacity-80 group-hover:translate-x-1 transition-all">zoom_in</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    Instilling defensive driving habits and complete automotive familiarity before heading out onto high-speed bypass routes.
                  </p>
                </div>
              </div>

            </div>

            {/* Student Confidence Outcomes Feature Strip (Inspired by Photo 2) */}
            <div className="mt-14 bg-gradient-to-r from-slate-800/90 via-slate-800 to-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-700/80">
                <div>
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                    Student Milestone Checklist
                  </span>
                  <h3 className="font-display font-extrabold text-xl text-white mt-2">
                    Hit The Road With Complete Confidence
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl">
                    Whether it’s your very first time turning an ignition key or aiming to upgrade your driver’s license, our curriculum guarantees complete road self-reliance.
                  </p>
                </div>
                <a href="/portal?tab=enroll" className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors shrink-0 flex items-center gap-1.5 shadow-md">
                  <span className="material-symbols-outlined text-base">rocket_launch</span> Enroll in Practical Course
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-6 text-xs">
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-emerald-400 text-lg shrink-0">check_circle</span>
                  <div>
                    <strong className="text-white block font-semibold">Drive Confidently</strong>
                    <span className="text-slate-400 text-[11px]">Overcome first-timer anxiety with patient dual-brake mentors.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-emerald-400 text-lg shrink-0">check_circle</span>
                  <div>
                    <strong className="text-white block font-semibold">Overtake Hesitation-Free</strong>
                    <span className="text-slate-400 text-[11px]">Master blind-spot checks, timing, and highway lane changes.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-emerald-400 text-lg shrink-0">check_circle</span>
                  <div>
                    <strong className="text-white block font-semibold">Park Like a Pro</strong>
                    <span className="text-slate-400 text-[11px]">Parallel, 45-degree diagonal, and reverse garage precision.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-emerald-400 text-lg shrink-0">check_circle</span>
                  <div>
                    <strong className="text-white block font-semibold">Refuel Independently</strong>
                    <span className="text-slate-400 text-[11px]">Station protocol, fuel types, tire pressure & emergency fluids.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-emerald-400 text-lg shrink-0">check_circle</span>
                  <div>
                    <strong className="text-white block font-semibold">Fear-Free City Driving</strong>
                    <span className="text-slate-400 text-[11px]">Navigate crowded Tagum intersections and bypass corridors calmly.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Step-by-Step Admission Process */}
        <section id="process" className="py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            <div className="text-center max-w-xl mx-auto mb-14">
              <span
                className="text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">Roadmap</span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                4 Steps to Your Official Driver's License
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <span className="font-display font-extrabold text-xl text-slate-900">01</span>
                <h3 className="font-display font-bold text-sm text-slate-900">Online Admission</h3>
                <p className="text-slate-500 leading-relaxed">Choose your course, select your schedule, and receive your temporary
                  registration voucher slip.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <span className="font-display font-extrabold text-xl text-slate-900">02</span>
                <h3 className="font-display font-bold text-sm text-slate-900">TDC Theory</h3>
                <p className="text-slate-500 leading-relaxed">Complete the 15-hour classroom lectures and receive your official
                  certificate for your Student Permit.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <span className="font-display font-extrabold text-xl text-slate-900">03</span>
                <h3 className="font-display font-bold text-sm text-slate-900">PDC Road Lessons</h3>
                <p className="text-slate-500 leading-relaxed">Practice maneuvers on our private closed track and develop highway
                  driving skills with 1-on-1 instruction.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <span className="font-display font-extrabold text-xl text-slate-900">04</span>
                <h3 className="font-display font-bold text-sm text-slate-900">Government Portal Sync & License</h3>
                <p className="text-slate-500 leading-relaxed">Your completion certificate is uploaded directly to the Government Portal
                  portal for license issuance.</p>
              </div>
            </div>

          </div>
        </section>

        {/* Instructors Faculty */}
        <section id="instructors" className="py-20 bg-white border-y border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            <div className="text-center max-w-xl mx-auto mb-14">
              <span
                className="text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">Certified
                Faculty</span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                Patient, Government-Accredited Mentors
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-center">

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div
                  className="w-16 h-16 rounded-full bg-slate-200 text-slate-800 font-display font-bold text-lg flex items-center justify-center mx-auto">
                  DR</div>
                <h4 className="font-display font-bold text-sm text-slate-900">Danilo Reyes</h4>
                <p className="text-amber-700 font-semibold text-[11px]">Chief Practical Instructor</p>
                <span className="inline-block px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200 text-[10px]">Official
                  ID: INST-2019-041</span>
                <p className="text-slate-500 pt-2 border-t border-slate-200">Specialist in manual transmission and uphill parking
                  controls.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div
                  className="w-16 h-16 rounded-full bg-slate-200 text-slate-800 font-display font-bold text-lg flex items-center justify-center mx-auto">
                  GM</div>
                <h4 className="font-display font-bold text-sm text-slate-900">Grace Mendoza</h4>
                <p className="text-amber-700 font-semibold text-[11px]">Senior TDC Lecturer</p>
                <span className="inline-block px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200 text-[10px]">Official
                  ID: INST-2020-118</span>
                <p className="text-slate-500 pt-2 border-t border-slate-200">Traffic rules and road safety legislation instructor.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div
                  className="w-16 h-16 rounded-full bg-slate-200 text-slate-800 font-display font-bold text-lg flex items-center justify-center mx-auto">
                  RD</div>
                <h4 className="font-display font-bold text-sm text-slate-900">Engr. Roberto Dalisay</h4>
                <p className="text-amber-700 font-semibold text-[11px]">Sedan & SUV Specialist</p>
                <span className="inline-block px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200 text-[10px]">Official
                  ID: INST-9021-088</span>
                <p className="text-slate-500 pt-2 border-t border-slate-200">Expert in calm instruction for first-time beginner
                  drivers.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div
                  className="w-16 h-16 rounded-full bg-slate-200 text-slate-800 font-display font-bold text-lg flex items-center justify-center mx-auto">
                  AG</div>
                <h4 className="font-display font-bold text-sm text-slate-900">Allan Garcia</h4>
                <p className="text-amber-700 font-semibold text-[11px]">Motorcycle Safety Coach</p>
                <span className="inline-block px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200 text-[10px]">Official
                  ID: INST-2022-204</span>
                <p className="text-slate-500 pt-2 border-t border-slate-200">Two-wheel slalom, curve banking, and road defense
                  mentor.</p>
              </div>

            </div>
          </div>
        </section>

        {/* Campus & Contact */}
        <section id="contact" className="py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 sm:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <span
                      className="text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">Tagum
                      Campus</span>
                    <h2 className="font-display text-2xl font-extrabold text-slate-900 tracking-tight mt-3">
                      St. Joseph Cupertino Driving School
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">St. Pio Building, Purok Magsanoc, Mankilam, City of Tagum, Davao del Norte</p>
                  </div>

                  <div className="space-y-3 text-xs text-slate-600">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-amber-600 text-lg">location_on</span>
                      <span>St. Pio Building, Purok Magsanoc, Mankilam, City of Tagum, Davao del Norte, Davao del Norte, 8100</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-amber-600 text-lg">call</span>
                      <span>(084) 216-8942 / +63 917 554 9021</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-amber-600 text-lg">schedule</span>
                      <span>Monday – Saturday: 7:30 AM – 5:30 PM</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-amber-600 text-lg">mail</span>
                      <span>admissions@stjosephcupertino.ph</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <a href="/dashboard/operations"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-amber-600 transition-colors">
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                      Open Management Suite (Staff View)
                    </a>
                  </div>
                </div>

                {/* Quick Callback Form */}
                <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
                  <h3 className="font-display font-bold text-base text-slate-900">Have Questions? Request a Callback</h3>
                  <p className="text-xs text-slate-500 mt-1">Our registrar will call you back within 1 hour during office hours.
                  </p>

                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      const form = event.currentTarget;
                      const nameInput = form.querySelector('input[type="text"]');
                      const phoneInput = form.querySelector('input[type="tel"]');
                      const courseSelect = form.querySelector('select');
                      const name = nameInput?.value?.trim() || 'Prospective Student';
                      const phone = phoneInput?.value?.trim() || '';
                      const course = courseSelect?.value || 'Theoretical Driving Course';

                      const btn = form.querySelector('button[type="submit"]');
                      if (btn) {
                        const original = btn.textContent;
                        btn.textContent = '✓ Inquiry Submitted!';
                        btn.classList.add('bg-emerald-600');
                        setTimeout(() => {
                          btn.textContent = original;
                          btn.classList.remove('bg-emerald-600');
                        }, 3000);
                      }
                      form.reset();
                    }}
                    className="mt-5 space-y-3.5 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Your Name</label>
                        <input type="text" required placeholder="Juan dela Cruz"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs focus:outline-none focus:border-slate-900" />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Contact Number</label>
                        <input type="tel" required placeholder="0917 123 4567"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs focus:outline-none focus:border-slate-900" />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Course of Interest</label>
                      <select
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs focus:outline-none focus:border-slate-900">
                        <option>Theoretical Driving Course (TDC - 15 Hours)</option>
                        <option>PDC Sedan - Manual Transmission</option>
                        <option>PDC Sedan - Automatic Transmission</option>
                        <option>PDC Motorcycle (Scooter / Manual)</option>
                        <option>All-in-One TDC + PDC Combo Bundle</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Questions / Preferred Schedule</label>
                      <textarea rows={3} placeholder="Tell us your questions or available days..."
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs focus:outline-none focus:border-slate-900"></textarea>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button type="submit"
                        className="px-5 py-2.5 rounded-lg bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none">
                        Submit Inquiry
                      </button>
                      <a href="/portal?tab=enroll" className="font-semibold text-amber-700 hover:underline">
                        Proceed to Full Enrollment →
                      </a>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="bg-slate-900 text-white py-12 text-xs border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img src="/assets/images/logo.png" alt="Logo" className="h-9 w-auto object-contain bg-white rounded p-0.5" />
                <span className="font-display font-bold text-sm tracking-tight text-white">ST. JOSEPH CUPERTINO</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Accredited by the Government Regulatory Office Central & Regional Office XI. Official Driving Academy in
                Tagum City.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase text-amber-400 tracking-wider mb-3">Courses & Training</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#courses" className="hover:text-white transition-colors">TDC Theoretical (15h)</a></li>
                <li><a href="#courses" className="hover:text-white transition-colors">PDC Sedan (MT / AT)</a></li>
                <li><a href="#courses" className="hover:text-white transition-colors">PDC Motorcycle</a></li>
                <li><a href="#courses" className="hover:text-white transition-colors">Combo Packages</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase text-amber-400 tracking-wider mb-3">Online Portals</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="/portal?tab=enroll" className="hover:text-white text-amber-300 font-semibold">Online Student
                  Application</a></li>
                <li><a href="/portal?tab=login" className="hover:text-white">Staff Login</a></li>
                <li><a href="/dashboard/operations" className="hover:text-white">Operations Suite</a></li>
                <li><a href="/dashboard/reports" className="hover:text-white">Official Compliance Portal</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase text-amber-400 tracking-wider mb-3">Campus Office</h4>
              <p className="text-slate-400">St. Pio Building, Purok Magsanoc, Mankilam, City of Tagum, Davao del Norte</p>
              <p className="text-slate-400 mt-2">Hotline: (084) 216-8942 / 0917 554 9021</p>
              <p className="text-slate-400">Email: admissions@stjosephcupertino.ph</p>
            </div>

          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-2">
            <p>© 2024 St. Joseph Cupertino Driving School. All Rights Reserved. IT12 Capstone Project.</p>
            <div className="flex items-center gap-4">
              <span className="text-slate-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-emerald-400">shield_lock</span>
                RA 10173 Data Privacy Protected
              </span>
              <span>•</span>
              <a href="/portal?tab=login" className="hover:text-slate-300">Staff Portal</a>
              <span>•</span>
              <a href="/dashboard/operations" className="hover:text-slate-300">Management Suite</a>
            </div>
          </div>
        </div>
      </footer>

      {/* High-Resolution Lightbox Modal */}
      <div id="lightboxModal" className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md hidden flex-col items-center justify-between p-4 sm:p-6 opacity-0 transition-opacity duration-300" role="dialog" aria-modal="true" aria-label="Photo Preview Lightbox" suppressHydrationWarning>

        {/* Top Bar Controls */}
        <div className="w-full max-w-5xl flex items-center justify-between text-white pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950" id="lightboxTag">Tag</span>
            <span className="text-xs text-slate-400" id="lightboxCounter">Photo 1 of 5</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { window.closeLightbox() }} title="Close Lightbox (Esc)" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center py-4 overflow-hidden">
          {/* Prev Button */}
          <button onClick={() => { window.prevLightboxImage() }} title="Previous (Left Arrow)" className="absolute left-2 sm:left-4 z-20 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 flex items-center justify-center transition-all shadow-lg">
            <span className="material-symbols-outlined text-2xl">chevron_left</span>
          </button>

          {/* Image Display */}
          <div className="max-h-[66vh] max-w-full flex items-center justify-center">
            <img id="lightboxImage" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" alt="Enlarged Academy Photo" className="max-h-[66vh] max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300" />
          </div>

          {/* Next Button */}
          <button onClick={() => { window.nextLightboxImage() }} title="Next (Right Arrow)" className="absolute right-2 sm:right-4 z-20 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 flex items-center justify-center transition-all shadow-lg">
            <span className="material-symbols-outlined text-2xl">chevron_right</span>
          </button>
        </div>

        {/* Bottom Caption Bar */}
        <div className="w-full max-w-5xl pt-3 border-t border-slate-800 text-white">
          <h3 className="font-display font-bold text-sm sm:text-base text-white" id="lightboxTitle">Photo Title</h3>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl" id="lightboxDesc">Photo description goes here.</p>
        </div>
      </div>
    </>
  );
}