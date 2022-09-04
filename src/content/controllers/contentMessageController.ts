import { getCurrentItems, getLastItems, setLastItems } from '../../modules/items';
import { ItemSet } from '../../types/Items';
import { ContentMessageData, ContentMessageType as CMT } from '../../types/Messages';

type ContentMessageHandler<T extends CMT> = (payload: ContentMessageData[T]['payload']) => Promise<void>

type ContentMessageController = {
  [Key in CMT]: ContentMessageHandler<Key>;
}

type MessageListenerStore = {
  [key in CMT]?: Parameters<typeof registerMessageListener>[1]
}

const messageListeners: MessageListenerStore = {};

interface ListenerTypes extends Record<CMT, (data: any) => void> {
  [CMT.UPDATE_NEW_ITEMS]: (items: ItemSet) => void
}

export function registerMessageListener<T extends CMT>(type: T, callback: ListenerTypes[T]): void {
  messageListeners[type] = callback;
}

// Receive message from background script
// Make class for message controller
// Trigger state update in React component
const contentMessageController: ContentMessageController = {
  [CMT.UPDATE_NEW_ITEMS]: async (payload) => {
    const { catUrl } = payload;
    const currItems = await getCurrentItems(catUrl);
    console.log('Current items:', currItems);

    // TODO: Determine which items are new and display them
    const lastItems = await getLastItems(catUrl);
    const newItems = checkNewItems(lastItems, currItems);
    console.log('New items:', newItems);

    // Update item cache for category
    setLastItems(catUrl, currItems);

    const listener = messageListeners[CMT.UPDATE_NEW_ITEMS];
    if (typeof listener === 'function') listener(currItems); // DEBUG currItems -> newItems
  }
};

export default {
  ...contentMessageController
};
// export default contentMessageController;

/// Auxiliary functions
function checkNewItems(prev: ItemSet, curr: ItemSet): ItemSet {
  if (!prev) return {};

  const newItems: ItemSet = {};
  for (const sku in curr) {
    if (!(sku in prev)) newItems[sku] = curr[sku];
  }
  return newItems;
}