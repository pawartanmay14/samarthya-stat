import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  UserCheck, 
  CheckCircle2, 
  LogOut,
  Sparkles,
  Zap
} from 'lucide-react';

export default function Header({ 
  currentRole, 
  setCurrentRole, 
  activeOfficer, 
  onLoadSampleProfile, 
  onLogout 
}) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Government of India Tricolor Ribbon */}
      <div className="gov-tricolor-bar w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2.5">
          
          {/* Left: Ministry Branding & Portal Identity */}
          <div className="flex items-center space-x-3">
            {/* National Emblem Box */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-indigo-950 flex items-center justify-center text-white shadow-sm border border-slate-700 shrink-0">
              <div className="text-center leading-none">
                <span className="text-[8px] font-black tracking-widest text-amber-400 block">GOI</span>
                <Building2 className="w-5 h-5 mx-auto text-amber-400 my-0.5" />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                  समर्थ्य-STAT 
                  <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    Samarthya
                  </span>
                </h1>
                
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-orange-800 border border-orange-200">
                  SIH 2026 • PS 26101
                </span>

                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>iGOT Karmayogi Synced</span>
                </span>
              </div>

              <p className="text-[11px] text-slate-500 font-medium">
                Ministry of Statistics & Programme Implementation (MoSPI) • DIID & NSSTA
              </p>
            </div>
          </div>

          {/* Right Controls: Role Switcher, Demo Profiles & Officer Profile */}
          <div className="flex flex-wrap items-center gap-2.5 justify-end">
            
            {/* Quick Demo Switcher */}
            <button
              onClick={onLoadSampleProfile}
              className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition shadow-2xs"
              title="Quickly fill sample profile"
            >
              <Zap className="w-3 h-3 text-amber-600 fill-amber-500" />
              <span>Load Demo Officer</span>
            </button>

            {/* Role Switcher */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setCurrentRole('learner')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition ${
                  currentRole === 'learner'
                    ? 'bg-white text-indigo-950 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>Learner</span>
              </button>
              <button
                onClick={() => setCurrentRole('admin')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition ${
                  currentRole === 'admin'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>MoSPI Admin</span>
              </button>
            </div>

            {/* Officer Avatar Chip */}
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                {activeOfficer?.name ? activeOfficer.name.split(' ').map(n => n[0]).slice(0, 2).join('') : 'RK'}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-slate-800 leading-none">
                  {activeOfficer?.name || 'Officer'}
                </div>
                <div className="text-[10px] text-slate-500 font-medium mt-0.5 leading-none">
                  {activeOfficer?.designation || 'SSO'} • {activeOfficer?.division || 'NAD'}
                </div>
              </div>

              {/* Logout Button */}
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition ml-1"
                  title="Sign out / Switch account"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
