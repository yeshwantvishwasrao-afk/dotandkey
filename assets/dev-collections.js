/* ===== dev-ys-collection-list : Dot & Key style category tiles ===== */

/* one scrollable row, snaps to tiles */
.dev-ys-collection-list .collection-list {
  display: flex !important;
  flex-wrap: nowrap !important;
  gap: 20px;
  margin: 0;
  padding: 0;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}
.dev-ys-collection-list .collection-list::-webkit-scrollbar { display: none; }

/* 4 tiles visible on desktop */
.dev-ys-collection-list .collection-list .collection-list__item {
  flex: 0 0 calc(23% - 5px) !important;
  width: calc(23% - 5px) !important;
  max-width: none !important;
  margin: 0 !important;
  padding: 0 !important;
  scroll-snap-align: start;
}

/* card: image with title + arrow laid on top of it */
.dev-ys-collection-list .card {
  display: grid;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: transparent;
}
.dev-ys-collection-list .card__inner,
.dev-ys-collection-list .card__content {
  grid-area: 1 / 1;
}
.dev-ys-collection-list .card__inner {
  border-radius: 0;
  width: 100%;
}
/* tile shape: about 1.17 : 1 */
.dev-ys-collection-list .card__inner.ratio::before {
  padding-bottom: 85% !important;
}
.dev-ys-collection-list .card__media img {
  object-fit: cover;
  transition: transform 0.4s ease;
}
.dev-ys-collection-list .card:hover .card__media img { transform: scale(1.05); }

/* bottom gradient + title (kept static so the whole tile stays one link) */
.dev-ys-collection-list .card__content {
  position: static !important;
  align-self: end;
  z-index: 2;
  padding: 60px 70px 18px 18px !important;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
  pointer-events: none;
}
.dev-ys-collection-list .card__information {
  padding: 0 !important;
}
.dev-ys-collection-list .card__heading,
.dev-ys-collection-list .card__heading a {
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: 0;
  color: #fff;
  text-decoration: none;
}
.dev-ys-collection-list .card__heading a { pointer-events: auto; }

/* arrow -> round glass button, bottom right */
.dev-ys-collection-list .card__heading .icon-wrap {
  position: absolute;
  right: 16px;
  bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin: 0;
  border-radius: 50%;
  border: 1.5px solid #fff;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(4px);
  overflow: visible;
  color: #fff;
}
.dev-ys-collection-list .card__heading .icon-wrap svg,
.dev-ys-collection-list .card__heading .icon-arrow {
  width: 16px;
  height: 16px;
  transform: none !important;
  color: #fff;
}
.dev-ys-collection-list .card__description { display: none; }

@media (max-width: 989px) {
  .dev-ys-collection-list .collection-list .collection-list__item {
    flex-basis: calc(45% - 10px) !important;
    width: calc(45% - 10px) !important;
  }
}
@media (max-width: 749px) {
  .dev-ys-collection-list .collection-list { gap: 14px; }
  .dev-ys-collection-list .collection-list .collection-list__item {
    flex-basis: 72% !important;
    width: 72% !important;
  }
  .dev-ys-collection-list .card__heading,
  .dev-ys-collection-list .card__heading a { font-size: 1.8rem; }
}