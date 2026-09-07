
(() => {
  'use strict';

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  const year = document.getElementById('year');
  const backToTop = document.querySelector('.back-to-top');

  if (year) year.textContent = new Date().getFullYear();

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', event => {
      if (
        nav.classList.contains('is-open') &&
        !nav.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        nav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
\n\n// Floating custom project contact modal\n(() => {\n  const modal = document.getElementById('contact-modal');\n  const openers = [document.getElementById('open-contact'), ...document.querySelectorAll('.js-open-contact')].filter(Boolean);\n  const closers = [...document.querySelectorAll('[data-close-contact]')];\n  let previousFocus = null;\n  const openModal = () => {\n    if (!modal) return;\n    previousFocus = document.activeElement;\n    modal.classList.add('is-open');\n    modal.setAttribute('aria-hidden','false');\n    document.body.classList.add('modal-open');\n    setTimeout(() => modal.querySelector('input:not([type="hidden"])')?.focus(), 40);\n  };\n  const closeModal = () => {\n    if (!modal) return;\n    modal.classList.remove('is-open');\n    modal.setAttribute('aria-hidden','true');\n    document.body.classList.remove('modal-open');\n    previousFocus?.focus?.();\n  };\n  openers.forEach(btn => btn.addEventListener('click', openModal));\n  closers.forEach(btn => btn.addEventListener('click', closeModal));\n  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });\n


  /* Home page section navigation */
  const homeSectionLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];

  homeSectionLinks.forEach(link => {
    link.addEventListener('click', event => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', link.getAttribute('href'));
    });
  });

  /* Highlight the current homepage section while scrolling.
     Only applies to hash links; page links keep their own active state. */
  if (homeSectionLinks.length && 'IntersectionObserver' in window) {
    const observed = homeSectionLinks
      .map(link => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    const byId = new Map(homeSectionLinks.map(link => [link.getAttribute('href').slice(1), link]));

    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      document.querySelectorAll('.primary-nav a').forEach(a => a.classList.remove('active'));
      const active = byId.get(visible.target.id);
      if (active) active.classList.add('active');
    }, {
      rootMargin: '-25% 0px -60% 0px',
      threshold: [0.05, 0.2, 0.5]
    });

    observed.forEach(section => observer.observe(section));

    window.addEventListener('scroll', () => {
      if (window.scrollY < 120) {
        document.querySelectorAll('.primary-nav a').forEach(a => a.classList.remove('active'));
        const home = document.querySelector('.primary-nav a[href="index.html"]');
        if (home) home.classList.add('active');
      }
    }, { passive: true });
  }

})();\n