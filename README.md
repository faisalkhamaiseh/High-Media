# HIGH MEDIA Portal

Team work-management portal for HIGH MEDIA (Faisal & Abdulrahman): websites, online stores and social media (Reels & posts).

## Features
- Sign-in per person, with personal links (`#faisal`, `#abdulrahman`)
- Live task board (To do → In progress → Review → Done) with checklists; every step records who did it and when
- "Who completed what" weekly chart per person
- Leads & clients pipeline: Potential lead → In discussion → Closing → Client, or Lost (with reason)
- Client categories (Doctors & clinics, Online stores, Restaurants & cafés, Beauty & salons, Real estate, Companies & services, Other) with category and service filters
- Time-stamped notes per client, and process steps per lead
- Portfolio with a profile per client: log delivered Reels, posts, carousels, stories and website pages with sliders, record payments, see the content mix and projects
- Task categories include Carousel and Stories, each with a standard checklist
- Tools & finance: tool subscriptions that turn red when they expire (with renew), subscription history, client payments, revenue by client, monthly net profit and a 6-month revenue vs spending chart (amounts in JOD)
- Weekly target on the overview (default 100 tasks, editable) with pace and each partner's share
- Full activity log
- Arabic / English with right-to-left layout; works on phones, tablets and desktops

## Files
| File | What it is |
|---|---|
| `index.html` | The whole portal (one page, no build step) |
| `config.js` | Your Firebase project settings |
| `firestore.rules` | Database security: only the two team accounts can read or write |

## Setup: make it work on any device (about 10 minutes)

The portal stores its data in **Firebase** (Google). The free plan is more than enough for two people.

1. **Create the project.** Go to https://console.firebase.google.com → *Create a project* → name it `high-media` → turn Google Analytics off → *Create project*.
2. **Turn on the database.** *Build → Firestore Database → Create database* → choose a location near you (e.g. `me-central2`) → *Start in production mode*.
3. **Paste the security rules.** Firestore → *Rules* → delete everything → paste the contents of `firestore.rules` → *Publish*. No editing needed.
   If you get "Line 1: Parse error", an invisible character was copied in front of line 1: delete line 1 and type `rules_version = '2';` by hand.
4. **Turn on sign-in.** *Build → Authentication → Get started → Email/Password → Enable → Save*. Do **not** add users; each of you creates your own account in the portal.
5. **Get the web settings.** Gear icon → *Project settings* → *Your apps* → the `</>` (Web) icon → name it `portal` → *Register app*. Copy the `firebaseConfig` values into `config.js` and commit. (They are not secret; the rules protect the data.)
6. **Allow your web address.** Authentication → *Settings → Authorized domains → Add domain*: add the address where the portal is hosted (e.g. `high-media.vercel.app`).

### First sign-in
Open the portal and pick your name. The first time, it shows **Set up your account**: choose your username and password (8+ characters). From then on you sign in with them, and each device stays signed in.
Each name can be set up once; the first person to set it up keeps it. Set up both accounts soon after the site goes live.

### Forgotten password
1. Firebase → Authentication → *Users*: delete that person's user.
2. Firebase → Firestore → *Data*: delete the documents `members/<name>` and `seats/<name>` (`faisal` or `abdulrahman`).
3. Open the portal and set up the account again. Tasks, leads and notes are kept.

## Hosting on Vercel
1. Go to https://vercel.com/new and import this GitHub repository.
2. Framework preset: **Other**. No build command, no output directory. Click *Deploy*.
3. Every push to `main` redeploys automatically.
4. Add the Vercel address to Firebase's authorized domains (setup step 6 above).

Each person then opens the address on any phone, tablet or computer, picks their name and signs in with their password. Devices stay signed in.

## claude.ai version
The same `index.html` (without the `<head>` wrapper) also runs as a claude.ai artifact, where it uses claude.ai's built-in database and a 4-digit PIN instead of Firebase. The two versions keep separate data.
