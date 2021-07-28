<template>
<div class="preview">
  <div v-if="connectStatus" style="width:100%;">
    <iframe :src="url" frameborder="0" style="width:100%;height: 100%;" name="preview"></iframe>
  </div>
  <div class="title" v-else>initial environment...</div>
</div>
  
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from "vue";

export default defineComponent({
  props: {
    url: String,
    pending: Boolean,
    connectStatus: Boolean
  },
  setup() {
    const update = (hash) => {
      const iframe = document.getElementsByTagName('iframe')[0];
      if (iframe) {
        iframe.contentWindow.postMessage({
          src: hash
        }, "*")
      }

    }
    onMounted(() => {
    })
    onUnmounted(() => {
    })
    return {
      update,
    }
  }
})
</script>

<style scoped>
.preview {
  display: flex;
  flex: auto;
  border: 1px solid gray;
  height: calc(100% - 30px);
  margin: 10px;
}
.title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>