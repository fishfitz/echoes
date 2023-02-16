export default (game, length) => {
  const background1Height = 2280

  for (let i = 0; i < 1 + Math.ceil(length / (2 * background1Height)); i++) {
    const bg = game.add.image(0, length / 2 - (i * (background1Height)), 'background1')
      .setScrollFactor(0.5)
      .setOrigin(0, 0)
    bg.depth = -2
  }

  const background2Height = 2560
  for (let i = 0; i < 1 + Math.ceil(length / (0.5 * background2Height)); i++) {
    const bg = game.add.image(0, length / 0.5 - (i * background2Height), 'background2')
      .setScrollFactor(2)
      .setOrigin(0, 0)
    bg.depth = 100
  }
}
