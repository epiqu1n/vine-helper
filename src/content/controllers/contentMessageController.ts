import { getCurrentItems, getLastItems, setLastItems } from '../../modules/items';
import { ItemMap } from '../../types/Items';
import { ContentMessageData, ContentMessageType as CMT } from '../../types/Messages';

type ContentMessageHandler<T extends CMT> = (payload: ContentMessageData[T]['payload']) => Promise<void>

type ContentMessageController = {
  [Key in CMT]: ContentMessageHandler<Key>;
}

type MessageListenerStore = {
  [key in CMT]?: Parameters<typeof registerMessageListener>[1]
}

const messageListeners: MessageListenerStore = {};

interface ListenerTypes extends Record<CMT, (...data: never[]) => void> {
  [CMT.UPDATE_NEW_ITEMS]: (newItems: ItemMap, allItems: ItemMap) => void
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
    console.debug('Current items:', currItems);

    const lastItems = await getLastItems(catUrl);
    const newItems = checkNewItems(lastItems, currItems);
    console.debug('New items:', newItems);

    // Update item cache for category
    setLastItems(catUrl, currItems);

    const listener = messageListeners[CMT.UPDATE_NEW_ITEMS];
    if (typeof listener === 'function') listener(newItems, currItems);
  }
};

export default {
  ...contentMessageController
};
// export default contentMessageController;

/// Auxiliary functions
function checkNewItems(prev: ItemMap, curr: ItemMap): ItemMap {
  if (!prev) return {};

  const newItems: ItemMap = {};
  for (const sku in curr) {
    if (!(sku in prev)) newItems[sku] = curr[sku];
  }
  return newItems;
}