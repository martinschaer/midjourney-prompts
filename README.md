# Midjourney Prompts

# Project initialization

```bash
# init project using vite
# select react and typescript + SWC when prompted
pnpm create vite

# change directory
cd midjourney-prompts

# install deps
pnpm install

# init repo
git init
git add .
git commit -m "init"

# install prettier
# see git commit for files that need to be created manually
pnpm add -D prettier

# install tailwind
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# follow this guide: https://tailwindcss.com/docs/guides/vite

# install react-router
pnpm add @tanstack/react-query

# install router (note: tanstack router is in beta, you may want to use another router)
pnpm add @tanstack/router@beta

```
