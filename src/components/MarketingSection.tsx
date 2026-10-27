import React from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Project, MarketingMetric } from '../types/portfolio';

interface MarketingSectionProps {
  marketingProjects: Project[];
  metrics: MarketingMetric[];
  onSelectProject: (project: Project) => void;
}

export const MarketingSection: React.FC<MarketingSectionProps> = ({
  marketingProjects,
  metrics,
  onSelectProject,
}) => {
  return (
    <section id="marketing" className="py-24 relative bg-[#060807] border-t-2 border-[var(--accent-color)]/30 cyber-grid">
      {/* Visual Accent Glow */}
      <div 
        className="absolute top-10 right-1/4 w-96 h-96 rounded-full blur-[160px] opacity-15 pointer-events-none"
        style={{ backgroundColor: 'var(--accent-color)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Distinction Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-xs font-mono font-semibold tracking-wider uppercase mb-3 text-emerald-400">
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: 'var(--accent-color)' }} />
            <span>SECTION 01 — MARKETING IMPACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight sm:leading-[1.25]">
            20여 개 병원 전담 마케팅 & <br className="hidden sm:inline" />
            <span style={{ color: 'var(--accent-color)' }}>신규 환자 유입 파이프라인</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
            전문 에이전시에서 환자의 검색 의도를 정밀 분석한 네이버 블로그 SEO와 SNS 비주얼 브랜딩을 결합하여, 단순 조회를 넘어 실제 문의와 신규 환자(초진) 유입으로 이어지는 파이프라인을 구축했습니다.
          </p>
        </div>

        {/* Featured Marketing Case Study Card */}
        {marketingProjects.length > 0 && (
          <div className="mb-16">
            <div 
              onClick={() => onSelectProject(marketingProjects[0])}
              className="p-6 sm:p-8 rounded-3xl bg-[#0b100c] border border-emerald-500/30 hover:border-[var(--accent-color)] transition-all duration-300 shadow-2xl cursor-pointer group relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Thumbnail Preview */}
                <div className="lg:col-span-5 relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black">
                  <img
                    src={marketingProjects[0].thumbnail}
                    alt={marketingProjects[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-black/80 border border-white/20 text-white backdrop-blur-md">
                      {marketingProjects[0].categoryLabel}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/80 border border-white/20 backdrop-blur-md">
                      <TrendingUp className="w-3.5 h-3.5" style={{ color: 'var(--accent-color)' }} />
                      <span className="text-xs font-bold text-white truncate">
                        {marketingProjects[0].keyMetric}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Case Study Info */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-emerald-400 font-semibold">
                        {marketingProjects[0].date}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[var(--accent-color)] transition-colors mb-2">
                      {marketingProjects[0].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                      {marketingProjects[0].summary}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-[#0e1610] border border-white/5 text-xs">
                    <div>
                      <span className="text-slate-400 block mb-0.5">역할 및 기여도</span>
                      <span className="text-white font-semibold">{marketingProjects[0].contribution}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-0.5">핵심 전략</span>
                      <span className="text-emerald-400 font-semibold">검색 상위 노출 + 신규 유입 파이프라인</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {marketingProjects[0].tools.slice(0, 4).map((tool, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                          {tool}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs font-semibold text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>자세히 보기</span>
                      <ArrowRight className="w-3.5 h-3.5" style={{ color: 'var(--accent-color)' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4 KPI Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-[#0a0f0c] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 relative overflow-hidden group"
            >
              <div 
                className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity"
                style={{ backgroundColor: 'var(--accent-color)' }}
              />

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                  {item.category}
                </span>
                <TrendingUp className="w-4 h-4" style={{ color: 'var(--accent-color)' }} />
              </div>

              <div 
                className="text-lg sm:text-2xl font-extrabold text-white tracking-tight mb-1 whitespace-pre-line leading-snug min-h-[3rem] flex items-center"
                style={{ textShadow: '0 0 20px rgba(0,0,0,0.5)' }}
              >
                {item.value}
              </div>

              <div 
                className="text-xs font-mono font-bold mb-3 flex items-center gap-1.5"
                style={{ color: 'var(--accent-color)' }}
              >
                <span>✓</span>
                <span>{item.growth}</span>
              </div>

              <div className="text-xs text-slate-400 leading-relaxed pt-3 border-t border-white/5">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
