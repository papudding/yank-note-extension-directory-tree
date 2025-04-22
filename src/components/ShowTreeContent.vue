<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{content}>()
</script>

<template>
<pre class="show-tree-content">
  {{ content }}
</pre>
</template>

<style scoped>
.show-tree-content {
  font-size: 14px;
  height: 70vh;
  overflow: auto;
}
</style>
