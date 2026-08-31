import { INTRO_CONFIG } from './config.js'

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function introAlreadyPlayed() {
  try {
    return sessionStorage.getItem(INTRO_CONFIG.sessionKey) === '1'
  } catch {
    return false
  }
}

export function markIntroPlayed() {
  try {
    sessionStorage.setItem(INTRO_CONFIG.sessionKey, '1')
  } catch {
    /* ignore */
  }
}

export function shouldSkipIntro() {
  return prefersReducedMotion() || introAlreadyPlayed()
}

export function revealColourStage() {
  const stage = document.querySelector(INTRO_CONFIG.stageSelector)
  if (!stage) return
  stage.classList.add('intro-swapping', 'state-b')
}

export function finishIntro() {
  revealColourStage()
  markIntroPlayed()
}
