
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-collection-tabs], .dev-tabs').forEach(function (section) {
    const buttons = section.querySelectorAll('[data-tab-button]');
    const panels = section.querySelectorAll('[data-tab-panel]');
    const tabList = section.querySelector('.dev-tabs__buttons');
    const prev = section.querySelector('[data-tabs-prev]');
    const next = section.querySelector('[data-tabs-next]');

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

    if (prev && tabList) {
      prev.addEventListener('click', function () {
        tabList.scrollBy({ left: -200, behavior: 'smooth' });
      });
    }

    if (next && tabList) {
      next.addEventListener('click', function () {
        tabList.scrollBy({ left: 200, behavior: 'smooth' });
      });
    }

    const initiallyActive = Array.from(buttons).find(function (button) {
      return button.classList.contains('active');
    });

    if (initiallyActive) {
      activateTab(initiallyActive);
    }
  });
});
