import { SiteData, Project, ThemeConfig, SEOConfig, SocialLinks, MarketingMetric, ProfileInfo } from '../types/portfolio';

export const DEFAULT_THEME: ThemeConfig = {
  accentColor: '#00FF66',
  headlineScale: 'impact',
  heroBadgeText: 'MARKETER & DESIGNER PORTFOLIO',
  heroHeadline: '황산솔 마케팅 및 디자이너 포트폴리오',
  heroSubheadline: '약 20여 개 병의원 전담 마케팅을 통한 블로그·SNS 신규 유입 실무와, AI 영상·브랜드·그래픽·포스터 비주얼 디자인을 아우르는 황산솔의 포트폴리오입니다.',
  aboutPhilosophy: '마케팅은 고객의 신뢰를 얻어 실제 행동을 유도하고, 디자인은 그 가치를 가장 매력적인 형태로 완성합니다. 전문 에이전시에서 약 20여 개 병의원을 전담하며 검색부터 상담, 최종 신규 유입까지 이어지는 전환 구조를 직접 기획하고 실행했습니다. 이 검증된 마케팅 실무 감각과 감각적인 비주얼 디자인 역량으로 브랜드의 실질적인 가치를 만듭니다.',
  statusBadge: '새로운 프로젝트 협업 및 제안 환영 (Available for Collab)',
};

export const DEFAULT_PROFILE: ProfileInfo = {
  name: '황산솔',
  engName: 'HWANG SAN SOL',
  birth: '1997.09.14',
  phone: '010.8445.6149',
  email: 'sansolll97@naver.com',
  secondaryEmail: 'sansolll9797@gmail.com',
  licenses: [
    { date: '2020.10', title: '컴퓨터그래픽스운용기능사' },
    { date: '2022.02', title: 'GTQ 포토샵 1급' },
    { date: '2018.09', title: '전산응용건축제도기능사' },
    { date: '2026.09', title: 'GA4(Google Analytics Certification)' }
  ],
  skills: ['Photoshop', 'Illustrator', 'Naver Blog SEO', 'Instagram Marketing', 'Content Planning']
};

export const DEFAULT_SEO: SEOConfig = {
  title: '황산솔 마케팅 및 디자이너 포트폴리오 | Hwang Sansol Portfolio',
  description: '약 20여 개 병의원의 신규 유입을 이끌어낸 마케터이자 브랜드·그래픽·포스터·AI 영상 디자이너 황산솔의 포트폴리오',
  keywords: '황산솔, 황산솔 포트폴리오, 마케팅 포트폴리오, 디자이너 포트폴리오, 네이버 블로그 마케팅, 인스타그램 마케팅, 브랜드 디자인, 그래픽 디자인, 포스터 디자인, AI 영상 디자인',
  ogImage: '/assets/pdf-pages/page-04.png',
};

export const DEFAULT_SOCIALS: SocialLinks = {
  email: 'sansolll97@naver.com',
  phone: '010.8445.6149',
  linkedin: 'https://linkedin.com/in/sansol-hwang',
  behance: 'https://behance.net/sansolhwang',
  instagram: 'https://instagram.com/sansol.design',
  github: 'https://github.com/sansol-dev',
};

// YouTube Video ID Extraction Helper
export function extractYouTubeId(url?: string): string | null {
  if (!url) return null;
  const clean = url.trim();
  // Formats: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID, youtube.com/shorts/ID
  const match = clean.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  if (match && match[1]) return match[1];
  if (/^[\w-]{11}$/.test(clean)) return clean;
  return null;
}

