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
- “Arrow Upward” icon from [Google Material Symbols](https://fonts.google.com/icons)

## Summary of Phase 1 Structure

Phase 1 established the seven-page website structure, shared navigation,
semantic page sections, club and event content, and the sign-in, club sign-up,
and contact forms.

## Summary of Phase 2 Improvements

Phase 2 focused on styling, layout, and responsiveness. Key improvements:

- **Dedicated stylesheet** — all styling lives in `css/styles.css`, organized with section comments, a consistent crimson/navy colour scheme, and a clear serif-heading type hierarchy.
- **Modern layouts** — Flexbox and CSS Grid used for the navigation, club/event cards, team grid, and two-column form pages.
- **Responsive design** — added the viewport meta tag to every page and media queries so the site works on desktop, laptop, tablet, and mobile. The navigation wraps and the header stacks on smaller screens, and the home hero scales without overflowing the viewport.
- **Consistent structure** — identical header, navigation, and footer across all pages (added the missing nav links on the Sign In page and a footer to every page).
- **Accessibility** — visible keyboard focus states on navigation and footer links, readable colour contrast, and clearly labelled form fields.
- **Visual polish** — hover transitions, box shadows, and card hover effects.

## Summary of Phase 3 JavaScript Functionality

Phase 3 added interactive behaviour using six page-specific and shared
JavaScript files in the `js/` folder:

- **`clubs.js`** — renders club cards dynamically from a data array,
  with live search-by-name and category filtering that update the DOM
  as the user types.
- **`event.js`** — renders expandable event listings with the same
  search and filter behaviour, plus on-page sign-up and update feedback.
- **`signup.js`** — populates the club dropdown dynamically, auto-fills
  its read-only category, tracks the 250-character limit, requires login,
  and shows an on-page confirmation after valid submission.
- **`contact.js`** — requires login and shows inline error or success
  feedback for the contact form without sending data to an external service.
- **`login.js`** — handles the demonstration sign-in, York email format,
  admin mode, and Caps Lock indicator.
- **`auth-nav.js`** — updates the shared navigation between Sign In and
  Sign Out and clears authentication data on sign-out.

**DOM manipulation:** `getElementById`, `querySelector`, `createElement`,
`appendChild`, `innerHTML`, `textContent`, and attribute/style changes.

**Event handling:** `submit`, `change`, `input`, `click`, and keyboard
listeners registered with `addEventListener()`, using
`event.preventDefault()` to validate before submission.

**Validation:** the sign-in form requires a valid `@my.yorku.ca` or
`@yorku.ca` address and a password. Club sign-up and contact actions require
an authenticated user and complete required fields. Errors appear inline,
and confirmation panels replace successfully completed forms.

**Optional features:** club and event data persist in `localStorage`,
allowing an admin to add and remove records across sessions.
