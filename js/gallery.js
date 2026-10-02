/**
 * ASPIRE GROUP OF COLLEGES MAILSI
 * Video Gallery Module: Single-Player Coordination & Responsive Playback
 */

document.addEventListener("DOMContentLoaded", () => {
  initVideoPlaybackCoordination();
  initKeyboardVideoControls();
});

/**
 * Ensure only one video plays at a time.
 * When any video plays, pause all other videos immediately.
 */
function initVideoPlaybackCoordination() {
  const allVideos = document.querySelectorAll("video.campus-video-player");
  if (allVideos.length === 0) return;

  allVideos.forEach((video) => {
    video.addEventListener("play", () => {
      allVideos.forEach((otherVideo) => {
        if (otherVideo !== video && !otherVideo.paused) {
          otherVideo.pause();
        }
      });
    });
  });
}

/**
 * Spacebar toggles pause on the active playing video
 */
function initKeyboardVideoControls() {
  document.addEventListener("keydown", (e) => {
    if (["input", "textarea", "select"].includes(document.activeElement?.tagName.toLowerCase())) {
      return;
    }

    if (e.code === "Space" && e.target === document.body) {
      const playingVideo = Array.from(document.querySelectorAll("video.campus-video-player")).find(v => !v.paused);
      if (playingVideo) {
        e.preventDefault();
        playingVideo.pause();
      }
    }
  });
}
