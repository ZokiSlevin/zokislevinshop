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
The existing Etsy URLs and search fallbacks remain centralized in scripts/products.js.


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
