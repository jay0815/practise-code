<template>
  <iframe :src="url" v-show="!!url" width="100%" :height="`${height}px`" marginwidth="0" marginheight="0"/>
</template>

<script>
import { onMounted, toRefs, ref } from 'vue'

export default {
  name: 'app',
  props: {
    name: String,
    onGlobalStateChange: Function
  },
  setup(props) {
    let url = ref(toRefs(props.url).value);

    let height = ref(500)
    
    onMounted(() => {
      // 第二个参数为 true 表示立即触发
      props.onGlobalStateChange((state) => {
        url.value = state.user.url;
      }, true);
      height.value = document.body.clientHeight;
      window.onresize = () => {
        height.value = document.body.clientHeight;
      }
    });

    return {
      url,
      height
    }
  }
}
</script>

<style scss>

</style>
