const fs = require('fs');
const path = require('path');

const baseDir = 'D:/aspire-college-mailsi';
const galleryHtml = fs.readFileSync(path.join(baseDir, 'gallery.html'), 'utf8');

console.log('=== AUDITING VIDEO GALLERY (GALLERY.HTML) ===');

// 1. Check Ahmad Campus
const ahmadCampusMatch = galleryHtml.match(/ahmad\s+campus/i);
if (ahmadCampusMatch) {
  console.error('FAIL: Found "Ahmad Campus" in gallery.html!');
} else {
  console.log('PASS: 0 occurrences of "Ahmad Campus".');
}

// 2. Check all 6 videos exist on disk
const expectedVideos = [
  'videos/campus-intro.mp4',
  'videos/campus-building.mp4',
  'videos/day-start.mp4',
  'videos/a-day-of-aspirian.mp4',
  'videos/lab-and-study-video.mp4',
  'videos/result-ceremony-video.mp4'
];

let allVideosPresent = true;
expectedVideos.forEach(v => {
  const full = path.join(baseDir, v);
  const exists = fs.existsSync(full);
  const inHtml = galleryHtml.includes(v);
  if (exists && inHtml) {
    console.log(`PASS: Video ${v} exists on disk and is embedded in gallery.html`);
  } else {
    console.error(`FAIL: Video issue with ${v} (exists: ${exists}, inHtml: ${inHtml})`);
    allVideosPresent = false;
  }
});

// 3. Check that other pics and old sections are removed
const galleryItemMatches = galleryHtml.match(/class="gallery-item/g);
if (galleryItemMatches) {
  console.error(`FAIL: Old gallery-items still present (${galleryItemMatches.length})!`);
} else {
  console.log('PASS: All old photo gallery items removed!');
}

const unsplashMatches = galleryHtml.match(/unsplash/gi);
if (unsplashMatches) {
  console.error('FAIL: Found Unsplash images in gallery.html!');
} else {
  console.log('PASS: 0 Unsplash stock images.');
}

// 4. Check sections
const sectionIds = [
  '#campus-intro',
  '#campus-building',
  '#day-start',
  '#a-day-of-aspirian',
  '#lab-and-study-video',
  '#result-ceremony-video'
];

sectionIds.forEach(id => {
  const cleanId = id.replace('#', '');
  if (galleryHtml.includes(`id="${cleanId}"`)) {
    console.log(`PASS: Section ${id} is present.`);
  } else {
    console.error(`FAIL: Section ${id} is missing!`);
  }
});

// 5. Check contact info
const contacts = [
  { name: 'WhatsApp (0303-7376611)', ok: galleryHtml.includes('0303-7376611') },
  { name: 'Helpline (0307-0891119)', ok: galleryHtml.includes('0307-0891119') },
  { name: 'Telephone (067-3202151)', ok: galleryHtml.includes('067-3202151') },
  { name: 'Principal Email', ok: galleryHtml.includes('principal.mailsi@aspirecolleges.edu.pk') }
];

contacts.forEach(c => {
  if (c.ok) {
    console.log(`PASS: ${c.name} verified.`);
  } else {
    console.error(`FAIL: ${c.name} missing!`);
  }
});
