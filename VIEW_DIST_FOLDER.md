# How to View the `dist` Folder

## Understanding `dist`

`dist` is a **folder** (directory), not a command. It contains your production build files.

## Commands to View `dist` Folder

### Option 1: List Contents (PowerShell)

```powershell
# View files in dist folder
Get-ChildItem dist

# View with details
Get-ChildItem dist -Recurse

# View in File Explorer (Windows)
explorer dist
```

### Option 2: Navigate Into Folder

```powershell
# Go into dist folder
cd dist

# List files
dir

# Go back
cd ..
```

### Option 3: Open in File Explorer

```powershell
# Opens dist folder in Windows Explorer
explorer dist
```

## Preview Your Production Build

To actually **run** your production build:

```powershell
# This starts a preview server
npm run preview
```

This will:
- Start a local server
- Show your production build
- Usually runs on http://localhost:4173

## What's in `dist`?

After `npm run build`, your `dist` folder contains:

```
dist/
├── index.html          # Main HTML file
├── assets/
│   ├── index-xxx.css   # Your styles
│   └── index-xxx.js    # Your JavaScript
├── favicon.svg         # Favicon
├── manifest.json       # PWA manifest
└── security.txt        # Security policy
```

## Common Commands

```powershell
# View dist folder contents
ls dist
# or
dir dist

# Open dist in File Explorer
explorer dist

# Preview production build
npm run preview

# Clean dist folder (delete it)
Remove-Item -Recurse -Force dist

# Rebuild
npm run build
```

## Next Step: Deploy

The `dist` folder is what you deploy to Vercel/Netlify. You don't need to manually upload it - Vercel will build it automatically when you connect your GitHub repo!

---

**Remember:** `dist` is a folder name, not a command. Use `npm run preview` to test your production build!
