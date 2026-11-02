# ApexMatch AI - Big Match Predictor & Player Analytics ⚽🏀🎾

An AI-powered sports intelligence platform that discovers upcoming blockbuster matches across football, basketball, and tennis, delivering predictive match modeling based on historical player performance data, 1,000-run Monte Carlo simulations, interactive what-if scenarios, and VIP Paystack monetization with automatic WhatsApp channel redirection.

---

## ✨ Features

- **Dynamic Match Discovery**: Fetches real marquee games with tournament stakes, venue data, and star player performance logs.
- **AI Historical Player Analytics**: Predicts winners, projected scores, and win probabilities by weighing historical player telemetry, head-to-head records, and form.
- **1,000 Monte Carlo Simulations**: High-precision statistical distribution engine providing exact score likelihoods and over/under probability curves.
- **Interactive Lineup & What-If Lab**: Test live match impacts with custom weather, home/away venue weight, key player absences, and tactical styles.
- **Player Duel Telemetry**: Head-to-head radar comparisons of clutch rating, scoring efficiency, defense, and stamina.
- **Paystack VIP Monetization**: Seamless Ghana Cedi (GHS 20), NGN, USD, KES, and ZAR payment options.
- **VIP WhatsApp Channel Access**: Instant automated redirection to the VIP WhatsApp channel upon verified payment for deep match intel.
- **Owner Control Panel**: Secret PIN protected (`8821` by default) for revenue tracking, transaction inspection, and updating Paystack/WhatsApp keys.
- **Zero-Downtime Resilience**: Seamless fallback to the verified fixture library and Monte Carlo statistical predictor if Gemini API quotas are reached.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Motion
- **Backend**: Node.js, Express, tsx
- **AI Engine**: Google Gemini API (`@google/genai` SDK)
- **Monetization**: Paystack Inline integration + WhatsApp Channel routing

---

## 🚀 Quickstart (Local Development)

### 1. Clone & Install Dependencies
```bash
git clone <your-repo-url>
cd <repo-folder>
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your credentials:
- `GEMINI_API_KEY`: Your Google Gemini API Key from Google AI Studio.
- `PAYSTACK_PUBLIC_KEY`: (Optional) Your Paystack public key (`pk_live_...` or `pk_test_...`).
- `WHATSAPP_CHANNEL_URL`: (Optional) Your WhatsApp Channel or Group link.
- `ADMIN_PIN`: Secret owner passcode (default: `8821`).

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 📦 How to Push to GitHub

### Step 1: Initialize Git and Commit
```bash
git init -b main
git add .
git commit -m "Initial commit: ApexMatch AI platform"
```

### Step 2: Create a Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Name your repository (e.g., `apexmatch-ai`).
3. Set it to **Public** or **Private**.
4. Leave "Add a README", ".gitignore", and license **unchecked** (we already have them).
5. Click **Create repository**.

### Step 3: Link Remote and Push
Copy your repository URL from GitHub and run:
```bash
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

---

## 🌐 Deployment & Hosting Options

Because ApexMatch AI includes both a Vite React frontend and an Express backend (`server.ts` with Gemini API endpoints and Paystack verification), it needs a Node.js full-stack host.

### 🌟 Recommended: Render (Free & 1-Click from GitHub)
1. Sign up for free at [render.com](https://render.com).
2. Click **New +** > **Web Service**.
3. Connect your GitHub repository.
4. Set the following build settings:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. In the **Environment Variables** section, add:
   - `GEMINI_API_KEY`: Your Gemini API key
   - `NODE_ENV`: `production`
   - `ADMIN_PIN`: `8821` (or your chosen pin)
   - `PAYSTACK_PUBLIC_KEY`: Your Paystack key
   - `WHATSAPP_CHANNEL_URL`: Your WhatsApp VIP link
6. Click **Deploy Web Service**. Render gives you a free live `https://...onrender.com` URL!

---

### Alternative: Railway
1. Go to [railway.app](https://railway.app).
2. Click **New Project** > **Deploy from GitHub repo**.
3. Select your repository. Railway automatically detects Node and uses `npm run build` & `npm start`.
4. Add your environment variables in the **Variables** tab.

---

### Note on GitHub Pages:
GitHub Pages only hosts static HTML/CSS/JavaScript files and cannot run the Node.js Express server (`server.ts`) for Gemini API requests. For a live full-stack deployment, use **Render** or **Railway** connected to your GitHub repository.

---

## 📄 License
MIT License. Built with Google AI Studio.
