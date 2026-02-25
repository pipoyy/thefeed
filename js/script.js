document.addEventListener("DOMContentLoaded", () => {
  const qs = (selector) => document.querySelector(selector);

  const heading = qs("h1, h2");
  const logo = qs(".logo");
  const tapIndicator = qs(".arrow");
  const music = qs("#bgMusic");
  const musicCueBtn = qs("#musicCueBtn");

  const introElements = [heading, logo, tapIndicator].filter(Boolean);
  const mainIntroElements = [heading, logo, tapIndicator].filter(Boolean);

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

  if (!music || !musicCueBtn) return;

  const setMusicButtonState = (isPlaying) => {
    musicCueBtn.textContent = isPlaying ? "Music: On" : "Music: Off";
    musicCueBtn.classList.toggle("is-active", isPlaying);
  };

  setTimeout(() => {
    musicCueBtn.classList.add("is-visible");
    setMusicButtonState(!music.paused);
  }, 700);

  musicCueBtn.addEventListener("click", async () => {
    try {
      if (music.paused) {
        await music.play();
      } else {
        music.pause();
      }
      setMusicButtonState(!music.paused);
    } catch (error) {
      setMusicButtonState(false);
    }
  });
});