// 1. MARKETING PROJECTS (Upper Section)
export const DEFAULT_MARKETING_PROJECTS: Project[] = [
  {
    id: 'proj-medical-mkt',
    title: '20여 개 병원 전담 마케팅 & 신규 환자 유입 파이프라인',
    subtitle: '네이버 블로그 검색 SEO와 인스타그램 비주얼 브랜딩을 결합하여 약 20여 개 병의원의 신규 환자(초진) 유입 파이프라인 구축',
    category: 'marketing',
    categoryLabel: '블로그 & SNS 마케팅',
    section: 'marketing',
    thumbnail: '/assets/pdf-pages/page-11.png',
    heroImage: '/assets/pdf-pages/page-11.png',
    summary: '전문 마케팅 에이전시에서 약 20여 개 병의원을 전담하며, 정보성 블로그 칼럼과 SNS 브랜딩으로 신규 환자 유입 체계를 완성했습니다.',
    description: '환자가 겪는 실제 질환 고민과 시술 니즈를 해결하는 타겟 키워드를 발굴하여 정기적인 전문 칼럼을 기획하고 네이버 검색 상위 노출을 점유했습니다. 동시에 인스타그램을 통해 병원의 신뢰도와 차별화 포인트를 세련된 카드뉴스와 비주얼 에셋으로 디자인하여 긍정적인 브랜드 이미지를 극대화했습니다. 이를 통해 [포털 검색 ➔ 정보성 칼럼 탐독 및 신뢰 형성 ➔ 상담 및 예약 문의 ➔ 신규 환자(초진) 내원]으로 이어지는 마찰 없는 신규 유입 프로세스를 정착시켰습니다.',
    challenge: '단순 의료 광고에 대한 환자의 피로도가 높고 경쟁이 치열한 의료 시장에서, 단순 클릭을 넘어 실제 문의와 방문으로 연결하기 위한 신뢰 형성이 핵심 과제였습니다.',
    solution: '환자의 궁금증을 명쾌하게 해소하는 맞춤형 의료 정보 콘텐츠를 기획하여 전문성과 진정성을 확보하고, 블로그와 SNS를 유기적으로 연계하는 마찰 없는 전환 동선을 설계했습니다.',
    keyMetric: '전담 병의원 20+ 신규 유입 체계 구축',
    metricDetail: '타겟 키워드 검색 상위 노출 다수 점유 · 블로그 포스팅 1,000+ 발행',
    contribution: '블로그 콘텐츠 기획 100% · SNS 비주얼 디자인 100% · 신규 환자 유입 퍼널 설계 100%',
    tools: ['네이버 브랜드 블로그', 'Instagram', '키워드 검색량 분석', 'Photoshop', 'Illustrator'],
    date: '병원 마케팅 실무 프로젝트',
    featured: true
  }
];

