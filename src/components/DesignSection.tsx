import React, { useState } from 'react';
import { Search, Sparkles, ArrowUpRight, Play, Film } from 'lucide-react';
import { Project } from '../types/portfolio';
import { filterProjects } from '../utils/portfolio-data';

interface DesignSectionProps {
  designProjects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenCMSForNewProject: () => void;
}

export const DesignSection: React.FC<DesignSectionProps> = ({
  designProjects,
  onSelectProject,
  onOpenCMSForNewProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: '전체 (All)' },
    { id: 'video', label: '영상 디자인 (AI Video)' },
    { id: 'brand', label: '브랜드 디자인 (Brand)' },
    { id: 'medical', label: '메디컬 디자인 (Medical)' },
    { id: 'poster', label: '포스터 디자인 (Poster)' },
  ];

  const filteredProjects = filterProjects(designProjects, activeCategory, searchQuery);

  return (
    <section id="design" className="py-24 relative bg-[#060608] border-t-2 border-purple-500/20">
      {/* Visual Accent Glow (Creative purple/indigo ambient) */}
      <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-purple-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Distinction Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-xs font-mono font-semibold tracking-wider uppercase mb-3 text-purple-300">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>SECTION 02 — DESIGN WORKS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-snug sm:leading-[1.25]">
              영상·브랜드·메디컬·포스터 <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-[var(--accent-color)]">
                비주얼 디자인 포트폴리오
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
              AI 비주얼 영상 디자인(유튜브 연동), 캐주얼 커피바 통합 브랜딩(FRANK WAVE), 피부과 시술 정보성 카드뉴스, 병·의원 네이버 블로그 스킨, 어반브레이크 외주 웹 포스터 등 실무 및 프로젝트 작업물입니다.
            </p>
          </div>

        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none" role="tablist">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  role="tab"
                  aria-selected={isActive}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-purple-500 text-white font-semibold shadow-lg shadow-purple-500/20'
                      : 'bg-[#121218] text-slate-400 hover:text-white border border-white/5 hover:border-white/15'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px] max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="프로젝트명, 툴(Photoshop 등) 검색..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#101016] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                aria-label="검색어 지우기"
              >
                지우기
              </button>
            )}
          </div>
        </div>

        {/* Design Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 px-4 rounded-3xl bg-[#0b0b10] border border-white/5">
            <p className="text-base text-slate-400 mb-4">선택하신 카테고리에 해당하는 프로젝트가 없습니다.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-white"
            >
              전체 필터 초기화
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group relative rounded-2xl bg-[#0d0d14] border border-white/10 hover:border-purple-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer hover:-translate-y-1 shadow-xl hover:shadow-purple-500/10"
              >
                {/* Thumbnail Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-transparent to-transparent opacity-90 pointer-events-none" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-black/80 border border-white/15 text-purple-300 backdrop-blur-md">
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Video Play Overlay */}
                  {(project.category === 'video' || project.youtubeId || project.videoUrl) ? (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-red-500 transition-all">
                          <Play className="w-5 h-5 fill-white translate-x-0.5" />
                        </div>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-600 text-white backdrop-blur-md flex items-center gap-1 shadow-md">
                          <Film className="w-3 h-3" />
                          <span>YOUTUBE</span>
                        </span>
                      </div>
                    </>
                  ) : project.client ? (
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/30 text-purple-200 backdrop-blur-md">
                        외주작업
                      </span>
                    </div>
                  ) : null}

                  {/* Impact / Metric Floating Badge */}
                  {project.keyMetric && (
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/85 border border-white/20 backdrop-blur-md">
                        <Sparkles className="w-3.5 h-3.5 shrink-0 text-purple-400" />
                        <span className="text-xs font-bold text-white tracking-wide truncate">
                          {project.keyMetric}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Tools & Details Row */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tools.slice(0, 3).map((tool, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    <div className="text-xs font-semibold text-slate-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>작품 상세보기</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
