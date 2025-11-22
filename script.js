const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
  });

  mainNav.addEventListener("click", (event) => {
    if (event.target.matches(".nav-link")) {
      mainNav.classList.remove("open");
      navToggle.classList.remove("open");
    }
  });
}

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const setActiveNav = () => {
  const scrollPos = window.scrollY;
  const offset = 100; 

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const top = rect.top + window.scrollY - offset;
    const bottom = top + section.offsetHeight;

    if (scrollPos >= top && scrollPos < bottom) {
      const id = section.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${id}`
        );
      });
    }
  });
};

window.addEventListener("scroll", setActiveNav);
window.addEventListener("load", setActiveNav);

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("in-view"));
}


// Backend API URL 
const CONTACT_API_URL = "http://localhost:4000/api/contact";

const contactForm = document.querySelector(".contact-form");
const formStatusEl = document.getElementById("form-status");

if (contactForm && formStatusEl) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    formStatusEl.textContent = "Sending...";
    formStatusEl.className = "form-status";

    const formData = new FormData(contactForm);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        contactForm.reset();
        formStatusEl.textContent =
          "Thank you! Your message has been sent.";
        formStatusEl.classList.add("success");
      } else {
        formStatusEl.textContent =
          (data && data.errors && data.errors.join(", ")) ||
          (data && data.message) ||
          "Something went wrong. Please try again.";
        formStatusEl.classList.add("error");
      }
    } catch (error) {
      console.error(error);
      formStatusEl.textContent =
        "Network error. Please try again later.";
      formStatusEl.classList.add("error");
    }
  });
}
