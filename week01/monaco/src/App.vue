<template>
  <div>
    <input type="file" id="file" style="display:none" ref="folder" @change="setFileContentToEditor" accept="text/javascript,application/javascript">
    <button role="button" @click="openSystemFolder">选择文件</button>
    <button role="button" @click="saveStreamToFile">保存文件</button>
    <div id="root" ref="root"></div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  }
}

export default defineComponent({
  setup() {
    const root = ref();
    const folder = ref();
    let editor;
    const setFileContentToEditor = () => {
      let selectedFile = document.getElementById("file").files[0];//获取读取的File对象
      if (selectedFile) {
        const { name, size } = selectedFile;
        console.log("文件名:"+name+"大小："+size);

        const reader = new FileReader();
        reader.readAsText(selectedFile, 'utf-8')

        reader.onload = function(){
            editor.setValue(this.result);
        };
      }
    }
    const openSystemFolder = () => {
      folder.value.dispatchEvent(new MouseEvent('click')) ;
    }
    const saveStreamToFile = async () => {
      const opts = {
        types: [{
          description: 'Javascript file',
          accept: {'application/javascript': ['.js']},
        }],
      };
      // 创建一个新的句柄
      const newHandle = await window.showSaveFilePicker(opts);

      // 创建要写入的 FileSystemWritableFileStream
      const writableStream = await newHandle.createWritable();

      const blob = new Blob([editor.getValue()], {type : 'text/plain' })

      // 写入我们的文件
      await writableStream.write(blob);

      // 关闭文件并将内容写入磁盘。
      await writableStream.close();
    }
    onMounted(() => {
      editor = monaco.editor.create(root.value, {
        language: 'javascript',
        value: "function hello() {\n\talert('Hello world!');\n}",
      })
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, function () {
        saveStreamToFile()
      })
    })
    onUnmounted(() => {
      editor.dispose()
    })
    return {
      root,
      folder,
      setFileContentToEditor,
      openSystemFolder,
      saveStreamToFile
    };
  }
})
</script>

<style scoped>
#root {
  width: 100vw;
  height: 100vh;
}
</style>