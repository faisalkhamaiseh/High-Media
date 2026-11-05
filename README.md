# HIGH MEDIA Portal

Team work-management portal for HIGH MEDIA (Faisal & Abdulrahman): websites, online stores and social media (Reels & posts).

## Features
- Sign-in per person, with personal links (`#faisal`, `#abdulrahman`)
- Live task board (To do → In progress → Review → Done) with checklists; every step records who did it and when
- "Who completed what" weekly chart per person
- Leads & clients pipeline: Potential lead → In discussion → Closing → Client, or Lost (with reason)
- Client categories (Doctors & clinics, Online stores, Restaurants & cafés, Beauty & salons, Real estate, Companies & services, Other) with category and service filters
- Time-stamped notes per client, and process steps per lead
- Portfolio of delivered work with website and social links
- Full activity log
- Arabic / English with right-to-left layout; works on phones, tablets and desktops

## Files
| File | What it is |
|---|---|
| `index.html` | The whole portal (one page, no build step) |
| `config.js` | Your Firebase settings and the two sign-in emails |
| `firestore.rules` | Database security: only your two emails can read or write |

## Setup: make it work on any device (about 10 minutes)

The portal stores its data in **Firebase** (Google). The free plan is more than enough for two people.

1. **Create the project.** Go to https://console.firebase.google.com → *Add project* → name it `high-media` → you can turn Google Analytics off → *Create*.
2. **Turn on the database.** *Build → Firestore Database → Create database* → choose a location near you (e.g. `europe-west` or `me-central`) → *Start in production mode*.
3. **Paste the security rules.** In Firestore → *Rules*, replace everything with the contents of `firestore.rules`, put your two real emails in place of `FAISAL_EMAIL_HERE` and `ABDULRAHMAN_EMAIL_HERE`, then *Publish*.
4. **Turn on sign-in.** *Build → Authentication → Get started → Email/Password → Enable → Save*.
5. **Add the two accounts.** Authentication → *Users → Add user*: one for Faisal, one for Abdulrahman, each with an email and a password (6+ characters).
6. **Get the web settings.** *Project settings* (gear icon) → *General* → *Your apps* → the `</>` (Web) icon → name it `portal` → *Register app*. Copy the `firebaseConfig` values.
7. **Fill in `config.js`** with those values and the same two emails, then commit it. (These values are not secret; the rules in step 3 protect the data.)
8. **Allow your web address.** Authentication → *Settings → Authorized domains → Add domain*: add the address where the portal is hosted (e.g. `high-media.vercel.app`).

## Hosting on Vercel
1. Go to https://vercel.com/new and import this GitHub repository.
2. Framework preset: **Other**. No build command, no output directory. Click *Deploy*.
3. Every push to `main` redeploys automatically.
4. Add the Vercel address to Firebase's authorized domains (step 8 above).

Each person then opens the address on any phone, tablet or computer, picks their name and signs in with their password. Devices stay signed in.

## claude.ai version
The same `index.html` (without the `<head>` wrapper) also runs as a claude.ai artifact, where it uses claude.ai's built-in database and a 4-digit PIN instead of Firebase. The two versions keep separate data.
