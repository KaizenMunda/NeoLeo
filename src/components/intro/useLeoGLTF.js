import { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import { LEO_CONFIG } from './config.js'

let dracoLoader
let ktx2Loader

function configureLoader(loader, gl) {
  if (!dracoLoader) {
    dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/')
  }
  loader.setDRACOLoader(dracoLoader)
  loader.setMeshoptDecoder(MeshoptDecoder)

  if (!ktx2Loader) {
    ktx2Loader = new KTX2Loader()
    ktx2Loader.setTranscoderPath(
      'https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/libs/basis/',
    )
  }
  if (gl) {
    ktx2Loader.detectSupport(gl)
  }
  loader.setKTX2Loader(ktx2Loader)
}

export function useLeoGLTF() {
  const { gl } = useThree()
  return useGLTF(LEO_CONFIG.modelUrl, true, true, (loader) => {
    configureLoader(loader, gl)
  })
}

useGLTF.preload(LEO_CONFIG.modelUrl, true, true, (loader) => {
  configureLoader(loader, null)
})

export function useLeoGLTFCleanup() {
  useEffect(() => {
    return () => {
      useGLTF.clear(LEO_CONFIG.modelUrl)
    }
  }, [])
}
