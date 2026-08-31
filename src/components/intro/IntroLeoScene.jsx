import { useLayoutEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { LEO_CONFIG } from './config.js'
import { applyHolderTransform, fitModelToConfig, updateCameraForViewport } from './leoPlacement.js'
import { useLeoGLTF, useLeoGLTFCleanup } from './useLeoGLTF.js'

function MuzzleMarker({ visible }) {
  return (
    <mesh visible={visible}>
      <sphereGeometry args={[0.07, 12, 12]} />
      <meshBasicMaterial color="#ff3b3b" />
    </mesh>
  )
}

export default function IntroLeoScene({ leoApiRef, tunerOpen }) {
  const holderRef = useRef(null)
  const muzzleRef = useRef(null)
  const modelRootRef = useRef(null)
  const keyLightRef = useRef(null)
  const ambLightRef = useRef(null)
  const fittedRef = useRef(false)

  const { scene } = useLeoGLTF()
  useLeoGLTFCleanup()
  const { camera, size } = useThree()

  useLayoutEffect(() => {
    camera.position.set(...LEO_CONFIG.cameraPosition)
    camera.near = LEO_CONFIG.cameraNear
    camera.far = LEO_CONFIG.cameraFar
  }, [camera])

  useLayoutEffect(() => {
    if (!holderRef.current || !scene || fittedRef.current) return

    const root = scene.clone(true)
    modelRootRef.current = root

    root.traverse((o) => {
      if (o.isMesh || o.isSkinnedMesh) {
        o.frustumCulled = false
        if (o.material) o.material.side = THREE.FrontSide
      }
    })

    fitModelToConfig(root)
    holderRef.current.add(root)

    if (muzzleRef.current) {
      muzzleRef.current.position.set(
        LEO_CONFIG.muzzle.x,
        LEO_CONFIG.muzzle.y,
        LEO_CONFIG.muzzle.z,
      )
    }

    fittedRef.current = true

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
      holderRef.current?.remove(root)
      fittedRef.current = false
      modelRootRef.current = null
    }
  }, [scene])

  function place() {
    if (holderRef.current) {
      applyHolderTransform(holderRef.current, camera)
    }
    if (muzzleRef.current) {
      muzzleRef.current.position.set(
        LEO_CONFIG.muzzle.x,
        LEO_CONFIG.muzzle.y,
        LEO_CONFIG.muzzle.z,
      )
    }
    if (keyLightRef.current) keyLightRef.current.intensity = LEO_CONFIG.key
    if (ambLightRef.current) ambLightRef.current.intensity = LEO_CONFIG.amb
  }

  useLayoutEffect(() => {
    if (!leoApiRef) return
    leoApiRef.current = {
      place,
      refit: () => {
        if (modelRootRef.current) fitModelToConfig(modelRootRef.current)
        place()
      },
    }
    place()
  })

  useFrame(() => {
    updateCameraForViewport(camera, size.width, size.height)
    applyHolderTransform(holderRef.current, camera)
    if (muzzleRef.current) {
      muzzleRef.current.position.set(
        LEO_CONFIG.muzzle.x,
        LEO_CONFIG.muzzle.y,
        LEO_CONFIG.muzzle.z,
      )
    }
  })

  return (
    <>
      <directionalLight
        ref={keyLightRef}
        position={[-3, 4, 5]}
        intensity={LEO_CONFIG.key}
      />
      <directionalLight position={[4, 1, -3]} intensity={LEO_CONFIG.rim} color="#9fd0ff" />
      <hemisphereLight ref={ambLightRef} args={['#ffffff', '#404058', LEO_CONFIG.amb]} />
      <group ref={holderRef}>
        <object3D ref={muzzleRef}>
          <MuzzleMarker visible={tunerOpen} />
        </object3D>
      </group>
    </>
  )
}
