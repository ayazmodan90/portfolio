/* =========================================================
   AYAZ MODAN — PORTFOLIO JAVASCRIPT
   ========================================================= */

const header = document.getElementById("header");
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav-link");


/* =========================
   HEADER SCROLL EFFECT
   ========================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =========================
   MOBILE MENU
   ========================= */

menuToggle.addEventListener("click", () => {

    menuToggle.classList.toggle("active");
    nav.classList.toggle("open");

});


/* =========================
   CLOSE MOBILE MENU
   ========================= */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        menuToggle.classList.remove("active");
        nav.classList.remove("open");

    });

});


/* =========================
   ACTIVE NAVIGATION
   ========================= */

const sections = document.querySelectorAll("section[id]");

const observerOptions = {
    root: null,
    rootMargin: "-30% 0px -60% 0px",
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const currentId = entry.target.getAttribute("id");

            navLinks.forEach(link => {

                link.classList.remove("active");

                if (link.getAttribute("href") === `#${currentId}`) {
                    link.classList.add("active");
                }

            });

        }

    });

}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});


/* =========================
   REVEAL ANIMATION
   ========================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .about-grid, .skill-card, .service-card, .project-card, .why-item, .cta-box, .contact-grid"
);

revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition = "opacity 0.7s ease, transform 0.7s ease";
});

const revealObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

            observer.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.12
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================
   YEAR
   ========================= */

console.log("Ayaz Portfolio loaded successfully.");

/* =========================================================
   CONTACT FORM
   ========================================================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const service = document.getElementById("service");
        const message = document.getElementById("message");

        if (
            name.value.trim().length < 2 ||
            !email.validity.valid ||
            service.value === "" ||
            message.value.trim().length < 10
        ) {

            event.preventDefault();

            contactForm.classList.add("form-shake");

            setTimeout(() => {
                contactForm.classList.remove("form-shake");
            }, 450);

        }

    });

}

/* =========================================================
   NAVBAR
   ========================================================= */

const siteHeader = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const navLinks = document.querySelectorAll(".nav-link");


/* Header scroll effect */

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {
        siteHeader.classList.add("scrolled");
    } else {
        siteHeader.classList.remove("scrolled");
    }

});


/* Mobile menu */

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            menuToggle.classList.toggle("active");

        mainNav.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });

}


/* Close mobile menu after clicking */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        menuToggle.classList.remove("active");

        mainNav.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


/* Active navigation */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 160;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {
            link.classList.add("active");
        }

    });

});