import React from 'react';
import { ArrowDown, TrendingUp, Layers, CheckCircle2, Sparkles } from 'lucide-react';
import { ThemeConfig } from '../types/portfolio';

interface HeroSectionProps {
  theme: ThemeConfig;
  onExploreMarketing: () => void;
  onExploreDesign: () => void;
  onOpenContact?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  theme,
  onExploreMarketing,
  onExploreDesign,
}) => {
  const headlineClass = 
    theme.headlineScale === 'impact' 
      ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.15]'
      : theme.headlineScale === 'compact'
      ? 'text-3xl sm:text-4xl md:text-5xl font-bold leading-tight'
      : 'text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.18]';

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden cyber-grid">
      {/* Ambient background glow orbs */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[360px] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ backgroundColor: 'var(--accent-color)' }}
      />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-cyan-600/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Status & Role Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#111116] border border-white/10 text-xs sm:text-sm font-medium mb-8 backdrop-blur-md shadow-lg">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-color)' }} />
          <span className="text-slate-300 font-mono tracking-wider">
            {theme.heroBadgeText}
          </span>
        </div>

        {/* Main Headline - High-End Designer Typographic Treatment */}
        <div className="max-w-4xl mx-auto mb-6 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] sm:text-xs font-mono tracking-[0.25em] text-slate-400 uppercase">
              CREATIVE PORTFOLIO
            </span>
            <span className="h-px w-8 bg-white/20" />
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
              MARKETER × DESIGNER
            </span>
          </div>

          <h1 className="tracking-tight text-white flex flex-col items-center gap-1 sm:gap-2">
            <span 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight"
              style={{ 
                color: 'var(--accent-color)',
                textShadow: '0 0 35px var(--accent-glow)' 
              }}
            >
              황산솔
            </span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white flex items-center justify-center flex-wrap gap-2 sm:gap-3 mt-1">
              <span className="text-white">마케팅</span>
              <span className="text-slate-500 font-light text-xl sm:text-3xl font-serif italic">&</span>
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                디자이너
              </span>
              <span className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-normal text-slate-400 font-mono">
                포트폴리오
              </span>
            </span>
          </h1>
        </div>

        {/* Subtitle / Value Proposition */}
        <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          {theme.heroSubheadline}
        </p>

        {/* Navigation CTAs: Marketing & Design (No contact button) */}
        <div className="flex flex-row items-center justify-center gap-3 w-full sm:w-auto mb-16">
          <button
            onClick={onExploreMarketing}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-black transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:brightness-110 active:scale-[0.98] cursor-pointer"
            style={{ 
              backgroundColor: 'var(--accent-color)',
              boxShadow: '0 0 25px -4px var(--accent-glow)'
            }}
          >
            <span className="text-base">Marketing</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>

          <button
            onClick={onExploreDesign}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white bg-[#121217] border border-white/15 hover:border-[var(--accent-color)] hover:bg-[#1a1a20] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-base">Design</span>
          </button>
        </div>

        {/* Key Quick Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl text-left">
          <div className="p-4 rounded-2xl bg-[#0d0d11]/80 border border-white/10 backdrop-blur-md flex items-center gap-4 hover:border-white/20 transition-colors">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 shrink-0">
              <TrendingUp className="w-5 h-5" style={{ color: 'var(--accent-color)' }} />
            </div>
            <div>
              <div className="text-xl font-bold text-white tracking-tight">20+ 병의원</div>
              <div className="text-xs text-slate-400 font-medium">20+ 병의원 전담 마케팅</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0d0d11]/80 border border-white/10 backdrop-blur-md flex items-center gap-4 hover:border-white/20 transition-colors">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 shrink-0">
              <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--accent-color)' }} />
            </div>
            <div>
              <div className="text-xl font-bold text-white tracking-tight leading-snug">
                블로그 & SNS<br />유입 마케팅
              </div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">검색 SEO 및 신규 유입 최적화</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0d0d11]/80 border border-white/10 backdrop-blur-md flex items-center gap-4 hover:border-white/20 transition-colors">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 shrink-0">
              <Layers className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-white tracking-tight">브랜드 & 비주얼 디자인</div>
              <div className="text-xs text-slate-400 font-medium">AI 영상 · FRANK WAVE · 포스터</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
