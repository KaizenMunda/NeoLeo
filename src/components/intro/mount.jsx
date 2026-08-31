import { createRoot } from 'react-dom/client'
import IntroSequence from './IntroSequence.jsx'
import { finishIntro, shouldSkipIntro } from './introGate.js'

const mountEl = document.getElementById('intro-root')
if (mountEl) {
  if (shouldSkipIntro()) {
    finishIntro()
  } else {
    const root = createRoot(mountEl)
    root.render(<IntroSequence />)
  }
}
