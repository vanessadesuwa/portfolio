// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
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
    header.style.backgroundColor = "rgba(18, 18, 18, 0.98)";
  } else {
    header.style.backgroundColor = "rgba(18, 18, 18, 0.95)";
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
document.querySelectorAll(".tech-card, .project-card").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
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
