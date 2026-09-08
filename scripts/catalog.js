
(() => {
  'use strict';

  const products = Array.isArray(window.ZS_PRODUCTS) ? window.ZS_PRODUCTS : [];

  const iconFor = category => ({
    business: '▦',
    vehicle: 'V',
    home: '⌂',
    finance: '€',
    canva: 'C',
    career: 'CV'
  }[category] || '✓');

  const escapeHTML = value => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const productCard = product => {
    const tags = (product.tags || []).map(tag => `<span>${escapeHTML(tag)}</span>`).join('');
    return `
      <article class="product-card" data-category="${escapeHTML(product.category)}">
        ${product.featured ? '<span class="product-featured">Featured</span>' : ''}
        ${product.image ? `
        <div class="product-visual product-visual-image">
          <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.imageAlt || product.title)}" loading="lazy">
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
            ${product.landingPage
              ? `<a class="product-detail-link" href="${escapeHTML(product.landingPage)}">View Details</a>`
              : ''}
            <a class="product-etsy-link" href="${escapeHTML(product.url)}" target="_blank" rel="noopener">View on Etsy →</a>
            <small>Current price on Etsy</small>
          </div>
        </div>
      </article>
    `;
  };

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
          ...(product.tags || [])
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