// 2. DESIGN PROJECTS (Lower Section - Populated authentically from user's attached portfolio PDF & AI Video)
export const DEFAULT_DESIGN_PROJECTS: Project[] = [
  {
    id: 'proj-ai-video',
    title: 'AI 비주얼 영상 디자인',
    subtitle: 'CHAT GPT, 구글 플로우, 캡컷을 활용한 생성형 AI 유튜브 비디오 제작',
    category: 'video',
    categoryLabel: '영상 디자인 (AI Video)',
    section: 'design',
    videoUrl: 'https://youtu.be/CUXjPawKI88?si=1sSh5MZScwCJkpXi',
    youtubeId: 'CUXjPawKI88',
    thumbnail: 'https://img.youtube.com/vi/CUXjPawKI88/hqdefault.jpg',
    heroImage: 'https://img.youtube.com/vi/CUXjPawKI88/maxresdefault.jpg',
    summary: 'CHAT GPT로 콘셉트 및 시나리오를 기획하고, 구글 플로우와 캡컷을 활용해 연출·편집한 AI 영상 작업물입니다. 클릭 시 유튜브 영상이 바로 재생됩니다.',
    description: '생성형 AI 툴(CHAT GPT, 구글 플로우)과 모션 편집 툴(캡컷)을 결합하여 감각적인 비주얼 스토리텔링과 리드미컬한 영상 템포를 연출한 프로젝트입니다. 클릭 시 유튜브 영상이 즉시 임베드되어 고화질로 스트리밍 재생됩니다.',
    challenge: 'AI 도구들의 시각적 일관성을 유지하면서, 브랜드 무드에 걸맞은 매끄럽고 몰입감 넘치는 비디오 흐름을 구현하는 것이 핵심 과제였습니다.',
    solution: 'CHAT GPT를 통한 시나리오 구조화, 구글 플로우를 통한 시각적 리듬감 연출, 캡컷(CapCut)의 정밀한 컷 편집 및 오디오 싱크를 결합해 완성도 높은 유튜브 영상을 제작했습니다.',
    keyMetric: 'AI 비디오 & 유튜브 스트리밍',
    metricDetail: 'CHAT GPT · 구글 플로우 · 캡컷 활용',
    contribution: 'AI 영상 기획 100% · 프롬프트 및 비주얼 연출 100% · 캡컷 편집 100%',
    tools: ['CHAT GPT', '구글 플로우', '캡컷', 'YouTube'],
    date: 'AI VIDEO DESIGN',
    featured: true
  },
  {
    id: 'proj-frank-wave',
    title: 'FRANK WAVE — 커피바 브랜드 아이덴티티 & 굿즈 디자인',
    subtitle: "커피와 술을 함께 즐기는 매력적인 공간 '꾸밈없는 파도'의 캐주얼 브랜딩 및 패키지 시스템",
    category: 'brand',
    categoryLabel: '가상 브랜드 디자인 (Brand Design)',
    section: 'design',
    thumbnail: '/assets/pdf-pages/page-04.png',
    heroImage: '/assets/pdf-pages/page-04.png',
    galleryImages: [
      '/assets/pdf-pages/page-04.png',
      '/assets/pdf-pages/page-06.png',
      '/assets/pdf-pages/page-07.png',
      '/assets/pdf-pages/page-08.png',
      '/assets/pdf-pages/page-05.png'
    ],
    colors: [
      { hex: '#1A65A8', label: 'Wave Blue (#1A65A8)' },
      { hex: '#EF442E', label: 'Frank Coral (#EF442E)' }
    ],
    keywords: ['pleasure (즐거운)', 'straightforward (솔직한)', 'casual (편안한)'],
    summary: 'FRANK WAVE는 커피콩 머리와 파도 팔을 지닌 캐릭터 로고와 고대비 컬러를 적용한 캐주얼 커피바 통합 브랜딩 프로젝트입니다.',
    description: "FRANK WAVE(플랭크 웨이브)는 '꾸밈없는 파도'라는 뜻으로, 커피와 술을 마시며 꾸밈없이 대화를 나누고, 그 대화로 인해서 마음의 파도를 일으키는 커피바입니다. 머리는 커피콩, 일렁이는 팔은 파도를 모티브로 하여 왼손에는 커피 잔, 오른손에는 칵테일 잔을 든 재치 있는 캐릭터 로고를 제작하였습니다. 캐주얼하고 경쾌한 무드를 위해 대비가 크고 톡톡 튀는 컬러(#1A65A8, #EF442E)를 사용하였으며, 맥북 스티커, 시그니처 글라스, 테이크아웃 종이컵(체커보드 & 웨이브 그래픽), 스탬프 쿠폰 등 다양한 브랜드 굿즈로 확장 전개했습니다.",
    challenge: '낮에는 카페, 밤에는 바(Bar)로 운영되는 하이브리드 공간의 특성을 하나의 일관된 비주얼 아이덴티티로 조화롭게 녹여내는 것이 과제였습니다.',
    solution: '양손에 커피와 칵테일을 든 직관적인 캐릭터와 파도 모티브를 결합하고, 유쾌하고 솔직한(Pleasure & Straightforward) 키워드를 바탕으로 고객 접점 전반에 감각적인 브랜드 경험을 설계했습니다.',
    keyMetric: '브랜드 아이덴티티 & 패키지/굿즈 6종 완결',
    metricDetail: '로고타입, 아이디어 스케치, 스티커, 유리잔, 종이컵, 스탬프 쿠폰',
    contribution: '브랜드 기획 100% · 로고 디자인 100% · 굿즈/패키지 디자인 100%',
    tools: ['Illustrator', 'Photoshop'],
    date: 'BRAND DESIGN',
    featured: true
  },
  {
    id: 'proj-medical-cardnews',
    title: '피부과 정보성 모바일 콘텐츠 디자인',
    subtitle: '시술별 맞춤 컬러와 직관적인 다이어그램으로 정보 구분성을 높인 메디컬 카드뉴스',
    category: 'medical',
    categoryLabel: '메디컬 디자인 (Medical Design)',
    section: 'design',
    thumbnail: '/assets/pdf-pages/page-10.png',
    heroImage: '/assets/pdf-pages/page-10.png',
    summary: '필러, 보톡스, 여드름 치료 등 피부과 주요 시술 콘텐츠에 차별화된 컬러와 그리드를 적용해 사용자가 원하는 정보를 한눈에 탐색할 수 있도록 디자인했습니다.',
    description: '피부과 내원 전 환자가 가장 궁금해하는 핵심 시술(필러, 보톡스, 여드름 치료) 정보를 쉽게 이해할 수 있도록 시술별 맞춤 컬러 코딩과 인포그래픽을 적용했습니다. 효과, 시술 부위, 주의사항(Caution)을 직관적인 다이어그램으로 시각화하여 환자의 인지 부하를 줄이고 병원에 대한 신뢰도를 높였습니다.',
    challenge: '어렵고 복잡한 의학 용어와 방대한 시술 정보로 인해 모바일 화면에서 환자의 이탈이 발생하기 쉬웠습니다.',
    solution: '정보 계층을 [핵심 정의 ➔ 시술 종류 ➔ 타겟 대상 ➔ 주의사항]으로 명확히 구분하고, 시술별 톤앤매너를 다변화하여 가독성을 극대화했습니다.',
    keyMetric: '시술별 3대 테마(필러·보톡스·여드름) 정보 디자인',
    metricDetail: '모바일 최적화 세로형 카드뉴스 레이아웃',
    contribution: '정보 구조 설계 100% · 비주얼 그래픽 디자인 100%',
    tools: ['Photoshop'],
    date: 'MEDICAL DESIGN',
    featured: true
  },
  {
    id: 'proj-medical-blogskin',
    title: '병·의원 네이버 블로그 스킨 디자인',
    subtitle: '예담산부인과, 서울메디컬그룹, 세라산부인과, 삼성밝은안과 등 병원별 아이덴티티를 살린 와이드 스킨',
    category: 'medical',
    categoryLabel: '메디컬 디자인 (Medical Design)',
    section: 'design',
    thumbnail: '/assets/pdf-pages/page-11.png',
    heroImage: '/assets/pdf-pages/page-11.png',
    summary: '병·의원 아이덴티티를 고려한 네이버 블로그 와이드 스킨 디자인을 통해 정보 접근성을 높이고 시각적으로 직관적인 비주얼을 제작했습니다.',
    description: '각 병원만의 진료 철학과 특장점(산부인과, 안과, 메디컬그룹 등)을 반영한 네이버 블로그 풀 와이드 및 타이틀 스킨 디자인입니다. 진료시간, 오시는 길, 예약 전화번호, 전문의 소개 등 환자가 가장 먼저 확인해야 할 핵심 정보의 가독성을 극대화하고 안정감 있는 의료 비주얼 톤을 수립했습니다.',
    challenge: '제한된 네이버 블로그 스킨 규격 안에서 각 병원의 전문성과 신뢰도를 온전히 전달해야 했습니다.',
    solution: '위젯 동선과 타이포그래피 레이아웃을 계산하여, 환자가 첫 화면에서 바로 상담/예약으로 이어질 수 있는 직관적인 UI 구조를 완성했습니다.',
    keyMetric: '다수 진료과목 블로그 와이드 스킨 구축',
    metricDetail: '산부인과, 안과, 내과 등 진료과목별 맞춤 비주얼',
    contribution: '블로그 UI/스킨 디자인 100% · 정보 레이아웃 기획 100%',
    tools: ['Photoshop', 'Illustrator'],
    date: 'MEDICAL DESIGN',
    featured: true
  },
  {
    id: 'proj-urbanbreak-poster',
    title: 'URBAN BREAK & TOYCON SEOUL 웹 포스터 (외주작업)',
    subtitle: '트렌디한 서브컬처 페스티벌 컨셉에 맞춘 외주 클라이언트 인스타그램 웹 포스터 시리즈',
    category: 'poster',
    categoryLabel: '포스터 디자인 (Poster Design)',
    section: 'design',
    thumbnail: '/assets/pdf-pages/page-13.png',
    heroImage: '/assets/pdf-pages/page-13.png',
    client: 'URBAN BREAK & TOYCON SEOUL',
    summary: 'URBAN BREAK와 TOYCON SEOUL 브랜드 컨셉에 맞춰 부스 오픈 및 참여 작가들의 작품을 담아낸 외주 웹 포스터 작업입니다.',
    description: '글로벌 아트페어 URBAN BREAK와 서브컬처 페스티벌 TOYCON SEOUL의 브랜드 아이덴티티를 살린 웹 포스터 디자인 시리즈입니다. GLOBAL ARTIST OPEN CALL, PICK ARTIST, EARLY BIRD 10% TICKET NOW OPEN, BOOTHS NOW OPEN 등 페스티벌의 주요 안내 사항을 톡톡 튀는 타이포그래피와 강렬한 컬러 대비로 표현해 모바일 인스타그램 피드에서 시선을 사로잡도록 디자인했습니다.',
    challenge: '작가들의 다채로운 예술 작품과 티켓/부스 프로모션 텍스트가 시각적으로 충돌하지 않고 강렬한 에너지를 발산하도록 조화시키는 작업이었습니다.',
    solution: '볼드하고 키치한 팝 타이포그래피 프레임워크를 설계하여 정보 전달력과 서브컬처 축제의 역동적인 감성을 동시에 담아냈습니다.',
    keyMetric: '공식 프로모션 웹 포스터 5종 제작',
    metricDetail: '인스타그램 모바일 피드 최적화 외주 클라이언트 프로젝트',
    contribution: '포스터 비주얼 디자인 100% (외주 클라이언트 작업)',
    tools: ['Illustrator', 'Photoshop'],
    date: 'POSTER DESIGN',
    featured: true
  },
  {
    id: 'proj-wine-silhouette',
    title: 'SILHOUETTE — 와인 시음회 포스터',
    subtitle: '와인잔과 바디감, 당도 등 아이코닉한 요소를 미니멀리즘 레이아웃으로 시각화한 감성 포스터',
    category: 'poster',
    categoryLabel: '포스터 디자인 (Poster Design)',
    section: 'design',
    thumbnail: '/assets/pdf-pages/page-14.png',
    heroImage: '/assets/pdf-pages/page-14.png',
    summary: '와인잔의 실루엣과 바디감, 당도의 아이코닉한 그래픽을 미니멀리즘 레이아웃으로 결합하여 행사의 고급스러운 무드를 강조했습니다.',
    description: '시그니처 와인 테이스팅 이벤트를 위해 제작된 대형 전시 포스터 디자인입니다. 와인의 바디감(Body), 당도(Sweetness), 산도 등의 특성을 감각적인 곡선과 다이어그램으로 시각화하고, 거친 텍스처와 세리프 타이포그래피를 조화시켜 행사의 격조 높은 분위기를 완성했습니다.',
    challenge: '단순한 와인 병 사진을 탈피하여, 와인을 마시는 감각적인 미각 경험을 시각적 그래픽으로 추상화하는 것이 핵심이었습니다.',
    solution: '와인잔 실루엣 안의 농도 그래픽과 테크니컬한 좌표 라인을 교차시켜, 미학적이면서도 지적인 무드를 연출했습니다.',
    keyMetric: '대형 배너 및 전시 포스터 디자인',
    metricDetail: '미니멀리즘 레이아웃과 아이코닉 그래픽',
    contribution: '컨셉 기획 100% · 타이포그래피 및 비주얼 그래픽 100%',
    tools: ['Photoshop', 'Illustrator'],
    date: 'POSTER DESIGN',
    featured: false
  },
  {
    id: 'proj-wine-montefalco',
    title: 'di Montefalco — 와인 판매 프로모션 포스터',
    subtitle: '깊이 있는 와인 컬러와 세련된 타이포그래피로 제품의 프리미엄 가치를 직관적으로 전달한 포스터',
    category: 'poster',
    categoryLabel: '포스터 디자인 (Poster Design)',
    section: 'design',
    thumbnail: '/assets/pdf-pages/page-15.png',
    heroImage: '/assets/pdf-pages/page-15.png',
    summary: '깊은 버건디 컬러와 빛의 질감을 활용하여 프리미엄 이탈리아 와인의 풍미와 품격을 직관적으로 표현한 모바일 및 인쇄용 포스터입니다.',
    description: 'di Montefalco 와인의 고급스러운 브랜드 가치를 직관적으로 전달하기 위해 딥 버건디 컬러와 포도 클러스터의 디테일한 텍스처를 배경으로 연출했습니다. 섬세한 캘리그라피와 클래식한 세리프 폰트를 결합하여 구매 욕구를 자극하는 프로모션 비주얼을 완성했습니다.',
    challenge: '디지털 모바일 화면과 인쇄 포스터 모두에서 제품의 무게감과 품격이 손실 없이 전달되어야 했습니다.',
    solution: '드라마틱한 명암 대비와 질감 보정을 통해 시각적 밀도를 높이고, 모바일 스토리 뷰에서도 핵심 텍스트가 돋보이도록 설계했습니다.',
    keyMetric: '프리미엄 와인 프로모션 비주얼',
    metricDetail: '모바일 및 인쇄 매체 겸용 레이아웃',
    contribution: '비주얼 합성 및 레이아웃 디자인 100%',
    tools: ['Photoshop', 'Illustrator'],
    date: 'POSTER DESIGN',
    featured: false
  }
];

