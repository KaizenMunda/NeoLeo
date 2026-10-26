import { Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { CameraControls, useAnimations, useGLTF } from '@react-three/drei'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { HOTSPOTS, MESH_TO_KEY, MODEL_URL } from './officeConfig'
import { makeBasinMaterial, makeSteamMaterial, makeWaterSheetMaterial } from './officeShaders'

// Draco-compressed, lighting baked into WebP textures (~1.6 MB)
useGLTF.preload(MODEL_URL, true)

const ROOM_AZIMUTH_RANGE = 0.35 // radians either side of the main view
const HOVER_BOOST = 1.28

function keyOf(object) {
  let o = object
  while (o) {
    if (MESH_TO_KEY[o.name]) return MESH_TO_KEY[o.name]
    o = o.parent
  }
  return null
}

function setRoomLimits(controls, base, on) {
  if (on && base) {
    controls.minAzimuthAngle = base.azimuth - ROOM_AZIMUTH_RANGE
    controls.maxAzimuthAngle = base.azimuth + ROOM_AZIMUTH_RANGE
    controls.minPolarAngle = base.polar - 0.18
    controls.maxPolarAngle = base.polar + 0.12
  } else {
    controls.minAzimuthAngle = -Infinity
    controls.maxAzimuthAngle = Infinity
    controls.minPolarAngle = 0
    controls.maxPolarAngle = Math.PI
  }
}

/** Keep roughly the same horizontal field of view on wide and tall screens. */
function ResponsiveFov() {
  const { camera, size } = useThree()
  useEffect(() => {
    const aspect = size.width / size.height
    const h = THREE.MathUtils.degToRad(74)
    const v = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(h / 2) / aspect))
    camera.fov = THREE.MathUtils.clamp(v, 42, 72)
    camera.updateProjectionMatrix()
  }, [camera, size])
  return null
}

/** Bloom on the bright parts (desk LEDs, screen, eyes, city windows). */
function Bloom() {
  const { gl, scene, camera, size } = useThree()
  const composer = useMemo(() => {
    const target = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 })
    const c = new EffectComposer(gl, target)
    c.addPass(new RenderPass(scene, camera))
    c.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.55, 0.5, 0.82))
    c.addPass(new OutputPass())
    return c
  }, [gl, scene, camera])

  useEffect(() => {
    composer.setPixelRatio(gl.getPixelRatio())
    composer.setSize(size.width, size.height)
  }, [composer, gl, size])

  useEffect(() => () => composer.dispose(), [composer])

  useFrame((_, delta) => composer.render(delta), 1)
  return null
}


/**
 * Robot idle: a groove-like head bob with a double nod every few seconds,
 * and forearms tapping the keyboard in bursts (hands slightly out of step).
 */
function animateBot(bot, t) {
  const { head, armL, armR } = bot
  if (head) {
    const cycle = t % 4.2
    const nod = cycle < 0.9 ? Math.abs(Math.sin((cycle / 0.9) * Math.PI * 2)) * 0.1 : 0
    head.rotation.x = 0.04 + nod + Math.sin(t * 4.4) * 0.018
    head.rotation.z = Math.sin(t * 0.8) * 0.035
  }
  const burst = THREE.MathUtils.smoothstep((Math.sin(t * 0.9) + 1) / 2, 0.15, 0.4)
  const tapL = Math.max(0, Math.sin(t * 15)) ** 3
  const tapR = Math.max(0, Math.sin(t * 15 + 2.8 + Math.sin(t * 3))) ** 3
  if (armL) armL.rotation.x = -tapL * 0.075 * burst
  if (armR) armR.rotation.x = -tapR * 0.075 * burst
}

const AMBER = new THREE.Color('#E99600')
const TEAL = new THREE.Color('#2FA3A0')

/**
 * Floating "collectible" diamonds over each clickable object.
 * Amber = not opened yet, teal = already collected. Hidden while zoomed in.
 */
