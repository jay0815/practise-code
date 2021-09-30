<script setup lang="ts">
import { ref } from 'vue';
import Infinite from './components/Infinite'

const list = ref<Array<{ key: number; value: number; text: number }>>([]);

for(let i = 0; i < 2000; i++) {
  list.value[i] = {
    key: i,
    value: i,
    text: i,
  }
}

</script>

<template>
  <Infinite :height="200" :list="list">
    <template #default="{ key, id, value, ref, style }">
      <li class="li-card" :key="key" :id="id" :ref='ref' :style="style">{{value}}</li>
    </template>
  </Infinite>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
ul {
  margin: 0px;
  padding: 0px;
}
.li-card {
  display: flex;
  justify-content: center;
  list-style: none;
  box-shadow: 2px 2px 9px 0px #bbb;
  padding: 70px 0;
  margin-bottom: 20px;
  border-radius: 10px;
  position: absolute;
  width: 80%;
}
</style>