export const DEFAULT_METRICS: MarketingMetric[] = [
  {
    id: 'met-1',
    label: '전담 병·의원 (Clients)',
    value: '20+ 병의원',
    growth: '약 20여 개 병의원 전담 마케팅',
    description: '약 20여 개 병의원 블로그 및 SNS 마케팅 채널 전담 관리',
    category: 'Client Scale',
    benchmark: '안정적인 전담 관리'
  },
  {
    id: 'met-2',
    label: '신규 환자 유입 & 전환',
    value: '유입 극대화',
    growth: '검색 ➔ 콘텐츠 ➔ 유입 완결',
    description: '타겟 키워드 검색 점유를 통한 고관여 잠재 환자 상담 및 내원 인입',
    category: 'Channel Growth',
    benchmark: '실제 행동 전환 중심'
  },
  {
    id: 'met-3',
    label: '블로그 콘텐츠 발행 실적',
    value: '블로그 포스팅\n1,000+',
    growth: '콘텐츠 파이프라인 구축',
    description: '병원별 질환·시술 정보성 칼럼 및 네이버 상위 노출 포스팅 1,000+ 발행',
    category: 'Content Output',
    benchmark: '고품질 콘텐츠 기획'
  },
  {
    id: 'met-4',
    label: '브랜드 인게이지먼트',
    value: '신뢰도 제고',
    growth: '채널 활성화 & 환자 소통',
    description: '감각적인 SNS 카드뉴스와 비주얼 에셋을 통한 긍정적 병원 이미지 구축',
    category: 'Brand Trust',
    benchmark: '지속적인 반응 창출'
  }
];

