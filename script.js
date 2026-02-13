document.addEventListener("DOMContentLoaded", () => {
  const subtitleText = "Software Engineer • AI & Data Systems";
  const subtitleEl = document.getElementById("subtitle");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }

  // Typing effect for subtitle
  if (subtitleEl) {
    let index = 0;
    const type = () => {
      if (index <= subtitleText.length) {
        subtitleEl.textContent = subtitleText.slice(0, index);
        index += 1;
        window.setTimeout(type, 62);
      }
    };
    type();
  }

  // Fade-in animations for timeline items, projects, and selected panels
  const fadeTargets = document.querySelectorAll(
    ".timeline-item, .project-card, .skills-grid, .headshot-wrap, .about-copy, .contact-card"
  );

  if ("IntersectionObserver" in window) {
    const fadeObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -30px 0px" }
    );

    fadeTargets.forEach((el) => {
      if (!el.classList.contains("fade-in")) {
        el.classList.add("fade-in");
      }
      fadeObserver.observe(el);
    });
  } else {
    fadeTargets.forEach((el) => el.classList.add("visible"));
  }

  // Active section highlighting in left-side nav
  const setActiveNav = () => {
    const offset = window.scrollY + window.innerHeight * 0.25;
    let activeId = sections[0] ? sections[0].id : "";

    sections.forEach((section) => {
      if (offset >= section.offsetTop) {
        activeId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const match = link.getAttribute("href") === `#${activeId}`;
      link.classList.toggle("active", Boolean(match));
    });
  };

  setActiveNav();
  window.addEventListener("scroll", setActiveNav, { passive: true });
  window.addEventListener("resize", setActiveNav);

  // Scroll-to-top button behavior
  const toggleTopButton = () => {
    if (!scrollTopBtn) {
      return;
    }
    const shouldShow = window.scrollY > 360;
    scrollTopBtn.classList.toggle("show", shouldShow);
  };

  toggleTopButton();
  window.addEventListener("scroll", toggleTopButton, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Optional image lightbox for any image
  const openLightbox = (src, alt) => {
    if (!lightbox || !lightboxImage) {
      return;
    }

    lightboxImage.src = src;
    lightboxImage.alt = alt || "Expanded image";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    if (!lightbox || !lightboxImage) {
      return;
    }

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    document.body.style.overflow = "";
  };

  document.querySelectorAll("img").forEach((img) => {
    if (img.id === "lightboxImage") {
      return;
    }

    img.addEventListener("click", () => {
      if (!img.getAttribute("src")) {
        return;
      }
      openLightbox(img.getAttribute("src"), img.getAttribute("alt"));
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox?.classList.contains("open")) {
      closeLightbox();
    }
  });

  // Vanta BIRDS background on hero only
  if (window.VANTA && window.VANTA.BIRDS && document.getElementById("hero")) {
    window.VANTA.BIRDS({
      el: "#hero",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: 1,
      scaleMobile: 1,
      backgroundColor: 0x0d1117,
      color1: 0x3d2dd9,
      color2: 0xdc414c,
      colorMode: "lerp"
    });
  }
});
