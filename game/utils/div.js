let player

export const playerPosition = (canvas, bat) => {
  const canvasRect = canvas.getBoundingClientRect()
  const x = canvasRect.left + canvasRect.width * bat.x / $world.width

  if (!player) player = document.getElementById('player')

  return { x, y: player.getBoundingClientRect().top }
}
