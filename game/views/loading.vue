<template>
  <div>
    <div class="loader centered" :style="{ opacity: $world.loadingProgress !== 1 ? 1 : 0 }">
      {{ $world.loadingProgress > 0.5 ? 'Collecting tokens...' : 'Breaking Crystals...' }}
      <br/><br/>
      <span class="blink" style="font-size: 50pt; color: #9C87E0;">{{ Math.round($world.loadingProgress * 100) }}%</span>
    </div>
    <view-link :style="{ opacity: $world.loadingProgress !== 1 ? 0 : 1, pointerEvents:  $world.loadingProgress !== 1 ? 'none' : 'auto' }" to="play" class="start">
      <img class="title" :src="title"/>
      <img class="background" :src="background"/>
      <img class="bat" :src="backgroundBat"/>

      <span class="clickto blink"> Click to start </span>
    </view-link>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import title from '../assets/sprites/title.png'
import background from '../assets/sprites/menuBackground.png'
import backgroundBat from '../assets/sprites/backgroundBat.png'

onMounted(() => {
  require('../utils/game')
})
</script>

<style scoped lang="scss">
.loader {
  transition: opacity .5s;
  font-size: 18pt;
  color: white;
}

.start {
  transition: opacity 2s;
  position: fixed;
  left: 0;
  top: 0;
  display: block;
  width: 100%;
  height: 100%;
}

.background, .bat {
  position: absolute;
  left: 0;
  top: 0;
}

.bat {
  z-index: 99;
}

.title, .clickto {
  position: fixed;
  left: 50%;
  top: 150px;
  transform: translateX(-50%);
  z-index: 50;
}

.clickto {
  top: unset;
  bottom: 125px;
  color: #9C87E0;
  font-size: 26pt;
}
</style>
