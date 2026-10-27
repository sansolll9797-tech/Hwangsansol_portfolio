import React, { useState } from 'react';
import { Search, ExternalLink, TrendingUp, Sparkles, Plus, ArrowUpRight } from 'lucide-react';
import { Project } from '../types/portfolio';
import { filterProjects } from '../utils/portfolio-data';

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenCMSForNewProject: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onSelectProject,
  onOpenCMSForNewProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: '전체 (All)' },
    { id: 'uiux', label: 'UI·UX 디자인' },
    { id: 'performance', label: '퍼포먼스 마케팅' },
    { id: 'brand', label: '브랜드 디자인' },
    { id: 'campaign', label: '콘텐츠/캠페인' },
  ];

  const filteredProjects = filterProjects(projects, activeCategory, searchQuery);

  return (
    <section id="projects" className="py-24 relative bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-color)' }} />
              Featured Works
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              감각과 데이터가 빚어낸 <br className="hidden sm:inline" />
              <span style={{ color: 'var(--accent-color)' }}>핵심 프로젝트 쇼케이스</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCMSForNewProject}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white hover:border-[var(--accent-color)] transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" style={{ color: 'var(--accent-color)' }} />
              <span>새 프로젝트 등록 (CMS)</span>
            </button>
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
                      ? 'bg-white text-black font-semibold shadow-md'
                      : 'bg-[#121217] text-slate-400 hover:text-white border border-white/5 hover:border-white/15'
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor: 'var(--accent-color)',
                          color: '#000',
                          boxShadow: '0 0 15px -3px var(--accent-glow)'
                        }
                      : {}
                  }
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
              placeholder="프로젝트명, 툴(Figma 등) 검색..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#101014] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[var(--accent-color)] transition-colors"
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

        {/* Projects Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 px-4 rounded-3xl bg-[#0b0b0e] border border-white/5">
            <p className="text-base text-slate-400 mb-4">검색 조건에 일치하는 프로젝트가 없습니다.</p>
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
                className="group relative rounded-2xl bg-[#0c0c10] border border-white/10 hover:border-[var(--accent-color)] transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer hover:-translate-y-1"
                style={{
                  boxShadow: '0 4px 20px -2px rgba(0,0,0,0.5)'
                }}
              >
                {/* Thumbnail Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c10] via-transparent to-transparent opacity-90 pointer-events-none" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-black/75 border border-white/15 text-white backdrop-blur-md">
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Impact Metric Floating Badge */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/80 border border-white/20 backdrop-blur-md">
                      <TrendingUp className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--accent-color)' }} />
                      <span className="text-xs font-bold text-white tracking-wide truncate">
                        {project.keyMetric}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[var(--accent-color)] transition-colors line-clamp-1">
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
                      {project.tools.length > 3 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
                          +{project.tools.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="text-xs font-semibold text-slate-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>상세보기</span>
                      <ArrowUpRight className="w-3.5 h-3.5" style={{ color: 'var(--accent-color)' }} />
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
