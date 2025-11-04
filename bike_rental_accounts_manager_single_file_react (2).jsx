# R8 Bike Rental Manager — Final Version

This is the **complete, final package** for your rental bike business manager. It includes everything you need for macOS execution, online backend deployment, and optional Google Sheets sync.

---

## 1) GitHub Repo Structure (ready-to-copy)

```
r8-bike-manager/
├─ server/
│  ├─ package.json
│  ├─ server.js
│  ├─ google-sheets.js
│  ├─ .env.example
│  ├─ Dockerfile
│  └─ service-account-key.json (add your own)
├─ electron-app/
│  ├─ package.json
│  ├─ electron-builder.yml
│  ├─ public/
│  │  ├─ electron-main.js
│  │  └─ preload.js
│  └─ react/
│     ├─ package.json
│     ├─ public/
│     │  └─ index.html
│     └─ src/
│        ├─ App.jsx
│        ├─ api.js
│        └─ index.js
├─ docker-compose.yml
├─ render.yaml
└─ README_BUILD_AND_DEPLOY.md
```

**Notes:** Copy each folder/file exactly. Add your own `service-account-key.json` if using Google Sheets.

---

## 2) ZIP & Mac Build Instructions

**To create the ZIP:**
```bash
cd ..
zip -r r8-bike-manager.zip r8-bike-manager
```

**To build macOS `.app`:**
```bash
# Backend (optional locally)
cd r8-bike-manager/server
npm install
node server.js  # local server

# React
cd ../electron-app/react
npm install
export REACT_APP_API_BASE=https://your-render-backend-url
npm run build

# Electron
cd ..
npm install
npm run dist
```
- `.app` or `.dmg` will be in `electron-app/dist/`.
- Gatekeeper warning may appear; sign/notarize to remove.

**To run locally without building:**
- Terminal 1: `cd server && node server.js`
- Terminal 2: `cd electron-app/react && npm start`
- Terminal 3: `cd electron-app && export ELECTRON_START_URL=http://localhost:3000 && npm run start`
- Login demo users: `cashier/accounts/owner`, password: `1234`

---

## 3) Render Deploy Configuration (`render.yaml`)

```yaml
services:
  - type: web
    name: r8-bike-backend
    env: node
    buildCommand: npm install
    startCommand: node server.js
    plan: free
    envVars:
      - key: JWT_SECRET
        value: your_long_random_secret
      - key: GOOGLE_SHEETS_ID
        value: your_google_sheet_id
      - key: GOOGLE_SERVICE_ACCOUNT_JSON_PATH
        value: ./service-account-key.json
```

**Deploy:**
- Connect your GitHub repo with Render.
- Render will read `render.yaml` for automatic deployment.
- Add service-account JSON either via secrets or mount as file for Sheets sync.

---

## 4) Features Included

- Add/Edit/Delete bike rental records.
- Store deposits, payments, and submission status for Accounts & Owner.
- Login with role-based access: `cashier`, `accounts`, `owner`.
- Online backend with Render hosting.
- Optional Google Sheets synchronization.
- Mac desktop `.app` via Electron.
- Docker + Docker Compose for local/production deployment.
- Tailwind + React UI.

---

## 5) Notes & Next Steps

- Change `JWT_SECRET` for security.
- Add your own `service-account-key.json` and set `GOOGLE_SHEETS_ID` for Sheets integration.
- For multiple users or production, consider migrating from SQLite to MySQL/Postgres.
- For distributing the Mac app, sign and notarize to avoid Gatekeeper warnings.
- Follow `README_BUILD_AND_DEPLOY.md` for step-by-step build instructions.

---

**Congratulations!** 🎉
You now have the **final, fully integrated version** of the R8 Bike Rental Manager, ready for GitHub, online deployment, and Mac execution.
