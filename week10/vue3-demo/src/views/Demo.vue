<template>
  <Site>123</Site>
  <div>
    <Tag v-if="show" :type="type" :closable="closable" @close="handleClose">{{type}}</Tag>
  </div>
  <div>
    <button @click="changeType">change type</button>
    <button @click="changeClosable">change closable</button>
    <button @click="showTag">show tag</button>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import Tag from '../components/Tag.vue'
import Site from '../components/Site.vue'
import { TagType } from '../interface/constant';
</script>

<script setup lang="ts">
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
</script>