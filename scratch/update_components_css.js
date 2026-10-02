const fs = require('fs');
const path = require('path');

const cssPath = path.join('D:/aspire-college-mailsi/css/components.css');
let css = fs.readFileSync(cssPath, 'utf8');

const startMarker = '/* 5. Campus Video Showcase & Reels System */';
const endMarker = '/* 6. FAQ Accordion System */';

const startIndex = css.indexOf(startMarker);
const endIndex = css.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Markers not found!', { startIndex, endIndex });
  process.exit(1);
}

const newSection = `/* 5. Campus Video Showcase */
.campus-video-section {
  padding: var(--space-3xl) 0;
  border-bottom: 1px solid var(--color-border);
}

.campus-video-section:nth-of-type(even) {
  background: var(--color-bg-alt);
}

.video-card-container {
  max-width: 900px;
  margin: 0 auto;
}

.video-section-title {
  font-size: clamp(1.4rem, 2.5vw, 1.85rem);
  color: var(--color-text-title);
  font-weight: 800;
  line-height: 1.25;
  margin-bottom: var(--space-md);
  text-align: left;
}

.video-player-frame {
  position: relative;
  background: #000000;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.18);
  border: 1px solid rgba(0, 0, 0, 0.12);
  aspect-ratio: 16 / 9;
  width: 100%;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.campus-video-player {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #000000;
  display: block;
  border-radius: var(--radius-lg);
  outline: none;
}

.video-section-desc {
  font-size: var(--font-base);
  color: var(--color-text-body);
  line-height: 1.65;
  margin-top: var(--space-md);
}

@media (max-width: 768px) {
  .campus-video-section {
    padding: var(--space-xl) 0;
  }
  .video-section-title {
    font-size: 1.25rem;
    margin-bottom: var(--space-sm);
  }
  .video-player-frame {
    border-radius: var(--radius-md);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }
  .campus-video-player {
    border-radius: var(--radius-md);
  }
  .video-section-desc {
    font-size: var(--font-sm);
    margin-top: var(--space-sm);
  }
}

`;

const updatedCss = css.slice(0, startIndex) + newSection + css.slice(endIndex);
fs.writeFileSync(cssPath, updatedCss, 'utf8');
console.log('SUCCESS: components.css updated with clean video styles!');
