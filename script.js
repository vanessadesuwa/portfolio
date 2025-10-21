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

const toggleSidebar = () => {
  overLay.classList.toggle("open");
  document.body.classList.toggle("no-scroll");
  mobileMenu.classList.toggle("open");
};

menuIcon.addEventListener("click", toggleSidebar);

closeMenu.addEventListener("click", toggleSidebar);

overLay.addEventListener("click", toggleSidebar);

navS.forEach((nav) => {
  nav.addEventListener("click", toggleSidebar);
});

const images = [
  "images/pic1.jpg",
  "images/pic2.jpg",
  "images/pic3.jpg",
  "images/pic4.jpg",
];

let index = 0;
const aboutPicture = document.querySelector(".about-image img");

const changeImage = () => {
  aboutPicture.style.opacity = 0;
  setTimeout(() => {
    index = (index + 1) % images.length;
    profilePic.src = images[index];
    aboutPicture.style.opacity = 1;
  }, 500);
};

setInterval(changeImage, 30000);
