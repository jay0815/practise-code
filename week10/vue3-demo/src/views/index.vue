<template>
  <div>
    <el-tag v-if="show" :type="type" :closable="closable" @close="handleClose">{{type}}</el-tag>
  </div>
  <div>
    <el-button @click="changeType">change type</el-button>
    <el-button @click="changeClosable">change closable</el-button>
    <el-button @click="showTag">show tag</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElTag, ElButton } from 'element-plus'

type TagType = 'success' | 'info' | 'warning' | 'danger';

export default defineComponent({
  name: 'index',
  components: {
    ElTag, ElButton,
  },
  setup() {
    const type = ref<'success' | 'info' | 'warning' | 'danger'>('success');
    const closable = ref(true);
    const show = ref(true);
    const changeType = () => {
      const index = Math.ceil(Math.random() * 3);
      type.value = ['success', 'info', 'warning', 'danger'][index] as TagType;
    }
    const changeClosable = () => {
      closable.value = !closable.value;
    }
    const showTag = () => {
      show.value = !show.value;
    }
    const handleClose = (e: any) => {
      show.value = !show.value;
    }
    return {
      type, closable, changeType, changeClosable, handleClose, show, showTag
    }
  }
})
</script>