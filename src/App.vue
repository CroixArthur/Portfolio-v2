<template>
  <main>
    <div
      class="planet centered ellipse"
      v-for="ellipse in ellipses"
      :style="'width: '+ellipse+'%;height: '+(ellipse/2)+'%'"
    ></div>
    <div
      class="planet centered"
      style="background-color: blue;"
      v-for="planet in planets"
      :style="'width: '+planet.d+'vh;height: '+planet.d+'vh;top: '+planet.y+'%;left:'+planet.x+'%;'"
      :id="planet.name"
    ></div>
    <div class="planet centered sun" style="width: 6vh;height: 6vh"></div>
  </main>
</template>

<script type="ts" setup>
const ellipses = [90, 72, 60, 48, 30, 18];
const planets = [
  { y: 40, x: 10, d: 5, p: 600, name: "pienerth" },
  { y: 66, x: 34, d: 5, p: 320, name: "ciri" },
  { y: 53, x: 79, d: 5, p: 20, name: "xv5-9" },
  { y: 39, x: 39, d: 4, p: 680, name: "gorth-685" },
  { y: 45, x: 61, d: 3.5, p: 920, name: "stheno" },
  { y: 53, x: 44, d: 2.5, p: 360, name: "tammuz" },
];

const getPosOnEllipse = (x, y, w, h, p) => {
  const t = p/1000 * 2 * Math.PI;
  return {
    x: x + w / 2 * Math.cos(t),
    y: y + h / 2 * Math.sin(t)
  };
}

const movePlanets = () => {
  setTimeout(() => {
    for (let index = 0; index < planets.length; index++) {
      const newPos = getPosOnEllipse(50, 50, ellipses[index], ellipses[index] / 2, planets[index].p);
      planets[index].p = planets[index].p > 999 ? 1 : planets[index].p + 1;
      planets[index].x = newPos.x;
      planets[index].y = newPos.y;
      const planet = document.getElementById(planets[index].name);
      planet.style.top = newPos.y+"%";
      planet.style.left = newPos.x+"%";
    }
    movePlanets();
  }, 10);
}

movePlanets();
</script>
