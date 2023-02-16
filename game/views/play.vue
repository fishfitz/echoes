<template>
  <div class="centered">
    <div ref="parent"/>
    <div id="player"/>
    <div class="gradient"/>
    <div class="score">
      {{ score }}
    </div>
    <img class="life" :src="lifeIcon"/>
    <div class="jetons">
      <img :src="jetonC" :style="$world.jetons.C ? '' : 'opacity: .5; filter: saturate(0)'"/>
      <img :src="jetonH" :style="$world.jetons.H ? '' : 'opacity: .5; filter: saturate(0)'"/>
      <img :src="jetonP" :style="$world.jetons.P ? '' : 'opacity: .5; filter: saturate(0)'"/>
      <img :src="jetonT" :style="$world.jetons.T ? '' : 'opacity: .5; filter: saturate(0)'"/>
    </div>

    <div class="bossLife" :style="{
      left: `${$world.width / 2 - 200}px`,
      opacity: $world.showBoss ? 0.6 : 0
    }">
      <div :style="{
        height: '100%',
        width: `${400 * $world.bossLife / $world.bossMaxLife}px`,
        backgroundColor: '#9C87E0'
      }"/>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { leftPad } from 'all-of-just/strings'

import jetonP from '../assets/sprites/jetonP.png'
import jetonC from '../assets/sprites/jetonC.png'
import jetonH from '../assets/sprites/jetonH.png'
import jetonT from '../assets/sprites/jetonT.png'

import life1 from '../assets/sprites/life1.png'
import life2 from '../assets/sprites/life2.png'
import life3 from '../assets/sprites/life3.png'

const lifeIcon = $computed(() => {
  if ($world.life === 3) return life3
  if ($world.life === 2) return life2
  if ($world.life === 1) return life1
})

const score = $computed(() => leftPad(String($world.score), 7, '0'))

const parent = $ref()

let game
onMounted(() => {
  $world.life = 2
  $world.hasShield = false
  $world.damaged = false
  $world.score = 0
  $world.jetons = {
    C: false,
    H: false,
    P: false,
    T: false
  }
  $world.showBoss = false
  $world.bossLife = $world.bossMaxLife

  game = require('../utils/game').default
  parent.appendChild(game.canvas)

  $world.playing = true
  $world.phaserContext.scene.start()
})

onUnmounted(() => {
  $world.playing = false
})
</script>

<style scoped lang="scss">
  .dialog {
    display: inline-block;
  }

  #player {
    position: fixed;
    left: 50%;
    top: 68%;
    transform: translate(-50%, -50%);
  }

  .score {
    position: fixed;
    bottom: 20px;
    left: 20px;
    color: #8286BA;
    font-size: 30pt;
  }

  .gradient {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 25%;
    background: linear-gradient(transparent, #DFDBF2);
  }

  .jetons {
    position: fixed;
    bottom: 0;
    right: 0;
    margin-right: 5px;

    img {
      margin: 5px;
      margin-bottom: 10px;
      transition: all .2s;
    }
  }

  .life {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    margin: 5px;
  }

  .bossLife {
    position: fixed;
    top: 100px;
    height: 20px;
    width: 400px;
    background-color: white;
    z-index: 80;
    border-radius: 2px;
    transition: opacity 1s;
    border: 3px solid white;
  }
</style>
