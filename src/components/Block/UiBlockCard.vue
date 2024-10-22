<script setup lang="ts">
import UiTitleH2 from '../Ui/UiTextH2.vue'
import UiTitleH3 from '../Ui/UiTextH3.vue'

const props = defineProps({
  country: String,
  countryCode: String,
  holiday: String,
  date: String,
})
</script>

<template>
  <div class="card text">
    <div class="card-body">
      <UiTextH2>{{ props.country }}</UiTextH2>
      <UiTextH2>{{ props.holiday }}</UiTextH2>
      <UiTextH2>{{ props.date }}</UiTextH2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-body {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
