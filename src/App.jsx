import React, { useState } from 'react';
import Header from './components/Header';
import StepNavigation from './components/StepNavigation';
import LoginRegister from './components/LoginRegister';
import LearnerProfile from './components/LearnerProfile';
import CompetencyAssessment from './components/CompetencyAssessment';
import SkillGapAnalysis from './components/SkillGapAnalysis';
import PersonalizedRecommendations from './components/PersonalizedRecommendations';
import DocQuizGenerator from './components/DocQuizGenerator';
import ContinuousLoop from './components/ContinuousLoop';
import AdminDashboard from './components/AdminDashboard';
import AiChatbot from './components/AiChatbot';
import { SAMPLE_RESUMES } from './data/mockData';
import { Building2, ExternalLink } from 'lucide-react';

export default function App() {
  // Authentication State (Login / Register First)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Global Role: 'learner' or 'admin'
  const [currentRole, setCurrentRole] = useState('learner');

  // Step Tracker for Learner Workflow
  const [currentStep, setCurrentStep] = useState('profile');

  // Active Officer Profile
  const [profile, setProfile] = useState({
    name: 'Rajesh Kumar Verma',
    employeeId: 'ISS-2018-9412',
    designation: 'SSO',
    division: 'NAD',
    experience: '6.5 Years',
    qualifications: 'M.Sc. Statistics, PGDCA',
    skills: [
      'National Accounts & GVA Compilation',
      'Macroeconomic Deflators & SUT',
      'Stata Econometric Modelling',
      'Basic R Programming'
    ],
    preliminaryGaps: [
      'Python for Big Data in Surveys (Critical)',
      'AI/ML & NLP Classification (Critical)',
      'DPDP Act 2023 Compliance (Moderate)'
    ]
  });

  // Diagnostic Assessment Answers State
  const [userAnswers, setUserAnswers] = useState({});
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [docQuizCompleted, setDocQuizCompleted] = useState(false);
  const [lastQuizDelta, setLastQuizDelta] = useState(null);

  // Competency Scores Baseline (Initialized with realistic distribution)
  const [competencyScores, setCompetencyScores] = useState({
    stat_sampling: 78,
    stat_accounts: 60,
    stat_price: 82,
    stat_sdg: 80,
    tech_python: 35, // Critical gap!
    tech_r: 52,     // Moderate gap
    tech_ai_ml: 28,  // Critical gap!
    gov_dpdp: 65     // Moderate gap
  });

  // Login handler
  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setCurrentRole(userData.role || 'learner');
    setProfile(prev => ({
      ...prev,
      ...userData
    }));
    setCurrentStep('profile');
  };

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserAnswers({});
    setAssessmentCompleted(false);
    setDocQuizCompleted(false);
  };

  // Load 1-Click Demo Sample Profile
  const handleLoadSampleProfile = () => {
    const ssoSample = SAMPLE_RESUMES[0];
    setProfile({
      name: ssoSample.name,
      employeeId: 'ISS-2018-9412',
      designation: 'SSO',
      division: ssoSample.division,
      experience: ssoSample.experience,
      qualifications: ssoSample.qualifications,
      skills: ssoSample.extractedSkills,
      preliminaryGaps: ssoSample.detectedGaps
    });
    setCurrentRole('learner');
    setCurrentStep('profile');
  };

  // Called when AI Resume Agent finishes parsing
  const handleApplyResumeSkills = (sampleData) => {
    setCompetencyScores(prev => ({
      ...prev,
      stat_accounts: sampleData.division === 'NAD' ? 65 : 55,
      stat_sampling: sampleData.division === 'FOD' ? 85 : 75
    }));
  };

  // Called when Diagnostic Assessment finishes (Step 2 -> Step 3)
  // DYNAMICALLY calculates scores directly from user's answers!
  const handleAssessmentCompleted = (summary) => {
    setAssessmentCompleted(true);
    if (summary.computedScores) {
      setCompetencyScores(prev => ({
        ...prev,
        ...summary.computedScores
      }));
    }
    setCurrentStep('analysis');
  };

  // Called when Document AI Quiz finishes (Step 5 -> Step 6)
  // DYNAMICALLY updates the competency score for that specific material!
  const handleQuizCompletedAndUpdateProfile = (quizResult) => {
    setDocQuizCompleted(true);
    const scoreAchieved = quizResult.scorePct;

    // Determine target competency by division / topic
    const targetComp = quizResult.division === 'PSD' ? 'stat_price' : 'stat_accounts';
    const prevScore = competencyScores[targetComp] || 50;

    setLastQuizDelta({
      competency: targetComp === 'stat_price' ? 'Price Statistics (CPI)' : 'National Accounts (GVA)',
      before: prevScore,
      after: scoreAchieved,
      diff: scoreAchieved - prevScore
    });

    setCompetencyScores(prev => ({
      ...prev,
      [targetComp]: scoreAchieved
    }));

    setCurrentStep('loop');
  };

  // Called when user completes an interactive module in iGOT Course Gateway
  const handleSyncIgotCourse = (course) => {
    if (course.competencyId) {
      setCompetencyScores(prev => ({
        ...prev,
        [course.competencyId]: 88
      }));
    }
  };

  // IF NOT AUTHENTICATED: Show Login / Register Screen
  if (!isAuthenticated) {
    return <LoginRegister onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      
      {/* Universal Clean Header */}
      <Header
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        activeOfficer={profile}
        onLoadSampleProfile={handleLoadSampleProfile}
        onLogout={handleLogout}
      />

      {/* Sleek Step Navigation Ribbon */}
      <StepNavigation
        currentStep={currentStep}
        onSelectStep={(stepId) => setCurrentStep(stepId)}
        assessmentCompleted={assessmentCompleted}
        docQuizCompleted={docQuizCompleted}
        currentRole={currentRole}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* If Admin Role is active, show Admin Analytics Dashboard */}
        {currentRole === 'admin' ? (
          <AdminDashboard 
            onSwitchToLearner={() => setCurrentRole('learner')} 
          />
        ) : (
          /* Learner Workflow Steps */
          <div>
            {currentStep === 'profile' && (
              <LearnerProfile
                profile={profile}
                setProfile={setProfile}
                onProceedToAssessment={() => setCurrentStep('assessment')}
                onApplyResumeSkills={handleApplyResumeSkills}
              />
            )}

            {currentStep === 'assessment' && (
              <CompetencyAssessment
                onAssessmentCompleted={handleAssessmentCompleted}
                userAnswers={userAnswers}
                setUserAnswers={setUserAnswers}
                officerRole={profile.designation}
                division={profile.division}
              />
            )}

            {currentStep === 'analysis' && (
              <SkillGapAnalysis
                competencyScores={competencyScores}
                onProceedToRecommendations={() => setCurrentStep('recommendations')}
                officerProfile={profile}
              />
            )}

            {currentStep === 'recommendations' && (
              <PersonalizedRecommendations
                onProceedToDocQuiz={() => setCurrentStep('doc_quiz')}
                officerProfile={profile}
                competencyScores={competencyScores}
                onSyncIgotCourse={handleSyncIgotCourse}
              />
            )}

            {currentStep === 'doc_quiz' && (
              <DocQuizGenerator
                onQuizCompletedAndUpdateProfile={handleQuizCompletedAndUpdateProfile}
                onProceedToLoop={() => setCurrentStep('loop')}
              />
            )}

            {currentStep === 'loop' && (
              <ContinuousLoop
                officerProfile={profile}
                competencyScores={competencyScores}
                lastQuizDelta={lastQuizDelta}
                onRestartLoop={() => setCurrentStep('doc_quiz')}
                onViewRecommendations={() => setCurrentStep('recommendations')}
              />
            )}
          </div>
        )}

      </main>

      {/* Integrated AI Chatbot: MoSPI Saarthi */}
      <AiChatbot 
        onNavigateToStep={(stepId) => setCurrentStep(stepId)} 
        officerProfile={profile}
      />

      {/* Clean Modern Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400 font-bold border border-slate-700">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white tracking-wide">
                  Ministry of Statistics & Programme Implementation (MoSPI)
                </div>
                <div className="text-[11px] text-slate-500">
                  Data Informatics & Innovation Division (DIID) • NSSTA Greater Noida
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <a href="https://mospi.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-1">
                <span>mospi.gov.in</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://nssta.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-1">
                <span>nssta.gov.in</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://igotkarmayogi.gov.in" target="_blank" rel="noreferrer" className="text-amber-400 font-bold hover:underline flex items-center gap-1">
                <span>iGOT Karmayogi</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <p>Smart India Hackathon 2026 • Problem Statement ID: <strong>26101</strong></p>
            <p>Samarthya-Stat: AI Skill Intelligence & Continuous Learning Platform</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
