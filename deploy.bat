@echo off
git add src/vite-env.d.ts
git add vercel.json
git commit -m "Fix: Add Vite TypeScript definitions and env config"
git push