function Markers({ scene, active, visited, reduced, hoveredRef, onSelect, onHoverKey }) {
  const items = useMemo(() => {
    scene.updateMatrixWorld(true)
    return Object.entries(HOTSPOTS)
      .map(([key, h], i) => {
        const parts = [h.mesh, ...(h.parts || [])].map((n) => scene.getObjectByName(n)).filter(Boolean)
        if (!parts.length) return null
        const box = new THREE.Box3()
        parts.forEach((p) => box.expandByObject(p))
        const c = box.getCenter(new THREE.Vector3())
        const pos = new THREE.Vector3(c.x, box.max.y + (h.lift ?? 0.22), c.z)
        if (h.out) {
          const toCentre = new THREE.Vector3(-c.x, 0, -c.z).normalize()
          pos.addScaledVector(toCentre, h.out)
        }
        return { key, pos, phase: i * 0.9 }
      })
      .filter(Boolean)
  }, [scene])

  const geo = useMemo(() => new THREE.OctahedronGeometry(1, 0), [])
  const ringGeo = useMemo(() => new THREE.TorusGeometry(1, 0.06, 8, 40), [])
  const mats = useMemo(
    () =>
      items.map(() => ({
        shell: new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.5, depthWrite: false }),
        core: new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.9, depthWrite: false }),
        ring: new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.4, depthWrite: false }),
      })),
    [items],
  )
  useEffect(
    () => () => {
      geo.dispose()
      ringGeo.dispose()
      mats.forEach((m) => Object.values(m).forEach((x) => x.dispose()))
    },
    [geo, ringGeo, mats],
  )

  const groups = useRef([])
  const rings = useRef([])

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    items.forEach((it, i) => {
      const g = groups.current[i]
      if (!g) return
      const collected = visited.has(it.key)
      const hovered = hoveredRef.current === it.key
      const show = !active
      const goal = show ? (hovered ? 1.3 : collected ? 0.75 : 1) : 0
      const s = THREE.MathUtils.damp(g.userData.s ?? 0, goal, 7, dt)
      g.userData.s = s
      g.scale.setScalar(s)
      g.visible = s > 0.01
      g.position.y = it.pos.y + (reduced ? 0 : Math.sin(t * 2 + it.phase) * 0.04)
      if (!reduced) g.rotation.y = t * 1.2 + it.phase

      const base = collected ? TEAL : AMBER
      const m = mats[i]
      m.shell.color.copy(base).multiplyScalar(hovered ? 2.2 : 1.6)
      m.core.color.copy(base).multiplyScalar(collected ? 1.2 : 2.4)
      m.shell.opacity = collected ? 0.32 : 0.5
      m.core.opacity = collected ? 0.5 : 0.9

      const ring = rings.current[i]
      if (ring) {
        const p = reduced ? 0.5 : (t * 0.6 + it.phase) % 1
        ring.scale.setScalar(0.06 + p * 0.12)
        m.ring.color.copy(base).multiplyScalar(1.6)
        m.ring.opacity = collected ? 0 : (1 - p) * 0.45
      }
    })
  })

  return items.map((it, i) => (
    <group
      key={it.key}
      ref={(el) => (groups.current[i] = el)}
      position={it.pos}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(it.key)
      }}
      onPointerMove={(e) => {
        e.stopPropagation()
        onHoverKey(it.key, e)
      }}
      onPointerOut={() => onHoverKey(null)}
    >
      <mesh geometry={geo} material={mats[i].shell} scale={[0.07, 0.11, 0.07]} renderOrder={3} />
      <mesh geometry={geo} material={mats[i].core} scale={[0.03, 0.05, 0.03]} renderOrder={4} />
      <mesh
        ref={(el) => (rings.current[i] = el)}
        geometry={ringGeo}
        material={mats[i].ring}
        position={[0, -0.16, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        renderOrder={3}
      />
    </group>
  ))
}

