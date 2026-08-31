import { useLayoutEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { INTRO_CONFIG } from './config.js'
import { beamApi } from './beamApi.js'
import { easeOutBack, lerp, phaseProgress, sinEnvelope } from './easing.js'
import { useLeoGLTF } from './useLeoGLTF.js'

const _world = new THREE.Vector3()
const _ndc = new THREE.Vector3()

export default function LionModel({ clockRef, modelHeightRef, skipIntro }) {
  const groupRef = useRef(null)
  const muzzleRef = useRef(null)
  const rootRef = useRef(null)
  const normalizedRef = useRef(false)

  const { scene } = useLeoGLTF()

  useLayoutEffect(() => {
    if (!groupRef.current || !scene || normalizedRef.current) return

    const root = scene.clone(true)
    rootRef.current = root

    const box = new THREE.Box3().setFromObject(root)
    const size = new THREE.Vector3()
    box.getSize(size)
    const height = size.y || 1
    const scale = INTRO_CONFIG.modelHeight / height
    root.scale.setScalar(scale)

    root.updateMatrixWorld(true)
    const box2 = new THREE.Box3().setFromObject(root)
    const center = new THREE.Vector3()
    box2.getCenter(center)
    root.position.x -= center.x
    root.position.z -= center.z
    root.position.y -= box2.min.y

    root.rotation.y = INTRO_CONFIG.modelRotationY

    const muzzle = new THREE.Object3D()
    muzzle.position.set(
      INTRO_CONFIG.muzzleOffset.x,
      INTRO_CONFIG.muzzleOffset.y,
      INTRO_CONFIG.muzzleOffset.z,
    )
    root.add(muzzle)
    muzzleRef.current = muzzle

    groupRef.current.add(root)
    modelHeightRef.current = INTRO_CONFIG.modelHeight
    normalizedRef.current = true

    if (skipIntro) {
      groupRef.current.position.y = 0
    } else {
      groupRef.current.position.y = -1.25 * INTRO_CONFIG.modelHeight
    }

    return () => {
      root.traverse((child) => {
        if (child.isMesh || child.isSkinnedMesh) {
          child.geometry?.dispose()
          const mats = Array.isArray(child.material) ? child.material : [child.material]
          mats.forEach((m) => {
            if (!m) return
            Object.values(m).forEach((v) => {
              if (v?.isTexture) v.dispose()
            })
            m.dispose()
          })
        }
      })
      groupRef.current?.remove(root)
    }
  }, [scene, modelHeightRef, skipIntro])

  useFrame(({ camera, size }) => {
    const group = groupRef.current
    const muzzle = muzzleRef.current
    if (!group || !clockRef.current.t0) return

    const elapsed = performance.now() - clockRef.current.t0
    const h = modelHeightRef.current || INTRO_CONFIG.modelHeight
    const { phases, idle, charge, fire } = INTRO_CONFIG

    const ep = phaseProgress(elapsed, phases.entranceStart, phases.entranceDuration)
    let entranceY
    if (elapsed < phases.entranceStart) {
      entranceY = -1.25 * h
    } else {
      entranceY = lerp(-1.25 * h, 0, easeOutBack(ep))
    }

    let idleY = 0
    let idleRot = 0
    if (elapsed >= phases.entranceStart + phases.entranceDuration) {
      idleY = Math.sin(elapsed * idle.bobFrequency) * idle.bobAmplitude
      idleRot = Math.sin(elapsed * idle.swayFrequency + idle.swayPhase) * idle.swayAmplitude
    }

    const cp = phaseProgress(elapsed, phases.chargeStart, phases.chargeDuration)
    const chargeEnv = sinEnvelope(cp)

    const fp = phaseProgress(elapsed, phases.fireStart, phases.fireDuration)
    const fireEnv = sinEnvelope(fp)

    group.position.set(
      -chargeEnv * charge.leanX + fireEnv * fire.recoilX,
      entranceY + idleY,
      -chargeEnv * charge.leanZ + fireEnv * fire.recoilZ,
    )

    group.rotation.set(
      chargeEnv * charge.pitchX - fireEnv * fire.rotX,
      -chargeEnv * charge.yawY,
      idleRot + fireEnv * fire.rotZ,
    )

    beamApi.power = fireEnv
    beamApi.active = elapsed >= phases.fireStart - 80

    if (muzzle) {
      muzzle.getWorldPosition(_world)
      _ndc.copy(_world).project(camera)
      beamApi.ox = (_ndc.x * 0.5 + 0.5) * size.width
      beamApi.oy = (-_ndc.y * 0.5 + 0.5) * size.height
    }
  })

  return <group ref={groupRef} />
}
