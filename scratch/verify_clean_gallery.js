const fs = require('fs');
const path = require('path');

const baseDir = 'D:/aspire-college-mailsi';
const html = fs.readFileSync(path.join(baseDir, 'gallery.html'), 'utf8');

console.log('=== VERIFICATION OF USER INSTRUCTIONS ===');

// 1. Menu bar
const hasGalleryInMenu = html.includes('class="nav-link active">Gallery</a>');
const hasGalleryAndVideos = html.includes('Gallery &amp; Videos') || html.includes('Gallery & Videos');
console.log('Menu bar has "Gallery":', hasGalleryInMenu ? 'PASS' : 'FAIL');
console.log('"Videos" removed from menu bar:', !hasGalleryAndVideos ? 'PASS' : 'FAIL');

// 2. Picture items removed
const hasHeroStatsRow = html.includes('hero-stats-row');
const hasVideoNavSticky = html.includes('video-nav-sticky');
console.log('Hero chips (hero-stats-row) removed:', !hasHeroStatsRow ? 'PASS' : 'FAIL');
console.log('Sticky nav pills (video-nav-sticky) removed:', !hasVideoNavSticky ? 'PASS' : 'FAIL');

// 3. 6 videos verified
const videos = [
  'videos/campus-intro.mp4',
  'videos/campus-building.mp4',
  'videos/day-start.mp4',
  'videos/a-day-of-aspirian.mp4',
  'videos/lab-and-study-video.mp4',
  'videos/result-ceremony-video.mp4'
];

videos.forEach(v => {
  const inHtml = html.includes(v);
  const onDisk = fs.existsSync(path.join(baseDir, v));
  console.log(`Video ${v}: (In HTML: ${inHtml ? 'YES' : 'NO'}, On Disk: ${onDisk ? 'YES' : 'NO'})`);
});

// 4. Section titles matching video names
const sectionTitles = [
  'Campus Intro',
  'Campus Building',
  'Day Start',
  'A Day of an Aspirian',
  'Lab & Study',
  'Result Ceremony'
];

sectionTitles.forEach(t => {
  const found = html.includes(`<h2 class="video-section-title">${t}</h2>`);
  console.log(`Section "${t}": ${found ? 'PASS' : 'FAIL'}`);
});

// 5. Check no Ahmad Campus
const ahmadCheck = /ahmad\s+campus/i.test(html);
console.log('0 occurrences of Ahmad Campus:', !ahmadCheck ? 'PASS' : 'FAIL');

// 6. Check contacts
console.log('WhatsApp (0303-7376611):', html.includes('0303-7376611') ? 'PASS' : 'FAIL');
console.log('Helpline (0307-0891119):', html.includes('0307-0891119') ? 'PASS' : 'FAIL');
console.log('Telephone (067-3202151):', html.includes('067-3202151') ? 'PASS' : 'FAIL');
console.log('Principal Email:', html.includes('principal.mailsi@aspirecolleges.edu.pk') ? 'PASS' : 'FAIL');
