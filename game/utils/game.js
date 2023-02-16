import Phaser from 'phaser'
import { useThrottleFn } from '@vueuse/core'
import preload from './preload'
import { playerPosition } from './div'
import spawnFoes from './foes'
import background from './background'
import {
  init as initSounds,
  hurt as hurtSound,
  hit as hitSound,
  projectile as projectileSound,
  jeton as jetonSound,
  life as lifeSound,
  theme,
  bossTheme
} from './sounds'

let end
let bat
let projectiles
let shards
let foes
let cursors
let bossfight
let bossPoped
let fireProjectile
const keys = {}
const scrollVelocity = -150
let shield
let projectileScale

const game = new Phaser.Game({
  parent: null,
  backgroundColor: 0xD6D2EF,
  width: $world.width,
  height: $world.height,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: {
    cameras: {
      width: $world.width,
      height: $world.height,
      name: 'main'
    },
    preload,

    init () {
      $world.phaserContext = this
    },

    create () {
      if (!$world.playing) {
        this.scene.stop()
        return
      }

      projectileScale = 1
      bossPoped = false

      initSounds(this)
      theme()
      projectileSound()

      end = () => {
        $world.showBoss = false
        $world.damaged = true

        if ($world.life <= 0) bat.setAcceleration(150)
        else bat.setAcceleration(50)

        bat.setVelocityX(0)

        this.cameras.main.fadeOut(1000)

        setTimeout(() => {
          $world.playing = false
          this.scene.stop()
          $world.VIEW('end')
        }, 1000)
      }

      const fadeout = (sprite, duration = 500) => {
        sprite.disableBody()

        this.tweens.add({
          targets: sprite,
          alpha: 0,
          duration
        })

        setTimeout(() => {
          sprite.destroy()
        }, duration)
      }

      shards = this.physics.add.group()
      foes = this.physics.add.group({
        immovable: true
      })

      const lights = this.physics.add.group({
        immovable: true
      })

      const bumpers = this.physics.add.group({
        immovable: true
      })

      const jetons = this.physics.add.group({
        immovable: true
      })

      const {
        spawnShard,
        spawnSmallRock,
        spawnMediumRock
      } = spawnFoes({ game: this, shards, foes, lights, bumpers, jetons })

      const worldLength = 14400

      this.physics.world.setBounds(0, 0, $world.width, worldLength)
      this.cameras.main.setBounds(0, 0, $world.width, worldLength)

      this.physics.world.on('worldbounds', (entity, e, c) => {
        if (entity.gameObject.texture.key === 'shard') entity.gameObject.destroy()
      })

      const walls = this.physics.add.group({
        immovable: true,
        velocityY: scrollVelocity
      })
      const bottomWall = this.physics.add.sprite(360, worldLength + 150, 'wall').setAlpha(0)
      walls.add(bottomWall)

      const topWall = this.physics.add.sprite(360, worldLength - $world.height - 85, 'wall').setAlpha(0)
      walls.add(topWall)

      bossfight = () => {
        bossPoped = true
        bossTheme()

        this.cameras.main.shake(2000, 0.05, true)

        bat.setVelocityY(0)
        topWall.setVelocityY(0)
        bottomWall.setVelocityY(0)

        const boss = this.physics.add.sprite($world.width / 2, bat.y - 500, 'boss')
          .setAlpha(0)
          .setImmovable(true)

        game.anims.create({
          key: 'phase1',
          frames: game.anims.generateFrameNumbers('boss', { start: 0, end: 0 }),
          frameRate: 1
        })

        this.tweens.add({
          targets: boss,
          alpha: 1,
          duration: 2000
        })

        const phase1 = () => {
          $world.showBoss = true
          boss.anims.play('phase1')
          let tween

          this.tweens.add({
            targets: boss,
            x: 200,
            duration: 1000
          })

          setTimeout(() => {
            tween = this.tweens.add({
              targets: boss,
              x: $world.width - 200,
              duration: 2000,
              yoyo: true,
              repeat: -1
            })
          }, 1000)

          let cycle = 0
          const attack = setInterval(() => {
            if ($world.life <= 0) {
              clearInterval(attack)
              return
            }

            let entity
            if (cycle === 2) {
              entity = spawnSmallRock(boss.x - 100, boss.y + 70)
              foes.add(entity)
              entity.setVelocityY(400)
            } else if (cycle === 4) {
              entity = spawnSmallRock(boss.x - 100, boss.y + 70)
              foes.add(entity)
              entity.setVelocityY(400)
            } else if (cycle === 9) {
              entity = spawnMediumRock(boss.x, boss.y + 70)
              foes.add(entity)
              entity.setVelocityY(100)
            } else if (cycle % 2) {
              spawnShard(boss.x - 100, boss.y + 70, 3 * Math.PI / 4)
              spawnShard(boss.x + 100, boss.y + 70, -7 * Math.PI / 4)
              spawnShard(boss.x, boss.y + 70, -3 * Math.PI / 2)
            } else {
              spawnShard(boss.x - 50, boss.y + 70, 2 * Math.PI / 3)
              spawnShard(boss.x + 50, boss.y + 70, Math.PI / 3)
            }

            cycle = (cycle + 1) % 10
          }, 800)

          const damageBoss = () => {
            hitSound()

            $world.bossLife -= 1
            $world.score += 10
            if ($world.bossLife <= 0) {
              theme()
              tween.stop()
              this.cameras.main.shake(4000, 0.05, true)

              clearInterval(attack)
              fadeout(boss, 6000)
              setTimeout(end, 5000)
            } else this.cameras.main.shake(200, 0.005)
          }

          this.physics.add.collider(projectiles, boss, (boss, projectile) => {
            damageBoss()
            projectile.data.set('score', projectile.data.get('score') + 10)
            if (projectile.data.get('score') >= 16) projectile.setTint(0xbe2596)
          })

          this.physics.add.collider(boss, shards, (boss, shard) => {
            damageBoss()
            shard.destroy()
          })
        }

        setTimeout(phase1, 2000)
      }

      background(this, worldLength)

      bat = this.physics.add.sprite(360, 14400 - 200, 'bat')
      bat.depth = 99
      bat.setCollideWorldBounds(true)

      shield = this.add.sprite(360, 14400 - 200, 'shield')
      shield.alpha = 0
      shield.depth = 100

      this.anims.create({
        key: 'fly',
        frames: this.anims.generateFrameNumbers('bat', { start: 0, end: 5 }),
        frameRate: 16,
        repeat: -1
      })

      this.anims.create({
        key: 'hurt',
        frames: this.anims.generateFrameNumbers('bat', { start: 5, end: 7 }),
        frameRate: 6
      })

      bat.anims.play('fly')
      bat.setVelocity(scrollVelocity)

      this.cameras.main.startFollow(bat, true, 1, 1, 0, 300)

      projectiles = this.physics.add.group({
        defaultKey: 'projectile',
        bounceX: 1,
        bounceY: 1,
        collideWorldBounds: true
      })

      fireProjectile = useThrottleFn((pointer) => {
        if (!$world.playing) return
        projectileSound()

        const origin = playerPosition(game.canvas, bat)

        if (pointer.event.clientY * 1.05 >= origin.y) return

        const projectile = this.physics.add.sprite(bat.x, bat.y - 80, 'projectile')
        // .setScale(projectileScale)
        projectiles.add(projectile)

        projectile.setDataEnabled()
        projectile.data.set('score', 1)

        const angle = Math.atan2(pointer.event.clientY - origin.y, pointer.event.clientX - origin.x)
        projectile.setVelocityX(700 * Math.cos(angle))
        projectile.setVelocityY(700 * Math.sin(angle))

        projectile.setCollideWorldBounds(true)
        projectile.setBounce(1)
      }, 500)

      const damageFoe = (foe, projectile) => {
        hitSound()
        const hp = foe.data.get('hp') - 1
        foe.data.set('hp', hp)
        foe.data.get('onhit')?.(this.cameras.main)
        if (hp <= 0) fadeout(foe)
        $world.score += 1
      }

      const damagePlayer = useThrottleFn(() => {
        if ($world.hasShield || $world.damaged) return

        hurtSound()

        bat.anims.play('hurt', true).on('animationcomplete', () => {
          setTimeout(() => {
            if ($world.life > 0) bat.anims.play('fly')
          }, 250)
        })

        $world.life -= 1

        this.tweens.add({
          targets: bat,
          alpha: 0,
          duration: 50,
          repeat: 8,
          yoyo: true
        })

        if ($world.life <= 0) {
          this.cameras.main.shake(1000, 0.05, true)
          end()
        } else {
          this.cameras.main.shake(500, 0.02, true)
          $world.damaged = true

          setTimeout(() => {
            $world.damaged = false
          }, 1000)
        }
      }, 1000)

      this.physics.add.collider(foes, projectiles, (foe, projectile) => {
        damageFoe(foe)
        projectile.data.set('score', projectile.data.get('score') * 2)
        if (projectile.data.get('score') >= 16) projectile.setTint(0xbe2596)
      })

      this.physics.add.collider(foes, shards, (foe, shard) => {
        damageFoe(foe)
        shard.destroy()
      })

      this.physics.add.collider(projectiles, bumpers)

      /*
      this.physics.add.overlap(topWall, foes, (wall, foe) => {
        foe.data.set('entered', true)
      })
      */

      this.physics.add.overlap(bottomWall, foes, (wall, foe) => {
        foe.destroy()
      })

      this.physics.add.overlap(bat, projectiles, (bat, projectile) => {
        const score = projectile.data.get('score')

        if (score >= 16) {
          lifeSound()
          if ($world.life < 3) $world.life++
          projectileScale += 0.1
        }

        $world.score += score
        projectile.destroy()
      })

      this.physics.add.overlap(projectiles, walls, (projectile) => {
        projectile.destroy()
      })

      this.physics.add.overlap(projectiles, lights, (projectile, light) => {
        fadeout(light, 200)
        $world.score += 1
      })

      this.physics.add.overlap(shards, walls, (shard) => {
        shard.destroy()
      })

      this.physics.add.overlap(shards, bumpers, (shard) => {
        shard.destroy()
      })

      this.physics.add.overlap(bat, foes, (bat, foe) => {
        damagePlayer()
        foe.data.set('hp', 0)
        damageFoe(foe)
      })

      this.physics.add.overlap(shards, bat, (bat, shard) => {
        damagePlayer()
        shard.destroy()
      })

      this.physics.add.overlap(lights, bat, (bat, light) => {
        fadeout(light, 200)
        $world.score += 1
      })

      this.physics.add.overlap(bumpers, bat, () => {
        damagePlayer()
      })

      this.physics.add.overlap(jetons, bat, (bat, jeton) => {
        const type = jeton.data.get('type')

        $world.score += 100
        $world.jetons[type] = true

        if ($world.jetons.H && $world.jetons.C && $world.jetons.T && $world.jetons.P) {
          jetonSound('All')

          $world.jetons = {
            C: false,
            H: false,
            P: false,
            T: false
          }
          $world.score *= 2
          $world.hasShield = true
          projectileScale += 0.4

          this.tweens.add({
            targets: shield,
            alpha: 0.5,
            duration: 300
          })

          setTimeout(() => {
            this.tweens.add({
              targets: shield,
              alpha: 0,
              duration: 300
            })
          }, 4700)

          setTimeout(() => {
            $world.hasShield = false
          }, 5000)
        } else jetonSound(type)

        fadeout(jeton, 100)
      })

      cursors = this.input.keyboard.createCursorKeys()
      keys.q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q)
      keys.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    },

    update () {
      if (!$world.playing) this.scene.stop()

      if ($world.life > 0) {
        if (cursors.left.isDown || keys.q.isDown) {
          bat.setVelocityX(-320)
        } else if (cursors.right.isDown || keys.d.isDown) {
          bat.setVelocityX(320)
        } else {
          bat.setVelocityX(0)
        }
      }

      projectiles.children.iterate(projectile => {
        projectile.rotation = projectile.body.angle + Math.PI / 2
      })

      shards.children.iterate(shard => {
        shard.rotation = shard.body.angle + Math.PI / 2
      })

      if ($world.showBoss) {
        foes.children.iterate(foe => {
          if (foe.body.velocity.y > 0) foe.rotation = foe.body.angle + Math.PI / 2
        })
      }

      if ($world.hasShield) {
        shield.x = bat.x
        shield.y = bat.y
      }

      if (this.input.manager.activePointer.isDown) fireProjectile(this.input.manager.activePointer)

      if (bat.y < $world.height && !bossPoped) bossfight()
    }
  }
})

export default game
