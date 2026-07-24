# Summer-Web-Dev---York-University-Club-Hub-Project

<p>York University club website to post events, promotional material and sign ups.</p>

## Team Member Names

- Aditya Rajesh 222015705 aditya45@my.yorku.ca
- Fatuma Tahalil 222241376 fatumat6@yorku.ca
- Saeed Rafieepour 222538862 srafiee@my.yorku.ca
- Maurice Yu 221865589 cyyu22@my.yorku.ca

## Pages Included

- Home
- Explore Clubs
- Club Events
- Club Sign Ups
- About Us
- Contact Us
- Sign In

**GitHub Pages Link:** https://fatuma-tahalil.github.io/Summer-Web-Dev---York-University-Club-Hub-Project/

## Credits

- York University Logo © York University. Used with permission.
- <a href="https://www.flaticon.com/free-icons/tick" title="tick icons">Tick icons created by Alfredo Hernandez - Flaticon</a>
- <a href="https://www.flaticon.com/free-icons/email" title="email icons">Email icons created by hqrloveq - Flaticon</a>
- <a href="https://www.flaticon.com/free-icons/timer" title="timer icons">Timer icons created by hqrloveq - Flaticon</a>
- <a href="https://www.flaticon.com/free-icons/red" title="red icons">Red icons created by hqrloveq - Flaticon</a>
- <a href="https://www.flaticon.com/free-icons/check-box" title="check box icons">Check box icons created by HideMaru - Flaticon</a>
- <a href="https://www.flaticon.com/free-icons/info" title="info icons">Info icons created by Dwi ridwanto - Flaticon</a>
- <a href="https://www.flaticon.com/free-icons/instagram-share" title="instagram share icons">Instagram share icons created by Uniconlabs - Flaticon</a>

## Summary of Phase 2 Improvements

Phase 2 focused on styling, layout, and responsiveness. Key improvements:

- **Dedicated stylesheet** — all styling lives in `css/styles.css`, organized with section comments, a consistent crimson/navy colour scheme, and a clear serif-heading type hierarchy.
- **Modern layouts** — Flexbox and CSS Grid used for the navigation, club/event cards, team grid, and two-column form pages.
- **Responsive design** — added the viewport meta tag to every page and media queries so the site works on desktop, laptop, tablet, and mobile. The navigation wraps and the header stacks on smaller screens, and the home hero scales without overflowing the viewport.
- **Consistent structure** — identical header, navigation, and footer across all pages (added the missing nav links on the Sign In page and a footer to every page).
- **Accessibility** — visible keyboard focus states on navigation and footer links, readable colour contrast, and clearly labelled form fields.
- **Visual polish** — hover transitions, box shadows, and card hover effects.

## Summary of Phase 3 JavaScript Functionality

Phase 3 added interactive behaviour using five JavaScript files in the
`js/` folder:

- **`clubs.js`** — renders club cards dynamically from a data array,
  with live search-by-name and category filtering that update the DOM
  as the user types.
- **`event.js`** — renders expandable event listings with the same
  search and filter behaviour, plus sign-up and update actions.
- **`signup.js`** — populates the club dropdown dynamically, auto-fills
  category and description on selection, and validates the sign-up form
  (York email domain, numeric student ID) before submission.
- **`contact.js`** — validates the contact form and submits it
  asynchronously, showing an on-page success panel.
- **`script.js`** — handles the demonstration sign-in that reveals the
  admin panel.

**DOM manipulation:** `getElementById`, `querySelector`, `createElement`,
`appendChild`, `innerHTML`, `textContent`, and attribute/style changes.

**Event handling:** `DOMContentLoaded`, `submit`, `change`, `input`, and
`click` listeners registered with `addEventListener()`, using
`event.preventDefault()` to validate before submission.

**Validation:** the sign-up and contact forms both check for a valid
`@my.yorku.ca` or `@yorku.ca` address; the sign-up form additionally
uses a regular expression to confirm the student ID is numeric. Errors
appear in a message area beside the form, and a confirmation panel
replaces the form on success.

**Optional features:** club and event data persist in `localStorage`,
allowing an admin to add and remove records across sessions.

> **Note:** the Sign In page is a client-side demonstration only. The
> admin check exists to show conditional rendering and is not real
> authentication.