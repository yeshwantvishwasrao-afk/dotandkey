
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[id^="collection-"]').forEach(function (section) {
    const buttons = section.querySelectorAll('[data-tab-button]');
    const panels = section.querySelectorAll('[data-tab-panel]');

    if (!buttons.length || !panels.length) return;

    function activateTab(index) {
      buttons.forEach(function (button, i) {
        button.classList.toggle('active', i === index);
        button.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });

      panels.forEach(function (panel, i) {
        const isActive = i === index;
        panel.hidden = !isActive;
        panel.classList.toggle('active', isActive);
      });
    }

    buttons.forEach(function (button, index) {
      button.addEventListener('click', function (event) {
        event.preventDefault();
        activateTab(index);
      });
    });

    activateTab(
      Math.max(0, Array.from(buttons).findIndex(function (button) {
        return button.classList.contains('active');
      }))
    );
  });
});
