<script setup lang="ts">
import { TagType } from "../interface/constant"
import { ElIcon } from 'element-plus'
import { Close } from '@element-plus/icons'
import { ref } from "vue";
interface Props {
  type?: TagType;
  closable?: boolean;
  color?: string;
}

withDefaults(defineProps<Props>(), {
  type: TagType.info,
  closable: false,
});

const emit = defineEmits<{
  (e: 'click', event: Event): void
  (e: 'close', event: Event): void
}>();

const show = ref(true);

const handleClose = (e: Event) => {
  emit('close', e);
  console.log('tag will cloose');
}

</script>

<template>
  <div :class="['my-tag', type]" v-if="show">
  {{type}}<el-icon v-if="closable" @click="handleClose" class="close-icon"><close /></el-icon>
  </div>
</template>

<style>
.my-tag {
  height: 20px;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border: 1px solid whitesmoke;
  border-radius: 5%;
}
.success {
  background-color: lightskyblue;
}
.warning {
  background-color: orange;
  color: white;
}
.danger {
  background-color: red;
  color: white;
}
.close-icon:hover {
  cursor: pointer;
}
</style>