export const DEFAULT_INQUIRIES = [
  {
    id: 'inq-1',
    name: '김태윤 이사',
    email: 'ty.kim@nextfin.io',
    company: '넥스트핀테크',
    subject: '신규 핀테크 모바일 앱 UI/UX 디자인 및 런칭 퍼널 의뢰',
    message: '안녕하세요 산솔님! 포트폴리오를 인상 깊게 보았습니다. 저희 시리즈A 라운드 후 신규 프로덕트 런칭을 앞두고 있어 UI/UX 총괄 및 마케팅 퍼널 세팅 협업을 논의하고 싶습니다.',
    createdAt: '2026-10-25 14:30',
    status: 'new' as const,
  }
];

const STORAGE_KEY = 'hwang_sansol_portfolio_v8'; // Bump to v8 to guarantee latest clean state loads

export function loadSiteData(): SiteData {
  if (typeof window === 'undefined') {
    return {
      theme: DEFAULT_THEME,
      seo: DEFAULT_SEO,
      profile: DEFAULT_PROFILE,
      socials: DEFAULT_SOCIALS,
      marketingProjects: DEFAULT_MARKETING_PROJECTS,
      designProjects: DEFAULT_DESIGN_PROJECTS,
      projects: [...DEFAULT_MARKETING_PROJECTS, ...DEFAULT_DESIGN_PROJECTS],
      metrics: DEFAULT_METRICS,
      inquiries: DEFAULT_INQUIRIES,
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        theme: DEFAULT_THEME,
        seo: DEFAULT_SEO,
        profile: DEFAULT_PROFILE,
        socials: DEFAULT_SOCIALS,
        marketingProjects: DEFAULT_MARKETING_PROJECTS,
        designProjects: DEFAULT_DESIGN_PROJECTS,
        projects: [...DEFAULT_MARKETING_PROJECTS, ...DEFAULT_DESIGN_PROJECTS],
        metrics: DEFAULT_METRICS,
        inquiries: DEFAULT_INQUIRIES,
      };
    }
    const parsed = JSON.parse(raw);
    return {
      theme: { ...DEFAULT_THEME, ...parsed.theme },
      seo: { ...DEFAULT_SEO, ...parsed.seo },
      profile: { ...DEFAULT_PROFILE, ...parsed.profile },
      socials: { ...DEFAULT_SOCIALS, ...parsed.socials },
      marketingProjects: Array.isArray(parsed.marketingProjects) && parsed.marketingProjects.length > 0 
        ? parsed.marketingProjects 
        : DEFAULT_MARKETING_PROJECTS,
      designProjects: Array.isArray(parsed.designProjects) && parsed.designProjects.length > 0 
        ? parsed.designProjects 
        : DEFAULT_DESIGN_PROJECTS,
      projects: [...DEFAULT_MARKETING_PROJECTS, ...DEFAULT_DESIGN_PROJECTS],
      metrics: Array.isArray(parsed.metrics) && parsed.metrics.length > 0 ? parsed.metrics : DEFAULT_METRICS,
      inquiries: Array.isArray(parsed.inquiries) ? parsed.inquiries : DEFAULT_INQUIRIES,
    };
  } catch {
    return {
      theme: DEFAULT_THEME,
      seo: DEFAULT_SEO,
      profile: DEFAULT_PROFILE,
      socials: DEFAULT_SOCIALS,
      marketingProjects: DEFAULT_MARKETING_PROJECTS,
      designProjects: DEFAULT_DESIGN_PROJECTS,
      projects: [...DEFAULT_MARKETING_PROJECTS, ...DEFAULT_DESIGN_PROJECTS],
      metrics: DEFAULT_METRICS,
      inquiries: DEFAULT_INQUIRIES,
    };
  }
}

