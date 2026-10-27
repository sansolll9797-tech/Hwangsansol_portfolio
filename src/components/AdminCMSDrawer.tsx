import React, { useState } from 'react';
import { 
  X, 
  FolderKanban, 
  Paintbrush, 
  Search, 
  Share2, 
  Mail, 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  Check, 
  ExternalLink, 
  Image as ImageIcon,
  Sparkles,
  Sliders,
  AlertTriangle
} from 'lucide-react';
import { 
  SiteData, 
  Project, 
  ThemeConfig, 
  SEOConfig, 
  SocialLinks 
} from '../types/portfolio';
import { 
  COLOR_PRESETS, 
  CURATED_PROJECT_IMAGES,
  extractYouTubeId
} from '../utils/portfolio-data';

interface AdminCMSDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  siteData: SiteData;
  onUpdateSiteData: (newData: SiteData) => void;
  onResetDefaults: () => void;
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;
  prefillNewProject?: boolean;
}

export const AdminCMSDrawer: React.FC<AdminCMSDrawerProps> = ({
  isOpen,
  onClose,
  siteData,
  onUpdateSiteData,
  onResetDefaults,
  showToast,
  prefillNewProject = false,
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'theme' | 'seo' | 'socials' | 'inquiries'>('projects');
  
  // Project editing state
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(prefillNewProject);
  
  const initialProjectForm: Partial<Project> = {
    title: '',
    subtitle: '',
    category: 'video',
    categoryLabel: '영상 디자인 (AI Video)',
    videoUrl: '',
    youtubeId: '',
    thumbnail: CURATED_PROJECT_IMAGES[0].url,
    heroImage: CURATED_PROJECT_IMAGES[0].url,
    summary: '',
    description: '',
    challenge: '',
    solution: '',
    keyMetric: '',
    metricDetail: '',
    contribution: 'AI 영상 기획 100% · 컷 편집 100%',
    tools: ['Runway Gen-3', 'Midjourney', 'Premiere Pro'],
    link: '',
    date: '2025 - 2026',
  };

  const [projectForm, setProjectForm] = useState<Partial<Project>>(initialProjectForm);
  const [toolsInput, setToolsInput] = useState<string>('Figma, GA4');

  if (!isOpen) return null;

  // Project CRUD Handlers
  const handleStartAdd = () => {
    setProjectForm(initialProjectForm);
    setToolsInput('Figma, GA4');
    setEditingProjectId(null);
    setIsAddingNew(true);
  };

  const handleStartEdit = (proj: Project) => {
    setProjectForm({ ...proj });
    setToolsInput(proj.tools.join(', '));
    setEditingProjectId(proj.id);
    setIsAddingNew(false);
  };

  const handleCancelProjectForm = () => {
    setProjectForm(initialProjectForm);
    setEditingProjectId(null);
    setIsAddingNew(false);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title?.trim() || !projectForm.summary?.trim() || !projectForm.keyMetric?.trim()) {
      showToast('프로젝트명, 요약, 핵심 성과 지표는 필수 입력 항목입니다.', 'error');
      return;
    }

    const categoryLabels: Record<string, string> = {
      video: '영상 디자인 (AI Video)',
      brand: '브랜드 디자인 (Brand)',
      medical: '메디컬 디자인 (Medical)',
      poster: '포스터 디자인 (Poster)',
      marketing: '블로그 & SNS 마케팅',
      uiux: 'UI·UX 디자인',
      performance: '퍼포먼스 마케팅',
      campaign: '콘텐츠/캠페인',
    };

    const parsedTools = toolsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const categoryKey = (projectForm.category || 'video') as string;
    const categoryLabel = categoryLabels[categoryKey] || '디자인 프로젝트';
    const section = categoryKey === 'marketing' ? 'marketing' : 'design';
    const ytId = projectForm.youtubeId || extractYouTubeId(projectForm.videoUrl);

    if (isAddingNew) {
      const newProj: Project = {
        id: `proj-${Date.now()}`,
        title: projectForm.title || '새 프로젝트',
        subtitle: projectForm.subtitle || projectForm.summary || '',
        category: categoryKey as any,
        categoryLabel,
        section,
        videoUrl: projectForm.videoUrl || '',
        youtubeId: ytId || undefined,
        thumbnail: projectForm.thumbnail || CURATED_PROJECT_IMAGES[0].url,
        heroImage: projectForm.heroImage || projectForm.thumbnail || CURATED_PROJECT_IMAGES[0].url,
        summary: projectForm.summary || '',
        description: projectForm.description || projectForm.summary || '',
        challenge: projectForm.challenge || '브랜드 아이덴티티 및 비주얼 임팩트 극대화',
        solution: projectForm.solution || '생성형 AI 모델 및 감각적인 모션/그래픽 연출 적용',
        keyMetric: projectForm.keyMetric || 'AI 영상 스트리밍',
        metricDetail: projectForm.metricDetail || '',
        contribution: projectForm.contribution || '디자인 100%',
        tools: parsedTools.length > 0 ? parsedTools : ['Runway Gen-3', 'Midjourney'],
        link: projectForm.link || '',
        date: projectForm.date || '2025 - 2026',
      };

      const updatedProjects = [newProj, ...siteData.projects];
      const updatedDesign = section === 'design' 
        ? [newProj, ...(siteData.designProjects || [])] 
        : (siteData.designProjects || []);
      const updatedMarketing = section === 'marketing' 
        ? [newProj, ...(siteData.marketingProjects || [])] 
        : (siteData.marketingProjects || []);

      onUpdateSiteData({ 
        ...siteData, 
        projects: updatedProjects,
        designProjects: updatedDesign,
        marketingProjects: updatedMarketing,
      });
      showToast('새 프로젝트가 성공적으로 등록되었습니다!', 'success');
      handleCancelProjectForm();
    } else if (editingProjectId) {
      const updatedItem: Project = {
        ...(siteData.projects.find((p) => p.id === editingProjectId) || {}),
        ...projectForm,
        category: categoryKey as any,
        categoryLabel,
        section,
        videoUrl: projectForm.videoUrl || '',
        youtubeId: ytId || undefined,
        tools: parsedTools.length > 0 ? parsedTools : (projectForm.tools || ['Photoshop']),
      } as Project;

      const updatedProjects = siteData.projects.map((p) => (p.id === editingProjectId ? updatedItem : p));
      const updatedDesign = (siteData.designProjects || []).map((p) => (p.id === editingProjectId ? updatedItem : p));
      const updatedMarketing = (siteData.marketingProjects || []).map((p) => (p.id === editingProjectId ? updatedItem : p));

      onUpdateSiteData({ 
        ...siteData, 
        projects: updatedProjects,
        designProjects: updatedDesign,
        marketingProjects: updatedMarketing,
      });
      showToast('프로젝트 수정 사항이 저장되었습니다.', 'success');
      handleCancelProjectForm();
    }
  };

  const handleDeleteProject = (id: string, title: string) => {
    if (confirm(`'${title}' 프로젝트를 삭제하시겠습니까?`)) {
      const updatedProjects = siteData.projects.filter((p) => p.id !== id);
      const updatedDesign = (siteData.designProjects || []).filter((p) => p.id !== id);
      const updatedMarketing = (siteData.marketingProjects || []).filter((p) => p.id !== id);

      onUpdateSiteData({ 
        ...siteData, 
        projects: updatedProjects,
        designProjects: updatedDesign,
        marketingProjects: updatedMarketing,
      });
      showToast('프로젝트가 삭제되었습니다.', 'info');
      if (editingProjectId === id) {
        handleCancelProjectForm();
      }
    }
  };

  // Theme Updates
  const handleUpdateTheme = (updates: Partial<ThemeConfig>) => {
    const updatedTheme = { ...siteData.theme, ...updates };
    onUpdateSiteData({ ...siteData, theme: updatedTheme });
  };

  // SEO Updates
  const handleUpdateSEO = (updates: Partial<SEOConfig>) => {
    const updatedSEO = { ...siteData.seo, ...updates };
    onUpdateSiteData({ ...siteData, seo: updatedSEO });
  };

  // Socials Updates
  const handleUpdateSocials = (updates: Partial<SocialLinks>) => {
    const updatedSocials = { ...siteData.socials, ...updates };
    onUpdateSiteData({ ...siteData, socials: updatedSocials });
  };

  // Delete inquiry
  const handleDeleteInquiry = (id: string) => {
    const updated = siteData.inquiries.filter((inq) => inq.id !== id);
    onUpdateSiteData({ ...siteData, inquiries: updated });
    showToast('문의 내역이 삭제되었습니다.', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-2xl bg-[#09090c] border-l border-white/10 shadow-2xl flex flex-col text-slate-200">
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/10 bg-[#0e0e13] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-black"
                style={{ backgroundColor: 'var(--accent-color)' }}
              >
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  관리자 대시보드 (CMS)
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    실시간 동기화
                  </span>
                </h2>
                <p className="text-xs text-slate-400">포트폴리오 콘텐츠 및 디자인을 실시간으로 관리합니다</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (confirm('모든 프로젝트 및 설정을 초기 기본 데이터로 리셋하시겠습니까?')) {
                    onResetDefaults();
                    showToast('기본 데이터로 초기화되었습니다.', 'info');
                  }
                }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                title="기본값으로 초기화"
                aria-label="기본값으로 초기화"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="CMS 대시보드 닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 px-6 border-b border-white/10 bg-[#0b0b0f] overflow-x-auto scrollbar-none shrink-0" role="tablist">
            {[
              { id: 'projects', label: '프로젝트 관리 (CRUD)', icon: FolderKanban, count: siteData.projects.length },
              { id: 'theme', label: '디자인 & 테마', icon: Paintbrush },
              { id: 'seo', label: 'SEO & 메타', icon: Search },
              { id: 'socials', label: '소셜 & 연락처', icon: Share2 },
              { id: 'inquiries', label: '수신 문의', icon: Mail, count: siteData.inquiries.length },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  role="tab"
                  aria-selected={isActive}
                  className={`flex items-center gap-2 px-3.5 py-3 text-xs font-medium border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'border-[var(--accent-color)] text-white font-semibold'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: isActive ? 'var(--accent-color)' : undefined }} />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-slate-300">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* TAB 1: PROJECTS CRUD */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                {!isAddingNew && !editingProjectId ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400">
                        총 {siteData.projects.length}개의 프로젝트가 등록되어 있습니다.
                      </span>
                      <button
                        onClick={handleStartAdd}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-black transition-all cursor-pointer hover:brightness-110"
                        style={{ backgroundColor: 'var(--accent-color)' }}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>새 프로젝트 추가</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {siteData.projects.map((proj) => (
                        <div
                          key={proj.id}
                          className="p-4 rounded-xl bg-[#121217] border border-white/10 hover:border-white/20 transition-all flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <img
                              src={proj.thumbnail}
                              alt={proj.title}
                              className="w-14 h-14 rounded-lg object-cover shrink-0 border border-white/10"
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                                  {proj.categoryLabel}
                                </span>
                                <span className="text-xs font-mono font-bold text-[var(--accent-color)]">
                                  {proj.keyMetric}
                                </span>
                              </div>
                              <h4 className="text-sm font-bold text-white truncate">{proj.title}</h4>
                              <p className="text-xs text-slate-400 truncate">{proj.summary}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => handleStartEdit(proj)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                              title="수정하기"
                              aria-label={`'${proj.title}' 수정하기`}
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(proj.id, proj.title)}
                              className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                              title="삭제하기"
                              aria-label={`'${proj.title}' 삭제하기`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  /* Project Form (Add / Edit) */
                  <form onSubmit={handleSaveProject} className="space-y-5 bg-[#0e0e13] p-5 rounded-2xl border border-white/10">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <h3 className="text-sm font-bold text-white">
                        {isAddingNew ? '새 프로젝트 추가하기' : '프로젝트 수정하기'}
                      </h3>
                      <button
                        type="button"
                        onClick={handleCancelProjectForm}
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        취소
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          프로젝트 제목 <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={projectForm.title || ''}
                          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                          placeholder="예: Aether Pay — 핀테크 디자인 시스템"
                          className="w-full px-3.5 py-2 rounded-xl bg-[#15151c] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-color)]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">카테고리</label>
                        <select
                          value={projectForm.category || 'video'}
                          onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                          className="w-full px-3.5 py-2 rounded-xl bg-[#15151c] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-color)]"
                        >
                          <option value="video">영상 디자인 (AI Video)</option>
                          <option value="brand">브랜드 디자인 (Brand)</option>
                          <option value="medical">메디컬 디자인 (Medical)</option>
                          <option value="poster">포스터 디자인 (Poster)</option>
                          <option value="marketing">마케팅 (Marketing)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">프로젝트 날짜/기간</label>
                        <input
                          type="text"
                          value={projectForm.date || ''}
                          onChange={(e) => setProjectForm({ ...projectForm, date: e.target.value })}
                          placeholder="예: 2025 - 2026"
                          className="w-full px-3.5 py-2 rounded-xl bg-[#15151c] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-color)]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-mono text-slate-300 mb-1 flex items-center justify-between">
                          <span>YouTube 영상 URL (영상 디자인 업로드 시 필수)</span>
                          <span className="text-[10px] text-red-400 font-sans">유튜브 링크 입력 시 모달에서 즉시 재생</span>
                        </label>
                        <input
                          type="url"
                          value={projectForm.videoUrl || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            const yt = extractYouTubeId(val);
                            setProjectForm({ 
                              ...projectForm, 
                              videoUrl: val, 
                              youtubeId: yt || undefined 
                            });
                          }}
                          placeholder="https://www.youtube.com/watch?v=... 또는 https://youtu.be/..."
                          className="w-full px-3.5 py-2 rounded-xl bg-[#15151c] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-color)] font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          핵심 성과 지표 (Key Metric) <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={projectForm.keyMetric || ''}
                          onChange={(e) => setProjectForm({ ...projectForm, keyMetric: e.target.value })}
                          placeholder="예: 온보딩 완료율 +142% / ROAS 420%"
                          className="w-full px-3.5 py-2 rounded-xl bg-[#15151c] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-color)]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">성과 보조 설명</label>
                        <input
                          type="text"
                          value={projectForm.metricDetail || ''}
                          onChange={(e) => setProjectForm({ ...projectForm, metricDetail: e.target.value })}
                          placeholder="예: 이탈률 48% → 13% 감소"
                          className="w-full px-3.5 py-2 rounded-xl bg-[#15151c] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-color)]"
                        />
                      </div>
                    </div>

                    {/* Unsplash Preset Picker */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>썸네일 이미지 선택 (또는 직접 URL 입력)</span>
                        </label>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="url"
                          value={projectForm.thumbnail || ''}
                          onChange={(e) => setProjectForm({ ...projectForm, thumbnail: e.target.value, heroImage: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="flex-1 px-3.5 py-2 rounded-xl bg-[#15151c] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-color)] font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {CURATED_PROJECT_IMAGES.map((img, idx) => (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => setProjectForm({ ...projectForm, thumbnail: img.url, heroImage: img.url })}
                            className={`group relative aspect-video rounded-lg overflow-hidden border transition-all ${
                              projectForm.thumbnail === img.url
                                ? 'border-[var(--accent-color)] ring-1 ring-[var(--accent-color)]'
                                : 'border-white/10 hover:border-white/30'
                            }`}
                          >
                            <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                            <span className="absolute inset-x-0 bottom-0 bg-black/80 text-[9px] p-0.5 text-center truncate text-slate-300">
                              {img.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        한 줄 요약 (Summary) <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={projectForm.summary || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, summary: e.target.value })}
                        placeholder="카드에 노출될 직관적인 한 줄 요약"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#15151c] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-color)]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">상세 문제 해결 및 실행 내용</label>
                      <textarea
                        rows={3}
                        value={projectForm.solution || projectForm.description || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value, description: e.target.value })}
                        placeholder="어떤 디자인/마케팅 가설을 세우고 어떻게 실행했는지 설명하세요."
                        className="w-full px-3.5 py-2 rounded-xl bg-[#15151c] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-color)] resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">사용 툴 (쉼표 구분)</label>
                        <input
                          type="text"
                          value={toolsInput}
                          onChange={(e) => setToolsInput(e.target.value)}
                          placeholder="Figma, Blender, GA4, Meta Ads"
                          className="w-full px-3.5 py-2 rounded-xl bg-[#15151c] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-color)]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">외부 링크 (선택)</label>
                        <input
                          type="url"
                          value={projectForm.link || ''}
                          onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                          placeholder="https://..."
                          className="w-full px-3.5 py-2 rounded-xl bg-[#15151c] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-color)]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={handleCancelProjectForm}
                        className="px-4 py-2 rounded-xl text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                      >
                        취소
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl text-xs font-semibold text-black transition-all hover:brightness-110"
                        style={{ backgroundColor: 'var(--accent-color)' }}
                      >
                        {isAddingNew ? '프로젝트 저장하기' : '변경사항 저장하기'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 2: DESIGN & THEME */}
            {activeTab === 'theme' && (
              <div className="space-y-6">
                {/* Accent Color Preset Picker */}
                <div className="p-5 rounded-2xl bg-[#0e0e13] border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-bold text-white mb-0.5">포인트 액센트 컬러 (Neon Accent)</h4>
                      <p className="text-xs text-slate-400">웹사이트 전체 버튼, 배지, 글로우 효과에 즉시 적용됩니다</p>
                    </div>
                    <div 
                      className="w-7 h-7 rounded-full border border-white/30 shadow-md"
                      style={{ backgroundColor: siteData.theme.accentColor }}
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                    {COLOR_PRESETS.map((color) => {
                      const isSelected = siteData.theme.accentColor.toLowerCase() === color.hex.toLowerCase();
                      return (
                        <button
                          key={color.hex}
                          onClick={() => {
                            handleUpdateTheme({ accentColor: color.hex });
                            showToast(`테마 컬러가 ${color.name}으로 변경되었습니다.`, 'success');
                          }}
                          className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-medium transition-all text-left ${
                            isSelected
                              ? 'bg-white/10 border-white/40 text-white'
                              : 'bg-[#141419] border-white/5 text-slate-300 hover:border-white/20'
                          }`}
                        >
                          <span 
                            className="w-4 h-4 rounded-full shrink-0" 
                            style={{ backgroundColor: color.hex, boxShadow: `0 0 8px ${color.hex}` }} 
                          />
                          <span className="truncate">{color.name.split(' ')[0]}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Hex Input */}
                  <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                    <span className="text-xs font-mono text-slate-400">직접 HEX 입력:</span>
                    <input
                      type="text"
                      value={siteData.theme.accentColor}
                      onChange={(e) => handleUpdateTheme({ accentColor: e.target.value })}
                      placeholder="#00FF66"
                      className="px-3 py-1.5 rounded-lg bg-[#15151c] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[var(--accent-color)] w-32"
                    />
                    <input
                      type="color"
                      value={siteData.theme.accentColor}
                      onChange={(e) => handleUpdateTheme({ accentColor: e.target.value })}
                      className="w-8 h-8 rounded border-0 bg-transparent cursor-pointer"
                      aria-label="포인트 액센트 컬러 선택기"
                    />
                  </div>
                </div>

                {/* Typography Scale */}
                <div className="p-5 rounded-2xl bg-[#0e0e13] border border-white/10">
                  <h4 className="text-sm font-bold text-white mb-1">헤드라인 타이포그래피 스케일</h4>
                  <p className="text-xs text-slate-400 mb-4">메인 히어로 타이틀의 시각적 크기 강도를 조절합니다</p>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'compact', label: '컴팩트 (Compact)' },
                      { id: 'normal', label: '노멀 (Standard)' },
                      { id: 'impact', label: '임팩트 대형 (Impact)' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleUpdateTheme({ headlineScale: opt.id as any })}
                        className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                          siteData.theme.headlineScale === opt.id
                            ? 'bg-white/15 border-[var(--accent-color)] text-white'
                            : 'bg-[#141419] border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Copy Customization */}
                <div className="p-5 rounded-2xl bg-[#0e0e13] border border-white/10 space-y-4">
                  <h4 className="text-sm font-bold text-white mb-2">실시간 헤드라인 & 소개 문구 편집</h4>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">상단 역할 배지 텍스트</label>
                    <input
                      type="text"
                      value={siteData.theme.heroBadgeText}
                      onChange={(e) => handleUpdateTheme({ heroBadgeText: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#15151c] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-color)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">히어로 메인 헤드라인</label>
                    <textarea
                      rows={2}
                      value={siteData.theme.heroHeadline}
                      onChange={(e) => handleUpdateTheme({ heroHeadline: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#15151c] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-color)] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">히어로 서브 설명</label>
                    <textarea
                      rows={2}
                      value={siteData.theme.heroSubheadline}
                      onChange={(e) => handleUpdateTheme({ heroSubheadline: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#15151c] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-color)] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">크리에이터 철학 (About Philosophy)</label>
                    <textarea
                      rows={3}
                      value={siteData.theme.aboutPhilosophy}
                      onChange={(e) => handleUpdateTheme({ aboutPhilosophy: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#15151c] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-color)] resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: SEO & METADATA */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                {/* Live Google Search Preview */}
                <div className="p-5 rounded-2xl bg-[#0e0e13] border border-white/10">
                  <div className="text-xs font-mono text-slate-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-sky-400" />
                    <span>Google 검색 결과 실시간 미리보기 (SERP Preview)</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#18181f] border border-white/5 space-y-1.5 font-sans">
                    <div className="text-xs text-slate-400 truncate">https://sansol.design › portfolio</div>
                    <div className="text-sm font-semibold text-blue-400 hover:underline cursor-pointer truncate">
                      {siteData.seo.title}
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2">
                      {siteData.seo.description}
                    </p>
                  </div>
                </div>

                {/* SEO Input Fields */}
                <div className="p-5 rounded-2xl bg-[#0e0e13] border border-white/10 space-y-4">
                  <h4 className="text-sm font-bold text-white mb-2">메타 태그 설정</h4>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">웹페이지 제목 (Page & OG Title)</label>
                    <input
                      type="text"
                      value={siteData.seo.title}
                      onChange={(e) => handleUpdateSEO({ title: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#15151c] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-color)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">메타 설명 (Meta Description)</label>
                    <textarea
                      rows={3}
                      value={siteData.seo.description}
                      onChange={(e) => handleUpdateSEO({ description: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#15151c] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-color)] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">키워드 (쉼표 구분)</label>
                    <input
                      type="text"
                      value={siteData.seo.keywords}
                      onChange={(e) => handleUpdateSEO({ keywords: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#15151c] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-color)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">소셜 공유 이미지 URL (og:image)</label>
                    <input
                      type="url"
                      value={siteData.seo.ogImage}
                      onChange={(e) => handleUpdateSEO({ ogImage: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#15151c] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-color)] font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: SOCIALS & CONTACT */}
            {activeTab === 'socials' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-[#0e0e13] border border-white/10 space-y-4">
                  <h4 className="text-sm font-bold text-white mb-2">연락처 및 소셜 미디어 링크 관리</h4>
                  <p className="text-xs text-slate-400 mb-4">입력하신 링크는 웹사이트 푸터 및 문의 섹션에 즉각 반영됩니다.</p>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">대표 이메일 주소</label>
                    <input
                      type="email"
                      value={siteData.socials.email}
                      onChange={(e) => handleUpdateSocials({ email: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#15151c] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-color)] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">LinkedIn 프로필 URL</label>
                    <input
                      type="url"
                      value={siteData.socials.linkedin}
                      onChange={(e) => handleUpdateSocials({ linkedin: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#15151c] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-color)] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Behance 포트폴리오 URL</label>
                    <input
                      type="url"
                      value={siteData.socials.behance}
                      onChange={(e) => handleUpdateSocials({ behance: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#15151c] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-color)] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Instagram 프로필 URL</label>
                    <input
                      type="url"
                      value={siteData.socials.instagram}
                      onChange={(e) => handleUpdateSocials({ instagram: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#15151c] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-color)] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">GitHub 프로필 URL</label>
                    <input
                      type="url"
                      value={siteData.socials.github}
                      onChange={(e) => handleUpdateSocials({ github: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#15151c] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-color)] font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: INQUIRIES INBOX */}
            {activeTab === 'inquiries' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    접수된 문의 총 {siteData.inquiries.length}건
                  </span>
                </div>

                {siteData.inquiries.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-[#0e0e13] border border-white/5 text-center text-xs text-slate-400">
                    접수된 문의 내역이 없습니다.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {siteData.inquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="p-4 rounded-xl bg-[#121217] border border-white/10 hover:border-white/20 transition-all space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">{inq.name}</span>
                            {inq.company && (
                              <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-slate-400">
                                {inq.company}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-slate-500">{inq.createdAt}</span>
                            <button
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                              title="삭제"
                              aria-label="문의 삭제"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="text-xs font-mono text-[var(--accent-color)]">{inq.email}</div>
                        <div className="text-xs font-semibold text-slate-200">{inq.subject}</div>
                        <p className="text-xs text-slate-300 bg-[#0a0a0d] p-3 rounded-lg border border-white/5 whitespace-pre-line leading-relaxed">
                          {inq.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
