document.addEventListener("DOMContentLoaded", () => {
  const staticElements = [
    document.querySelector("h1"),
    document.querySelector("nav"),
    document.querySelector(".side-card-left"),
    document.querySelector(".side-card-right"),
  ].filter(Boolean);
  const cards = Array.from(document.querySelectorAll(".feed .card"));

  staticElements.forEach((element, index) => {
    element.style.opacity = "0";
    if (element.tagName === "NAV") {
      element.style.transition = "opacity 0.9s ease-out";
    } else {
      element.style.transform = "translateY(24px)";
      element.style.transition = "opacity 0.9s ease-out, transform 0.9s ease-out";
    }

    setTimeout(() => {
      element.style.opacity = "1";
      if (element.tagName !== "NAV") {
        element.style.transform = "translateY(0)";
        setTimeout(() => {
          element.style.removeProperty("transform");
        }, 900);
      }
    }, 180 + index * 120);
  });

  cards.forEach((card) => {
    card.classList.add("is-hidden");
  });

  const revealCard = (card) => {
    card.classList.add("is-visible");
    card.classList.remove("is-hidden");
  };

  if (!("IntersectionObserver" in window)) {
    cards.forEach(revealCard);
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealCard(entry.target);
        obs.unobserve(entry.target);
      });
    },
    {
      root: null,
      threshold: 0.16,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  cards.forEach((card) => observer.observe(card));
});
