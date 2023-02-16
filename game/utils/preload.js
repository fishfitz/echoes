import projectileSprite from '../assets/sprites/projectile.png'
import batSprite from '../assets/sprites/bat.png'
import smallRock from '../assets/sprites/smallRock.png'
import mediumRock from '../assets/sprites/mediumRock.png'
import wall from '../assets/sprites/wall.png'
import shard from '../assets/sprites/shard.png'
import stalactite from '../assets/sprites/stalactite.png'
import bumper from '../assets/sprites/bumper.png'
import light from '../assets/sprites/light.png'
import boss from '../assets/sprites/boss.png'
import background1 from '../assets/sprites/background1.png'
import background2 from '../assets/sprites/background2.png'
import shield from '../assets/sprites/shield.png'
import jetonP from '../assets/sprites/jetonP.png'
import jetonC from '../assets/sprites/jetonC.png'
import jetonH from '../assets/sprites/jetonH.png'
import jetonT from '../assets/sprites/jetonT.png'
import title from '../assets/sprites/title.png'
import menuBackground from '../assets/sprites/menuBackground.png'
import backgroundBat from '../assets/sprites/backgroundBat.png'

import hurt from '../assets/sounds/hurt.mp3'
import light1 from '../assets/sounds/light1.mp3'
import light2 from '../assets/sounds/light2.mp3'
import light3 from '../assets/sounds/light3.mp3'
import hit1 from '../assets/sounds/hit1.mp3'
import hit2 from '../assets/sounds/hit2.mp3'
import hit3 from '../assets/sounds/hit3.mp3'
import projectile from '../assets/sounds/projectile.mp3'
import jetonCSound from '../assets/sounds/jetonC.mp3'
import jetonHSound from '../assets/sounds/jetonH.mp3'
import jetonPSound from '../assets/sounds/jetonP.mp3'
import jetonTSound from '../assets/sounds/jetonT.mp3'
import jetonAllSound from '../assets/sounds/jetonAll.mp3'
import life from '../assets/sounds/life.mp3'
import theme from '../assets/sounds/theme.mp3'
import bossTheme from '../assets/sounds/bossTheme.mp3'

export default function () {
  this.load.on('progress', (progress) => {
    setTimeout(() => {
      $world.loadingProgress = progress
    }, 1000)
  })

  this.load.image('title', title)
  this.load.image('menuBackground', menuBackground)
  this.load.image('backgroundBat', backgroundBat)

  this.load.image('wall', wall)
  this.load.image('projectile', projectileSprite)
  this.load.image('shard', shard)
  this.load.image('stalactite', stalactite)
  this.load.image('bumper', bumper)
  this.load.image('shield', shield)

  this.load.image('jetonP', jetonP)
  this.load.image('jetonC', jetonC)
  this.load.image('jetonH', jetonH)
  this.load.image('jetonT', jetonT)

  this.load.image('background1', background1)
  this.load.image('background2', background2)

  this.load.spritesheet('bat', batSprite, { frameWidth: 100, frameHeight: 96 })
  this.load.spritesheet('smallRock', smallRock, { frameWidth: 80, frameHeight: 80 })
  this.load.spritesheet('mediumRock', mediumRock, { frameWidth: 200, frameHeight: 200 })
  this.load.spritesheet('light', light, { frameWidth: 40, frameHeight: 40 })
  this.load.spritesheet('boss', boss, { frameWidth: 250, frameHeight: 200 })

  //  this.load.audio('click', click)
  //  this.load.audio('birds', birds)

  this.load.audio('hurt', hurt)

  this.load.audio('light1', light1)
  this.load.audio('light2', light2)
  this.load.audio('light3', light3)

  this.load.audio('hit1', hit1)
  this.load.audio('hit2', hit2)
  this.load.audio('hit3', hit3)

  this.load.audio('projectile', projectile)

  this.load.audio('jetonH', jetonHSound)
  this.load.audio('jetonC', jetonCSound)
  this.load.audio('jetonP', jetonPSound)
  this.load.audio('jetonT', jetonTSound)
  this.load.audio('jetonAll', jetonAllSound)

  this.load.audio('life', life)

  this.load.audio('theme', theme)
  this.load.audio('bossTheme', bossTheme)
}
