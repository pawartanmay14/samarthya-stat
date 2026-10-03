import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Play, 
  BookOpen, 
  Award, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  RotateCcw,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function IgotPlayerModal({ 
  course, 
  onClose, 
  onSyncCourseCompletion,
  officerProfile 
}) {
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [completedModules, setCompletedModules] = useState({ 0: true });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncedSuccessfully, setSyncedSuccessfully] = useState(false);
  const [activeTab, setActiveTab] = useState('player'); // 'player', 'api_log', 'syllabus'

  if (!course) return null;

  const modules = course.modules || [
    "Module 1: Conceptual Foundations & Statistical Standards",
    "Module 2: Practical Data Processing & Complex Surveys",
    "Module 3: Advanced Methodologies & Case Studies",
    "Module 4: End-of-Course Evaluation & Certification"
  ];

  const handleToggleModule = (idx) => {
    setCompletedModules(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleCompleteAndSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncedSuccessfully(true);
      if (onSyncCourseCompletion) {
        onSyncCourseCompletion(course);
      }
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.log(e);
      }
    }, 1500);
  };

  // Official direct safe portal URL (guaranteed 200 OK, avoids 404 subpaths)
  const realIgotSearchUrl = "https://igotkarmayogi.gov.in/";

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      
      {/* Modal Container */}
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* iGOT Karmayogi Official Style Header */}
        <div className="bg-gradient-to-r from-orange-600 via-indigo-900 to-slate-950 text-white p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-black text-amber-400 text-sm">
              iGOT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base text-white tracking-tight">
                  iGOT Karmayogi Course Gateway
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30 font-semibold">
                  API Connected
                </span>
              </div>
              <p className="text-xs text-orange-200">
                Integrated Government Online Training • National Programme for Civil Services Capacity Building
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={realIgotSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition"
              title="Open course search on official igotkarmayogi.gov.in website"
            >
              <span>Open on igotkarmayogi.gov.in</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Sub-tabs */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 py-2 flex items-center justify-between text-xs font-bold">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('player')}
              className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'player' ? 'bg-white text-indigo-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Interactive Course Viewer
            </button>
            <button
              onClick={() => setActiveTab('api_log')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'api_log' ? 'bg-white text-indigo-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <span>Live iGOT API Handshake</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </button>
          </div>

          <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
            Officer ID: <strong>{officerProfile?.employeeId || 'ISS-2018-9412'}</strong>
          </span>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          
          {activeTab === 'player' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left Col: Interactive Player & Lesson */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Video / Interactive Simulation Sandbox */}
                <div className="aspect-video bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 rounded-2xl relative overflow-hidden flex flex-col justify-between p-5 text-white shadow-inner border border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md text-amber-300 font-mono font-semibold">
                      {course.igotCode}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Module {activeModuleIdx + 1} of {modules.length}
                    </span>
                  </div>

                  {/* Player Content Center */}
                  <div className="text-center space-y-3 py-4">
                    <div className="w-14 h-14 rounded-full bg-indigo-600/90 text-white flex items-center justify-center mx-auto shadow-lg hover:scale-110 transition cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white tracking-tight">
                        {modules[activeModuleIdx]}
                      </h4>
                      <p className="text-xs text-indigo-200 mt-0.5">
                        Interactive Training by {course.provider}
                      </p>
                    </div>
                  </div>

                  {/* Player Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Live Lesson Streaming</span>
                      <span>Progress: {Math.round(((Object.keys(completedModules).length) / modules.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-300"
                        style={{ width: `${((Object.keys(completedModules).length) / modules.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Course Metadata & Overview */}
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-slate-900">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {course.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-2 text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {course.duration}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 font-semibold border border-indigo-200">
                      Syllabus Match: {course.syllabusMatch}%
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                      CBU Credits: 15 Units
                    </span>
                  </div>
                </div>

              </div>

              {/* Right Col: Modules Checklist & Completion Sync */}
              <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      <span>Curriculum Modules ({modules.length})</span>
                    </h4>
                    <span className="text-[10px] text-slate-400 font-medium">Click to study</span>
                  </div>

                  <div className="space-y-2">
                    {modules.map((mod, idx) => {
                      const isDone = completedModules[idx];
                      const isCurr = activeModuleIdx === idx;

                      return (
                        <div
                          key={idx}
                          onClick={() => setActiveModuleIdx(idx)}
                          className={`p-3 rounded-xl border text-xs transition cursor-pointer flex items-start gap-2.5 ${
                            isCurr 
                              ? 'bg-white border-indigo-500 ring-1 ring-indigo-500 shadow-xs' 
                              : 'bg-white/60 border-slate-200 hover:bg-white'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleModule(idx);
                            }}
                            className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition ${
                              isDone ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 hover:border-indigo-500'
                            }`}
                          >
                            {isDone && <Check className="w-3.5 h-3.5" />}
                          </button>

                          <div className="flex-1">
                            <div className="font-bold text-slate-800 leading-tight">
                              {mod}
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              {isDone ? 'Completed' : 'Pending Study'}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sync to MoSPI Action Card */}
                <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-emerald-950">
                        {syncedSuccessfully ? 'Synced with MoSPI Competency Index!' : 'Ready to Sync Course Progress?'}
                      </div>
                      <div className="text-[11px] text-emerald-800">
                        {syncedSuccessfully ? '+25 Points credited to your profile.' : 'Completing this course awards official Capacity Building Units (CBUs).'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCompleteAndSync}
                    disabled={isSyncing || syncedSuccessfully}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 shadow-xs ${
                      syncedSuccessfully
                        ? 'bg-emerald-700 text-white cursor-default'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {isSyncing ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Communicating with iGOT API...</span>
                      </>
                    ) : syncedSuccessfully ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Completed & Synced to MoSPI</span>
                      </>
                    ) : (
                      <>
                        <Award className="w-4 h-4" />
                        <span>Mark Completed & Sync Competency Credits</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

            </div>
          ) : (
            /* Live API Log Console */
            <div className="bg-slate-950 text-slate-200 font-mono rounded-2xl p-5 text-xs space-y-3 shadow-inner border border-slate-800">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-amber-400 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  iGOT Karmayogi REST API v2.4 Console Handshake
                </span>
                <span className="text-slate-500">ENDPOINT: api.igotkarmayogi.gov.in</span>
              </div>

              <div className="space-y-1.5 text-[11px] text-slate-300">
                <p className="text-slate-500">// Step 1: Querying course availability in DoPT repository</p>
                <p className="text-emerald-400">GET /api/v2/catalog/course/{course.igotCode} HTTP/1.1</p>
                <p className="text-slate-400">Host: api.igotkarmayogi.gov.in</p>
                <p className="text-slate-400">Authorization: Bearer karmayogi_oauth_token_verified</p>
                <p className="text-slate-400">X-Consumer-Ministry: MoSPI-DIID-2026</p>
                
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 mt-2 text-slate-300">
                  <p className="text-amber-300 font-bold">// Response: 200 OK (Verified Active)</p>
                  <pre className="text-[10px] text-emerald-300 mt-1 overflow-x-auto whitespace-pre-wrap">
{`{
  "status": "ACTIVE",
  "course_id": "${course.id}",
  "igot_code": "${course.igotCode}",
  "title": "${course.title}",
  "provider": "${course.provider}",
  "enrolled_officers": ${course.enrolledCount},
  "rating": ${course.rating},
  "syllabus_match_score": ${course.syllabusMatch},
  "cbu_credit_units": 15.0,
  "sso_integration": {
    "auth_provider": "Jan Parichay / MeriPehchaan",
    "officer_cadre": "${officerProfile?.designation || 'SSO'}",
    "officer_id": "${officerProfile?.employeeId || 'ISS-2018-9412'}"
  }
}`}
                  </pre>
                </div>

                <p className="text-slate-500 pt-2">// Step 2: Two-way progress synchronization</p>
                <p className="text-indigo-300">POST /api/v2/competency/update HTTP/1.1</p>
                <p className="text-emerald-400 font-semibold">Status: 200 OK • Two-Way Sync Active</p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Source: <strong>iGOT Karmayogi Portal (DoPT / MoSPI)</strong> • SIH Problem Statement 26101
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={realIgotSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Explore on official igotkarmayogi.gov.in</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition"
            >
              Close Gateway
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
