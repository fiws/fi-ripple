<template>
  <div class="fi-demo-app">
    <h1>fi-ripple</h1>

    <section class="fi-card">
      <h3>Usage with Vue</h3>
      <h4>In your Vue Component JS</h4>
      <pre v-ripple>
import 'dom4'; // you only need this if you want IE 10 support
import Ripple from '../fi-ripple.js';

export default {
  directives: {
    Ripple,
  },
}</pre>

      <h4>In your Vue Component Template</h4>
      <pre v-ripple><code v-text="'<button v-ripple>Test</button>'"></code></pre>

      <h3>Usage without Vue</h3>
      <pre ref="noVue">
import { FiRipple } from 'fi-ripple';

const rippleContainer = document.getElementById('test');
new FiRipple(rippleContainer);</pre>
    </section>

    <div class="demo-flex">
      <section class="fi-card">
        <h3>Button Demo</h3>
        <h4>Material Style</h4>
        <button v-ripple class="btn">Button</button>
        <button v-ripple class="btn">Long Button with Ripple</button>
        <button v-ripple class="btn btn-inverted">Inverted</button>
        <br />
        <button v-ripple class="btn btn-inverted">Inverted Button with much text</button>
        <button v-ripple class="btn" style="color: #FF5722">Custom Color</button>

        <h4>Large Buttons</h4>
        <button v-ripple class="btn btn-huge">Huge button</button>
        <button v-ripple class="btn btn-inverted btn-huge">Huge inverted button</button>
      </section>

      <div class="fi-card">
        <h3>Vertical Demo</h3>
        <div style="display: flex;">
          <div v-ripple class="no-select demo-vertical"></div>
          <div v-ripple class="no-select demo-vertical"></div>
        </div>
      </div>
    </div>

    <section v-ripple class="fi-card demo-container no-select" :class="{ invert }" ref="demo">
      <h3>Container Demo</h3>
    </section>

    <section class="fi-card no-select">
      <button v-ripple @click="toggleClicking" class="btn">
        {{autoClick ? 'make it stahp': 'Start performance test'}}
      </button>
      <label>
        <input type="checkbox" v-model="invert">
        <span>Invert</span>
      </label>
      <label>
        <input type="checkbox" v-model="colorfull">
        <span>Colorfull</span>
      </label>
      <label>
        <input type="checkbox" v-model="big">
        <span>Bigger Ripples</span>
      </label>
      <label>
        <input type="checkbox" v-model="insane">
        <span>Insane speed</span>
      </label>
    </section>
  </div>
</template>

<script>
import './demo.css';
import 'dom4'; // needed for IE 10 support
import Ripple from '../fi-ripple.js';
import { FiRipple } from '../fi-ripple.js';

const getRandomColor = () => {
  const colors = ['#ffaacc', '#affefe', '#03A9F4', '#673ab7', '#ff5722', '#4caf50'];

  return colors[Math.floor(Math.random() * colors.length)];
}

export default {
  directives: {
    Ripple,
  },
  name: 'App',
  data() {
    return {
      autoClick: false,
      colorfull: false,
      insane: false,
      invert: false,
      big: false,
      speed: 200,
      r: 0,
    }
  },
  methods: {
    toggleClicking() {
      this.autoClick = !this.autoClick;
      this.clickBot();
    },
    clickBot() {
      if (!this.autoClick) return;
      const el = this.$refs.demo;

      const ripple = el._fiRipple.spawnRipple({
        x: parseInt(Math.random() * el.offsetWidth),
        y: parseInt(Math.random() * el.offsetHeight),
        persistent: true,
        color: this.colorfull ? getRandomColor() : undefined,
        maxSize: this.big ? 550 : undefined,
      });
      const r = parseInt(Math.random() * 500);
      setTimeout(() => el._fiRipple.removeRipple(ripple), r);

      this.r++;
      if (this.insane) window.requestAnimationFrame(this.clickBot);
      else setTimeout(this.clickBot, this.speed);
    }
  },
  mounted() {
    new FiRipple(this.$refs.noVue);
  }
}
</script>

<style>
*{
  box-sizing: border-box;
}
.container{
  z-index: 50;
  height: 100%;
  width: 100%;
  border: 1px solid trasparent;
  background-color: rgba(0, 0, 0, 0.0);
}

.btn{
  padding: 10px;
  background: transparent;
  border: 0 none;
  border-radius: 3px;
  transition: 200ms background-color ease, 200ms box-shadow ease;
  font-family: 'Roboto';
  font-weight: 400;
  text-transform: uppercase;
  color: rgb(0, 102, 255);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
  margin: 5px;
  contain: content;
}

.btn:hover{
  background-color: rgba(0, 0, 0, 0.08);
}

.btn-inverted{
  background-color: rgb(29, 29, 29);
  color: white;
}

.btn-inverted:hover{
  background-color: rgb(46, 46, 46);
}

.btn-huge{
  display: block;
  padding: 2em;
  margin: 20px auto;
  transition: 200ms transform ease;
}

.btn-huge:hover{
  transform: scale(1.1);
}

.btn:active{
  outline: 0 none;
  border-radius: 3px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
}

.btn:focus{
  outline: 0 none;
}

.no-select{
  user-select: none;
}

.demo-flex {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.demo-flex > .fi-card {
  flex: 1;
  min-width: 220px;
}

.demo-flex > .fi-card:first-child {
  margin-right: 15px;
}

.demo-vertical {
  flex: 1;
  height: 450px;
  border: 1px solid rgb(215, 215, 215);
  display: inline-block;
}

.demo-container {
  min-height: 300px;
  min-height: 30vh;
}

pre {
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 3px;
  padding: 1em 10px;
  word-wrap: break-word;
}

.fi-card.invert{
  background-color: rgb(64, 64, 64);
  color: white;
}

@media (max-width: 800px) {
  label {
    display: block;
    margin: 10px 0;
  }
}
</style>
