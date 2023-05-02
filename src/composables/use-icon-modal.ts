import icons from '../assets/icons.json'
import { useModal } from './use-modal'


export const iconModal = useModal<string>('flag-banner')

export function useIconModal() {
  const categories = [
    "arrows",
    "brands",
    "commerce",
    "communications",
    "design",
    "technology & development",
    "editor",
    "finances",
    "games",
    "health & wellness",
    "maps & travel",
    "media",
    "nature",
    "objects",
    "office",
    "people",
    "system",
    "weather",
  ]

  const objectsByCategory: Record<string, string[]> = {}
  for (const c of categories) {
    objectsByCategory[c] = Object.entries(icons).filter(
      i => i[1].categories.includes(c)
    ).map(
      i => i[0]
    )
  }

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

  return {objectsByCategory, capitalize, icons, ...iconModal}
}
