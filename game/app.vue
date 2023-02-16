<template>
  <div class="container centered" :style="style">
    <router-view/>
  </div>
</template>

<script setup>
import './assets/style/main.scss'
import { watch, nextTick } from 'vue'
import { useWindowSize } from '@vueuse/core'
const { width, height } = useWindowSize()

let style = $ref('')

watch(() => [width.value, height.value], () => {
  nextTick(() => {
    const factor = Math.min(width.value / $world.width, height.value / $world.height)
    style = `
      height: ${$world.height}px;
      width: ${$world.width}px;
      transform: translate(-50%, -50%) scale(${factor}, ${factor});
    `
  })
}, { immediate: true })
</script>

<style lang="scss" scoped>
</style>
