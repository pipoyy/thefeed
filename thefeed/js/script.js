document.addEventListener("DOMContentLoaded", () => {
  const qs = (selector) => document.querySelector(selector);
  const qsa = (selector) => Array.from(document.querySelectorAll(selector));

  const staticElements = [
    qs("h1"),
    qs("nav"),
    qs(".side-card-left"),
    qs(".side-card-right"),
  ].filter(Boolean);
  const cards = qsa(".feed .card");

  const animateStaticElement = (element, delayMs) => {
    const isNav = element.tagName === "NAV";

    element.style.opacity = "0";
    element.style.transition = isNav
      ? "opacity 0.9s ease-out"
      : "opacity 0.9s ease-out, transform 0.9s ease-out";

    if (!isNav) {
      element.style.transform = "translateY(24px)";
    }

    setTimeout(() => {
      element.style.opacity = "1";
      if (isNav) return;

      element.style.transform = "translateY(0)";
      setTimeout(() => {
        element.style.removeProperty("transform");
      }, 900);
    }, delayMs);
  };

  const revealCard = (card) => {
    card.classList.add("is-visible");
    card.classList.remove("is-hidden");
  };

  staticElements.forEach((element, index) => {
    animateStaticElement(element, 180 + index * 120);
  });

  cards.forEach((card) => card.classList.add("is-hidden"));

  if (!("IntersectionObserver" in window)) {
    cards.forEach(revealCard);
    return;
  }

  const cardObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealCard(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      root: null,
      threshold: 0.16,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  cards.forEach((card) => cardObserver.observe(card));
});
