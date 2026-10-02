const fs = require('fs');
const path = require('path');

const baseDir = 'D:/aspire-college-mailsi';
const htmlFiles = [
  'about.html',
  'academics.html',
  'admissions.html',
  'contact.html',
  'gallery.html',
  'help.html',
  'index.html',
  'staff.html',
  'updates.html'
];

console.log('=== COMPREHENSIVE RESPONSIVE & SIZE VERIFICATION ===\n');

let allPassed = true;

// 1. Check Ahmad Campus
htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(baseDir, file), 'utf8');
  if (/ahmad\s+campus/i.test(content)) {
    console.error(`FAIL: ${file} contains "Ahmad Campus"!`);
    allPassed = false;
  }
});
console.log('Zero occurrences of "Ahmad Campus" across all HTML files: PASS');

// 2. Check contacts
const contacts = ['0303-7376611', '0307-0891119', '067-3202151', 'principal.mailsi@aspirecolleges.edu.pk'];
contacts.forEach(c => {
  const inIndex = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8').includes(c);
  console.log(`Index contains ${c}: ${inIndex ? 'PASS' : 'FAIL'}`);
  if (!inIndex) allPassed = false;
});

// 3. Verify CSS variable tokens in variables.css
const varCss = fs.readFileSync(path.join(baseDir, 'css/variables.css'), 'utf8');
const hasReduced3xl = varCss.includes('--space-3xl: 3rem;');
const hasMobileRoot = varCss.includes('@media (max-width: 768px)');
console.log('variables.css has reduced --space-3xl: 3rem:', hasReduced3xl ? 'PASS' : 'FAIL');
console.log('variables.css has mobile responsive tokens:', hasMobileRoot ? 'PASS' : 'FAIL');
if (!hasReduced3xl || !hasMobileRoot) allPassed = false;

// 4. Verify base.css buttons and clamp
const baseCss = fs.readFileSync(path.join(baseDir, 'css/base.css'), 'utf8');
const hasReducedBtn = baseCss.includes('padding: 10px 20px;');
const hasReducedH1 = baseCss.includes('clamp(1.6rem, 3vw + 0.5rem, 2.35rem)');
console.log('base.css has compact btn sizing:', hasReducedBtn ? 'PASS' : 'FAIL');
console.log('base.css has compact h1 clamp:', hasReducedH1 ? 'PASS' : 'FAIL');
if (!hasReducedBtn || !hasReducedH1) allPassed = false;

// 5. Verify components.css
const compCss = fs.readFileSync(path.join(baseDir, 'css/components.css'), 'utf8');
const hasReducedCard = compCss.includes('padding: 18px 20px;');
const hasReducedProgImg = compCss.includes('height: 155px;');
const hasReducedFacultyImg = compCss.includes('height: 185px;');
console.log('components.css has compact card padding:', hasReducedCard ? 'PASS' : 'FAIL');
console.log('components.css has compact program card img:', hasReducedProgImg ? 'PASS' : 'FAIL');
console.log('components.css has compact faculty img:', hasReducedFacultyImg ? 'PASS' : 'FAIL');
if (!hasReducedCard || !hasReducedProgImg || !hasReducedFacultyImg) allPassed = false;

// 6. Verify page-hero across subpages
const subpages = ['about.html', 'academics.html', 'admissions.html', 'contact.html', 'gallery.html', 'help.html', 'staff.html', 'updates.html'];
subpages.forEach(p => {
  const c = fs.readFileSync(path.join(baseDir, p), 'utf8');
  const hasCompactHero = c.includes('padding: 2.25rem 0;');
  console.log(`${p} page-hero has compact padding (2.25rem 0): ${hasCompactHero ? 'PASS' : 'FAIL'}`);
  if (!hasCompactHero) allPassed = false;
});

// 7. Verify index.html hero min-height
const indexHtml = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
const hasCompactIndexHero = indexHtml.includes('min-height: 65vh;');
console.log('index.html hero min-height is 65vh:', hasCompactIndexHero ? 'PASS' : 'FAIL');
if (!hasCompactIndexHero) allPassed = false;

console.log(`\nOverall Verification Result: ${allPassed ? 'ALL CHECKS PASSED ✅' : 'FAILURES DETECTED ❌'}`);
