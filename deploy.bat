@echo off
git add vercel.json
git add package.json
git commit -m "Fix: Add Vercel config and move vite to dependencies"
git push
