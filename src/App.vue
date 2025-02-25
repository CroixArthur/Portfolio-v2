<template>
  <main>
    <div
      class="camera"
      :style="{
        // marginTop: viewOffset.y ? 'calc(' + viewOffset.y + '% - ' + (selectedPlanet?.d ?? 0) / 2 + 'vh)' : 0,
        // marginLeft: viewOffset.x ? 'calc(' + viewOffset.x + '% - ' + (selectedPlanet?.d ?? 0) / 2 + 'vh)' : 0,
        //marginTop: viewOffset.y + '%',
        marginTop: - viewOffset.y + '%',
        marginLeft: - viewOffset.x + '%',
        scale: viewScale
      }"
      @click="() => unselectPlanet()"
    >
      <div
        class="abs-round centered ellipse"
        v-for="(ellipse, index) in ellipses"
        :style="'width: '+ellipse+'%;height: '+(ellipse/2)+'%'"
        :key="'ellipse-'+index"
      ></div>
      <div
        class="abs-round planet centered"
        style="background-color: blue;"
        v-for="(planet, index) in planets"
        :key="planet.name"
        :id="planet.name"
        :style="{
          width: planet.d + 'vh',
          height: planet.d + 'vh',
          top: planet.y + '%',
          left: planet.x + '%',
        }"
        :ref="planet.name"
        @click.stop="() => selectPlanet(planet, index)"
      ></div>
      <div class="abs-round centered sun" style="width: 6vh;height: 6vh"></div>
      <span :style="{
        position: 'absolute',
        width: '5px',
        height: '5px',
        backgroundColor: 'red',
        top: viewOffset.y + '%',
        left: viewOffset.x + '%',
      }"></span>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Planet } from './planet';

const viewOffset = ref({ y: -2, x: -2 });
const viewScale = ref(1);
const selectedPlanet = ref<Planet | null>(null);
const ellipses: number[] = [90, 72, 60, 48, 30, 18];
const planets = ref<Planet[]>([
  { y: 40, x: 10, d: 7, p: 600, name: "pienerth", speed: 0.1 },
  { y: 66, x: 34, d: 6, p: 320, name: "ciri", speed: 0.2 },
  { y: 53, x: 79, d: 5, p: 20, name: "xv5-9", speed: 0.3 },
  { y: 39, x: 39, d: 4, p: 680, name: "gorth-685", speed: 0.4 },
  { y: 45, x: 61, d: 3.5, p: 920, name: "stheno", speed: 0.5 },
  { y: 53, x: 44, d: 2.5, p: 360, name: "tammuz", speed: 0.6 },
]);

const getPosOnEllipse = (x: number, y: number, w: number, h: number, p: number) => {
  const t = p/1000 * 2 * Math.PI;
  return {
    x: x + w / 2 * Math.cos(t),
    y: y + h / 2 * Math.sin(t)
  };
}

const unselectPlanet = () => {
  viewScale.value = 1;
  selectedPlanet.value = null;
  viewOffset.value = {
    x: 0,
    y: 0
  };
}

const selectPlanet = (planet: Planet, index: number) => {
  if (selectedPlanet.value == null) {
    selectedPlanet.value = planet;
    //viewScale.value = 2;

    // TEMP HERE
    const newPos = getPosOnEllipse(50, 50, ellipses[index], ellipses[index] / 2, planets.value[index].p);
    
    // viewOffset.value = {
    //   y: - (newPos.y / 2) * viewScale.value,
    //   x: newPos.x * 2 ** (viewScale.value - 1)
    // };

    viewOffset.value = {
      y: newPos.y,
      x: newPos.x
    };
  }
  console.log("selectedPlanet.value", selectedPlanet.value);
  console.log("viewOffset.value", viewOffset.value);
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
    if (selectedPlanet.value == planets.value[index]) {
      viewOffset.value = {
        y: - newPos.y / 2,
        x: - newPos.x / 2
      };
      console.log("planets.value[index]", planets.value[index]);
      console.log("viewOffset.value", viewOffset.value);
    }
  }
}

onMounted(() => {
  movePlanets();
  // setInterval(movePlanets, 10);
});
// -13 ; -2
// 36 ; 14

</script>
