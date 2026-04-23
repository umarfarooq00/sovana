/**
 * Sovana — Scroll & Entrance Animations
 * Lightweight IntersectionObserver-based reveal system.
 * Respects prefers-reduced-motion automatically via CSS.
 */

(function () {
  'use strict';

  // Elements to watch for scroll-reveal
  const SELECTORS = [
    '.product-card',
    '.values__card',
    '.stats__item',
    '.trust__item',
    '.about-story__block',
    '.editorial-block',
    '.collection-links__container > *',
    '.product-recommendations .product-card',
    '.featured-blog-posts__card',
    '.policy__content',
  ].join(', ');

  // Stagger siblings inside these containers
  const STAGGER_PARENTS = [
    '.values__grid',
    '.stats__grid',
    '.trust__grid',
    '.product-grid',
    '.collection-grid',
  ].join(', ');

  function initScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('sovana-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }
    );

    // Apply stagger to grid children
    document.querySelectorAll(STAGGER_PARENTS).forEach((parent) => {
      Array.from(parent.children).forEach((child, i) => {
        child.style.setProperty('--stagger', i);
      });
    });

    // Observe all target elements
    document.querySelectorAll(SELECTORS).forEach((el) => {
      el.classList.add('sovana-animate');
      observer.observe(el);
    });
  }

  // Section headings — fade up independently
  function initHeadingReveal() {
    const headingSelectors = [
      '.section h2',
      '.section h3',
      '.about-values-section h2',
      '.about-stats-section h2',
    ].join(', ');

    const headingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('sovana-heading-visible');
            headingObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -32px 0px' }
    );

    document.querySelectorAll(headingSelectors).forEach((el) => {
      el.classList.add('sovana-heading-animate');
      headingObserver.observe(el);
    });
  }

  // Run after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollReveal();
      initHeadingReveal();
    });
  } else {
    initScrollReveal();
    initHeadingReveal();
  }
})();
