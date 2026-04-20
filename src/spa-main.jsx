import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from './spa/App.jsx'

const root = document.getElementById('spa-root')
if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
