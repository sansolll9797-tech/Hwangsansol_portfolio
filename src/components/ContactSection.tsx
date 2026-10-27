import React, { useState } from 'react';
import { Mail, ArrowUp, Send } from 'lucide-react';
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

            <a
              href={`mailto:${socials.email}`}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-black transition-all hover:brightness-110 cursor-pointer flex items-center gap-1.5"
              style={{ backgroundColor: 'var(--accent-color)' }}
            >
              <Send className="w-3.5 h-3.5" />
              <span>메일 쓰기</span>
            </a>
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
