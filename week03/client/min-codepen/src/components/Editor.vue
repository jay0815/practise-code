<template>
  <div class="editor">
    <div class="editor-title">{{ title }}</div>
    <div class="editor-body" ref="root"></div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import * as monaco from 'monaco-editor';

export default defineComponent({
  props: {
    language: String,
    title: String,
    save: Function,
  },
  setup(props) {
    const root = ref();
    let editor;

    const getValue = () => {
      return editor.getValue();
    }
    // editor.getValue()
    onMounted(() => {
      editor = monaco.editor.create(root.value, {
        language: props.language,
        value: "",
        theme: "vs-dark",
      })
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, function () {
        props.save({
          type: props.language,
          content: editor.getValue()
        })
        console.log('save !!!', props.language);
        // saveStreamToFile()
      })
    })
    onUnmounted(() => {
      editor.dispose()
    })
    return {
      root,
      getValue
    };
  }
})
</script>

<style scoped>
.editor {
  padding: 10px 5px;
  flex:1;
}
.editor-title {
  text-align: center;
}
.editor-body {
  min-height: 500px;
  text-align: left;
}
</style>