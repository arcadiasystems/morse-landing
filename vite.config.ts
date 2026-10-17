import { readFile, rm, writeFile } from 'node:fs/promises'
import { relative, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { build, defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const ROOT_MARKUP = '<div id="root"></div>'
const SERVER_ENTRY = 'src/entry-server.tsx'

interface ServerEntry {
  render: () => string
}

/**
 * Prerenders the page into the built index.html, so crawlers, link previews
 * and first paint get the full page instead of an empty root; src/main.tsx
 * then hydrates it. After the client build writes its files, this runs an
 * SSR build of src/entry-server.tsx with the same config (so CSS module
 * class names match), renders once, and deletes that SSR build.
 */
function prerender(): Plugin {
  let root = ''
  let log = (message: string) => console.info(message)

  return {
    name: 'morse:prerender',
    apply: (_config, env) => env.command === 'build' && !env.isSsrBuild,
    configResolved(config) {
      root = config.root
      log = message => config.logger.info(message)
    },
    async writeBundle({ dir }) {
      if (!dir) throw new Error('prerender: the client build has no output directory')
      const serverDir = resolve(root, 'dist-ssr')

      await build({
        root,
        logLevel: 'warn',
        build: { ssr: SERVER_ENTRY, outDir: serverDir, emptyOutDir: true, copyPublicDir: false },
      })

      try {
        const entryUrl = pathToFileURL(resolve(serverDir, 'entry-server.js')).href
        const { render } = (await import(entryUrl)) as ServerEntry
        const htmlPath = resolve(dir, 'index.html')
        const template = await readFile(htmlPath, 'utf8')
        if (template.split(ROOT_MARKUP).length !== 2) {
          throw new Error(`prerender: expected exactly one ${ROOT_MARKUP} in ${htmlPath}`)
        }
        const appHtml = render()
        await writeFile(htmlPath, template.replace(ROOT_MARKUP, () => `<div id="root">${appHtml}</div>`))
        log(`prerendered ${relative(root, htmlPath)} (${Math.round(appHtml.length / 1024)} kB of markup)`)
      } finally {
        await rm(serverDir, { recursive: true, force: true })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), prerender()],
})
