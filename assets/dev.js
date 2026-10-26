
/* COLLECTION TABS */
function initCollectionTabs() {
  document.querySelectorAll('[data-collection-tabs]').forEach(function (section) {
    if (section.dataset.tabsReady === 'true') return;

    const buttons = section.querySelectorAll('[data-tab-button]');
    const panels = section.querySelectorAll('[data-tab-panel]');
    const tabList = section.querySelector('.dev-tabs__buttons');
    const prevTab = section.querySelector('[data-tabs-prev]');
    const nextTab = section.querySelector('[data-tabs-next]');

    if (!buttons.length || !panels.length) return;

    section.dataset.tabsReady = 'true';

    function activateTab(button) {
      const panelId = button.getAttribute('aria-controls');

      buttons.forEach(function (tab) {
        const active = tab === button;
        tab.classList.toggle('active', active);
        tab.setAttribute('aria-selected', String(active));
        tab.setAttribute('tabindex', active ? '0' : '-1');
      });

      panels.forEach(function (panel) {
        panel.hidden = panel.id !== panelId;
      });
    }

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        activateTab(button);
      });
    });

    if (prevTab && tabList) {
      prevTab.addEventListener('click', function () {
        tabList.scrollBy({ left: -200, behavior: 'smooth' });
      });
    }

    if (nextTab && tabList) {
      nextTab.addEventListener('click', function () {
        tabList.scrollBy({ left: 200, behavior: 'smooth' });
      });
    }

    const activeTab = Array.from(buttons).find(function (button) {
      return button.classList.contains('active');
    }) || buttons[0];

    activateTab(activeTab);
  });
}

/* PRODUCT CAROUSEL */
function initProductSliders() {
  document.querySelectorAll('.dev-product-slider').forEach(function (slider) {
    if (slider.dataset.sliderReady === 'true') return;

    const track = slider.querySelector('.dev-product-slider__track');
    const prev = slider.querySelector('[data-product-prev]');
    const next = slider.querySelector('[data-product-next]');

    if (!track || !prev || !next) return;

    slider.dataset.sliderReady = 'true';

    function scrollProducts(direction) {
      const card = track.querySelector('.dev-product-slider__slide');
      if (!card) return;

      const gap = parseFloat(getComputedStyle(track).columnGap) || 12;
      const distance = card.getBoundingClientRect().width + gap;

      track.scrollBy({
        left: direction * distance,
        behavior: 'smooth'
      });
    }

    prev.addEventListener('click', function () {
      scrollProducts(-1);
    });

    next.addEventListener('click', function () {
      scrollProducts(1);
    });
  });
}

/* INITIALIZE */
function initAllSlidersAndTabs() {
  initCollectionTabs();
  initProductSliders();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllSlidersAndTabs);
} else {
  initAllSlidersAndTabs();
}

document.addEventListener('shopify:section:load', initAllSlidersAndTabs);
