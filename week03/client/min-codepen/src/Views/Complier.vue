<template>
  <div class="complier-root">
    <Editor ref="html" language="html" title="HTML" :save="save"/>
    <Editor ref="css" language="css" title="CSS" :save="save"/>
    <Editor ref="javascript" language="javascript" title="JavaScript" :save="save"/>
  </div>
  <div class="complier-preview">
    <Preview :connectStatus="connectStatus" :url="url" ref="preview" :pending="pending"/>
    <div style="width: 80px;">
      <button v-on:click="run">preview</button>
    </div>
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
    const html = ref(null);
    const css = ref(null);
    const preview = ref(null);
    const javascript = ref(null);
    const connectStatus = ref(false);
    const pending = ref(false);
    let source;
    if ('EventSource' in window) {
      source = new EventSource("http://127.0.0.1:8848/stream", { withCredentials: false });
    }
    const save = ({ type, content }) => {
      // pending.value = true;
      fetch(`http://127.0.0.1:8848/update`, {
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
    const run = () => {
      pending.value = true;
      fetch(`http://127.0.0.1:8848/run`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify([
          {
            type: 'javascript',
            content: javascript.value.getValue(),
          },
          {
            type: 'css',
            content: css.value.getValue(),
          },
          {
            type: 'html',
            content: html.value.getValue(),
          },
        ]),
      });
    }
    onMounted(() => {
      if (source) {
        source.addEventListener('css', (event) => {
          pending.value = false;
          if (preview.value && connectStatus.value) {
            const v = event.data.replace(/\"(.*)\"/g,($0,$1) => {
              return $1
            });
            preview.value.update(v)
          }
        });
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
      url,
      connectStatus,
      html,
      css,
      javascript,
      save,
      pending,
      run,
      preview
    }
  }
})

</script>

<style>
.complier-root {
  display: flex;
  width: 100%;
}
.complier-preview {
  flex: auto;
  display: flex;
  align-items: center;
}
</style>
