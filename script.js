const revealItems = document.querySelectorAll(".reveal");
const topbar = document.querySelector(".topbar");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const syncTopbar = () => {
  if (!topbar) {
    return;
  }

  topbar.classList.toggle("compact", window.scrollY > 18);
};

if (reduceMotion.matches || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
    }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 55, 330)}ms`;
    revealObserver.observe(item);
  });
}

syncTopbar();
window.addEventListener("scroll", syncTopbar, { passive: true });
