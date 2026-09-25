// Keep clean public URLs online, but preserve real .html filenames when the
// site is opened directly from disk (file://) for offline preview.
(() => {
  if (window.location.protocol === 'file:') return;

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

// Offline compatibility. Root-relative links such as /catalog are correct for
// the hosted site, but under file:// they point to the drive root (for example
// D:/catalog). Convert them to the matching local .html files only offline.
(() => {
  if (window.location.protocol !== 'file:') return;

  const toLocalFile = href => {
    if (!href || !href.startsWith('/') || href.startsWith('//')) return href;

    const hashIndex = href.indexOf('#');
    const queryIndex = href.indexOf('?');
    const cutPoints = [hashIndex, queryIndex].filter(index => index >= 0);
    const splitAt = cutPoints.length ? Math.min(...cutPoints) : href.length;
    const route = href.slice(0, splitAt);
    const suffix = href.slice(splitAt);

    if (route === '/') return `index.html${suffix}`;

    const cleanRoute = route.replace(/^\/+|\/+$/g, '');
    if (!cleanRoute) return `index.html${suffix}`;
    if (cleanRoute.endsWith('.html')) return `${cleanRoute}${suffix}`;

    return `${cleanRoute}.html${suffix}`;
  };

  document.querySelectorAll('a[href^="/"]').forEach(link => {
    const href = link.getAttribute('href');
    link.setAttribute('href', toLocalFile(href));
  });
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
    control.dataset.contactBound = '1';
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
        const home = document.querySelector('.primary-nav a[href="/"], .primary-nav a[href="index.html"]');
        if (home) home.classList.add('active');
      }
    }, { passive: true });
  }

})();


// Persistent social shortcuts next to the floating Contact button.
// Added centrally in JavaScript so every page that has the floating Contact
// control automatically receives Instagram and Pinterest as well.
(() => {
  const initFloatingSocials = () => {
    const contactButton = document.getElementById('open-contact');
    if (!contactButton || contactButton.closest('.floating-actions')) return;

    const actions = document.createElement('div');
    actions.className = 'floating-actions';
    actions.setAttribute('aria-label', 'Quick contact and social links');

    const makeSocialLink = ({ href, label, shortLabel, className }) => {
      const link = document.createElement('a');
      link.className = `floating-social ${className}`;
      link.href = href;
      link.target = '_blank';
      link.rel = 'me noopener noreferrer';
      link.setAttribute('aria-label', label);
      link.title = label;

      const icon = document.createElement('span');
      icon.className = 'floating-social-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = shortLabel;
      link.appendChild(icon);
      return link;
    };

    const instagram = makeSocialLink({
      href: 'https://www.instagram.com/zokislevinshop/',
      label: 'ZokiSlevinShop on Instagram',
      shortLabel: 'IG',
      className: 'floating-social-instagram'
    });

    const pinterest = makeSocialLink({
      href: 'https://www.pinterest.com/ZokiSlevinShop/',
      label: 'ZokiSlevinShop on Pinterest',
      shortLabel: 'P',
      className: 'floating-social-pinterest'
    });

    const parent = contactButton.parentNode;
    parent.insertBefore(actions, contactButton);
    actions.append(instagram, pinterest, contactButton);

    // Some pages load main.js before the floating Contact button appears in
    // the markup. Bind the existing smooth-scroll behavior here if needed.
    if (!contactButton.dataset.contactBound) {
      contactButton.dataset.contactBound = '1';
      contactButton.addEventListener('click', event => {
        const contactTarget = document.getElementById('contact');
        if (!contactTarget) return;
        event.preventDefault();
        contactTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', '#contact');
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFloatingSocials, { once: true });
  } else {
    initFloatingSocials();
  }
})();
