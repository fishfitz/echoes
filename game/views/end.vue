<template>
  <view-link to="loading" class="end centered" @click="refresh">
    <span style="font-size: 38pt;">
      {{ $world.life <= 0 ? 'You\'ll do better next time!' : 'You made it!' }}
    </span>

    <br/><br/>
    <br/>
    <br/>    <br/>
    <br/>
    <br/>
    <br/>

    — SCORE —
    <br/>
    <span style="font-size: 60pt; color: #9C87E0;"> {{ $world.score }} </span>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>

    <span class="blink">Click to play again!</span>
  </view-link>
</template>

<script setup>
const refresh = () => {
  window.location.reload()
}
</script>

<style lang="scss" scoped>
.end {
  display: block;
  width: 100%;
  transition: opacity .5s;
  font-size: 24pt;
  color: white;
}
</style>
