import { ref } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'

export const useCountryData = defineStore('CountryData', () => {
  const allContries = ref([])
  const randomCountry = ref([])
  const shuffled = ref([])
  const holidaysPerYear = ref([])

  async function getAllCountries() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}AvailableCountries`,
      )

      allContries.value = response.data
    } catch (error) {
      console.error('error', error)
    }
  }

  async function getNextPublicHolidays(countryCode) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}NextPublicHolidays/${countryCode}`,
      )

      return response.data
    } catch (error) {
      console.error('error', error)
    }
  }

  async function getThreeRandomItems() {
    shuffled.value = allContries.value
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
  }

  async function collectData() {
    randomCountry.value = []
    for (let i = 0; i < shuffled.value.length; i++) {
      const nextHoliday = await getNextPublicHolidays(
        shuffled.value[i].countryCode,
      )

      const countryWithHoliday = {
        country: shuffled.value[i],
        holiday: nextHoliday[0],
      }

      randomCountry.value.push(countryWithHoliday)
    }
  }

  async function init() {
    await getThreeRandomItems()
    await collectData()
  }

  async function getHolidayForCountry(year, countryCode) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}PublicHolidays/${year}/${countryCode}`,
      )

      holidaysPerYear.value = response.data

      console.log('response', response)
    } catch (error) {
      console.error('error', error)
    }
  }

  return {
    allContries,
    holidaysPerYear,
    randomCountry,
    getAllCountries,
    getNextPublicHolidays,
    getThreeRandomItems,
    getHolidayForCountry,
    init,
  }
})
