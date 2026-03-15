document.addEventListener("DOMContentLoaded", function () {
  /* =========================
     GNB Mega Menu
  ========================= */
  const gnbItems = document.querySelectorAll(".gnb-item");
  const gnbButtons = document.querySelectorAll(".gnb-link");
  const header = document.getElementById("header");

  function closeAllMenus() {
    gnbItems.forEach((item) => {
      item.classList.remove("is-open");
    });

    gnbButtons.forEach((button) => {
      button.setAttribute("aria-expanded", "false");
    });
  }

  function openMenu(item) {
    closeAllMenus();

    const button = item.querySelector(".gnb-link");
    item.classList.add("is-open");

    if (button) {
      button.setAttribute("aria-expanded", "true");
    }
  }

  gnbItems.forEach((item) => {
    const button = item.querySelector(".gnb-link");
    const submenuLinks = item.querySelectorAll(".mega-submenu a");

    item.addEventListener("mouseenter", function () {
      openMenu(item);
    });

    item.addEventListener("mouseleave", function () {
      closeAllMenus();
    });

    if (button) {
      button.addEventListener("focus", function () {
        openMenu(item);
      });

      button.addEventListener("click", function () {
        const isOpen = item.classList.contains("is-open");

        if (isOpen) {
          closeAllMenus();
        } else {
          openMenu(item);
        }
      });
    }

    submenuLinks.forEach((link) => {
      link.addEventListener("focus", function () {
        openMenu(item);
      });
    });
  });

  document.addEventListener("click", function (event) {
    if (!header.contains(event.target)) {
      closeAllMenus();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      const openButton = document.querySelector('.gnb-link[aria-expanded="true"]');
      closeAllMenus();

      if (openButton) {
        openButton.focus();
      }
    }
  });

  /* =========================
     Main Visual Infinite Slider
  ========================= */
  const slidesWrap = document.querySelector(".slides");
  const allSlides = document.querySelectorAll(".slides .slide");
  const dots = document.querySelectorAll(".dot");

  const btnPrev = document.querySelector(".btn-prev");
  const btnNext = document.querySelector(".btn-next");
  const btnPause = document.querySelector(".btn-pause");
  const btnPlay = document.querySelector(".btn-play");

  const realSlideCount = 3;
  let currentIndex = 1;
  let autoSlide = null;
  let isTransitioning = false;
  const autoDelay = 1000;

  if (!slidesWrap || !allSlides.length) {
    return;
  }

  function updateDots() {
    let dotIndex = currentIndex - 1;

    if (currentIndex === 0) {
      dotIndex = realSlideCount - 1;
    } else if (currentIndex === allSlides.length - 1) {
      dotIndex = 0;
    }

    dots.forEach((dot, index) => {
      const isActive = index === dotIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }

  function moveToSlide(withAnimation) {
    slidesWrap.style.transition = withAnimation
      ? "transform 0.5s ease-in-out"
      : "none";
    slidesWrap.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
  }

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex += 1;
    moveToSlide(true);
  }

  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex -= 1;
    moveToSlide(true);
  }

  function goToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex = index + 1;
    moveToSlide(true);
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlide = setInterval(nextSlide, autoDelay);
  }

  function stopAutoSlide() {
    if (autoSlide) {
      clearInterval(autoSlide);
      autoSlide = null;
    }
  }

  slidesWrap.addEventListener("transitionend", function () {
    if (currentIndex === allSlides.length - 1) {
      currentIndex = 1;
      moveToSlide(false);
    }

    if (currentIndex === 0) {
      currentIndex = realSlideCount;
      moveToSlide(false);
    }

    isTransitioning = false;
  });

  if (btnNext) {
    btnNext.addEventListener("click", function () {
      nextSlide();
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener("click", function () {
      prevSlide();
    });
  }

  if (btnPause) {
    btnPause.addEventListener("click", function () {
      stopAutoSlide();
    });
  }

  if (btnPlay) {
    btnPlay.addEventListener("click", function () {
      startAutoSlide();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      goToSlide(index);
    });
  });

  slidesWrap.addEventListener("mouseenter", function () {
    stopAutoSlide();
  });

  slidesWrap.addEventListener("mouseleave", function () {
    startAutoSlide();
  });

  moveToSlide(false);
  startAutoSlide();
});