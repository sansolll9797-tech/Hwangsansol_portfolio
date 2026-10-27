import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  DEFAULT_DESIGN_PROJECTS, 
  DEFAULT_MARKETING_PROJECTS, 
  DEFAULT_THEME, 
  filterProjects, 
  hexToRgba,
  extractYouTubeId 
} from './portfolio-data';

test('DEFAULT_DESIGN_PROJECTS contains works from user PDF and AI Video', () => {
  assert.ok(DEFAULT_DESIGN_PROJECTS.length >= 5, 'Should have at least 5 design projects');
  
  const videoProj = DEFAULT_DESIGN_PROJECTS.find(p => p.category === 'video');
  const brandProj = DEFAULT_DESIGN_PROJECTS.find(p => p.category === 'brand');
  const medicalProj = DEFAULT_DESIGN_PROJECTS.find(p => p.category === 'medical');
  const posterProj = DEFAULT_DESIGN_PROJECTS.find(p => p.category === 'poster');

  assert.ok(videoProj, 'Must include AI Video Design project');
  assert.equal(videoProj?.youtubeId, 'CUXjPawKI88', 'AI Video project must use user YouTube ID CUXjPawKI88');
  assert.ok(videoProj?.tools.includes('CHAT GPT'), 'Must include CHAT GPT in tools');
  assert.ok(videoProj?.tools.includes('구글 플로우'), 'Must include 구글 플로우 in tools');
  assert.ok(videoProj?.tools.includes('캡컷'), 'Must include 캡컷 in tools');
  assert.ok(brandProj, 'Must include FRANK WAVE Brand Design project');
  assert.ok(medicalProj, 'Must include Medical Design project');
  assert.ok(posterProj, 'Must include Poster Design project');
});

test('DEFAULT_MARKETING_PROJECTS contains hospital marketing track', () => {
  assert.ok(DEFAULT_MARKETING_PROJECTS.length >= 1);
  const mkt = DEFAULT_MARKETING_PROJECTS[0];
  assert.ok(mkt.title.includes('20여 개 병원 전담 마케팅'));
  assert.equal(mkt.section, 'marketing');
});

test('extractYouTubeId extracts 11-char ID from various YouTube URL formats', () => {
  assert.equal(extractYouTubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
  assert.equal(extractYouTubeId('https://youtu.be/dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
  assert.equal(extractYouTubeId('https://www.youtube.com/embed/dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
  assert.equal(extractYouTubeId('https://www.youtube.com/shorts/dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
  assert.equal(extractYouTubeId('dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
  assert.equal(extractYouTubeId(''), null);
});

test('filterProjects filters design projects accurately', () => {
  const brandOnly = filterProjects(DEFAULT_DESIGN_PROJECTS, 'brand');
  assert.ok(brandOnly.length > 0);
  assert.ok(brandOnly.every(p => p.category === 'brand'));

  const posterOnly = filterProjects(DEFAULT_DESIGN_PROJECTS, 'poster');
  assert.ok(posterOnly.length > 0);
  assert.ok(posterOnly.every(p => p.category === 'poster'));
});

test('filterProjects matches search queries against title, summary, and tools', () => {
  const queryResult = filterProjects(DEFAULT_DESIGN_PROJECTS, 'all', 'Photoshop');
  assert.ok(queryResult.length > 0);
  assert.ok(queryResult.some(p => p.tools.includes('Photoshop')));

  const frankResult = filterProjects(DEFAULT_DESIGN_PROJECTS, 'all', 'FRANK');
  assert.ok(frankResult.length > 0);
});

test('hexToRgba properly converts 6-char hex and handles fallback', () => {
  const greenRgba = hexToRgba('#00FF66', 0.5);
  assert.equal(greenRgba, 'rgba(0, 255, 102, 0.5)');

  const blackRgba = hexToRgba('#000000', 1);
  assert.equal(blackRgba, 'rgba(0, 0, 0, 1)');

  const shortHex = hexToRgba('#0f6', 0.2);
  assert.equal(shortHex, 'rgba(0, 255, 102, 0.2)');

  const invalidFallback = hexToRgba('invalid', 0.4);
  assert.equal(invalidFallback, 'rgba(0, 255, 102, 0.4)');
});

test('DEFAULT_THEME includes user requested headline', () => {
  assert.match(DEFAULT_THEME.heroHeadline, /황산솔 마케팅 및 디자이너 포트폴리오/);
});
