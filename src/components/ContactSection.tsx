import React, { useState } from 'react';
import { Mail, ArrowUp, ArrowUpRight, FileText, Image as ImageIcon } from 'lucide-react';
import { SocialLinks } from '../types/portfolio';

interface ContactSectionProps {
  socials: SocialLinks;
  onCopyEmail: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  socials,
  onCopyEmail,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopyEmail();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative py-12 bg-[#050505] border-t border-white/10 cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Documents / PDF — shown above the original footer content */}
        <div className="pb-12 mb-10 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="h-2 w-2 rounded-full bg-[#00FF66] shadow-[0_0_12px_#00FF66]" />
                <span className="text-[11px] sm:text-xs font-mono tracking-[0.18em] text-cyan-200">
                  DOCUMENTS / PDF
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                이력서와 <span className="text-[#00FF66]">디자인 작업물</span> 보기
              </h2>
            </div>
            <p className="max-w-xs text-sm text-slate-400 leading-relaxed md:text-right">
              채용 검토에 필요한 이력서와 디자인 작업물을<br className="hidden sm:block" />
              PDF로 확인할 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="이력서 PDF 새 탭에서 열기"
              className="group flex items-center gap-4 rounded-[20px] border border-emerald-200/20 bg-[#0b1510]/95 px-5 py-5 sm:px-6 sm:py-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#00FF66]/60 hover:bg-[#0e1c14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF66]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-[#00FF66]">
                <FileText className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 text-[11px] font-mono font-semibold tracking-[0.12em] text-[#00FF66]">RESUME · PDF</div>
                <h3 className="text-lg sm:text-xl font-bold text-white">이력서</h3>
                <p className="mt-1 text-xs text-slate-400">경력 · 역량 · 자격증</p>
              </div>
              <ArrowUpRight className="h-6 w-6 shrink-0 text-[#00FF66] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>

            <a
              href="/design-portfolio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="디자인 포트폴리오 PDF 새 탭에서 열기"
              className="group flex items-center gap-4 rounded-[20px] border border-purple-300/20 bg-[#151019]/95 px-5 py-5 sm:px-6 sm:py-6 transition-all duration-200 hover:-translate-y-1 hover:border-purple-400/60 hover:bg-[#1b1322] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-purple-400/30 bg-purple-400/10 text-purple-400">
                <ImageIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 text-[11px] font-mono font-semibold tracking-[0.12em] text-purple-400">DESIGN PORTFOLIO · PDF</div>
                <h3 className="text-lg sm:text-xl font-bold text-white">디자인 포트폴리오</h3>
                <p className="mt-1 text-xs text-slate-400">브랜드 · 그래픽 · 포스터 디자인</p>
              </div>
              <ArrowUpRight className="h-6 w-6 shrink-0 text-purple-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-black font-mono"
              style={{ backgroundColor: 'var(--accent-color)' }}
            >
              HS
            </div>
            <div>
              <div className="text-base font-bold text-white tracking-tight">
                황산솔 <span className="text-xs text-slate-400 font-normal">/ HWANG SAN SOL</span>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                Marketer & Visual Designer Portfolio
              </div>
            </div>
          </div>

          {/* Quick Contact & Email */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#111116] border border-white/10 text-xs">
              <Mail className="w-4 h-4 text-slate-400" />
              <span className="font-mono text-slate-300">{socials.email}</span>
              <button
                onClick={handleCopy}
                className="ml-1 text-[11px] font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="이메일 복사"
              >
                {copied ? (
                  <span style={{ color: 'var(--accent-color)' }}>복사됨</span>
                ) : (
                  <span>복사</span>
                )}
              </button>
            </div>


          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} 황산솔 (Hwang Sansol). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono">Marketing & Visual Design Portfolio</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              aria-label="맨 위로 이동"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>TOP</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
