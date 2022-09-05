export interface Item {
  sku: string,
  imageUrl: string,
  inputBtn: string,
  title: string,
  recId: string,
  isParentAsin: boolean
}

export type ItemMap = { [sku: string]: Item }
export interface ItemList extends Array<Item & { sku: string }> {}

export interface Category {
  items: ItemMap,
  lastCheck: number
}