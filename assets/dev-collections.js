/* dev-collection-list.js : scroll the collection row with keyboard Left / Right arrows */
(function () {
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    var t = e.target;
    if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;

    var rows = document.querySelectorAll('.dev-ys-collection-list .collection-list');
    rows.forEach(function (row) {
      var r = row.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return; /* only rows on screen */
      var item = row.querySelector('.collection-list__item');
      var step = item ? item.getBoundingClientRect().width + 20 : 300;
      row.scrollBy({ left: e.key === 'ArrowRight' ? step : -step, behavior: 'smooth' });
    });
  });
})();