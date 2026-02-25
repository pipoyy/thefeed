document.addEventListener("DOMContentLoaded", () => {
  const background = document.querySelector(".background-img");
  const heading = document.querySelector("h1, h2");
  const logo = document.querySelector(".logo");
  const tapIndicator = document.querySelector(".arrow");
  const music = document.querySelector("#bgMusic");
  const musicCueBtn = document.querySelector("#musicCueBtn");

  const stagedElements = [background, heading, logo, tapIndicator].filter(Boolean);

  stagedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
  });

  if (background) {
    setTimeout(() => {
      background.style.transition = "opacity 1.2s ease-out";
      background.style.opacity = "1";
      background.style.transform = "translateY(0)";
    }, 300);
  }

  setTimeout(() => {
    [heading, logo, tapIndicator].filter(Boolean).forEach((element) => {
      element.style.transition = "opacity 1.2s ease-out, transform 1.2s ease-out";
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
      setTimeout(() => {
        element.style.removeProperty("transform");
      }, 1200);
    });
  }, 800);

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
      try {
        if (music.paused) {
          await music.play();
          setMusicButtonState(true);
        } else {
          music.pause();
          setMusicButtonState(false);
        }
      } catch (error) {
        setMusicButtonState(false);
      }
    });
  }
});