export function saveSiteData(data: SiteData): boolean {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Failed to save portfolio state', e);
    return false;
  }
}

export function resetSiteData(): SiteData {
  const defaults: SiteData = {
    theme: DEFAULT_THEME,
    seo: DEFAULT_SEO,
    profile: DEFAULT_PROFILE,
    socials: DEFAULT_SOCIALS,
    marketingProjects: DEFAULT_MARKETING_PROJECTS,
    designProjects: DEFAULT_DESIGN_PROJECTS,
    projects: [...DEFAULT_MARKETING_PROJECTS, ...DEFAULT_DESIGN_PROJECTS],
    metrics: DEFAULT_METRICS,
    inquiries: DEFAULT_INQUIRIES,
  };
  saveSiteData(defaults);
  return defaults;
}

// Helper to convert hex to rgba
export function hexToRgba(hex: string, alpha: number): string {
  const sanitized = hex.replace('#', '');
  if (sanitized.length !== 6 && sanitized.length !== 3) {
    return `rgba(0, 255, 102, ${alpha})`;
  }
  let r: number, g: number, b: number;
  if (sanitized.length === 3) {
    r = parseInt(sanitized[0] + sanitized[0], 16);
    g = parseInt(sanitized[1] + sanitized[1], 16);
    b = parseInt(sanitized[2] + sanitized[2], 16);
  } else {
    r = parseInt(sanitized.substring(0, 2), 16);
    g = parseInt(sanitized.substring(2, 4), 16);
    b = parseInt(sanitized.substring(4, 6), 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Sync theme colors with CSS variables
export function applyThemeToDOM(theme: ThemeConfig): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const hex = theme.accentColor || '#00FF66';
  root.style.setProperty('--accent-color', hex);
  root.style.setProperty('--accent-glow', hexToRgba(hex, 0.4));
  root.style.setProperty('--accent-subtle', hexToRgba(hex, 0.12));
}

// Sync SEO tags with DOM
export function applySEOToDOM(seo: SEOConfig): void {
  if (typeof document === 'undefined') return;
  document.title = seo.title;
  
  const updateMeta = (selector: string, attr: string, value: string) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      const isProperty = selector.includes('property=');
      if (isProperty) {
        const propName = selector.match(/property="([^"]+)"/)?.[1];
        if (propName) el.setAttribute('property', propName);
      } else {
        const name = selector.match(/name="([^"]+)"/)?.[1];
        if (name) el.setAttribute('name', name);
      }
      document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
  };

  updateMeta('meta[name="description"]', 'content', seo.description);
  updateMeta('meta[name="keywords"]', 'content', seo.keywords);
  updateMeta('meta[property="og:title"]', 'content', seo.title);
  updateMeta('meta[property="og:description"]', 'content', seo.description);
  if (seo.ogImage) {
    updateMeta('meta[property="og:image"]', 'content', seo.ogImage);
  }
}

