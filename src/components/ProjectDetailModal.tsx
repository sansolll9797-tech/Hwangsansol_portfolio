import React, { useEffect, useState } from 'react';
import { X, ExternalLink, TrendingUp, Sparkles, Palette, Layers, Calendar, User, Film } from 'lucide-react';
import { Project } from '../types/portfolio';
import { extractYouTubeId } from '../utils/portfolio-data';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      setActiveImage(project.heroImage || project.thumbnail);
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const ytId = project.youtubeId || extractYouTubeId(project.videoUrl);

  const allImages = project.galleryImages && project.galleryImages.length > 0 
    ? project.galleryImages 
    : [project.heroImage || project.thumbnail];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="relative w-full max-w-4xl bg-[#0c0c11] border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 0 50px -10px var(--accent-subtle)'
        }}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#101017]/90 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <span 
              className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10"
              style={{ color: 'var(--accent-color)' }}
            >
              {project.categoryLabel}
            </span>
            {ytId && (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 font-mono font-bold flex items-center gap-1">
                <Film className="w-3 h-3" />
                <span>YouTube Video</span>
              </span>
            )}
            {project.client && (
              <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
                {project.client} 외주
              </span>
            )}
            <span className="text-xs text-slate-400 font-mono">{project.date}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="상세 보기 모달 닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Main Visual: YouTube Player or Image Gallery */}
          <div className="space-y-3">
            {ytId ? (
              <div className="space-y-2">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl">
                  <iframe
                    src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`}
                    title={project.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    유튜브 영상 직접 스트리밍
                  </span>
                  <a 
                    href={project.videoUrl || `https://www.youtube.com/watch?v=${ytId}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-red-400 hover:text-red-300 flex items-center gap-1 hover:underline"
                  >
                    <span>새 창에서 유튜브로 보기</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="relative aspect-video sm:aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-black flex items-center justify-center">
                <img
                  src={activeImage || project.heroImage || project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-contain sm:object-cover"
                />
                
                {/* Impact Metric Floating Badge */}
                {project.keyMetric && (
                  <div className="absolute bottom-4 left-4 right-4 sm:right-auto flex items-center gap-3 p-3.5 rounded-xl bg-black/85 border border-white/20 backdrop-blur-md">
                    <div className="p-2 rounded-lg bg-white/10 shrink-0">
                      <TrendingUp className="w-4 h-4" style={{ color: 'var(--accent-color)' }} />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-bold text-white">
                        {project.keyMetric}
                      </div>
                      {project.metricDetail && (
                        <div className="text-xs text-slate-300">{project.metricDetail}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Gallery Thumbnails (if multi-image and not a video) */}
            {!ytId && allImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border transition-all shrink-0 ${
                      activeImage === img
                        ? 'border-[var(--accent-color)] ring-2 ring-[var(--accent-color)]/30'
                        : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`갤러리 썸네일 ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Titles */}
          <div>
            <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
              {project.title}
            </h3>
            <p className="text-base text-slate-300 leading-relaxed">
              {project.subtitle}
            </p>
          </div>

          {/* Brand Keywords & Colors (if present) */}
          {(project.keywords || project.colors) && (
            <div className="p-5 rounded-2xl bg-[#13131b] border border-white/10 space-y-4">
              {project.keywords && (
                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-2 uppercase tracking-wider">
                    Brand Keywords (핵심 가치)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.keywords.map((kw, idx) => (
                      <span key={idx} className="text-xs font-semibold px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.colors && (
                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-2 uppercase tracking-wider">
                    Brand Color Palette (컬러 시스템)
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {project.colors.map((c, idx) => (
                      <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs">
                        <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: c.hex }} />
                        <span className="font-mono text-slate-200">{c.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Overview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-[#121218] border border-white/5">
            <div>
              <span className="text-xs font-mono text-slate-400 block mb-1">역할 및 기여도 (Contribution)</span>
              <p className="text-sm font-semibold text-white">{project.contribution}</p>
            </div>
            <div>
              <span className="text-xs font-mono text-slate-400 block mb-1">사용 툴 (Tech & Tools)</span>
              <div className="flex flex-wrap gap-1.5">
                {project.tools.map((tool, idx) => (
                  <span key={idx} className="text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Content: Challenge & Solution */}
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                Problem & Challenge (기획 배경 및 해결 과제)
              </h4>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed bg-[#111116] p-4 rounded-xl border border-white/5">
                {project.challenge || project.summary}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-color)' }} />
                Creative Execution & Solution (디자인 및 마케팅 솔루션)
              </h4>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed bg-[#111116] p-4 rounded-xl border border-white/5">
                {project.description || project.solution}
              </p>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400 font-mono">
              Designed & Marketed by Hwang Sansol
            </span>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-black transition-all cursor-pointer hover:brightness-110"
                style={{ backgroundColor: 'var(--accent-color)' }}
              >
                <span>관련 링크 바로가기</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
