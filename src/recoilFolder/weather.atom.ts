import { atom } from 'recoil'

export const transformedLocation = atom<[] | number[]>({
  key: '#transformedLocation',
  default: [],
})

export const mapCenter = atom<number[]>({
  key: '#mapCenter',
  default: [36.11854456321755, 128.02188131960543],
})

export const mapLevel = atom<number>({
  key: '#mapLevel',
  default: 13,
})

export const isVisible = atom<boolean>({
  key: '#isVisible',
  default: false,
})

export const whereAmINow = atom<string>({
  key: '#whereAmINow',
  default: '지역',
})
