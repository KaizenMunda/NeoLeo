import { useCallback, useEffect, useRef, useState } from 'react'

// Generated ambience (no audio files): soft chords, a low waterfall hum and the
// occasional piano note. Starts only after a click, as browsers require.

function createAmbient() {
  const AC = window.AudioContext || window.webkitAudioContext
  const ctx = new AC()

  const master = ctx.createGain()
  master.gain.value = 0
  master.connect(ctx.destination)

  const chimeOut = ctx.createGain() // the "switched on" chime plays at full level straight away
  chimeOut.gain.value = 1
  chimeOut.connect(ctx.destination)

  // simple echo for a sense of space
  const delay = ctx.createDelay(1.0)
  delay.delayTime.value = 0.33
  const feedback = ctx.createGain()
  feedback.gain.value = 0.28
  const wet = ctx.createGain()
  wet.gain.value = 0.25
  delay.connect(feedback)
  feedback.connect(delay)
  delay.connect(wet)
  wet.connect(master)

  // waterfall: brown noise through a low-pass filter
  const len = ctx.sampleRate * 2
  const buf = ctx.createBuffer(1, len, ctx.sampleRate)
  const data = buf.getChannelData(0)
  let last = 0
  for (let i = 0; i < len; i++) {
    last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02
    data[i] = last * 3.5
  }
  const noise = ctx.createBufferSource()
  noise.buffer = buf
  noise.loop = true
  const noiseFilter = ctx.createBiquadFilter()
  noiseFilter.type = 'lowpass'
  noiseFilter.frequency.value = 900
  const noiseGain = ctx.createGain()
  noiseGain.gain.value = 0.12
  noise.connect(noiseFilter)
  noiseFilter.connect(noiseGain)
  noiseGain.connect(master)
  noise.start()

  // slow pad: Am7 -> Fmaj7 -> Cmaj7 -> G
  const padBus = ctx.createGain()
  padBus.gain.value = 0.05
  const padFilter = ctx.createBiquadFilter()
  padFilter.type = 'lowpass'
  padFilter.frequency.value = 1200
  padBus.connect(padFilter)
  padFilter.connect(master)
  padFilter.connect(delay)
  const CHORDS = [
    [220, 261.63, 329.63, 392],
    [174.61, 220, 261.63, 329.63],
    [261.63, 329.63, 392, 493.88],
    [196, 246.94, 293.66, 392],
  ]
  const voices = CHORDS[0].map(() => {
    const o = ctx.createOscillator()
    o.type = 'triangle'
    const g = ctx.createGain()
    g.gain.value = 0.25
    o.connect(g)
    g.connect(padBus)
    o.start()
    return o
  })
  let chord = 0
  const nextChord = () => {
    const t = ctx.currentTime
    CHORDS[chord % CHORDS.length].forEach((f, i) => voices[i].frequency.setTargetAtTime(f, t, 0.8))
    chord++
  }
  nextChord()
  const chordTimer = setInterval(nextChord, 6000)

  const pluck = (freq, when, vol, out = master) => {
    const o = ctx.createOscillator()
    o.type = 'sine'
    o.frequency.value = freq
    const o2 = ctx.createOscillator()
    o2.type = 'triangle'
    o2.frequency.value = freq * 2
    const g = ctx.createGain()
    g.gain.setValueAtTime(0, when)
    g.gain.linearRampToValueAtTime(vol, when + 0.01)
    g.gain.exponentialRampToValueAtTime(0.0001, when + 2.2)
    const g2 = ctx.createGain()
    g2.gain.value = 0.25
    o.connect(g)
    o2.connect(g2)
    g2.connect(g)
    g.connect(out)
    g.connect(delay)
    o.start(when)
    o2.start(when)
    o.stop(when + 2.4)
    o2.stop(when + 2.4)
  }
  const SCALE = [440, 523.25, 587.33, 659.25, 783.99, 880]
  const pluckTimer = setInterval(() => {
    if (Math.random() < 0.55) {
      pluck(SCALE[Math.floor(Math.random() * SCALE.length)], ctx.currentTime, 0.06)
    }
  }, 1700)

  let suspendTimer
  return {
    async on() {
      clearTimeout(suspendTimer)
      await ctx.resume()
      const t = ctx.currentTime
      master.gain.cancelScheduledValues(t)
      master.gain.setTargetAtTime(0.9, t, 0.6)
      ;[523.25, 659.25, 783.99].forEach((f, i) => pluck(f, t + i * 0.12, 0.12, chimeOut))
    },
    off() {
      const t = ctx.currentTime
      master.gain.cancelScheduledValues(t)
      master.gain.setTargetAtTime(0, t, 0.25)
      suspendTimer = setTimeout(() => ctx.suspend(), 1500)
    },
    pause: () => ctx.suspend(),
    resume: () => ctx.resume(),
    dispose() {
      clearInterval(chordTimer)
      clearInterval(pluckTimer)
      clearTimeout(suspendTimer)
      ctx.close()
    },
  }
}

export function useAmbientSound() {
  const engine = useRef(null)
  const [on, setOn] = useState(false)

  const toggle = useCallback(() => {
    try {
      if (!engine.current) engine.current = createAmbient()
      if (on) engine.current.off()
      else engine.current.on()
      setOn(!on)
    } catch {
      setOn(false) // Web Audio unavailable
    }
  }, [on])

  // stay quiet while the tab is hidden
  useEffect(() => {
    const onVis = () => {
      if (!engine.current || !on) return
      if (document.hidden) engine.current.pause()
      else engine.current.resume()
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [on])

  useEffect(() => () => engine.current?.dispose(), [])

  return { on, toggle }
}
