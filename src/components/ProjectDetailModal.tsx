import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, Sparkles, Palette, Layers, Calendar, User, Film, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types/portfolio';
import { extractYouTubeId } from '../utils/portfolio-data';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

// Full-screen image viewer. No additional package is required.
// Mobile: two-finger pinch + one-finger pan after zooming.
// Desktop: +/- buttons, mouse wheel, double-click and dragging.
interface ZoomableImageProps {
  images: string[];
  initialIndex: number;
  alt: string;
  onImageChange: (image: string) => void;
  onClose: () => void;
}

type ImageView = { scale: number; x: number; y: number };
type TouchSnapshot = { count: number; x: number; y: number; distance: number };

const ZoomableImage: React.FC<ZoomableImageProps> = ({ images, initialIndex, alt, onImageChange, onClose }) => {
  const [imageIndex, setImageIndex] = useState(initialIndex);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const initialView = useRef<ImageView>({
    scale: 1,
    x: 0,
    y: 0,
  });
  const [view, setView] = useState<ImageView>(initialView.current);
  const viewRef = useRef<ImageView>(initialView.current);
  const touchRef = useRef<TouchSnapshot | null>(null);
  const dragRef = useRef<{ x: number; y: number } | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  const updateView = (next: ImageView) => {
    viewRef.current = next;
    setView(next);
  };

  const resetZoom = () => updateView({ scale: 1, x: 0, y: 0 });

  // Moving between gallery images resets zoom so the next design is fully visible.
  const showImage = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= images.length || nextIndex === imageIndex) return;
    setImageIndex(nextIndex);
    onImageChange(images[nextIndex]);
    resetZoom();
    touchRef.current = null;
    dragRef.current = null;
    swipeStartRef.current = null;
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' && imageIndex > 0) {
        event.preventDefault();
        showImage(imageIndex - 1);
      } else if (event.key === 'ArrowRight' && imageIndex < images.length - 1) {
        event.preventDefault();
        showImage(imageIndex + 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [imageIndex, images]);

  const zoomAt = (targetScale: number, clientX?: number, clientY?: number) => {
    const prev = viewRef.current;
    const scale = Math.max(1, Math.min(5, targetScale));
    if (scale === 1) {
      resetZoom();
      return;
    }
    const rect = viewerRef.current?.getBoundingClientRect();
    const cx = rect && clientX !== undefined ? clientX - (rect.left + rect.width / 2) : 0;
    const cy = rect && clientY !== undefined ? clientY - (rect.top + rect.height / 2) : 0;
    const ratio = scale / prev.scale;
    updateView({
      scale,
      x: cx - (cx - prev.x) * ratio,
      y: cy - (cy - prev.y) * ratio,
    });
  };

  const touchSnapshot = (touches: React.TouchEvent<HTMLDivElement>['touches']): TouchSnapshot => {
    if (touches.length >= 2) {
      const a = touches[0];
      const b = touches[1];
      return {
        count: 2,
        x: (a.clientX + b.clientX) / 2,
        y: (a.clientY + b.clientY) / 2,
        distance: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY),
      };
    }
    return { count: 1, x: touches[0].clientX, y: touches[0].clientY, distance: 0 };
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length) touchRef.current = touchSnapshot(event.touches);
    // At 100% zoom, a horizontal swipe navigates gallery pages.
    swipeStartRef.current = event.touches.length === 1 && viewRef.current.scale <= 1.01
      ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
      : null;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!event.touches.length) return;
    const current = touchSnapshot(event.touches);
    if (event.touches.length > 1) swipeStartRef.current = null;
    const previous = touchRef.current;
    const currentView = viewRef.current;
    if (previous && previous.count === current.count) {
      if (current.count === 2 && previous.distance > 0) {
        const scale = Math.max(1, Math.min(5, currentView.scale * (current.distance / previous.distance)));
        if (scale <= 1.01) {
          resetZoom();
        } else {
          const ratio = scale / currentView.scale;
          // Keep the image point beneath the fingers steady during a pinch.
          const rect = viewerRef.current?.getBoundingClientRect();
          const originX = rect ? rect.left + rect.width / 2 : 0;
          const originY = rect ? rect.top + rect.height / 2 : 0;
          const xOld = previous.x - originX;
          const yOld = previous.y - originY;
          const xNew = current.x - originX;
          const yNew = current.y - originY;
          updateView({
            scale,
            x: xNew - (xOld - currentView.x) * ratio,
            y: yNew - (yOld - currentView.y) * ratio,
          });
        }
      } else if (current.count === 1 && currentView.scale > 1) {
        updateView({ ...currentView, x: currentView.x + current.x - previous.x, y: currentView.y + current.y - previous.y });
      }
    }
    touchRef.current = current;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 0 && swipeStartRef.current && viewRef.current.scale <= 1.01) {
      const finalTouch = event.changedTouches[0];
      if (finalTouch) {
        const dx = finalTouch.clientX - swipeStartRef.current.x;
        const dy = finalTouch.clientY - swipeStartRef.current.y;
        if (Math.abs(dx) >= 60 && Math.abs(dx) > Math.abs(dy) * 1.25) {
          showImage(imageIndex + (dx < 0 ? 1 : -1));
        }
      }
    }
    swipeStartRef.current = null;
    touchRef.current = event.touches.length ? touchSnapshot(event.touches) : null;
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-[#050505] text-white flex flex-col" role="dialog" aria-modal="true" aria-label="프로젝트 이미지 확대 보기">
      <div className="shrink-0 flex items-center justify-between gap-3 px-4 py-3 border-b border-white/15 bg-[#0b0b0f]" style={{ paddingTop: 'max(12px, env(safe-area-inset-top))' }}>
        <div className="text-xs sm:text-sm text-slate-300 truncate flex items-center gap-2">
          <ZoomIn className="w-4 h-4 text-[var(--accent-color)] shrink-0" />
          <span className="truncate">이미지 확대 보기</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button type="button" onClick={() => zoomAt(viewRef.current.scale / 1.5)} aria-label="축소" className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20"><ZoomOut className="w-5 h-5" /></button>
          <span className="min-w-12 text-center text-xs text-slate-300 tabular-nums">{Math.round(view.scale * 100)}%</span>
          <button type="button" onClick={() => zoomAt(viewRef.current.scale * 1.5)} aria-label="확대" className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20"><ZoomIn className="w-5 h-5" /></button>
          <button type="button" onClick={resetZoom} aria-label="확대 초기화" className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20"><RotateCcw className="w-5 h-5" /></button>
          <button type="button" onClick={onClose} aria-label="이미지 확대 닫기" className="ml-1 p-2.5 rounded-lg bg-white/15 hover:bg-white/25"><X className="w-5 h-5" /></button>
        </div>
      </div>
      <div
        ref={viewerRef}
        className="relative flex-1 min-h-0 w-full overflow-hidden flex items-center justify-center select-none"
        style={{ touchAction: 'none', cursor: view.scale > 1 ? 'grab' : 'zoom-in' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => { touchRef.current = null; swipeStartRef.current = null; }}
        onMouseDown={(event) => { if (viewRef.current.scale > 1) { dragRef.current = { x: event.clientX, y: event.clientY }; event.preventDefault(); } }}
        onMouseMove={(event) => {
          if (!dragRef.current) return;
          const prev = dragRef.current;
          dragRef.current = { x: event.clientX, y: event.clientY };
          updateView({ ...viewRef.current, x: viewRef.current.x + event.clientX - prev.x, y: viewRef.current.y + event.clientY - prev.y });
        }}
        onMouseUp={() => { dragRef.current = null; }}
        onMouseLeave={() => { dragRef.current = null; }}
        onDoubleClick={(event) => { zoomAt(viewRef.current.scale > 1 ? 1 : 2.5, event.clientX, event.clientY); }}
        onWheel={(event) => { zoomAt(viewRef.current.scale * (event.deltaY < 0 ? 1.12 : 1 / 1.12), event.clientX, event.clientY); }}
      >
        <img
          src={images[imageIndex]}
          alt={`${alt} (${imageIndex + 1}/${images.length})`}
          draggable={false}
          className="w-full h-full object-contain pointer-events-none select-none"
          style={{ transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})`, transformOrigin: 'center center' }}
        />
      </div>
      <div className="shrink-0 flex flex-col items-center gap-2 px-4 py-3 border-t border-white/10" style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
        {images.length > 1 && (
          <div className="flex items-center justify-center gap-5">
            <button type="button" onClick={() => showImage(imageIndex - 1)} disabled={imageIndex === 0} aria-label="이전 이미지" className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-25 disabled:cursor-not-allowed">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="min-w-16 text-center text-sm font-mono text-white tabular-nums">{imageIndex + 1} / {images.length}</span>
            <button type="button" onClick={() => showImage(imageIndex + 1)} disabled={imageIndex === images.length - 1} aria-label="다음 이미지" className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-25 disabled:cursor-not-allowed">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
        <p className="text-center text-xs text-slate-400">
          {images.length > 1 ? '100%에서는 좌우로 밀어 다음 이미지를 볼 수 있어요. 확대 후에는 이미지를 움직일 수 있어요.' : '두 손가락으로 확대·축소하고, 확대 후 손가락으로 움직여 자세히 볼 수 있어요.'}
        </p>
      </div>
    </div>,
    document.body
  );
};

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [activeImage, setActiveImage] = useState<string>('');
  const [zoomOpen, setZoomOpen] = useState(false);

  useEffect(() => {
    if (project) {
      setActiveImage(project.heroImage || project.thumbnail);
      setZoomOpen(false);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (zoomOpen) setZoomOpen(false);
        else onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, zoomOpen]);

  if (!project) return null;

  const ytId = project.youtubeId || extractYouTubeId(project.videoUrl);

  const allImages = project.galleryImages && project.galleryImages.length > 0 
    ? project.galleryImages 
    : [project.heroImage || project.thumbnail];

  return (
    <>
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
            ) : project.section === 'design' ? (
              <button
                type="button"
                onClick={() => setZoomOpen(true)}
                aria-label="이미지 터치하여 전체 화면으로 확대"
                className="group relative w-full aspect-video sm:aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-black flex items-center justify-center cursor-zoom-in"
              >
                <img
                  src={activeImage || project.heroImage || project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-contain sm:object-cover"
                />
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-black/80 px-3 py-2 text-xs font-semibold text-white border border-white/20 backdrop-blur-sm pointer-events-none">
                  <ZoomIn className="w-4 h-4 text-[var(--accent-color)]" /> 터치하여 확대
                </span>
              </button>
            ) : (
              <div className="relative aspect-video sm:aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-black flex items-center justify-center">
                <img
                  src={activeImage || project.heroImage || project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-contain sm:object-cover"
                />
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
    {zoomOpen && !ytId && project.section === 'design' && (
      <ZoomableImage
        images={allImages}
        initialIndex={Math.max(0, allImages.indexOf(activeImage || project.heroImage || project.thumbnail))}
        alt={project.title}
        onImageChange={setActiveImage}
        onClose={() => setZoomOpen(false)}
      />
    )}
    </>
  );
};
