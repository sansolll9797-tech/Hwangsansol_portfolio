import React from 'react';
import { Award, Phone, Mail, Calendar } from 'lucide-react';
import { ThemeConfig, ProfileInfo } from '../types/portfolio';

interface AboutSectionProps {
  theme: ThemeConfig;
  profile: ProfileInfo;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ theme, profile }) => {

  const milestones = [
    {
      period: '에이전시 실무',
      role: 'Marketing & Visual Design',
      org: '전문 마케팅 에이전시 (Marketing Agency)',
      desc: '20+ 병의원 전담 마케팅. 네이버 SEO 및 SNS 비주얼 브랜딩을 통해 잠재 환자의 신규 유입 및 상담 전환 파이프라인을 성공적으로 구축.',
    },
    {
      period: '디자인 외주 & 프로젝트',
      role: 'Visual & Brand Designer',
      org: '어반브레이크, 토이콘 서울, FRANK WAVE 외주 작업',
      desc: '서브컬처 페스티벌 공식 웹 포스터 5종 외주 디자인, 커피바 브랜드 아이덴티티 및 굿즈(스티커, 유리잔, 종이컵) 풀 패키지 제작.',
    },
    {
      period: '의료 & 정보성 디자인',
      role: 'Medical Content Designer',
      org: '산부인과, 안과, 메디컬그룹 등',
      desc: '시술별(필러·보톡스·여드름) 정보성 카드뉴스 제작 및 병·의원 네이버 블로그 풀 와이드 스킨 디자인으로 직관적인 정보 전달.',
    },
  ];

  return (
    <section id="about" className="py-24 relative border-t border-white/5 bg-[#070709]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-color)' }} />
              About Hwang Sansol
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-relaxed sm:leading-[1.4] lg:leading-[1.5]">
              <span className="block mb-2">마케팅으로 신뢰를 쌓고,</span>
              <span style={{ color: 'var(--accent-color)' }}>디자인으로 브랜드 가치를 완성</span>합니다.
            </h2>
          </div>
          <div className="max-w-md text-sm sm:text-base text-slate-400 leading-relaxed">
            {theme.aboutPhilosophy}
          </div>
        </div>

        {/* Real Profile Card (From Portfolio Page 2) */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-[#0c0c11] border border-white/10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Basic Info */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg text-black shrink-0"
                  style={{ backgroundColor: 'var(--accent-color)' }}
                >
                  황
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    {profile.name}
                    <span className="text-xs font-mono text-slate-400 font-normal">
                      / {profile.engName}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">마케터 & 비주얼 디자이너 (Marketer & Designer)</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>{profile.birth}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>{profile.phone}</span>
                </div>
                <div className="col-span-2 flex items-center gap-2 text-slate-300 font-mono">
                  <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="truncate">{profile.email}</span>
                </div>
              </div>
            </div>

            {/* Right: Licenses & Certificates */}
            <div className="lg:col-span-7 pt-4 lg:pt-0 lg:border-l lg:border-white/10 lg:pl-8">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4" style={{ color: 'var(--accent-color)' }} />
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                  Certificates & Licenses (보유 자격증)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {profile.licenses.map((lic, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#14141a] border border-white/5 text-xs">
                    <span className="text-slate-200 font-medium">{lic.title}</span>
                    <span className="text-[11px] font-mono text-slate-500">{lic.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Career & Experience Timeline */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0b0b0e] border border-white/10 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Experience & Track Record</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {milestones.map((item, mIdx) => (
                <div key={mIdx} className="relative flex flex-col justify-between">
                  <div>
                    <span 
                      className="text-xs font-mono font-semibold block mb-2"
                      style={{ color: 'var(--accent-color)' }}
                    >
                      {item.period}
                    </span>
                    <h4 className="text-base font-bold text-white mb-1">
                      {item.role}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium mb-3">
                      {item.org}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
