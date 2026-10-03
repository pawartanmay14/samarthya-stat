import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ExternalLink, 
  Building2, 
  ArrowRight, 
  MessageSquare, 
  ChevronDown,
  Minimize2,
  Maximize2,
  RefreshCw,
  Zap
} from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  "How do I clear my critical gap in Python for Big Data?",
  "Which iGOT courses are recommended for National Accounts Division?",
  "How does the AI Document-to-Quiz generator work?",
  "What is the NSSTA TPAC Training Calendar for 2026?",
  "Explain why Double Deflation is mandatory in GVA calculation"
];

const BOT_KNOWLEDGE = {
  "python": "To bridge your critical gap in Python for Official Statistics, we recommend enrolling in **'Python for Official Statistics & Big Data Processing'** (Course Code: `iGOT-TECH-2026-305`). It covers pandas fixed-width parsing (pd.read_fwf), survey microdata wrangling, and automated report generation. You can click 'Launch on iGOT' in Step 4 to start immediately.",
  
  "national accounts": "For the National Accounts Division (NAD), key competencies center around SNA 2008 and Gross Value Added (GVA) deflators. The primary recommended iGOT module is **'System of National Accounts (SNA 2008) & GDP Compilation'** (`iGOT-SNA-2026-204`). You can also upload your internal NAD guidelines in Step 5 to generate instant practice quizzes!",
  
  "quiz": "The **AI Document-to-Quiz Studio (Step 5)** allows you to upload any official MoSPI PDF, circular, or training handbook. Our NLP model extracts the statistical definitions and formulas, then dynamically generates 10 objective MCQs classified into Easy, Medium, and Hard. When you complete the quiz and click 'Update Competency Profile', your scores automatically recalibrate in real-time!",
  
  "nssta": "The **National Statistical Systems Training Academy (NSSTA)** in Greater Noida conducts residential and hybrid training programs under the TPAC (Training Programme Advisory Committee). Upcoming batches include the *Induction & Advanced Analytics Programme for ISS/SSS* and the *Executive Masterclass on Big Data & Satellite Analytics*. You can submit cadre nominations directly from Step 4.",
  
  "double deflation": "Double deflation deflates Gross Output and Intermediate Inputs using separate, specific price indices (derived from Supply and Use Tables) rather than deflating GVA with a single output index. This eliminates price bias when raw material or input costs diverge from finished product inflation, as mandated by the 2024 MoSPI National Accounts guidelines.",
  
  "igot": "The Samarthya-Stat platform integrates directly with the **iGOT Karmayogi** API. All recommended courses display a verified green badge confirming active availability on `https://igotkarmayogi.gov.in`. Clicking 'Launch on iGOT' opens the course directly on the portal, and completed credits are synchronized back into your MoSPI employee profile.",

  "dpdp": "Under the **Digital Personal Data Protection Act (DPDP Act 2023)** and Collection of Statistics Act 2008, all citizen data gathered during NSSO surveys must undergo robust de-identification, pseudonymization, and purpose limitation before microdata dissemination.",

  "default": "I am **MoSPI Saarthi**, your AI Statistical & Learning Assistant. I can guide you through competency diagnostic assessments, explain official statistics methodologies (SNA 2008, CPI, PLFS), recommend verified iGOT Karmayogi modules, or assist with generating automated quizzes from your training materials."
};

export default function AiChatbot({ onNavigateToStep, officerProfile }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Namaste ${officerProfile?.name || 'Officer'}! I am **MoSPI Saarthi**, your AI learning assistant for India's Official Statistical System. How may I assist you with your competency upskilling or iGOT Karmayogi courses today?`,
      time: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend = null) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const qLower = query.toLowerCase();
      let responseText = BOT_KNOWLEDGE.default;

      if (qLower.includes('python') || qLower.includes('programming') || qLower.includes('code')) {
        responseText = BOT_KNOWLEDGE.python;
      } else if (qLower.includes('national accounts') || qLower.includes('nad') || qLower.includes('gdp') || qLower.includes('gva')) {
        responseText = BOT_KNOWLEDGE['national accounts'];
      } else if (qLower.includes('quiz') || qLower.includes('document') || qLower.includes('upload') || qLower.includes('mcq')) {
        responseText = BOT_KNOWLEDGE.quiz;
      } else if (qLower.includes('nssta') || qLower.includes('tpac') || qLower.includes('residential') || qLower.includes('training')) {
        responseText = BOT_KNOWLEDGE.nssta;
      } else if (qLower.includes('deflation') || qLower.includes('double')) {
        responseText = BOT_KNOWLEDGE['double deflation'];
      } else if (qLower.includes('igot') || qLower.includes('karmayogi') || qLower.includes('portal') || qLower.includes('course')) {
        responseText = BOT_KNOWLEDGE.igot;
      } else if (qLower.includes('dpdp') || qLower.includes('privacy') || qLower.includes('act')) {
        responseText = BOT_KNOWLEDGE.dpdp;
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: responseText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2.5 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-slate-900 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-indigo-400/40"
          >
            <div className="relative">
              <Bot className="w-6 h-6 text-amber-300" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-indigo-900 animate-pulse" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-black tracking-tight leading-none flex items-center gap-1">
                MoSPI Saarthi <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
              </div>
              <div className="text-[10px] text-indigo-200 mt-0.5 leading-none">
                AI Statistical Assistant
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Expandable Chat Drawer */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 z-50 bg-white rounded-2xl border border-slate-200 shadow-2xl flex flex-col transition-all duration-300 overflow-hidden ${
          isExpanded ? 'w-[92vw] sm:w-[680px] h-[82vh]' : 'w-[92vw] sm:w-[420px] h-[580px]'
        }`}>
          
          {/* Drawer Header */}
          <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-white p-4 flex items-center justify-between border-b border-indigo-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/50 border border-indigo-400/40 flex items-center justify-center text-amber-300">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-sm tracking-tight text-white">
                    MoSPI Saarthi AI
                  </h4>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-indigo-200">
                  Statistical Assistant & iGOT Guide
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition"
                title={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white p-3 rounded-2xl border border-slate-200 w-24 text-slate-400 text-xs">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggested Quick Prompts */}
          <div className="p-2.5 bg-white border-t border-slate-100 overflow-x-auto no-scrollbar flex gap-1.5">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-[10px] whitespace-nowrap px-2.5 py-1 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold border border-indigo-200 transition shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about official statistics, iGOT courses, or quizzes..."
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 transition shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
