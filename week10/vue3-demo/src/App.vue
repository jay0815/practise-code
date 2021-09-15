<script setup lang="ts">
import { useRoute } from 'vue-router'
import { watch } from 'vue-demi';
import { ref } from 'vue';
const route = useRoute()

const name = ref('demo');

watch(() => route.name, (l) => {
  name.value =  l === 'demo' ? 'home' : 'demo';
})

</script>

<template>
  <router-link :to="{ name: name }">
    go to {{ name }}
  </router-link>
  <router-view></router-view>
  
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
