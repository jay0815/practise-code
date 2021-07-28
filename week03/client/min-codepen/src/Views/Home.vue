<template>
  <div class="home">
    <button @click="toComplier">runtime & complier</button>
    <button @click="toTemplate">runtime</button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from 'vue-router'

export default defineComponent({
    setup() {
    const router = useRouter()
    const toComplier = (() => {
      router.push({
        path: 'complier'
      })
    })
    const toTemplate = () => {
      router.push({
        path: 'template'
      })
    };
    return {
      toComplier,
      toTemplate
    }
  }
})

</script>

<style>
.home {
  display: flex;
  width: 100%;
  margin: auto;
  justify-content: center;
}
.home button {
  margin: 10px;
}
</style>
