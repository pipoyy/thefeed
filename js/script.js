document.addEventListener("DOMContentLoaded", () => {
  const qs = (selector) => document.querySelector(selector);

  const heading = qs("h1, h2");
  const logo = qs(".logo");
  const tapIndicator = qs(".arrow");
  const pikachuLink = qs(".pikachu-container");
  const pikachuSfx = qs("#pikachuSfx");
  const music = qs("#bgMusic");
  const musicCueBtn = qs("#musicCueBtn");

  const introElements = [heading, logo, tapIndicator].filter(Boolean);
  const mainIntroElements = [heading, logo, tapIndicator].filter(Boolean);
  const spawnCursorBurst = (x, y) => {
    const burst = document.createElement("span");
    burst.className = "cursor-burst";
    burst.style.left = `${x}px`;
    burst.style.top = `${y}px`;
    document.body.appendChild(burst);
    setTimeout(() => {
      burst.remove();
    }, 600);
  };

  const stageElement = (element, yOffset = 30) => {
    element.style.opacity = "0";
    element.style.transform = `translateY(${yOffset}px)`;
  };

  const revealElement = (element, durationMs = 1200) => {
    element.style.transition = `opacity ${durationMs}ms ease-out, transform ${durationMs}ms ease-out`;
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";

    setTimeout(() => {
      element.style.removeProperty("transform");
    }, durationMs);
  };

  introElements.forEach((element) => stageElement(element));

  setTimeout(() => {
    mainIntroElements.forEach((element) => revealElement(element, 1200));
  }, 700);

  if (pikachuLink) {
    let isTransitioning = false;

    pikachuLink.addEventListener("click", (event) => {
      if (isTransitioning) {
        event.preventDefault();
        return;
      }

      const isModifiedClick = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isModifiedClick || prefersReducedMotion) return;

      event.preventDefault();
      isTransitioning = true;

      spawnCursorBurst(event.clientX, event.clientY);

      if (pikachuSfx) {
        pikachuSfx.currentTime = 0;
        void pikachuSfx.play();
      }

      document.body.classList.add("is-pikachu-exit");

      setTimeout(() => {
        window.location.assign(pikachuLink.href);
      }, 3220);
    });
  }

  if (music && musicCueBtn) {
    const setMusicButtonState = (isPlaying) => {
      musicCueBtn.textContent = isPlaying ? "Music: On" : "Music: Off";
      musicCueBtn.classList.toggle("is-active", isPlaying);
    };

    setTimeout(() => {
      musicCueBtn.classList.add("is-visible");
      setMusicButtonState(!music.paused);
    }, 700);

    musicCueBtn.addEventListener("click", async () => {
      if (music.paused) {
        await music.play();
      } else {
        music.pause();
      }
      setMusicButtonState(!music.paused);
    });
  }
});
