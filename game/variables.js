const sounds = {}

export default {
  height: 1280,
  width: 720,
  loadingProgress: 0,
  playing: false,
  phaserContext: null,
  sound: {
    start (id, options) {
      if (!sounds[id]) sounds[id] = $world.phaserContext.sound.add(id, options)
      sounds[id].play()
    },
    stop (id) {
      sounds[id]?.stop()
    }
  },
  hasShield: false,
  damaged: false,
  life: 2,
  score: 0,
  jetons: {
    C: false,
    H: false,
    P: false,
    T: false
  },
  showBoss: false,
  bossLife: 100,
  bossMaxLife: 100
}
