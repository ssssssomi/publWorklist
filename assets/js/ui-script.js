/* assets/js/ui-script.js */
const uiScript = (function () {
  const utils = {
    // 필요하면 나중에 확장
  };

  const popup = (function () {
    let isBound = false;
    let activePopup = null;
    let lastFocus = null;

    const qs = (sel) => document.querySelector(sel);
    const qsa = (sel) => Array.from(document.querySelectorAll(sel));

    const getDim = () => qs('[data-popup-dim]');

    function openById(id) {
      const dim = getDim();
      const target = qs('.pub-popup[data-id="' + id + '"]');
      if (!target || !dim) return;

      // 다른 팝업 닫고 교체
      close(false);

      lastFocus = document.activeElement;
      activePopup = target;

      dim.hidden = false;
      target.hidden = false;

      // 포커스(간단 버전): 닫기 버튼으로 이동
      const closeBtn = target.querySelector('[data-close]');
      closeBtn?.focus?.();
    }

    function close(restoreFocus = true) {
      const dim = getDim();

      if (activePopup) activePopup.hidden = true;
      if (dim) dim.hidden = true;

      if (restoreFocus) lastFocus?.focus?.();

      activePopup = null;
      lastFocus = null;
    }

    function bind() {
      if (isBound) return;
      isBound = true;

      document.addEventListener('click', (e) => {
        // 1) open: "팝업 열기 버튼"만
        //    - 탭 버튼도 data-id를 쓰고 있으니, pub-tab 버튼은 제외!
        const openBtn = e.target.closest('button.pub-btn[data-id]');
        if (openBtn) {
          const id = openBtn.dataset.id;
          if (id) openById(id);
          return;
        }

        // 2) close
        if (e.target.closest('[data-close]')) {
          close(true);
          return;
        }

        // 3) dim click close
        const dim = getDim();
        if (dim && e.target === dim) {
          close(true);
        }
      });

      document.addEventListener('keydown', (e) => {
        if (!activePopup) return;
        if (e.key === 'Escape') {
          e.preventDefault();
          close(true);
        }
      });
    }

    function init() {
      // 탭 로드마다 호출해도 이벤트는 1번만 걸림
      bind();
      // 초기 상태 정리(탭 재진입 시 열려있던 팝업 닫힘)
      close(false);
    }

    return { init, openById, close };
  })();

  function init() {
    // 전체 페이지 공통으로 초기화할 게 있으면 여기에
  }

  return { init, utils, popup };
})();
