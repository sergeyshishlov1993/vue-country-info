<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCountryData } from '../stores/countryData'
import UiBlockCard from '../components/Block/UiBlockCard.vue'

import UiTextH1 from '../components/Ui/UiTextH1.vue'
const store = useCountryData()
const route = useRoute()
const selectedYear = ref<string>('2024')

onMounted(async () => {
  await store.getHolidayForCountry(
    selectedYear.value,
    route.params.id as string,
  )
})

async function selectYear(year: string) {
  selectedYear.value = year

  await store.getHolidayForCountry(
    selectedYear.value,
    route.params.id as string,
  )
}
</script>

<template>
  <nav aria-label="breadcrumb" style="--bs-breadcrumb-divider: '>'">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <router-link to="/" exact-active-class="active">Home</router-link>
      </li>

      <li class="breadcrumb-item">
        <router-link
          :to="{ query: { country: route.query.country } }"
          exact-active-class="active"
        >
          {{ route.query.country }}
        </router-link>
      </li>
    </ol>
  </nav>

  <div class="country">
    <UiTextH1>Country</UiTextH1>

    <div class="holiday__list">
      <UiBlockCard
        class="holiday_card"
        v-for="country in store.holidaysPerYear"
        :key="country.name"
        :country="country.name"
        :date="country.date"
      />
    </div>

    <div class="navigation__wrapper">
      <button
        type="button"
        class="btn btn-secondary"
        :class="{ 'btn-danger': String(year) == selectedYear }"
        v-for="year in Array.from({ length: 11 }, (v, i) => 2020 + i)"
        :key="year"
        @click="selectYear(String(year))"
      >
        {{ year }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.country {
  padding-top: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.holiday__list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 500px;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding-right: 15px;
}

.navigation__wrapper {
  position: fixed;
  transform: translateX(50%);
  bottom: 45px;
  right: 50%;
  display: flex;
  gap: 20px;

  button {
    padding: 3px;
    font-size: 20px;
    border: 1px solid grey;
    border-radius: 5px;
  }
}

.active {
  font-weight: 700;
  color: darkred;
}
</style>
