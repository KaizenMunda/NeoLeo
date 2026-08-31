import { useCallback, useRef, useState } from 'react'
import IntroFxLayer from './IntroFxLayer.jsx'
import IntroLeoLayer from './IntroLeoLayer.jsx'
import DevTuner from './DevTuner.jsx'
import { finishIntro } from './introGate.js'

function DevControls({ apiRef }) {
  return (
    <div className="intro-dev-controls">
      <button type="button" onClick={() => apiRef.current?.skip()}>
        Skip
      </button>
      <button type="button" onClick={() => apiRef.current?.play()}>
        Replay
      </button>
    </div>
  )
}

export default function IntroSequence() {
  const apiRef = useRef({ play: () => {}, skip: () => {} })
  const leoApiRef = useRef({ place: () => {}, refit: () => {} })
  const [tunerOpen, setTunerOpen] = useState(false)
  const toggleTuner = useCallback(() => setTunerOpen((v) => !v), [])

  return (
    <>
      <IntroLeoLayer leoApiRef={leoApiRef} tunerOpen={tunerOpen} />
      <IntroFxLayer
        apiRef={apiRef}
        onComplete={() => {
          finishIntro()
        }}
      />
      {import.meta.env.DEV && (
        <>
          <DevControls apiRef={apiRef} />
          <DevTuner leoApiRef={leoApiRef} open={tunerOpen} onToggle={toggleTuner} />
        </>
      )}
    </>
  )
}
