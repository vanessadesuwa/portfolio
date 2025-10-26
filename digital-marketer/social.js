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
    ".achievement-card, .detail-card, .platform-card, .testimonial-card"
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
