export interface Item {
  sku: string,
  imageUrl: string,
  inputBtn: string,
  title: string,
  recId: string,
  isParentAsin: boolean
}

export type ItemMap = { [sku: string]: Item }

export interface Category {
  items: ItemMap,
  lastCheck: number
}