// Interactive 3D office — model paths and clickable hotspots.
// The GLB is produced by blender-office/webbuild/build_web.py (lighting is baked into the textures).

export const MODEL_URL = '/office/model.glb'
export const FALLBACK_IMG = '/office/fallback.jpg'

// key -> mesh in the GLB (+ extra animated parts), camera marker (Focus_<focus>_Cam / _Target),
// kind: 'panel' (side panel), 'screen' (full-screen computer view) or 'toggle' (no camera move).
// lift / out: where the floating diamond sits (metres above the object / away from the wall).
export const HOTSPOTS = {
  vision: { mesh: 'I_Portrait', focus: 'Portrait', label: 'Vision', kind: 'panel', lift: 0.22, out: 0.3 },
  projects: { mesh: 'I_Monitor', focus: 'Monitor', label: 'Projects', kind: 'screen', lift: 0.24 },
  achievements: {
    mesh: 'I_Certificates',
    focus: 'Certificates',
    label: 'Achievements',
    kind: 'panel',
    lift: 0.22,
    out: 0.3,
  },
  careers: { mesh: 'I_IDCard', focus: 'IDCard', label: 'Careers', kind: 'panel', lift: 0.12 },
  contact: { mesh: 'I_Phone', focus: 'Phone', label: 'Contact', kind: 'panel', lift: 0.16 },
  brief: {
    mesh: 'I_Bot',
    parts: ['I_BotHead', 'I_BotArmL', 'I_BotArmR'],
    focus: 'Bot',
    label: 'Start a brief',
    kind: 'panel',
    lift: 0.2,
  },
  sound: { mesh: 'I_Piano', label: 'Sound', kind: 'toggle', lift: 0.25, out: 0.2 },
}

// Bottom menu (plus the Home button)
export const MENU = ['vision', 'projects', 'achievements', 'careers', 'contact']

export const COLLECTIBLES = Object.keys(HOTSPOTS)

export const MESH_TO_KEY = Object.fromEntries(
  Object.entries(HOTSPOTS).flatMap(([key, h]) => [h.mesh, ...(h.parts || [])].map((m) => [m, key])),
)

export const isRoutable = (key) => !!HOTSPOTS[key] && HOTSPOTS[key].kind !== 'toggle'
