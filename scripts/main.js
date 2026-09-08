// Clean public URLs on GitHub Pages while keeping the existing flat .html files.
(() => {
  const { pathname, search, hash } = window.location;
  let cleanPath = pathname;

  if (cleanPath.endsWith('/index.html')) {
    cleanPath = cleanPath.slice(0, -10) || '/';
  } else if (cleanPath.endsWith('/index')) {
    cleanPath = cleanPath.slice(0, -6) || '/';
  } else if (cleanPath.endsWith('.html')) {
    cleanPath = cleanPath.slice(0, -5);
  }

  if (cleanPath !== pathname) {
    history.replaceState(null, '', cleanPath + search + hash);
  }
})();

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


// Contact shortcuts + smooth section navigation
(() => {
  const contactTarget = document.getElementById('contact');
  const contactOpeners = [document.getElementById('open-contact'), ...document.querySelectorAll('.js-open-contact')].filter(Boolean);

  contactOpeners.forEach(control => {
    control.addEventListener('click', event => {
      if (!contactTarget) return;
      event.preventDefault();
      contactTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', '#contact');
    });
  });

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

  /* Highlight homepage sections while scrolling. On subpages, hash links
     still scroll smoothly but do not overwrite the page's active navigation state. */
  const isHomePage = location.pathname.endsWith('/') || location.pathname.endsWith('/index.html') || location.pathname.endsWith('/index');
  if (homeSectionLinks.length && isHomePage && 'IntersectionObserver' in window) {
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
        const home = document.querySelector('.primary-nav a[href="/"]');
        if (home) home.classList.add('active');
      }
    }, { passive: true });
  }

})();
