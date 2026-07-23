# Automatic Push & Release Guide

This document outlines the workflow and scripts for automatically staging, committing, and pushing the latest fixes to the repository.

---

## 🚀 Recent Fixes Summary

The latest updates implemented in the repository:
1. **Glassmorphic Floating Bottom Menu**:
   - Centered floating navigation container (`HeaderNav.tsx`) with `backdrop-blur-xl`, semi-transparent background (`#2B3A4A/70`), and soft ambient glow.
   - Positioned cleanly at the bottom center of the screen with an upward-opening Chapter dropdown menu.
2. **Removed All Heart Icons**:
   - Replaced heart icons across navigation, hero section, modals, dot navigation, and footers with neutral icons (`Sparkles`, `FileText`, `Calendar`).
   - Removed background floating hearts component (`FloatingHearts.tsx`).
3. **Blank Photo Story Template**:
   - Cleared default dates, locations, subtitles, quotes, story text, and highlights in `storyData.ts`.
   - Updated picture cards (`ChapterSlideSection.tsx`) to show clean upload placeholders ready for custom photo uploads and descriptions.

---

## 🛠️ Automatic Push Commands

### 1. One-Line Push (PowerShell)
Run this command in PowerShell to automatically stage, commit, and push any new changes:

```powershell
git add . ; git commit -m "auto-update: latest fixes and enhancements" ; git push origin main
```

### 2. One-Line Push (Bash / Linux / Mac)
```bash
git add . && git commit -m "auto-update: latest fixes and enhancements" && git push origin main
```

---

## 🤖 Automated GitHub Action Workflow (Optional)

To enable automated workflows on GitHub, you can create a workflow file at `.github/workflows/auto-push.yml`:

```yaml
name: Auto Push & Sync

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  build-and-sync:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build
```

---

## 📂 Repository Details
- **Repository URL**: `https://github.com/caparros-ui/My_adorable_gf.git`
- **Main Branch**: `main`
