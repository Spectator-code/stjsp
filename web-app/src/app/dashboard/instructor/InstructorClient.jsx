"use client";
import Link from "next/link";
import { useState } from "react";

export default function InstructorClient({ initialSessions, instructorName, profile }) {
  const normalize = (name) => (name || '').replace(/^(Inst\.|Engr\.|Staff)\s+/i, '').trim().toLowerCase();
  const currentNorm = normalize(instructorName);

  const mySessions = initialSessions.filter(s => {
    if (!s.instructor_name) return false;
    const sessionNorm = normalize(s.instructor_name);
    return sessionNorm === currentNorm ||
      s.instructor_name === instructorName ||
      (instructorName === 'Staff Instructor' && s.instructor_name === 'Johnny Test') ||
      s.instructor_name === 'Johnny Test';
  });

  const now = new Date();

  // Local date matching for today
  const isToday = (dateStr) => {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    return d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate();
  };

  // Today's classes (all sessions scheduled for today)
  const todaySessions = mySessions.filter(s => isToday(s.start_time));

  // Upcoming sessions: all scheduled sessions that are active/upcoming (including current scheduled session and next 7 days)
  const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const upcomingSessions = mySessions
    .filter(s => {
      if (!s.start_time) return false;
      if (s.status === 'completed' || s.status === 'cancelled') return false;
      const startTime = new Date(s.start_time);
      const endTime = s.end_time ? new Date(s.end_time) : startTime;
      return (endTime >= now || s.status === 'scheduled') && startTime <= sevenDaysLater;
    })
    .sort((a, b) => new Date(a.start_time) - new Date(b.start_time));

  const [selectedSession, setSelectedSession] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const uniqueStudents = [];
  const studentIds = new Set();
  mySessions.forEach(s => {
    if (s.enrollments && s.enrollments.profiles) {
      if (!studentIds.has(s.enrollments.profiles.id)) {
        studentIds.add(s.enrollments.profiles.id);
        uniqueStudents.push({
          profile: s.enrollments.profiles,
          course: s.enrollments.courses,
          sessionCount: mySessions.filter(ms => ms.enrollments?.id === s.enrollments.id).length,
          enrollmentId: s.enrollments.id,
          status: s.enrollments.status
        });
      }
    }
  });

  // Active students are students whose course is not yet completed/certified
  const activeStudents = uniqueStudents.filter(st => st.status !== 'completed');

  const filteredStudents = uniqueStudents.filter(st => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const fullName = `${st.profile.first_name || ''} ${st.profile.last_name || ''}`.toLowerCase();
    const course = (st.course?.name || '').toLowerCase();
    return fullName.includes(q) || course.includes(q);
  });

  // KPIs
  const totalHours = mySessions.reduce((acc, curr) => {
    const start = new Date(curr.start_time);
    const end = new Date(curr.end_time);
    return acc + ((end - start) / (1000 * 60 * 60));
  }, 0);

  async function markSessionComplete(sessionId) {
    if (!confirm('Mark this session as completed?')) return;
    try {
      const res = await fetch('/api/sessions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: sessionId, status: 'completed' })
      });
      if (res.ok) {
        alert('Session marked as completed!');
        window.location.reload();
      } else {
        const data = await res.json().catch(() => ({}));
        alert('Failed to update session: ' + (data.error || 'Server error'));
      }
    } catch (e) {
      alert('Error updating session: ' + e.message);
    }
  }

  async function markCourseComplete(enrollmentId, stName) {
    if (!confirm(`Are you sure you want to mark ${stName}'s course as completed and issue their certificate?`)) return;
    try {
      const res = await fetch(`/api/enrollments/${enrollmentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'completed' })
      });
      if (res.ok) {
        alert('Course marked completed! Certificate issued.');
        window.location.reload();
      } else {
        alert('Failed to update.');
      }
    } catch (e) {
      alert('Error: ' + e.message);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/images/logo.png" alt="Logo" className="h-8 w-auto" />
            <div>
              <h1 className="font-display font-bold text-slate-900 text-sm">Instructor Portal</h1>
              <p className="text-[10px] text-slate-500 font-medium">{instructorName}</p>
            </div>
          </div>
          <form action="/api/auth/logout" method="POST">
            <button type="submit" className="text-xs font-semibold text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-colors">
              Sign Out
            </button>
          </form>
        </div>
      </header>

      {/* Main container with bottom padding to avoid floating scroll controls overlap */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-32 sm:pb-36 flex-1 w-full">

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Active Students</p>
              <h3 className="font-display text-3xl font-bold text-slate-900">{activeStudents.length}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-indigo-600">groups</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Hours Logged</p>
              <h3 className="font-display text-3xl font-bold text-slate-900">{Math.round(totalHours)}<span className="text-base text-slate-400 ml-1">hrs</span></h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-emerald-600">timer</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Upcoming Sessions</p>
              <h3 className="font-display text-3xl font-bold text-slate-900">{upcomingSessions.length}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-amber-600">event_upcoming</span>
            </div>
          </div>
        </div>

        {/* Responsive Grid with generous sidebar space */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Col: Schedules */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8 min-w-0">
            {/* Today's Schedule */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-500">today</span> Today's Classes
                </h2>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {todaySessions.length} Scheduled
                </span>
              </div>

              <div className="space-y-4">
                {todaySessions.length > 0 ? todaySessions.map(session => (
                  <div key={session.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-300 transition-colors">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="text-xs font-bold bg-slate-900 text-white px-2 py-1 rounded shadow-xs whitespace-nowrap">
                          {new Date(session.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(session.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className="text-[10px] text-slate-600 bg-slate-100 border border-slate-200 px-2 py-1 rounded uppercase font-bold tracking-wider">
                          {session.vehicle_info}
                        </span>
                        {session.status === 'completed' && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px]">check_circle</span> Completed
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2 truncate">
                        {session.enrollments?.profiles?.first_name} {session.enrollments?.profiles?.last_name}
                      </h3>
                      <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5 mt-0.5 truncate">
                        <span className="material-symbols-outlined text-[16px] shrink-0">menu_book</span> {session.enrollments?.courses?.name}
                      </p>
                      {session.notes && (
                        <p className="text-xs text-slate-600 mt-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <span className="font-bold text-slate-800">Directives:</span> {session.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex sm:flex-col gap-2 shrink-0">
                      {session.status !== 'completed' ? (
                        <button
                          onClick={() => markSessionComplete(session.id)}
                          className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs hover:bg-emerald-700 active:scale-95 transition-all hover:shadow-md whitespace-nowrap"
                        >
                          Mark Complete
                        </button>
                      ) : (
                        <button
                          disabled
                          className="px-4 py-2 bg-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider rounded-xl cursor-not-allowed whitespace-nowrap"
                        >
                          Completed
                        </button>
                      )}
                      <button
                        onClick={() => { setSelectedSession(session); setIsModalOpen(true); }}
                        className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 active:scale-95 transition-all whitespace-nowrap"
                      >
                        Log Progress
                      </button>
                    </div>
                  </div>
                )) : (
                  <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 border-dashed shadow-xs">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-4 border border-slate-100">
                      <span className="material-symbols-outlined text-3xl text-slate-400">task_alt</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">You're all clear for today!</h3>
                    <p className="text-sm text-slate-500 max-w-sm mx-auto">There are no classes assigned to your schedule for today. Enjoy the break or review your upcoming roster.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Upcoming Schedule */}
            <section>
              <h2 className="font-display font-bold text-xl text-slate-900 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-500">calendar_month</span> Upcoming (Next 7 Days)
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                {upcomingSessions.length > 0 ? (
                  <ul className="divide-y divide-slate-100">
                    {upcomingSessions.map(session => {
                      const sessionDate = new Date(session.start_time);
                      const sessionIsToday = isToday(session.start_time);
                      return (
                        <li key={session.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                          <div className="flex items-center gap-4 min-w-0">
                            <div className={`w-12 h-12 rounded-xl border flex flex-col items-center justify-center shrink-0 ${sessionIsToday ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-100 border-slate-200 text-slate-700'}`}>
                              <span className="text-[9px] font-bold uppercase tracking-widest leading-none mb-0.5">
                                {sessionIsToday ? 'TODAY' : sessionDate.toLocaleDateString('en-US', { weekday: 'short' })}
                              </span>
                              <span className="text-lg font-display font-black leading-none">
                                {sessionDate.getDate()}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-bold text-slate-900 truncate">{session.enrollments?.profiles?.first_name} {session.enrollments?.profiles?.last_name}</h4>
                              <p className="text-xs text-slate-500 truncate">{sessionDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {session.vehicle_info}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {sessionIsToday && (
                              <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                                Today
                              </span>
                            )}
                            <span className="material-symbols-outlined text-slate-300">chevron_right</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-sm text-slate-500 font-medium">No upcoming sessions booked yet.</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Col: My Students */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6 min-w-0">
            <h2 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-rose-500">school</span> My Students
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full ml-auto">
                {activeStudents.length} Active / {uniqueStudents.length} Total
              </span>
            </h2>

            {/* Roster Card with controlled height to avoid overlapping bottom docks */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden sticky top-20 max-h-[calc(100vh-6.5rem)] flex flex-col">
              {/* Search Header */}
              <div className="p-3.5 bg-slate-50 border-b border-slate-100 shrink-0">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search roster..."
                    className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Students List */}
              {filteredStudents.length > 0 ? (
                <ul className="divide-y divide-slate-100 overflow-y-auto flex-1 min-h-0">
                  {filteredStudents.map(st => (
                    <li key={st.profile.id} className="p-4 hover:bg-slate-50/80 transition-colors group">
                      {/* Top: Avatar, Name, Course, Session Badge */}
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs group-hover:scale-105 transition-transform mt-0.5">
                          {st.profile.first_name?.[0] || 'S'}{st.profile.last_name?.[0] || 'T'}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-bold text-slate-900 truncate leading-snug">
                              {st.profile.first_name} {st.profile.last_name}
                            </h4>
                            <span className="shrink-0 px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-bold tracking-tight">
                              {st.sessionCount} {st.sessionCount === 1 ? 'Session' : 'Sessions'}
                            </span>
                          </div>
                          <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5" title={st.course?.name}>
                            {st.course?.name || 'Driving Course'}
                          </p>
                        </div>
                      </div>

                      {/* Action Row: Status & Certificate Button */}
                      <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-slate-100/90">
                        <span className="text-[11px] text-slate-500 flex items-center gap-1.5 shrink-0">
                          <span className={`w-1.5 h-1.5 rounded-full ${st.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          <span className="font-semibold text-slate-600">{st.status === 'completed' ? 'Completed' : 'In Training'}</span>
                        </span>

                        {st.status !== 'completed' ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              markCourseComplete(st.enrollmentId, `${st.profile.first_name} ${st.profile.last_name}`);
                            }}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-[11px] uppercase font-bold tracking-wider rounded-lg shadow-xs hover:shadow transition-all whitespace-nowrap flex items-center gap-1 shrink-0"
                          >
                            <span className="material-symbols-outlined text-xs">workspace_premium</span>
                            Issue Certificate
                          </button>
                        ) : (
                          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[11px] font-bold rounded-lg flex items-center gap-1 shrink-0">
                            <span className="material-symbols-outlined text-[14px] text-emerald-600">verified</span> Certified
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-8 text-center my-auto">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                    <span className="material-symbols-outlined text-slate-400">person_off</span>
                  </div>
                  <p className="text-sm font-bold text-slate-700 mb-1">
                    {searchQuery ? "No matching students" : "Roster Empty"}
                  </p>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    {searchQuery
                      ? "Try searching with a different name or course keyword."
                      : "You have not been assigned to any students yet."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Training Progress Report Modal */}
      {isModalOpen && selectedSession && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-200">
            <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-display font-bold text-slate-900">Training Progress Report</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-900"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={async (e) => {
              e.preventDefault();
              setIsSubmitting(true);
              const formData = new FormData(e.target);

              const skills = [];
              if (formData.get('s1')) skills.push('Basic Handling');
              if (formData.get('s2')) skills.push('Traffic Rules');
              if (formData.get('s3')) skills.push('Parking');
              if (formData.get('s4')) skills.push('Defensive Driving');

              const payload = {
                student_id: selectedSession.enrollments?.profiles?.id,
                instructor_name: instructorName,
                schedule_id: selectedSession.id,
                training_date: selectedSession.start_time,
                skills_covered: skills.join(', '),
                remarks: formData.get('remarks'),
                progress_status: formData.get('status')
              };

              try {
                const res = await fetch('/api/progress', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload)
                });
                if (res.ok) {
                  alert('Progress successfully logged!');
                  setIsModalOpen(false);
                  window.location.reload();
                } else {
                  alert('Failed to log progress.');
                }
              } catch (err) {
                alert('Error connecting to server.');
              }
              setIsSubmitting(false);
            }} className="p-6 space-y-5">

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Skills Covered</label>
                <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
                  <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="s1" className="rounded border-slate-300 text-slate-900 focus:ring-slate-900" /> Basic Handling</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="s2" className="rounded border-slate-300 text-slate-900 focus:ring-slate-900" /> Traffic Rules</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="s3" className="rounded border-slate-300 text-slate-900 focus:ring-slate-900" /> Parking</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="s4" className="rounded border-slate-300 text-slate-900 focus:ring-slate-900" /> Defensive Driving</label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Remarks / Notes</label>
                <textarea name="remarks" required rows="3" placeholder="Enter your evaluation notes..." className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Overall Progress Status</label>
                <select name="status" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900">
                  <option>Incomplete</option>
                  <option>Satisfactory</option>
                  <option>Needs Improvement</option>
                  <option>Completed</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-lg">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-5 py-2 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow disabled:opacity-50">
                  {isSubmitting ? 'Saving...' : 'Submit Evaluation'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
