# Sri Narayana Seeds & Pesticides — Website

Premium website for **Sri Narayana Seeds & Pesticides**, Main Road, Dharmavaram.

- 🌐 **Live site:** https://ravisairockey.github.io/NaaKaveri_Agro/
- ⚙️ Built with React + Vite + Tailwind CSS
- 🚀 Every push to `main` auto-deploys via GitHub Actions

---

## 📝 EASY CHANGES GUIDE (no coding knowledge needed)

### 1. Change phone number / WhatsApp / address / timings

Everything lives in **one file**: `src/config.ts`. Open it in any text editor (Notepad works) and edit the values between the quotes:

```ts
export const STORE = {
  name: "Sri Narayana Seeds & Pesticides",
  whatsappNumber: "919347874855",   // WhatsApp: 91 + number, digits only
  phoneDisplay: "+91 94918 30758",  // shown on screen
  phoneTel: "+919491830758",        // call button: +91 + number, digits only
  address: "Anjuman Cir Rd, Maruthinagar, Akkpedianera, Dharmavaram, ...",
  addressShort: "Anjuman Cir Rd, Dharmavaram",
  hours: [
    { day: "Monday – Saturday", time: "8:00 AM – 8:30 PM" },
    { day: "Sunday", time: "8:00 AM – 1:00 PM" },
  ],
  mapsQuery: "Sri Narayana Seeds and Pesticides, Anjuman Circle Road, Dharmavaram",
};
```

> Changing this one file updates the phone/address **everywhere** on the site (top bar, buttons, footer, contact page).

### 1b. 🌐 Telugu / English button

The site has a 🌐 **తెలుగు / English** toggle (top bar + mobile menu). The visitor's choice is remembered. To add or fix a translation, edit **`src/lib/i18n-dict.ts`** — every entry is a pair `[English, తెలుగు]`.

### 2. Replace photos

Drop a new image into `public/images/` using the **exact same file name** (replacing the old one):

| File | Where it appears |
|---|---|
| `public/images/store.jpg` | Shop photo (Home + About/Contact pages) |
| `public/images/hero.jpg` | Homepage top banner |
| `public/images/products/*.jpg` | Product category cards |

Tips: keep photos under ~500 KB, roughly landscape (wide) shape. JPG format is best for photos.

### 3. Run the website on your computer (optional preview)

```bash
npm install     # first time only
npm run dev     # opens http://localhost:5173
```

### 4. Publish changes (make them live)

After editing any file:

```bash
git add .
git commit -m "Update store details"
git push
```

GitHub Actions builds and publishes the site automatically within ~1–2 minutes. Check progress under the repo's **Actions** tab.

---

## 🛠️ For developers

```bash
npm ci && npm run build && npm run preview
```

- Routing uses `HashRouter` so it works on GitHub Pages without server config.
- Images must be referenced via the `asset()` helper from `src/config.ts` (not raw `/images/...` paths) so they resolve on any host.
- Deployment: `.github/workflows/deploy.yml` → GitHub Pages (branch: deploy from Actions).
- If the first run can't enable Pages automatically: **Settings → Pages → Source: GitHub Actions**, then re-run the workflow.

---

© Sri Narayana Seeds & Pesticides, Dharmavaram.
