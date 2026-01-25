/* assets/js/ui-script.js */
const uiScript = (function () {
  const utils = {
    // 필요하면 나중에 확장
  };

  const popup = (function () {
    let isBound = false;
    let activePopup = null;
    let lastFocus = null;

    const qs = (sel, root = document) => root.querySelector(sel);
    const getDim = () => qs('[data-popup-dim]');

    function openById(id) {
      const dim = getDim();
      const target = qs('.pub-popup[data-id="' + id + '"]');
      if (!target || !dim) return;

      // ✅ 다른 팝업이 열려있으면 닫고 교체
      close(false);

      lastFocus = document.activeElement;
      activePopup = target;

      dim.hidden = false;
      target.hidden = false;

      // ✅ 포커스: 닫기 버튼 → 없으면 팝업 래퍼로
      const closeBtn = target.querySelector('[data-close]');
      if (closeBtn && typeof closeBtn.focus === 'function') {
        closeBtn.focus();
      } else {
        const wrap = target.querySelector('.pub-popup--wrap') || target;
        wrap.setAttribute('tabindex', '-1');
        wrap.focus?.();
      }
    }

    function close(restoreFocus = true) {
      const dim = getDim();

      if (activePopup) activePopup.hidden = true;
      if (dim) dim.hidden = true;

      if (restoreFocus && lastFocus && typeof lastFocus.focus === 'function') {
        lastFocus.focus();
      }

      activePopup = null;
      lastFocus = null;
    }

    function bind() {
      if (isBound) return;
      isBound = true;

      document.addEventListener('click', (e) => {
        // 1) open: 팝업 열기 버튼만 (탭 버튼 data-id 충돌 방지)
        const openBtn = e.target.closest('button.pub-btn[data-id]');
        if (openBtn) {
          const id = openBtn.dataset.id;
          if (id) openById(id);
          return;
        }

        // 2) close: 닫기 버튼
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
    // ✅ 어디서든 동작하게: 전역 init에서 popup도 같이 켜기
    popup.init();
  }

  return { init, utils, popup };
})();

/* ✅ 자동 실행(원하면 유지)
   - 어떤 페이지에서든 ui-script.js만 include하면 팝업이 동작하게 함
   - 만약 가이드처럼 탭 fetch 후 init을 따로 하고 싶으면 이 블록은 삭제해도 됨 */
document.addEventListener('DOMContentLoaded', () => {
  uiScript.init();
});
