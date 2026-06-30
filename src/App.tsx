import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { 
  Lock, 
  Clock, 
  ShieldCheck,
  ChevronRight
} from "lucide-react";

export default function App() {
  const redirectUrl = "https://wa.me/message/QTQQEN3GI5CWF1";

  // State management
  const [timeLeft, setTimeLeft] = useState<number>(5);
  const [progress, setProgress] = useState<number>(0);
  const [logoError, setLogoError] = useState<boolean>(false);

  // Redirect and Meta Pixel Event Trigger function
  const triggerRedirect = (isManual: boolean = false) => {
    try {
      if (typeof window !== "undefined" && (window as any).fbq) {
        console.log("Disparando eventos do Meta Pixel: Lead e Contact para campanha do WhatsApp de Giovanni Fornecedor...");
        (window as any).fbq("track", "Lead");
        (window as any).fbq("track", "Contact");
      }
    } catch (error) {
      console.error("Erro ao disparar evento do Meta Pixel:", error);
    }

    if (isManual) {
      window.location.href = redirectUrl;
    } else {
      // Small 250ms buffer for auto redirect to allow network beacon to send fully
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 250);
    }
  };

  // Ref for intervals
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Progress bar animation interval (runs every 30ms for 5 seconds total)
    const totalDuration = 5000; 
    const updateInterval = 30; 
    const stepIncrement = (updateInterval / totalDuration) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + stepIncrement;
        if (next >= 100) {
          clearInterval(progressIntervalRef.current!);
          return 100;
        }
        return next;
      });
    }, updateInterval);

    // Countdown timer interval (runs every 100ms)
    countdownIntervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 0.1;
        if (next <= 0) {
          clearInterval(countdownIntervalRef.current!);
          // Trigger Pixel tracked redirection
          triggerRedirect(false);
          return 0;
        }
        return next;
      });
    }, 100);

    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  return (
    <div id="app-container" className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans flex flex-col justify-between selection:bg-black/10 selection:text-black">
      
      {/* Spacer to push content to the center */}
      <div className="h-6" />

      {/* Main Container */}
      <main id="app-main" className="flex-1 flex flex-col items-center justify-center p-4 max-w-sm mx-auto w-full">
        
        {/* Verification Card */}
        <motion.div 
          id="verification-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-white border border-slate-100 rounded-[28px] p-6 shadow-[0_12px_40px_rgba(15,23,42,0.02)] relative overflow-hidden"
        >
          {/* Brand dark elegant accent line (monochrome) */}
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-slate-900 via-black to-slate-900" />

          {/* Logo Section - Custom premium black & white hexagon badge */}
          <div className="flex flex-col items-center mb-6 pt-2">
            <div className="flex flex-col items-center justify-center">
              {!logoError ? (
                <div className="h-20 flex items-center justify-center overflow-hidden rounded-xl mb-2">
                  <img 
                    id="giovanni-logo"
                    src="https://i.imgur.com/7zEUMQU.png" 
                    alt="Giovanni Fornecedor" 
                    className="h-20 object-contain animate-fade-in"
                    referrerPolicy="no-referrer"
                    onError={() => {
                      setLogoError(true);
                    }}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  {/* Fallback Custom SVG Monogram Logo */}
                  <svg 
                    id="giovanni-logo-svg"
                    className="w-20 h-20 text-black mb-2" 
                    viewBox="0 0 100 100" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Outer Hexagon Outline */}
                    <polygon 
                      points="50,5 90,28 90,72 50,95 10,72 10,28" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinejoin="round"
                    />
                    {/* Inner Hexagon (Thin and Dotted for elegance) */}
                    <polygon 
                      points="50,11 84,31 84,69 50,89 16,69 16,31" 
                      stroke="currentColor" 
                      strokeWidth="0.75" 
                      strokeLinejoin="round"
                      strokeDasharray="2 2"
                    />
                    {/* Stylized classic Crown */}
                    <path 
                      d="M38,36 L43,28 L50,33 L57,28 L62,36 Z" 
                      fill="currentColor"
                    />
                    {/* Luxury 'G' Monogram Letter */}
                    <path 
                      d="M58,45 C58,39 52,38 48,38 C41,38 37,43 37,50 C37,57 41,62 48,62 C55,62 58,57 58,53 L48,53 L48,49 L62,49 L62,54 C62,61 55,66 48,66 C39,66 32,60 32,50 C32,40 39,34 48,34 C54,34 60,37 61,43 L58,45 Z" 
                      fill="currentColor"
                    />
                  </svg>
                  {/* Text logo */}
                  <div className="text-center mt-1">
                    <span className="text-lg font-black tracking-[0.25em] text-black font-sans uppercase block leading-none">
                      Giovanni
                    </span>
                    <span className="text-[9px] font-bold text-slate-500 tracking-[0.35em] uppercase block mt-1.5 leading-none">
                      Fornecedor
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Connection Status Header */}
          <div className="text-center mb-6">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Iniciando chat seguro no WhatsApp...
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Conectando você ao atendimento exclusivo.
            </p>
          </div>

          {/* Minimalist Progress Loader */}
          <div className="mb-5 bg-slate-50 border border-slate-100/70 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Clock className="w-4 h-4 text-black animate-pulse" />
                <span>Redirecionando em {timeLeft > 0 ? `${timeLeft.toFixed(1)}s` : "0.0s"}</span>
              </span>
              <span className="font-mono text-black">{Math.min(100, Math.round(progress))}%</span>
            </div>
            
            <div className="w-full bg-slate-200/60 rounded-full h-1.5 overflow-hidden">
              <motion.div 
                className="h-full bg-black rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Trust Rating Seal styled in Full Clean with Standard Blue Logo */}
          <div className="mb-4 bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-3.5 min-w-0">
              <img 
                src="https://i.imgur.com/14YEhUt.png"
                alt="Reclame Aqui"
                className="w-10 h-10 object-contain shrink-0 rounded"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback = document.getElementById("ra-fallback");
                  if (fallback) fallback.classList.remove("hidden");
                }}
              />
              {/* Fallback indicator */}
              <div id="ra-fallback" className="hidden w-8 h-8 rounded-full bg-black flex flex-col items-center justify-center text-white shrink-0 shadow-sm relative overflow-hidden">
                <span className="text-[6px] font-black tracking-tighter uppercase leading-none mt-1">RA</span>
                <div className="w-2.5 h-1 border-b-2 border-white rounded-b-full -mt-0.5" />
              </div>
              
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-extrabold text-black tracking-wider uppercase">Reclame Aqui</span>
                  <span className="text-[7px] bg-black text-white font-bold px-1.5 py-0.2 rounded-full uppercase scale-90">Bom</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium truncate">Canal Oficial Recomendado</p>
              </div>
            </div>
            <div className="text-right shrink-0 pl-1">
              <div className="text-[10px] font-bold text-slate-800 font-mono">7.8/10</div>
              <div className="text-[7px] text-slate-400 uppercase tracking-tight">Reputação</div>
            </div>
          </div>

          {/* Simple Encryption & Security Badges (Colored icons changed to black) */}
          <div className="flex items-center justify-center gap-4 py-1 text-[11px] text-slate-400 font-medium border-t border-slate-100 pt-3">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-black" />
              Conexão Segura
            </span>
            <span className="text-slate-200">|</span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-black" />
              Criptografado
            </span>
          </div>

          {/* Minimal Fallback Link (Colors changed to black) */}
          <div className="text-center pt-4">
            <a 
              href={redirectUrl} 
              onClick={(e) => {
                e.preventDefault();
                triggerRedirect(true);
              }}
              className="text-[10px] text-slate-400 hover:text-black hover:underline font-medium transition-all inline-flex items-center gap-0.5"
              id="fallback-link"
            >
              <span>Se não for redirecionado automaticamente, clique aqui</span>
              <ChevronRight className="w-3 h-3" />
            </a>
          </div>

        </motion.div>

      </main>

      {/* Trust & Corporate Information Footer (All texts and icons updated to Giovanni Fornecedor / Monochrome) */}
      <footer id="app-footer" className="w-full py-5 px-6 text-center border-t border-slate-100 bg-white">
        <div className="max-w-xs mx-auto space-y-2">
          
          {/* Main Legal info */}
          <div className="text-[9px] text-slate-400 leading-relaxed font-mono font-medium">
            <p className="text-slate-500 font-sans font-bold text-[9px] uppercase tracking-wider mb-0.5">
              Giovanni Fornecedor
            </p>
            <p className="uppercase text-[8px]">Giovanni Fornecedor Intermediação de Negócios</p>
            <p className="mt-0.5">Atendimento Oficial e Seguro via WhatsApp</p>
            <p className="mt-0.5">São Paulo - SP • giovannifornecedor.com</p>
          </div>

          {/* Secure Labels */}
          <div className="flex justify-center items-center gap-3 pt-1.5 border-t border-slate-100 text-[8px] font-mono text-slate-400 tracking-wider">
            <span className="flex items-center gap-0.5">
              <Lock className="w-2.5 h-2.5 text-black" />
              SSL CERTIFIED
            </span>
            <span>•</span>
            <span>AMBIENTE PROTEGIDO</span>
          </div>
          
        </div>
      </footer>
    </div>
  );
}
