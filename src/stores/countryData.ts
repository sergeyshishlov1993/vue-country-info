import { ref } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'

interface Country {
  name: string
  countryCode: string
}

interface Holiday {
  name: string
  date: string
}

interface CountryWithHoliday {
  country: Country
  holiday: Holiday | null
}
export const useCountryData = defineStore('CountryData', () => {
  const allContries = ref<Country[]>([])
  const randomCountry = ref<CountryWithHoliday[]>([])
  const shuffled = ref<Country[]>([])
  const holidaysPerYear = ref<Holiday[]>([])

  async function getAllCountries() {
    try {
      const response = await axios.get<Country[]>(
        `${import.meta.env.VITE_BASE_URL}AvailableCountries`,
      )

      allContries.value = response.data
    } catch (error) {
      console.error('error', error)
    }
  }

  async function getNextPublicHolidays(countryCode: string) {
    try {
      const response = await axios.get<Holiday[]>(
        `${import.meta.env.VITE_BASE_URL}NextPublicHolidays/${countryCode}`,
      )

      return response.data as Holiday[]
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

      if (nextHoliday && nextHoliday.length > 0) {
        const countryWithHoliday: CountryWithHoliday = {
          country: shuffled.value[i],
          holiday: nextHoliday[0],
        }

        randomCountry.value.push(countryWithHoliday)
      } else {
        const countryWithHoliday: CountryWithHoliday = {
          country: shuffled.value[i],
          holiday: null,
        }

        randomCountry.value.push(countryWithHoliday)
      }
    }
  }

  async function init() {
    await getThreeRandomItems()
    await collectData()
  }

  async function getHolidayForCountry(year: string, countryCode: string) {
    try {
      const response = await axios.get<Holiday[]>(
        `${import.meta.env.VITE_BASE_URL}PublicHolidays/${year}/${countryCode}`,
      )

      holidaysPerYear.value = response.data
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
