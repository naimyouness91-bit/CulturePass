import { Link } from "@tanstack/react-router";
import logoImg from "@/assets/logo-culturepass.jpeg";

export function Logo({ className = "", showWordmark = true, compact = false }: { className?: string; showWordmark?: boolean; compact?: boolean }) {
  return (
    <Link 
      to="/" 
      className={`group inline-flex items-center ${compact ? 'gap-1 sm:gap-2' : 'gap-2 sm:gap-3 md:gap-4'} transition-transform duration-300 hover:scale-105 ltr ${className}`}
    >
      {/* Logo Icon - Responsive & Compact */}
      <div className={`relative flex items-center justify-center flex-shrink-0 ${compact ? 'h-10 w-10 sm:h-12 sm:w-12' : 'h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24'}`}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/10 to-red-400/10 blur-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <img
          src={logoImg}
          alt="CulturePass Mediouna logo"
          className={`${compact ? 'h-4 w-4 sm:h-5 sm:w-5' : 'h-5 w-5 sm:h-6 sm:w-6 md:h-4 md:w-4 lg:h-10 lg:w-10 xl:h-20 xl:w-20'} rounded-full object-contain shadow-lg ring-1 ring-emerald-200/30 transition-all duration-300 group-hover:ring-emerald-300/50 group-hover:shadow-xl flex-shrink-0`}
        />
      </div>

      {showWordmark && (
        <div className="flex flex-col justify-center">
          {/* Main Title - Responsive - Force LTR for text order */}
          <div className={`flex items-baseline ${compact ? 'gap-0.5 sm:gap-1' : 'gap-1 sm:gap-1.5'} ltr`}>
            <span className={`font-display ${compact ? 'text-sm sm:text-base' : 'text-lg sm:text-xl md:text-2xl lg:text-3xl'} font-extrabold tracking-tight leading-none text-emerald-600`}>
              Culture
            </span>
            <span className={`font-display ${compact ? 'text-sm sm:text-base' : 'text-lg sm:text-xl md:text-2xl lg:text-3xl'} font-extrabold tracking-tight leading-none text-emerald-600`}>
              Pass
            </span>
          </div>

          {/* Subtitle - Responsive */}
          <span className={`${compact ? 'text-[8px] sm:text-[9px]' : 'text-[10px] sm:text-xs md:text-sm'} font-bold uppercase tracking-[0.24em] text-emerald-600/70 leading-tight mt-0.5 ltr`}>
            Mediouna
          </span>
        </div>
      )}
    </Link>
  );
}
