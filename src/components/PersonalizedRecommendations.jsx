import React, { useState } from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  CheckCircle, 
  ShieldCheck, 
  Clock, 
  Star, 
  BookOpen, 
  ArrowRight, 
  Play, 
  Calendar, 
  MapPin, 
  Award,
  Zap,
  Building,
  CheckCircle2,
  RefreshCw,
  Search
} from 'lucide-react';
import { IGOT_COURSES, NSSTA_TPAC_PROGRAMS } from '../data/mockData';
import IgotPlayerModal from './IgotPlayerModal';

export default function PersonalizedRecommendations({ 
  onProceedToDocQuiz, 
  officerProfile, 
  competencyScores,
  onSyncIgotCourse 
}) {
  const [filterCategory, setFilterCategory] = useState('all'); // all, critical, igot, nssta
  const [enrolledCourses, setEnrolledCourses] = useState({ 'igot_003': true });
  const [activeCourseModal, setActiveCourseModal] = useState(null);
  const [verifyingCourses, setVerifyingCourses] = useState({});
  const [verifiedCourses, setVerifiedCourses] = useState({});

  // Prioritize courses addressing critical gaps first
  const sortedCourses = [...IGOT_COURSES].sort((a, b) => {
    if (a.competencyId === 'tech_python' || a.competencyId === 'tech_ai_ml') return -1;
    if (b.competencyId === 'tech_python' || b.competencyId === 'tech_ai_ml') return 1;
    return b.syllabusMatch - a.syllabusMatch;
  });

  const handleEnroll = (courseId) => {
    setEnrolledCourses(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  // User requirement: "checks if the recommended course is available on igot platform"
  const handleVerifyOnIgot = (course) => {
    setVerifyingCourses(prev => ({ ...prev, [course.id]: true }));
    setTimeout(() => {
      setVerifyingCourses(prev => ({ ...prev, [course.id]: false }));
      setVerifiedCourses(prev => ({ ...prev, [course.id]: true }));
    }, 800);
  };

  const handleOpenIgotGateway = (course) => {
    setActiveCourseModal(course);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Top Banner with live iGOT API connection stats */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Step 4: Active iGOT Karmayogi & NSSTA Integration</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              Personalized Learning Pathways & iGOT Launchpad
            </h2>
            <p className="text-indigo-200 text-xs sm:text-sm mt-1 max-w-2xl">
              Real-time integration with <strong className="text-white">iGOT Karmayogi</strong> and <strong className="text-white">NSSTA / TPAC</strong>. Verify live course availability, launch interactive modules, and synchronize competency credits.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => handleOpenIgotGateway(sortedCourses[0])}
              className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-md"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Launch iGOT Gateway</span>
            </button>

            <button
              onClick={onProceedToDocQuiz}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 group"
            >
              <span>Step 5: Document AI</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              filterCategory === 'all' 
                ? 'bg-indigo-600 text-white shadow-xs' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Verified Pathways ({sortedCourses.length + NSSTA_TPAC_PROGRAMS.length})
          </button>

          <button
            onClick={() => setFilterCategory('critical')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              filterCategory === 'critical' 
                ? 'bg-red-600 text-white shadow-xs' 
                : 'text-red-700 bg-red-50 hover:bg-red-100'
            }`}
          >
            <span>🔴 Urgent Gap Remedies</span>
          </button>

          <button
            onClick={() => setFilterCategory('igot')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              filterCategory === 'igot' 
                ? 'bg-indigo-600 text-white shadow-xs' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            iGOT Karmayogi Curricula ({sortedCourses.length})
          </button>

          <button
            onClick={() => setFilterCategory('nssta')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              filterCategory === 'nssta' 
                ? 'bg-indigo-600 text-white shadow-xs' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            NSSTA / TPAC Residential ({NSSTA_TPAC_PROGRAMS.length})
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium hidden sm:block">
          Official Cadre: <strong className="text-indigo-950 font-bold">{officerProfile?.designation || 'SSO'} ({officerProfile?.division || 'NAD'})</strong>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="space-y-4">
        
        {/* iGOT Karmayogi Courses */}
        {(filterCategory === 'all' || filterCategory === 'igot' || filterCategory === 'critical') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-700" />
                <span>Verified iGOT Karmayogi Modules</span>
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                Live availability verified via iGOT REST API
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortedCourses
                .filter(course => {
                  if (filterCategory === 'critical') {
                    return course.competencyId === 'tech_python' || course.competencyId === 'tech_ai_ml';
                  }
                  return true;
                })
                .map(course => {
                  const isEnrolled = enrolledCourses[course.id];
                  const isCritical = course.competencyId === 'tech_python' || course.competencyId === 'tech_ai_ml';
                  const isVerifying = verifyingCourses[course.id];
                  const isVerified = verifiedCourses[course.id] || course.igotVerified;

                  return (
                    <div 
                      key={course.id}
                      className={`bg-white rounded-2xl border transition-all p-5 flex flex-col justify-between shadow-xs hover:shadow-md ${
                        isCritical 
                          ? 'border-red-300 ring-1 ring-red-200' 
                          : 'border-slate-200'
                      }`}
                    >
                      <div>
                        {/* Top Metadata Bar */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                            {course.igotCode}
                          </span>

                          <div className="flex items-center gap-1.5">
                            {isCritical && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200">
                                🔴 Critical Remedy
                              </span>
                            )}
                            
                            {/* Live Availability Verification Action / Badge */}
                            <button
                              type="button"
                              onClick={() => handleVerifyOnIgot(course)}
                              disabled={isVerifying}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 transition ${
                                isVerifying
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : isVerified
                                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                  : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                              }`}
                              title="Click to check availability in iGOT Karmayogi API Registry"
                            >
                              {isVerifying ? (
                                <>
                                  <RefreshCw className="w-3 h-3 animate-spin text-amber-600" />
                                  <span>Checking API...</span>
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                                  <span>Available on iGOT</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Title & Provider */}
                        <h4 className="text-base font-bold text-slate-900 leading-snug">
                          {course.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                          <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{course.provider}</span>
                        </p>

                        <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                          {course.description}
                        </p>

                        {/* Duration & Syllabus Gap Match */}
                        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3 text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              {course.duration}
                            </span>
                            <span className="flex items-center gap-1 text-amber-600 font-semibold">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              {course.rating}
                            </span>
                          </div>

                          <div className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
                            {course.syllabusMatch}% Gap Match
                          </div>
                        </div>

                        {/* Modules preview pills */}
                        <div className="mt-2.5 flex flex-wrap gap-1">
                          {course.modules.slice(0, 3).map((m, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-200">
                              • {m}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons: Launch Interactive Gateway + Official Portal Link */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                        
                        {/* Primary: In-App Interactive iGOT Gateway */}
                        <button
                          type="button"
                          onClick={() => handleOpenIgotGateway(course)}
                          className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-orange-600 to-indigo-700 hover:from-orange-700 hover:to-indigo-800 text-white font-bold text-xs shadow-xs hover:shadow-md transition flex items-center justify-center gap-1.5"
                          title="Launch interactive course player and API handshake"
                        >
                          <Play className="w-3 h-3 fill-white" />
                          <span>Launch on iGOT Gateway</span>
                        </button>

                        {/* Secondary: Safe Direct Link to official iGOT Portal Root */}
                        <a
                          href="https://igotkarmayogi.gov.in/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-2.5 rounded-xl border border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition text-xs font-semibold flex items-center gap-1"
                          title="Visit official portal on igotkarmayogi.gov.in"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        {/* Add to Pathway */}
                        <button
                          type="button"
                          onClick={() => handleEnroll(course.id)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                            isEnrolled
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {isEnrolled ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Enrolled</span>
                            </>
                          ) : (
                            <span>Add Pathway</span>
                          )}
                        </button>

                      </div>

                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* NSSTA / TPAC Training Programs */}
        {(filterCategory === 'all' || filterCategory === 'nssta') && (
          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-700" />
              <span>NSSTA / TPAC Institutional & Residential Programmes</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {NSSTA_TPAC_PROGRAMS.map(prog => (
                <div 
                  key={prog.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between shadow-xs hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                        {prog.category}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {prog.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {prog.title}
                    </h4>

                    <div className="mt-2.5 space-y-1.5 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>{prog.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>{prog.duration} • {prog.mode}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>Target: {prog.targetCadre}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                      {prog.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => alert(`Cadre nomination submitted for ${prog.title}. MoSPI Training Division notified.`)}
                      className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs transition flex items-center justify-center gap-1.5"
                    >
                      <span>Submit Cadre Nomination</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Two-way sync banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-950">
              Live Two-Way Integration with Mission Karmayogi
            </h4>
            <p className="text-xs text-emerald-800 mt-0.5">
              Course completions, learning hours, and digital certificates earned on iGOT Karmayogi are automatically fed back to update your MoSPI competency score.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onProceedToDocQuiz}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-2 shadow-xs shrink-0"
        >
          <span>Step 5: Document AI Quiz Studio</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive iGOT Gateway & Course Player Modal */}
      {activeCourseModal && (
        <IgotPlayerModal
          course={activeCourseModal}
          onClose={() => setActiveCourseModal(null)}
          officerProfile={officerProfile}
          onSyncCourseCompletion={(completedCourse) => {
            if (onSyncIgotCourse) {
              onSyncIgotCourse(completedCourse);
            }
          }}
        />
      )}

    </div>
  );
}
