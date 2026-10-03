import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  Mail, 
  User, 
  Briefcase, 
  GraduationCap, 
  Zap,
  CheckCircle2,
  KeyRound,
  Layers
} from 'lucide-react';
import { MOSPI_DIVISIONS, DESIGNATIONS, SAMPLE_RESUMES } from '../data/mockData';

export default function LoginRegister({ onLogin }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [selectedRole, setSelectedRole] = useState('learner'); // 'learner' or 'admin'
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regForm, setRegForm] = useState({
    name: '',
    employeeId: '',
    designation: 'SSO',
    division: 'NAD',
    experience: '4 Years',
    qualifications: 'M.Sc. Statistics',
    email: '',
    password: ''
  });

  const handleManualLogin = (e) => {
    e.preventDefault();
    if (selectedRole === 'admin') {
      onLogin({
        role: 'admin',
        name: 'Dr. Amitabh Sen (Joint Director)',
        employeeId: 'ISS-DIR-2012-004',
        designation: 'DIR',
        division: 'DIID',
        experience: '14 Years',
        qualifications: 'Ph.D. Econometrics, ISS'
      });
    } else {
      onLogin({
        role: 'learner',
        name: loginEmail ? loginEmail.split('@')[0].replace('.', ' ').toUpperCase() : 'Rajesh Kumar Verma',
        employeeId: 'ISS-2018-9412',
        designation: 'SSO',
        division: 'NAD',
        experience: '6.5 Years',
        qualifications: 'M.Sc. Statistics, PGDCA'
      });
    }
  };

  const handleQuickDemoLogin = (profileType) => {
    if (profileType === 'admin') {
      onLogin({
        role: 'admin',
        name: 'Dr. Amitabh Sen (Joint Director)',
        employeeId: 'ISS-DIR-2012-004',
        designation: 'DIR',
        division: 'DIID',
        experience: '14 Years',
        qualifications: 'Ph.D. Econometrics, ISS'
      });
    } else if (profileType === 'sso_nad') {
      const sample = SAMPLE_RESUMES[0];
      onLogin({
        role: 'learner',
        name: sample.name,
        employeeId: 'ISS-2018-9412',
        designation: 'SSO',
        division: sample.division,
        experience: sample.experience,
        qualifications: sample.qualifications,
        skills: sample.extractedSkills,
        preliminaryGaps: sample.detectedGaps
      });
    } else if (profileType === 'jso_fod') {
      const sample = SAMPLE_RESUMES[1];
      onLogin({
        role: 'learner',
        name: sample.name,
        employeeId: 'SSS-2022-3180',
        designation: 'JSO',
        division: sample.division,
        experience: sample.experience,
        qualifications: sample.qualifications,
        skills: sample.extractedSkills,
        preliminaryGaps: sample.detectedGaps
      });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    onLogin({
      role: 'learner',
      name: regForm.name || 'New Statistical Officer',
      employeeId: regForm.employeeId || 'ISS-2026-1001',
      designation: regForm.designation,
      division: regForm.division,
      experience: regForm.experience,
      qualifications: regForm.qualifications
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Gov Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold mb-3 border border-white/10 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Smart India Hackathon 2026 • PS 26101</span>
        </div>

        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 font-black shadow-lg">
            <Building2 className="w-7 h-7" />
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-black text-white tracking-tight">
              समर्थ्य-STAT
            </h1>
            <p className="text-xs text-indigo-200 font-medium">
              MoSPI • Integrated with iGOT Karmayogi
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-400 max-w-xs mx-auto">
          AI-Enabled Skill Intelligence & Continuous Capacity Building Portal
        </p>
      </div>

      {/* Main Authentication Card */}
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white/95 backdrop-blur-xl py-8 px-6 sm:px-10 rounded-3xl shadow-2xl border border-white/40 space-y-6">
          
          {/* Tab Switcher: Login vs Register */}
          <div className="flex p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${
                activeTab === 'login'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign In (Jan Parichay / SSO)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${
                activeTab === 'register'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Register New Official
            </button>
          </div>

          {/* TAB 1: LOGIN */}
          {activeTab === 'login' && (
            <div className="space-y-5">
              
              {/* Role Selection Pill */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole('learner')}
                  className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 ${
                    selectedRole === 'learner'
                      ? 'border-indigo-600 bg-indigo-50/60 ring-1 ring-indigo-600 text-indigo-950'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <UserCheck className="w-5 h-5 text-indigo-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold">Learner Official</div>
                    <div className="text-[10px] text-slate-400">ISS / SSS / Cadre</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('admin')}
                  className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 ${
                    selectedRole === 'admin'
                      ? 'border-slate-900 bg-slate-900 text-white ring-1 ring-slate-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold">MoSPI Admin</div>
                    <div className="text-[10px] opacity-75">DIID & NSSTA Wing</div>
                  </div>
                </button>
              </div>

              {/* Instant 1-Click Demo Login for SIH Judges */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-amber-900 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
                    <span>Instant 1-Click Evaluation Logins:</span>
                  </span>
                  <span className="text-[10px] bg-amber-200 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                    SIH Demo
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('sso_nad')}
                    className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-amber-100/50 border border-amber-300 transition text-xs font-bold text-slate-800 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span>Rajesh Verma (SSO)</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
                    </div>
                    <div className="text-[10px] text-slate-500 font-normal">National Accounts (NAD)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('jso_fod')}
                    className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-amber-100/50 border border-amber-300 transition text-xs font-bold text-slate-800 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span>Pooja Sharma (JSO)</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
                    </div>
                    <div className="text-[10px] text-slate-500 font-normal">Field Operations (FOD)</div>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('admin')}
                  className="w-full p-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Enter as MoSPI DIID Administrator</span>
                </button>
              </div>

              {/* Standard Email/Gov ID form */}
              <form onSubmit={handleManualLogin} className="space-y-3.5 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Government Email / Karmayogi ID
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="officer.name@nic.in or ISS-2024-XXXX"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Password / Single Sign-On Token
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold text-xs shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  <span>Sign In to Samarthya-Stat</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

            </div>
          )}

          {/* TAB 2: REGISTER */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name (as per Service Record)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suresh Chandra Nair"
                  value={regForm.name}
                  onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Cadre Designation
                  </label>
                  <select
                    value={regForm.designation}
                    onChange={(e) => setRegForm({ ...regForm, designation: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    {DESIGNATIONS.map((d) => (
                      <option key={d.id} value={d.id}>{d.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    MoSPI Division
                  </label>
                  <select
                    value={regForm.division}
                    onChange={(e) => setRegForm({ ...regForm, division: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    {MOSPI_DIVISIONS.map((div) => (
                      <option key={div.id} value={div.id}>{div.id} - {div.name.split('(')[0]}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ISS-2024-8819"
                    value={regForm.employeeId}
                    onChange={(e) => setRegForm({ ...regForm, employeeId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Experience
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5 Years"
                    value={regForm.experience}
                    onChange={(e) => setRegForm({ ...regForm, experience: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Educational Qualifications
                </label>
                <input
                  type="text"
                  placeholder="e.g. M.Sc. Statistics / MCA / M.A. Economics"
                  value={regForm.qualifications}
                  onChange={(e) => setRegForm({ ...regForm, qualifications: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-700 hover:from-emerald-700 hover:to-indigo-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <span>Register & Begin Competency Diagnostic</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>
      </div>

    </div>
  );
}
