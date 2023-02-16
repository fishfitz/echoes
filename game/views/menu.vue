<template>
  <div class="centered">
    <h1> ECHOES </h1>
    <view-link to="play" @mouseenter="click">
      Play
    </view-link>
    <br>
    <view-link to="credits" @mouseenter="click">
      Credits
    </view-link>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const click = () => {
//  $world.sound.start('click')
}

onMounted(() => {
//  $world.sound.start('birds', { loop: true })
})

onUnmounted(() => {
//  $world.sound.stop('birds')
})
</script>
