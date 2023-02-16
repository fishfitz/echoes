import { useThrottleFn } from '@vueuse/core'

let game
let hurtSound

let lightSounds
let lightIndex

let hitSounds
let hitIndex

let projectileSound
let jetonSounds
let lifeSound
let themeSound
let bossThemeSound

export const init = (gameInstance) => {
  game = gameInstance

  hurtSound = game.sound.add('hurt')

  lightSounds = [
    game.sound.add('light1', { volume: 0 }),
    game.sound.add('light2', { volume: 0 }),
    game.sound.add('light3', { volume: 0 })
  ]
  lightIndex = 0

  hitSounds = [
    game.sound.add('hit1', { volume: 0.2 }),
    game.sound.add('hit2', { volume: 0.2 }),
    game.sound.add('hit3', { volume: 0.2 })
  ]
  hitIndex = 0

  projectileSound = game.sound.add('projectile', { volume: 0.5 })

  jetonSounds = {
    C: game.sound.add('jetonC', { volume: 0.5 }),
    H: game.sound.add('jetonH', { volume: 0.5 }),
    P: game.sound.add('jetonP', { volume: 0.5 }),
    T: game.sound.add('jetonT', { volume: 0.5 }),
    All: game.sound.add('jetonAll', { volume: 1 })
  }

  lifeSound = game.sound.add('life')
  themeSound = game.sound.add('theme', { volume: 0.3, loop: true })
  bossThemeSound = game.sound.add('bossTheme', { volume: 1, loop: true })
}

export const hurt = () => {
  hurtSound.play()
}

export const light = useThrottleFn(() => {
  lightSounds[lightIndex].play()
  lightIndex = (lightIndex + 1) % 3
}, 100)

export const hit = useThrottleFn(() => {
  hitSounds[hitIndex].play()
  hitIndex = (hitIndex + 1) % 3
}, 100)

export const projectile = () => {
  projectileSound.play()
}

export const jeton = (type) => {
  jetonSounds[type].play()
}

export const life = () => {
  lifeSound.play()
}

export const theme = () => {
  bossThemeSound.stop()
  themeSound.play()
}

export const bossTheme = () => {
  themeSound.stop()
  bossThemeSound.play()
}
