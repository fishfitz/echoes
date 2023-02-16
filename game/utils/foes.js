import lvl1 from '../assets/map/lvl1.json'
import { random } from 'all-of-just/arrays'

export default ({ game, shards, foes, bumpers, lights, jetons }) => {
  // Jetons
  const jeton = (x, y) => {
    const type = random(['C', 'H', 'P', 'T'])

    const entity = game.physics.add.sprite(x, y, `jeton${type}`)
      .setAlpha(0)
    jetons.add(entity)

    entity.setDataEnabled()
    entity.data.set('type', type)

    game.tweens.add({
      targets: entity,
      alpha: 1,
      duration: 200
    })

    if ($world.showBoss) entity.setVelocityY(200)
    return entity
  }

  // Shards

  const shardVelocity = 400
  const shard = (x, y, angle) => {
    const entity = game.physics.add.sprite(x + 20, y, 'shard')
    shards.add(entity)

    entity.setVelocityX(shardVelocity * Math.cos(angle))
    entity.setVelocityY(shardVelocity * Math.sin(angle))

    entity.body.onWorldBounds = true
    entity.setCollideWorldBounds(true)
    return entity
  }

  // Small rocks

  game.anims.create({
    key: 'smallRock_idle1',
    frames: game.anims.generateFrameNumbers('smallRock', { start: 0, end: 5 }),
    frameRate: 12,
    repeat: -1
  })

  game.anims.create({
    key: 'smallRock_broken',
    frames: game.anims.generateFrameNumbers('smallRock', { start: 6, end: 11 }),
    frameRate: 12
  })

  const smallRock = (x, y) => {
    const entity = game.physics.add.sprite(x + 20, y, 'smallRock')
    entity.anims.play('smallRock_idle1')

    entity.setDataEnabled()
    entity.data.set('entered', false)
    entity.data.set('hp', 1)

    entity.data.set('onhit', (camera) => {
      const hp = entity.data.get('hp')
      if (hp <= 0) entity.anims.play('smallRock_broken')
      camera.shake(100, 0.003)

      if (Math.random() > 0.9) jeton(entity.x, entity.y)

      setTimeout(() => {
        if (Math.random() > 0.95) shard(entity.x - 35, entity.y + 35, 3 * Math.PI / 4)
        else if (Math.random() > 0.95) shard(entity.x + 35, entity.y + 35, -7 * Math.PI / 4)
        else if (Math.random() > 0.95) shard(entity.x, entity.y + 35, -3 * Math.PI / 2)
        else if (Math.random() > 0.95) shard(entity.x - 35, entity.y - 35, -3 * Math.PI / 4)
        else if (Math.random() > 0.95) shard(entity.x + 35, entity.y - 35, 7 * Math.PI / 4)
        // shard(entity.x, entity.y - 70, 3 * Math.PI / 2)
      }, 200)
    })

    return entity
  }

  lvl1.small.forEach(({ x, y }) => foes.add(smallRock(x, y)))

  // Medium rocks

  game.anims.create({
    key: 'mediumRock_idle1',
    frames: game.anims.generateFrameNumbers('mediumRock', { start: 0, end: 5 }),
    frameRate: 12,
    repeat: -1
  })

  game.anims.create({
    key: 'mediumRock_idle2',
    frames: game.anims.generateFrameNumbers('mediumRock', { start: 6, end: 11 }),
    frameRate: 12,
    repeat: -1
  })

  game.anims.create({
    key: 'mediumRock_idle3',
    frames: game.anims.generateFrameNumbers('mediumRock', { start: 12, end: 17 }),
    frameRate: 12,
    repeat: -1
  })

  game.anims.create({
    key: 'mediumRock_broken',
    frames: game.anims.generateFrameNumbers('mediumRock', { start: 18, end: 22 }),
    frameRate: 12
  })

  const mediumRock = (x, y) => {
    const entity = game.physics.add.sprite(x + 20, y, 'mediumRock')
    entity.anims.play('mediumRock_idle1')

    entity.setDataEnabled()
    entity.data.set('entered', false)
    entity.data.set('hp', 3)

    entity.data.set('onhit', (camera) => {
      const hp = entity.data.get('hp')
      if (hp === 2) entity.anims.play('mediumRock_idle2')
      if (hp === 1) entity.anims.play('mediumRock_idle3')
      if (hp <= 0) {
        camera.shake(300, 0.01, true)
        entity.anims.play('mediumRock_broken')
        jeton(entity.x, entity.y)

        setTimeout(() => {
          shard(entity.x - 70, entity.y + 70, 3 * Math.PI / 4)
          shard(entity.x + 70, entity.y + 70, -7 * Math.PI / 4)
          if (Math.random() > 0.5) shard(entity.x, entity.y + 70, -3 * Math.PI / 2)

          shard(entity.x - 70, entity.y - 70, -3 * Math.PI / 4)
          shard(entity.x + 70, entity.y - 70, 7 * Math.PI / 4)
          // shard(entity.x, entity.y - 70, 3 * Math.PI / 2)
        }, 200)
      } else camera.shake(100, 0.003)
    })

    return entity
  }

  lvl1.medium.forEach(({ x, y }) => foes.add(mediumRock(x, y)))

  // Bumpers

  const bumper = (x, y) => {
    const entity = game.physics.add.sprite(x + 20, y, 'bumper')
    return entity
  }

  lvl1.bumpers.forEach(({ x, y }) => bumpers.add(bumper(x, y)))

  // Bumpers left

  const bumperLeft = (x, y) => {
    const entity = game.physics.add
      .sprite(x, y, 'stalactite')
      .setOrigin(0, 0)
    return entity
  }

  lvl1.bumperLeft.forEach(({ x, y }) => bumpers.add(bumperLeft(x, y)))

  // Bumpers right

  const bumperRight = (x, y) => {
    const entity = game.physics.add
      .sprite(x + 40, y, 'stalactite')
      .setOrigin(1, 0)
      .setFlipX(true)

    return entity
  }

  lvl1.bumperRight.forEach(({ x, y }) => bumpers.add(bumperRight(x, y)))

  // Lights

  game.anims.create({
    key: 'light_idle',
    frames: game.anims.generateFrameNumbers('light', { start: 0, end: 2 }),
    frameRate: 6,
    repeat: -1
  })

  const light = (x, y) => {
    const entity = game.physics.add
      .sprite(x + 20, y, 'light')
      .setAlpha(0.5)

    // entity.anims.play('light_idle')

    return entity
  }

  lvl1.lights.forEach(({ x, y }) => lights.add(light(x, y)))

  return {
    spawnShard: shard,
    spawnBumper: bumper,
    spawnSmallRock: smallRock,
    spawnMediumRock: mediumRock
  }
}
