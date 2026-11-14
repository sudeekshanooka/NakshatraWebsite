# React + TypeScript + Vite

## Sponsorship inquiry backend

The sponsorship form sends inquiries to `2k16srs@gmail.com` through the Vercel function at `/api/sponsorship`. The static site can remain on GitHub Pages; configure its build with `VITE_SPONSORSHIP_API_URL` set to the full Vercel function URL, for example `https://your-project.vercel.app/api/sponsorship`.

This repository's GitHub Pages URL is `https://sais315.github.io/NakshatraWebsite/`. In the repository's **Settings → Pages**, set the source to the `gh-pages` branch and `/ (root)`.

The Vite build uses `/NakshatraWebsite/` for GitHub Pages and `/` on Vercel, where the site is served from the domain root.

Deploy this repository to Vercel to host the API, then configure these Vercel environment variables:

- `ALLOWED_ORIGIN`: the exact origin serving the site (scheme and hostname only, with no path; for GitHub Pages, use the origin shown in the browser address bar).
- `RESEND_API_KEY`: a Resend API key.
- `RESEND_FROM_EMAIL`: a sender address on a domain verified with Resend, such as `Nakshatra Sponsorship <sponsorship@your-verified-domain.com>`.
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`: credentials for an Upstash Redis database.

The API validates and bounds every field, accepts only the configured site origin, uses a hidden honeypot, and applies a distributed limit of five submissions per IP per hour. Inquiry content is sent as plain text, with a fixed recipient and subject; no SQL database is used. Keep all provider credentials in Vercel environment variables, never in `VITE_` variables or client code. Configure Vercel Firewall rate limits for additional protection at the edge; application rate limiting does not by itself prevent volumetric DDoS attacks.

When building the GitHub Pages site, set `VITE_SPONSORSHIP_API_URL` in the build environment before running `npm run build` (or `npm run deploy`). Restart the build after changing it.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
