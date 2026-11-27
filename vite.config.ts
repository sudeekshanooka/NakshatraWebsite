import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { pageDescriptions } from './src/pageDescriptions'

function descriptionTag(description: string) {
  const content = description.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
  return `<meta name="description" content="${content}" />`
}

function pageDescriptionHtml(): Plugin {
  const homeTag = descriptionTag(pageDescriptions['/'])
  return {
    name: 'page-description-html',
    transformIndexHtml(html) {
      return html.replace('<!-- page-description -->', () => homeTag)
    },
    generateBundle: {
      order: 'post',
      handler(_, bundle) {
        if (!process.env.VERCEL) return
        const index = bundle['index.html']
        if (index?.type !== 'asset' || typeof index.source !== 'string' || !index.source.includes(homeTag)) {
          this.error('Could not find the homepage description in the built HTML')
        }
        const html = index.source
        for (const [path, description] of Object.entries(pageDescriptions)) {
          if (path === '/') continue
          this.emitFile({
            type: 'asset',
            fileName: `${path.slice(1)}.html`,
            source: html.replace(homeTag, () => descriptionTag(description)),
          })
        }
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), pageDescriptionHtml()],
  base: process.env.VERCEL ? '/' : '/NakshatraWebsite/',
})
