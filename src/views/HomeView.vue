<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCountryData } from '../stores/countryData'
import UiBlockCard from '../components/Block/UiBlockCard.vue'
import UiInput from '../components/Ui/UiInput.vue'
import UiTextH1 from '../components/Ui/UiTextH1.vue'

const store = useCountryData()
const router = useRouter()

onMounted(async () => {
  await store.getAllCountries()
  await store.init()
})

const searchQuery = ref('')

const filterContriesBySearch = computed(() => {
  return store.allContries.filter(el =>
    el.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

function handleSearch(event: Event) {
  const target = event.target as HTMLInputElement | null
  if (target) {
    searchQuery.value = target.value
  }
}

function goToCountryPage(countryCode: string, name: string) {
  router.push(`/country/${countryCode}?country=${name}`)
}
</script>

<template>
  <div class="wrapper">
    <div class="wrapper__country">
      <UiInput
        @input="handleSearch"
        :value="searchQuery"
        placeholder="search countries"
      />

      <UiTextH1> Countries List </UiTextH1>

      <div
        style="margin-top: 50px; color: red"
        v-if="!filterContriesBySearch.length"
      >
        <UiTextH1>Country not found !</UiTextH1>
      </div>

      <div class="country__list" v-else>
        <UiBlockCard
          v-for="country in filterContriesBySearch"
          :key="country.countryCode"
          :country="country.name"
          :countryCode="country.countryCode"
          @click="goToCountryPage(country.countryCode, country.name)"
        />
      </div>
    </div>

    <div class="wrapper__country_random">
      <Ui-Text-H1> Random Countries Widget </Ui-Text-H1>

      <UiBlockCard
        v-for="country in store.randomCountry"
        :key="country.country.countryCode"
        :country="country.country.name"
        :holiday="country.holiday?.name"
        :date="country.holiday?.date"
        @click="
          goToCountryPage(country.country.countryCode, country.country.name)
        "
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  padding-top: 50px;
  display: flex;
  justify-content: space-between;

  .country__list {
    height: 600px;
    overscroll-behavior: contain;
    overflow-y: auto;
  }

  &__country {
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__country_random {
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 1px solid black;
  }
}
</style>
