import React from 'react';
import { 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Layers, 
  BookOpen
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

export default function SkillGapAnalysis({ 
  competencyScores, 
  onProceedToRecommendations, 
  officerProfile 
}) {
  // Purely dynamic radar data based on actual competencyScores!
  const radarData = [
    { subject: 'Survey Sampling', user: competencyScores.stat_sampling || 40, target: 85, fullMark: 100 },
    { subject: 'National Accounts', user: competencyScores.stat_accounts || 45, target: 80, fullMark: 100 },
    { subject: 'Price Stats (CPI)', user: competencyScores.stat_price || 50, target: 85, fullMark: 100 },
    { subject: 'SDG Indicators', user: competencyScores.stat_sdg || 45, target: 75, fullMark: 100 },
    { subject: 'Python Analytics', user: competencyScores.tech_python || 30, target: 80, fullMark: 100 },
    { subject: 'R Biostatistics', user: competencyScores.tech_r || 45, target: 75, fullMark: 100 },
    { subject: 'AI & Machine Learning', user: competencyScores.tech_ai_ml || 25, target: 70, fullMark: 100 },
    { subject: 'DPDP Act & Cloud', user: competencyScores.gov_dpdp || 50, target: 85, fullMark: 100 }
  ];

  // Dynamic gap classification
  const getGapStatus = (userScore, targetScore) => {
    if (userScore < 50) {
      return { label: 'Critical Gap', color: 'red', badge: 'bg-red-50 text-red-700 border-red-200', icon: AlertTriangle, dot: 'bg-red-500' };
    } else if (userScore < 75) {
      return { label: 'Moderate Gap', color: 'amber', badge: 'bg-amber-50 text-amber-700 border-amber-200', icon: Clock, dot: 'bg-amber-500' };
    } else {
      return { label: 'Proficient', color: 'emerald', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle, dot: 'bg-emerald-500' };
    }
  };

  let criticalCount = 0;
  let moderateCount = 0;
  let proficientCount = 0;

  radarData.forEach(item => {
    const status = getGapStatus(item.user, item.target);
    if (status.label === 'Critical Gap') criticalCount++;
    else if (status.label === 'Moderate Gap') moderateCount++;
    else proficientCount++;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-5 sm:p-6 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-semibold mb-1.5 border border-indigo-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Step 3: Official Skill Gap Intelligence</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            AI Competency & Skill Gap Matrix
          </h2>
          <p className="text-indigo-200 text-xs mt-1">
            Real-time evaluation based on your latest diagnostic assessment answers.
          </p>
        </div>

        <button
          type="button"
          onClick={onProceedToRecommendations}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 shrink-0"
        >
          <span>Proceed to Step 4: iGOT Recommendations</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3 Metric Cards: Critical, Moderate, Proficient */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        
        <div className="bg-white rounded-2xl border border-red-200 p-4 shadow-xs flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-red-700 uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>Critical Gaps</span>
            </div>
            <div className="text-3xl font-black text-slate-900 mt-1">{criticalCount}</div>
            <p className="text-[11px] text-slate-500">Immediate priority upskilling</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-lg">
            🔴
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-amber-200 p-4 shadow-xs flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Moderate Gaps</span>
            </div>
            <div className="text-3xl font-black text-slate-900 mt-1">{moderateCount}</div>
            <p className="text-[11px] text-slate-500">Targeted reinforcement needed</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">
            🟡
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-emerald-200 p-4 shadow-xs flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Proficient Skills</span>
            </div>
            <div className="text-3xl font-black text-slate-900 mt-1">{proficientCount}</div>
            <p className="text-[11px] text-slate-500">Meets official MoSPI standards</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
            🟢
          </div>
        </div>

      </div>

      {/* Main Content: Radar (Left) & Gap Score Delta (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Radar Chart */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-700" />
                <h3 className="font-bold text-slate-900 text-sm">Competency Radar vs. Benchmark</h3>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-800">
                8 Key Axes
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1.5">
              Visual delta between Officer Level (Indigo) and MoSPI Target (Amber).
            </p>

            <div className="h-72 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#334155', fontSize: 11, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Radar name="Officer Level" dataKey="user" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.4} />
                  <Radar name="MoSPI Target Standard" dataKey="target" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.15} strokeDasharray="3 3" />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 6 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: 8, fontSize: 11 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Competency Gap List */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-700" />
              <h3 className="font-bold text-slate-900 text-sm">Competency Score & Gap Delta</h3>
            </div>
            <span className="text-[11px] text-slate-400">Ranked by Urgency</span>
          </div>

          <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
            {radarData
              .sort((a, b) => a.user - b.user)
              .map((item, idx) => {
                const gap = item.user - item.target;
                const status = getGapStatus(item.user, item.target);
                const Icon = status.icon;

                return (
                  <div 
                    key={idx}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">{item.subject}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${status.badge} flex items-center gap-1`}>
                        <Icon className="w-3 h-3" />
                        <span>{status.label}</span>
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-500">
                          Current: <strong className="text-slate-800">{item.user}%</strong> / Target: {item.target}%
                        </span>
                        <span className={`font-bold ${gap < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                          {gap < 0 ? `${gap}% Deficit` : `+${gap}% Surplus`}
                        </span>
                      </div>

                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            status.color === 'red' ? 'bg-red-500' :
                            status.color === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${item.user}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onProceedToRecommendations}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
            >
              <BookOpen className="w-4 h-4" />
              <span>Map Gaps to iGOT Karmayogi Curricula →</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
