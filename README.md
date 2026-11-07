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
- Content library: upload and download images, Reels, videos and other files. Each file is marked as a client's content or as a demo — for specific leads (or any lead) or for internal use. Type is detected automatically (portrait videos become Reels) and can be changed. Every file shows a preview (image, or a frame from the video with its length), plays in the portal, and images open full size with previous / next. Filter by purpose, type, client, lead or demo result; each client and lead profile shows its own files
  - **Posting schedule & reminders:** give client content a post date (and time, optional) and "what to post" (caption, hashtags, where). On the day, the portal reminds you which client it's for and what to post — inside the portal, as a notification on each device where you turned reminders on, and in your phone's calendar if you tap *Add to calendar*. Mark each post as posted; missed posts show as late. The schedule is on the Overview and the Content page, with a badge on Content
  - **Demo results:** on a demo made for leads, mark each lead *Converted to client* or *Lost* (with the reason), or reopen it. This updates the lead itself on Leads & clients
  - **Download on any device** with the original file name (Arabic names too); on phones, *Save / Share* saves to Photos or sends to WhatsApp
  - **Compression:** files are compressed without any loss before they're stored, when that saves at least 15%, and come back as the exact original when downloaded. Photo and video formats (JPEG, PNG, HEIC, MP4, MOV) are already compressed by design, so they barely shrink and are stored as is; documents and design files (PDF, PSD, TIFF, BMP, AI, SVG…) often shrink a lot. Each file shows how much space it takes in storage
- Full activity log
- Arabic / English with right-to-left layout; works on phones, tablets and desktops

## Files
| File | What it is |
|---|---|
| `index.html` | The whole portal (one page, no build step) |
| `config.js` | Your Firebase project settings |
| `firestore.rules` | Database security: only the two team accounts can read or write |
| `storage.rules` | File storage security for the Content page: only the two team accounts can see, upload or delete files |
| `sw.js`, `manifest.webmanifest`, `icon-*.png` | Let the portal show reminder notifications (also on phones) and be added to the Home Screen as an app |
| `cors.json` | Optional storage setting: lets phones use *Save / Share* and makes downloads restore compressed files in the page itself |

## Setup: make it work on any device (about 10 minutes)

The portal stores its data in **Firebase** (Google). The free plan is more than enough for two people.

1. **Create the project.** Go to https://console.firebase.google.com → *Create a project* → name it `high-media` → turn Google Analytics off → *Create project*.
2. **Turn on the database.** *Build → Firestore Database → Create database* → choose a location near you (e.g. `me-central2`) → *Start in production mode*.
3. **Paste the security rules.** Firestore → *Rules* → delete everything → paste the contents of `firestore.rules` → *Publish*. No editing needed.
   If you get "Line 1: Parse error", an invisible character was copied in front of line 1: delete line 1 and type `rules_version = '2';` by hand.
4. **Turn on sign-in.** *Build → Authentication → Get started → Email/Password → Enable → Save*. Do **not** add users; each of you creates your own account in the portal.
5. **Get the web settings.** Gear icon → *Project settings* → *Your apps* → the `</>` (Web) icon → name it `portal` → *Register app*. Copy the `firebaseConfig` values into `config.js` and commit. (They are not secret; the rules protect the data.)
6. **Allow your web address.** Authentication → *Settings → Authorized domains → Add domain*: add the address where the portal is hosted (e.g. `high-media.vercel.app`).

### Turn on file storage (for the Content page)
The Content page keeps files in **Cloud Storage for Firebase**. Everything else in the portal works without it.

1. **Upgrade to the Blaze plan.** Firebase now requires the Blaze (pay-as-you-go) plan for Cloud Storage. Blaze still includes a no-cost allowance (around 5 GB stored and 100 GB downloaded per month for buckets in a US region), and you only pay above it. Firebase console → *Upgrade* (bottom left) → *Blaze*. Then set a budget alert: Google Cloud console → *Billing → Budgets & alerts* (e.g. 5 USD), so you're warned before anything is charged.
2. **Create the storage.** *Build → Storage → Get started* → choose a location (pick `US-CENTRAL1`, `US-EAST1` or `US-WEST1` to stay within the no-cost allowance) → *Start in production mode*.
3. **Paste the storage rules.** Storage → *Rules* → delete everything → paste the contents of `storage.rules` → *Publish*. When Firebase asks to let Storage read Firestore, click *Grant* (the rules use it to check that you're one of the two team accounts).

Uploads are limited to 500 MB per file. Big reels upload with a progress bar; keep the page open until they finish.
**Copy link** on a file gives a private link you can send to a client or lead (for example on WhatsApp). Anyone with that link can view the file, so only share it with the person it's for. Deleting the file in the portal stops the link working.

### Reminders on each device
Open the portal on each phone or computer you use, go to **Content** (or a scheduled file) and tap **Turn on reminders on this device**, then allow notifications.
- **Android / computers:** works in Chrome, Edge and Firefox. A reminder appears on the day of each post (at its time, if you set one) while the portal is open in a tab or as an app.
- **iPhone / iPad:** Apple only allows notifications for web apps added to the Home Screen: in Safari tap *Share → Add to Home Screen*, open HIGH MEDIA from the Home Screen, then turn reminders on.
- **Reminders even when the portal is closed:** on a scheduled file tap **Add to calendar** (or *Google Calendar*). Your phone's calendar then alerts you on the day (at 9:00, or at the post's time), with the client, what to post and a link to the file.

### Optional: Save / Share on phones (5 minutes)
To let phones save files straight to Photos or share them to WhatsApp, allow the portal to read files from your storage. In the Google Cloud console open **Cloud Shell** (the `>_` icon, top right) for project `high-media-87805`, upload `cors.json` from this repository (⋮ → *Upload*), then run:
```
gcloud storage buckets update gs://high-media-87805.firebasestorage.app --cors-file=cors.json
```
Without it, *Download* still works everywhere and keeps the original name.

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
