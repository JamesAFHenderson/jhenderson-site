(function () {
  const parallaxImages = document.querySelectorAll("[data-parallax]");
  if (!parallaxImages.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) return;

  let ticking = false;

  function updateParallax() {
    const viewportHeight = window.innerHeight;

    parallaxImages.forEach((img) => {
      const strength = parseFloat(img.dataset.parallaxStrength || "0.1");
      const rect = img.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distance = elementCenter - viewportCenter;
      const offset = distance * strength * -1;

      img.style.transform = `translate3d(0, ${offset}px, 0)`;
    });

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateParallax);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  updateParallax();
})();

(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
