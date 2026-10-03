import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  Flag, 
  Zap, 
  Sparkles,
  CheckCircle,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_DIAGNOSTIC_QUESTIONS } from '../data/mockData';

export default function CompetencyAssessment({ 
  onAssessmentCompleted, 
  userAnswers, 
  setUserAnswers, 
  officerRole = 'SSO', 
  division = 'NAD' 
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flagged, setFlagged] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreSummary, setScoreSummary] = useState(null);

  const questions = INITIAL_DIAGNOSTIC_QUESTIONS;
  const currentQ = questions[currentIdx];

  const handleSelectAnswer = (optionIdx) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionIdx
    }));
  };

  const handleToggleFlag = () => {
    setFlagged(prev => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  // Demo auto-fill modes so the user can easily see dynamic score changes!
  const handleAutoFill = (mode = 'typical_gaps') => {
    const auto = {};
    questions.forEach((q) => {
      if (mode === 'all_correct') {
        auto[q.id] = q.correctAnswer;
      } else if (mode === 'all_wrong') {
        auto[q.id] = (q.correctAnswer + 1) % 4;
      } else {
        // 'typical_gaps': correct in official statistics, wrong in python & AI/ML
        if (q.competencyId === 'tech_python' || q.competencyId === 'tech_ai_ml') {
          auto[q.id] = (q.correctAnswer + 1) % 4; // Wrong answer!
        } else {
          auto[q.id] = q.correctAnswer; // Correct answer!
        }
      }
    });
    setUserAnswers(auto);
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setScoreSummary(null);
    setCurrentIdx(0);
  };

  const handleSubmit = () => {
    let correctCount = 0;
    const computedScores = {};

    questions.forEach(q => {
      const isCorrect = userAnswers[q.id] === q.correctAnswer;
      if (isCorrect) {
        correctCount++;
        // If correct, award high competency level (85% to 92%)
        computedScores[q.competencyId] = 88;
      } else {
        // If incorrect, reflect genuine critical or moderate gap
        if (q.competencyId === 'tech_python') computedScores[q.competencyId] = 32;
        else if (q.competencyId === 'tech_ai_ml') computedScores[q.competencyId] = 25;
        else if (q.competencyId === 'tech_r') computedScores[q.competencyId] = 45;
        else if (q.competencyId === 'stat_accounts') computedScores[q.competencyId] = 48;
        else if (q.competencyId === 'stat_sampling') computedScores[q.competencyId] = 42;
        else computedScores[q.competencyId] = 40;
      }
    });

    const calculatedPercentage = Math.round((correctCount / questions.length) * 100);

    const summary = {
      total: questions.length,
      correct: correctCount,
      percentage: calculatedPercentage,
      computedScores
    };

    setScoreSummary(summary);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti error:', e);
    }
  };

  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      
      {/* Quiz Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              Step 2 of 6
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Calibrated for: <strong className="text-slate-800">{officerRole} ({division})</strong>
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            Diagnostic Competency Assessment
          </h2>
        </div>

        {/* Action Controls & Fast Demos */}
        <div className="flex flex-wrap items-center gap-2">
          {!isSubmitted ? (
            <>
              <button
                type="button"
                onClick={() => handleAutoFill('typical_gaps')}
                className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition flex items-center gap-1 shadow-2xs"
                title="Simulates answering well in statistics but weak in Python & AI"
              >
                <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                <span>Demo: Gap in AI & Python</span>
              </button>

              <button
                type="button"
                onClick={() => handleAutoFill('all_correct')}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold transition flex items-center gap-1 shadow-2xs"
                title="Simulates 100% correct answers"
              >
                <span>Demo: 100% Correct</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleResetQuiz}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
          )}

          <div className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700">
            {answeredCount} / {questions.length} Answered
          </div>
        </div>
      </div>

      {/* Results Banner when Submitted */}
      {isSubmitted && scoreSummary && (
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl text-white p-6 shadow-lg border border-indigo-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Assessment Graded Dynamically</span>
            </div>
            <h3 className="text-2xl font-black">
              Diagnostic Score: {scoreSummary.percentage}% ({scoreSummary.correct} / {scoreSummary.total} Correct)
            </h3>
            <p className="text-xs text-indigo-200">
              Your answers have dynamically calibrated the official 4-pillar competency matrix.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onAssessmentCompleted(scoreSummary)}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition flex items-center gap-2 shrink-0"
          >
            <span>Proceed to Step 3: Skill Gap Matrix</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Active Question Box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        
        {/* Question Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
              Q{currentIdx + 1} of {questions.length}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
              {currentQ.pillar}
            </span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
              currentQ.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800' :
              currentQ.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {currentQ.difficulty}
            </span>
          </div>

          <button
            type="button"
            onClick={handleToggleFlag}
            className={`p-1.5 rounded-lg border transition ${
              flagged[currentQ.id] 
                ? 'bg-amber-50 border-amber-300 text-amber-600' 
                : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
            }`}
            title="Flag for review"
          >
            <Flag className="w-4 h-4" />
          </button>
        </div>

        {/* Question Text */}
        <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed py-1">
          {currentQ.question}
        </h3>

        {/* Options */}
        <div className="space-y-2">
          {currentQ.options.map((option, idx) => {
            const isSelected = userAnswers[currentQ.id] === idx;
            const showFeedback = isSubmitted;
            const isCorrect = idx === currentQ.correctAnswer;

            let style = "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 text-slate-700";
            if (isSelected) style = "border-indigo-600 bg-indigo-50 text-indigo-950 ring-1 ring-indigo-600 font-medium";
            if (showFeedback) {
              if (isCorrect) style = "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-600";
              else if (isSelected && !isCorrect) style = "border-red-500 bg-red-50 text-red-950 ring-1 ring-red-500";
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectAnswer(idx)}
                disabled={isSubmitted}
                className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition flex items-start gap-3 ${style}`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 font-bold ${
                  isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-snug">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Official Explanation after submission */}
        {isSubmitted && (
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <span className="font-bold text-slate-800 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Official Statistical Methodology:</span>
            </span>
            <p className="text-slate-600 leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Pagination & Palette */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
            disabled={currentIdx === 0}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-30"
          >
            Previous
          </button>

          {/* Quick Palette Pills */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {questions.map((q, idx) => {
              const isAns = userAnswers[q.id] !== undefined;
              const isCurr = currentIdx === idx;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-7 h-7 rounded-lg text-[11px] font-bold transition ${
                    isCurr ? 'bg-indigo-600 text-white ring-2 ring-indigo-400' :
                    isAns ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                    'bg-slate-100 text-slate-500'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {currentIdx < questions.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-xs"
              >
                Next
              </button>
            ) : (
              !isSubmitted && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition shadow-sm flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Diagnostic</span>
                </button>
              )
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