// Pure helper to filter projects
export function filterProjects(projects: Project[], category: string, searchQuery: string = ''): Project[] {
  return projects.filter(p => {
    const matchesCategory = category === 'all' || p.category === category;
    const matchesQuery = !searchQuery.trim() || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tools.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });
}

// Curated Unsplash images for quick project selection in CMS
export const CURATED_PROJECT_IMAGES = [
  { label: 'FRANK WAVE 커피바 브랜딩', url: '/assets/pdf-pages/page-04.png' },
  { label: '피부과 정보성 카드뉴스', url: '/assets/pdf-pages/page-10.png' },
  { label: '병·의원 네이버 블로그 스킨', url: '/assets/pdf-pages/page-11.png' },
  { label: '어반브레이크 웹포스터', url: '/assets/pdf-pages/page-13.png' },
  { label: '와인 시음회 포스터', url: '/assets/pdf-pages/page-14.png' },
  { label: '와인 판매 포스터', url: '/assets/pdf-pages/page-15.png' },
  { label: 'FRANK WAVE 굿즈', url: '/assets/pdf-pages/page-08.png' },
  { label: 'FRANK WAVE 스케치 & 로고', url: '/assets/pdf-pages/page-06.png' }
];

export const COLOR_PRESETS = [
  { name: '네온 그린 (Neon Green)', hex: '#00FF66' },
  { name: '사이버 사이언 (Cyber Cyan)', hex: '#00F0FF' },
  { name: '일렉트릭 바이올렛 (Electric Violet)', hex: '#B026FF' },
  { name: '래디언트 오렌지 (Radiant Orange)', hex: '#FF6B00' },
  { name: '하이퍼 핑크 (Hyper Pink)', hex: '#FF0055' },
  { name: '에시드 옐로우 (Acid Yellow)', hex: '#E2F705' }
];
