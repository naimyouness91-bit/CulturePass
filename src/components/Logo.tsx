import { Link } from "@tanstack/react-router";
import logoImg from "@/assets/logo-culturepass.jpeg";
import { useLanguage } from "@/context/LanguageContext";

export function Logo({ className = "", showWordmark = true, compact = false }: { className?: string; showWordmark?: boolean; compact?: boolean }) {
  const { isRTL } = useLanguage();

  return (
    <Link 
      to="/" 
      className={`group inline-flex items-center ${compact ? 'gap-1 sm:gap-2' : 'gap-2 sm:gap-3 md:gap-4'} transition-transform duration-300 hover:scale-105 ${isRTL ? 'flex-row-reverse' : ''} ${className}`}
    >
      {/* Logo Icon - Responsive & Compact */}
      <div className={`relative flex items-center justify-center flex-shrink-0 ${compact ? 'h-10 w-10 sm:h-11 sm:w-11' : 'h-12 w-12 sm:h-14 sm:w-14 md:h-14 md:w-14 lg:h-16 lg:w-16'}`}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/10 to-red-400/10 blur-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <img
          src={logoImg}
          alt="CulturePass Mediouna logo"
          className="h-full w-full rounded-full object-contain shadow-lg ring-1 ring-emerald-200/30 transition-all duration-300 group-hover:ring-emerald-300/50 group-hover:shadow-xl"
        />
      </div>

      {showWordmark && (
        <div className="flex flex-col justify-center">
          {/* Main Title - Responsive - Force LTR for text order */}
          <div className={`flex items-baseline ${compact ? 'gap-0.5 sm:gap-1' : 'gap-1 sm:gap-1.5'} ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className={`font-display ${compact ? 'text-sm sm:text-base' : 'text-base sm:text-lg md:text-xl'} font-extrabold tracking-tight leading-none text-emerald-600`}>
              Culture
            </span>
            <span className={`font-display ${compact ? 'text-sm sm:text-base' : 'text-base sm:text-lg md:text-xl'} font-extrabold tracking-tight leading-none text-emerald-600`}>
              Pass
            </span>
          </div>

          {/* Subtitle - Responsive */}
          <span className={`${compact ? 'text-[8px] sm:text-[9px]' : 'text-[9px] sm:text-[10px] md:text-xs'} font-bold uppercase tracking-[0.24em] text-emerald-600/70 leading-tight mt-0.5 ltr`}>
            Mediouna
          </span>
        </div>
      )}
    </Link>
  );
}
