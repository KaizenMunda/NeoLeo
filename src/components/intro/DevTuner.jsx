import { useEffect, useState } from 'react'
import { LEO_CONFIG } from './config.js'
import { exportLeoConfigJson } from './leoPlacement.js'

const SLIDERS = [
  { key: 'height', label: 'Height', min: 1, max: 8, step: 0.05, cfg: () => LEO_CONFIG.height, set: (v) => { LEO_CONFIG.height = v }, refit: true },
  { key: 'px', label: 'X', min: -4, max: 4, step: 0.02, cfg: () => LEO_CONFIG.pos.x, set: (v) => { LEO_CONFIG.pos.x = v } },
  { key: 'py', label: 'Y', min: -4, max: 4, step: 0.02, cfg: () => LEO_CONFIG.pos.y, set: (v) => { LEO_CONFIG.pos.y = v } },
  { key: 'pz', label: 'Z', min: -6, max: 3, step: 0.05, cfg: () => LEO_CONFIG.pos.z, set: (v) => { LEO_CONFIG.pos.z = v } },
  { key: 'ry', label: 'Yaw', min: -180, max: 180, step: 1, cfg: () => LEO_CONFIG.rot.y, set: (v) => { LEO_CONFIG.rot.y = v } },
  { key: 'rx', label: 'Pitch', min: -60, max: 60, step: 1, cfg: () => LEO_CONFIG.rot.x, set: (v) => { LEO_CONFIG.rot.x = v } },
  { key: 'rz', label: 'Roll', min: -60, max: 60, step: 1, cfg: () => LEO_CONFIG.rot.z, set: (v) => { LEO_CONFIG.rot.z = v } },
  { key: 'mx', label: 'Muzzle X', min: -3, max: 3, step: 0.01, cfg: () => LEO_CONFIG.muzzle.x, set: (v) => { LEO_CONFIG.muzzle.x = v } },
  { key: 'my', label: 'Muzzle Y', min: -2, max: 4, step: 0.01, cfg: () => LEO_CONFIG.muzzle.y, set: (v) => { LEO_CONFIG.muzzle.y = v } },
  { key: 'mz', label: 'Muzzle Z', min: -3, max: 3, step: 0.01, cfg: () => LEO_CONFIG.muzzle.z, set: (v) => { LEO_CONFIG.muzzle.z = v } },
  { key: 'key', label: 'Key light', min: 0, max: 4, step: 0.05, cfg: () => LEO_CONFIG.key, set: (v) => { LEO_CONFIG.key = v } },
  { key: 'amb', label: 'Fill', min: 0, max: 4, step: 0.05, cfg: () => LEO_CONFIG.amb, set: (v) => { LEO_CONFIG.amb = v } },
]

export default function DevTuner({ leoApiRef, open, onToggle }) {
  const [output, setOutput] = useState('')
  const [, tick] = useState(0)

  useEffect(() => {
    function onKey(e) {
      if (e.key.toLowerCase() === 'd' && !/input|textarea/i.test(e.target.tagName)) {
        onToggle()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onToggle])

  useEffect(() => {
    if (open) setOutput(exportLeoConfigJson())
  }, [open])

  function applySlider(slider, value) {
    slider.set(parseFloat(value))
    if (slider.refit) {
      leoApiRef.current?.refit?.()
    } else {
      leoApiRef.current?.place?.()
    }
    setOutput(exportLeoConfigJson())
    tick((n) => n + 1)
  }

  if (!open) return null

  return (
    <aside className="intro-tuner" aria-label="Leo placement tuner">
      <h3>Model</h3>
      {SLIDERS.slice(0, 7).map((s) => (
        <label key={s.key}>
          {s.label}
          <input
            type="range"
            min={s.min}
            max={s.max}
            step={s.step}
            defaultValue={s.cfg()}
            onInput={(e) => applySlider(s, e.target.value)}
          />
          <span className="intro-tuner__val">{s.cfg().toFixed(2)}</span>
        </label>
      ))}
      <h3>Muzzle locator</h3>
      {SLIDERS.slice(7, 10).map((s) => (
        <label key={s.key}>
          {s.label}
          <input
            type="range"
            min={s.min}
            max={s.max}
            step={s.step}
            defaultValue={s.cfg()}
            onInput={(e) => applySlider(s, e.target.value)}
          />
          <span className="intro-tuner__val">{s.cfg().toFixed(2)}</span>
        </label>
      ))}
      <h3>Light</h3>
      {SLIDERS.slice(10).map((s) => (
        <label key={s.key}>
          {s.label}
          <input
            type="range"
            min={s.min}
            max={s.max}
            step={s.step}
            defaultValue={s.cfg()}
            onInput={(e) => applySlider(s, e.target.value)}
          />
          <span className="intro-tuner__val">{s.cfg().toFixed(2)}</span>
        </label>
      ))}
      <button
        type="button"
        className="intro-tuner__copy"
        onClick={() => navigator.clipboard?.writeText(exportLeoConfigJson())}
      >
        Copy config
      </button>
      <pre className="intro-tuner__out">{output}</pre>
    </aside>
  )
}
