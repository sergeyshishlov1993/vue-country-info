<script setup lang="ts">
const props = defineProps({
  placeholder: String,
  value: String,
})
</script>

<template>
  <input
    type="search"
    class="form-control"
    aria-label="Text input with checkbox"
    :placeholder="props.placeholder"
    :value="props.value"
  />
</template>

<style lang="scss" scoped>
input {
  width: 300px;
}
</style>
