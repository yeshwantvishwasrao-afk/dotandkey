
(function () {
  function initCollectionTabs() {
    document.querySelectorAll('[data-collection-tabs]').forEach(function (section) {
      if (section.dataset.tabsInitialized === 'true') return;
      section.dataset.tabsInitialized = 'true';

      const buttons = section.querySelectorAll('[data-tab-button]');
      const panels = section.querySelectorAll('[data-tab-panel]');
      const tabList = section.querySelector('.dev-tabs__buttons');
      const prevTab = section.querySelector('[data-tabs-prev]');
      const nextTab = section.querySelector('[data-tabs-next]');

      if (!buttons.length || !panels.length) return;

      function activateTab(index) {
        if (index < 0 || index >= Math.min(buttons.length, panels.length)) return;

        buttons.forEach(function (button, i) {
          const active = i === index;
          button.classList.toggle('active', active);
          button.setAttribute('aria-selected', String(active));
          button.setAttribute('tabindex', active ? '0' : '-1');
        });

        panels.forEach(function (panel, i) {
  const active = i === index;

  panel.hidden = !active;
  panel.classList.toggle('active', active);

  if (active) {
    panel.querySelectorAll('.scroll-trigger').forEach(function (el) {
      el.classList.remove('scroll-trigger--offscreen');
    });
  }
});
      buttons.forEach(function (button, index) {
        button.addEventListener('click', function (event) {
          event.preventDefault();
          activateTab(index);
        });
      });

      const activeIndex = Array.from(buttons).findIndex(function (button) {
        return button.classList.contains('active');
      });

      activateTab(activeIndex >= 0 ? activeIndex : 0);

      // Collection tab navigation arrows
      function updateTabArrows() {
        if (!tabList || !prevTab || !nextTab) return;

        const hasOverflow = tabList.scrollWidth > tabList.clientWidth + 2;
        prevTab.classList.toggle('hidden', !hasOverflow);
        nextTab.classList.toggle('hidden', !hasOverflow);

        if (hasOverflow) {
          prevTab.disabled = tabList.scrollLeft <= 1;
          nextTab.disabled =
            tabList.scrollLeft + tabList.clientWidth >= tabList.scrollWidth - 2;
        }
      }

      if (tabList && prevTab && nextTab) {
        prevTab.addEventListener('click', function () {
          tabList.scrollBy({ left: -180, behavior: 'smooth' });
        });

        nextTab.addEventListener('click', function () {
          tabList.scrollBy({ left: 180, behavior: 'smooth' });
        });

        tabList.addEventListener('scroll', updateTabArrows, { passive: true });
        window.addEventListener('resize', updateTabArrows);
        updateTabArrows();
      }

      // Product carousel navigation
      section.querySelectorAll('.dev-product-slider').forEach(function (slider) {
        const track = slider.querySelector('.dev-product-slider__track');
        const prev = slider.querySelector('[data-product-prev]');
        const next = slider.querySelector('[data-product-next]');

        if (!track) return;

        if (prev) {
          prev.addEventListener('click', function () {
            track.scrollBy({
              left: -track.clientWidth * 0.8,
              behavior: 'smooth'
            });
          });
        }

        if (next) {
          next.addEventListener('click', function () {
            track.scrollBy({
              left: track.clientWidth * 0.8,
              behavior: 'smooth'
            });
          });
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCollectionTabs);
  } else {
    initCollectionTabs();
  }

  document.addEventListener('shopify:section:load', initCollectionTabs);
})();
