import * as THREE from 'three'
import { LEO_CONFIG } from './config.js'

const _target = new THREE.Vector3()
const _dir = new THREE.Vector3()

export function worldAtNDC(camera, nx, ny, zPlane = 0) {
  _target.set(nx, ny, 0.5).unproject(camera)
  _dir.copy(_target).sub(camera.position).normalize()
  const dist = (zPlane - camera.position.z) / _dir.z
  return camera.position.clone().add(_dir.multiplyScalar(dist))
}

export function fitModelToConfig(object) {
  object.scale.setScalar(1)
  object.position.set(0, 0, 0)
  object.rotation.set(0, 0, 0)
  object.updateMatrixWorld(true)

  const box = new THREE.Box3().setFromObject(object)
  const size = box.getSize(new THREE.Vector3())
  const ctr = box.getCenter(new THREE.Vector3())
  const s = LEO_CONFIG.height / (size.y || 1)
  object.scale.setScalar(s)
  object.position.set(-ctr.x * s, -box.min.y * s, -ctr.z * s)
}

export function applyHolderTransform(holder, camera) {
  const p = worldAtNDC(camera, LEO_CONFIG.anchorNX, LEO_CONFIG.anchorNY, LEO_CONFIG.anchorZ)
  holder.position.set(
    p.x + LEO_CONFIG.pos.x,
    p.y + LEO_CONFIG.pos.y,
    p.z + LEO_CONFIG.pos.z,
  )
  holder.rotation.set(
    THREE.MathUtils.degToRad(LEO_CONFIG.rot.x),
    THREE.MathUtils.degToRad(LEO_CONFIG.rot.y),
    THREE.MathUtils.degToRad(LEO_CONFIG.rot.z),
  )
}

export function updateCameraForViewport(camera, width, height) {
  camera.aspect = width / height
  camera.fov =
    width / height < LEO_CONFIG.portraitAspectThreshold
      ? LEO_CONFIG.fovPortrait
      : LEO_CONFIG.fovLandscape
  camera.updateProjectionMatrix()
}

export function exportLeoConfigJson() {
  return JSON.stringify(
    {
      height: LEO_CONFIG.height,
      pos: { ...LEO_CONFIG.pos },
      rot: { ...LEO_CONFIG.rot },
      muzzle: { ...LEO_CONFIG.muzzle },
      key: LEO_CONFIG.key,
      amb: LEO_CONFIG.amb,
      anchorNX: LEO_CONFIG.anchorNX,
    },
    null,
    2,
  )
}
