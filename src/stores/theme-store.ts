import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useColorMode, useDark, useLocalStorage } from '@vueuse/core'
import {useHead} from "unhead";

const lightColors = [
  '#a8a29e',
  '#f87171',
  '#fb923c',
  '#fbbf24',
  '#facc15',
  '#a3e635',
  '#4ade80',
  '#34d399',
  '#2dd4bf',
  '#22d3ee',
  '#38bdf8',
  '#60a5fa',
  '#818cf8',
  '#a78bfa',
  '#c084fc',
  '#e879f9',
  '#f472b6',
  '#fb7185',
]

const darkColors = [
  '#78716c',
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#eab308',
  '#84cc16',
  '#22c55e',
  '#10b981',
  '#14b8a6',
  '#06b6d4',
  '#0ea5e9',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#a855f7',
  '#d946ef',
  '#ec4899',
  '#f43f5e',
]

export const colors = {
  light: lightColors.map(hexToHsl),
  dark: darkColors.map(hexToHsl),
};

// TODO: move logic from store into composable
export const useThemeStore = defineStore('theme', () => {
  const colorIndex = useLocalStorage('theme-color', 7)
  const previewIndex = ref<number|null>(null)
  const colorMode = useColorMode({emitAuto: true, attribute: 'data-theme'})
  const isDark = useDark()

  const currentModeColors = computed(() => isDark.value ? colors.light : colors.dark)
  const primaryColor = computed(() => currentModeColors.value[previewIndex?.value ?? colorIndex.value])

  watch(primaryColor, (color) => {
    document.body.style.setProperty('--p', color)
    document.body.style.setProperty('--pf', color)

    useHead({
      meta: [{name: 'theme-color', content: lightColors[previewIndex?.value ?? colorIndex.value]}],
    })
  }, {immediate: true})

  return {colorIndex, previewIndex, currentModeColors, colorMode}
})

function hexToHsl(hex: string): string {
  const [r, g, b] = hex.slice(1)
    .match(/.{1,2}/g)
    ?.map(n => parseInt(n, 16) / 255) || [0, 0, 0] as number[];

  const min = Math.min(...[r, g, b]);
  const max = Math.max(...[r, g, b]);
  const delta = max - min;

  const h = Math.round((((max === r ? (g - b) / delta : max === g ? (b - r) / delta + 2 : (r - g) / delta + 4) % 6) * 60 + 360) % 360);
  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  return `${h.toFixed(2)} ${(s * 100).toFixed(2)}% ${(l * 100).toFixed(2)}%`;
}
