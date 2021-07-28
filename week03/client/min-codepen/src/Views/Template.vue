<template>
  <div class="template-root">
    <Editor ref="vue" language="html" title="Vue Template" :save="save"/>
    <Preview :connectStatus="connectStatus" :url="url" ref="preview" :pending="pending"/>
  </div>

</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import Editor from '../components/Editor.vue';
import Preview from '../components/Preview.vue';

export default defineComponent({
  components: {
    Editor,
    Preview,
  },
  setup() {
    const url = ref(null);
    const vue = ref(null);
    const preview = ref(null);
    const connectStatus = ref(false);
    const pending = ref(false);
    let source;
    if ('EventSource' in window) {
      source = new EventSource("http://127.0.0.1:8848/stream", { withCredentials: false });
    }
    const save = ({ type, content }) => {
      // pending.value = true;
      fetch(`http://127.0.0.1:8848/build`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
          type,
          content
        }),
      });
    }
    onMounted(() => {
      console.log('321');
      if (source) {
        source.addEventListener('html', (event) => {
          pending.value = false;    
          if (!connectStatus.value) {
            connectStatus.value = true;
          }      
          const v = event.data.replace(/\"(.*)\"/g,($0,$1) => {
            return $1
          });
          url.value = `http://127.0.0.1:8848/index.${v}.html`;
        });
      }
    })
    onUnmounted(() => {
      if (source) {
        console.log('close connect')
        source.close();
      }
    })
    return {
      vue,
      url,
      connectStatus,
      save,
      pending,
      preview
    }
  }
})

</script>

<style>
.template-root {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
