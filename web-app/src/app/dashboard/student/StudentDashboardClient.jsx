"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function StudentDashboardClient({ user, courses = [], enrollments = [], payments = [] }) {
  const router = useRouter();
  
  // State for modals
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPaymentsModalOpen, setIsPaymentsModalOpen] = useState(false);
  
  // State for user data
  const [firstName, setFirstName] = useState(user.user_metadata?.first_name || "Student");
  const [lastName, setLastName] = useState(user.user_metadata?.last_name || "");
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    setFirstName(user.user_metadata?.first_name || "Student");
    setLastName(user.user_metadata?.last_name || "");
  }, [user]);

  // State for requirements
  const [medicalStatus, setMedicalStatus] = useState("PENDING"); // PENDING, UPLOADING, VERIFIED
  
  const handleSignOut = async (e) => {
    e.preventDefault();
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/portal?tab=login");
    router.refresh();
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const res = await fetch("/api/auth/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName })
      });
      const data = await res.json();
      
      if (data.success) {
        setIsProfileModalOpen(false);
        router.refresh(); // Refresh page to get updated user state from server
      } else {
        alert("Failed to update profile: " + data.error);
      }
    } catch (err) {
      alert("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUploadMedical = () => {
    // Simulate file picking and uploading
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,.pdf";
    input.onchange = (e) => {
      if (e.target.files.length > 0) {
        setMedicalStatus("UPLOADING");
        setTimeout(() => setMedicalStatus("VERIFIED"), 2000);
      }
    };
    input.click();
  };

  const handleDownloadManual = () => {
    // Generate a dummy text file to simulate PDF download
    const element = document.createElement("a");
    const file = new Blob(["This is a placeholder for the Theoretical Driving Course (TDC) Manual PDF."], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "TDC_Manual_StJoseph.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-amber-200">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/assets/images/logo.png" alt="Logo" className="h-9 w-auto object-contain group-hover:scale-105 transition-transform" />
            <span className="font-display font-extrabold text-sm text-slate-900 group-hover:text-amber-600 transition-colors">Student Portal</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 mr-2 text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Logged in as</span>
              <span className="text-xs font-bold text-slate-800">{firstName} {lastName}</span>
            </div>
            <button onClick={handleSignOut} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors group">
              <span className="material-symbols-outlined text-[16px] group-hover:text-amber-600 transition-colors">logout</span>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
        
        {/* Welcome Section */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight flex items-center gap-3">
              Welcome back, {firstName}!
            </h1>
            <p className="text-sm text-slate-500 mt-1">Here is the latest overview of your driving school journey.</p>
          </div>
          <button 
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-md hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">settings</span>
            Manage Profile
          </button>
        </div>
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Main Course Progress */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm md:col-span-2 lg:col-span-2 flex flex-col justify-between group hover:shadow-md transition-shadow">
             <div className="flex items-center justify-between mb-6">
               <h2 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                 <span className="material-symbols-outlined text-amber-500">menu_book</span>
                 Current Course
               </h2>
               <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-md uppercase tracking-wider">
                 {enrollments.length > 0 ? enrollments[0].status : "No Active Course"}
               </span>
             </div>
             
             {enrollments.length > 0 ? (
               <div>
                 <p className="text-xl font-bold text-slate-800">{enrollments[0].courses?.name || "Enrolled Course"}</p>
                 <p className="text-sm text-slate-500 mb-6 mt-1">{enrollments[0].courses?.description || "Course details pending."}</p>
                 
                 <div className="space-y-2">
                   <div className="flex justify-between text-xs font-bold">
                     <span className="text-slate-700">Progress</span>
                     <span className="text-amber-600">
                       {enrollments[0].hours_completed} / {enrollments[0].courses?.duration_hours || 0} Hours 
                       ({Math.round((enrollments[0].hours_completed / (enrollments[0].courses?.duration_hours || 1)) * 100)}%)
                     </span>
                   </div>
                   <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner relative">
                     <div 
                       className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full group-hover:scale-y-110 transition-transform origin-left"
                       style={{ width: `${Math.round((enrollments[0].hours_completed / (enrollments[0].courses?.duration_hours || 1)) * 100)}%` }}
                     ></div>
                   </div>
                 </div>
               </div>
             ) : (
               <div className="flex flex-col h-full justify-center items-start">
                 <p className="text-xl font-bold text-slate-800">You are not enrolled in any course.</p>
                 <p className="text-sm text-slate-500 mb-6 mt-1">Select a course to begin your driving journey.</p>
                 
                 <div className="flex flex-col gap-2 w-full">
                   <select id="courseSelection" defaultValue="" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900 text-sm font-medium">
                     <option value="" disabled>-- Select a Course --</option>
                     {courses.map(course => (
                       <option key={course.id} value={course.id}>
                         {course.name} - ₱{course.price.toLocaleString()}
                       </option>
                     ))}
                   </select>
                   <button 
                     onClick={async () => {
                       const courseId = document.getElementById('courseSelection').value;
                       if (!courseId) return alert("Please select a course first.");
                       
                       const res = await fetch("/api/enroll", {
                         method: "POST",
                         headers: { "Content-Type": "application/json" },
                         body: JSON.stringify({ courseId, paymentScheme: "Full" })
                       });
                       const data = await res.json();
                       if (data.success) {
                         alert("Successfully enrolled! Please proceed to the cashier for payment.");
                         router.refresh();
                       } else {
                         alert("Failed to enroll: " + data.error);
                       }
                     }}
                     className="w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors"
                   >
                     Enroll Now
                   </button>
                 </div>
               </div>
             )}
          </div>
          
          {/* Upcoming Schedule */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 border border-slate-700 shadow-md md:col-span-1 lg:col-span-2 text-white relative overflow-hidden group">
             <span className="material-symbols-outlined text-[120px] absolute -right-6 -bottom-6 text-slate-700/30 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">calendar_month</span>
             
             <h2 className="font-extrabold text-lg flex items-center gap-2 mb-6 relative z-10">
               <span className="material-symbols-outlined text-emerald-400">event_upcoming</span>
               Next Session
             </h2>
             
             <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 relative z-10 hover:bg-white/15 transition-colors cursor-pointer">
               <div className="flex items-start justify-between">
                 <div>
                   <p className="text-xs font-semibold text-emerald-400 mb-1">TDC Module 2</p>
                   <p className="text-xl font-bold text-white tracking-tight mb-0.5">Saturday, Oct 17</p>
                   <p className="text-sm text-slate-300">9:00 AM - 12:00 PM</p>
                 </div>
                 <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded-xl">
                   <span className="material-symbols-outlined">schedule</span>
                 </div>
               </div>
               
               <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold border border-slate-600">MR</div>
                 <div className="text-xs">
                   <p className="text-slate-300">Instructor</p>
                   <p className="font-bold text-white">Mark Reyes</p>
                 </div>
               </div>
             </div>
          </div>

          {/* Payment & Balances */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
             <div>
               <h2 className="font-extrabold text-lg text-slate-900 flex items-center gap-2 mb-4">
                 <span className="material-symbols-outlined text-indigo-500">receipt_long</span>
                 Tuition Balance
               </h2>
               <p className="text-3xl font-display font-extrabold text-slate-800 tracking-tight">
                 ₱{enrollments.length > 0 ? (enrollments[0].courses?.price - payments.reduce((sum, p) => sum + Number(p.amount), 0)).toLocaleString() : "0"}
               </p>
               <p className="text-xs text-slate-500 mt-1">Total Remaining Balance</p>
             </div>
             
             <button 
               onClick={() => setIsPaymentsModalOpen(true)}
               className="mt-6 w-full py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors flex items-center justify-center gap-2"
             >
               View Payments <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
             </button>
          </div>

          {/* Requirements Checklist */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm md:col-span-2 lg:col-span-2 hover:shadow-md transition-shadow">
             <div className="flex items-center justify-between mb-4">
               <h2 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                 <span className="material-symbols-outlined text-slate-700">checklist</span>
                 Pre-requisites
               </h2>
               <span className="text-xs font-bold text-slate-500">
                 {medicalStatus === "VERIFIED" ? "0 of 3 Pending" : "1 of 3 Pending"}
               </span>
             </div>
             
             <div className="space-y-3">
               <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                 <div className="flex items-center gap-3">
                   <span className="material-symbols-outlined text-slate-700 text-xl">verified</span>
                   <span className="text-sm font-semibold text-slate-800">PSA Birth Certificate</span>
                 </div>
                 <span className="text-[10px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">VERIFIED</span>
               </div>
               
               <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                 <div className="flex items-center gap-3">
                   <span className="material-symbols-outlined text-slate-700 text-xl">verified</span>
                   <span className="text-sm font-semibold text-slate-800">Valid ID (Government)</span>
                 </div>
                 <span className="text-[10px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">VERIFIED</span>
               </div>

               {medicalStatus === "PENDING" && (
                 <div className="flex items-center justify-between p-3 rounded-xl bg-white border-2 border-dashed border-slate-300">
                   <div className="flex items-center gap-3">
                     <span className="material-symbols-outlined text-slate-400 text-xl">upload_file</span>
                     <span className="text-sm font-semibold text-slate-600">Medical Certificate</span>
                   </div>
                   <button onClick={handleUploadMedical} className="text-[10px] font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 hover:text-slate-900 px-3 py-1.5 rounded-lg transition-colors shadow-2xs">
                     UPLOAD FILE
                   </button>
                 </div>
               )}

               {medicalStatus === "UPLOADING" && (
                 <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                   <div className="flex items-center gap-3">
                     <span className="material-symbols-outlined text-indigo-500 text-xl animate-spin">sync</span>
                     <span className="text-sm font-semibold text-indigo-900">Processing Document...</span>
                   </div>
                 </div>
               )}

               {medicalStatus === "VERIFIED" && (
                 <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                   <div className="flex items-center gap-3">
                     <span className="material-symbols-outlined text-slate-700 text-xl">verified</span>
                     <span className="text-sm font-semibold text-slate-800">Medical Certificate</span>
                   </div>
                   <span className="text-[10px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">VERIFIED</span>
                 </div>
               )}
             </div>
          </div>

          {/* Quick Actions / Resources */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
             <h2 className="font-extrabold text-lg text-slate-900 flex items-center gap-2 mb-4">
               <span className="material-symbols-outlined text-sky-500">widgets</span>
               Quick Actions
             </h2>
             
             <div className="space-y-2">
               <button onClick={handleDownloadManual} className="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-300 hover:bg-slate-100 transition-all flex items-center gap-3 text-left group">
                 <div className="p-2 bg-white rounded-lg shadow-2xs group-hover:shadow-sm flex-shrink-0">
                   <span className="material-symbols-outlined text-[18px] text-sky-600">download</span>
                 </div>
                 <div>
                   <p className="text-xs font-bold text-slate-800">TDC Manual</p>
                   <p className="text-[10px] text-slate-500">Download PDF Study Guide</p>
                 </div>
               </button>
               
               <a href="mailto:admin@stjosephcupertino.ph" className="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-300 hover:bg-slate-100 transition-all flex items-center gap-3 text-left group">
                 <div className="p-2 bg-white rounded-lg shadow-2xs group-hover:shadow-sm flex-shrink-0">
                   <span className="material-symbols-outlined text-[18px] text-sky-600">support_agent</span>
                 </div>
                 <div>
                   <p className="text-xs font-bold text-slate-800">Contact Admin</p>
                   <p className="text-[10px] text-slate-500">Message the registrar</p>
                 </div>
               </a>
             </div>
          </div>

        </div>
      </main>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-extrabold text-xl text-slate-900">Manage Profile</h3>
              <button onClick={() => setIsProfileModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">First Name</label>
                <input 
                  type="text" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-900"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name</label>
                <input 
                  type="text" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-900"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={user.email}
                  disabled
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isSaving}
                className="w-full mt-4 bg-slate-900 text-white rounded-xl py-2.5 text-sm font-bold shadow-md hover:bg-slate-800 transition-colors disabled:bg-slate-700 flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <><span className="material-symbols-outlined animate-spin text-[18px]">autorenew</span> Saving...</>
                ) : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Payments Modal */}
      {isPaymentsModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-extrabold text-xl text-slate-900">Payment History</h3>
              <button onClick={() => setIsPaymentsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto">
              {payments.length === 0 ? (
                <div className="p-4 text-center text-slate-500 text-xs">No payments recorded yet.</div>
              ) : (
                payments.map(payment => (
                  <div key={payment.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-800">Payment ({payment.payment_method})</p>
                      <p className="text-[10px] text-slate-500">
                        {new Date(payment.created_at).toLocaleDateString()} • Receipt #{payment.or_number || 'N/A'}
                      </p>
                    </div>
                    <span className="font-bold text-emerald-600">₱{Number(payment.amount).toLocaleString()}</span>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-slate-200 pt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-semibold">Remaining Balance</p>
                  <p className="text-xl font-bold text-rose-600">
                    ₱{enrollments.length > 0 ? (enrollments[0].courses?.price - payments.reduce((sum, p) => sum + Number(p.amount), 0)).toLocaleString() : "0"}
                  </p>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
                <span className="material-symbols-outlined text-amber-600 text-[18px]">info</span>
                <p className="text-[11px] text-amber-800 font-medium">
                  <strong>Over-the-Counter Only:</strong> We do not accept online payments. Please settle your remaining balances directly at the Cashier's Office. Your balance will be updated here once cleared by management.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
