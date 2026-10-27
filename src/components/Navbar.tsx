import React, { useState, useEffect } from 'react';
import { Sliders, Menu, X, Sparkles, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenCMS: () => void;
  statusBadge: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCMS, statusBadge }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '소개 (About)', href: '#about' },
    { name: '마케팅 (Marketing)', href: '#marketing' },
    { name: '디자인 (Design)', href: '#design' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/85 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Identity */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-lg bg-black border border-white/15 flex items-center justify-center font-mono font-bold text-sm tracking-wider group-hover:border-[var(--accent-color)] transition-colors">
              <span style={{ color: 'var(--accent-color)' }}>HS</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                황산솔
                <span className="hidden sm:inline-block text-xs font-mono px-2 py-0.5 rounded border border-white/10 text-slate-400">
                  Designer & Marketer
                </span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="메인 내비게이션">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--accent-color)] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Admin CMS Trigger & Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCMS}
              className="relative group flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#111115] border border-white/15 text-xs sm:text-sm font-medium text-white hover:border-[var(--accent-color)] transition-all duration-200 shadow-lg cursor-pointer"
              style={{
                boxShadow: '0 0 15px -3px var(--accent-subtle)'
              }}
              aria-label="관리자 CMS 대시보드 열기"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: 'var(--accent-color)' }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: 'var(--accent-color)' }}></span>
              </span>
              <Sliders className="w-3.5 h-3.5" style={{ color: 'var(--accent-color)' }} />
              <span className="font-semibold">관리자 CMS</span>
              <span className="hidden lg:inline text-[11px] text-slate-400 border-l border-white/10 pl-2">
                실시간 편집
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-[#111115] border border-white/10 text-slate-300 hover:text-white"
              aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-[#0f0f13] border border-white/15 shadow-2xl animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                <div className="flex items-center gap-2 px-3 py-1 text-xs text-slate-400">
                  <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--accent-color)' }} />
                  <span>{statusBadge}</span>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCMS();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white"
                  style={{ borderColor: 'var(--accent-color)' }}
                >
                  <Sliders className="w-3.5 h-3.5" style={{ color: 'var(--accent-color)' }} />
                  관리자 대시보드 (CMS) 열기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
