"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HeaderAvatar from "../../../../components/HeaderAvatar";

export default function SettingsClient({ user }) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (title, msg, type = 'success') => {
    setToast({ title, msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast("Upload Failed", "File size must be under 2MB.", "error");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/auth/upload-avatar", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (res.ok) {
        showToast("Success", "Profile picture updated securely.");
        router.refresh();
      } else {
        showToast("Upload Failed", data.error || "Security check failed.", "error");
      }
    } catch (err) {
      showToast("Error", "Network error during upload.", "error");
    } finally {
      setUploading(false);
    }
  };

  const getRole = () => {
    // Default inference based on email if metadata doesn't have role
    if (user.email === 'admin@stjosephcupertino.ph') return 'Registrar & Operations';
    if (user.email === 'dispatcher@stjosephcupertino.ph') return 'Campus Dispatcher';
    if (user.email === 'cashier@stjosephcupertino.ph') return 'Campus Cashier';
    if (user.email === 'sysadmin@stjosephcupertino.ph') return 'System Administrator';
    return 'Student / Instructor';
  };

  return (
    <>
      <div className="flex h-screen bg-slate-50 font-sans">
        {/* Sidebar Mini */}
        <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 z-50 flex flex-col justify-between">
          <div className="flex flex-col">
            <div className="h-16 px-5 border-b border-slate-100 flex items-center gap-3">
              <img src="/assets/images/logo.png" alt="Logo" className="h-9 w-auto object-contain" />
              <div className="flex flex-col min-w-0">
                <span className="font-display text-xs font-extrabold text-slate-900 tracking-tight truncate">ST. JOSEPH CUPERTINO</span>
                <span className="text-[10px] text-amber-600 font-bold uppercase tracking-wider truncate">Driving School • Settings</span>
              </div>
            </div>
            
            <div className="px-3 pt-6 space-y-1 text-xs">
              <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors font-medium">
                <span className="material-symbols-outlined text-base">arrow_back</span>
                Back to Dashboard
              </Link>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-900 text-white transition-colors shadow-xs font-medium">
                <span className="material-symbols-outlined text-base">manage_accounts</span>
                Account Settings
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden bg-slate-50 relative">
          <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Settings</span>
              <span className="text-slate-300">/</span>
              <span className="font-semibold text-slate-800">My Profile</span>
            </div>
            <HeaderAvatar fallbackName={`${user.user_metadata?.first_name || 'My'} ${user.user_metadata?.last_name || 'Account'}`} fallbackRole={getRole()} />
          </header>

          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="max-w-2xl mx-auto">
              
              <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
                <div className="p-6 md:p-8 border-b border-slate-200 bg-slate-50">
                  <h2 className="text-lg font-display font-bold text-slate-900 mb-1">Profile Security & Identity</h2>
                  <p className="text-xs text-slate-500">Manage your profile picture securely. Protected by 007 security protocols.</p>
                </div>
                
                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-8 flex-col sm:flex-row">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 shadow-inner relative group">
                      {user.user_metadata?.avatar_url ? (
                        <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span className="material-symbols-outlined text-5xl text-slate-300">person</span>
                      )}
                      
                      {uploading && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                          <span className="material-symbols-outlined animate-spin text-slate-900 text-3xl">sync</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 text-sm mb-2">Upload Profile Picture</h3>
                      <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                        For security purposes, we only accept <strong className="text-slate-700">JPG, PNG, or WEBP</strong> files under <strong className="text-slate-700">2MB</strong>. Files are strictly scanned via magic-byte inspection before storage to prevent malicious payload uploads.
                      </p>
                      
                      <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer shadow-xs disabled:opacity-50">
                        <span className="material-symbols-outlined text-sm">cloud_upload</span>
                        {uploading ? 'Uploading securely...' : 'Choose File'}
                        <input type="file" className="hidden" accept="image/jpeg, image/png, image/webp" onChange={handleFileChange} disabled={uploading} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-800 text-xs">
                <span className="material-symbols-outlined text-emerald-500 mt-0.5">verified_user</span>
                <div>
                  <strong className="font-bold block mb-0.5">007 Enterprise Security Active</strong>
                  <p className="opacity-90 leading-relaxed">Your uploads are protected. Filenames are automatically anonymized via cryptographically secure UUIDs to prevent path traversal and object enumeration.</p>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-white rounded-lg shadow-lg border border-slate-200 animate-slide-up">
          <span className={`material-symbols-outlined ${toast.type === 'error' ? 'text-rose-500' : 'text-emerald-500'}`}>
            {toast.type === 'error' ? 'error' : 'check_circle'}
          </span>
          <div>
            <h4 className="text-sm font-bold text-slate-900">{toast.title}</h4>
            <p className="text-xs text-slate-500">{toast.msg}</p>
          </div>
        </div>
      )}
    </>
  );
}
