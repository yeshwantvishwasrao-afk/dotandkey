document.querySelectorAll('.dev-tabs__navigation').forEach((navigation) => {
  const tabs = navigation.querySelector('.dev-tabs__buttons');
  const prev = navigation.querySelector('[data-tabs-prev]');
  const next = navigation.querySelector('[data-tabs-next]');

  if (!tabs || !prev || !next) return;

  prev.addEventListener('click', () => {
    tabs.scrollBy({ left: -200, behavior: 'smooth' });
  });

  next.addEventListener('click', () => {
    tabs.scrollBy({ left: 200, behavior: 'smooth' });
  });
});