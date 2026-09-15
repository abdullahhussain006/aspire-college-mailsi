/**
 * ASPIRE GROUP OF COLLEGES MAILSI
 * Updates & Helpdesk Module: Searchable Notice Board & FAQ Accordion
 */

document.addEventListener("DOMContentLoaded", () => {
  initNoticeBoard();
  initFaqAccordion();
});

/**
 * Filter and Search Notices
 */
function initNoticeBoard() {
  const searchInput = document.getElementById("noticeSearchInput");
  const filterBtns = document.querySelectorAll(".notice-filter-btn");
  const noticeCards = document.querySelectorAll(".notice-card-item");
  const noResultsMsg = document.getElementById("noNoticeFound");

  if (!searchInput && filterBtns.length === 0) return;

  let currentCategory = "all";
  let currentSearchQuery = "";

  const filterNotices = () => {
    let visibleCount = 0;

    noticeCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category") || "";
      const cardText = card.textContent.toLowerCase();

      const matchesCategory = (currentCategory === "all" || cardCategory === currentCategory);
      const matchesSearch = cardText.includes(currentSearchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = "flex";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    if (noResultsMsg) {
      noResultsMsg.style.display = visibleCount === 0 ? "block" : "none";
    }
  };

  // Search event
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value.toLowerCase().trim();
      filterNotices();
    });
  }

  // Category buttons
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.getAttribute("data-filter") || "all";
      filterNotices();
    });
  });
}

/**
 * Accessible FAQ Accordion
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close other accordion items (single open pattern)
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("active");
          const otherAns = other.querySelector(".faq-answer");
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      if (!isActive) {
        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        item.classList.remove("active");
        answer.style.maxHeight = null;
      }
    });
  });
}