function Room({ active, visited, onSelect, onHover, reduced, onReady }) {
  const { scene, animations } = useGLTF(MODEL_URL, true)
  const group = useRef()
  const { actions } = useAnimations(animations, group)
  const controls = useThree((s) => s.controls)
  const shaderMats = useRef([])
  const hotMats = useRef({})
  const hovered = useRef(null)
  const base = useRef(null)

  // Baked lighting -> unlit materials; swap in the animated shaders.
  useMemo(() => {
    shaderMats.current = []
    hotMats.current = {}
    let steam = 0
    scene.traverse((o) => {
      if (!o.isMesh) return
      if (o.name.startsWith('S_Steam')) {
        o.material = makeSteamMaterial(steam++ * 1.7)
        o.renderOrder = 2
        shaderMats.current.push(o.material)
        return
      }
      if (o.name.startsWith('S_WaterSheet')) {
        o.material = makeWaterSheetMaterial()
        shaderMats.current.push(o.material)
        return
      }
      if (o.name.startsWith('S_BasinWater')) {
        o.material = makeBasinMaterial()
        shaderMats.current.push(o.material)
        return
      }
      const src = o.material
      const m = new THREE.MeshBasicMaterial({
        map: src.map || null,
        color: src.map ? new THREE.Color(1, 1, 1) : src.color.clone(),
      })
      if (m.map) m.map.anisotropy = 8
      o.material = m
      const key = MESH_TO_KEY[o.name]
      if (key) (hotMats.current[key] ||= []).push(m)
    })
  }, [scene])

  // Robot parts animated in code (origins sit at the neck and elbows).
  const bot = useMemo(
    () => ({
      head: scene.getObjectByName('I_BotHead'),
      armL: scene.getObjectByName('I_BotArmL'),
      armR: scene.getObjectByName('I_BotArmR'),
    }),
    [scene],
  )

  // Camera markers exported from Blender (Focus_<Name>_Cam / _Target).
  const focus = useMemo(() => {
    scene.updateMatrixWorld(true)
    const pos = (name) => {
      const o = scene.getObjectByName(name)
      return o ? o.getWorldPosition(new THREE.Vector3()) : null
    }
    const names = ['Main', ...Object.values(HOTSPOTS).map((h) => h.focus)]
    return Object.fromEntries(
      names.map((n) => [n, { cam: pos(`Focus_${n}_Cam`), target: pos(`Focus_${n}_Target`) }]),
    )
  }, [scene])

  // Birds + metronome loop (one 10 s clip).
  useEffect(() => {
    if (reduced) return undefined
    const list = Object.values(actions).filter(Boolean)
    list.forEach((a) => a.reset().setLoop(THREE.LoopRepeat, Infinity).play())
    return () => list.forEach((a) => a.stop())
  }, [actions, reduced])

  // Initial camera + drag-to-look limits.
  useEffect(() => {
    if (!controls || !focus.Main.cam) return
    const A = controls.constructor.ACTION
    controls.mouseButtons.left = A.ROTATE
    controls.mouseButtons.middle = A.NONE
    controls.mouseButtons.right = A.NONE
    controls.mouseButtons.wheel = A.NONE
    controls.touches.one = A.TOUCH_ROTATE
    controls.touches.two = A.NONE
    controls.touches.three = A.NONE
    controls.smoothTime = 0.65
    controls.draggingSmoothTime = 0.15
    controls.azimuthRotateSpeed = 0.35
    controls.polarRotateSpeed = 0.35
    const { cam, target } = focus.Main
    controls.setLookAt(cam.x, cam.y, cam.z, target.x, target.y, target.z, false)
    controls.update(0)
    base.current = { azimuth: controls.azimuthAngle, polar: controls.polarAngle }
    setRoomLimits(controls, base.current, true)
    onReady?.()
  }, [controls, focus, onReady])

  // Fly to the clicked object, or back to the room.
  useEffect(() => {
    if (!controls || !base.current) return undefined
    const A = controls.constructor.ACTION
    const f = active ? focus[HOTSPOTS[active].focus] : focus.Main
    if (!f?.cam || !f?.target) return undefined
    let cancelled = false
    setRoomLimits(controls, base.current, false)
    controls.mouseButtons.left = active ? A.NONE : A.ROTATE
    controls.touches.one = active ? A.NONE : A.TOUCH_ROTATE
    controls
      .setLookAt(f.cam.x, f.cam.y, f.cam.z, f.target.x, f.target.y, f.target.z, !reduced)
      .then(() => {
        if (!cancelled && !active) setRoomLimits(controls, base.current, true)
      })
    return () => {
      cancelled = true
    }
  }, [active, controls, focus, reduced])

  useFrame((state, dt) => {
    const t = reduced ? 0 : dt
    for (const m of shaderMats.current) m.uniforms.uTime.value += t
    for (const [k, list] of Object.entries(hotMats.current)) {
      const goal = k === hovered.current && !active ? HOVER_BOOST : 1
      for (const m of list) m.color.setScalar(THREE.MathUtils.damp(m.color.r, goal, 10, dt))
    }
    if (!reduced) animateBot(bot, state.clock.elapsedTime)
  })

  const setHover = (k, e) => {
    if (k !== hovered.current) {
      hovered.current = k
      document.body.style.cursor = k ? 'pointer' : ''
    }
    onHover(k && e ? { key: k, x: e.nativeEvent.clientX, y: e.nativeEvent.clientY } : null)
  }

  return (
    <>
    <group
      ref={group}
      onPointerMove={(e) => {
        e.stopPropagation()
        setHover(keyOf(e.object), e)
      }}
      onPointerOut={() => setHover(null)}
      onClick={(e) => {
        e.stopPropagation()
        if (e.delta > 6) return // it was a drag, not a click
        const k = keyOf(e.object)
        if (k) onSelect(k)
        else if (active) onSelect(null)
      }}
    >
      <primitive object={scene} />
    </group>
    <Markers
      scene={scene}
      active={active}
      visited={visited}
      reduced={reduced}
      hoveredRef={hovered}
      onSelect={onSelect}
      onHoverKey={setHover}
    />
    </>
  )
}

export default function OfficeRoom({ active, visited, onSelect, onHover, reduced, onReady }) {
  return (
    <Canvas
      flat
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ fov: 46, near: 0.05, far: 120, position: [6, 4, 6] }}
      onPointerMissed={() => active && onSelect(null)}
    >
      <color attach="background" args={['#001f20']} />
      <ResponsiveFov />
      <CameraControls makeDefault />
      <Suspense fallback={null}>
        <Room
          active={active}
          visited={visited}
          onSelect={onSelect}
          onHover={onHover}
          reduced={reduced}
          onReady={onReady}
        />
      </Suspense>
      <Bloom />
    </Canvas>
  )
}
