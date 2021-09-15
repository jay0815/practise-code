<template>
  <div>
    <tag v-if="show" :type="type" :closable="closable" @close="handleClose">{{type}}</tag>
  </div>
  <div>
    <el-button @click="changeType">change type</el-button>
    <el-button @click="changeClosable">change closable</el-button>
    <el-button @click="showTag">show tag</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import Tag from '../components/Tag.vue'
import { TagType } from '../interface/constant';
import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'index',
  components: {
    Tag, ElButton
  },
  setup() {
    const type = ref<TagType>(TagType.success);
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