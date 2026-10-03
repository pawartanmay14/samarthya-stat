import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Award, 
  Download, 
  Filter, 
  ArrowUpRight, 
  FileText, 
  ShieldCheck, 
  Sparkles,
  PieChart,
  BarChart3
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { MOCK_ADMIN_STATS } from '../data/mockData';

export default function AdminDashboard({ onSwitchToLearner }) {
  const [selectedDivision, setSelectedDivision] = useState('ALL');
  const stats = MOCK_ADMIN_STATS;

  const handleExportTNA = () => {
    alert("Official MoSPI Training Needs Assessment (TNA 2026) report exported in CSV & PDF format. Prepared for National Statistical Commission & NSSTA Board.");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold mb-2 border border-amber-400/30">
              <Building2 className="w-3.5 h-3.5" />
              <span>MoSPI DIID & NSSTA Leadership Cockpit</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              Workforce Skill Intelligence & Capacity Analytics
            </h2>
            <p className="text-indigo-200 text-xs sm:text-sm mt-1 max-w-2xl">
              Real-time monitoring of statistical competencies, critical skill deficits, iGOT Karmayogi adoption, and predictive capacity requirements across all 7 MoSPI divisions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportTNA}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition flex items-center gap-2 shadow-md shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Export TNA 2026 Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Key Ministry Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              Total Statistical Officers
            </span>
            <div className="text-3xl font-black text-slate-900 mt-1">
              {stats.totalOfficers.toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>ISS, SSS & Cadre Staff</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-700">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              Avg Competency Index
            </span>
            <div className="text-3xl font-black text-indigo-700 mt-1">
              {stats.averageCompetencyIndex}%
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              Target: 80% across divisions
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-700">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-red-200 p-5 shadow-xs flex items-center justify-between bg-red-50/20">
          <div>
            <span className="text-[11px] font-bold text-red-600 uppercase tracking-wide flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Active Critical Gaps
            </span>
            <div className="text-3xl font-black text-red-600 mt-1">
              {stats.criticalGapsActive}
            </div>
            <p className="text-[11px] text-red-700 font-medium mt-0.5">
              15% of officers in technical deficit
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              iGOT Karmayogi Certs
            </span>
            <div className="text-3xl font-black text-emerald-600 mt-1">
              {stats.completedIgotCertificates.toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
              73% verification compliance
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
            <Award className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Main Grid: Division Chart (Left) & Top Deficiencies Alert (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: Division Readiness Bar Chart */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-700" />
              <h3 className="font-bold text-slate-900 text-base">
                Division Competency Readiness vs. Critical Gaps
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">7 MoSPI Wings</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.divisionReadiness} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="division" tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }} />
                <YAxis domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: 8, fontSize: 11 }} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Bar name="Competency Score (%)" dataKey="score" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                <Bar name="Critical Gaps Count" dataKey="criticalGaps" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span><strong>FOD (Field Operations Division)</strong> shows the largest absolute gap count due to nationwide CAPI deployment.</span>
          </div>
        </div>

        {/* Right Col: Urgent Capacity Building Priorities */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-slate-900 text-base">
                Predictive Capacity Deficiencies
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800">
              Urgent Interventions
            </span>
          </div>

          <div className="space-y-3">
            {stats.topDeficientSkills.map((item, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">{item.skill}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    item.urgency === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.urgency}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Affected Officers:</span>
                  <strong className="text-slate-800 font-bold">{item.affectedOfficers.toLocaleString()}</strong>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-full ${item.urgency === 'Critical' ? 'bg-red-500' : 'bg-amber-500'}`}
                    style={{ width: `${(item.affectedOfficers / 2000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => alert("Batch notification triggered via iGOT Karmayogi API to all 1,420 officers with pending Python modules.")}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Trigger Mandatory iGOT Batch Enrollment</span>
          </button>
        </div>

      </div>

    </div>
  );
}
