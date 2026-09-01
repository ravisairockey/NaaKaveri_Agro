# Sri Narayana Seeds & Pesticides — Website

Premium website for **Sri Narayana Seeds & Pesticides**, Dharmavaram, Andhra Pradesh.

- 🌐 **Live site:** https://ravisairockey.github.io/NaaKaveri_Agro/
- ⚙️ Built with React + Vite + Tailwind CSS
- 🚀 Every push to `main` auto-deploys via GitHub Actions

---

## 📖 EASY CHANGES GUIDE (no coding knowledge needed)

> **Golden rule:** change something → save the file → publish (section 6). That's all.

You only ever need these **3 places**:

| Where | What lives there |
|---|---|
| `src/config.ts` | Phone, WhatsApp, address, timings, **buy link** |
| `src/data/catalog.ts` | Products (names, photos, buy links) |
| `public/images/…` | Photos (see section 4) |

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

### 2. 🛒 Buy link for products (placeholder)

Open `src/config.ts`. At the very top you'll find:

```ts
export const DEFAULT_BUY_URL = "";
```

| What you do | What happens on the site |
|---|---|
| Leave it `""` (as it is now) | No buy button anywhere — exactly how the site looks today |
| Paste a link: `"https://your-shop.com/buy"` | **Every** product gets a yellow 🛒 **Buy Online** button, and **clicking a product name opens that link** in a new tab |
| Want a special link for just ONE product? | Inside that product's block in `catalog.ts` (section 5), add a line: `buyUrl: "https://…",` — it overrides the default for that product only |

### 3. 🌐 Telugu / English button

The site has a 🌐 **తెలుగు / English** toggle (top bar + mobile menu). The visitor's choice is remembered. To add or fix a translation, edit **`src/lib/i18n-dict.ts`** — every entry is a pair `[English, తెలుగు]`.

### 4. 🖼️ Photos — the 3 folders

| Folder | Used for | Code change needed? |
|---|---|---|
| `public/images/hero/` | Homepage slideshow **ONLY** | YES — one `SLIDES` block (shown below) |
| `public/images/store/` | Shop photo on About & Contact pages | NO — keep the name `store.jpg` |
| `public/images/products/` | Product photos & category cards | NO — **if you keep the same file name** |

**A) Replace a photo (easiest)** — put the new photo in the folder with the **exact same file name** (e.g. overwrite `seeds.jpg`). Publish. Done — it appears automatically.

**B) Add a NEW photo with a new name** (e.g. `biofertilizer.jpg`) — the file alone won't show anywhere; you point something at it:

- **Product photo** → in that product's block in `catalog.ts` set `image: asset("/images/products/biofertilizer.jpg"),` (section 5)
- **Homepage slideshow** → add one block per photo in `src/components/HeroCarousel.tsx`:

```ts
{
  image: "/images/hero/my-photo.jpg",
  badgeEn: "Paddy Season",   badgeTe: "వరి సీజన్",
  line1En: "STRONG START.",  line1Te: "బలమైన మొదలు.",
  line2En: "HEALTHY",        line2Te: "ఆరోగ్యకరమైన",
  accentEn: "PADDY.",        accentTe: "వరి పంట.",
  subEn: "One or two lines about this photo in English.",
  subTe: "తెలుగులో ఒకటి లేదా రెండు వాక్యాలు.",
  altEn: "What the photo shows",  altTe: "ఫోటోలో ఏం ఉంది",
},
```

Tips: keep photos under ~500 KB, roughly landscape (wide) shape, JPG format.

### 5. 🛒 Products — change a name, add a product, set its buy link

All products live in **`src/data/catalog.ts`**. Every product is **one block** that starts with `{` and ends with `},`.

**Change a product's name / description / packs:**
1. Open `catalog.ts`, press **Ctrl+F**, type part of the product name.
2. Edit only the text **between the quotes** (e.g. `name: "SN Gold Fine Paddy Seeds"`). Save. Publish.

**Add a NEW product:**
1. In `catalog.ts`, scroll to the comment box that says **HOW TO ADD A NEW PRODUCT** — just above the product list there is a ready **copy-paste template**.
2. Copy the template block, fill in your values, and paste it **after the last product** in the list (just before the closing `];`).
3. Important: use a new `id:` number (highest existing + 1) and small-letter `slug:` with dashes (`my-new-product`, no spaces).
4. Save. Publish. The product appears in the Products page with its filters automatically.

**Buy link for one product:** inside that product's block add one line —
`buyUrl: "https://example.com/buy/my-product",`

**What customers see:**

| Buy link set? | Clicking the product NAME goes to… | 🛒 Buy Online button |
|---|---|---|
| No (today) | The product's details page on this site | Hidden |
| Yes | **Your buy link — opens in a new tab** | Shown (yellow, next to View Details, and on the details page too) |

### 6. 👀 Run the website on your computer (optional preview)

```bash
npm install     # first time only
npm run dev     # opens http://localhost:5173
```

### 7. 🚀 Publish changes (make them live)

After editing any file, in the project folder run:

```bash
git add .
git commit -m "Describe what you changed"
git push
```

GitHub Actions builds and publishes the site automatically within ~1–2 minutes. Check progress under the repo's **Actions** tab — wait for the green ✅, then hard-refresh the site (**Ctrl+F5**).

### 8. 🆘 Something's not working?

| Problem | Likely cause & fix |
|---|---|
| New photo doesn't show | File name must match **exactly** — all small letters, e.g. `seeds.jpg` not `Seeds.JPG`. Then Ctrl+F5. |
| Site looks broken after an edit | Usually a missing comma or quote in `catalog.ts`. Undo everything: `git checkout .` and start again with a smaller change. |
| Pushed but nothing changed | Wait ~2 minutes for the Actions ✅, then hard-refresh (Ctrl+F5). |
| "Buy Online" button missing | `DEFAULT_BUY_URL` in `config.ts` is still `""` — paste a link (section 2). |

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
