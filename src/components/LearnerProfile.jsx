import React, { useState } from 'react';
import { 
  User, 
  Upload, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Briefcase, 
  GraduationCap, 
  Building, 
  Layers, 
  ArrowRight,
  RefreshCw,
  Award,
  Zap
} from 'lucide-react';
import { MOSPI_DIVISIONS, DESIGNATIONS, SAMPLE_RESUMES } from '../data/mockData';

export default function LearnerProfile({ 
  profile, 
  setProfile, 
  onProceedToAssessment, 
  onApplyResumeSkills 
}) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [analyzedData, setAnalyzedData] = useState(null);
  const [activeTab, setActiveTab] = useState('resume_ai'); // 'resume_ai' or 'manual'

  // Run AI Resume Analysis simulation
  const handleAnalyzeResume = (sample = null) => {
    setIsAnalyzing(true);
    setAnalysisProgress(15);
    setAnalysisStage('Extracting document entities and statistical qualifications...');

    const textToAnalyze = sample ? sample.summaryText : (resumeText || SAMPLE_RESUMES[0].summaryText);

    setTimeout(() => {
      setAnalysisProgress(45);
      setAnalysisStage('Matching tools: Python, R, Stata, CAPI, Survey Sampling against MoSPI Competency Framework...');
    }, 600);

    setTimeout(() => {
      setAnalysisProgress(80);
      setAnalysisStage('Classifying official statistical domains (SNA 2008, PLFS, CPI, DPDP 2023)...');
    }, 1200);

    setTimeout(() => {
      setAnalysisProgress(100);
      setIsAnalyzing(false);

      const targetSample = sample || (textToAnalyze.includes('FOD') || textToAnalyze.includes('Labour') ? SAMPLE_RESUMES[1] : SAMPLE_RESUMES[0]);

      setAnalyzedData(targetSample);

      // Auto update profile
      setProfile(prev => ({
        ...prev,
        name: targetSample.name,
        designation: targetSample.title.includes('SSO') ? 'SSO' : 'JSO',
        division: targetSample.division,
        experience: targetSample.experience,
        qualifications: targetSample.qualifications,
        skills: targetSample.extractedSkills,
        preliminaryGaps: targetSample.detectedGaps
      }));

      if (onApplyResumeSkills) {
        onApplyResumeSkills(targetSample);
      }
    }, 1800);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold mb-2 border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step 1: Automated Competency Profiling</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              Official Learner Profile & AI Resume Agent
            </h2>
            <p className="text-indigo-200 text-sm mt-1 max-w-2xl">
              Our AI engine extracts your statistical background, survey experience, and technical tools (Python, R, Stata, SQL) directly from your CV or official posting to build your baseline competency map.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAnalyzeResume(SAMPLE_RESUMES[0])}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Try SSO Resume (NAD)</span>
            </button>
            <button
              onClick={() => handleAnalyzeResume(SAMPLE_RESUMES[1])}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5 border border-slate-700"
            >
              <span>Try JSO Resume (FOD)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: AI Resume Agent (Left) & Profile Form (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: AI Resume Analyzer Agent */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">AI Resume & Profile Analyzer</h3>
                  <p className="text-xs text-slate-500">Upload your CV / Government Service Book excerpt</p>
                </div>
              </div>

              <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('resume_ai')}
                  className={`px-3 py-1 rounded-md transition ${activeTab === 'resume_ai' ? 'bg-white text-indigo-900 shadow-xs' : 'text-slate-500'}`}
                >
                  Upload & Scan
                </button>
                <button
                  onClick={() => setActiveTab('paste')}
                  className={`px-3 py-1 rounded-md transition ${activeTab === 'paste' ? 'bg-white text-indigo-900 shadow-xs' : 'text-slate-500'}`}
                >
                  Quick Paste Text
                </button>
              </div>
            </div>

            {/* Upload Zone */}
            {activeTab === 'resume_ai' ? (
              <div className="border-2 border-dashed border-indigo-200 rounded-xl p-6 text-center hover:border-indigo-400 transition bg-indigo-50/40">
                <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">
                  Drag & Drop Resume (PDF, DOCX, TXT)
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Automatically extracts statistical postings, survey experience (NSS/ASI/CPI), programming skills, and qualifications.
                </p>

                <div className="mt-4 flex items-center justify-center gap-3">
                  <label className="cursor-pointer px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition shadow-xs">
                    <span>Browse Device Files</span>
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx,.txt" 
                      className="hidden" 
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleAnalyzeResume();
                        }
                      }}
                    />
                  </label>
                  <button
                    onClick={() => handleAnalyzeResume(SAMPLE_RESUMES[0])}
                    className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition"
                  >
                    Simulate Upload
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume summary or professional experience details here..."
                  rows={6}
                  className="w-full text-xs p-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <button
                  onClick={() => handleAnalyzeResume()}
                  disabled={isAnalyzing}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Parse Text with MoSPI AI</span>
                </button>
              </div>
            )}

            {/* Analysis Progress Scanner */}
            {isAnalyzing && (
              <div className="mt-4 p-4 rounded-xl bg-indigo-950 text-white space-y-2 border border-indigo-800 animate-pulse-subtle">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-indigo-300 flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                    AI Agent Processing...
                  </span>
                  <span className="font-mono text-amber-400 font-bold">{analysisProgress}%</span>
                </div>
                <div className="w-full bg-indigo-900 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-indigo-400 to-amber-400 h-full transition-all duration-300"
                    style={{ width: `${analysisProgress}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-300 italic">{analysisStage}</p>
              </div>
            )}

            {/* Extracted Entity Preview */}
            {analyzedData && !isAnalyzing && (
              <div className="mt-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-emerald-900">
                      AI Analysis Completed • Profile Synced
                    </span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-200 text-emerald-800 font-semibold">
                    Score Calibrated
                  </span>
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-700 mb-1.5">
                    Verified Competencies Extracted from Resume:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {analyzedData.extractedSkills.map((skill, idx) => (
                      <span 
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-md bg-white border border-emerald-300 text-emerald-900 font-medium shadow-2xs"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-700 mb-1.5">
                    Anticipated Skill Gaps Flagged by AI Agent:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {analyzedData.detectedGaps.map((gap, idx) => (
                      <span 
                        key={idx}
                        className={`text-xs px-2.5 py-1 rounded-md font-medium border ${
                          gap.includes('Critical') 
                            ? 'bg-red-50 border-red-200 text-red-800' 
                            : 'bg-amber-50 border-amber-200 text-amber-800'
                        }`}
                      >
                        ⚠ {gap}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Guidelines Callout */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3 text-xs text-slate-600">
            <AlertCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800">Why Resume Parsing Matters in MoSPI:</strong>
              <p className="mt-0.5">
                Officers rotate across National Accounts (NAD), Field Operations (FOD), and Price Statistics (PSD). The AI agent assesses historical domain expertise so the diagnostic assessment focuses on emerging areas like AI, Big Data, and DPDP Act 2023.
              </p>
            </div>
          </div>
        </div>

        {/* Right Col: Official Profile Card */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-700" />
                <h3 className="font-bold text-slate-900 text-base">Official Identity</h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-400 font-mono">
                ID: {profile.employeeId}
              </span>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Official Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50/50"
              />
            </div>

            {/* Designation */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Cadre & Designation
              </label>
              <select
                value={profile.designation}
                onChange={(e) => setProfile({ ...profile, designation: e.target.value })}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
              >
                {DESIGNATIONS.map((des) => (
                  <option key={des.id} value={des.id}>
                    {des.title} ({des.grade})
                  </option>
                ))}
              </select>
            </div>

            {/* MoSPI Division */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Current Division / Wing
              </label>
              <select
                value={profile.division}
                onChange={(e) => setProfile({ ...profile, division: e.target.value })}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
              >
                {MOSPI_DIVISIONS.map((div) => (
                  <option key={div.id} value={div.id}>
                    {div.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Experience */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Experience
                </label>
                <input
                  type="text"
                  value={profile.experience}
                  onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Education */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Qualification
                </label>
                <input
                  type="text"
                  value={profile.qualifications}
                  onChange={(e) => setProfile({ ...profile, qualifications: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Next Action Button */}
            <div className="pt-3">
              <button
                onClick={onProceedToAssessment}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold text-xs tracking-wide shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Step 2: Diagnostic Assessment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[10px] text-center text-slate-400 mt-2">
                10-15 MCQs based on your role in {profile.division}
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
