module.exports = {
  'p,ctrl+p': function ({ VIEW }) {
    VIEW('play')
  },
  'c,ctrl+c': function ({ VIEW }) {
    VIEW('credits')
  },
  f11: function ({ $UI }) {
    $UI.fullscreen()
  }
}
