document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = "0 2px 30px rgba(37, 99, 235, 0.15)";
    } else {
      navbar.style.boxShadow = "0 2px 20px rgba(37, 99, 235, 0.1)";
    }
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});

const mobileMenu = document.querySelector(".mobile-menu");
const overLay = document.querySelector(".overlay");
const closeMenu = document.querySelector(".close-menu");
const menuIcon = document.querySelector(".menu-icon");
const navS = document.querySelectorAll(".mobile-menu nav a");

menuIcon.addEventListener("click", () => {
  overLay.classList.toggle("open");
  document.body.classList.toggle("no-scroll");
  mobileMenu.classList.toggle("open");
});

closeMenu.addEventListener("click", () => {
  overLay.classList.toggle("open");
  document.body.classList.toggle("no-scroll");
  mobileMenu.classList.toggle("open");
});

navS.forEach((nav) => {
  nav.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    overLay.classList.toggle("open");
    document.body.classList.toggle("no-scroll");
  });
});
