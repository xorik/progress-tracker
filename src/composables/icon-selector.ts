import icons from '../assets/icons.json'
export function useIconSelector() {
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

  return {objectsByCategory, capitalize}
}
