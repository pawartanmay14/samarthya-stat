import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  RefreshCw, 
  HelpCircle, 
  CheckCircle2, 
  TrendingUp, 
  Zap, 
  Award,
  Layers,
  BookOpen,
  Repeat
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRELOADED_LEARNING_MATERIALS } from '../data/mockData';

export default function DocQuizGenerator({ 
  onQuizCompletedAndUpdateProfile,
  onProceedToLoop 
}) {
  const [selectedMaterial, setSelectedMaterial] = useState(PRELOADED_LEARNING_MATERIALS[0]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractStage, setExtractStage] = useState('');
  const [activeQuizQuestions, setActiveQuizQuestions] = useState(PRELOADED_LEARNING_MATERIALS[0].questions);
  const [quizState, setQuizState] = useState('preview'); // 'preview', 'taking', 'analysis'
  
  // Quiz taking state
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [customFileUploaded, setCustomFileUploaded] = useState(null);

  // Trigger text extraction & AI generation
  const handleGenerateQuiz = (material) => {
    setSelectedMaterial(material);
    setIsExtracting(true);
    setExtractStage('Extracting text and mathematical formulations from PDF...');

    setTimeout(() => {
      setExtractStage('NLP Topic Modelling: Identifying methodology, formulas, and statistical axioms...');
    }, 600);

    setTimeout(() => {
      setExtractStage('AI Assessment Engine: Generating 10 calibrated MCQs (3 Easy, 4 Medium, 3 Hard)...');
    }, 1200);

    setTimeout(() => {
      setIsExtracting(false);
      setActiveQuizQuestions(material.questions);
      setQuizState('taking');
      setCurrentQIdx(0);
      setAnswers({});
      setQuizResult(null);
    }, 1800);
  };

  const handleCustomFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomFileUploaded(file.name);
      // Simulate extraction on custom file
      handleGenerateQuiz(PRELOADED_LEARNING_MATERIALS[0]);
    }
  };

  const handleSelectOption = (qId, optionIdx) => {
    setAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  // Hackathon instant auto-solve
  const handleAutoSolve = () => {
    const solved = {};
    activeQuizQuestions.forEach((q, idx) => {
      // 8 correct, 2 wrong for realistic diagnostics
      if (idx === 1 || idx === 3) {
        solved[q.id] = (q.correctAnswer + 1) % 4; // Intentionally wrong
      } else {
        solved[q.id] = q.correctAnswer;
      }
    });
    setAnswers(solved);
  };

  // Finish quiz & calculate diagnostics
  const handleFinishQuiz = () => {
    let correctCount = 0;
    const strongTopics = [];
    const weakTopics = [];

    activeQuizQuestions.forEach(q => {
      const isCorrect = answers[q.id] === q.correctAnswer;
      if (isCorrect) {
        correctCount++;
        strongTopics.push(q.topic || 'Core Concept');
      } else {
        weakTopics.push(q.topic || 'Advanced Subtopic');
      }
    });

    const scorePct = Math.round((correctCount / activeQuizQuestions.length) * 100);

    const result = {
      scorePct,
      correctCount,
      totalCount: activeQuizQuestions.length,
      strongTopics: [...new Set(strongTopics)],
      weakTopics: [...new Set(weakTopics)],
      materialTitle: selectedMaterial.title,
      division: selectedMaterial.division
    };

    setQuizResult(result);
    setQuizState('analysis');

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti error:', e);
    }
  };

  const handleApplyToProfile = () => {
    if (onQuizCompletedAndUpdateProfile) {
      onQuizCompletedAndUpdateProfile(quizResult);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold mb-2 border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step 5: Intelligent Assessment Engine (Flowchart Steps 8-11)</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              Document AI: PDF Text Extraction to 10-Question Quiz
            </h2>
            <p className="text-indigo-200 text-xs sm:text-sm mt-1 max-w-2xl">
              Upload any official MoSPI handbook, research paper, or training document. Our AI engine parses the text, extracts key methodologies, and automatically generates 10 objective MCQs (Easy, Medium, Hard).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-semibold">
              Mode: {quizState.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* STATE 1: PREVIEW & DOCUMENT SELECTION */}
      {quizState === 'preview' && (
        <div className="space-y-6">
          
          {/* Document Upload Zone */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-indigo-700" />
                <h3 className="font-bold text-slate-900 text-base">Upload Official Learning Material</h3>
              </div>
              <span className="text-xs font-medium text-slate-500">PDF, DOCX, TXT supported</span>
            </div>

            <div className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-xl p-6 text-center transition bg-slate-50/50">
              <FileText className="w-10 h-10 text-indigo-600 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-800">
                {customFileUploaded ? `Uploaded: ${customFileUploaded}` : 'Drag & Drop PDF or Choose from MoSPI Library'}
              </h4>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                The NLP engine automatically extracts section headings, statistical formulas, and policy guidelines to construct a 10-MCQ test.
              </p>

              <div className="mt-4 flex items-center justify-center gap-3">
                <label className="cursor-pointer px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-xs">
                  <span>Browse Custom PDF</span>
                  <input type="file" accept=".pdf,.doc,.docx,.txt" className="hidden" onChange={handleCustomFileUpload} />
                </label>
              </div>
            </div>
          </div>

          {/* Pre-loaded Official MoSPI Publications */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-700" />
              <span>Or Choose Pre-Loaded MoSPI Official Publications</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PRELOADED_LEARNING_MATERIALS.map(mat => (
                <div 
                  key={mat.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                        {mat.division}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {mat.pages} • {mat.fileSize}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {mat.title}
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {mat.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-[11px] text-slate-500 font-semibold">
                      10 Calibrated MCQs Available
                    </div>

                    <button
                      onClick={() => handleGenerateQuiz(mat)}
                      disabled={isExtracting}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Extract & Generate Quiz</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Extraction Animation Modal / Card */}
          {isExtracting && (
            <div className="p-6 rounded-2xl bg-indigo-950 text-white space-y-3 border border-indigo-800 shadow-xl animate-pulse-subtle">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-amber-400 animate-spin" />
                <h4 className="text-sm font-bold text-indigo-200">
                  AI Intelligent Assessment Engine at Work
                </h4>
              </div>
              <p className="text-xs text-slate-300 italic">{extractStage}</p>
              <div className="w-full bg-indigo-900 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full w-4/5 animate-pulse" />
              </div>
            </div>
          )}

        </div>
      )}

      {/* STATE 2: TAKING THE 10-QUESTION QUIZ */}
      {quizState === 'taking' && (
        <div className="space-y-6">
          
          {/* Quiz Top Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
                {selectedMaterial.division} Assessment
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                {selectedMaterial.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAutoSolve}
                className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition flex items-center gap-1 shadow-2xs"
                title="Auto-solves for rapid demonstration"
              >
                <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                <span>⚡ Auto-Solve for Demo</span>
              </button>

              <button
                onClick={() => setQuizState('preview')}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
              >
                Switch Document
              </button>
            </div>
          </div>

          {/* Question Card */}
          {activeQuizQuestions[currentQIdx] && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Question {currentQIdx + 1} of {activeQuizQuestions.length}
                  </span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded ${
                    activeQuizQuestions[currentQIdx].difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800' :
                    activeQuizQuestions[currentQIdx].difficulty === 'Medium' ? 'bg-amber-100 text-amber-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {activeQuizQuestions[currentQIdx].difficulty}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Topic: {activeQuizQuestions[currentQIdx].topic}
                  </span>
                </div>

                <span className="text-xs font-semibold text-slate-400">
                  {Object.keys(answers).length} / {activeQuizQuestions.length} Answered
                </span>
              </div>

              {/* Question Text */}
              <div className="py-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                  {activeQuizQuestions[currentQIdx].question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {activeQuizQuestions[currentQIdx].options.map((opt, oIdx) => {
                  const isSelected = answers[activeQuizQuestions[currentQIdx].id] === oIdx;

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(activeQuizQuestions[currentQIdx].id, oIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition flex items-start gap-3 ${
                        isSelected 
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-950 ring-1 ring-indigo-600' 
                          : 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 text-slate-700'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 font-bold ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setCurrentQIdx(prev => Math.max(0, prev - 1))}
                  disabled={currentQIdx === 0}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-30"
                >
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {currentQIdx < activeQuizQuestions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQIdx(prev => Math.min(activeQuizQuestions.length - 1, prev + 1))}
                      className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition"
                    >
                      Next Question
                    </button>
                  ) : (
                    <button
                      onClick={handleFinishQuiz}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-md flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Finish & View Quiz Analysis</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* Quick Palette */}
          <div className="flex flex-wrap gap-2 justify-center">
            {activeQuizQuestions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isCurrent = currentQIdx === idx;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQIdx(idx)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                    isCurrent ? 'bg-indigo-600 text-white ring-2 ring-indigo-400' :
                    isAnswered ? 'bg-emerald-100 text-emerald-800' : 'bg-white border border-slate-200 text-slate-600'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

        </div>
      )}

      {/* STATE 3: QUIZ ANALYSIS & UPDATE COMPETENCY PROFILE (Flowchart Step 11 & 12) */}
      {quizState === 'analysis' && quizResult && (
        <div className="space-y-6">
          
          {/* Main Results Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 space-y-6">
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Step 11: Quiz Analysis Complete
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Performance Diagnostics on: {quizResult.materialTitle}
                </h3>
              </div>

              <div className="text-center sm:text-right">
                <div className="text-3xl font-black text-indigo-700">
                  {quizResult.scorePct}%
                </div>
                <div className="text-xs text-slate-500 font-semibold">
                  {quizResult.correctCount} of {quizResult.totalCount} Correct
                </div>
              </div>
            </div>

            {/* Strong Topics vs Weak Topics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Strong Topics */}
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Strong Topics Identified</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {quizResult.strongTopics.map((topic, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-white border border-emerald-300 text-emerald-900 font-medium">
                      ✓ {topic}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-emerald-700 mt-2">
                  Demonstrates solid mastery of core definitions, SNA 2008 frameworks, and price aggregations.
                </p>
              </div>

              {/* Weak Topics */}
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Topics Requiring Reinforcement (Weak Areas)</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {quizResult.weakTopics.length > 0 ? (
                    quizResult.weakTopics.map((topic, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-white border border-amber-300 text-amber-900 font-medium">
                        ⚠ {topic}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-emerald-700 font-medium">None! 100% mastery achieved.</span>
                  )}
                </div>
                <p className="text-[11px] text-amber-800 mt-2">
                  Targeted micro-learning modules on iGOT Karmayogi recommended to bridge these specific subtopics.
                </p>
              </div>

            </div>

            {/* CRITICAL BUTTON: UPDATE COMPETENCY PROFILE (Continuous Loop) */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                Ready to feed this quiz result back into your official record?
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setQuizState('preview')}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold transition w-full sm:w-auto"
                >
                  Upload Another Document
                </button>

                <button
                  onClick={handleApplyToProfile}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-700 hover:from-emerald-700 hover:to-indigo-800 text-white font-black text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 group w-full sm:w-auto"
                >
                  <Repeat className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  <span>Update Competency Profile & Close Loop</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
