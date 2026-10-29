
class CollectionImageSlider extends HTMLElement {
  connectedCallback() {
    if (this.initialized) return;
    this.initialized = true;

    this.track = this.querySelector('[data-cis-track]');
    this.slides = Array.from(
      this.querySelectorAll('[data-cis-slide]')
    );
    this.dots = Array.from(
      this.querySelectorAll('[data-cis-dot]')
    );

    this.prevButton = this.querySelector('[data-cis-prev]');
    this.nextButton = this.querySelector('[data-cis-next]');

    if (!this.track || !this.slides.length) return;

    this.currentIndex = 0;

    this.prevButton?.addEventListener('click', () => {
      this.goToSlide(this.currentIndex - 1);
    });

    this.nextButton?.addEventListener('click', () => {
      this.goToSlide(this.currentIndex + 1);
    });

    this.dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        this.goToSlide(Number(dot.dataset.cisDot));
      });
    });

    this.track.addEventListener('scroll', () => {
      this.updateCurrentSlide();
    }, { passive: true });

    this.slides.forEach((slide) => {
      const image = slide.querySelector('img');

      if (image) {
        if (image.complete) {
          this.syncSliderHeight();
        } else {
          image.addEventListener(
            'load',
            () => this.syncSliderHeight(),
            { once: true }
          );
        }
      }
    });

    window.addEventListener('resize', () => {
      this.syncSliderHeight();
    });

    this.syncSliderHeight();
  }

  goToSlide(index) {
    if (index < 0) index = this.slides.length - 1;
    if (index >= this.slides.length) index = 0;

    this.currentIndex = index;

    const slide = this.slides[index];

    this.track.scrollTo({
      left: slide.offsetLeft - this.track.offsetLeft,
      behavior: 'smooth'
    });

    this.updateDots();
    this.syncSliderHeight();
  }

  updateCurrentSlide() {
    const trackRect = this.track.getBoundingClientRect();
    let closestIndex = 0;
    let closestDistance = Infinity;

    this.slides.forEach((slide, index) => {
      const distance = Math.abs(
        slide.getBoundingClientRect().left - trackRect.left
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    this.currentIndex = closestIndex;
    this.updateDots();
    this.syncSliderHeight();
  }

  syncSliderHeight() {
    const slide = this.slides?.[this.currentIndex];
    if (!slide || !this.track) return;

    const image = slide.querySelector('img');
    if (!image) return;

    const updateHeight = () => {
      if (!image.naturalWidth || !image.naturalHeight) return;

      const imageHeight = image.getBoundingClientRect().height;
      if (!imageHeight) return;

      this.track.style.height = `${imageHeight}px`;

      const slider = this.querySelector('.cis__slider');
      if (slider) {
        slider.style.height = `${imageHeight}px`;
      }
    };

    if (image.complete && image.naturalWidth > 0) {
      requestAnimationFrame(updateHeight);
    } else {
      image.addEventListener('load', updateHeight, { once: true });
    }
  }

  updateDots() {
    this.dots.forEach((dot, index) => {
      const active = index === this.currentIndex;

      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-current', active ? 'true' : 'false');
    });
  }
}

if (!customElements.get('collection-image-slider')) {
  customElements.define(
    'collection-image-slider',
    CollectionImageSlider
  );
}
