import { defineStore } from 'pinia'
import {ref, toRef, watch} from 'vue'
import type { StatItem } from '../api/stats-api'
import { statsApi } from '../api/stats-api'
import {useAuthStore} from "./auth-store";

type StatRecord = Record<string, number>

function statToRecord(record: StatRecord, item: StatItem): StatRecord {
  record[item.goalId] = item.eventCount;

  return record;
}

export const useStatsStore = defineStore('stats', () => {
  const isAuthorized = toRef(useAuthStore(), 'isAuthorized')
  const today = ref<StatRecord>({})
  const week = ref<StatRecord>({})

  watch(isAuthorized, async isAuthorized => {
    if (isAuthorized) {
      const response = await statsApi.get()
      today.value = response.today.reduce(statToRecord, {})
      week.value = response.week.reduce(statToRecord, {})
    } else {
      today.value = {}
      week.value = {}
    }
  }, {immediate: true})

  const updateStat = (goalId: string, count: number) => {
    if (today.value[goalId] === undefined) {
      today.value[goalId] = 0
    }
    if (week.value[goalId] === undefined) {
      week.value[goalId] = 0
    }

    today.value[goalId] += count
    week.value[goalId] += count
  }

  return {today, week, updateStat}
})