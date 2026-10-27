import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useProgress } from '@react-three/drei'
import useReducedMotion from '../site/useReducedMotion'
import OfficeRoom from './OfficeRoom'
import OfficePanel from './OfficePanel'
import ProjectsScreen from './ProjectsScreen'
import { useAmbientSound } from './officeSound'
import { COLLECTIBLES, FALLBACK_IMG, HOTSPOTS, MENU, isRoutable } from './officeConfig'
import './office.css'

function useWebGLAvailable() {
  const [available, setAvailable] = useState(null)
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      setAvailable(!!(canvas.getContext('webgl2') || canvas.getContext('webgl')))
    } catch {
      setAvailable(false)
    }
  }, [])
  return available
}

const VISITED_KEY = 'neoleo-office-visited'

/** Hotspots the visitor has found ("collected"), remembered in this browser. */
function useVisited(active) {
  const [visited, setVisited] = useState(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(VISITED_KEY) || '[]')
      return new Set(saved.filter((k) => HOTSPOTS[k]))
    } catch {
      return new Set()
    }
  })
  const mark = useCallback((key) => {
    setVisited((prev) => {
      if (!key || prev.has(key)) return prev
      const next = new Set(prev).add(key)
      try {
        window.localStorage.setItem(VISITED_KEY, JSON.stringify([...next]))
      } catch {
        /* private mode etc. — progress just won't persist */
      }
      return next
    })
  }, [])
  useEffect(() => mark(active), [active, mark])
  return [visited, mark]
}

function Loader({ ready }) {
  const { progress } = useProgress()
  return (
    <div className={`office-loader ${ready ? 'office-loader--done' : ''}`} aria-hidden={ready}>
      <div className="office-loader__mark">NeoLeo</div>
      <div className="office-loader__line">Booting the office… {Math.round(progress)}%</div>
      <div className="office-loader__bar">
        <span style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}

function HomeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SoundIcon({ on }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor" />
      {on ? (
        <path
          d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ) : (
        <path d="m16 9 5 6m0-6-5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  )
}

export default function OfficePage() {
  const params = useParams()
  const section = params.section
  const subPath = params['*'] || ''
  const navigate = useNavigate()
  const reduced = useReducedMotion()
  const webgl = useWebGLAvailable()
  const active = isRoutable(section) ? section : null
  const [hover, setHover] = useState(null)
  const [ready, setReady] = useState(false)
  const [toast, setToast] = useState(null)
  const [visited, mark] = useVisited(active)
  const sound = useAmbientSound()
  const toastTimer = useRef()
  const total = COLLECTIBLES.length
  const kind = active ? HOTSPOTS[active].kind : null

  const goHome = useCallback(() => navigate('/'), [navigate])

  const toggleSound = useCallback(() => {
    sound.toggle()
    mark('sound')
    setToast(sound.on ? 'Sound off' : 'Sound on ♪')
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 1800)
  }, [sound, mark])

  const select = useCallback(
    (key) => {
      if (!key) return navigate('/')
      if (HOTSPOTS[key]?.kind === 'toggle') return toggleSound()
      return navigate(`/${key}`)
    },
    [navigate, toggleSound],
  )
  const onReady = useCallback(() => setReady(true), [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      // inside Projects, Esc steps back one level; elsewhere it returns to the room
      if (section === 'projects' && subPath) {
        const up = subPath.split('/').filter(Boolean).slice(0, -1).join('/')
        navigate(up ? `/projects/${up}` : '/projects')
      } else navigate('/')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate, section, subPath])

  useEffect(() => {
    document.title = active ? `${HOTSPOTS[active].label} — NeoLeo` : 'NeoLeo — Bold Vision, Precise Execution'
  }, [active])

  useEffect(
    () => () => {
      document.body.style.cursor = ''
      clearTimeout(toastTimer.current)
    },
    [],
  )

  const show3d = webgl === true
  const tipText = (key) =>
    HOTSPOTS[key].kind === 'toggle' ? (sound.on ? 'Click to turn sound off' : 'Click to turn sound on') : 'Click to open'

  return (
    <div className={`office ${active ? 'office--focused' : ''} ${kind === 'screen' ? 'office--screen' : ''}`}>
      <div className="office__stage">
        {show3d && (
          <OfficeRoom
            active={active}
            visited={visited}
            onSelect={select}
            onHover={setHover}
            reduced={reduced}
            onReady={onReady}
          />
        )}
        {webgl === false && (
          <img
            className="office__fallback"
            src={FALLBACK_IMG}
            alt="The NeoLeo office: a teal room with a desk, a robot at the keyboard and the Qutub Minar through the window"
          />
        )}
      </div>

      {show3d && <Loader ready={ready} />}

      <header className="office__top">
        <button type="button" className="office__wordmark" onClick={goHome}>
          NeoLeo
        </button>
        <div className="office__top-right">
          {show3d && ready && (
            <span
              className={`office__count ${visited.size === total ? 'is-complete' : ''}`}
              aria-label={`${visited.size} of ${total} found`}
            >
              <span className="office__count-gem" aria-hidden="true" />
              {visited.size === total ? 'All found' : `${visited.size}/${total} found`}
            </span>
          )}
          <button
            type="button"
            className={`office__sound ${sound.on ? 'is-on' : ''}`}
            onClick={toggleSound}
            aria-pressed={sound.on}
            aria-label={sound.on ? 'Turn sound off' : 'Turn sound on'}
          >
            <SoundIcon on={sound.on} />
          </button>
          <button type="button" className="office__mark" onClick={goHome} aria-label="NeoLeo — back to the room">
            <img src="/mark.png" alt="" width="36" height="36" />
          </button>
        </div>
      </header>

      {hover && !active && (
        <div className="office__tip" style={{ left: hover.x, top: hover.y }}>
          {HOTSPOTS[hover.key].label}
          <span>{tipText(hover.key)}</span>
        </div>
      )}

      {show3d && ready && !active && (
        <div className="office__hint">Drag to look around · Collect the glowing diamonds</div>
      )}

      {toast && (
        <div className="office-toast" role="status">
          {toast}
        </div>
      )}

      <nav className="office__menu" aria-label="Sections">
        <button
          type="button"
          className={`office__chip office__chip--home ${!active ? 'is-active' : ''}`}
          onClick={goHome}
          aria-label="Back to the room"
        >
          <HomeIcon />
        </button>
        {MENU.map((k) => (
          <button
            key={k}
            type="button"
            className={`office__chip ${active === k ? 'is-active' : ''}`}
            aria-pressed={active === k}
            onClick={() => select(active === k ? null : k)}
          >
            {visited.has(k) && (
              <span className="office__chip-gem" aria-hidden="true">
                ◆
              </span>
            )}
            {HOTSPOTS[k].label}
          </button>
        ))}
      </nav>

      <OfficePanel active={kind === 'panel' ? active : null} onClose={goHome} />
      <ProjectsScreen
        open={kind === 'screen'}
        path={kind === 'screen' ? subPath : ''}
        onNavigate={(p) => navigate(p ? `/projects/${p}` : '/projects')}
        onClose={goHome}
      />
    </div>
  )
}
