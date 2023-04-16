import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { StatItem } from '../api/stats-api'
import { statsApi } from '../api/stats-api'

type StatRecord = Record<string, number>

function statToRecord(record: StatRecord, item: StatItem): StatRecord {
  record[item.goalId] = item.eventCount;

  return record;
}

export const useStatsStore = defineStore('stats', () => {
  const today = ref<StatRecord>({})
  const week = ref<StatRecord>({})

  statsApi.get().then(response => {
    today.value = response.today.reduce(statToRecord, {});
    week.value = response.week.reduce(statToRecord, {});
  })

  const updateStat = (goalId: string, count: number) => {
    if (today.value[goalId] === undefined) {
      today.value[goalId] = 0
    }
    if (week.value[goalId] === undefined) {
      week.value[goalId] = 0
    }

    today.value[goalId]++
    week.value[goalId]++
  }

  return {today, week, updateStat}
})
