import { ItemSet } from './Items';

interface MessageTypes {
  GET_ITEMS_BY_ID: { url: string },
  RECEIVE_ITEMS: ItemSet
}

export interface MessageResponses extends Record<keyof MessageTypes, unknown> {
  GET_ITEMS_BY_ID: ItemSet
}

export default MessageTypes;