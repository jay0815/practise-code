<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>{{ text }}</div>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue';
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup() {
      const text = ref('234567');
      return {
          text
      }
  }
})
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
