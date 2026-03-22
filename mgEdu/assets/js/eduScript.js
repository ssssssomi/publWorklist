(function (window, document) {
  'use strict';

  var Global = window.Global || {};

  /* =========================
   * include
   * ========================= */
  Global.include = {
    init: function (opt) {
      var selector = document.querySelector('[data-id="' + opt.id + '"]');
      var src = opt.src;

      if (!!selector && !!src) {
        fetch(src)
          .then(function (response) {
            if (!response.ok) {
              throw new Error('include 실패: ' + src);
            }
            return response.text();
          })
          .then(function (data) {
            selector.innerHTML = data;

            if (opt.callback) {
              opt.callback();
            }
          })
          .catch(function (error) {
            console.error(error);
            selector.innerHTML = '<p>include 오류</p>';
          });
      }
    }
  };

  /* =========================
   * gnb
   * ========================= */
  Global.gnb = {
    init: function () {
      var header = document.querySelector('.edu-header');
      var gnbItems = document.querySelectorAll('.gnb-item');
      var gnbLinks = document.querySelectorAll('.gnb-link');

      if (!header || !gnbItems.length) return;

      function closeAll() {
        gnbItems.forEach(function (item) {
          item.classList.remove('is-open');
        });

        gnbLinks.forEach(function (button) {
          button.setAttribute('aria-expanded', 'false');
        });
      }

      function openItem(item) {
        closeAll();

        var button = item.querySelector('.gnb-link');
        item.classList.add('is-open');

        if (button) {
          button.setAttribute('aria-expanded', 'true');
        }
      }

      gnbItems.forEach(function (item) {
        var button = item.querySelector('.gnb-link');
        var submenuLinks = item.querySelectorAll('.mega-submenu a');

        item.addEventListener('mouseenter', function () {
          openItem(item);
        });

        item.addEventListener('mouseleave', function () {
          closeAll();
        });

        if (button) {
          button.addEventListener('focus', function () {
            openItem(item);
          });

          button.addEventListener('click', function () {
            var isOpen = item.classList.contains('is-open');

            if (isOpen) {
              closeAll();
            } else {
              openItem(item);
            }
          });
        }

        submenuLinks.forEach(function (link) {
          link.addEventListener('focus', function () {
            openItem(item);
          });
        });
      });

      document.addEventListener('click', function (event) {
        if (!header.contains(event.target)) {
          closeAll();
        }
      });

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          closeAll();
        }
      });
    }
  };

  /* =========================
   * slider
   * ========================= */
  Global.slider = {
    init: function () {
      var slidesWrap = document.querySelector('.slides');
      var allSlides = document.querySelectorAll('.slides .slide');
      var dots = document.querySelectorAll('.dot');

      var btnPrev = document.querySelector('.btn-prev');
      var btnNext = document.querySelector('.btn-next');
      var btnPause = document.querySelector('.btn-pause');
      var btnPlay = document.querySelector('.btn-play');

      var realSlideCount = dots.length;
      var currentIndex = 1;
      var autoSlide = null;
      var isTransitioning = false;
      var autoDelay = 4000;

      if (!slidesWrap || !allSlides.length) return;

      function updateDots() {
        var dotIndex = currentIndex - 1;

        if (currentIndex === 0) {
          dotIndex = realSlideCount - 1;
        } else if (currentIndex === allSlides.length - 1) {
          dotIndex = 0;
        }

        dots.forEach(function (dot, index) {
          var isActive = index === dotIndex;
          dot.classList.toggle('is-active', isActive);
          dot.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
      }

      function moveToSlide(withAnimation) {
        slidesWrap.style.transition = withAnimation
          ? 'transform 0.5s ease-in-out'
          : 'none';

        slidesWrap.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
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

      slidesWrap.addEventListener('transitionend', function () {
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
        btnNext.addEventListener('click', function () {
          nextSlide();
        });
      }

      if (btnPrev) {
        btnPrev.addEventListener('click', function () {
          prevSlide();
        });
      }

      if (btnPause) {
        btnPause.addEventListener('click', function () {
          stopAutoSlide();
        });
      }

      if (btnPlay) {
        btnPlay.addEventListener('click', function () {
          startAutoSlide();
        });
      }

      dots.forEach(function (dot, index) {
        dot.addEventListener('click', function () {
          goToSlide(index);
        });
      });

      slidesWrap.addEventListener('mouseenter', function () {
        stopAutoSlide();
      });

      slidesWrap.addEventListener('mouseleave', function () {
        startAutoSlide();
      });

      moveToSlide(false);
      startAutoSlide();
    }
  };

  /* =========================
   * popup
   * ========================= */
  Global.popup = {
    init: function () {
    }
  };

  window.Global = Global;
})(window, document);