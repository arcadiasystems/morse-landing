import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

/* Production builds prerender the page into #root (see vite.config.ts), so
   the client hydrates that markup. The dev server serves an empty root. */
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
