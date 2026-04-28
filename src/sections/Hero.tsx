import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Play, Music, Disc, Calendar } from 'lucide-react';
import { heroConfig } from '../config';

const ICON_MAP = {
  disc: Disc,
  play: Play,
  calendar: Calendar,
  music: Music,
};

const Hero = () => {
  if (!heroConfig.decodeText && !heroConfig.brandName && heroConfig.navItems.length === 0) {
    return null;
  }

  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const TARGET_TEXT = heroConfig.decodeText;
  const CHARS = heroConfig.decodeChars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  const [displayText, setDisplayText] = useState(' '.repeat(TARGET_TEXT.length));
  const [isDecoding, setIsDecoding] = useState(true);

  // Efecto de decodificación
  useEffect(() => {
    let iteration = 0;
    const maxIterations = TARGET_TEXT.length * 8;
    const interval = setInterval(() => {
      setDisplayText(() => {
        return TARGET_TEXT.split('')
          .map((_, index) => {
            if (index < iteration / 8) return TARGET_TEXT[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
      });
      iteration += 1;
      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(TARGET_TEXT);
        setIsDecoding(false);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Animaciones GSAP para logo y subtítulo
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { y: -50, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
      );
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.5 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <section ref={heroRef} className="relative w-full h-screen overflow-hidden bg-void-black">
      {/* Fondo y overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroConfig.backgroundImage})` }} />
        <div className="absolute inset-0 video-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1e3a5f]/30 to-[#152a45]" />
      </div>

      {/* MENÚ HAMBURGUESA - esquina superior derecha */}
      <div className="fixed top-6 right-6 z-50" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-12 h-12 rounded-full bg-[#1e3a5f]/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-3xl hover:bg-[#00b4d8]/30 hover:border-[#00b4d8]/50 transition-all duration-300 shadow-lg"
          aria-label="Menú"
        >
          ☰
        </button>
        {menuOpen && (
          <div className="absolute top-14 right-0 bg-[#1e3a5f]/95 backdrop-blur-xl rounded-2xl border border-[#00b4d8]/30 shadow-2xl py-3 flex flex-col gap-2 min-w-[200px]">
            {heroConfig.navItems.map((item) => {
              const IconComponent = ICON_MAP[item.icon];
              return (
                <button
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="flex items-center gap-4 px-5 py-3 text-sm font-mono-custom uppercase tracking-wider text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <IconComponent className="w-4 h-4 text-[#00b4d8]" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Logo centrado (más abajo) */}
      <div ref={logoRef} className="absolute inset-x-0 top-[10%] md:top-[8%] z-20 flex justify-center">
        <img
          src="/logo-ssitel-white.png"
          alt="SSITEL Logo"
          className="h-56 md:h-72 lg:h-96 w-auto filter drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
        />
      </div>

      {/* Contenido central */}
      <div className="relative z-10 h-full px-4 flex flex-col items-center justify-start pt-[45vh] md:pt-[50vh] lg:pt-[60vh]">
        <h1 ref={titleRef} className="decode-text text-[8vw] md:text-[6vw] lg:text-[5vw] font-bold leading-none tracking-tighter mb-6">
          <span className={`${isDecoding ? 'text-glow-cyan' : ''} transition-all duration-300 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]`}>
            {displayText}
          </span>
        </h1>
        <p ref={subtitleRef} className="font-mono-custom text-sm md:text-base text-[#7dd3fc]/80 uppercase tracking-[0.2em] mb-10 text-center max-w-3xl">
          {heroConfig.subtitle}
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => scrollToSection(heroConfig.ctaPrimaryTarget)}
            className="px-8 py-3 bg-[#00b4d8] text-white font-display text-sm uppercase tracking-wider rounded-full hover:bg-[#00c8ed] transition-colors duration-300 shadow-[0_0_20px_rgba(0,180,216,0.4)]"
          >
            {heroConfig.ctaPrimary}
          </button>
          <button
            onClick={() => scrollToSection(heroConfig.ctaSecondaryTarget)}
            className="px-8 py-3 border border-white/30 text-white font-display text-sm uppercase tracking-wider rounded-full hover:border-[#00b4d8] hover:text-[#00b4d8] transition-colors duration-300"
          >
            {heroConfig.ctaSecondary}
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00b4d8]/40 to-transparent" />
      <div className="absolute top-8 right-8 text-right">
        <p className="font-mono-custom text-xs text-white/40 uppercase tracking-wider">{heroConfig.cornerLabel}</p>
        <p className="font-mono-custom text-xs text-[#00b4d8]/70">{heroConfig.cornerDetail}</p>
      </div>
    </section>
  );
};

export default Hero;
