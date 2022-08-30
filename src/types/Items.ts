export interface Item {
  imageUrl: string,
  inputBtn: string,
  title: string,
  recId: string
}

export type ItemSet = { [href: string]: Item };

export interface Category {
  items: ItemSet,
  lastCheck: number
}