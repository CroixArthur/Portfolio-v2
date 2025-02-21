<template>
  <main :style="getWindowOffsetStyle">
    <div
      class="abs-round centered ellipse"
      v-for="ellipse in ellipses"
      :style="'width: '+ellipse+'%;height: '+(ellipse/2)+'%'"
    ></div>
    <div
      class="abs-round planet centered"
      style="background-color: blue;"
      v-for="planet in planets"
      :style="{
        width: planet.d + 'vh',
        height: planet.d + 'vh',
        top: planet.y + '%',
        left: planet.x + '%',
      }"
      :id="planet.name"
      @click="selectedPlanet = planet"
    ></div>
    <div class="abs-round centered sun" style="width: 6vh;height: 6vh"></div>
  </main>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { Planet } from './planet';

const viewOffset = ref({ y: 0, x: 0 });
const selectedPlanet = ref<Planet|null>(null);
const ellipses: number[] = [90, 72, 60, 48, 30, 18];
const planets = ref<Planet[]>([
  { y: 40, x: 10, d: 5, p: 600, name: "pienerth", speed: 0.1 },
  { y: 66, x: 34, d: 5, p: 320, name: "ciri", speed: 0.2 },
  { y: 53, x: 79, d: 5, p: 20, name: "xv5-9", speed: 0.3 },
  { y: 39, x: 39, d: 4, p: 680, name: "gorth-685", speed: 0.4 },
  { y: 45, x: 61, d: 3.5, p: 920, name: "stheno", speed: 0.5 },
  { y: 53, x: 44, d: 2.5, p: 360, name: "tammuz", speed: 0.6 },
]);

const getWindowOffsetStyle = computed(() => {
  return selectedPlanet.value != null
    ? "{margin-top: selectedPlanet.value.y,margin-left: selectedPlanet.value.x}"
    : "";
})

const getPosOnEllipse = (x: number, y: number, w: number, h: number, p: number) => {
  const t = p/1000 * 2 * Math.PI;
  return {
    x: x + w / 2 * Math.cos(t),
    y: y + h / 2 * Math.sin(t)
  };
}

const movePlanets = () => {
  for (let index = 0; index < planets.value.length; index++) {
    const newPos = getPosOnEllipse(50, 50, ellipses[index], ellipses[index] / 2, planets.value[index].p);
    const step = planets.value[index].speed;
    planets.value[index] = {
      ...planets.value[index],
      p: planets.value[index].p > 999 ? step : planets.value[index].p + step,
      x: newPos.x,
      y: newPos.y
    };
  }
}

onMounted(() => {
  setInterval(movePlanets, 10);
});
</script>
