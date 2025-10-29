// Smooth scrolling for navigation links
document.querySelectorAll("a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Header background on scroll
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.style.boxShadow = "var(--shadow-md)";
  } else {
    header.style.boxShadow = "var(--shadow-sm)";
  }
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      // Remove the inline transform style after the transition is complete
      // so that the CSS hover transform can work.
      entry.target.addEventListener(
        "transitionend",
        () => {
          entry.target.style.removeProperty("transform");
        },
        { once: true }
      );
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animations
document
  .querySelectorAll(
    ".cert-card, .nav-item, .case-study-card, .expertise-item, .apps span, .designs, .testimonial-item, .why-choose-card"
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

document.addEventListener("DOMContentLoaded", () => {
  // 1. Progress Bar Animation
  const progressBars = document.querySelectorAll(".progress-bar");
  progressBars.forEach((bar) => {
    const targetWidth = bar.style.width;
    bar.style.width = "0%";

    // Animate after a short delay
    setTimeout(() => {
      bar.style.width = targetWidth;
      bar.style.transition = "width 1s ease-out"; // Add transition after initial load
    }, 500);
  });

  // 2. Case Study Sidebar (Basic active state toggle)
  const navItems = document.querySelectorAll(".case-study-nav .nav-item");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all
      navItems.forEach((i) => i.classList.remove("active"));
      // Add active class to the clicked item
      this.classList.add("active");

      // In a real application, this would trigger content change
      console.log(`Loading content for: ${this.textContent}`);
    });
  });
});

// --- CAROUSEL INITIALIZATION FUNCTION (Reusable) ---

/**
 * Applies card-by-card auto-scrolling, button control, and hover-to-pause logic
 * to a specific carousel instance.
 * @param {HTMLElement} containerElement - The parent .designs element.
 */
function initializeCarousel(containerElement) {
  if (!containerElement) return;

  // --- Element Selection (scoped to the current container) ---
  const scrollElement = containerElement.querySelector(".design");
  const leftBtn = containerElement.querySelector(".left-arrow");
  const rightBtn = containerElement.querySelector(".right-arrow");

  if (!scrollElement || !leftBtn || !rightBtn) return;

  // --- AUTOSCROLL VARIABLES (unique to this instance) ---
  const smooth = "smooth";
  let isAutoScrolling = true;
  let isPausedAtEnd = false;
  let autoScrollDirection = 1; // 1: Right, -1: Left
  let autoScrollInterval; // Stores the ID for setInterval

  const PAUSE_DURATION_MS = 2000; // 3 seconds pause at ends
  const SCROLL_INTERVAL_MS = 2000; // Time between card scrolls (e.g., 4 seconds)

  // --- MANUAL NAVIGATION BUTTONS ---
  // The scroll amount is dynamically calculated based on the container size
  rightBtn.addEventListener("click", () => {
    isAutoScrolling = false; // Stop auto-scrolling on manual control
    clearInterval(autoScrollInterval);
    // Scroll by the full width of the visible container (one card for 100% width)
    scrollElement.scrollBy({
      left: scrollElement.clientWidth,
      behavior: smooth,
    });
  });

  leftBtn.addEventListener("click", () => {
    isAutoScrolling = false; // Stop auto-scrolling on manual control
    clearInterval(autoScrollInterval);
    // Scroll by the full width of the visible container
    scrollElement.scrollBy({
      left: -scrollElement.clientWidth,
      behavior: smooth,
    });
  });

  // --- INTERVAL START/STOP FUNCTIONS ---

  function startAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval); // Clear any existing interval
    }

    autoScrollInterval = setInterval(() => {
      if (!isAutoScrolling || isPausedAtEnd) {
        // If paused by hover or end-wait, skip the scroll step
        return;
      }

      // Calculate the step based on direction and client width (one card)
      const step = scrollElement.clientWidth * autoScrollDirection;

      // 1. Check for the RIGHT end boundary BEFORE scrolling
      if (
        scrollElement.scrollLeft + scrollElement.clientWidth >=
          scrollElement.scrollWidth - 1 &&
        autoScrollDirection === 1
      ) {
        clearInterval(autoScrollInterval); // Stop the current interval
        isPausedAtEnd = true;

        setTimeout(() => {
          autoScrollDirection = -1; // Reverse
          isPausedAtEnd = false;
          startAutoScroll(); // Restart the interval
        }, PAUSE_DURATION_MS);
        return; // Exit the interval function early
      }

      // 2. Check for the LEFT end boundary BEFORE scrolling
      if (scrollElement.scrollLeft <= 0 && autoScrollDirection === -1) {
        clearInterval(autoScrollInterval); // Stop the current interval
        isPausedAtEnd = true;

        setTimeout(() => {
          autoScrollDirection = 1; // Reverse
          isPausedAtEnd = false;
          startAutoScroll(); // Restart the interval
        }, PAUSE_DURATION_MS);
        return; // Exit the interval function early
      }

      // 3. Perform the card-by-card scroll step
      scrollElement.scrollBy({ left: step, behavior: "smooth" });
    }, SCROLL_INTERVAL_MS);
  }

  // --- HOVER TO PAUSE/RESUME ---
  containerElement.addEventListener("mouseover", () => {
    isAutoScrolling = false;
    clearInterval(autoScrollInterval); // Stop the timer
  });

  containerElement.addEventListener("mouseout", () => {
    if (!isPausedAtEnd) {
      isAutoScrolling = true;
      startAutoScroll(); // Start the timer again
    }
  });

  // Start the auto-scroll interval initially
  startAutoScroll();
}

// --- INITIALIZE ALL CAROUSEL INSTANCES ---
// Find all elements with the class 'designs' and apply the behavior to each.
document.querySelectorAll(".designs").forEach(initializeCarousel);

document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".case-study-nav .nav-item");
  const articles = document.querySelectorAll(".case-study-card");

  navItems.forEach((navItem) => {
    navItem.addEventListener("click", function (e) {
      e.preventDefault(); // Stop the link from trying to navigate

      // 1. Get the ID of the article to show from the data-target attribute
      const targetArticleId = this.getAttribute("data-target");

      // 2. Remove the 'active' class from ALL nav items
      navItems.forEach((item) => item.classList.remove("active"));

      // 3. Add the 'active' class to the clicked nav item
      this.classList.add("active");

      // 4. Hide ALL articles
      articles.forEach((article) => article.classList.add("hidden"));

      // 5. Show the target article
      const targetArticle = document.getElementById(targetArticleId);
      if (targetArticle) {
        targetArticle.classList.remove("hidden");
      }
    });
  });
});

const openMenu = document.querySelector(".open-menu");
const closeMenu = document.querySelector(".close-menu");
const mobileMenu = document.querySelector(".mobile-menu");

const toggleMobileMenu = () => {
  mobileMenu.classList.toggle("open");
  closeMenu.classList.toggle("open");
  openMenu.classList.toggle("close");
};

openMenu.addEventListener("click", toggleMobileMenu);
closeMenu.addEventListener("click", toggleMobileMenu);
