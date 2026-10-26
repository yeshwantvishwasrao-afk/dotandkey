
document.querySelectorAll('.dev-tabs').forEach((container) => {
  const tabs = container.querySelectorAll('[data-tab-button]');
  const panels = container.querySelectorAll('[data-tab-panel]');
  const buttons = container.querySelector('.dev-tabs__buttons');
  const prev = container.querySelector('[data-tabs-prev]');
  const next = container.querySelector('[data-tabs-next]');

  // Show the selected collection
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      tabs.forEach((button, i) => {
        button.classList.toggle('active', i === index);
        button.setAttribute('aria-selected', i === index);
        panels[i].hidden = i !== index;
      });
    });
  });

  // Scroll the tab buttons
  if (buttons && prev && next) {
    prev.addEventListener('click', () => {
      buttons.scrollBy({ left: -200, behavior: 'smooth' });
    });

    next.addEventListener('click', () => {
      buttons.scrollBy({ left: 200, behavior: 'smooth' });
    });
  }
});
