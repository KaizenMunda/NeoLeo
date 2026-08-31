import { createRoot } from 'react-dom/client'
import LionIntro from './LionIntro.jsx'
import { revealColourStage, shouldSkipIntro } from './introGate.js'

const mountEl = document.getElementById('lion-intro-root')
if (mountEl) {
  if (shouldSkipIntro()) {
    revealColourStage()
  } else {
    const root = createRoot(mountEl)
    root.render(<LionIntro />)
  }
}
