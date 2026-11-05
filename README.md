# HIGH MEDIA Portal

Team work-management portal for HIGH MEDIA (Faisal & Abdulrahman): websites, online stores and social media (Reels & posts).

## Features
- PIN sign-in per person, with personal links (`#faisal`, `#abdulrahman`)
- Live task board (To do → In progress → Review → Done) with checklists; every step records who did it and when
- "Who completed what" weekly chart per person
- Leads & clients pipeline: Potential lead → In discussion → Closing → Client, or Lost (with reason)
- Client categories (Doctors & clinics, Online stores, Restaurants & cafés, Beauty & salons, Real estate, Companies & services, Other) with category and service filters
- Time-stamped notes per client, and process steps per lead
- Portfolio of delivered work with website and social links
- Full activity log
- Arabic / English with right-to-left layout; works on phones, tablets and desktops

## Data
`index.html` is a single self-contained page. Its shared data currently runs on the claude.ai artifact runtime (`window.claude` database), so the live, working copy is the claude.ai artifact. Opened anywhere else (a local file, Vercel), the page loads but shows "not connected".

To host it on Vercel, the data layer needs its own backend (Firebase Firestore + Email/Password sign-in is the planned option).
