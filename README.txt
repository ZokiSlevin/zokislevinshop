ZokiSlevinShop Website V4 - Clean URLs + Custom Contact
===========================================================

CLEAN URL STRUCTURE
-------------------
/
/catalog/
/business/
/vehicle/
/home-property/
/finance/
/productivity/
/presets/
/other/
/contact/

On a custom domain, visitors see URLs such as:
https://zoran-macesic.from.hr/
https://zoran-macesic.from.hr/business/
https://zoran-macesic.from.hr/contact/

No .html filenames appear in normal navigation. Each route is a folder containing index.html.

GITHUB PAGES
------------
Upload the CONTENTS of this folder to the branch/folder used by GitHub Pages.
The included .nojekyll file is intentional.

CUSTOM DOMAIN
-------------
CNAME.example.txt is included. After the domain is configured in GitHub Pages, rename it to CNAME and keep only the domain name in that file.
If your final domain is not zoran-macesic.from.hr, also update sitemap.xml.

CONTACT FORM
------------
The contact form sends inquiries to:
zmacesic@gmail.com

This static site uses FormSubmit. On the first real submission, FormSubmit may send an activation email to zmacesic@gmail.com. Confirm it once. Mailto links are also included as fallback.

CUSTOM PROJECT SERVICES
-----------------------
The site now clearly promotes custom work for:
- Excel spreadsheets and dashboards
- trackers
- planners and checklists
- business / vehicle / property / finance tools
- custom formulas, summaries, alerts and charts

A fixed Custom Project button stays visible while scrolling on desktop and mobile and opens a modern slide-in contact form.

PRODUCT LINKS
-------------
All 41 Etsy products are centralized in scripts/products.js.
Each product uses the direct Etsy listing URL supplied in the 2026-09-24 listing update; search-query fallbacks are no longer used.


LOCAL TESTING + CLEAN URLS
--------------------------
This V4.1 package supports both modes:

A) LOCAL, double-click / file://
   The JavaScript automatically converts folder links such as:
     business/
   into:
     business/index.html
   so the browser does not show a folder directory listing.

B) GITHUB PAGES / WEB HOSTING
   No rewrite is applied. The visible public URLs remain:
     /
     /business/
     /vehicle/
     /home-property/
     /catalog/
     /contact/

This means you can test locally without changing the clean URL structure used online.


V4.2 ROOT HTML STRUCTURE
------------------------
All HTML pages are back in the website root:

index.html
catalog.html
business.html
vehicle.html
home-property.html
finance.html
productivity.html
presets.html
other.html
contact.html
404.html

This structure works directly when opening index.html locally with a double-click.
No category folders are required.

Note:
On normal static hosting/GitHub Pages these URLs will normally appear as
/business.html, /vehicle.html, etc. Clean URLs without .html require server-side
rewrites or a folder/index.html structure.


V5 SEO UPGRADE
--------------
See SEO_REPORT.txt for the full list of changes.

Canonical domain currently configured:
https://zoran-macesic.from.hr

If a different domain is chosen before launch, the canonical, Open Graph, JSON-LD,
robots.txt and sitemap.xml URLs must be updated to the final domain.


V6.1 NAVIGATION FIX
-------------------
- Home links now explicitly point to index.html, which works correctly when testing locally via file://.
- The duplicate Home & Property active state on the homepage was removed.
- Homepage navigation now includes:
  Home
  Categories
  Featured
  Custom Work
  About
  All Products
- Section links scroll smoothly within the homepage.
- The currently visible homepage section is highlighted while scrolling.


V6.2 LIVE DOMAIN SEO
--------------------
Production domain: https://zoran-macesic.from.hr

Updated for the live GitHub Pages custom domain:
- Canonical URLs
- Open Graph URLs and images
- Twitter image URLs
- JSON-LD / structured data
- Product landing-page schemas
- Breadcrumb schemas
- sitemap.xml
- robots.txt
- GitHub Pages CNAME

The 404 page is set to noindex,follow.

IMPORTANT: Upload the CONTENTS of this folder to the repository root.
Keep the included CNAME file in the repository; it contains only:
zoran-macesic.from.hr

CLEAN URL UPDATE - 2026-09-08
-----------------------------
Public/internal links now use extensionless GitHub Pages URLs:
  /catalog instead of /catalog.html
  /new-grad-nurse-resume-bundle instead of /new-grad-nurse-resume-bundle.html
  /#categories, /#featured, /#custom-work, /#about and /#contact for Home sections.

The physical .html files remain in the repository because GitHub Pages serves them at the matching extensionless URL. A small History API normalizer also removes .html (and /index.html) from the visible browser URL when an old/bookmarked .html URL is opened. Canonical URLs and sitemap entries use the clean form.


V7 ETSY CATALOG SYNC - 2026-09-24
---------------------------------
- Catalog synchronized to 41 active Etsy listings.
- Exact supplied listing titles and direct listing URLs centralized in scripts/products.js.
- Added 10 products that were missing from the previous 30-product website.
- Updated homepage/category counts and featured products.
- Removed legacy Etsy shop-search fallback links from product CTAs and structured data.
- Standardized footer category navigation across the website.
- Updated catalog SEO copy and sitemap last-modified dates.

V8 CONSISTENT PRODUCT DETAILS MODAL - 2026-09-24
-------------------------------------------------
- Every product card now uses the same two actions: View Details and View on Etsy.
- View Details opens a single reusable modal instead of sending only selected products to separate landing pages.
- The modal contains the product category, format, delivery type, short description, What's Included list and Key Features list.
- The modal closes with the X button, by clicking outside the panel, or with the Esc key.
- Keyboard focus is returned to the product card button after closing.
- Mobile layout expands the modal to nearly the full screen for easier reading.
- All 41 modal records are centralized in scripts/products.js, together with the exact Etsy listing title and URL.
- Existing detailed product HTML pages are retained for SEO / indexed traffic, but the uneven "Detailed product pages" sections were removed from category pages so every catalog item has the same browsing path.
- Existing direct Etsy checkout links remain available on every card and inside every modal.

2026-09-24 PRODUCT PREVIEW IMAGE UPDATE
- All 41 catalog products now display a product preview image.
- Added China Import Inventory Planner as the 41st product under Business & Freelancer, with a local preview image and direct Etsy link.
- Existing local product previews were preserved.
- Products that previously used only a category icon now use the current Etsy listing preview image from i.etsystatic.com.
- If an external preview image cannot load (for example when testing fully offline without internet), the card automatically falls back to the original category icon so the layout remains usable.
- View Details modals use the same product preview image and the same fallback behavior.


V9 SOCIAL + HOME POLISH - 2026-09-24
--------------------------------------
- Added Instagram profile: https://www.instagram.com/zokislevinshop/
- Added Pinterest profile: https://www.pinterest.com/ZokiSlevinShop/
- Social links are shown in the footer across the website.
- Homepage About section includes compact Instagram and Pinterest follow links.
- OnlineStore structured data sameAs now connects Etsy, Instagram and Pinterest.
- Removed the duplicate second Custom Work marketing section from the homepage; the original custom-project block is now the #custom-work navigation target.
- Added capability chips to the retained Custom Work section so the useful SEO/context terms remain visible without repeating the same sales message twice.
- Added cursor:pointer to the shared .btn style so button elements such as Custom Project consistently show the hand cursor.
