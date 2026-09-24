(() => {
  'use strict';

  const products = Array.isArray(window.ZS_PRODUCTS) ? window.ZS_PRODUCTS : [];

  const iconFor = category => ({
    business: '▦',
    vehicle: 'V',
    home: '⌂',
    finance: '€',
    canva: 'C',
    career: 'CV',
    productivity: '✓',
    presets: '✦',
    other: '♥'
  }[category] || '✓');

  const escapeHTML = value => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const listHTML = items => (items || [])
    .map(item => `<li>${escapeHTML(item)}</li>`)
    .join('');

  const productCard = product => {
    const tags = (product.tags || []).map(tag => `<span>${escapeHTML(tag)}</span>`).join('');
    return `
      <article class="product-card" data-category="${escapeHTML(product.category)}">
        ${product.featured ? '<span class="product-featured">Featured</span>' : ''}
        ${product.image ? `
        <div class="product-visual product-visual-image">
          <div class="product-image-fallback" aria-hidden="true">
            <div class="product-mark">${escapeHTML(iconFor(product.category))}</div>
          </div>
          <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.imageAlt || product.title)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.hidden=true; this.parentElement.classList.add('is-image-fallback');">
          <span class="product-category">${escapeHTML(product.categoryLabel)}</span>
        </div>` : `
        <div class="product-visual">
          <div class="product-mark" aria-hidden="true">${escapeHTML(iconFor(product.category))}</div>
          <span class="product-category">${escapeHTML(product.categoryLabel)}</span>
        </div>`}
        <div class="product-body">
          <h3>${escapeHTML(product.title)}</h3>
          <p class="product-subtitle">${escapeHTML(product.subtitle)}</p>
          <p class="product-description">${escapeHTML(product.description)}</p>
          <div class="product-tags">${tags}</div>
          <div class="product-actions product-actions-stack">
            <button class="product-detail-link" type="button" data-product-id="${escapeHTML(product.id)}" aria-haspopup="dialog">View Details</button>
            <a class="product-etsy-link" href="${escapeHTML(product.url)}" target="_blank" rel="noopener">View on Etsy →</a>
            <small>Checkout and delivery on Etsy</small>
          </div>
        </div>
      </article>
    `;
  };

  let modal = null;
  let modalPanel = null;
  let modalContent = null;
  let lastTrigger = null;

  function ensureProductModal() {
    if (modal) return modal;

    document.body.insertAdjacentHTML('beforeend', `
      <div class="product-modal" id="product-detail-modal" aria-hidden="true">
        <div class="product-modal-backdrop" data-product-modal-close></div>
        <section class="product-modal-panel" role="dialog" aria-modal="true" aria-labelledby="product-modal-title" tabindex="-1">
          <button class="product-modal-close" type="button" aria-label="Close product details" data-product-modal-close>
            <span aria-hidden="true">×</span>
          </button>
          <div class="product-modal-content" id="product-modal-content"></div>
        </section>
      </div>
    `);

    modal = document.getElementById('product-detail-modal');
    modalPanel = modal.querySelector('.product-modal-panel');
    modalContent = document.getElementById('product-modal-content');

    modal.addEventListener('click', event => {
      if (event.target.closest('[data-product-modal-close]')) closeProductModal();
    });

    document.addEventListener('keydown', event => {
      if (!modal.classList.contains('is-open')) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        closeProductModal();
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = [...modalPanel.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )].filter(el => !el.hidden && el.offsetParent !== null);

      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    return modal;
  }

  function modalVisual(product) {
    if (product.image) {
      return `
        <div class="product-modal-preview product-modal-preview-image">
          <div class="product-modal-image-fallback" aria-hidden="true">
            <div class="product-modal-mark">${escapeHTML(iconFor(product.category))}</div>
            <span>${escapeHTML(product.categoryLabel)}</span>
          </div>
          <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.imageAlt || product.title)}" decoding="async" referrerpolicy="no-referrer" onerror="this.hidden=true; this.parentElement.classList.add('is-image-fallback');">
        </div>
      `;
    }

    return `
      <div class="product-modal-preview">
        <div class="product-modal-mark" aria-hidden="true">${escapeHTML(iconFor(product.category))}</div>
        <span>${escapeHTML(product.categoryLabel)}</span>
      </div>
    `;
  }

  function openProductModal(productId, trigger) {
    const product = products.find(item => item.id === productId);
    if (!product) return;

    ensureProductModal();
    lastTrigger = trigger || document.activeElement;

    const badges = [product.categoryLabel, product.format, product.delivery]
      .filter(Boolean)
      .map(value => `<span>${escapeHTML(value)}</span>`)
      .join('');

    modalContent.innerHTML = `
      <div class="product-modal-hero">
        ${modalVisual(product)}
        <div class="product-modal-heading">
          <div class="product-modal-badges">${badges}</div>
          <h2 id="product-modal-title">${escapeHTML(product.title)}</h2>
          <p class="product-modal-subtitle">${escapeHTML(product.subtitle)}</p>
          <p class="product-modal-description">${escapeHTML(product.description)}</p>
        </div>
      </div>

      <div class="product-modal-detail-grid">
        <section class="product-modal-detail-card">
          <h3>What’s included</h3>
          <ul>${listHTML(product.included)}</ul>
        </section>
        <section class="product-modal-detail-card">
          <h3>Key features</h3>
          <ul>${listHTML(product.features)}</ul>
        </section>
      </div>

      <div class="product-modal-footer">
        <div>
          <strong>Ready to see the full listing?</strong>
          <span>Current pricing, availability, checkout and digital delivery are handled on Etsy.</span>
        </div>
        <a class="btn btn-primary product-modal-etsy" href="${escapeHTML(product.url)}" target="_blank" rel="noopener">View on Etsy →</a>
      </div>
    `;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('product-modal-open');

    requestAnimationFrame(() => {
      const closeButton = modal.querySelector('.product-modal-close');
      if (closeButton) closeButton.focus();
      else modalPanel.focus();
    });
  }

  function closeProductModal() {
    if (!modal || !modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('product-modal-open');

    if (lastTrigger && typeof lastTrigger.focus === 'function') {
      lastTrigger.focus();
    }
    lastTrigger = null;
  }

  document.addEventListener('click', event => {
    const trigger = event.target.closest('.product-detail-link[data-product-id]');
    if (!trigger) return;
    event.preventDefault();
    openProductModal(trigger.dataset.productId, trigger);
  });

  function initFeatured() {
    const grid = document.getElementById('featured-grid');
    if (!grid) return;

    const requestedIds = (grid.dataset.productIds || '')
      .split(',')
      .map(id => id.trim())
      .filter(Boolean);

    const featured = requestedIds.length
      ? requestedIds.map(id => products.find(product => product.id === id)).filter(Boolean)
      : products.filter(product => product.featured).slice(0, 6);

    grid.innerHTML = featured.map(productCard).join('');
  }

  function initCatalog() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    const bodyCategory = document.body.dataset.catalogCategory || 'all';
    const search = document.getElementById('product-search');
    const empty = document.getElementById('catalog-empty');
    const count = document.getElementById('catalog-count');
    const filterButtons = [...document.querySelectorAll('.filter-btn')];
    let filter = bodyCategory === 'all' ? 'all' : bodyCategory;

    const render = () => {
      const term = (search?.value || '').trim().toLowerCase();

      const visible = products.filter(product => {
        const matchesCategory = filter === 'all' || product.category === filter;
        const haystack = [
          product.title,
          product.subtitle,
          product.description,
          product.categoryLabel,
          product.format,
          product.delivery,
          ...(product.tags || []),
          ...(product.included || []),
          ...(product.features || [])
        ].join(' ').toLowerCase();
        const matchesSearch = !term || haystack.includes(term);
        return matchesCategory && matchesSearch;
      });

      grid.innerHTML = visible.map(productCard).join('');
      if (empty) empty.hidden = visible.length !== 0;
      if (count) count.textContent = visible.length;
    };

    if (search) search.addEventListener('input', render);

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filter = button.dataset.filter || 'all';
        filterButtons.forEach(btn => btn.classList.toggle('active', btn === button));
        render();
      });
    });

    render();
  }

  initFeatured();
  initCatalog();
})();
