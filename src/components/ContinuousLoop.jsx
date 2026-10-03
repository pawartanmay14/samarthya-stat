import React from 'react';
import { 
  Repeat, 
  TrendingUp, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  ArrowRight, 
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContinuousLoop({ 
  officerProfile, 
  competencyScores, 
  lastQuizDelta,
  onRestartLoop, 
  onViewRecommendations 
}) {
  const compName = lastQuizDelta?.competency || 'National Accounts & GVA Deflators';
  const beforeScore = lastQuizDelta?.before || 60;
  const afterScore = lastQuizDelta?.after || (competencyScores.stat_accounts || 88);
  const diffScore = lastQuizDelta?.diff !== undefined ? lastQuizDelta.diff : (afterScore - beforeScore);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-semibold mb-1.5 border border-emerald-400/30">
            <Repeat className="w-3.5 h-3.5" />
            <span>Continuous Learning Loop Active</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Competency Recalibration Complete!
          </h2>
          <p className="text-emerald-100 text-xs mt-1">
            Your performance on the Document AI quiz has dynamically upgraded your official MoSPI profile.
          </p>
        </div>

        <button
          type="button"
          onClick={triggerConfetti}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition flex items-center gap-1.5 shadow-md shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Celebrate Progress</span>
        </button>
      </div>

      {/* Dynamic Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            {compName}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-600">{afterScore}%</span>
            <span className="text-xs text-slate-400 line-through">{beforeScore}%</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              {diffScore >= 0 ? `+${diffScore}%` : `${diffScore}%`}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Dynamic score upgraded in real-time.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Status Transition
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 line-through">
              Moderate Gap
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
              🟢 Proficient
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Official MoSPI prerequisite met.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            iGOT Karmayogi Sync
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-bold text-slate-800">Credits Logged</span>
          </div>
          <p className="text-xs text-slate-500">
            Recorded under Officer ID {officerProfile?.employeeId || 'ISS-2018-9412'}.
          </p>
        </div>

      </div>

      {/* Official Certificate Card */}
      <div className="bg-white rounded-2xl border-2 border-indigo-100 p-6 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-900 text-amber-400 flex items-center justify-center font-bold shadow-xs">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-widest font-black text-indigo-700">
                Government of India • Ministry of Statistics & Programme Implementation
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Continuous Competency Advancement Certificate
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert(`Certificate downloaded for ${officerProfile?.name || 'Officer'} in PDF format.`)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Certificate</span>
          </button>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed">
          This certifies that <strong className="text-slate-900">{officerProfile?.name || 'Official'}</strong>, 
          holding designation <strong className="text-indigo-900">{officerProfile?.designation || 'SSO'}</strong> in the 
          <strong className="text-indigo-900"> {officerProfile?.division || 'NAD'}</strong>, has successfully completed the adaptive 
          assessment for <em>{compName}</em>, raising verified competency to <strong className="text-emerald-700">{afterScore}%</strong>.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 gap-2">
          <span>Verification Code: <code className="font-mono text-indigo-700 font-bold">MOSPI-IGOT-2026-89A4B</code></span>
          <span>Issued by: <strong>DIID & NSSTA Joint Board</strong></span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onRestartLoop}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold transition flex items-center justify-center gap-1.5"
        >
          <Repeat className="w-4 h-4" />
          <span>Upload Another Learning Document</span>
        </button>

        <button
          type="button"
          onClick={onViewRecommendations}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
        >
          <span>View Advanced iGOT Pathways</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
